import { describe, expect, it } from "vitest";
import { analyticsPath, governedAnalyticsEvents, sanitizeAnalyticsParams, sanitizeGovernedAnalyticsEvent } from "../../shared/analytics-governance";

describe("P4 analytics governance", () => {
  it("removes direct identifiers and unbounded values from analytics parameters", () => {
    expect(sanitizeAnalyticsParams({
      service: "it-staffing",
      source: "website",
      email: "asha@example.test",
      company: "Example GCC",
      message: "private hiring brief",
      nested: { unsafe: true },
      infinity: Number.POSITIVE_INFINITY,
    })).toEqual({ service: "it-staffing", source: "website" });
  });

  it("strips query strings and fragments from analytics paths", () => {
    expect(analyticsPath("/contact?email=asha%40example.test#form")).toBe("/contact");
    expect(analyticsPath("who-we-serve/ceo-founder?utm_source=test")).toBe("/who-we-serve/ceo-founder");
  });

  it("defines the mandatory governed conversion and quality events", () => {
    expect(governedAnalyticsEvents).toHaveProperty("contact_form_submit");
    expect(governedAnalyticsEvents).toHaveProperty("buyer_journey_view");
    expect(governedAnalyticsEvents).toHaveProperty("job_application_click");
    expect(governedAnalyticsEvents).toHaveProperty("web_vitals");
  });

  it("drops ungoverned events and event-specific parameters", () => {
    expect(sanitizeGovernedAnalyticsEvent("invented_event", { service: "it-staffing" })).toBeNull();
    expect(sanitizeGovernedAnalyticsEvent("contact_form_submit", {
      service: "it-staffing",
      source: "website",
      page_title: "not allowed for this event",
    })).toEqual({
      eventName: "contact_form_submit",
      params: { service: "it-staffing", source: "website" },
    });
  });
});
