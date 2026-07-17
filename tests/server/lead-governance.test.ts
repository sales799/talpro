import { describe, expect, it } from "vitest";
import { contactFingerprint, routeLead, scoreLead } from "../../server/lead-governance";

describe("P2 lead governance", () => {
  it("routes canonical offers to accountable teams", () => {
    expect(routeLead("gcc-accelerator")).toBe("GCC Workforce");
    expect(routeLead("contract-staffing")).toBe("Contract Staffing");
    expect(routeLead("unknown")).toBe("Revenue Operations");
  });

  it("uses a stable non-plaintext deduplication fingerprint", () => {
    const first = contactFingerprint({ email: " Buyer@Example.com ", company: "Example", service: "it-staffing" });
    const second = contactFingerprint({ email: "buyer@example.com", company: " example ", service: "it-staffing" });
    expect(first).toBe(second);
    expect(first).toMatch(/^[a-f0-9]{64}$/);
    expect(first).not.toContain("buyer");
  });

  it("scores qualification signals deterministically", () => {
    expect(scoreLead({
      email: "buyer@example.com",
      company: "Example GCC",
      service: "it-staffing",
      message: "We need a governed hiring plan for six platform engineering roles with a confirmed start date next quarter.",
    })).toBe(100);
  });
});
