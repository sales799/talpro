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

const DYNAMIC_CLIENT_ROUTES = [
  /^\/services\/[a-z0-9-]+$/,
  /^\/case-studies\/[a-z0-9-]+$/,
  /^\/industries\/[a-z0-9-]+$/,
  /^\/blog\/[a-z0-9-]+$/,
  /^\/locations\/[a-z0-9-]+$/,
];

export function isKnownClientRoute(pathname: string): boolean {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return (
    STATIC_CLIENT_ROUTES.has(normalized) ||
    DYNAMIC_CLIENT_ROUTES.some((pattern) => pattern.test(normalized))
  );
}
