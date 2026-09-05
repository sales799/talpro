import { legacyServiceRedirects, services } from '@/config/services';

function serviceKey(value: string): string {
  return value.trim().toLowerCase()
    .replace(/\s*&\s*|\s+and\s+/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const serviceSelections = new Map<string, string>([
  ...services.flatMap((service) => [
    [serviceKey(service.slug), service.slug] as const,
    [serviceKey(service.name), service.slug] as const,
  ]),
  ...Object.entries(legacyServiceRedirects).map(([legacySlug, canonicalSlug]) => (
    [serviceKey(legacySlug), canonicalSlug] as const
  )),
  ['other', 'other'],
  ['hire-talent', 'other'],
  ['general-enquiry', 'other'],
  ['general-inquiry', 'other'],
]);

/** Only return values represented by the enquiry form's governed options. */
export function normalizeContactService(value?: string | null): string {
  return value ? serviceSelections.get(serviceKey(value)) || '' : '';
}

export function hasContactCampaignParameters(search: string): boolean {
  const params = new URLSearchParams(search);
  return ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    .some((key) => params.has(key));
}

export function getContactQueryPrefill(search: string) {
  const params = new URLSearchParams(search);
  return {
    service: normalizeContactService(params.get('service')),
    email: params.get('email') || '',
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    utmTerm: params.get('utm_term') || '',
    utmContent: params.get('utm_content') || '',
  };
}
