import { describe, expect, it } from 'vitest';
import { legacyServiceRedirects, services } from '@/config/services';
import { getContactQueryPrefill, hasContactCampaignParameters, normalizeContactService } from '@/lib/contact-prefill';
import { routeLead } from '../../server/lead-governance';

describe('governed enquiry service selection', () => {
  it.each(services)('accepts the canonical slug and display name for $name', (service) => {
    expect(normalizeContactService(service.slug)).toBe(service.slug);
    expect(normalizeContactService(service.name)).toBe(service.slug);
    expect(normalizeContactService(` ${service.name.toUpperCase()} `)).toBe(service.slug);
    expect(normalizeContactService(service.name.replace('&', 'and'))).toBe(service.slug);
    expect(routeLead(normalizeContactService(service.name))).not.toBe('Revenue Operations');
  });

  it.each(Object.entries(legacyServiceRedirects))('maps supported legacy %s to %s', (legacySlug, canonicalSlug) => {
    expect(normalizeContactService(legacySlug)).toBe(canonicalSlug);
    expect(normalizeContactService(legacySlug.replaceAll('-', ' '))).toBe(canonicalSlug);
  });

  it.each(['Other', 'Hire Talent', 'General enquiry', 'General inquiry'])('uses the existing generic option for %s', (intent) => {
    expect(normalizeContactService(intent)).toBe('other');
    expect(routeLead(normalizeContactService(intent))).toBe('Revenue Operations');
  });

  it.each([null, undefined, '', 'Engineering Pods', 'Web Development', '__proto__', 'constructor', '<script>alert(1)</script>'])('ignores unsupported input %s', (input) => {
    expect(normalizeContactService(input)).toBe('');
  });

  it('decodes query values and preserves campaign fields without adding arbitrary fields', () => {
    expect(getContactQueryPrefill('service=Sales%20Staffing&utm_source=linkedin&utm_medium=social&utm_campaign=india%20launch&utm_term=GCC&utm_content=hero&email=buyer%40example.invalid&owner=Injected')).toEqual({
      service: 'permanent-hiring',
      email: 'buyer@example.invalid',
      utmSource: 'linkedin',
      utmMedium: 'social',
      utmCampaign: 'india launch',
      utmTerm: 'GCC',
      utmContent: 'hero',
    });
  });

  it.each([
    ['', false],
    ['service=it-staffing&email=buyer%40example.invalid', false],
    ['utm_source=', true],
    ['utm_medium=cpc', true],
    ['utm_unknown=ignored', false],
  ] as const)('detects campaign parameter presence in %s as %s', (search, expected) => {
    expect(hasContactCampaignParameters(search)).toBe(expected);
  });
});
