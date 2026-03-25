import { Helmet } from 'react-helmet-async';

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
 * Declarative SEO head tags — replaces manual useEffect + document.title.
 * Uses react-helmet-async (already set up in main.tsx).
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
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;

  const url = path ? `${BASE_URL}${path}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@talproindia" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}

/* ── Schema Helpers ──────────────────────────────────── */

/** Organization schema — use on homepage */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EmploymentAgency',
  name: 'TalPro',
  alternateName: 'Talpro Solutions Private Limited',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "India's specialist IT staffing partner. Pre-vetted developers, engineers, and tech leaders delivered in under 48 hours.",
  foundingDate: '2010',
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: '100+',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bengaluru',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560001',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-80-4094-8407',
    contactType: 'sales',
    email: 'hello@talproindia.com',
    availableLanguage: ['English', 'Hindi'],
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  sameAs: [
    'https://www.linkedin.com/company/talpro-india/',
    'https://x.com/talproindia',
    'https://www.youtube.com/@TalProIndia',
    'https://www.instagram.com/indiatalpro/',
    'https://www.facebook.com/TalproIndia',
  ],
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

/* ── JobPosting Schema ─────────────────────────────────── */

export interface JobPostingInput {
  title: string;
  location: string;
  type: string;
  description: string;
  salary?: string;
  postedDate?: string;
}

const EMPLOYMENT_TYPE_MAP: Record<string, string> = {
  'full-time': 'FULL_TIME',
  'part-time': 'PART_TIME',
  'contract': 'CONTRACTOR',
  'temporary': 'TEMPORARY',
  'intern': 'INTERN',
  'volunteer': 'VOLUNTEER',
  'per-diem': 'PER_DIEM',
  'freelance': 'CONTRACTOR',
};

/** Build schema.org/JobPosting JSON-LD */
export function buildJobPostingSchema(
  job: JobPostingInput,
): Record<string, unknown> {
  const posted = job.postedDate || new Date().toISOString().split('T')[0];
  const validThrough = new Date(
    new Date(posted).getTime() + 90 * 24 * 60 * 60 * 1000,
  )
    .toISOString()
    .split('T')[0];

  const employmentType =
    EMPLOYMENT_TYPE_MAP[job.type.toLowerCase()] || 'FULL_TIME';

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: posted,
    validThrough,
    employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'TalPro',
      sameAs: BASE_URL,
      logo: `${BASE_URL}/logo.png`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressRegion: 'Karnataka',
        addressCountry: 'IN',
      },
    },
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'India',
    },
    ...(job.salary
      ? {
          baseSalary: {
            '@type': 'MonetaryAmount',
            currency: 'INR',
            value: {
              '@type': 'QuantitativeValue',
              value: job.salary,
              unitText: 'YEAR',
            },
          },
        }
      : {}),
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
