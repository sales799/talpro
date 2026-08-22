import type { Service } from "./services";
import { services, serviceMap } from "./services";
import { roles, roleMap, type RoleConfig } from "./roles";
import { getLocationSlugs, locationsConfig, type LocationConfig } from "../pages/locations/config";
import { industriesConfig, type IndustryConfig } from "../pages/industries/config";

type Context = {
  role?: RoleConfig;
  city?: LocationConfig & { slug: string };
  industry?: IndustryConfig & { slug: string };
  service?: Service;
};

const processSteps = [
  "Clarify the hiring brief, delivery model, compensation band, and must-have screening criteria",
  "Map active and passive talent pools using mandate-specific role and skill signals",
  "Run structured screening across skills, scenarios, communication, joining likelihood, and compliance",
  "Share a small high-signal shortlist with notes, risks, expected salary, and interview recommendations",
  "Coordinate interviews, offer strategy, documentation, onboarding, and post-join success checks",
  "Review conversion and retention data to tune the next hiring cycle",
];

const defaultStats = [
  { value: "Scoped", label: "engagement model" },
  { value: "Evidence", label: "screening notes" },
  { value: "Governed", label: "delivery process" },
];

const cityMicroMarket = (city?: Context["city"]) => {
  if (!city) return "India's major technology hubs";
  return `${city.shortName}'s hiring corridors, salary bands, commute preferences, notice-period norms, and GCC/startup mix`;
};

const industryNeed = (industry?: Context["industry"]) => {
  if (!industry) return "modern product, platform, and enterprise delivery teams";
  return `${industry.shortName} teams that must balance domain context, compliance awareness, delivery pressure, and long-term retention`;
};

const wordyOverview = (headline: string, context: Context, angle: string) => {
  const role = context.role;
  const city = context.city;
  const industry = context.industry;
  const service = context.service;
  const roleName = role?.name ?? "technology professionals";
  const serviceName = service?.name ?? `${roleName} hiring`;
  const cityName = city?.shortName ?? "India";
  const industryName = industry?.shortName ?? "technology";
  const skills = role?.skills?.join(", ") ?? service?.roles?.slice(0, 6).join(", ") ?? "engineering, cloud, data, QA, and product delivery";
  const signal = role?.demandSignal ?? service?.overview ?? "Demand is strongest where business teams need dependable delivery without expanding permanent headcount too early.";
  const local = city?.talproAdvantage?.[0] ?? "TalPro combines recruiter depth with practical technical screening, compensation intelligence, and structured follow-through.";
  const industryCopy = industry?.userGuideContent ?? "Every search is shaped by the client's operating model, interview bandwidth, delivery urgency, and risk tolerance.";

  return [
    `${headline} is not a keyword-matching exercise. The hiring decision has to account for skills, delivery context, compensation reality, notice-period risk, communication style, and the cost of a wrong shortlist. TalPro builds each search around the actual work the hire will perform, then screens candidates against practical scenarios instead of relying only on resume labels. For ${serviceName.toLowerCase()}, that means checking evidence across ${skills} and asking whether the candidate can operate in the team environment the client already has.`,
    `${cityName} adds its own hiring dynamics. ${cityMicroMarket(city)} influence which candidates will accept interviews, what compensation will land, and how quickly someone can join. A generic national search often misses these signals. TalPro uses local availability, salary movement, competitor demand, and joining-risk notes to protect the client from impressive-looking candidates who are unlikely to convert. The result is a shortlist built for offer success, not just interview volume.`,
    `${industryName} demand also changes the screening bar. ${industryNeed(industry)} need people who understand the vocabulary of the business and the consequences of slow or careless delivery. ${industryCopy} TalPro's screening notes therefore cover domain exposure, stakeholder maturity, documentation habits, security awareness, and the candidate's ability to work with distributed teams.`,
    `${signal} ${local} The process is intentionally small-batch: fewer profiles, stronger evidence, clearer trade-offs, and faster hiring-manager decisions. Clients see why each candidate is included, where the risk sits, and what interview loop will best validate the remaining doubts. This is how TalPro avoids thin staffing funnels and builds reliable role, city, and industry-specific hiring pages that reflect real search work.`,
    `${angle} For employers, the practical benefit is speed with discipline: role calibration, market mapping, technical and behavioural screening, offer strategy, documentation, onboarding, and replacement support. For candidates, the process creates better-fit conversations because the opportunity is explained with real context rather than generic recruiter outreach.`,
  ].join("\n\n");
};

