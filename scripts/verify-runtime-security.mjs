import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EVIDENCE_DIR = path.join(ROOT, 'dist/release-evidence');
const PORT = Number(process.env.SECURITY_VERIFY_PORT ?? 4193);
if (!Number.isInteger(PORT) || PORT < 1024 || PORT > 65535) throw new Error(`Invalid SECURITY_VERIFY_PORT: ${process.env.SECURITY_VERIFY_PORT}`);
for (const secretFile of ['.env', '.env.local', '.env.production']) {
  if (existsSync(path.join(ROOT, secretFile))) throw new Error(`Refusing isolated runtime verification while ${secretFile} exists in the repository root.`);
}
if (!existsSync(path.join(ROOT, 'dist/index.js'))) throw new Error('Built server is missing; run the full build first.');

function request(pathname) {
  return new Promise((resolve, reject) => {
    const request = http.get({ hostname: '127.0.0.1', port: PORT, path: pathname, timeout: 10000 }, (response) => {
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve({
        path: pathname,
        status: response.statusCode,
        headers: response.headers,
        rawHeaders: response.rawHeaders,
        body: Buffer.concat(chunks).toString('utf8'),
      }));
    });
    request.on('timeout', () => request.destroy(new Error(`Timed out requesting ${pathname}`)));
    request.on('error', reject);
  });
}

function headerCount(record, name) {
  let count = 0;
  for (let index = 0; index < record.rawHeaders.length; index += 2) {
    if (record.rawHeaders[index].toLowerCase() === name.toLowerCase()) count += 1;
  }
  return count;
}

const server = spawn(process.execPath, ['dist/index.js'], {
  cwd: ROOT,
  stdio: ['ignore', 'ignore', 'ignore'],
  env: { PATH: process.env.PATH ?? '', NODE_ENV: 'production', PORT: String(PORT), NO_COLOR: '1' },
});

try {
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await request('/api/health');
      if (response.status === 200) {
        ready = true;
        break;
      }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  if (!ready) throw new Error('Isolated runtime did not become healthy.');

  const records = await Promise.all([
    request('/'),
    request('/release-route-must-not-exist'),
    request('/api/health'),
    request('/api/health/ready'),
    request('/api/release-route-must-not-exist'),
  ]);
  const byPath = Object.fromEntries(records.map((record) => [record.path, record]));
  const homepage = byPath['/'];
  const html404 = byPath['/release-route-must-not-exist'];
  const api404 = byPath['/api/release-route-must-not-exist'];
  const csp = homepage.headers['content-security-policy'] ?? '';
  const failures = [];
  const requireHeader = (name, predicate, description) => {
    const value = homepage.headers[name];
    if (!value || !predicate(String(value))) failures.push(`${name}: ${description}`);
    if (headerCount(homepage, name) !== 1) failures.push(`${name}: expected one header instance; found ${headerCount(homepage, name)}`);
  };

  requireHeader('strict-transport-security', (value) => /max-age=\d+/.test(value), 'HSTS max-age is missing');
  requireHeader('x-frame-options', (value) => value.toUpperCase() === 'DENY', 'must be DENY');
  requireHeader('x-content-type-options', (value) => value.toLowerCase() === 'nosniff', 'must be nosniff');
  requireHeader('referrer-policy', (value) => value.includes('strict-origin-when-cross-origin'), 'strict referrer policy is missing');
  requireHeader('permissions-policy', (value) => value.includes('camera=()') && value.includes('microphone=()'), 'restrictive permissions are missing');
  requireHeader('content-security-policy', (value) => !value.includes("'unsafe-eval'") && value.includes("frame-ancestors 'none'") && value.includes("base-uri 'self'") && value.includes("form-action 'self'"), 'CSP is missing required controls or contains unsafe-eval');

  if (homepage.status !== 200) failures.push(`homepage returned ${homepage.status}`);
  if (html404.status !== 404 || !String(html404.headers['content-type']).startsWith('text/html')) failures.push('unknown HTML route is not a genuine HTML 404');
  if (api404.status !== 404 || !String(api404.headers['content-type']).startsWith('application/problem+json')) failures.push('unknown API route is not an RFC problem JSON 404');
  if (byPath['/api/health'].status !== 200) failures.push('health endpoint did not return 200');
  if (byPath['/api/health/ready'].status !== 200) failures.push('readiness endpoint did not return 200');
  const homepageHash = createHash('sha256').update(homepage.body).digest('hex');
  const notFoundHash = createHash('sha256').update(html404.body).digest('hex');
  if (homepageHash === notFoundHash) failures.push('unknown HTML route reuses the homepage body');

  mkdirSync(EVIDENCE_DIR, { recursive: true });
  writeFileSync(path.join(EVIDENCE_DIR, 'runtime-security-report.json'), `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    scope: 'Isolated production-mode runtime with no inherited application secrets or database configuration.',
    failureCount: failures.length,
    failures,
    headers: {
      strictTransportSecurity: homepage.headers['strict-transport-security'],
      xFrameOptions: homepage.headers['x-frame-options'],
      xContentTypeOptions: homepage.headers['x-content-type-options'],
      referrerPolicy: homepage.headers['referrer-policy'],
      permissionsPolicy: homepage.headers['permissions-policy'],
      contentSecurityPolicy: csp,
    },
    routes: records.map((record) => ({ path: record.path, status: record.status, contentType: record.headers['content-type'] })),
    homepageHash,
    notFoundHash,
  }, null, 2)}\n`);

  if (failures.length) {
    failures.forEach((failure) => console.error(failure));
    process.exitCode = 1;
  } else {
    console.log('Isolated runtime security verification passed.');
    console.log('Evidence: dist/release-evidence/runtime-security-report.json');
  }
} finally {
  server.kill('SIGTERM');
}
