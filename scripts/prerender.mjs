/**
 * Build-time prerendering script for TalproIndia.com
 *
 * Generates static HTML for all routes so search engines can crawl them.
 * Runs after `vite build` — uses Puppeteer to visit each route in headless Chrome,
 * captures the fully rendered DOM, and saves it as {route}/index.html.
 *
 * Usage: node scripts/prerender.mjs
 */

import { execSync, spawn } from 'child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.resolve(ROOT, 'dist/public');
const SPA_SHELL = path.join(DIST, 'spa.html');

function loadRoutes(args = []) {
  const output = execSync(`npx tsx scripts/seo-routes.ts ${args.join(' ')}`, {
    cwd: ROOT,
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'inherit'],
  });
  return JSON.parse(output);
}

const FULL_ROUTES = loadRoutes();

const ROUTE_INPUT = process.env.PRERENDER_ROUTES;
const ROUTES = ROUTE_INPUT
  ? ROUTE_INPUT.split(',')
      .map((route) => route.trim())
      .filter(Boolean)
  : FULL_ROUTES;

const PORT = 4173; // Vite preview default
const BASE_URL = `http://localhost:${PORT}`;
const PUBLIC_BASE_URL = 'https://talproindia.com';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
      cwd: ROOT,
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, NODE_ENV: 'production' },
      detached: process.platform !== 'win32',
    });

    let started = false;

    server.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Local:') && !started) {
        started = true;
        resolve(server);
      }
    });

    server.stderr.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Local:') && !started) {
        started = true;
        resolve(server);
      }
    });

    // Timeout after 15 seconds
    setTimeout(() => {
      if (!started) {
        // Try resolving anyway — server might be ready
        started = true;
        resolve(server);
      }
    }, 15000);

    server.on('error', reject);
  });
}

async function stopPreviewServer(server) {
  if (!server) return;

  let closed = false;
  const closedPromise = new Promise((resolve) => {
    server.once('close', () => {
      closed = true;
      resolve();
    });
  });

  const sendSignal = (signal) => {
    try {
      if (process.platform !== 'win32' && server.pid) {
        process.kill(-server.pid, signal);
      } else {
        server.kill(signal);
      }
    } catch (err) {
      if (err.code !== 'ESRCH') throw err;
    }
  };

  sendSignal('SIGTERM');
  await Promise.race([closedPromise, sleep(5000)]);

  if (!closed) {
    sendSignal('SIGKILL');
    await Promise.race([closedPromise, sleep(2000)]);
  }
}

