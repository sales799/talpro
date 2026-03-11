import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).omit({
  id: true,
  createdAt: true,
  responded: true,
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
  title: z.string(),
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
  applicationUrl: z.string().url(),
  postedDate: z.string().datetime(),
  updatedDate: z.string().datetime().optional(),
  isActive: z.boolean(),
});

export const jobsResponseSchema = z.object({
  jobs: z.array(jobSchema),
  total: z.number(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

export type Job = z.infer<typeof jobSchema>;
export type JobsResponse = z.infer<typeof jobsResponseSchema>;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type WebhookBlogPost = z.infer<typeof webhookBlogPostSchema>;
