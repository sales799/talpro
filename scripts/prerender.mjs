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

// All routes to prerender (static + parameterized with known slugs)
const ROUTES = [
  // Core pages
  '/',
  '/about',
  '/services',
  '/contact',
  '/careers',
  '/how-we-work',
  '/case-studies',
  '/blog',
  '/salary-guide',
  '/salary-calculator',
  '/for-candidates',
  '/staffing-quiz',
  '/gcc-hub',
  '/privacy-policy',
  '/terms-of-service',

  // Service pages (11 staffing services)
  '/services/it-staffing',
  '/services/engineering-staffing',
  '/services/sales-staffing',
  '/services/direct-hiring-functions',
  '/services/direct-hiring-it',
  '/services/executive-search',
  '/services/gcc-accelerator',
  '/services/cloud-devops-staffing',
  '/services/data-ai-staffing',
  '/services/sap-enterprise-staffing',
  '/services/cybersecurity-staffing',

  // Industry pages (5 industries)
  '/industries/fintech-financial-services',
  '/industries/media-entertainment-technology',
  '/industries/healthcare-medical-technology',
  '/industries/ecommerce-retail-solutions',
  '/industries/education-edtech-solutions',

  // Location/city pages (6 metros)
  '/locations/bengaluru',
  '/locations/hyderabad',
  '/locations/pune',
  '/locations/chennai',
  '/locations/mumbai',
  '/locations/delhi-ncr',
];

const PORT = 4173; // Vite preview default
const BASE_URL = `http://localhost:${PORT}`;

async function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
      cwd: ROOT,
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, NODE_ENV: 'production' },
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

async function prerender() {
  console.log('🔍 Starting prerender of', ROUTES.length, 'routes...\n');

  if (!existsSync(DIST)) {
    console.error('❌ Build output not found at', DIST);
    console.error('   Run `npm run build` first.');
    process.exit(1);
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

    if (failed > 0) {
      console.log('⚠️  Some routes failed to prerender. Check the errors above.');
    }

  } finally {
    if (browser) await browser.close();
    server.kill('SIGTERM');
  }
}

prerender().catch((err) => {
  console.error('Fatal prerender error:', err);
  process.exit(1);
});
