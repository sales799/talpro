import { describe, expect, it } from "vitest";
import { trustRegistry } from "../../shared/trust-registry";

describe("P2 trust registry", () => {
  it("keeps procurement, certification, and case-study claims evidence gated", () => {
    const status = Object.fromEntries(trustRegistry.map((control) => [control.id, control.status]));
    expect(status["procurement-pack"]).toBe("evidence_required");
    expect(status["workforce-governance"]).toBe("evidence_required");
    expect(status["subprocessors-vendors"]).toBe("evidence_required");
    expect(status["certifications-insurance"]).toBe("not_claimed");
    expect(status["case-studies"]).toBe("evidence_required");
  });

  it("publishes owners for every trust control", () => {
    for (const control of trustRegistry) {
      expect(control.owner.length).toBeGreaterThan(2);
      expect(control.publicSummary.length).toBeGreaterThan(20);
    }
  });
});
