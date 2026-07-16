import { services } from "../client/src/config/services";

const coreRoutes = [
  "/",
  "/about",
  "/services",
  "/contact",
  "/careers",
  "/how-we-work",
  "/for-candidates",
  "/privacy-policy",
  "/terms-of-service",
];

const groups = {
  core: coreRoutes,
  services: services.map((service) => `/services/${service.slug}`),
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
