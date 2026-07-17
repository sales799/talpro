import { describe, expect, it } from "vitest";
import {
  APPROVED_BRAND_POSITION,
  APPROVED_MASTER_PROMISE,
  claimRegistry,
  getApprovedPublicClaim,
} from "../../shared/claim-registry";
import { approvedPublicClaims } from "../../shared/approved-public-claims";

describe("website claim registry", () => {
  it("publishes the constitution-approved brand position and promise", () => {
    expect(APPROVED_BRAND_POSITION).toContain("Technology Talent and GCC Workforce Partner");
    expect(APPROVED_MASTER_PROMISE).toBe(
      "Talpro builds and scales India technology capability for global companies.",
    );
    expect(getApprovedPublicClaim("candidate-no-application-fee")).toContain("does not charge candidates");
  });

  it("requires evidence before blocked claims can be published", () => {
    const blockedIds = Object.values(claimRegistry)
      .filter((claim) => claim.status === "blocked")
      .map((claim) => claim.id);

    expect(blockedIds).toEqual(
      expect.arrayContaining([
        "years-in-business",
        "placements-count",
        "client-retention",
        "shortlist-sla",
        "zero-upfront",
        "replacement-guarantee",
        "managed-technology-delivery",
        "regulated-industry-compliance",
        "anonymous-testimonials",
      ]),
    );

    for (const id of blockedIds) {
      expect(() => getApprovedPublicClaim(id as keyof typeof claimRegistry)).toThrow(
        "is not approved for public use",
      );
    }
  });

  it("keeps internal and blocked claim records out of the browser vocabulary", () => {
    expect(Object.keys(approvedPublicClaims)).toEqual([
      "brand-position",
      "master-promise",
      "legal-entity",
      "candidate-no-application-fee",
      "approved-offer-families",
    ]);
    expect("shortlist-sla" in approvedPublicClaims).toBe(false);
    expect("anonymous-testimonials" in approvedPublicClaims).toBe(false);
  });
});
