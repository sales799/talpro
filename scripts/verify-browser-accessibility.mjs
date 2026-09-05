import { execFileSync, spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import axe from 'axe-core';
import puppeteer from 'puppeteer';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist/public');
const EVIDENCE_DIR = path.join(ROOT, 'dist/release-evidence');
const PORT = Number(process.env.ACCESSIBILITY_PORT ?? 4192);
if (!Number.isInteger(PORT) || PORT < 1024 || PORT > 65535) throw new Error(`Invalid ACCESSIBILITY_PORT: ${process.env.ACCESSIBILITY_PORT}`);
const BASE_URL = `http://127.0.0.1:${PORT}`;
const routes = JSON.parse(execFileSync('npx', ['tsx', 'scripts/seo-routes.ts'], {
  cwd: ROOT,
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'inherit'],
}));

function startServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npx', ['vite', 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, NODE_ENV: 'production' },
      detached: process.platform !== 'win32',
    });
    let settled = false;
    const ready = (data) => {
      if (!settled && data.toString().includes('Local:')) {
        settled = true;
        resolve(server);
      }
    };
    server.stdout.on('data', ready);
    server.stderr.on('data', ready);
    server.once('error', reject);
    server.once('exit', (code, signal) => {
      if (!settled) reject(new Error(`Accessibility preview exited before ready (code=${code}, signal=${signal})`));
    });
  });
}

async function stopServer(server) {
  if (!server?.pid) return;
  try {
    if (process.platform !== 'win32') process.kill(-server.pid, 'SIGTERM');
    else server.kill('SIGTERM');
  } catch (error) {
    if (error?.code !== 'ESRCH') throw error;
  }
}

function compactResult(entry) {
  return {
    id: entry.id,
    impact: entry.impact,
    description: entry.description,
    help: entry.help,
    helpUrl: entry.helpUrl,
    nodes: entry.nodes.map((node) => ({ impact: node.impact, target: node.target, summary: node.failureSummary })),
  };
}

if (!existsSync(path.join(DIST, 'index.html'))) throw new Error('Build output is missing; run the full build first.');
const server = await startServer();
let browser;
const reports = [];
const failures = [];

try {
  browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  for (const route of routes) {
    const page = await browser.newPage();
    try {
      await page.setBypassServiceWorker(true);
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
      // Audit the rendered entrance state, including delayed native animations.
      // Infinite decorative motion is excluded from this wait, not from axe.
      await page.evaluate(() => new Promise((resolve, reject) => {
        let readySince;
        const timeout = setTimeout(() => reject(new Error('Page fonts/entrance animations did not settle within 5 seconds')), 5000);
        const check = (now) => {
          const route = document.querySelector('main')?.firstElementChild;
          const activeEntrance = document.getAnimations().some((animation) => {
            const effect = animation.effect;
            const target = effect?.target;
            if (!(target instanceof Element) || !Number.isFinite(effect.getComputedTiming().endTime)) return false;
            const rect = target.getBoundingClientRect();
            const style = getComputedStyle(target);
            // Opacity zero still occupies layout and may have a delayed entrance.
            // axe audits rendered offscreen content too, not just this viewport.
            const visible = rect.width > 0 && rect.height > 0
              && style.display !== 'none' && style.visibility !== 'hidden';
            return visible && (animation.pending || animation.playState === 'running');
          });
          const ready = document.fonts.status === 'loaded'
            && (!route || getComputedStyle(route).opacity === '1') && !activeEntrance;
          readySince = ready ? (readySince ?? now) : undefined;
          if (readySince !== undefined && now - readySince >= 200) {
            clearTimeout(timeout);
            resolve();
          } else {
            requestAnimationFrame(check);
          }
        };
        requestAnimationFrame(check);
      }));
      await page.addScriptTag({ content: axe.source });
      const result = await page.evaluate(async () => globalThis.axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa', 'best-practice'] },
        resultTypes: ['violations', 'incomplete'],
      }));
      const violations = result.violations.map(compactResult);
      const incomplete = result.incomplete.map(compactResult);
      reports.push({ route, violations, incomplete });
      for (const violation of violations) failures.push({ route, id: violation.id, impact: violation.impact, nodes: violation.nodes.length });
      console.log(`${violations.length ? '❌' : '✅'} ${route}: ${violations.length} violations, ${incomplete.length} incomplete checks`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failures.push({ route, id: 'browser-audit-error', impact: 'critical', nodes: 0, message });
      reports.push({ route, violations: [], incomplete: [], error: message });
      console.error(`❌ ${route}: ${message}`);
    } finally {
      await page.close();
    }
  }
} finally {
  if (browser) await browser.close();
  await stopServer(server);
}

mkdirSync(EVIDENCE_DIR, { recursive: true });
writeFileSync(path.join(EVIDENCE_DIR, 'browser-accessibility-report.json'), `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  standardTarget: 'WCAG 2.2 AA',
  scope: 'Automated axe-core browser audit. Incomplete checks and all manual WCAG requirements remain human evidence gates.',
  routeCount: routes.length,
  failureCount: failures.length,
  failures,
  routes: reports,
}, null, 2)}\n`);

if (failures.length) {
  console.error(`Browser accessibility failed with ${failures.length} route/rule findings.`);
  process.exitCode = 1;
} else {
  console.log(`Browser accessibility passed for ${routes.length} governed routes.`);
  console.log('Evidence: dist/release-evidence/browser-accessibility-report.json');
}
