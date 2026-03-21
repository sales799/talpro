/**
 * Cycle 1: Schema additions for TalPro India
 * Add these to shared/schema.ts
 */

import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// ── Jobs Table (replaces PyjamaHR scraper) ──────────────────────

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
  postedDate: timestamp("posted_date").defaultNow(),
  updatedDate: timestamp("updated_date"),
  isActive: boolean("is_active").default(true).notNull(),
  metaTitle: varchar("meta_title", { length: 70 }),
  metaDescription: varchar("meta_description", { length: 160 }),
  source: varchar("source", { length: 50 }).default("manual"),
  externalId: varchar("external_id", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  createdAt: true,
});

export type Job = typeof jobs.$inferSelect;
export type InsertJob = typeof jobs.$inferInsert;
