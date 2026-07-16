import { services } from "../client/src/config/services";
import { getProgrammaticRoutes } from "../client/src/config/programmaticSeo";
import { caseStudiesData } from "../client/src/data/caseStudies";
import { getIndustrySlugs } from "../client/src/pages/industries/config";
import { getLocationSlugs } from "../client/src/pages/locations/config";

const STATIC_CLIENT_ROUTES = new Set([
  "/",
  "/about",
  "/services",
  "/case-studies",
  "/industries",
  "/blog",
  "/contact",
  "/careers",
  "/privacy-policy",
  "/privacy",
  "/terms-of-service",
  "/terms",
  "/legal/compliance",
  "/grievance",
  "/dpo",
  "/security",
  "/refund",
  "/shipping",
  "/how-we-work",
  "/salary-guide",
  "/for-candidates",
  "/employers",
  "/salary-calculator",
  "/staffing-quiz",
  "/admin/blog",
  "/gcc-hub",
]);

const GENERATED_CLIENT_ROUTES = new Set([
  ...services.map((service) => `/services/${service.slug}`),
  ...caseStudiesData.map((caseStudy) => `/case-studies/${caseStudy.id}`),
  ...getIndustrySlugs().map((slug) => `/industries/${slug}`),
  ...getLocationSlugs().map((slug) => `/locations/${slug}`),
  ...getProgrammaticRoutes(),
]);

// Published blog entries may be stored in the database rather than the
// repository, so their slugs cannot be enumerated at build time.
const DATABASE_BACKED_CLIENT_ROUTES = [
  /^\/blog\/[a-z0-9-]+$/,
];

export function isKnownClientRoute(pathname: string): boolean {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return (
    STATIC_CLIENT_ROUTES.has(normalized) ||
    GENERATED_CLIENT_ROUTES.has(normalized) ||
    DATABASE_BACKED_CLIENT_ROUTES.some((pattern) => pattern.test(normalized))
  );
}
