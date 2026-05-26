import { describe, expect, it } from 'vitest';
import { isKnownClientRoute } from '../../server/client-routes';

describe('SPA route status mapping', () => {
  it('recognizes known static and dynamic client routes', () => {
    expect(isKnownClientRoute('/')).toBe(true);
    expect(isKnownClientRoute('/contact')).toBe(true);
    expect(isKnownClientRoute('/services/it-staffing')).toBe(true);
    expect(isKnownClientRoute('/industries/fintech')).toBe(true);
    expect(isKnownClientRoute('/locations/bangalore-it-staffing')).toBe(true);
  });

  it('marks unknown routes as true 404s', () => {
    expect(isKnownClientRoute('/some-nonexistent-route')).toBe(false);
    expect(isKnownClientRoute('/totally/missing/path')).toBe(false);
  });
});
