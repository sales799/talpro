import { useSeoHead } from './DocumentHead';

const SITE_NAME = 'TalPro';
const BASE_URL = 'https://talproindia.com';

interface SEOProps {
  title: string;
  description: string;
  /** Relative path, e.g. "/about". Defaults to current page. */
  path?: string;
  /** Override the OG image URL */
  image?: string;
  /** Page type for OG */
  type?: 'website' | 'article';
  /** JSON-LD structured data object (will be stringified) */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Declarative SEO head tags with deterministic browser DOM updates.
 *
 * Usage:
 *   <SEO title="About TalPro" description="..." />
 *   <SEO title="FAQ" description="..." jsonLd={faqSchema} />
 */
export default function SEO({
  title,
  description,
  path,
  image = `${BASE_URL}/og-image.png`,
  type = 'website',
  jsonLd,
}: SEOProps) {
  const fullTitle = /talpro/i.test(title)
    ? title
    : `${title} | ${SITE_NAME}`;

  const url = path ? `${BASE_URL}${path}` : undefined;
  useSeoHead({ title: fullTitle, description, url, image, type, jsonLd });
  return null;
}

/* ── Schema Helpers ──────────────────────────────────── */

/** Organization schema — use on homepage */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EmploymentAgency',
  name: 'TALPRO INDIA PRIVATE LIMITED',
  legalName: 'TALPRO INDIA PRIVATE LIMITED',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.svg`,
  description:
    "Talpro is India’s Technology Talent and GCC Workforce Partner—helping global companies build, staff and scale high-performing technology teams in India.",
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Flat No. A-103, Prospect Princeton, Manipal County Road, Singasandra, Bommanahalli',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560068',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-80-4094-8407',
    contactType: 'sales',
    email: 'hello@talproindia.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  sameAs: [
    'https://www.linkedin.com/company/3007934/',
    'https://x.com/talproindia',
    'https://www.youtube.com/@TalProIndia',
    'https://www.instagram.com/indiatalpro/',
    'https://www.facebook.com/TalproIndia',
  ],
};

/** WebSite schema with SearchAction — enables Google Sitelinks search box */
export const websiteSearchSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TalPro India',
  url: BASE_URL,
};

/** Build FAQPage schema from Q&A array */
export function buildFAQSchema(
  items: { q: string; a: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

/* ── BreadcrumbList Schema ─────────────────────────────── */

/** Build BreadcrumbList schema from an ordered array of crumbs */
export function buildBreadcrumbSchema(
  items: { name: string; url: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/* ── LocalBusiness Schema ──────────────────────────────── */

/** Build LocalBusiness schema for city/location pages */
export function buildLocalBusinessSchema(
  city: string,
  description: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `TalPro - ${city} IT Staffing`,
    description,
    url: BASE_URL,
    telephone: '+91-80-4094-8407',
    email: 'hello@talproindia.com',
    priceRange: '\u20B9\u20B9\u20B9',
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'City',
      name: city,
    },
    image: `${BASE_URL}/logo.png`,
  };
}
