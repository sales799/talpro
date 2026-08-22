export type Service = {
  slug: string;
  name: string;
  hero: {
    eyebrow?: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
  };
  seo: {
    title: string;
    description: string;
    keywords?: string[];
  };
  overview: string;
  highlights: string[];
  capabilities: { title: string; items: string[] }[];
  roles: string[];
  industries: string[];
  stats?: { value: string; label: string }[];
  processSteps: string[];
  testimonial?: never;
  faqs?: { q: string; a: string }[];
  governance?: {
    owner: string;
    commercialModel: string;
    deliveryBoundary: string;
  };
};

// Constitution v2.1 publishes only the six approved offer families below.
// Unsupported legacy claims and testimonials are not retained in this public
// registry. Legacy URLs are mapped to a canonical approved offer below.
const approvedProcess = [
  "Confirm the business outcome, role scope, operating model, decision owners, and evidence requirements",
  "Agree the delivery boundary, commercial model, service levels, exclusions, and escalation path",
  "Map the relevant India talent market and activate accountable sourcing workstreams",
  "Run role-appropriate screening and document evidence, trade-offs, availability, and risk",
  "Coordinate client selection, contracting, onboarding, and consent-aware documentation",
  "Review delivery evidence, feedback, retention signals, and any required corrective action",
];

