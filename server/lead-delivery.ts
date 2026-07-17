import type { ContactInquiry } from "@shared/schema";
import type { IStorage } from "./storage";

const MAX_DELIVERY_ATTEMPTS = 5;
const DELIVERY_LEASE_MS = 90_000;
const RETRY_DELAYS_MS = [60_000, 5 * 60_000, 30 * 60_000, 2 * 60 * 60_000];

type FetchLike = (input: string | URL, init?: RequestInit) => Promise<Pick<Response, "ok" | "status">>;

export type LeadDeliveryResult = {
  status: "delivered" | "failed" | "escalated" | "skipped";
  attemptCount: number;
  nextAttemptAt: Date | null;
};

class LeadDeliveryError extends Error {
  constructor(readonly code: string) {
    super(code);
    this.name = "LeadDeliveryError";
  }
}

export function retryDelayMs(attemptCount: number): number | null {
  if (attemptCount >= MAX_DELIVERY_ATTEMPTS) return null;
  return RETRY_DELAYS_MS[Math.max(0, attemptCount - 1)] ?? RETRY_DELAYS_MS.at(-1)!;
}

export function validateLeadWebhook(rawUrl: string, nodeEnv = process.env.NODE_ENV): URL {
  let webhook: URL;
  try {
    webhook = new URL(rawUrl);
  } catch {
    throw new LeadDeliveryError("invalid_endpoint");
  }

  const localDevelopmentWebhook = nodeEnv === "development"
    && webhook.protocol === "http:"
    && ["localhost", "127.0.0.1"].includes(webhook.hostname);
  if (webhook.protocol !== "https:" && !localDevelopmentWebhook) {
    throw new LeadDeliveryError("invalid_endpoint");
  }
  return webhook;
}

function errorCode(error: unknown): string {
  if (error instanceof LeadDeliveryError) return error.code;
  if (error instanceof Error && ["AbortError", "TimeoutError"].includes(error.name)) return "timeout";
  return "network_error";
}

function deliveryPayload(inquiry: ContactInquiry) {
  return {
    inquiry_id: inquiry.id,
    company: inquiry.company || "Unknown",
    contact_name: `${inquiry.firstName} ${inquiry.lastName}`,
    email: inquiry.email,
    service: inquiry.service || "not-specified",
    message: inquiry.message,
    source: inquiry.source || "website",
    landing_page: inquiry.landingPage || "",
    referrer: inquiry.referrer || "",
    utm_source: inquiry.utmSource || "",
    utm_medium: inquiry.utmMedium || "",
    utm_campaign: inquiry.utmCampaign || "",
    utm_term: inquiry.utmTerm || "",
    utm_content: inquiry.utmContent || "",
    consent_given: inquiry.consentGiven,
    privacy_notice_version: inquiry.privacyNoticeVersion,
    lead_owner: inquiry.leadOwner,
    lead_score: inquiry.leadScore,
  };
}

export async function attemptLeadDelivery(options: {
  inquiry: ContactInquiry;
  storage: IStorage;
  webhookUrl: string;
  now?: Date;
  fetchImpl?: FetchLike;
}): Promise<LeadDeliveryResult> {
  const now = options.now ?? new Date();
  const claimed = await options.storage.claimContactInquiryForDelivery(
    options.inquiry.id,
    now,
    new Date(now.getTime() + DELIVERY_LEASE_MS),
  );
  if (!claimed) {
    return {
      status: "skipped",
      attemptCount: options.inquiry.crmDeliveryAttemptCount,
      nextAttemptAt: options.inquiry.crmNextAttemptAt,
    };
  }

  const attemptCount = claimed.crmDeliveryAttemptCount + 1;
  await options.storage.updateContactInquiry(claimed.id, {
    crmDeliveryStatus: "attempting",
    crmDeliveryAttemptedAt: now,
    crmDeliveryAttemptCount: attemptCount,
    crmLastErrorCode: null,
  });

  try {
    const webhook = validateLeadWebhook(options.webhookUrl);
    const response = await (options.fetchImpl ?? fetch)(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": claimed.id,
      },
      signal: AbortSignal.timeout(5_000),
      body: JSON.stringify(deliveryPayload(claimed)),
    });
    if (!response.ok) {
      const category = response.status === 429
        ? "http_429"
        : response.status >= 500
          ? "http_5xx"
          : "http_4xx";
      throw new LeadDeliveryError(category);
    }

    await options.storage.updateContactInquiry(claimed.id, {
      crmDeliveryStatus: "delivered",
      crmDeliveredAt: now,
      crmNextAttemptAt: null,
      crmDeliveryLeaseUntil: null,
      crmLastErrorCode: null,
    });
    return { status: "delivered", attemptCount, nextAttemptAt: null };
  } catch (error) {
    const delay = retryDelayMs(attemptCount);
    const escalated = delay === null;
    const nextAttemptAt = delay === null ? null : new Date(now.getTime() + delay);
    await options.storage.updateContactInquiry(claimed.id, {
      crmDeliveryStatus: escalated ? "escalated" : "failed",
      crmNextAttemptAt: nextAttemptAt,
      crmDeliveryLeaseUntil: null,
      crmLastErrorCode: errorCode(error),
      crmEscalatedAt: escalated ? now : null,
    });
    return {
      status: escalated ? "escalated" : "failed",
      attemptCount,
      nextAttemptAt,
    };
  }
}

export async function recoverDueLeadDeliveries(options: {
  storage: IStorage;
  webhookUrl: string;
  now?: Date;
  limit?: number;
  fetchImpl?: FetchLike;
}): Promise<{ delivered: number; failed: number; escalated: number; skipped: number }> {
  const now = options.now ?? new Date();
  const due = await options.storage.getDueContactInquiries(now, options.limit ?? 25);
  const summary = { delivered: 0, failed: 0, escalated: 0, skipped: 0 };

  for (const inquiry of due) {
    const result = await attemptLeadDelivery({
      inquiry,
      storage: options.storage,
      webhookUrl: options.webhookUrl,
      now,
      fetchImpl: options.fetchImpl,
    });
    summary[result.status] += 1;
  }
  return summary;
}

export function startLeadDeliveryRecovery(options: {
  storage: IStorage;
  webhookUrl?: string;
  intervalMs?: number;
}): () => void {
  if (!options.webhookUrl || process.env.NODE_ENV === "test") return () => undefined;

  let running = false;
  const recover = async () => {
    if (running) return;
    running = true;
    try {
      const summary = await recoverDueLeadDeliveries({
        storage: options.storage,
        webhookUrl: options.webhookUrl!,
      });
      if (summary.delivered || summary.failed || summary.escalated) {
        console.info("[lead-routing] Recovery cycle", summary);
      }
    } catch {
      console.error("[lead-routing] Recovery cycle unavailable");
    } finally {
      running = false;
    }
  };

  void recover();
  const timer = setInterval(() => void recover(), options.intervalMs ?? 60_000);
  timer.unref();
  return () => clearInterval(timer);
}
