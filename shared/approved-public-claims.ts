import { APPROVED_BRAND_POSITION, APPROVED_MASTER_PROMISE } from "./approved-brand";

// This is the only claim vocabulary allowed in browser code. Internal owners,
// evidence locations, blocked wording and review notes stay in the server-side
// governance registry and must not be shipped to public clients.
export const approvedPublicClaims = {
  "brand-position": APPROVED_BRAND_POSITION,
  "master-promise": APPROVED_MASTER_PROMISE,
  "legal-entity": "TALPRO INDIA PRIVATE LIMITED",
  "candidate-no-application-fee": "Talpro does not charge candidates to apply for a role published on talproindia.com.",
  "approved-offer-families": "Talpro offers GCC Advisory and Workforce Launch, Technology Talent Solutions, Contract Staffing and Staff Augmentation, Permanent Hiring, Executive Search, and RPO and Managed Talent Capability.",
} as const;

export type ApprovedPublicClaimId = keyof typeof approvedPublicClaims;

export function getApprovedPublicClaim(id: ApprovedPublicClaimId): string {
  const wording = approvedPublicClaims[id];
  if (!wording) throw new Error(`Claim ${id} is not approved for public use`);
  return wording;
}

