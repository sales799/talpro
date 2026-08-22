import { onCLS, onINP, onLCP, type Metric } from "web-vitals";

export function metricPayload(metric: Pick<Metric, "name" | "value" | "rating">) {
  return {
    metric: metric.name,
    value: metric.name === "CLS" ? Number(metric.value.toFixed(4)) : Math.round(metric.value),
    rating: metric.rating,
  };
}

function capture(metric: Metric) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "web_vitals", metricPayload(metric));
  }
}

export function registerWebVitals() {
  onCLS(capture, { reportAllChanges: true });
  onINP(capture, { reportAllChanges: true });
  onLCP(capture, { reportAllChanges: true });
}

export function sendWebVitalsToGA() {
  registerWebVitals();
}
