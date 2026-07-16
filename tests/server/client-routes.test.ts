import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { getProgrammaticRoutes } from '../../client/src/config/programmaticSeo';
import { isKnownClientRoute } from '../../server/client-routes';

describe('SPA route status mapping', () => {
  it('recognizes known static and dynamic client routes', () => {
    expect(isKnownClientRoute('/')).toBe(true);
    expect(isKnownClientRoute('/contact')).toBe(true);
    expect(isKnownClientRoute('/services/it-staffing')).toBe(true);
    expect(isKnownClientRoute('/industries/fintech-financial-services')).toBe(true);
    expect(isKnownClientRoute('/locations/bengaluru')).toBe(true);
    expect(isKnownClientRoute('/hire/react-developer/in/fintech-financial-services')).toBe(true);
    expect(isKnownClientRoute('/industries/fintech-financial-services/bengaluru')).toBe(true);
    expect(isKnownClientRoute('/salary-guide/react-developer/')).toBe(true);
  });

  it('recognizes every generated SEO route', () => {
    for (const route of getProgrammaticRoutes()) {
      expect(isKnownClientRoute(route), route).toBe(true);
    }
  });

  it('recognizes every URL published in the static sitemaps', () => {
    const sitemapFiles = [
      'core.xml',
      'services.xml',
      'roles.xml',
      'locations.xml',
      'industries.xml',
      'guides.xml',
    ];

    for (const filename of sitemapFiles) {
      const xml = readFileSync(
        resolve(process.cwd(), 'client/public/sitemap', filename),
        'utf8',
      );
      const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
        ([, url]) => new URL(url).pathname,
      );

      expect(paths.length, `${filename} should publish routes`).toBeGreaterThan(0);
      for (const path of paths) {
        expect(isKnownClientRoute(path), `${filename}: ${path}`).toBe(true);
      }
    }
  });

  it('marks unknown routes and invalid content slugs as true 404s', () => {
    expect(isKnownClientRoute('/some-nonexistent-route')).toBe(false);
    expect(isKnownClientRoute('/totally/missing/path')).toBe(false);
    expect(isKnownClientRoute('/services/not-a-real-service')).toBe(false);
    expect(isKnownClientRoute('/industries/not-a-real-industry')).toBe(false);
    expect(isKnownClientRoute('/hire/not-a-real-role')).toBe(false);
    expect(isKnownClientRoute('/compare/not-a-real-comparison')).toBe(false);
  });
});
