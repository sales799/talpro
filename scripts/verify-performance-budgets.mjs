import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist/public');
const ASSETS = path.join(DIST, 'assets');
const EVIDENCE_DIR = path.join(ROOT, 'dist/release-evidence');
const budgets = {
  largestJavaScriptBytes: 450_000,
  totalJavaScriptBytes: 900_000,
  totalCssBytes: 140_000,
  largestPrerenderedHtmlBytes: 100_000,
};

if (!existsSync(ASSETS)) throw new Error('Build assets are missing; run the full build first.');

const assets = readdirSync(ASSETS).map((name) => ({ name, bytes: statSync(path.join(ASSETS, name)).size }));
const javascript = assets.filter((asset) => asset.name.endsWith('.js'));
const css = assets.filter((asset) => asset.name.endsWith('.css'));
const routes = JSON.parse(execFileSync('npx', ['tsx', 'scripts/seo-routes.ts'], {
  cwd: ROOT,
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'inherit'],
}));
const routeDocuments = routes.map((route) => {
  const file = route === '/'
    ? path.join(DIST, 'index.html')
    : path.join(DIST, ...route.split('/').filter(Boolean), 'index.html');
  return { route, bytes: statSync(file).size };
});

const measurements = {
  largestJavaScriptBytes: Math.max(...javascript.map((asset) => asset.bytes)),
  totalJavaScriptBytes: javascript.reduce((sum, asset) => sum + asset.bytes, 0),
  totalCssBytes: css.reduce((sum, asset) => sum + asset.bytes, 0),
  largestPrerenderedHtmlBytes: Math.max(...routeDocuments.map((document) => document.bytes)),
};
const failures = Object.entries(budgets)
  .filter(([key, budget]) => measurements[key] > budget)
  .map(([key, budget]) => ({ metric: key, measured: measurements[key], budget }));

mkdirSync(EVIDENCE_DIR, { recursive: true });
writeFileSync(path.join(EVIDENCE_DIR, 'performance-budget-report.json'), `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  scope: 'Deterministic build-size budgets. These do not replace 75th-percentile production LCP, INP and CLS evidence.',
  budgets,
  measurements,
  failures,
  largestAssets: javascript.sort((a, b) => b.bytes - a.bytes).slice(0, 10),
  largestDocuments: routeDocuments.sort((a, b) => b.bytes - a.bytes).slice(0, 10),
}, null, 2)}\n`);

if (failures.length) {
  for (const failure of failures) console.error(`${failure.metric}: ${failure.measured} exceeds ${failure.budget}`);
  process.exitCode = 1;
} else {
  console.log('Performance build budgets passed.');
  console.log('Evidence: dist/release-evidence/performance-budget-report.json');
}