export const services: Service[] = [
  {
    slug: "gcc-accelerator",
    name: "GCC Advisory & Workforce Launch",
    hero: {
      eyebrow: "Build India Capability",
      title: "GCC Advisory & Workforce Launch",
      subtitle:
        "Plan the workforce, leadership, hiring operations, and talent-market workstreams required to launch or scale an India capability centre.",
      ctaLabel: "Discuss Your GCC Workforce Plan",
    },
    seo: {
      title: "GCC Advisory & Workforce Launch in India | Talpro",
      description:
        "Workforce planning, leadership search, talent-market mapping, hiring operations, and compliant staffing support for global companies building India capability.",
      keywords: ["GCC workforce India", "India capability centre hiring", "GCC talent advisory"],
    },
    overview:
      "Talpro supports the people and talent-operating side of an India capability centre: workforce planning, role sequencing, leadership search, hiring operations, staffing, and market intelligence. Legal, tax, real-estate, payroll, and statutory advisory require separately appointed qualified providers and are never implied by this offer.",
    highlights: [
      "Workforce plan tied to business outcomes and hiring sequence",
      "Leadership, specialist talent, and ramp governance in one operating plan",
      "Clear separation between Talpro delivery and qualified third-party advice",
      "Documented owners, service levels, risks, and escalation paths",
    ],
    capabilities: [
      {
        title: "Workforce Advisory",
        items: ["Capability and role planning", "Location and talent-market inputs", "Hiring sequence and ramp governance", "Operating-model options"],
      },
      {
        title: "Talent Launch",
        items: ["India leadership search", "Technology talent acquisition", "Contract staffing", "Hiring operations and reporting"],
      },
      {
        title: "Delivery Controls",
        items: ["Scope and dependency register", "Qualified-adviser handoffs", "Consent-aware candidate workflows", "Evidence and escalation reporting"],
      },
    ],
    roles: ["India Site Leader", "Engineering Leader", "Technology Specialists", "Talent Acquisition", "People Operations"],
    industries: [],
    processSteps: approvedProcess,
    governance: {
      owner: "GCC workforce delivery leader",
      commercialModel: "Scoped advisory and workforce-launch engagement under an approved proposal and statement of work",
      deliveryBoundary: "Talpro owns talent and workforce workstreams only; legal, tax, real-estate, payroll, and statutory advice require qualified providers",
    },
    faqs: [
      { q: "Does Talpro provide legal or tax advice for a GCC?", a: "No. Talpro can coordinate workforce dependencies, but legal, tax, entity, real-estate, payroll, and statutory advice must be delivered by separately appointed qualified providers." },
      { q: "Can the engagement start with workforce planning only?", a: "Yes. The first scope can be limited to capability definition, role sequencing, location inputs, operating-model choices, risks, and a governed hiring plan." },
    ],
  },
  {
    slug: "it-staffing",
    name: "Technology Talent Solutions",
    hero: {
      eyebrow: "Build Technology Teams",
      title: "Technology Talent Solutions",
      subtitle:
        "Role-specific search and screening for technology specialists and leaders, with evidence-led shortlists and a clearly agreed hiring model.",
      ctaLabel: "Discuss Technology Talent",
    },
    seo: {
      title: "Technology Talent Solutions in India | Talpro",
      description:
        "Technology talent search, screening, market mapping, and hiring support for global companies and India capability teams.",
      keywords: ["technology talent India", "technology recruitment", "GCC technology hiring"],
    },
    overview:
      "Talpro helps technology leaders define roles, understand the available India market, assess relevant evidence, and run an accountable selection process. The hiring model is chosen explicitly rather than blending contract, permanent, executive, and managed recruitment promises on one page.",
    highlights: [
      "Role and outcome calibration before sourcing begins",
      "Screening evidence matched to the actual work",
      "Availability, compensation, consent, and joining-risk visibility",
      "A documented handoff into the selected staffing or search model",
    ],
    capabilities: [
      { title: "Talent Coverage", items: ["Software and platform engineering", "Cloud, data, security, and quality", "Product and programme roles", "Technology leadership"] },
      { title: "Assessment", items: ["Role scorecards", "Structured interviews", "Work-sample or scenario evidence", "Reference and joining-risk review"] },
      { title: "Hiring Models", items: ["Contract staffing", "Permanent hiring", "Executive search", "RPO and managed talent"] },
    ],
    roles: ["Software Engineer", "Platform Engineer", "Cloud Engineer", "Data Engineer", "Security Specialist", "Product Leader", "Engineering Leader"],
    industries: [],
    processSteps: approvedProcess,
    governance: {
      owner: "Technology talent delivery leader",
      commercialModel: "Commercial terms follow the separately selected contract, permanent, executive-search, or RPO model",
      deliveryBoundary: "Talent acquisition and assessment; no software-delivery ownership is implied",
    },
  },
  {
    slug: "contract-staffing",
    name: "Contract Staffing & Staff Augmentation",
    hero: {
      eyebrow: "Flexible Workforce",
      title: "Contract Staffing & Staff Augmentation",
      subtitle:
        "Add named professionals to client-led teams through a documented contract scope, onboarding plan, workforce controls, and service governance.",
      ctaLabel: "Discuss Contract Staffing",
    },
    seo: {
      title: "Contract Staffing & Staff Augmentation India | Talpro",
      description:
        "Governed contract staffing and staff augmentation for client-led technology teams in India.",
      keywords: ["contract staffing India", "staff augmentation India", "technology contractors"],
    },
    overview:
      "This model supplies individual professionals into a client-led delivery environment. The signed scope defines roles, tenure, rate basis, supervision, documentation, service levels, replacement terms, and the boundary between Talpro workforce support and client delivery ownership.",
    highlights: ["Client-led work and technical direction", "Named workforce and onboarding controls", "Documented tenure, rate basis, and service levels", "Clear replacement and escalation terms in the signed agreement"],
    capabilities: [
      { title: "Workforce Models", items: ["Time-bound contract staffing", "Staff augmentation", "Contract-to-hire where approved", "Planned ramp-up and ramp-down"] },
      { title: "Workforce Operations", items: ["Candidate consent and documentation", "Onboarding coordination", "Attendance and service reporting", "Issue and replacement workflow"] },
      { title: "Governance", items: ["Signed scope and rate basis", "Client supervision boundary", "Service-level reporting", "Escalation and exit controls"] },
    ],
    roles: ["Software Engineer", "QA Engineer", "Cloud Engineer", "Data Engineer", "Business Analyst", "Programme Specialist"],
    industries: [],
    processSteps: approvedProcess,
    governance: {
      owner: "Contract staffing delivery leader",
      commercialModel: "Agreed bill-rate or monthly staffing model under a signed client agreement and role schedule",
      deliveryBoundary: "The client owns project direction and outcomes; Talpro owns the agreed workforce and staffing operations",
    },
  },
  {
    slug: "permanent-hiring",
    name: "Permanent Hiring",
    hero: {
      eyebrow: "Build the Core Team",
      title: "Permanent Hiring",
      subtitle:
        "Structured search for permanent technology and business-critical roles, from calibrated mandate through accepted offer and joining support.",
      ctaLabel: "Discuss Permanent Hiring",
    },
    seo: {
      title: "Permanent Hiring in India | Talpro",
      description:
        "Permanent technology and business-critical hiring through calibrated search, assessment, offer support, and joining-risk management.",
      keywords: ["permanent hiring India", "technology recruitment India", "direct hire India"],
    },
    overview:
      "Permanent hiring is run as a defined search mandate with an approved role scorecard, market map, assessment plan, decision process, commercial terms, and replacement conditions. Timelines and guarantees are stated only in the signed mandate, not as unverified universal website promises.",
    highlights: ["Outcome-based role scorecard", "Market mapping and structured search", "Evidence-led assessment and references", "Offer, joining-risk, and onboarding coordination"],
    capabilities: [
      { title: "Search", items: ["Technology specialists", "Engineering and product leadership", "Business-critical functions", "India capability teams"] },
      { title: "Selection", items: ["Role-specific assessment plan", "Stakeholder calibration", "Reference validation", "Offer and joining support"] },
      { title: "Controls", items: ["Approved mandate", "Candidate consent", "Decision and feedback cadence", "Contractual replacement terms"] },
    ],
    roles: ["Technology Specialist", "Engineering Manager", "Product Manager", "Data Leader", "People Leader", "Business Function Leader"],
    industries: [],
    processSteps: approvedProcess,
    governance: {
      owner: "Permanent hiring delivery leader",
      commercialModel: "Success-fee or exclusive-search terms defined in the signed mandate",
      deliveryBoundary: "Permanent search and joining support; employment decisions and employment obligations remain with the client",
    },
  },
  {
    slug: "executive-search",
    name: "Executive Search",
    hero: {
      eyebrow: "Leadership Search",
      title: "Executive Search",
      subtitle:
        "Confidential, research-led leadership search with an agreed success profile, market map, assessment evidence, and board-level decision governance.",
      ctaLabel: "Discuss Executive Search",
    },
    seo: {
      title: "Executive Search in India | Talpro",
      description:
        "Confidential executive and technology leadership search in India with research, calibration, assessment, and offer support.",
      keywords: ["executive search India", "technology leadership search", "GCC leader search"],
    },
    overview:
      "Executive search is a distinct retained mandate for high-impact leadership roles. The engagement defines confidentiality, the success profile, target market, stakeholder group, assessment method, reporting cadence, conflicts, and offer support before outreach begins.",
    highlights: ["Confidential mandate and stakeholder governance", "Research-led market mapping", "Structured leadership evidence and referencing", "Documented conflicts, reporting, and offer support"],
    capabilities: [
      { title: "Leadership Scope", items: ["India and GCC leaders", "Technology and product executives", "Engineering and data leaders", "Business and people leadership"] },
      { title: "Research", items: ["Success-profile calibration", "Target-market mapping", "Confidential outreach", "Evidence and reference synthesis"] },
      { title: "Decision Support", items: ["Shortlist calibration", "Stakeholder interview design", "Risk and reference reporting", "Offer and transition support"] },
    ],
    roles: ["India Country Leader", "GCC Site Leader", "CTO", "VP Engineering", "Chief Product Officer", "Chief Data Officer", "People Leader"],
    industries: [],
    processSteps: approvedProcess,
    governance: {
      owner: "Executive search practice leader",
      commercialModel: "Retained search with agreed milestones and scope in the signed mandate",
      deliveryBoundary: "Leadership research and search; appointment authority remains with the client",
    },
  },
  {
    slug: "rpo-managed-talent",
    name: "RPO & Managed Talent Capability",
    hero: {
      eyebrow: "Managed Recruitment",
      title: "RPO & Managed Talent Capability",
      subtitle:
        "A governed recruitment operating capability with defined roles, workflows, reporting, service levels, and continuous-improvement responsibilities.",
      ctaLabel: "Discuss an RPO Scope",
    },
    seo: {
      title: "RPO & Managed Talent Capability India | Talpro",
      description:
        "Recruitment process outsourcing and managed talent operations for India hiring programmes, with defined workflows, ownership, reporting, and service levels.",
      keywords: ["RPO India", "managed recruitment India", "talent acquisition operations"],
    },
    overview:
      "RPO is a managed recruitment operation, not a larger staffing promise. The signed design defines which recruitment processes Talpro owns, which remain with the client, the systems and data involved, team structure, service levels, reporting, change control, and exit plan.",
    highlights: ["Defined process ownership and client dependencies", "Dedicated recruitment operating team where scoped", "Consent-aware workflow and reporting controls", "Change, escalation, and exit governance"],
    capabilities: [
      { title: "Operating Design", items: ["Demand intake and workforce planning", "Process and responsibility mapping", "Technology and data dependencies", "Service-level and reporting design"] },
      { title: "Managed Workflows", items: ["Sourcing and screening", "Interview coordination", "Offer and joining operations", "Vendor and stakeholder coordination"] },
      { title: "Governance", items: ["KPI dictionary", "Quality and compliance reviews", "Issue and change control", "Knowledge transfer and exit plan"] },
    ],
    roles: ["Recruitment Programme Lead", "Technology Recruiter", "Sourcer", "Recruitment Coordinator", "Talent Operations Analyst"],
    industries: [],
    processSteps: approvedProcess,
    governance: {
      owner: "RPO programme leader",
      commercialModel: "Scoped retainer, managed-capability, or outcome-linked model defined in the signed programme agreement",
      deliveryBoundary: "Only the recruitment processes named in the responsibility matrix are managed by Talpro",
    },
  },
];

export const legacyServiceRedirects: Record<string, string> = {
  "engineering-staffing": "it-staffing",
  "sales-staffing": "permanent-hiring",
  "direct-hiring-functions": "permanent-hiring",
  "direct-hiring-it": "permanent-hiring",
  "cloud-devops-staffing": "it-staffing",
  "data-ai-staffing": "it-staffing",
  "sap-enterprise-staffing": "it-staffing",
  "cybersecurity-staffing": "it-staffing",
};

export const serviceMap = Object.fromEntries(
  services.map((s) => [s.slug, s] as const)
);
