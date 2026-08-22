export type AudienceJourney = {
  slug: string;
  audience: string;
  title: string;
  description: string;
  whyNow: string;
  expectedOutcomes: string[];
  operatingMethod: string[];
  riskControls: string[];
  recommendedOfferSlugs: string[];
};

export const audienceJourneys: AudienceJourney[] = [
  {
    slug: "ceo-founder",
    audience: "CEO and founder",
    title: "Build India capability around business outcomes",
    description: "A governed route from India capability intent to workforce priorities, accountable decisions, and the right talent operating model.",
    whyNow: "India capability decisions create long-lived operating, leadership, talent, compliance, and cost commitments. Define the decision system before turning the plan into requisitions.",
    expectedOutcomes: [
      "A clear India capability objective and decision owner",
      "Workforce priorities sequenced against the operating plan",
      "An engagement model with explicit responsibilities and exclusions",
      "Risks, approvals, evidence and escalation paths visible before launch",
    ],
    operatingMethod: [
      "Frame the business outcome and India capability boundary",
      "Sequence leadership, critical roles and supporting hiring operations",
      "Select a governed offer and agree mandate-specific terms",
      "Track evidence, decisions, delivery status and escalation",
    ],
    riskControls: [
      "No technology-delivery ownership is implied without substantiation",
      "Commercial promises and service levels remain mandate-specific",
      "Client results remain unpublished until authorisation and methodology pass",
    ],
    recommendedOfferSlugs: ["gcc-accelerator", "executive-search", "permanent-hiring"],
  },
  {
    slug: "technology-leaders",
    audience: "CIO, CTO and VP Engineering",
    title: "Translate technology priorities into evidence-led talent decisions",
    description: "Define role outcomes, skill evidence, interview ownership, capacity boundaries, and escalation before sourcing begins.",
    whyNow: "Urgent technology hiring can amplify unclear role definitions and slow decision loops. A governed brief makes the evidence and decision owners explicit.",
    expectedOutcomes: [
      "Role scorecards tied to technology outcomes",
      "Evidence requirements for skills, experience and delivery context",
      "Interview, feedback and approval ownership",
      "A clear choice between permanent, contract and managed hiring models",
    ],
    operatingMethod: [
      "Define the role outcome, constraints and non-negotiable evidence",
      "Agree the talent model and candidate-assessment boundary",
      "Assign client and Talpro decision responsibilities",
      "Review funnel evidence and resolve blocked decisions",
    ],
    riskControls: [
      "No unsupported skill-availability or speed guarantee",
      "Candidate evidence is separated from client interview decisions",
      "Security, access and worker responsibilities are documented per mandate",
    ],
    recommendedOfferSlugs: ["it-staffing", "contract-staffing", "permanent-hiring"],
  },
  {
    slug: "gcc-india-leaders",
    audience: "GCC Head and India Country Head",
    title: "Sequence GCC workforce launch with accountable ownership",
    description: "Connect capability priorities, leadership sequencing, role waves, hiring operations, and governance without overstating delivery scope.",
    whyNow: "A GCC workforce plan has interdependent leadership, role, process and employer decisions. Sequencing those decisions reduces avoidable hiring and governance rework.",
    expectedOutcomes: [
      "A capability-to-role sequence for the India organisation",
      "Leadership and critical-role dependencies made explicit",
      "Hiring-operation responsibilities and escalation routes",
      "A governed path from launch hiring to repeatable capability",
    ],
    operatingMethod: [
      "Clarify the GCC mission, operating boundary and workforce assumptions",
      "Sequence leadership, anchor roles and capability waves",
      "Define sourcing, assessment, decision and onboarding interfaces",
      "Review evidence and adapt the workforce plan through governed decisions",
    ],
    riskControls: [
      "Legal, entity, tax and technology-delivery advice stays with qualified owners",
      "Regional and salary claims remain gated until current evidence exists",
      "Every published outcome requires client permission and calculation method",
    ],
    recommendedOfferSlugs: ["gcc-accelerator", "executive-search", "rpo-managed-talent"],
  },
  {
    slug: "talent-leaders",
    audience: "CHRO and Talent Acquisition leader",
    title: "Govern hiring demand, evidence, ownership, and candidate care",
    description: "Create a visible operating model for intake, sourcing, assessment, feedback, consent, escalation, and supplier accountability.",
    whyNow: "Demand volatility and fragmented decision ownership can damage hiring quality and candidate experience. A shared operating contract makes the system measurable.",
    expectedOutcomes: [
      "A consistent mandate intake and qualification standard",
      "Clear ownership across sourcing, assessment, interviews and offers",
      "Candidate consent, acknowledgement and fraud protection built into the flow",
      "A governed supplier model aligned to the demand portfolio",
    ],
    operatingMethod: [
      "Segment demand by role type, urgency and engagement model",
      "Agree evidence, decision, feedback and candidate-care standards",
      "Route each mandate to the appropriate governed offer",
      "Review delivery, exceptions and opportunity feedback by source and offer",
    ],
    riskControls: [
      "No universal shortlist, placement or replacement promise",
      "Candidate data and consent controls apply to every intake route",
      "SLA publication waits for approved operational-capacity evidence",
    ],
    recommendedOfferSlugs: ["rpo-managed-talent", "permanent-hiring", "contract-staffing"],
  },
  {
    slug: "procurement-workforce",
    audience: "Procurement and contingent-workforce leader",
    title: "Compare workforce models through scope, evidence, and risk",
    description: "Evaluate staffing and managed-talent options with explicit responsibility, commercial boundaries, evidence requirements, and trust controls.",
    whyNow: "Similar-looking talent services can carry different worker, supplier, data, commercial and delivery responsibilities. Those boundaries should be reviewable before contracting.",
    expectedOutcomes: [
      "A service model matched to the actual workforce requirement",
      "Documented client, Talpro and provider responsibilities",
      "Evidence and approval requirements visible during evaluation",
      "A clear route for DPA, SLA, onboarding and exception review",
    ],
    operatingMethod: [
      "Classify the workforce need and required service boundary",
      "Map commercial, worker, data and delivery responsibilities",
      "Review the available trust evidence and outstanding approvals",
      "Agree mandate-specific service levels, reporting and escalation",
    ],
    riskControls: [
      "Evidence-required trust controls are shown as pending, not claimed",
      "Sensitive registration, tax and identity records are not published openly",
      "Final privacy, workforce and contract terms require qualified review",
    ],
    recommendedOfferSlugs: ["contract-staffing", "rpo-managed-talent", "it-staffing"],
  },
];

export const audienceJourneyMap = Object.fromEntries(
  audienceJourneys.map((journey) => [journey.slug, journey]),
) as Record<string, AudienceJourney>;
