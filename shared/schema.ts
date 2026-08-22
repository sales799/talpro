import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { PRIVACY_NOTICE_VERSION } from "./privacy";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactInquiries = pgTable("contact_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  service: text("service"),
  message: text("message").notNull(),
  source: text("source"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmTerm: text("utm_term"),
  utmContent: text("utm_content"),
  landingPage: text("landing_page"),
  referrer: text("referrer"),
  consentGiven: boolean("consent_given").default(false).notNull(),
  privacyNoticeVersion: varchar("privacy_notice_version", { length: 40 }),
  submissionFingerprint: varchar("submission_fingerprint", { length: 64 }),
  duplicateOf: varchar("duplicate_of"),
  leadOwner: varchar("lead_owner", { length: 120 }).default("Unassigned").notNull(),
  leadScore: integer("lead_score").default(0).notNull(),
  acknowledgementAt: timestamp("acknowledgement_at"),
  crmDeliveryStatus: varchar("crm_delivery_status", { length: 30 }).default("not_configured").notNull(),
  crmDeliveryAttemptedAt: timestamp("crm_delivery_attempted_at"),
  crmDeliveredAt: timestamp("crm_delivered_at"),
  crmDeliveryAttemptCount: integer("crm_delivery_attempt_count").default(0).notNull(),
  crmNextAttemptAt: timestamp("crm_next_attempt_at"),
  crmDeliveryLeaseUntil: timestamp("crm_delivery_lease_until"),
  crmLastErrorCode: varchar("crm_last_error_code", { length: 80 }),
  crmEscalatedAt: timestamp("crm_escalated_at"),
  crmOpportunityId: varchar("crm_opportunity_id", { length: 160 }),
  crmOpportunityStage: varchar("crm_opportunity_stage", { length: 120 }),
  crmFeedbackAt: timestamp("crm_feedback_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  responded: boolean("responded").default(false).notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  imageUrl: text("image_url"),
  imageAlt: text("image_alt"),
  tags: text("tags").array(),
  category: varchar("category", { length: 100 }),
  publishedAt: timestamp("published_at"),
  sourceUrl: text("source_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  // ── Added for auto blog poster (Sprint 11) ──
  author: varchar("author", { length: 100 }).default("TalPro Editorial"),
  authorRole: varchar("author_role", { length: 100 }),
  readingTime: integer("reading_time"),           // minutes
  featured: boolean("featured").default(false),
  metaTitle: varchar("meta_title", { length: 70 }),
  metaDescription: varchar("meta_description", { length: 160 }),
  qualityScore: integer("quality_score"),          // 0-100
  generationSource: varchar("generation_source", { length: 50 }), // 'manual', 'n8n', 'webhook'
  keywords: text("keywords").array(),              // target SEO keywords
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  source: varchar("source", { length: 50 }).default("website"),
});

export const jobs = pgTable("jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  department: varchar("department", { length: 100 }),
  location: text("location").notNull().default("India"),
  employmentType: varchar("employment_type", { length: 20 }).notNull().default("full-time"),
  experienceLevel: varchar("experience_level", { length: 20 }),
  description: text("description").notNull(),
  requirements: text("requirements").array().default(sql`'{}'`),
  benefits: text("benefits").array().default(sql`'{}'`),
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  salaryCurrency: varchar("salary_currency", { length: 3 }).default("INR"),
  remote: boolean("remote").default(false),
  applicationUrl: text("application_url"),
  hiringOrganization: text("hiring_organization"),
  postedDate: timestamp("posted_date").defaultNow(),
  expiresAt: timestamp("expires_at"),
  verifiedAt: timestamp("verified_at"),
  verifiedBy: varchar("verified_by", { length: 160 }),
  updatedDate: timestamp("updated_date"),
  isActive: boolean("is_active").default(true).notNull(),
  metaTitle: varchar("meta_title", { length: 70 }),
  metaDescription: varchar("meta_description", { length: 160 }),
  source: varchar("source", { length: 50 }).default("manual"),
  externalId: varchar("external_id", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).omit({
  id: true,
  createdAt: true,
  responded: true,
  submissionFingerprint: true,
  duplicateOf: true,
  leadOwner: true,
  leadScore: true,
  acknowledgementAt: true,
  crmDeliveryStatus: true,
  crmDeliveryAttemptedAt: true,
  crmDeliveredAt: true,
  crmDeliveryAttemptCount: true,
  crmNextAttemptAt: true,
  crmDeliveryLeaseUntil: true,
  crmLastErrorCode: true,
  crmEscalatedAt: true,
  crmOpportunityId: true,
  crmOpportunityStage: true,
  crmFeedbackAt: true,
}).extend({
  firstName: z.string().trim().min(1, "First name is required").max(80, "First name is too long"),
  lastName: z.string().trim().min(1, "Last name is required").max(80, "Last name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(254, "Email is too long"),
  company: z.string().trim().max(160, "Company is too long").optional().nullable(),
  service: z.string().trim().max(160, "Service is too long").optional().nullable(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000, "Message is too long"),
  source: z.string().trim().max(120, "Source is too long").optional().nullable(),
  utmSource: z.string().trim().max(120, "UTM source is too long").optional().nullable(),
  utmMedium: z.string().trim().max(120, "UTM medium is too long").optional().nullable(),
  utmCampaign: z.string().trim().max(120, "UTM campaign is too long").optional().nullable(),
  utmTerm: z.string().trim().max(120, "UTM term is too long").optional().nullable(),
  utmContent: z.string().trim().max(120, "UTM content is too long").optional().nullable(),
  landingPage: z.string().trim().max(500, "Landing page is too long").optional().nullable(),
  referrer: z.string().trim().max(500, "Referrer is too long").optional().nullable(),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: "Consent is required to submit this inquiry" }),
  }),
  privacyNoticeVersion: z.literal(PRIVACY_NOTICE_VERSION, {
    errorMap: () => ({ message: "The privacy notice has changed; reload the page and review it again" }),
  }),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
});