const faq = (name: string, context: Context) => [
  {
    q: `How quickly can TalPro support ${name}?`,
    a: `The delivery plan and service level are agreed after the role, market, assessment depth, client decision process, and joining constraints are understood. Talpro does not publish a universal shortlist promise for every mandate.`,
  },
  {
    q: "How does TalPro avoid thin or duplicate hiring pages?",
    a: `Each published page uses the approved role, skills, offer, and governance context. Unsupported industry, salary, and regional claims remain unpublished until the claim registry contains evidence and approval.`,
  },
  {
    q: `What screening does TalPro run for ${context.role?.name ?? "these roles"}?`,
    a: context.role
      ? context.role.assessment
      : "TalPro uses structured interviews, work-sample or scenario checks, reference validation, compensation benchmarking, and joining-risk review before recommending candidates.",
  },
  {
    q: "Can TalPro support contract, contract-to-hire, and permanent hiring?",
    a: "Yes. The search can be structured under contract staffing, permanent hiring, executive search, or RPO depending on the mandate and signed commercial model.",
  },
];

const serviceFromContext = (
  slug: string,
  name: string,
  title: string,
  subtitle: string,
  overview: string,
  context: Context,
  keywords: string[],
): Service => {
  const role = context.role;
  const city = context.city;
  const industry = context.industry;
  const service = context.service;
  const skills = role?.skills ?? service?.roles?.slice(0, 8) ?? ["Technical screening", "Talent mapping", "Shortlist quality"];

  return {
    slug,
    name,
    hero: {
      eyebrow: "Programmatic Hiring Guide",
      title,
      subtitle,
      ctaLabel: `Discuss ${name}`,
    },
    seo: {
      title: `${title} | TalPro`,
      description: subtitle,
      keywords,
    },
    overview,
    highlights: [
      role?.demandSignal ?? "Market-calibrated candidate search",
      city ? `Localised screening for ${city.shortName}` : "India-wide sourcing coverage",
      industry ? `Domain fit for ${industry.shortName}` : "Structured skill and scenario checks",
      "Shortlist notes include compensation, notice period, risk, and interview focus",
    ],
    capabilities: [
      {
        title: "Screening Focus",
        items: skills.slice(0, 6),
      },
      {
        title: "Hiring Model",
        items: ["Contract staffing", "Contract-to-hire where approved", "Permanent hiring", "Executive search", "RPO and managed talent"],
      },
      {
        title: "Quality Controls",
        items: ["Role calibration", "Compensation benchmarking", "Scenario assessment", "Reference checks", "Post-join follow-up"],
      },
    ],
    roles: role ? [role.name, ...role.skills.slice(0, 8)] : service?.roles ?? roles.slice(0, 10).map((item) => item.name),
    industries: [],
    stats: defaultStats,
    processSteps,
    faqs: faq(name, context),
  };
};

const cityWithSlug = (slug: string) => {
  const config = locationsConfig[slug as keyof typeof locationsConfig];
  return config ? { ...config, slug } : undefined;
};

const industryWithSlug = (slug: string) => {
  const config = industriesConfig[slug as keyof typeof industriesConfig];
  return config ? { ...config, slug } : undefined;
};

