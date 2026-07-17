export type TrustStatus = "verified_public" | "published_baseline" | "evidence_required" | "not_claimed";

export type TrustControl = {
  id: string;
  title: string;
  status: TrustStatus;
  owner: string;
  source: string;
  publicSummary: string;
  href?: string;
};

export const trustRegistry: readonly TrustControl[] = [
  {
    id: "legal-identity",
    title: "Legal identity",
    status: "verified_public",
    owner: "Legal",
    source: "P0 verified legal disclosure baseline",
    publicSummary: "The website operator and registered office are publicly disclosed.",
    href: "/legal/compliance",
  },
  {
    id: "privacy-rights",
    title: "Privacy and data rights",
    status: "published_baseline",
    owner: "Privacy / Legal",
    source: "Published privacy, DPO, and grievance pages",
    publicSummary: "Collection purposes, candidate rights, correction, deletion, and contact routes are published.",
    href: "/privacy-policy",
  },
  {
    id: "responsible-disclosure",
    title: "Responsible disclosure",
    status: "published_baseline",
    owner: "Security",
    source: "Published responsible disclosure page",
    publicSummary: "A security reporting channel and safe-testing boundaries are published.",
    href: "/security",
  },
  {
    id: "candidate-protection",
    title: "Candidate protection",
    status: "published_baseline",
    owner: "Candidate Operations / Privacy",
    source: "Constitution v2.1, sections 11 and 12",
    publicSummary: "Official-role checks, no-application-fee guidance, fraud reporting, consent, and data-rights routes are published.",
    href: "/candidate-safety",
  },
  {
    id: "accessibility",
    title: "Accessibility",
    status: "published_baseline",
    owner: "Product / Legal",
    source: "Constitution v2.1, section 18",
    publicSummary: "The current accessibility approach and feedback route are published.",
    href: "/accessibility",
  },
  {
    id: "procurement-pack",
    title: "Procurement evidence pack",
    status: "evidence_required",
    owner: "Legal / Security / Finance",
    source: "No approved consolidated pack is stored in this repository",
    publicSummary: "DPA, SLA, vendor onboarding, insurance, and supporting evidence are shared only after mandate-specific review and authorization.",
  },
  {
    id: "workforce-governance",
    title: "Workforce governance policies",
    status: "evidence_required",
    owner: "People / Legal / Compliance",
    source: "No approved public policy pack is stored in this repository",
    publicSummary: "POSH, code of conduct, anti-bribery, and workforce-compliance evidence require current owner and legal approval before public claims are made.",
  },
  {
    id: "subprocessors-vendors",
    title: "Subprocessors and vendors",
    status: "evidence_required",
    owner: "Privacy / Security / Procurement",
    source: "No approved public subprocessor register is stored in this repository",
    publicSummary: "A mandate-specific vendor and subprocessor disclosure requires a verified inventory, processing purpose, and approved release process.",
  },
  {
    id: "certifications-insurance",
    title: "Certifications and insurance",
    status: "not_claimed",
    owner: "Legal / Security / Finance",
    source: "No approved public evidence is stored in this repository",
    publicSummary: "Talpro does not make a public certification or insurance claim on this website without current evidence.",
  },
  {
    id: "case-studies",
    title: "Client outcomes and case studies",
    status: "evidence_required",
    owner: "Marketing / Legal / Delivery",
    source: "No client authorization and methodology pack is stored in this repository",
    publicSummary: "Case studies remain unpublished until the outcome, method, and client authorization are approved.",
  },
];
