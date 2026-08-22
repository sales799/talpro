import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EVIDENCE_DIR = path.join(ROOT, 'dist/release-evidence');
const LOCAL_REPORT = path.join(EVIDENCE_DIR, 'route-and-soft-404-report.json');
const BASE_URL = 'https://talproindia.com';
if (!existsSync(LOCAL_REPORT)) throw new Error('Local release report is missing; build and verify the candidate first.');
const candidate = JSON.parse(readFileSync(LOCAL_REPORT, 'utf8'));

function textContent(fragment) {
  return fragment
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function pageRecord(route, status, headers, body) {
  const title = textContent(body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '');
  const h1 = textContent(body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '');
  const bodyText = textContent(body.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || body);
  const canonical = body.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1]
    || body.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)?.[1]
    || '';
  return {
    route,
    status,
    contentType: headers.get('content-type'),
    title,
    h1,
    canonical,
    contentFingerprint: createHash('sha256').update(bodyText).digest('hex'),
  };
}

async function get(pathname) {
  const response = await fetch(`${BASE_URL}${pathname}`, {
    redirect: 'manual',
    headers: { 'user-agent': 'Talpro-Constitution-Monitor/2.1' },
    signal: AbortSignal.timeout(15000),
  });
  const body = await response.text();
  return { response, body };
}

const failures = [];
const routes = [];
for (const expected of candidate.routes) {
  try {
    const { response, body } = await get(expected.route);
    const actual = pageRecord(expected.route, response.status, response.headers, body);
    const routeFailures = [];
    if (actual.status !== 200) routeFailures.push(`status ${actual.status}; expected 200`);
    if (actual.title !== expected.title) routeFailures.push('title differs from candidate');
    if (actual.h1 !== expected.h1) routeFailures.push('H1 differs from candidate');
    if (actual.canonical !== expected.canonicalUrl) routeFailures.push('canonical differs from candidate');
    if (actual.contentFingerprint !== expected.contentFingerprint) routeFailures.push('body fingerprint differs from candidate');
    failures.push(...routeFailures.map((failure) => ({ route: expected.route, failure })));
    routes.push({ ...actual, failures: routeFailures });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failures.push({ route: expected.route, failure: message });
    routes.push({ route: expected.route, error: message, failures: [message] });
  }
}

const probes = [];
for (const pathname of ['/release-route-must-not-exist', '/api/health', '/api/health/ready', '/api/release-route-must-not-exist', '/robots.txt', '/sitemap.xml']) {
  try {
    const { response, body } = await get(pathname);
    probes.push({ pathname, status: response.status, contentType: response.headers.get('content-type'), bodyHash: createHash('sha256').update(body).digest('hex') });
    if (pathname === '/release-route-must-not-exist' && response.status !== 404) failures.push({ route: pathname, failure: `status ${response.status}; expected 404` });
    if (pathname === '/api/health' && response.status !== 200) failures.push({ route: pathname, failure: `status ${response.status}; expected 200` });
    if (pathname === '/api/health/ready' && response.status !== 200) failures.push({ route: pathname, failure: `status ${response.status}; expected 200` });
    if (pathname === '/api/release-route-must-not-exist' && (response.status !== 404 || !String(response.headers.get('content-type')).startsWith('application/problem+json'))) {
      failures.push({ route: pathname, failure: 'unknown API route is not a problem+json 404' });
    }
    if (pathname === '/robots.txt') {
      const local = readFileSync(path.join(ROOT, 'dist/public/robots.txt'), 'utf8');
      if (body !== local) failures.push({ route: pathname, failure: 'live robots.txt differs from candidate' });
    }
    if (pathname === '/sitemap.xml') {
      const local = readFileSync(path.join(ROOT, 'dist/public/sitemap.xml'), 'utf8');
      if (body !== local) failures.push({ route: pathname, failure: 'live sitemap.xml differs from candidate' });
    }
  } catch (error) {
    failures.push({ route: pathname, failure: error instanceof Error ? error.message : String(error) });
  }
}

try {
  const { response } = await get('/');
  const csp = response.headers.get('content-security-policy') || '';
  if (!csp || csp.includes("'unsafe-eval'")) failures.push({ route: '/', failure: 'live CSP is missing or contains unsafe-eval' });
} catch (error) {
  failures.push({ route: '/', failure: `header probe failed: ${error instanceof Error ? error.message : String(error)}` });
}

mkdirSync(EVIDENCE_DIR, { recursive: true });
writeFileSync(path.join(EVIDENCE_DIR, 'live-production-monitor-report.json'), `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  baseUrl: BASE_URL,
  candidateRouteCount: candidate.routes.length,
  failureCount: failures.length,
  failures,
  routes,
  probes,
}, null, 2)}\n`);

if (failures.length) {
  console.error(`Production monitor found ${failures.length} release differences/failures.`);
  for (const failure of failures.slice(0, 30)) console.error(`${failure.route}: ${failure.failure}`);
  if (failures.length > 30) console.error(`...and ${failures.length - 30} more. See the evidence report.`);
  process.exitCode = 1;
} else {
  console.log(`Production matches the candidate across ${candidate.routes.length} governed routes.`);
  console.log('Evidence: dist/release-evidence/live-production-monitor-report.json');
}