export const getRoleService = (roleSlug: string) => {
  const role = roleMap[roleSlug];
  if (!role) return undefined;
  return serviceFromContext(
    `hire-${role.slug}`,
    role.name,
    `Hire ${role.name}`,
    `Build a high-signal ${role.name.toLowerCase()} shortlist with TalPro's role-specific screening across ${role.skills.slice(0, 4).join(", ")}.`,
    wordyOverview(`Hiring ${role.name} in India`, { role }, `The ${role.name.toLowerCase()} market rewards precise screening because ${role.blurb}`),
    { role },
    role.seo.keywords,
  );
};

export const getRoleCityService = (roleSlug: string, citySlug: string) => {
  const role = roleMap[roleSlug];
  const city = cityWithSlug(citySlug);
  if (!role || !city) return undefined;
  return serviceFromContext(
    `hire-${role.slug}-${city.slug}`,
    `${role.name} in ${city.shortName}`,
    `Hire ${role.name} in ${city.shortName}`,
    `Source and screen ${role.name.toLowerCase()} talent in ${city.shortName} with local salary, notice-period, and skill-market calibration.`,
    wordyOverview(`Hiring ${role.name} in ${city.shortName}`, { role, city }, `${city.shortName} searches need local proof: ${city.gccPresence}`),
    { role, city },
    [...role.seo.keywords, `${role.name} ${city.shortName}`, `hire ${role.name} ${city.shortName}`],
  );
};

export const getServiceCityService = (serviceSlug: string, citySlug: string) => {
  const service = serviceMap[serviceSlug];
  const city = cityWithSlug(citySlug);
  if (!service || !city) return undefined;
  return serviceFromContext(
    `${service.slug}-${city.slug}`,
    `${service.name} in ${city.shortName}`,
    `${service.name} in ${city.shortName}`,
    `${service.hero.subtitle} Localised for ${city.shortName}'s hiring corridors, compensation bands, and joining-risk patterns.`,
    wordyOverview(`${service.name} in ${city.shortName}`, { service, city }, `${city.shortName} delivery needs a partner who can connect local market access with structured staffing governance.`),
    { service, city },
    [...(service.seo.keywords ?? []), `${service.name} ${city.shortName}`, `staffing agency ${city.shortName}`],
  );
};

export const getIndustryCityService = (industrySlug: string, citySlug: string) => {
  const industry = industryWithSlug(industrySlug);
  const city = cityWithSlug(citySlug);
  if (!industry || !city) return undefined;
  return serviceFromContext(
    `${industry.slug}-${city.slug}`,
    `${industry.shortName} staffing in ${city.shortName}`,
    `${industry.shortName} Staffing in ${city.shortName}`,
    `Hire technology talent for ${industry.shortName.toLowerCase()} teams in ${city.shortName} with domain-aware screening and local market calibration.`,
    wordyOverview(`${industry.shortName} technology staffing in ${city.shortName}`, { industry, city }, `${industry.shortName} hiring in ${city.shortName} needs candidates who can handle domain constraints and still join on realistic timelines.`),
    { industry, city },
    [`${industry.shortName} staffing ${city.shortName}`, `${industry.shortName} tech recruitment`, `hire developers ${city.shortName}`],
  );
};

export const getSalaryRoleService = (roleSlug: string) => {
  const role = roleMap[roleSlug];
  if (!role) return undefined;
  return serviceFromContext(
    `salary-${role.slug}`,
    `${role.name} Salary Guide`,
    `${role.name} Salary Guide 2026`,
    `Plan offers for ${role.name.toLowerCase()} hiring in India with TalPro's practical salary band, demand signals, and screening guidance.`,
    wordyOverview(`${role.name} salary guide for India`, { role }, `Expected compensation for ${role.name.toLowerCase()} searches sits around ${role.salaryBand}, but final offers vary by depth, city, domain, notice period, and interview performance.`),
    { role },
    [`${role.name} salary India`, `${role.name} compensation`, `${role.name} hiring benchmark`],
  );
};

