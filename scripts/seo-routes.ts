import { services } from "../client/src/config/services";
import { audienceJourneys } from "../shared/audience-journeys";

const coreRoutes = [
  "/",
  "/about",
  "/services",
  "/contact",
  "/careers",
  "/jobs",
  "/how-we-work",
  "/for-candidates",
  "/candidate-safety",
  "/trust",
  "/accessibility",
  "/privacy-policy",
  "/terms-of-service",
  "/legal/compliance",
  "/grievance",
  "/dpo",
  "/security",
  "/employers",
  "/who-we-serve",
];

const groups = {
  core: coreRoutes,
  services: services.map((service) => `/services/${service.slug}`),
  audiences: audienceJourneys.map((journey) => `/who-we-serve/${journey.slug}`),
  industries: [],
  locations: [],
  roles: [],
  roleCities: [],
  serviceCities: [],
  industryCities: [],
  salaryGuides: [],
  comparisons: [],
  resources: ["/resources"],
  roleIndustries: [],
};

const routes = Array.from(new Set(Object.values(groups).flat()));

if (process.argv.includes("--groups")) {
  console.log(JSON.stringify(groups, null, 2));
} else {
  console.log(JSON.stringify(routes, null, 2));
}
