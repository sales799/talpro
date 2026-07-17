import { describe, expect, it } from "vitest";
import { metricPayload } from "../../client/src/lib/performanceMonitoring";

describe("P4 Core Web Vitals payload", () => {
  it("reports only governed LCP, INP and CLS fields", () => {
    expect(metricPayload({ name: "LCP", value: 2499.6, rating: "good" })).toEqual({
      metric: "LCP",
      value: 2500,
      rating: "good",
    });
    expect(metricPayload({ name: "CLS", value: 0.09994, rating: "good" })).toEqual({
      metric: "CLS",
      value: 0.0999,
      rating: "good",
    });
  });
});