export const comparisons = [
  {
    slug: "staff-augmentation-vs-contract-staffing",
    title: "Staff Augmentation vs Contract Staffing",
    subtitle: "Compare ownership, speed, control, compliance, and delivery risk before choosing a flexible hiring model.",
  },
  {
    slug: "contract-to-hire-vs-permanent-hiring",
    title: "Contract-to-Hire vs Permanent Hiring",
    subtitle: "Decide when to validate talent through a contract period and when a direct permanent search is the cleaner route.",
  },
  {
    slug: "it-staffing-vs-rpo",
    title: "IT Staffing vs RPO",
    subtitle: "Understand when you need specialist shortlists now and when a broader recruitment-process outsourcing model makes sense.",
  },
  {
    slug: "gcc-hiring-vs-outsourcing",
    title: "GCC Hiring vs Outsourcing",
    subtitle: "Choose between building owned India capability and outsourcing delivery to a vendor team.",
  },
  {
    slug: "talpro-vs-generic-job-portals",
    title: "TalPro vs Generic Job Portals",
    subtitle: "A factual comparison of curated staffing support versus self-managed job-board sourcing.",
  },
];

export const comparisonMap = Object.fromEntries(comparisons.map((item) => [item.slug, item] as const));

export const getComparisonService = (slug: string) => {
  const comparison = comparisonMap[slug];
  if (!comparison) return undefined;
  return serviceFromContext(
    comparison.slug,
    comparison.title,
    comparison.title,
    comparison.subtitle,
    wordyOverview(comparison.title, {}, "The right model depends on urgency, internal bandwidth, compliance obligations, interview capacity, and how much delivery ownership the client wants to retain."),
    {},
    [comparison.title.toLowerCase(), "IT staffing comparison", "TalPro hiring guide"],
  );
};

export const getResourceLibraryService = () =>
  serviceFromContext(
    "resource-library",
    "Resource Library",
    "IT Staffing Resource Library",
    "Practical hiring guides, offer comparisons, and evidence-led explainers for Indian technology hiring teams.",
    wordyOverview("TalPro resource library", {}, "This library is built for founders, CHROs, CTOs, GCC leaders, and delivery heads who need concise hiring guidance before opening a search."),
    {},
    ["IT staffing resources", "hiring guides India", "tech recruitment resources"],
  );

export const getRoleIndustryService = (roleSlug: string, industrySlug: string) => {
  const role = roleMap[roleSlug];
  const industry = industryWithSlug(industrySlug);
  if (!role || !industry) return undefined;
  return serviceFromContext(
    `${role.slug}-${industry.slug}`,
    `${role.name} for ${industry.shortName}`,
    `Hire ${role.name} for ${industry.shortName}`,
    `Find ${role.name.toLowerCase()} talent with ${industry.shortName.toLowerCase()} domain context, practical screening evidence, and realistic joining plans.`,
    wordyOverview(`Hiring ${role.name} for ${industry.shortName}`, { role, industry }, `${industry.shortName} teams need ${role.name.toLowerCase()} candidates who can connect ${role.skills.slice(0, 3).join(", ")} with domain constraints and stakeholder expectations.`),
    { role, industry },
    [`${role.name} ${industry.shortName}`, `hire ${role.name} ${industry.shortName}`, `${industry.shortName} recruitment`],
  );
};

export const routeGroups = () => {
  const roleSlugs = roles.map((item) => item.slug);

  return {
    roles: roleSlugs.map((roleSlug) => `/hire/${roleSlug}`),
    roleCities: [],
    serviceCities: [],
    industryCities: [],
    salaryGuides: [],
    comparisons: comparisons.map((item) => `/compare/${item.slug}`),
    resources: ["/resources"],
    roleIndustries: [],
  };
};

export const getProgrammaticRoutes = () => Object.values(routeGroups()).flat();
