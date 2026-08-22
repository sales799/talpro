import { createHash } from "node:crypto";
import type { InsertContactInquiry } from "@shared/schema";

const CONSUMER_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "hotmail.com",
  "outlook.com",
  "yahoo.com",
  "icloud.com",
]);

export function contactFingerprint(inquiry: Pick<InsertContactInquiry, "email" | "company" | "service">): string {
  const normalized = [inquiry.email, inquiry.company, inquiry.service]
    .map((value) => value?.trim().toLowerCase() || "")
    .join("|");
  return createHash("sha256").update(normalized).digest("hex");
}

export function routeLead(service?: string | null): string {
  const owners: Record<string, string> = {
    "gcc-accelerator": "GCC Workforce",
    "it-staffing": "Technology Talent",
    "contract-staffing": "Contract Staffing",
    "permanent-hiring": "Permanent Hiring",
    "executive-search": "Executive Search",
    "rpo-managed-talent": "Managed Talent",
  };
  return owners[service || ""] || "Revenue Operations";
}

export function scoreLead(inquiry: Pick<InsertContactInquiry, "email" | "company" | "service" | "message">): number {
  let score = 10;
  if (inquiry.company?.trim()) score += 25;
  if (inquiry.service?.trim()) score += 25;
  if (inquiry.message.trim().length >= 100) score += 20;
  const domain = inquiry.email.split("@")[1]?.toLowerCase();
  if (domain && !CONSUMER_EMAIL_DOMAINS.has(domain)) score += 20;
  return Math.min(score, 100);
}
