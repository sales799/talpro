import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { claimRegistry } from '../shared/claim-registry';
import { contentGovernanceRegistry, isPublishableContent } from '../shared/content-governance';
import { trustRegistry } from '../shared/trust-registry';
import { findBlockedPublicClaimIds } from './lib/publication-claim-guard';

const ROOT = path.resolve(import.meta.dirname, '..');
const EVIDENCE_DIR = path.join(ROOT, 'dist/release-evidence');
const DIST = path.join(ROOT, 'dist/public');
const now = new Date();
const failures: string[] = [];
const constitutionPath = path.join(ROOT, 'docs/website/TALPRO_WEBSITE_CONSTITUTION_v2.1.md');
const expectedConstitutionSha256 = 'eacde5f3ea4c70b49b21ba4e5b4e440cde6cb05cb500b761fe5916a7c3f088dd';
let constitutionSha256 = '';
try {
  constitutionSha256 = createHash('sha256').update(readFileSync(constitutionPath)).digest('hex');
} catch {
  failures.push('frozen Constitution v2.1 is missing from the repository');
}
if (constitutionSha256 && constitutionSha256 !== expectedConstitutionSha256) {
  failures.push('frozen Constitution v2.1 checksum does not match the approved authority');
}

const routes = JSON.parse(execFileSync('npx', ['tsx', 'scripts/seo-routes.ts'], {
  cwd: ROOT,
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'inherit'],
})) as string[];

function documentPath(route: string): string {
  return route === '/'
    ? path.join(DIST, 'index.html')
    : path.join(DIST, ...route.split('/').filter(Boolean), 'index.html');
}

function visibleText(html: string): string {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const claims = Object.values(claimRegistry).map((claim) => {
  if (claim.status === 'approved') {
    if (!('publicWording' in claim) || !claim.publicWording) failures.push(`${claim.id}: approved claim has no public wording`);
    if (!('approvalDate' in claim) || !claim.approvalDate) failures.push(`${claim.id}: approved claim has no approval date`);
    if (new Date(claim.reviewDate).getTime() <= now.getTime()) failures.push(`${claim.id}: approved claim review has expired`);
  } else if (!('blockReason' in claim) || !claim.blockReason) {
    failures.push(`${claim.id}: non-approved claim has no block reason`);
  }
  return { id: claim.id, category: claim.category, status: claim.status, owner: claim.owner, reviewDate: claim.reviewDate };
});

const content = contentGovernanceRegistry.map((record) => {
  const publishable = isPublishableContent(record, now);
  if (record.publicationStatus === 'approved' && !publishable) failures.push(`${record.id}: approved content fails publication controls`);
  if (record.publicationStatus !== 'approved' && record.publicPath) failures.push(`${record.id}: evidence-gated content has a public path`);
  return { id: record.id, type: record.contentType, status: record.publicationStatus, publicPath: record.publicPath, publishable };
});

const trust = trustRegistry.map((control) => ({ id: control.id, status: control.status, owner: control.owner, publicPath: control.href ?? null }));
for (const control of trustRegistry) {
  if ((control.status === 'evidence_required' || control.status === 'not_claimed') && control.href) {
    failures.push(`${control.id}: unverified trust control links to a purported evidence page`);
  }
}

const routeClaimChecks = routes.map((route) => {
  const file = documentPath(route);
  let text = '';
  try {
    text = visibleText(readFileSync(file, 'utf8'));
  } catch {
    failures.push(`${route}: rendered document is unavailable for claim verification`);
  }
  const blockedClaims = findBlockedPublicClaimIds(text);
  for (const claimId of blockedClaims) failures.push(`${route}: rendered blocked claim ${claimId}`);
  return { route, blockedClaims };
});

const publicAssets = readdirSync(path.join(DIST, 'assets'))
  .filter((name) => name.endsWith('.js'));
const clientLeakageFindings: string[] = [];
for (const name of publicAssets) {
  const source = readFileSync(path.join(DIST, 'assets', name), 'utf8');
  if (source.includes('/Users/') || source.includes('C:\\Users\\')) {
    clientLeakageFindings.push(`${name}: local filesystem path`);
  }
  if (source.includes('No approved evidence pack in the repository')) {
    clientLeakageFindings.push(`${name}: internal claim-evidence metadata`);
  }
}
for (const finding of clientLeakageFindings) failures.push(`public client bundle exposes ${finding}`);

mkdirSync(EVIDENCE_DIR, { recursive: true });
writeFileSync(path.join(EVIDENCE_DIR, 'publication-governance-report.json'), `${JSON.stringify({
  generatedAt: now.toISOString(),
  scope: 'Executable claim, content and trust publication gates. Qualified approval artifacts remain external mandatory evidence.',
  constitution: {
    path: path.relative(ROOT, constitutionPath),
    expectedSha256: expectedConstitutionSha256,
    actualSha256: constitutionSha256,
    matches: constitutionSha256 === expectedConstitutionSha256,
  },
  failureCount: failures.length,
  failures,
  claims,
  content,
  trust,
  routeClaimChecks,
  clientLeakageFindings,
}, null, 2)}\n`);

if (failures.length) {
  failures.forEach((failure) => console.error(failure));
  process.exitCode = 1;
} else {
  console.log('Publication-governance validation passed.');
  console.log('Evidence: dist/release-evidence/publication-governance-report.json');
}
