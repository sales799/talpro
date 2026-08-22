import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';

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

function normalizedText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

const results = [];
let failureCount = 0;

for (const route of routes) {
  const file = documentPath(route);
  const failures = [];
  if (!existsSync(file)) {
    failures.push('prerendered document is missing');
  } else {
    const html = readFileSync(file, 'utf8');
    const $ = cheerio.load(html);
    const ids = new Set();

    if ($('html').attr('lang')?.toLowerCase() !== 'en') failures.push('html lang must be en');
    if ($('main').length !== 1) failures.push(`expected one main landmark; found ${$('main').length}`);
    if ($('h1').length !== 1) failures.push(`expected one H1; found ${$('h1').length}`);
    if ($('a[href="#main-content"]').length !== 1) failures.push('skip link to #main-content is missing or duplicated');

    $('[id]').each((_index, element) => {
      const id = $(element).attr('id');
      if (!id) return;
      if (ids.has(id)) failures.push(`duplicate id: ${id}`);
      ids.add(id);
    });

    $('img').each((_index, element) => {
      if ($(element).attr('alt') === undefined) failures.push('image missing alt attribute');
    });

    $('button').each((_index, element) => {
      const button = $(element);
      const name = normalizedText(button.text()) || button.attr('aria-label') || button.attr('title');
      if (!name) failures.push('button has no accessible name');
    });

    $('a[href]').each((_index, element) => {
      const link = $(element);
      const imageAlt = link.find('img').map((_i, image) => $(image).attr('alt') || '').get().join(' ');
      const name = normalizedText(link.text()) || link.attr('aria-label') || normalizedText(imageAlt);
      if (!name) failures.push(`link has no accessible name: ${link.attr('href')}`);
    });

    $('input:not([type="hidden"]), textarea, select').each((_index, element) => {
      const field = $(element);
      if (field.attr('aria-hidden') === 'true' || field.closest('[aria-hidden="true"]').length) return;
      const id = field.attr('id');
      const labelled = Boolean(
        field.attr('aria-label')
        || field.attr('aria-labelledby')
        || (id && $(`label[for="${id}"]`).length),
      );
      if (!labelled) failures.push(`${element.tagName} control has no accessible label`);
    });

    $('[tabindex]').each((_index, element) => {
      const value = Number($(element).attr('tabindex'));
      if (Number.isFinite(value) && value > 0) failures.push(`positive tabindex is not allowed: ${value}`);
    });

    $('[aria-labelledby]').each((_index, element) => {
      for (const id of ($(element).attr('aria-labelledby') || '').split(/\s+/).filter(Boolean)) {
        if (!ids.has(id)) failures.push(`aria-labelledby references missing id: ${id}`);
      }
    });
  }

  failureCount += failures.length;
  results.push({ route, failures });
}

mkdirSync(EVIDENCE_DIR, { recursive: true });
writeFileSync(path.join(EVIDENCE_DIR, 'automated-accessibility-report.json'), `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  standardTarget: 'WCAG 2.2 AA',
  scope: 'Automated document semantics only; keyboard, screen-reader, contrast, zoom, motion and device review remain human gates.',
  routeCount: routes.length,
  failureCount,
  routes: results,
}, null, 2)}\n`);

if (failureCount) {
  for (const result of results.filter((record) => record.failures.length)) {
    console.error(`${result.route}: ${result.failures.join('; ')}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Automated accessibility semantics passed for ${routes.length} governed routes.`);
  console.log('Evidence: dist/release-evidence/automated-accessibility-report.json');
}
