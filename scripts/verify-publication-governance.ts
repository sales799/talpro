import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { claimRegistry } from '../shared/claim-registry';
import { contentGovernanceRegistry, isPublishableContent } from '../shared/content-governance';
import { trustRegistry } from '../shared/trust-registry';

const ROOT = path.resolve(import.meta.dirname, '..');
const EVIDENCE_DIR = path.join(ROOT, 'dist/release-evidence');
const now = new Date();
const failures: string[] = [];

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

mkdirSync(EVIDENCE_DIR, { recursive: true });
writeFileSync(path.join(EVIDENCE_DIR, 'publication-governance-report.json'), `${JSON.stringify({
  generatedAt: now.toISOString(),
  scope: 'Executable claim, content and trust publication gates. Qualified approval artifacts remain external mandatory evidence.',
  failureCount: failures.length,
  failures,
  claims,
  content,
  trust,
}, null, 2)}\n`);

if (failures.length) {
  failures.forEach((failure) => console.error(failure));
  process.exitCode = 1;
} else {
  console.log('Publication-governance validation passed.');
  console.log('Evidence: dist/release-evidence/publication-governance-report.json');
}
