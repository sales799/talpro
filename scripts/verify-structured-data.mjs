import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist/public');
const EVIDENCE_DIR = path.join(ROOT, 'dist/release-evidence');
const routes = JSON.parse(execFileSync('npx', ['tsx', 'scripts/seo-routes.ts'], {
  cwd: ROOT,
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'inherit'],
}));

function documentPath(route) {
  return route === '/'
    ? path.join(DIST, 'index.html')
    : path.join(DIST, ...route.split('/').filter(Boolean), 'index.html');
}

function present(value) {
  return typeof value === 'string' ? value.trim().length > 0 : value !== null && value !== undefined;
}

function validateItem(item) {
  const failures = [];
  const type = item?.['@type'];
  if (!present(item?.['@context'])) failures.push('missing @context');
  if (!present(type)) failures.push('missing @type');

  if (['Organization', 'EmploymentAgency'].includes(type)) {
    if (!present(item.name)) failures.push(`${type} missing name`);
    if (!present(item.url)) failures.push(`${type} missing url`);
  }
  if (type === 'WebSite') {
    if (!present(item.name)) failures.push('WebSite missing name');
    if (!present(item.url)) failures.push('WebSite missing url');
  }
  if (type === 'BreadcrumbList') {
    if (!Array.isArray(item.itemListElement) || item.itemListElement.length === 0) {
      failures.push('BreadcrumbList has no items');
    } else {
      item.itemListElement.forEach((entry, index) => {
        if (entry?.['@type'] !== 'ListItem') failures.push(`breadcrumb ${index + 1} is not ListItem`);
        if (entry?.position !== index + 1) failures.push(`breadcrumb ${index + 1} has invalid position`);
        if (!present(entry?.name)) failures.push(`breadcrumb ${index + 1} missing name`);
      });
    }
  }
  if (type === 'FAQPage') {
    if (!Array.isArray(item.mainEntity) || item.mainEntity.length === 0) {
      failures.push('FAQPage has no questions');
    } else {
      item.mainEntity.forEach((entry, index) => {
        if (entry?.['@type'] !== 'Question' || !present(entry?.name)) failures.push(`FAQ question ${index + 1} is invalid`);
        if (entry?.acceptedAnswer?.['@type'] !== 'Answer' || !present(entry?.acceptedAnswer?.text)) failures.push(`FAQ answer ${index + 1} is invalid`);
      });
    }
  }
  if (type === 'Service') {
    if (!present(item.name)) failures.push('Service missing name');
    if (!present(item.description)) failures.push('Service missing description');
    if (!present(item.areaServed)) failures.push('Service missing areaServed');
    if (!present(item.provider?.name)) failures.push('Service missing provider name');
  }
  if (type === 'JobPosting') {
    for (const field of ['title', 'description', 'datePosted', 'validThrough']) {
      if (!present(item[field])) failures.push(`JobPosting missing ${field}`);
    }
    if (!present(item.hiringOrganization?.name)) failures.push('JobPosting missing hiring organization');
    if (!present(item.jobLocation) && item.jobLocationType !== 'TELECOMMUTE') failures.push('JobPosting missing job location');
  }
  return failures;
}

const routeReports = [];
const failures = [];
let jobPostingCount = 0;

for (const route of routes) {
  const file = documentPath(route);
  const items = [];
  const routeFailures = [];
  if (!existsSync(file)) {
    routeFailures.push('prerendered document is missing');
  } else {
    const html = readFileSync(file, 'utf8');
    for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        const value = JSON.parse(match[1]);
        const values = Array.isArray(value) ? value : [value];
        for (const item of values) {
          items.push(item);
          if (item?.['@type'] === 'JobPosting') jobPostingCount += 1;
          routeFailures.push(...validateItem(item));
        }
      } catch (error) {
        routeFailures.push(`invalid JSON-LD: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    if (items.length === 0) routeFailures.push('no structured data found');
    if (route.startsWith('/services/') && !items.some((item) => item?.['@type'] === 'Service')) {
      routeFailures.push('governed service route has no Service schema');
    }
    if (route === '/' && !items.some((item) => item?.['@type'] === 'WebSite')) {
      routeFailures.push('homepage has no WebSite schema');
    }
  }
  failures.push(...routeFailures.map((failure) => ({ route, failure })));
  routeReports.push({ route, types: items.map((item) => item?.['@type']).filter(Boolean), failures: routeFailures });
}

// No vacancy is currently approved for publication. A JobPosting appearing in
// this build would be an evidence-governance failure, not progress.
if (jobPostingCount !== 0) failures.push({ route: '/jobs', failure: 'JobPosting published without an approved vacancy pack' });

mkdirSync(EVIDENCE_DIR, { recursive: true });
writeFileSync(path.join(EVIDENCE_DIR, 'structured-data-report.json'), `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  routeCount: routes.length,
  jobPostingCount,
  failureCount: failures.length,
  failures,
  routes: routeReports,
}, null, 2)}\n`);

if (failures.length) {
  failures.forEach(({ route, failure }) => console.error(`${route}: ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`Structured-data validation passed for ${routes.length} governed routes.`);
  console.log('Evidence: dist/release-evidence/structured-data-report.json');
}
