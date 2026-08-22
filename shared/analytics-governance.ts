export type AnalyticsParam = string | number | boolean;

export const governedAnalyticsEvents = {
  page_view: ["page_path", "page_title"],
  contact_form_submit: ["service", "source"],
  service_interest: ["service", "action"],
  service_page_view: ["service_slug"],
  buyer_journey_view: ["audience_slug"],
  cta_click: ["surface", "destination", "service_slug", "audience_slug"],
  trust_control_view: ["control_id", "status"],
  job_search: ["filter_count", "result_count"],
  job_view: ["job_id"],
  job_application_click: ["job_id"],
  consent_update: ["analytics_allowed"],
  web_vitals: ["metric", "value", "rating"],
} as const;

export type GovernedAnalyticsEvent = keyof typeof governedAnalyticsEvents;

const FORBIDDEN_KEY = /(name|email|company|message|phone|address|referrer|url|query|search_term|transaction)/i;

export function sanitizeAnalyticsParams(params: Record<string, unknown> = {}): Record<string, AnalyticsParam> {
  return Object.fromEntries(
    Object.entries(params).flatMap(([key, value]) => {
      if (FORBIDDEN_KEY.test(key)) return [];
      if (!["string", "number", "boolean"].includes(typeof value)) return [];
      if (typeof value === "string" && (value.includes("@") || value.length > 160)) return [];
      if (typeof value === "number" && !Number.isFinite(value)) return [];
      return [[key, value as AnalyticsParam]];
    }),
  );
}

export function analyticsPath(value: string): string {
  const path = value.split(/[?#]/, 1)[0] || "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function sanitizeGovernedAnalyticsEvent(
  eventName: string,
  params: Record<string, unknown> = {},
): { eventName: GovernedAnalyticsEvent; params: Record<string, AnalyticsParam> } | null {
  if (!(eventName in governedAnalyticsEvents)) return null;
  const governedEvent = eventName as GovernedAnalyticsEvent;
  const allowed = new Set<string>(governedAnalyticsEvents[governedEvent]);
  const sanitized = sanitizeAnalyticsParams(params);
  return {
    eventName: governedEvent,
    params: Object.fromEntries(Object.entries(sanitized).filter(([key]) => allowed.has(key))),
  };
}