async function prerender() {
  console.log('🔍 Starting prerender of', ROUTES.length, 'routes...\n');

  if (!existsSync(DIST)) {
    console.error('❌ Build output not found at', DIST);
    console.error('   Run `npm run build` first.');
    process.exit(1);
  }

  // Preserve the unrendered Vite document for dynamic, unavailable, and 404
  // responses. The homepage prerender replaces index.html, so using index.html
  // as the generic SPA fallback would leak homepage content into every route.
  if (!existsSync(SPA_SHELL)) {
    writeFileSync(SPA_SHELL, readFileSync(path.join(DIST, 'index.html'), 'utf-8'), 'utf-8');
  }

  // Start a preview server to serve the built SPA
  console.log('🚀 Starting preview server...');
  const server = await startPreviewServer();

  // Wait a moment for server to be fully ready
  await new Promise(r => setTimeout(r, 3000));

  let browser;
  try {
    const puppeteer = await import('puppeteer');
    browser = await puppeteer.default.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    let success = 0;
    let failed = 0;

    for (const route of ROUTES) {
      try {
        const page = await browser.newPage();

        // Block unnecessary resources for faster rendering
        await page.setRequestInterception(true);
        page.on('request', (req) => {
          const type = req.resourceType();
          if (['image', 'stylesheet', 'font', 'media'].includes(type)) {
            req.abort();
          } else {
            req.continue();
          }
        });

        const url = `${BASE_URL}${route}`;
        await page.goto(url, {
          waitUntil: 'networkidle0',
          timeout: 30000,
        });

        // Wait for React to render (Suspense lazy loading)
        await page.waitForFunction(
          () => {
            const root = document.getElementById('root');
            return root && root.children.length > 0 && !root.querySelector('.animate-spin');
          },
          { timeout: 15000 }
        );

        // Wait for react-helmet-async to inject head tags
        await page.waitForFunction(
          () => document.querySelector('script[type="application/ld+json"]') !== null ||
                document.querySelector('meta[data-rh="true"]') !== null,
          { timeout: 5000 }
        ).catch(() => {
          // Some pages may not have JSON-LD — that's ok
        });

        // Small delay for any final renders
        await new Promise(r => setTimeout(r, 500));

        // Get the rendered HTML (includes head modifications from react-helmet-async)
        const html = await page.content();

        // Determine output path
        const outputDir = route === '/'
          ? DIST
          : path.join(DIST, route);

        mkdirSync(outputDir, { recursive: true });

        const outputFile = path.join(outputDir, 'index.html');
        writeFileSync(outputFile, html, 'utf-8');

        // Verify content was actually rendered (not just spinner)
        const hasContent = html.includes('TalPro') && html.length > 5000;
        const marker = hasContent ? '✅' : '⚠️';
        console.log(`${marker} ${route} → ${outputFile} (${Math.round(html.length / 1024)}KB)`);

        success++;
        await page.close();
      } catch (err) {
        console.error(`❌ ${route} — ${err.message}`);
        failed++;
      }
    }

    console.log(`\n📊 Prerender complete: ${success} success, ${failed} failed out of ${ROUTES.length} routes`);
    writeSegmentedSitemaps();

    if (failed > 0) {
      console.log('⚠️  Some routes failed to prerender. Check the errors above.');
    }

  } finally {
    if (browser) await browser.close();
    await stopPreviewServer(server);
  }
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function sitemapXml(routes) {
  const urls = routes
    .map((route) => {
      const loc = `${PUBLIC_BASE_URL}${route === '/' ? '' : route}`;
      return `  <url><loc>${escapeXml(loc)}</loc></url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function writeSegmentedSitemaps() {
  const groups = loadRoutes(['--groups']);
  const sourceDir = path.join(ROOT, 'client/public/sitemap');
  const distDir = path.join(DIST, 'sitemap');
  mkdirSync(sourceDir, { recursive: true });
  mkdirSync(distDir, { recursive: true });

  const segments = {
    core: [...groups.core, ...groups.audiences],
    services: [...groups.services, ...groups.serviceCities],
    roles: [...groups.roles, ...groups.roleCities, ...groups.roleIndustries],
    locations: groups.locations,
    industries: [...groups.industries, ...groups.industryCities],
    guides: [...groups.salaryGuides, ...groups.comparisons, ...groups.resources],
  };

  const indexEntries = Object.entries(segments)
    .filter(([, routes]) => routes.length > 0)
    .map(([name]) => `  <sitemap><loc>${PUBLIC_BASE_URL}/sitemap/${name}.xml</loc></sitemap>`)
    .join('\n');
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexEntries}\n</sitemapindex>\n`;

  for (const [name, routes] of Object.entries(segments)) {
    const xml = sitemapXml(Array.from(new Set(routes)));
    writeFileSync(path.join(sourceDir, `${name}.xml`), xml, 'utf-8');
    writeFileSync(path.join(distDir, `${name}.xml`), xml, 'utf-8');
  }
  writeFileSync(path.join(sourceDir, 'index.xml'), indexXml, 'utf-8');
  writeFileSync(path.join(distDir, 'index.xml'), indexXml, 'utf-8');
  console.log(`🗺️  Segmented sitemaps written to ${sourceDir} and ${distDir}`);
}

if (process.argv.includes('--sitemaps-only')) {
  writeSegmentedSitemaps();
} else {
  prerender().catch((err) => {
    console.error('Fatal prerender error:', err);
    process.exit(1);
  });
}
