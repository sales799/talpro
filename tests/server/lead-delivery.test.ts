import { describe, expect, it, vi } from "vitest";
import { opportunityFeedbackSchema } from "../../shared/schema";
import {
  attemptLeadDelivery,
  recoverDueLeadDeliveries,
  retryDelayMs,
  validateLeadWebhook,
} from "../../server/lead-delivery";
import { MemStorage } from "../../server/storage";

async function pendingInquiry(storage: MemStorage) {
  const now = new Date("2026-07-17T06:00:00.000Z");
  return storage.createContactInquiry({
    firstName: "Asha",
    lastName: "Rao",
    email: "asha.rao@example.test",
    company: "Example GCC",
    service: "it-staffing",
    message: "We need two senior platform engineers for an approved sandbox test.",
    source: "website",
    utmSource: "governed-test",
    utmMedium: "integration",
    utmCampaign: "p2-evidence",
    utmTerm: null,
    utmContent: null,
    landingPage: "/services/it-staffing",
    referrer: null,
    consentGiven: true,
    privacyNoticeVersion: "2026-03-14",
    submissionFingerprint: "test-fingerprint",
    duplicateOf: null,
    leadOwner: "Technology Talent",
    leadScore: 80,
    acknowledgementAt: now,
    crmDeliveryStatus: "pending",
    crmDeliveryAttemptedAt: null,
    crmDeliveredAt: null,
    crmDeliveryAttemptCount: 0,
    crmNextAttemptAt: now,
    crmDeliveryLeaseUntil: null,
    crmLastErrorCode: null,
    crmEscalatedAt: null,
    crmOpportunityId: null,
    crmOpportunityStage: null,
    crmFeedbackAt: null,
  });
}

describe("durable P2 lead delivery", () => {
  it("delivers once with a stable idempotency key", async () => {
    const storage = new MemStorage();
    const inquiry = await pendingInquiry(storage);
    let capturedInit: RequestInit | undefined;
    const fetchImpl = vi.fn(async (_input: string | URL, init?: RequestInit) => {
      capturedInit = init;
      return { ok: true, status: 200 };
    });

    const result = await attemptLeadDelivery({
      inquiry,
      storage,
      webhookUrl: "https://sandbox.crm.example.test/leads",
      now: inquiry.acknowledgementAt!,
      fetchImpl,
    });

    expect(result).toEqual({ status: "delivered", attemptCount: 1, nextAttemptAt: null });
    expect(fetchImpl).toHaveBeenCalledOnce();
    expect(capturedInit?.headers).toMatchObject({ "Idempotency-Key": inquiry.id });
    const [stored] = await storage.getContactInquiries();
    expect(stored.crmDeliveryStatus).toBe("delivered");
    expect(stored.crmDeliveryLeaseUntil).toBeNull();
  });

  it("backs off, records non-sensitive error codes, and escalates after five failures", async () => {
    const storage = new MemStorage();
    await pendingInquiry(storage);
    const fetchImpl = vi.fn(async () => ({ ok: false, status: 503 }));
    let now = new Date("2026-07-17T06:00:00.000Z");

    for (let attempt = 1; attempt <= 5; attempt += 1) {
      const summary = await recoverDueLeadDeliveries({
        storage,
        webhookUrl: "https://sandbox.crm.example.test/leads",
        now,
        fetchImpl,
      });
      const [stored] = await storage.getContactInquiries();
      expect(stored.crmDeliveryAttemptCount).toBe(attempt);
      expect(stored.crmLastErrorCode).toBe("http_5xx");

      if (attempt < 5) {
        expect(summary.failed).toBe(1);
        expect(stored.crmDeliveryStatus).toBe("failed");
        now = stored.crmNextAttemptAt!;
      } else {
        expect(summary.escalated).toBe(1);
        expect(stored.crmDeliveryStatus).toBe("escalated");
        expect(stored.crmNextAttemptAt).toBeNull();
        expect(stored.crmEscalatedAt).toEqual(now);
      }
    }

    expect(fetchImpl).toHaveBeenCalledTimes(5);
  });

  it("leases a due inquiry so concurrent workers cannot send it twice", async () => {
    const storage = new MemStorage();
    const inquiry = await pendingInquiry(storage);
    const fetchImpl = vi.fn(async () => ({ ok: true, status: 200 }));

    const results = await Promise.all([
      attemptLeadDelivery({
        inquiry,
        storage,
        webhookUrl: "https://sandbox.crm.example.test/leads",
        now: inquiry.acknowledgementAt!,
        fetchImpl,
      }),
      attemptLeadDelivery({
        inquiry,
        storage,
        webhookUrl: "https://sandbox.crm.example.test/leads",
        now: inquiry.acknowledgementAt!,
        fetchImpl,
      }),
    ]);

    expect(results.map((result) => result.status).sort()).toEqual(["delivered", "skipped"]);
    expect(fetchImpl).toHaveBeenCalledOnce();
  });

  it("enforces HTTPS outside local development and exposes a deterministic retry policy", () => {
    expect(() => validateLeadWebhook("http://crm.example.test/leads", "production")).toThrow("invalid_endpoint");
    expect(validateLeadWebhook("http://127.0.0.1:8080/leads", "development").hostname).toBe("127.0.0.1");
    expect(retryDelayMs(1)).toBe(60_000);
    expect(retryDelayMs(4)).toBe(2 * 60 * 60_000);
    expect(retryDelayMs(5)).toBeNull();
  });

  it("validates the bounded CRM opportunity feedback contract", () => {
    expect(opportunityFeedbackSchema.parse({
      opportunityId: "opp-sandbox-001",
      stage: "qualified",
      recordedAt: "2026-07-17T06:30:00.000Z",
    })).toMatchObject({ stage: "qualified" });
    expect(opportunityFeedbackSchema.safeParse({
      opportunityId: "opp-sandbox-001",
      stage: "invented-stage",
      recordedAt: "not-a-date",
    }).success).toBe(false);
  });
});
