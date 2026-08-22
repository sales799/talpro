import { describe, expect, it } from "vitest";
import { audienceJourneys } from "../../shared/audience-journeys";
import { contentGovernanceRegistry, isPublishableContent } from "../../shared/content-governance";

describe("P3 content governance", () => {
  it("gives every published buyer journey a current accountable evidence record", () => {
    const recordsByPath = new Map(contentGovernanceRegistry.map((record) => [record.publicPath, record]));
    for (const journey of audienceJourneys) {
      const record = recordsByPath.get(`/who-we-serve/${journey.slug}`);
      expect(record, journey.slug).toBeDefined();
      expect(isPublishableContent(record!, new Date("2026-07-17T00:00:00.000Z")), journey.slug).toBe(true);
    }
  });

  it("keeps research and regional pages unpublished while evidence is missing", () => {
    const gated = contentGovernanceRegistry.filter((record) => record.contentType !== "buyer_journey");
    expect(gated.length).toBeGreaterThanOrEqual(4);
    for (const record of gated) {
      expect(record.publicPath).toBeNull();
      expect(record.missingEvidence.length).toBeGreaterThan(0);
      expect(isPublishableContent(record, new Date("2026-07-17T00:00:00.000Z"))).toBe(false);
    }
  });
});
