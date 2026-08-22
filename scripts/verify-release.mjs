import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist/public');
const EVIDENCE_DIR = path.join(ROOT, 'dist/release-evidence');

function fail(message) {
  console.error(`Release verification failed: ${message}`);
  process.exitCode = 1;
}

function loadRoutes() {
  const output = execFileSync('npx', ['tsx', 'scripts/seo-routes.ts'], {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
  });
  return JSON.parse(output);
}

function documentPath(route) {
  return route === '/'
    ? path.join(DIST, 'index.html')
    : path.join(DIST, ...route.split('/').filter(Boolean), 'index.html');
}

function textContent(fragment) {
  return fragment
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const routes = loadRoutes();
const routeSet = new Set(routes);
const records = [];
const fingerprints = new Map();
const internalLinks = new Map();
const redirectPatterns = [
  /^\/case-studies(?:\/|$)/,
  /^\/industries(?:\/|$)/,
  /^\/salary-guide(?:\/|$)/,
  /^\/salary-calculator$/,
  /^\/(?:refund|shipping)$/,
  /^\/gcc-hub$/,
  /^\/locations(?:\/|$)/,
  /^\/staffing-quiz$/,
  /^\/hire(?:\/|$)/,
  /^\/compare(?:\/|$)/,
  /^\/blog(?:\/|$)/,
  /^\/(?:privacy|terms)$/,
  /^\/jobs\/[a-z0-9]+(?:-[a-z0-9]+)*$/,
];

if (!existsSync(path.join(DIST, 'spa.html'))) {
  fail('dist/public/spa.html is missing; dynamic and error routes would reuse the homepage document');
}

for (const route of routes) {
  const file = documentPath(route);
  if (!existsSync(file)) {
    fail(`${route} has no prerendered document at ${path.relative(ROOT, file)}`);
    continue;
  }

  const html = readFileSync(file, 'utf8');
  const title = textContent(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '');
  const h1 = textContent(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '');
  const body = textContent(html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || html);
  const fingerprint = createHash('sha256').update(body).digest('hex');
  const expectedCanonical = `https://talproindia.com${route === '/' ? '/' : route}`;
  const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1]
    || html.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)?.[1]
    || '';
  const structuredDataTypes = [];

  if (!title) fail(`${route} has no rendered title`);
  if (!h1) fail(`${route} has no rendered H1`);
  if (body.length < 500) fail(`${route} has insufficient rendered content`);
  if (canonical !== expectedCanonical) {
    fail(`${route} canonical is ${canonical || 'missing'}; expected ${expectedCanonical}`);
  }

  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const value = JSON.parse(match[1]);
      const items = Array.isArray(value) ? value : [value];
      for (const item of items) {
        if (item && typeof item === 'object' && item['@type']) structuredDataTypes.push(item['@type']);
      }
    } catch (error) {
      fail(`${route} has invalid JSON-LD: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) {
    const href = match[1];
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const pathname = new URL(href, 'https://talproindia.com').pathname.replace(/\/+$/, '') || '/';
    const sources = internalLinks.get(pathname) || new Set();
    sources.add(route);
    internalLinks.set(pathname, sources);
  }

  const duplicate = fingerprints.get(fingerprint);
  if (duplicate) {
    fail(`${route} duplicates the rendered body fingerprint of ${duplicate}`);
  } else {
    fingerprints.set(fingerprint, route);
  }

  records.push({
    route,
    expectedStatus: 200,
    canonicalUrl: canonical,
    title,
    h1,
    structuredDataTypes,
    contentFingerprint: fingerprint,
    renderedBytes: Buffer.byteLength(html),
  });
}

const brokenLinks = [...internalLinks.entries()]
  .filter(([pathname]) => (
    !routeSet.has(pathname)
    && !redirectPatterns.some((pattern) => pattern.test(pathname))
    && !pathname.startsWith('/api/')
  ))
  .map(([pathname, sources]) => ({ pathname, sources: [...sources] }));

for (const link of brokenLinks) {
  fail(`${link.pathname} is linked from ${link.sources.join(', ')} but is neither governed nor redirected`);
}

for (const retiredPath of [
  'hire/react-developer/index.html',
  'case-studies/index.html',
  'salary-guide/index.html',
  'blog/index.html',
]) {
  if (existsSync(path.join(DIST, retiredPath))) {
    fail(`retired publication surface remains in the build: ${retiredPath}`);
  }
}

mkdirSync(EVIDENCE_DIR, { recursive: true });
writeFileSync(
  path.join(EVIDENCE_DIR, 'route-and-soft-404-report.json'),
  `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    routeCount: records.length,
    internalLinkCount: internalLinks.size,
    brokenLinks,
    routes: records,
  }, null, 2)}\n`,
  'utf8',
);

if (!process.exitCode) {
  console.log(`Release verification passed for ${records.length} governed routes.`);
  console.log('Evidence: dist/release-evidence/route-and-soft-404-report.json');
}