export const webhookBlogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content_markdown: z.string().min(1, "Content is required"),
  source_url: z.string().url().optional(),
  excerpt: z.string().optional(),
  tags: z.array(z.string()).optional(),
  image_url: z.string().url().optional(),
  image_alt: z.string().optional(),
});

// Job listings schema for ATS integration
export const jobSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  hiringOrganization: z.string(),
  department: z.string().optional(),
  location: z.string(),
  employmentType: z.enum(['full-time', 'part-time', 'contract', 'internship']).optional(),
  experienceLevel: z.enum(['entry', 'mid', 'senior', 'executive']).optional(),
  description: z.string(),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  salaryCurrency: z.string().optional(),
  remote: z.boolean().optional(),
  applicationUrl: z.string().url().refine((value) => value.startsWith("https://"), "Application URL must use HTTPS"),
  postedDate: z.string().datetime(),
  updatedDate: z.string().datetime().optional(),
  expiresAt: z.string().datetime(),
  isActive: z.boolean(),
});

export const jobsResponseSchema = z.object({
  jobs: z.array(jobSchema),
  total: z.number(),
  page: z.number().optional(),
  limit: z.number().optional(),
  availability: z.enum(["available", "temporarily_unavailable"]).optional(),
});

export const opportunityFeedbackSchema = z.object({
  opportunityId: z.string().trim().min(1).max(160),
  stage: z.enum(["qualified", "discovery", "proposal", "won", "lost", "disqualified"]),
  recordedAt: z.string().datetime(),
});

export type Job = z.infer<typeof jobSchema>;
export type JobsResponse = z.infer<typeof jobsResponseSchema>;
export type DbJob = typeof jobs.$inferSelect;
export type InsertJob = typeof jobs.$inferInsert;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type ContactInquiryRecordInput = InsertContactInquiry & Pick<ContactInquiry,
  | "submissionFingerprint"
  | "duplicateOf"
  | "leadOwner"
  | "leadScore"
  | "acknowledgementAt"
  | "crmDeliveryStatus"
  | "crmDeliveryAttemptedAt"
  | "crmDeliveredAt"
  | "crmDeliveryAttemptCount"
  | "crmNextAttemptAt"
  | "crmDeliveryLeaseUntil"
  | "crmLastErrorCode"
  | "crmEscalatedAt"
  | "crmOpportunityId"
  | "crmOpportunityStage"
  | "crmFeedbackAt"
>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type WebhookBlogPost = z.infer<typeof webhookBlogPostSchema>;
export type OpportunityFeedback = z.infer<typeof opportunityFeedbackSchema>;
