import { describe, expect, it } from "vitest";
import { legacyServiceRedirects, services } from "../../client/src/config/services";

const approvedSlugs = [
  "gcc-accelerator",
  "it-staffing",
  "contract-staffing",
  "permanent-hiring",
  "executive-search",
  "rpo-managed-talent",
];

describe("Constitution v2.1 P1 offer architecture", () => {
  it("publishes exactly the six governed offers", () => {
    expect(services.map((service) => service.slug)).toEqual(approvedSlugs);
    expect(services).toHaveLength(6);
  });

  it("requires governance and withholds unsupported proof fields", () => {
    for (const service of services) {
      expect(service.governance?.owner).toBeTruthy();
      expect(service.governance?.commercialModel).toBeTruthy();
      expect(service.governance?.deliveryBoundary).toBeTruthy();
      expect(service.industries).toEqual([]);
      expect(service.testimonial).toBeUndefined();
      expect(service.stats).toBeUndefined();
    }
  });

  it("maps every legacy offer to an approved canonical offer", () => {
    for (const canonicalSlug of Object.values(legacyServiceRedirects)) {
      expect(approvedSlugs).toContain(canonicalSlug);
    }
  });
});
