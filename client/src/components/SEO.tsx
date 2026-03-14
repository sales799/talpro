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
  '@type': 'Organization',
  name: 'TalPro',
  alternateName: 'Talpro Solutions Private Limited',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "India's specialist IT staffing partner. Pre-vetted developers, engineers, and tech leaders delivered in under 48 hours.",
  foundingDate: '2010',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-80-4094-8407',
    contactType: 'sales',
    email: 'hello@talproindia.com',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [
    'https://www.linkedin.com/company/talpro-india/',
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
