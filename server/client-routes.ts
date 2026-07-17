import { services } from "../client/src/config/services";
import { audienceJourneys } from "../shared/audience-journeys";

const STATIC_CLIENT_ROUTES = new Set([
  "/",
  "/about",
  "/services",
  "/contact",
  "/careers",
  "/jobs",
  "/trust",
  "/candidate-safety",
  "/accessibility",
  "/privacy-policy",
  "/privacy",
  "/terms-of-service",
  "/terms",
  "/legal/compliance",
  "/grievance",
  "/dpo",
  "/security",
  "/how-we-work",
  "/for-candidates",
  "/employers",
  "/resources",
  "/who-we-serve",
]);

const GENERATED_CLIENT_ROUTES = new Set([
  ...services.map((service) => `/services/${service.slug}`),
  ...audienceJourneys.map((journey) => `/who-we-serve/${journey.slug}`),
]);

export function isKnownClientRoute(pathname: string): boolean {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return (
    STATIC_CLIENT_ROUTES.has(normalized) ||
    GENERATED_CLIENT_ROUTES.has(normalized) ||
    /^\/jobs\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalized)
  );
}
