import { APPROVED_BRAND_POSITION, APPROVED_MASTER_PROMISE } from "./approved-brand";

export type ClaimStatus = "approved" | "blocked" | "review_required";

export type ClaimRecord = {
  id: string;
  category: "brand" | "metric" | "commercial" | "compliance" | "case_study";
  status: ClaimStatus;
  owner: string;
  source: string;
  approvalDate?: string;
  reviewDate: string;
  evidencePath?: string;
  publicWording?: string;
  blockReason?: string;
};

export const claimRegistry = {
  "brand-position": {
    id: "brand-position",
    category: "brand",
    status: "approved",
    owner: "CEO / CMO",
    source: "Talpro Global Marketing Website Constitution v2.1, section 2",
    approvalDate: "2026-07-16",
    reviewDate: "2026-10-16",
    evidencePath: "/Users/bhaskar_universe/CTO/TALPRO_WEBSITE_CONSTITUTION_v2.1.md",
    publicWording: APPROVED_BRAND_POSITION,
  },
  "master-promise": {
    id: "master-promise",
    category: "brand",
    status: "approved",
    owner: "CEO / CMO",
    source: "Talpro Global Marketing Website Constitution v2.1, section 2",
    approvalDate: "2026-07-16",
    reviewDate: "2026-10-16",
    evidencePath: "/Users/bhaskar_universe/CTO/TALPRO_WEBSITE_CONSTITUTION_v2.1.md",
    publicWording: APPROVED_MASTER_PROMISE,
  },
  "legal-entity": {
    id: "legal-entity",
    category: "brand",
    status: "approved",
    owner: "Legal",
    source: "Existing legal disclosure baseline retained from the verified P0 release",
    approvalDate: "2026-07-16",
    reviewDate: "2026-10-16",
    publicWording: "TALPRO INDIA PRIVATE LIMITED",
  },
  "candidate-no-application-fee": {
    id: "candidate-no-application-fee",
    category: "compliance",
    status: "approved",
    owner: "Candidate Operations / Legal",
    source: "Talpro Global Marketing Website Constitution v2.1, section 11",
    approvalDate: "2026-07-16",
    reviewDate: "2026-10-16",
    evidencePath: "/Users/bhaskar_universe/CTO/TALPRO_WEBSITE_CONSTITUTION_v2.1.md",
    publicWording: "Talpro does not charge candidates to apply for a role published on talproindia.com.",
  },
  "approved-offer-families": {
    id: "approved-offer-families",
    category: "commercial",
    status: "approved",
    owner: "CEO / Delivery",
    source: "Talpro Global Marketing Website Constitution v2.1, sections 3 and 4",
    approvalDate: "2026-07-16",
    reviewDate: "2026-10-16",
    evidencePath: "/Users/bhaskar_universe/CTO/TALPRO_WEBSITE_CONSTITUTION_v2.1.md",
    publicWording: "Talpro offers GCC Advisory and Workforce Launch, Technology Talent Solutions, Contract Staffing and Staff Augmentation, Permanent Hiring, Executive Search, and RPO and Managed Talent Capability.",
  },
  "years-in-business": {
    id: "years-in-business",
    category: "metric",
    status: "blocked",
    owner: "CEO / Finance",
    source: "No approved evidence pack in the repository",
    reviewDate: "2026-10-16",
    blockReason: "Brand history and legal-incorporation dates require reconciliation before public use.",
  },
  "placements-count": {
    id: "placements-count",
    category: "metric",
    status: "blocked",
    owner: "Delivery / Finance",
    source: "No approved calculation workbook in the repository",
    reviewDate: "2026-10-16",
    blockReason: "Scope, period, calculation method, and approval are missing.",
  },
  "client-retention": {
    id: "client-retention",
    category: "metric",
    status: "blocked",
    owner: "Revenue Operations / Finance",
    source: "No approved cohort calculation in the repository",
    reviewDate: "2026-10-16",
    blockReason: "Cohort, denominator, period, and approval are missing.",
  },
  "shortlist-sla": {
    id: "shortlist-sla",
    category: "commercial",
    status: "blocked",
    owner: "Delivery / Revenue Operations",
    source: "Conflicting 36-hour and 48-hour wording identified by Constitution v2.1",
    reviewDate: "2026-10-16",
    blockReason: "A universal website SLA is not approved; service levels must be set in the signed engagement.",
  },
  "zero-upfront": {
    id: "zero-upfront",
    category: "commercial",
    status: "blocked",
    owner: "Finance / Legal",
    source: "No approved universal commercial policy in the repository",
    reviewDate: "2026-10-16",
    blockReason: "Commercial terms vary by offer and require an approved mandate or agreement.",
  },
  "replacement-guarantee": {
    id: "replacement-guarantee",
    category: "commercial",
    status: "blocked",
    owner: "Delivery / Legal",
    source: "No approved universal guarantee policy in the repository",
    reviewDate: "2026-10-16",
    blockReason: "Replacement terms must be stated in the signed engagement, not as a universal public promise.",
  },
  "managed-technology-delivery": {
    id: "managed-technology-delivery",
    category: "commercial",
    status: "blocked",
    owner: "CEO / Delivery",
    source: "Constitution v2.1 requires substantiation before publication",
    reviewDate: "2026-10-16",
    blockReason: "No accountable engineering-delivery methodology, commercial ownership, or client evidence is approved.",
  },
  "regulated-industry-compliance": {
    id: "regulated-industry-compliance",
    category: "compliance",
    status: "blocked",
    owner: "Legal / Compliance",
    source: "Constitution v2.1 requires qualified approval for regulated claims",
    reviewDate: "2026-10-16",
    blockReason: "Candidate awareness cannot be represented as client, project, or system compliance.",
  },
  "anonymous-testimonials": {
    id: "anonymous-testimonials",
    category: "case_study",
    status: "blocked",
    owner: "CMO / Legal",
    source: "No client-authorisation evidence in the repository",
    reviewDate: "2026-10-16",
    blockReason: "Testimonials and outcomes require client authorisation or verified-anonymous approval.",
  },
} as const satisfies Record<string, ClaimRecord>;

export type ClaimId = keyof typeof claimRegistry;

export function getApprovedPublicClaim(id: ClaimId): string {
  const claim = claimRegistry[id];
  if (claim.status !== "approved" || !("publicWording" in claim) || !claim.publicWording) {
    throw new Error(`Claim ${id} is not approved for public use`);
  }
  return claim.publicWording;
}

export { APPROVED_BRAND_POSITION, APPROVED_MASTER_PROMISE } from "./approved-brand";
