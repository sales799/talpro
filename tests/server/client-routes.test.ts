import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import express from 'express';
import request from 'supertest';
import { isKnownClientRoute, redirectClientRoute } from '../../server/client-routes';

describe('legacy route attribution', () => {
  it.each([
    ['', '/services/it-staffing'],
    ['?utm_source=partner&utm_campaign=gcc%20launch&service=data-ai-staffing', '/services/it-staffing?utm_source=partner&utm_campaign=gcc%20launch&service=data-ai-staffing'],
    ['?tag=one&tag=two&return=%2Fcontact%3Fservice%3Dit-staffing', '/services/it-staffing?tag=one&tag=two&return=%2Fcontact%3Fservice%3Dit-staffing'],
  ])('preserves the original query on permanent redirects: %s', async (query, destination) => {
    const app = express();
    app.get('/services/data-ai-staffing', (req, res) => redirectClientRoute(req, res, '/services/it-staffing'));
    const response = await request(app).get(`/services/data-ai-staffing${query}`);
    expect(response.status).toBe(301);
    expect(response.headers.location).toBe(destination);
  });
});

describe('SPA route status mapping', () => {
  it('recognizes known static and dynamic client routes', () => {
    expect(isKnownClientRoute('/')).toBe(true);
    expect(isKnownClientRoute('/contact')).toBe(true);
    expect(isKnownClientRoute('/services/it-staffing')).toBe(true);
    expect(isKnownClientRoute('/services/contract-staffing')).toBe(true);
    expect(isKnownClientRoute('/services/permanent-hiring')).toBe(true);
    expect(isKnownClientRoute('/services/rpo-managed-talent')).toBe(true);
    expect(isKnownClientRoute('/jobs')).toBe(true);
    expect(isKnownClientRoute('/jobs/senior-platform-engineer')).toBe(true);
    expect(isKnownClientRoute('/who-we-serve')).toBe(true);
    expect(isKnownClientRoute('/who-we-serve/technology-leaders')).toBe(true);
    expect(isKnownClientRoute('/jobs/Invalid Slug')).toBe(false);
    expect(isKnownClientRoute('/locations/bengaluru')).toBe(false);
    expect(isKnownClientRoute('/salary-guide/react-developer/')).toBe(false);
  });

  it('recognizes the governed resource route', () => {
    expect(isKnownClientRoute('/resources')).toBe(true);
    expect(isKnownClientRoute('/trust')).toBe(true);
    expect(isKnownClientRoute('/candidate-safety')).toBe(true);
    expect(isKnownClientRoute('/accessibility')).toBe(true);
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

      if (filename === 'industries.xml' || filename === 'locations.xml' || filename === 'roles.xml') {
        expect(paths, `${filename} should be empty until supporting claims are approved`).toHaveLength(0);
      } else {
        expect(paths.length, `${filename} should publish routes`).toBeGreaterThan(0);
      }
      for (const path of paths) {
        expect(isKnownClientRoute(path), `${filename}: ${path}`).toBe(true);
      }
    }
  });

  it('marks unknown routes and invalid content slugs as true 404s', () => {
    expect(isKnownClientRoute('/some-nonexistent-route')).toBe(false);
    expect(isKnownClientRoute('/totally/missing/path')).toBe(false);
    expect(isKnownClientRoute('/services/not-a-real-service')).toBe(false);
    expect(isKnownClientRoute('/services/engineering-staffing')).toBe(false);
    expect(isKnownClientRoute('/case-studies')).toBe(false);
    expect(isKnownClientRoute('/industries/not-a-real-industry')).toBe(false);
    expect(isKnownClientRoute('/industries/fintech-financial-services')).toBe(false);
    expect(isKnownClientRoute('/hire/react-developer/in/fintech-financial-services')).toBe(false);
    expect(isKnownClientRoute('/salary-guide')).toBe(false);
    expect(isKnownClientRoute('/salary-guide/react-developer')).toBe(false);
    expect(isKnownClientRoute('/salary-calculator')).toBe(false);
    expect(isKnownClientRoute('/gcc-hub')).toBe(false);
    expect(isKnownClientRoute('/locations/bengaluru')).toBe(false);
    expect(isKnownClientRoute('/staffing-quiz')).toBe(false);
    expect(isKnownClientRoute('/hire/react-developer')).toBe(false);
    expect(isKnownClientRoute('/compare/it-staffing-vs-rpo')).toBe(false);
    expect(isKnownClientRoute('/blog')).toBe(false);
    expect(isKnownClientRoute('/blog/unverified-article')).toBe(false);
    expect(isKnownClientRoute('/admin/blog')).toBe(false);
    expect(isKnownClientRoute('/hire/not-a-real-role')).toBe(false);
    expect(isKnownClientRoute('/compare/not-a-real-comparison')).toBe(false);
    expect(isKnownClientRoute('/who-we-serve/not-an-audience')).toBe(false);
  });
});
