import { services } from "../client/src/config/services";
import { getLocationSlugs } from "../client/src/pages/locations/config";
import { getIndustrySlugs } from "../client/src/pages/industries/config";
import { getProgrammaticRoutes, routeGroups } from "../client/src/config/programmaticSeo";

const coreRoutes = [
  "/",
  "/about",
  "/services",
  "/contact",
  "/careers",
  "/how-we-work",
  "/case-studies",
  "/blog",
  "/salary-guide",
  "/salary-calculator",
  "/for-candidates",
  "/staffing-quiz",
  "/gcc-hub",
  "/privacy-policy",
  "/terms-of-service",
];

const groups = {
  core: coreRoutes,
  services: services.map((service) => `/services/${service.slug}`),
  industries: getIndustrySlugs().map((slug) => `/industries/${slug}`),
  locations: getLocationSlugs().map((slug) => `/locations/${slug}`),
  ...routeGroups(),
};

const routes = Array.from(new Set([...Object.values(groups).flat(), ...getProgrammaticRoutes()]));

if (process.argv.includes("--groups")) {
  console.log(JSON.stringify(groups, null, 2));
} else {
  console.log(JSON.stringify(routes, null, 2));
}
