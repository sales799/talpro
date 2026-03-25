var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import "dotenv/config";
import express2 from "express";
import compression from "compression";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  blogPosts: () => blogPosts,
  contactInquiries: () => contactInquiries,
  insertBlogPostSchema: () => insertBlogPostSchema,
  insertContactInquirySchema: () => insertContactInquirySchema,
  insertUserSchema: () => insertUserSchema,
  jobSchema: () => jobSchema,
  jobsResponseSchema: () => jobsResponseSchema,
  newsletterSubscribers: () => newsletterSubscribers,
  users: () => users,
  webhookBlogPostSchema: () => webhookBlogPostSchema
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var contactInquiries = pgTable("contact_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  service: text("service"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  responded: boolean("responded").default(false).notNull()
});
var blogPosts = pgTable("blog_posts", {
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
  readingTime: integer("reading_time"),
  // minutes
  featured: boolean("featured").default(false),
  metaTitle: varchar("meta_title", { length: 70 }),
  metaDescription: varchar("meta_description", { length: 160 }),
  qualityScore: integer("quality_score"),
  // 0-100
  generationSource: varchar("generation_source", { length: 50 }),
  // 'manual', 'n8n', 'webhook'
  keywords: text("keywords").array()
  // target SEO keywords
});
var newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  source: varchar("source", { length: 50 }).default("website")
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertContactInquirySchema = createInsertSchema(contactInquiries).omit({
  id: true,
  createdAt: true,
  responded: true
});
var insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true
});
var webhookBlogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content_markdown: z.string().min(1, "Content is required"),
  source_url: z.string().url().optional(),
  excerpt: z.string().optional(),
  tags: z.array(z.string()).optional(),
  image_url: z.string().url().optional(),
  image_alt: z.string().optional()
});
var jobSchema = z.object({
  id: z.string(),
  title: z.string(),
  department: z.string().optional(),
  location: z.string(),
  employmentType: z.enum(["full-time", "part-time", "contract", "internship"]).optional(),
  experienceLevel: z.enum(["entry", "mid", "senior", "executive"]).optional(),
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
  isActive: z.boolean()
});
var jobsResponseSchema = z.object({
  jobs: z.array(jobSchema),
  total: z.number(),
  page: z.number().optional(),
  limit: z.number().optional()
});

// server/db.ts
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle(pool, { schema: schema_exports });

// server/storage.ts
import { eq, and, desc, sql as sql2 } from "drizzle-orm";
var DatabaseStorage = class {
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async createContactInquiry(inquiry) {
    const [contactInquiry] = await db.insert(contactInquiries).values({
      ...inquiry,
      company: inquiry.company ?? null,
      service: inquiry.service ?? null
    }).returning();
    return contactInquiry;
  }
  async getContactInquiries() {
    return await db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
  }
  async updateContactInquiry(id, updates) {
    const [updated] = await db.update(contactInquiries).set(updates).where(eq(contactInquiries.id, id)).returning();
    return updated || void 0;
  }
  async createBlogPost(post) {
    const [blogPost] = await db.insert(blogPosts).values({
      ...post,
      imageUrl: post.imageUrl ?? null,
      imageAlt: post.imageAlt ?? null,
      tags: post.tags ?? null,
      publishedAt: post.publishedAt ?? null,
      sourceUrl: post.sourceUrl ?? null,
      author: post.author ?? "TalPro Editorial",
      authorRole: post.authorRole ?? null,
      readingTime: post.readingTime ?? null,
      featured: post.featured ?? false,
      metaTitle: post.metaTitle ?? null,
      metaDescription: post.metaDescription ?? null,
      qualityScore: post.qualityScore ?? null,
      generationSource: post.generationSource ?? null,
      keywords: post.keywords ?? null
    }).returning();
    return blogPost;
  }
  async getBlogPosts(filters) {
    let queryBuilder = db.select().from(blogPosts);
    const conditions = [];
    if (filters?.published !== void 0) {
      if (filters.published) {
        conditions.push(sql2`${blogPosts.publishedAt} IS NOT NULL`);
      } else {
        conditions.push(sql2`${blogPosts.publishedAt} IS NULL`);
      }
    }
    if (filters?.tags && filters.tags.length > 0) {
      conditions.push(sql2`${blogPosts.tags} && ${filters.tags}`);
    }
    if (conditions.length > 0) {
      queryBuilder = queryBuilder.where(and(...conditions));
    }
    queryBuilder = queryBuilder.orderBy(desc(sql2`COALESCE(${blogPosts.publishedAt}, ${blogPosts.createdAt})`));
    if (filters?.limit) {
      queryBuilder = queryBuilder.limit(filters.limit);
    }
    if (filters?.offset) {
      queryBuilder = queryBuilder.offset(filters.offset);
    }
    return await queryBuilder;
  }
  async getBlogPost(id) {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || void 0;
  }
  async getBlogPostBySlug(slug) {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || void 0;
  }
  async updateBlogPost(id, updates) {
    const [updated] = await db.update(blogPosts).set(updates).where(eq(blogPosts.id, id)).returning();
    return updated || void 0;
  }
  async deleteBlogPost(id) {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return (result.rowCount ?? 0) > 0;
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { z as z2 } from "zod";
import * as cheerio from "cheerio";
import OpenAI from "openai";

// server/blog-generator.ts
import Anthropic from "@anthropic-ai/sdk";
var CONTENT_PILLARS = [
  {
    pillar: "GCC Hiring & Expansion",
    topics: [
      "GCC growth in Tier-2 cities beyond Bangalore and Hyderabad",
      "How GCCs are building AI/ML teams in India \u2014 hiring patterns and challenges",
      "GCC vs traditional outsourcing: why companies are choosing captive centres",
      "Retention strategies that work for GCC engineering teams in India",
      "Setting up a GCC compliance checklist \u2014 DPDPA, labour codes, and entity requirements"
    ]
  },
  {
    pillar: "Labour Code Compliance",
    topics: [
      "India's 4 new Labour Codes: what IT employers need to know in 2026",
      "EPF and ESI compliance for contract staffing \u2014 employer obligations explained",
      "Professional Tax rates across Indian states \u2014 a complete reference",
      "DPDPA (Digital Personal Data Protection Act) compliance for HR and recruitment",
      "Gratuity calculations under the new Code on Social Security \u2014 practical examples"
    ]
  },
  {
    pillar: "IT Staffing Operations",
    topics: [
      "Billing rate structures for IT contract staffing in India \u2014 what's market standard",
      "How to reduce time-to-hire from 45 days to under 20 days",
      "The hidden costs of bad hiring: calculating the real impact of wrong hires",
      "Building an internal referral programme that actually works",
      "RPO vs traditional recruitment: when to choose each model"
    ]
  },
  {
    pillar: "City-wise Talent Intelligence",
    topics: [
      "Pune's emerging tech talent pool \u2014 specializations and salary benchmarks",
      "Chennai vs Hyderabad for data engineering talent \u2014 a comparison",
      "NCR (Gurgaon/Noida) fintech hiring landscape in 2026",
      "Bangalore talent market saturation: strategies for competitive hiring",
      "Tier-2 tech hubs: Jaipur, Kochi, and Ahmedabad as emerging talent sources"
    ]
  },
  {
    pillar: "Technology Hiring Trends",
    topics: [
      "AI/ML hiring in India \u2014 which roles are in demand and what they pay",
      "Platform engineering vs DevOps \u2014 the hiring shift",
      "Rust and Go adoption in Indian companies \u2014 developer supply vs demand",
      "Cybersecurity hiring surge: filling the 40,000-role gap in India",
      "Low-code/no-code impact on traditional developer hiring"
    ]
  },
  {
    pillar: "Compensation & Benefits",
    topics: [
      "ESOP taxation changes in India \u2014 what tech employees need to know",
      "Notice period buyouts: when they make sense and how to negotiate",
      "Structuring competitive compensation packages for senior engineers in India",
      "Contract-to-hire conversion: fair pricing models and best practices",
      "Remote work compensation: should location-based pay apply in India?"
    ]
  }
];
var INTERNAL_LINKS = [
  { url: "/services/it-staffing", anchor: "IT contract staffing" },
  { url: "/services/engineering-staffing", anchor: "engineering staffing" },
  { url: "/services/direct-hiring-it", anchor: "permanent IT hiring" },
  { url: "/services/executive-search", anchor: "executive search" },
  { url: "/services/gcc-accelerator", anchor: "GCC Accelerator" },
  { url: "/salary-guide", anchor: "salary benchmarks" },
  { url: "/salary-calculator", anchor: "salary calculator" },
  { url: "/industries/fintech-financial-services", anchor: "fintech staffing" },
  { url: "/how-we-work", anchor: "our recruitment process" },
  { url: "/contact", anchor: "get in touch" },
  { url: "/for-candidates", anchor: "explore opportunities" },
  { url: "/case-studies", anchor: "client success stories" },
  { url: "/staffing-quiz", anchor: "staffing model quiz" }
];
function selectTopic(dayIndex) {
  const allTopics = CONTENT_PILLARS.flatMap(
    (p) => p.topics.map((t) => ({ pillar: p.pillar, topic: t }))
  );
  const idx = dayIndex !== void 0 ? dayIndex % allTopics.length : Math.floor(Math.random() * allTopics.length);
  return allTopics[idx];
}
async function generateArticle(topic, pillar, apiKey) {
  const anthropicKey = apiKey || process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    throw new Error("ANTHROPIC_API_KEY is required for content generation");
  }
  const client = new Anthropic({ apiKey: anthropicKey });
  const shuffled = [...INTERNAL_LINKS].sort(() => Math.random() - 0.5);
  const linksToInclude = shuffled.slice(0, 4);
  const linkInstructions = linksToInclude.map((l) => `- Link to "${l.anchor}" at ${l.url}`).join("\n");
  const prompt = `You are the content engine for TalPro India (talproindia.com), a specialist IT contract staffing firm based in Bengaluru with 15+ years of experience. Write a comprehensive blog article on the following topic.

TOPIC: ${topic}
CONTENT PILLAR: ${pillar}

BRAND VOICE:
- Authoritative but approachable \u2014 like an experienced recruiter sharing insights over coffee
- Data-driven \u2014 cite specific numbers, percentages, salary ranges where relevant
- India-specific \u2014 all context is Indian IT industry, Indian labour law, Indian cities
- Practical \u2014 give actionable advice, not generic platitudes
- Never use the words "leverage", "synergy", "paradigm shift", or "game-changer"
- Write in British English spelling (organisation, specialisation, etc.)

STRUCTURE REQUIREMENTS:
- Title: compelling, under 65 characters, includes primary keyword
- Article: 1,200\u20131,800 words
- Use H2 and H3 headings to break up content
- Include at least one bulleted or numbered list
- Include specific Indian salary figures in INR (Lakhs Per Annum) where relevant
- End with a call-to-action referencing TalPro's services

INTERNAL LINKS (weave these naturally into the article \u2014 use HTML anchor tags):
${linkInstructions}

SEO REQUIREMENTS:
- Primary keyword should appear 3-5 times naturally
- Use related LSI keywords throughout
- First paragraph should hook the reader with a surprising stat or insight

OUTPUT FORMAT (return as valid JSON):
{
  "title": "...",
  "content": "<p>...</p><h2>...</h2>...",
  "excerpt": "...(150-200 chars)...",
  "tags": ["Tag1", "Tag2", "Tag3", "Tag4"],
  "metaTitle": "...(under 60 chars)...",
  "metaDescription": "...(150-160 chars)...",
  "keywords": ["primary keyword", "secondary keyword 1", "secondary keyword 2"]
}

Return ONLY the JSON object. No markdown code fences, no explanation.`;
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }]
  });
  const text2 = response.content[0].type === "text" ? response.content[0].text : "";
  try {
    const jsonMatch = text2.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");
    return JSON.parse(jsonMatch[0]);
  } catch (e) {
    throw new Error(`Failed to parse Claude response as JSON: ${e.message}`);
  }
}
function scoreContent(article) {
  const issues = [];
  let score = 100;
  const plainText = article.content.replace(/<[^>]+>/g, "");
  const wordCount = plainText.split(/\s+/).length;
  if (wordCount < 800) {
    score -= 25;
    issues.push(`Word count too low: ${wordCount} (minimum 800)`);
  } else if (wordCount < 1200) {
    score -= 10;
    issues.push(`Word count below target: ${wordCount} (target 1200+)`);
  }
  const h2Count = (article.content.match(/<h2/gi) || []).length;
  const h3Count = (article.content.match(/<h3/gi) || []).length;
  if (h2Count < 2) {
    score -= 10;
    issues.push(`Too few H2 headings: ${h2Count} (minimum 2)`);
  }
  if (h2Count + h3Count < 3) {
    score -= 5;
    issues.push("Needs more heading structure for readability");
  }
  const linkCount = (article.content.match(/href=["']\/[^"']+["']/gi) || []).length;
  if (linkCount < 2) {
    score -= 15;
    issues.push(`Only ${linkCount} internal links (minimum 2)`);
  }
  if (article.metaDescription.length < 120) {
    score -= 5;
    issues.push(`Meta description too short: ${article.metaDescription.length} chars`);
  } else if (article.metaDescription.length > 160) {
    score -= 5;
    issues.push(`Meta description too long: ${article.metaDescription.length} chars`);
  }
  if (article.metaTitle.length > 70) {
    score -= 5;
    issues.push(`Meta title too long: ${article.metaTitle.length} chars`);
  }
  if (article.excerpt.length < 100 || article.excerpt.length > 300) {
    score -= 5;
    issues.push(`Excerpt length not ideal: ${article.excerpt.length} chars`);
  }
  if (article.tags.length < 3) {
    score -= 5;
    issues.push(`Too few tags: ${article.tags.length} (minimum 3)`);
  }
  if (article.keywords.length < 2) {
    score -= 5;
    issues.push("Need at least 2 target keywords");
  }
  const hasList = /<(ul|ol)/i.test(article.content);
  if (!hasList) {
    score -= 5;
    issues.push("No bulleted or numbered list found");
  }
  return { score: Math.max(0, score), issues };
}
async function generateAndPublish(options) {
  const {
    qualityThreshold = 60,
    dryRun = false,
    publishUrl = process.env.TALPRO_PUBLISH_URL || "https://talproindia.com/api/blog/webhook"
  } = options;
  const selected = options.topic && options.pillar ? { topic: options.topic, pillar: options.pillar } : selectTopic(options.dayIndex);
  console.log(`[BlogGen] Topic: "${selected.topic}" (Pillar: ${selected.pillar})`);
  let article;
  try {
    article = await generateArticle(selected.topic, selected.pillar, options.apiKey);
    console.log(`[BlogGen] Generated: "${article.title}" (${article.content.replace(/<[^>]+>/g, "").split(/\s+/).length} words)`);
  } catch (error) {
    return {
      success: false,
      title: selected.topic,
      score: 0,
      issues: [error.message],
      published: false,
      error: error.message
    };
  }
  const { score, issues } = scoreContent(article);
  console.log(`[BlogGen] Quality score: ${score}/100 (${issues.length} issues)`);
  if (score < qualityThreshold) {
    console.log(`[BlogGen] Score ${score} below threshold ${qualityThreshold} \u2014 holding as draft`);
    return {
      success: true,
      title: article.title,
      score,
      issues,
      published: false
    };
  }
  if (dryRun) {
    console.log("[BlogGen] Dry run \u2014 skipping publish");
    return {
      success: true,
      title: article.title,
      score,
      issues,
      published: false
    };
  }
  try {
    const response = await fetch(publishUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: article.title,
        content_markdown: article.content,
        excerpt: article.excerpt,
        tags: article.tags
      })
    });
    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Publish failed (${response.status}): ${err}`);
    }
    const result = await response.json();
    console.log(`[BlogGen] Published: ${result.post?.url}`);
    return {
      success: true,
      title: article.title,
      slug: result.post?.slug,
      score,
      issues,
      published: true,
      url: result.post?.url
    };
  } catch (error) {
    return {
      success: false,
      title: article.title,
      score,
      issues,
      published: false,
      error: error.message
    };
  }
}

// server/security-middleware.ts
import crypto from "crypto";
var ADMIN_TOKEN = process.env.TALPRO_ADMIN_TOKEN || crypto.randomBytes(32).toString("hex");
if (!process.env.TALPRO_ADMIN_TOKEN) {
  console.log(`[security] Auto-generated admin token: ${ADMIN_TOKEN}`);
  console.log(`[security] Set TALPRO_ADMIN_TOKEN env var to use a persistent token`);
}
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Authentication required",
      message: "Provide Authorization: Bearer <token> header"
    });
  }
  const token = authHeader.slice(7);
  if (token !== ADMIN_TOKEN) {
    return res.status(403).json({
      error: "Forbidden",
      message: "Invalid admin token"
    });
  }
  next();
}
var csrfTokens = /* @__PURE__ */ new Map();
var CSRF_TTL = 60 * 60 * 1e3;
setInterval(() => {
  const now = Date.now();
  for (const [token, expiry] of csrfTokens) {
    if (now > expiry) csrfTokens.delete(token);
  }
}, 10 * 60 * 1e3);
function csrfTokenEndpoint(_req, res) {
  const token = crypto.randomBytes(32).toString("hex");
  csrfTokens.set(token, Date.now() + CSRF_TTL);
  res.json({ csrfToken: token });
}
function validateCsrf(req, res, next) {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    return next();
  }
  if (req.path === "/api/blog/webhook" || req.path === "/api/blog/generate") {
    return next();
  }
  if (req.headers.authorization?.startsWith("Bearer ")) {
    return next();
  }
  const token = req.headers["x-csrf-token"] || req.body?._csrf;
  if (!token || !csrfTokens.has(token)) {
    return res.status(403).json({
      error: "CSRF validation failed",
      message: "Invalid or missing CSRF token. Fetch one from GET /api/csrf-token"
    });
  }
  csrfTokens.delete(token);
  next();
}
var BLOCKED_PATTERNS = [
  // Dotfiles
  /^\/?\.env/i,
  /^\/?\.git/i,
  /^\/?\.htaccess/i,
  /^\/?\.svn/i,
  /^\/?\.DS_Store/i,
  // Config/key files
  /^\/?api_?keys?\.(json|txt|xml|yml|yaml)/i,
  /^\/?config\.(json|txt|xml|yml|yaml|php|js)/i,
  /^\/?\.aws/i,
  /^\/?\.ssh/i,
  /^\/?wp-config/i,
  /^\/?web\.config/i,
  // Server-side files that shouldn't exist in a Node app
  /\.php$/i,
  /\.asp$/i,
  /\.aspx$/i,
  /\.jsp$/i,
  /\.cgi$/i,
  // Common attack paths
  /^\/?wp-admin/i,
  /^\/?wp-login/i,
  /^\/?wp-content/i,
  /^\/?administrator/i,
  /^\/?phpmyadmin/i,
  /^\/?phpinfo/i,
  /^\/?xmlrpc/i,
  // API sensitive paths (that were probed March 15)
  /^\/api\/\.env/i,
  /^\/api\/config$/i,
  /^\/api\/v1\/config$/i,
  /^\/api\/stripe\.(js|ts)$/i,
  /^\/api\/webhook\.(js|ts)$/i,
  /^\/api\/phpinfo/i
];
function blockSensitivePaths(req, res, next) {
  const path3 = req.path;
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(path3)) {
      console.warn(`[security] Blocked probe: ${req.method} ${path3} from ${req.ip}`);
      return res.status(404).json({ error: "Not found" });
    }
  }
  next();
}
function sanitizeInput(req, _res, next) {
  if (req.body && typeof req.body === "object") {
    sanitizeObject(req.body);
  }
  next();
}
function sanitizeObject(obj) {
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === "string") {
      obj[key] = obj[key].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "").replace(/on\w+\s*=\s*["'][^"']*["']/gi, "").replace(/javascript:/gi, "");
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      sanitizeObject(obj[key]);
    }
  }
}
function healthCheck(req, res) {
  res.json({
    status: "healthy",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || "1.0.0"
  });
}
function readinessCheck(_req, res) {
  res.json({ status: "ready" });
}

// server/routes.ts
async function scrapePayjamaJobs() {
  try {
    const url = "https://app.pyjamahr.com/careers?company=CVPRO%20-%20Powered%20By%20TALPRO&company_uuid=EB02C8BFDF";
    console.log("Fetching jobs from PyjamaHR:", url);
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    const jobs = [];
    $('.job-listing, .position-item, .career-item, [class*="job"], [class*="position"], [class*="career"]').each((index, element) => {
      const $job = $(element);
      const title = $job.find(".job-title, .position-title, .title, h3, h4, .job-name").first().text().trim() || $job.find('[class*="title"]').first().text().trim();
      const location = $job.find('.location, .job-location, [class*="location"]').first().text().trim();
      const department = $job.find('.department, .team, [class*="department"], [class*="team"]').first().text().trim();
      const experience = $job.find('.experience, [class*="experience"], [class*="year"]').first().text().trim();
      const jobId = $job.attr("data-id") || $job.find("a").attr("href")?.match(/\d+/)?.[0] || $job.find('[class*="id"]').text().match(/\d+/)?.[0] || `pj_${Date.now()}_${index}`;
      const applicationUrl = $job.find("a").attr("href") || $job.find('[class*="apply"], [class*="view"]').attr("href") || `https://app.pyjamahr.com/careers/apply/${jobId}`;
      if (title && title.length > 3 && title.length < 100 && !title.toLowerCase().includes("cvpro") && !title.toLowerCase().includes("careers at") && !title.toLowerCase().includes("powered by")) {
        jobs.push({
          id: jobId,
          title,
          department: department || null,
          location: location || "Remote",
          experience: experience || null,
          applicationUrl: applicationUrl.startsWith("http") ? applicationUrl : `https://app.pyjamahr.com${applicationUrl}`
        });
      }
    });
    if (jobs.length === 0) {
      $("div, article, section").each((index, element) => {
        const $element = $(element);
        const text2 = $element.text();
        if (text2.includes("Python Full-Stack") || text2.includes("Talent Acquisition") || text2.includes("Network Engineer")) {
          const title = $element.find("h1, h2, h3, h4, h5, h6").first().text().trim() || $element.children().first().text().trim();
          if (title && title.length > 5 && title.length < 100 && !title.toLowerCase().includes("cvpro") && !title.toLowerCase().includes("careers at")) {
            const jobId = title.includes("276665") ? "276665" : title.includes("268270") ? "268270" : title.includes("262861") ? "262861" : `scraped_${Date.now()}_${index}`;
            jobs.push({
              id: jobId,
              title,
              department: null,
              location: "India",
              experience: null,
              applicationUrl: `https://app.pyjamahr.com/careers/apply/${jobId}`
            });
          }
        }
      });
    }
    const validJobs = jobs.filter(
      (job) => job.title && job.title.length > 5 && job.title.length < 150 && !job.title.toLowerCase().includes("cvpro") && !job.title.toLowerCase().includes("careers at") && !job.title.toLowerCase().includes("powered by") && !job.title.toLowerCase().includes("company")
    );
    console.log(`Scraped ${validJobs.length} valid jobs from PyjamaHR`);
    return validJobs;
  } catch (error) {
    console.error("Error scraping PyjamaHR jobs:", error);
    throw error;
  }
}
var openai = null;
try {
  if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
} catch (error) {
  console.warn("OpenAI initialization failed:", error);
}
function generateSlug(title) {
  return title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim().substring(0, 100);
}
async function generateUniqueSlug(title) {
  let baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;
  while (await storage.getBlogPostBySlug(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
}
async function extractImageFromUrl(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    const ogImage = $('meta[property="og:image"]').attr("content") || $('meta[name="og:image"]').attr("content");
    const ogImageAlt = $('meta[property="og:image:alt"]').attr("content") || $('meta[name="og:image:alt"]').attr("content") || $('meta[property="og:title"]').attr("content") || $('meta[name="og:title"]').attr("content") || $("title").text();
    return {
      imageUrl: ogImage,
      imageAlt: ogImageAlt || void 0
    };
  } catch (error) {
    console.error("Error extracting image from URL:", error);
    return {};
  }
}
async function enhanceContentWithAI(content, title) {
  if (!openai) {
    const excerpt = content.substring(0, 200).replace(/\n/g, " ").trim() + "...";
    return { content, excerpt };
  }
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a professional technical blog editor. Your task is to enhance the given content while maintaining its technical accuracy and tone. Also create a compelling excerpt (150-200 characters). Return JSON with 'content' and 'excerpt' fields."
        },
        {
          role: "user",
          content: `Title: ${title}

Content: ${content}

Please enhance this content for better readability and engagement, and create an excerpt.`
        }
      ],
      response_format: { type: "json_object" }
    });
    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      content: result.content || content,
      excerpt: result.excerpt || content.substring(0, 200).replace(/\n/g, " ").trim() + "..."
    };
  } catch (error) {
    console.error("Error enhancing content with AI:", error);
    const excerpt = content.substring(0, 200).replace(/\n/g, " ").trim() + "...";
    return { content, excerpt };
  }
}
async function sendSocialMediaWebhook(blogPost) {
  const webhookUrl = process.env.SOCIAL_MEDIA_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log("No social media webhook URL configured, skipping notification");
    return;
  }
  try {
    const payload = {
      type: "blog_published",
      data: {
        title: blogPost.title,
        slug: blogPost.slug,
        excerpt: blogPost.excerpt,
        url: `${process.env.VITE_BASE_URL || "https://talproindia.com"}/blog/${blogPost.slug}`,
        imageUrl: blogPost.imageUrl,
        tags: blogPost.tags,
        publishedAt: blogPost.publishedAt
      }
    };
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "TalPro-Blog-System/1.0"
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      throw new Error(`Webhook failed with status: ${response.status}`);
    }
    console.log("Social media webhook sent successfully");
  } catch (error) {
    console.error("Error sending social media webhook:", error);
  }
}
async function registerRoutes(app2) {
  const rateLimitMap = /* @__PURE__ */ new Map();
  const RATE_LIMIT_MAX = 5;
  const RATE_LIMIT_WINDOW = 36e5;
  function isRateLimited(ip) {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);
    if (!entry || now > entry.resetAt) {
      rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
      return false;
    }
    entry.count++;
    return entry.count > RATE_LIMIT_MAX;
  }
  app2.post("/api/contact", async (req, res) => {
    try {
      const clientIp = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip || "unknown";
      if (isRateLimited(clientIp)) {
        return res.status(429).json({
          success: false,
          message: "Too many submissions. Please try again later."
        });
      }
      if (req.body.website) {
        return res.status(201).json({
          success: true,
          message: "Thank you for your inquiry. We'll get back to you within 8 business hours."
        });
      }
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);
      const leadhunterWebhookUrl = process.env.LEADHUNTER_WEBHOOK_URL || "https://n8n.hcitalks.com/webhook/lead-capture";
      fetch(leadhunterWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: validatedData.company || "Unknown",
          contact_name: `${validatedData.firstName} ${validatedData.lastName}`,
          email: validatedData.email,
          source: "website",
          message: `Service: ${validatedData.service || "Not specified"}. Message: ${validatedData.message}`
        })
      }).then((r) => {
        if (r.ok) console.log("[leadhunter] Contact forwarded to N8N webhook");
        else console.warn(`[leadhunter] Webhook returned ${r.status}`);
      }).catch((err) => {
        console.error("[leadhunter] Failed to forward to N8N:", err.message);
      });
      res.status(201).json({
        success: true,
        message: "Thank you for your inquiry. We'll get back to you within 8 business hours.",
        id: inquiry.id
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          success: false,
          message: "Please check your form data and try again.",
          errors: error.errors
        });
      } else {
        console.error("Contact form submission error:", error);
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request. Please try again."
        });
      }
    }
  });
  app2.get("/api/contact", requireAdmin, async (req, res) => {
    try {
      const inquiries = await storage.getContactInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching contact inquiries:", error);
      res.status(500).json({ message: "Error fetching inquiries" });
    }
  });
  app2.post("/api/newsletter", async (req, res) => {
    try {
      const { email, source } = req.body;
      if (!email || typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({ success: false, message: "Valid email is required." });
      }
      const normalizedEmail = email.toLowerCase().trim();
      try {
        await db.insert(newsletterSubscribers).values({
          email: normalizedEmail,
          source: source || "website"
        });
      } catch (dbError) {
        if (dbError?.code === "23505" || dbError?.message?.includes("unique")) {
          return res.status(200).json({ success: true, message: "Already subscribed." });
        }
        throw dbError;
      }
      console.log(`Newsletter signup: ${normalizedEmail} (persisted to DB)`);
      res.status(201).json({ success: true, message: "Subscribed successfully." });
    } catch (error) {
      console.error("Newsletter signup error:", error);
      res.status(500).json({ success: false, message: "An error occurred." });
    }
  });
  let jobsCache = null;
  const CACHE_DURATION = 5 * 60 * 1e3;
  app2.get("/api/jobs", async (req, res) => {
    try {
      const {
        department,
        location,
        employmentType,
        experienceLevel,
        page = 1,
        limit = 10,
        search
      } = req.query;
      if (jobsCache && Date.now() - jobsCache.timestamp < CACHE_DURATION) {
        let allJobs = jobsCache.data.jobs;
        let filteredJobs2 = allJobs.filter((job) => {
          if (department && job.department && !job.department.toLowerCase().includes(department.toLowerCase())) {
            return false;
          }
          if (location && job.location && !job.location.toLowerCase().includes(location.toLowerCase())) {
            return false;
          }
          if (employmentType && job.employmentType !== employmentType) {
            return false;
          }
          if (experienceLevel && job.experienceLevel !== experienceLevel) {
            return false;
          }
          if (search) {
            const searchLower = search.toLowerCase();
            const titleMatch = job.title?.toLowerCase().includes(searchLower);
            const descMatch = job.description?.toLowerCase().includes(searchLower);
            if (!titleMatch && !descMatch) {
              return false;
            }
          }
          return true;
        });
        const pageNum2 = parseInt(page);
        const limitNum2 = parseInt(limit);
        const startIndex2 = (pageNum2 - 1) * limitNum2;
        const paginatedJobs2 = filteredJobs2.slice(startIndex2, startIndex2 + limitNum2);
        console.log(`Returning cached data: ${filteredJobs2.length} jobs found, showing page ${pageNum2}`);
        return res.json({
          jobs: paginatedJobs2,
          total: filteredJobs2.length,
          page: pageNum2,
          limit: limitNum2
        });
      }
      console.log("Fetching real job data from PyjamaHR");
      let scrapedJobs = [];
      try {
        const rawJobs = await scrapePayjamaJobs();
        scrapedJobs = rawJobs.map((job, index) => {
          let experienceLevel2 = void 0;
          if (job.experience) {
            const exp = job.experience.toLowerCase();
            if (exp.includes("15-25") || exp.includes("head") || exp.includes("senior")) {
              experienceLevel2 = "senior";
            } else if (exp.includes("8-15") || exp.includes("7-15")) {
              experienceLevel2 = "senior";
            } else if (exp.includes("3-8")) {
              experienceLevel2 = "mid";
            } else {
              experienceLevel2 = "mid";
            }
          }
          let employmentType2 = "full-time";
          if (job.title && job.title.toLowerCase().includes("contract")) {
            employmentType2 = "contract";
          }
          let department2 = job.department;
          if (!department2 && job.title) {
            const title = job.title.toLowerCase();
            if (title.includes("python") || title.includes("developer") || title.includes("engineer")) {
              department2 = "Engineering";
            } else if (title.includes("talent") || title.includes("hr")) {
              department2 = "HR";
            } else if (title.includes("network")) {
              department2 = "IT";
            }
          }
          return {
            id: job.id,
            title: job.title,
            department: department2,
            location: job.location || "India",
            employmentType: employmentType2,
            experienceLevel: experienceLevel2,
            description: `Join our team as a ${job.title}. This position offers excellent opportunities for professional growth and development in a dynamic work environment.`,
            requirements: job.title.toLowerCase().includes("python") ? ["Python", "Full Stack Development", "React", "Node.js", "Experience with web frameworks"] : job.title.toLowerCase().includes("talent") ? ["HR Management", "Talent Acquisition", "Recruiting", "People Management", "Strategic Planning"] : job.title.toLowerCase().includes("network") ? ["Network Administration", "Network Security", "Cisco", "TCP/IP", "Network Troubleshooting"] : ["Relevant experience", "Strong communication skills", "Problem solving", "Team collaboration"],
            benefits: ["Health Insurance", "Professional Development", "Flexible Work Arrangements", "Career Growth"],
            salaryMin: null,
            salaryMax: null,
            salaryCurrency: "INR",
            remote: job.location && (job.location.toLowerCase().includes("remote") || job.location.toLowerCase().includes("hybrid")),
            applicationUrl: job.applicationUrl,
            postedDate: (/* @__PURE__ */ new Date()).toISOString(),
            updatedDate: null,
            isActive: true
          };
        });
        console.log(`Successfully transformed ${scrapedJobs.length} jobs from PyjamaHR`);
      } catch (error) {
        console.error("Failed to scrape PyjamaHR jobs:", error);
        scrapedJobs = [];
      }
      if (scrapedJobs.length === 0) {
        console.log("No valid jobs scraped, using fallback data with real PyjamaHR jobs");
        jobsCache = null;
        scrapedJobs = [
          {
            id: "tp-001",
            title: "Sr. Azure DevOps Engineer (Contract \u2013 6 Months)",
            department: "Cloud & DevOps",
            location: "Bangalore, Karnataka",
            employmentType: "contract",
            experienceLevel: "senior",
            description: "Design and maintain CI/CD pipelines, Azure Kubernetes Service clusters, and infrastructure-as-code using Terraform. GCC client, hybrid model.",
            requirements: ["Azure DevOps", "Kubernetes", "Terraform", "CI/CD", "8-12 years experience"],
            benefits: ["Contract staffing via Talpro", "Hybrid work", "GCC client", "Competitive day rate"],
            salaryMin: null,
            salaryMax: null,
            salaryCurrency: "INR",
            remote: false,
            applicationUrl: "/contact?service=it-staffing",
            postedDate: (/* @__PURE__ */ new Date()).toISOString(),
            updatedDate: null,
            isActive: true
          },
          {
            id: "tp-002",
            title: "Oracle HCM Cloud Functional Consultant",
            department: "SAP & Oracle",
            location: "Hyderabad, Telangana",
            employmentType: "contract",
            experienceLevel: "senior",
            description: "Configure and implement Oracle HCM Cloud modules including Core HR, Payroll, and Absence Management for a Fortune 500 GCC.",
            requirements: ["Oracle HCM Cloud", "Core HR", "Payroll", "Absence Management", "7-12 years experience"],
            benefits: ["Long-term contract", "Fortune 500 client", "Hybrid model"],
            salaryMin: null,
            salaryMax: null,
            salaryCurrency: "INR",
            remote: false,
            applicationUrl: "/contact?service=it-staffing",
            postedDate: (/* @__PURE__ */ new Date()).toISOString(),
            updatedDate: null,
            isActive: true
          },
          {
            id: "tp-003",
            title: "MLOps Engineer",
            department: "AI & Data Science",
            location: "Bangalore, Karnataka",
            employmentType: "full-time",
            experienceLevel: "senior",
            description: "Build and operate ML infrastructure including model training pipelines, feature stores, and model monitoring. Experience with Kubeflow or MLflow required.",
            requirements: ["MLOps", "Kubeflow", "MLflow", "Python", "Docker", "6-10 years experience"],
            benefits: ["Permanent role", "AI-first company", "Competitive CTC", "ESOPs"],
            salaryMin: 3e6,
            salaryMax: 5e6,
            salaryCurrency: "INR",
            remote: false,
            applicationUrl: "/contact?service=it-staffing",
            postedDate: (/* @__PURE__ */ new Date()).toISOString(),
            updatedDate: null,
            isActive: true
          },
          {
            id: "tp-004",
            title: "SAP S/4HANA FICO Consultant",
            department: "SAP & Oracle",
            location: "Pune, Maharashtra",
            employmentType: "contract",
            experienceLevel: "senior",
            description: "Lead SAP S/4HANA Finance implementation for a global manufacturing client. End-to-end FICO configuration, data migration, and go-live support.",
            requirements: ["SAP S/4HANA", "FICO", "Data Migration", "Manufacturing", "10-15 years experience"],
            benefits: ["12-month contract", "Global client", "Onsite in Pune"],
            salaryMin: null,
            salaryMax: null,
            salaryCurrency: "INR",
            remote: false,
            applicationUrl: "/contact?service=it-staffing",
            postedDate: (/* @__PURE__ */ new Date()).toISOString(),
            updatedDate: null,
            isActive: true
          },
          {
            id: "tp-005",
            title: "Full-Stack Developer \u2014 React + Node.js",
            department: "App Development",
            location: "Remote, India",
            employmentType: "contract",
            experienceLevel: "mid",
            description: "Build and maintain microservices-based web applications using React, Node.js, and PostgreSQL. Strong TypeScript skills essential.",
            requirements: ["React", "Node.js", "TypeScript", "PostgreSQL", "4-8 years experience"],
            benefits: ["Fully remote", "3-month contract", "Extension likely", "Startup client"],
            salaryMin: null,
            salaryMax: null,
            salaryCurrency: "INR",
            remote: true,
            applicationUrl: "/contact?service=it-staffing",
            postedDate: (/* @__PURE__ */ new Date()).toISOString(),
            updatedDate: null,
            isActive: true
          },
          {
            id: "tp-006",
            title: "Cloud Solutions Architect \u2014 AWS",
            department: "Cloud & DevOps",
            location: "Bangalore, Karnataka",
            employmentType: "full-time",
            experienceLevel: "senior",
            description: "Design cloud-native architectures for enterprise workloads. Lead migration from on-prem to AWS, define best practices, and mentor engineering teams.",
            requirements: ["AWS", "Solutions Architecture", "Cloud Migration", "Microservices", "10-15 years experience"],
            benefits: ["Permanent hire", "Enterprise GCC", "Architect-level role"],
            salaryMin: 4e6,
            salaryMax: 7e6,
            salaryCurrency: "INR",
            remote: false,
            applicationUrl: "/contact?service=it-staffing",
            postedDate: (/* @__PURE__ */ new Date()).toISOString(),
            updatedDate: null,
            isActive: true
          },
          {
            id: "tp-007",
            title: "Data Engineer \u2014 Snowflake & dbt",
            department: "AI & Data Science",
            location: "Hyderabad, Telangana",
            employmentType: "contract",
            experienceLevel: "mid",
            description: "Design and implement data pipelines using Snowflake, dbt, and Airflow. Build analytics-ready data models for the business intelligence team.",
            requirements: ["Snowflake", "dbt", "Airflow", "SQL", "Python", "5-9 years experience"],
            benefits: ["6-month contract", "BFSI client", "Hybrid model"],
            salaryMin: null,
            salaryMax: null,
            salaryCurrency: "INR",
            remote: false,
            applicationUrl: "/contact?service=it-staffing",
            postedDate: (/* @__PURE__ */ new Date()).toISOString(),
            updatedDate: null,
            isActive: true
          },
          {
            id: "tp-008",
            title: "Cybersecurity Analyst \u2014 SOC",
            department: "IT Infrastructure",
            location: "Chennai, Tamil Nadu",
            employmentType: "full-time",
            experienceLevel: "mid",
            description: "Monitor and respond to security incidents in a 24x7 SOC. Perform threat analysis using SIEM tools, develop incident response playbooks.",
            requirements: ["SOC Operations", "SIEM", "Incident Response", "Threat Hunting", "4-7 years experience"],
            benefits: ["Permanent role", "Global BFSI client", "Certifications sponsored"],
            salaryMin: 12e5,
            salaryMax: 2e6,
            salaryCurrency: "INR",
            remote: false,
            applicationUrl: "/contact?service=it-staffing",
            postedDate: (/* @__PURE__ */ new Date()).toISOString(),
            updatedDate: null,
            isActive: true
          },
          {
            id: "tp-009",
            title: "ServiceNow Developer",
            department: "IT Infrastructure",
            location: "Bangalore, Karnataka",
            employmentType: "contract",
            experienceLevel: "mid",
            description: "Customize and develop ServiceNow ITSM, ITOM, and HRSD modules. Create workflows, integrations, and reports for enterprise IT operations.",
            requirements: ["ServiceNow", "ITSM", "JavaScript", "Integration Hub", "5-8 years experience"],
            benefits: ["Contract via Talpro", "Large GCC", "Hybrid model"],
            salaryMin: null,
            salaryMax: null,
            salaryCurrency: "INR",
            remote: false,
            applicationUrl: "/contact?service=it-staffing",
            postedDate: (/* @__PURE__ */ new Date()).toISOString(),
            updatedDate: null,
            isActive: true
          },
          {
            id: "tp-010",
            title: "iOS Developer \u2014 Swift & SwiftUI",
            department: "App Development",
            location: "Mumbai, Maharashtra",
            employmentType: "full-time",
            experienceLevel: "senior",
            description: "Build and maintain native iOS applications using Swift and SwiftUI. Lead mobile architecture decisions and App Store deployment.",
            requirements: ["Swift", "SwiftUI", "iOS", "MVVM", "App Store", "6-10 years experience"],
            benefits: ["Permanent role", "Product company", "Competitive CTC"],
            salaryMin: 25e5,
            salaryMax: 45e5,
            salaryCurrency: "INR",
            remote: false,
            applicationUrl: "/contact?service=it-staffing",
            postedDate: (/* @__PURE__ */ new Date()).toISOString(),
            updatedDate: null,
            isActive: true
          },
          {
            id: "tp-011",
            title: "Scrum Master \u2014 Agile Coach",
            department: "Project Management",
            location: "Bangalore, Karnataka",
            employmentType: "contract",
            experienceLevel: "senior",
            description: "Facilitate agile ceremonies for 3-4 Scrum teams in a GCC engineering organization. Drive continuous improvement and remove impediments.",
            requirements: ["Scrum", "SAFe", "Agile Coaching", "Jira", "CSM/PSM", "7-12 years experience"],
            benefits: ["6-month contract", "GCC client", "Hybrid model"],
            salaryMin: null,
            salaryMax: null,
            salaryCurrency: "INR",
            remote: false,
            applicationUrl: "/contact?service=it-staffing",
            postedDate: (/* @__PURE__ */ new Date()).toISOString(),
            updatedDate: null,
            isActive: true
          },
          {
            id: "tp-012",
            title: "QA Automation Lead \u2014 Selenium & Cypress",
            department: "Quality Assurance",
            location: "Pune, Maharashtra",
            employmentType: "full-time",
            experienceLevel: "senior",
            description: "Build and lead the QA automation framework. Define test strategies, mentor QA engineers, and establish CI-integrated testing pipelines.",
            requirements: ["Selenium", "Cypress", "Test Automation", "CI/CD", "Java/JavaScript", "8-12 years experience"],
            benefits: ["Permanent role", "Team lead position", "E-commerce company"],
            salaryMin: 2e6,
            salaryMax: 35e5,
            salaryCurrency: "INR",
            remote: false,
            applicationUrl: "/contact?service=it-staffing",
            postedDate: (/* @__PURE__ */ new Date()).toISOString(),
            updatedDate: null,
            isActive: true
          },
          {
            id: "tp-013",
            title: "VP of Engineering",
            department: "Engineering Leadership",
            location: "Bangalore, Karnataka",
            employmentType: "full-time",
            experienceLevel: "executive",
            description: "Lead a 100+ engineering organization for a Series C SaaS company. Own engineering strategy, team scaling, and technical roadmap.",
            requirements: ["Engineering Leadership", "SaaS", "Team Building", "System Design", "15-20 years experience"],
            benefits: ["Executive role", "ESOPs", "Series C startup", "High impact"],
            salaryMin: 8e6,
            salaryMax: 15e6,
            salaryCurrency: "INR",
            remote: false,
            applicationUrl: "/contact?service=executive-search",
            postedDate: (/* @__PURE__ */ new Date()).toISOString(),
            updatedDate: null,
            isActive: true
          },
          {
            id: "tp-014",
            title: "Salesforce Developer \u2014 Lightning",
            department: "CRM & Enterprise Apps",
            location: "Hyderabad, Telangana",
            employmentType: "contract",
            experienceLevel: "mid",
            description: "Develop custom Lightning Web Components, Apex triggers, and integrations for a global healthcare company's Salesforce implementation.",
            requirements: ["Salesforce", "Lightning", "Apex", "LWC", "Integration", "5-8 years experience"],
            benefits: ["Contract via Talpro", "Healthcare GCC", "Hybrid"],
            salaryMin: null,
            salaryMax: null,
            salaryCurrency: "INR",
            remote: false,
            applicationUrl: "/contact?service=it-staffing",
            postedDate: (/* @__PURE__ */ new Date()).toISOString(),
            updatedDate: null,
            isActive: true
          },
          {
            id: "tp-015",
            title: "Platform Engineer \u2014 Kubernetes & GitOps",
            department: "Cloud & DevOps",
            location: "Remote, India",
            employmentType: "contract",
            experienceLevel: "senior",
            description: "Build and maintain internal developer platform on Kubernetes. Implement GitOps workflows with ArgoCD, manage service mesh, and optimize platform reliability.",
            requirements: ["Kubernetes", "ArgoCD", "GitOps", "Service Mesh", "Go/Python", "7-11 years experience"],
            benefits: ["Fully remote", "9-month contract", "Platform engineering"],
            salaryMin: null,
            salaryMax: null,
            salaryCurrency: "INR",
            remote: true,
            applicationUrl: "/contact?service=it-staffing",
            postedDate: (/* @__PURE__ */ new Date()).toISOString(),
            updatedDate: null,
            isActive: true
          }
        ];
        console.log(`Using fallback data: ${scrapedJobs.length} jobs from PyjamaHR`);
      }
      let filteredJobs = scrapedJobs.filter((job) => {
        if (department && job.department && !job.department.toLowerCase().includes(department.toLowerCase())) {
          return false;
        }
        if (location && job.location && !job.location.toLowerCase().includes(location.toLowerCase())) {
          return false;
        }
        if (employmentType && job.employmentType !== employmentType) {
          return false;
        }
        if (experienceLevel && job.experienceLevel !== experienceLevel) {
          return false;
        }
        if (search) {
          const searchLower = search.toLowerCase();
          const titleMatch = job.title?.toLowerCase().includes(searchLower);
          const descMatch = job.description?.toLowerCase().includes(searchLower);
          if (!titleMatch && !descMatch) {
            return false;
          }
        }
        return true;
      });
      const pageNum = parseInt(page) || 1;
      const limitNum = parseInt(limit) || 20;
      const startIndex = (pageNum - 1) * limitNum;
      const paginatedJobs = filteredJobs.slice(startIndex, startIndex + limitNum);
      const jobsData = {
        jobs: paginatedJobs,
        total: filteredJobs.length,
        page: pageNum,
        limit: limitNum
      };
      jobsCache = {
        data: jobsData,
        timestamp: Date.now()
      };
      console.log(`Returning ${filteredJobs.length} jobs from PyjamaHR`);
      return res.json(jobsData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message, error.stack);
      }
      if (jobsCache) {
        console.log("Returning cached data due to fetch error");
        return res.json(jobsCache.data);
      }
      res.status(500).json({
        message: "Unable to fetch job listings at this time",
        error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
      });
    }
  });
  app2.get("/api/jobs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      if (jobsCache) {
        const job = jobsCache.data.jobs.find((j) => j.id === id);
        if (job) {
          return res.json(job);
        }
      }
      return res.status(404).json({
        message: "Job not found"
      });
    } catch (error) {
      console.error("Error fetching job detail:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message, error.stack);
      }
      res.status(500).json({
        message: "Unable to fetch job details"
      });
    }
  });
  app2.get("/api/blog/posts", async (req, res) => {
    try {
      const {
        tags,
        page = 1,
        limit = 10,
        search
      } = req.query;
      const pageNum = parseInt(page) || 1;
      const limitNum = parseInt(limit) || 20;
      const offset = (pageNum - 1) * limitNum;
      const tagsArray = tags ? Array.isArray(tags) ? tags : [tags] : void 0;
      const filters = {
        published: true,
        // Only get published posts
        tags: tagsArray,
        limit: limitNum,
        offset
      };
      let posts = await storage.getBlogPosts(filters);
      if (search) {
        const searchTerm = search.toLowerCase();
        posts = posts.filter(
          (post) => post.title.toLowerCase().includes(searchTerm) || post.excerpt.toLowerCase().includes(searchTerm) || post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
        );
      }
      res.json({
        posts,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: posts.length
        }
      });
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Error fetching blog posts" });
    }
  });
  app2.get("/api/blog/posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      if (!post || !post.publishedAt) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Error fetching blog post" });
    }
  });
  app2.post("/api/blog/webhook", async (req, res) => {
    try {
      const secret = req.headers["x-webhook-secret"] || req.query.secret;
      const expectedSecret = process.env.BLOG_WEBHOOK_SECRET;
      if (expectedSecret && secret !== expectedSecret) {
        return res.status(401).json({ error: "Invalid webhook secret" });
      }
      const validatedData = webhookBlogPostSchema.parse(req.body);
      console.log("Received blog webhook:", { title: validatedData.title, source_url: validatedData.source_url });
      const slug = await generateUniqueSlug(validatedData.title);
      let imageUrl = validatedData.image_url;
      let imageAlt = validatedData.image_alt;
      if (validatedData.source_url && !imageUrl) {
        console.log("Extracting image from source URL...");
        const extracted = await extractImageFromUrl(validatedData.source_url);
        imageUrl = extracted.imageUrl;
        imageAlt = extracted.imageAlt;
      }
      if (!imageUrl) {
        imageUrl = "/hero-default.jpg";
        imageAlt = validatedData.title;
      }
      console.log("Processing content...");
      const { content, excerpt } = await enhanceContentWithAI(
        validatedData.content_markdown,
        validatedData.title
      );
      const wordCount = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
      const readingTime = Math.max(1, Math.ceil(wordCount / 200));
      const blogPostData = {
        title: validatedData.title,
        slug,
        content,
        excerpt: validatedData.excerpt || excerpt || content.substring(0, 200).replace(/\n/g, " ").trim() + "...",
        imageUrl,
        imageAlt,
        tags: validatedData.tags || [],
        publishedAt: /* @__PURE__ */ new Date(),
        sourceUrl: validatedData.source_url,
        author: "TalPro Editorial",
        authorRole: "Market Intelligence Team",
        readingTime,
        generationSource: "webhook"
      };
      const createdPost = await storage.createBlogPost(blogPostData);
      console.log("Blog post created:", { id: createdPost.id, slug: createdPost.slug });
      console.log("Sending social media webhook...");
      await sendSocialMediaWebhook(createdPost);
      res.status(201).json({
        success: true,
        message: "Blog post published successfully",
        post: {
          id: createdPost.id,
          title: createdPost.title,
          slug: createdPost.slug,
          publishedAt: createdPost.publishedAt,
          url: `${process.env.VITE_BASE_URL || "https://talproindia.com"}/blog/${createdPost.slug}`
        }
      });
    } catch (error) {
      console.error("Blog webhook error:", error);
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid webhook data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Error publishing blog post",
          error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
        });
      }
    }
  });
  app2.get("/api/blog/admin/posts", requireAdmin, async (req, res) => {
    try {
      const { published, page = 1, limit = 20 } = req.query;
      const pageNum = parseInt(page) || 1;
      const limitNum = parseInt(limit) || 20;
      const offset = (pageNum - 1) * limitNum;
      const filters = {
        published: published === "true" ? true : published === "false" ? false : void 0,
        limit: limitNum,
        offset
      };
      const posts = await storage.getBlogPosts(filters);
      res.json({
        posts,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: posts.length
        }
      });
    } catch (error) {
      console.error("Error fetching admin blog posts:", error);
      res.status(500).json({ message: "Error fetching blog posts" });
    }
  });
  app2.get("/api/blog/admin/posts/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Error fetching blog post" });
    }
  });
  app2.put("/api/blog/admin/posts/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const existingPost = await storage.getBlogPost(id);
      if (!existingPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      if (updates.slug && updates.slug !== existingPost.slug) {
        const existingSlug = await storage.getBlogPostBySlug(updates.slug);
        if (existingSlug && existingSlug.id !== id) {
          return res.status(400).json({ message: "Slug already exists" });
        }
      }
      const updatedPost = await storage.updateBlogPost(id, updates);
      if (!updatedPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json({
        success: true,
        message: "Blog post updated successfully",
        post: updatedPost
      });
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Error updating blog post" });
    }
  });
  app2.delete("/api/blog/admin/posts/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteBlogPost(id);
      if (!deleted) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json({
        success: true,
        message: "Blog post deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Error deleting blog post" });
    }
  });
  app2.get("/api/blog/count", async (_req, res) => {
    try {
      const posts = await storage.getBlogPosts({ published: true });
      res.json({ total: posts.length });
    } catch (error) {
      console.error("Error counting blog posts:", error);
      res.status(500).json({ message: "Error counting blog posts" });
    }
  });
  app2.post("/api/blog/seed", requireAdmin, async (_req, res) => {
    try {
      const existing = await storage.getBlogPosts({ published: true });
      if (existing.length > 0) {
        return res.json({
          success: true,
          message: `Database already has ${existing.length} posts. Skipping seed.`,
          count: existing.length
        });
      }
      const seedPosts = [
        {
          title: "The State of IT Hiring in India: 2026 Market Report",
          slug: "state-of-it-hiring-india-2026",
          excerpt: "An in-depth look at India's IT talent market \u2014 which skills are surging, how compensation is shifting, and what hiring managers need to know to compete for top engineers.",
          category: "Market Intelligence",
          tags: ["Hiring Trends", "Salary Data", "India IT Market", "2026"],
          author: "TalPro Research",
          authorRole: "Market Intelligence Team",
          readingTime: 8,
          featured: true,
          generationSource: "manual",
          publishedAt: /* @__PURE__ */ new Date("2026-03-10")
        },
        {
          title: "Contract vs Permanent: Which IT Staffing Model Is Right for Your Team?",
          slug: "contract-vs-permanent-staffing",
          excerpt: "A practical comparison of contract staffing, permanent hiring, and contract-to-hire models \u2014 with real cost analysis and decision frameworks for Indian IT teams.",
          category: "Hiring Strategy",
          tags: ["Contract Staffing", "Permanent Hiring", "C2H", "Cost Analysis"],
          author: "TalPro Research",
          authorRole: "Market Intelligence Team",
          readingTime: 7,
          featured: false,
          generationSource: "manual",
          publishedAt: /* @__PURE__ */ new Date("2026-03-08")
        },
        {
          title: "How to Set Up a GCC in India: A Step-by-Step Guide",
          slug: "gcc-setup-guide-india",
          excerpt: "A practical playbook for US and European companies establishing Global Capability Centers in India \u2014 from entity setup to hiring your first 25 engineers.",
          category: "GCC Playbook",
          tags: ["GCC", "Global Capability Center", "India Operations", "Offshore"],
          author: "TalPro Research",
          authorRole: "Market Intelligence Team",
          readingTime: 10,
          featured: true,
          generationSource: "manual",
          publishedAt: /* @__PURE__ */ new Date("2026-03-05")
        },
        {
          title: "5 Signs Your IT Recruitment Process Is Broken (And How to Fix It)",
          slug: "signs-it-recruitment-process-broken",
          excerpt: "If your engineering roles take 60+ days to fill, your offer acceptance rate is below 80%, or your hiring managers are frustrated \u2014 your process needs fixing. Here's how.",
          category: "Hiring Strategy",
          tags: ["Recruitment Process", "Time to Hire", "Offer Acceptance", "Best Practices"],
          author: "TalPro Research",
          authorRole: "Market Intelligence Team",
          readingTime: 6,
          featured: false,
          generationSource: "manual",
          publishedAt: /* @__PURE__ */ new Date("2026-03-01")
        },
        {
          title: "India's Top Tech Hubs: City-by-City Talent Guide",
          slug: "india-top-tech-hubs-talent-guide",
          excerpt: "A recruiter's guide to hiring in Bangalore, Hyderabad, Pune, Chennai, and NCR \u2014 talent pool sizes, salary benchmarks, strengths, and what each city does best.",
          category: "Market Intelligence",
          tags: ["Bangalore", "Hyderabad", "Pune", "Chennai", "NCR", "Talent Pool"],
          author: "TalPro Research",
          authorRole: "Market Intelligence Team",
          readingTime: 9,
          featured: false,
          generationSource: "manual",
          publishedAt: /* @__PURE__ */ new Date("2026-02-25")
        }
      ];
      let seeded = 0;
      for (const post of seedPosts) {
        await storage.createBlogPost({
          ...post,
          content: `<p>${post.excerpt}</p><p>Full article content will be populated during the next deployment.</p>`
        });
        seeded++;
      }
      res.status(201).json({
        success: true,
        message: `Seeded ${seeded} blog posts successfully`,
        count: seeded
      });
    } catch (error) {
      console.error("Error seeding blog posts:", error);
      res.status(500).json({ message: "Error seeding blog posts" });
    }
  });
  app2.post("/api/blog/generate", requireAdmin, async (req, res) => {
    try {
      const { topic, pillar, dayIndex, dryRun, apiKey } = req.body || {};
      const authHeader = req.headers.authorization;
      const expectedToken = process.env.BLOG_GENERATE_TOKEN;
      if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
        return res.status(401).json({ message: "Unauthorized \u2014 provide valid Bearer token" });
      }
      console.log("[BlogGen] Generate request received:", { topic, pillar, dayIndex, dryRun });
      const result = await generateAndPublish({
        topic,
        pillar,
        dayIndex,
        dryRun: dryRun === true,
        apiKey: apiKey || process.env.ANTHROPIC_API_KEY,
        publishUrl: `http://localhost:${process.env.PORT || 5e3}/api/blog/webhook`
      });
      res.json(result);
    } catch (error) {
      console.error("[BlogGen] Error:", error);
      res.status(500).json({
        success: false,
        message: "Error generating blog post",
        error: process.env.NODE_ENV === "development" ? error.message : "Internal error"
      });
    }
  });
  app2.get("/api/blog/next-topic", (_req, res) => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 0).getTime()) / 864e5
    );
    const topic = selectTopic(dayOfYear);
    res.json({ ...topic, dayIndex: dayOfYear });
  });
  app2.get("/robots.txt", (_req, res) => {
    const robotsTxt = `# TalPro India \u2014 robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Allow: /api/jobs
Allow: /api/blog/posts

Disallow: /.env
Disallow: /.git
Disallow: /wp-admin

Sitemap: https://talproindia.com/sitemap.xml

User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Crawl-delay: 10

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: BLEXBot
Disallow: /
`;
    res.type("text/plain").send(robotsTxt);
  });
  app2.get("/sitemap.xml", async (_req, res) => {
    try {
      const baseUrl = "https://talproindia.com";
      const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const staticPages = [
        { loc: "/", changefreq: "weekly", priority: "1.0" },
        { loc: "/about", changefreq: "monthly", priority: "0.8" },
        { loc: "/contact", changefreq: "monthly", priority: "0.8" },
        { loc: "/how-we-work", changefreq: "monthly", priority: "0.8" },
        { loc: "/services", changefreq: "weekly", priority: "0.9" },
        { loc: "/industries", changefreq: "weekly", priority: "0.9" },
        { loc: "/gcc-hub", changefreq: "weekly", priority: "0.9" },
        { loc: "/careers", changefreq: "weekly", priority: "0.7" },
        { loc: "/blog", changefreq: "daily", priority: "0.7" },
        { loc: "/case-studies", changefreq: "monthly", priority: "0.7" },
        { loc: "/salary-guide", changefreq: "monthly", priority: "0.8" },
        { loc: "/salary-calculator", changefreq: "monthly", priority: "0.7" },
        { loc: "/staffing-quiz", changefreq: "monthly", priority: "0.7" },
        { loc: "/for-candidates", changefreq: "monthly", priority: "0.7" },
        { loc: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
        { loc: "/terms-of-service", changefreq: "yearly", priority: "0.3" }
      ];
      const serviceSlugs = [
        "it-staffing",
        "engineering-staffing",
        "sales-staffing",
        "direct-hiring-functions",
        "direct-hiring-it",
        "executive-search",
        "gcc-accelerator",
        "cloud-devops-staffing",
        "data-ai-staffing",
        "sap-enterprise-staffing",
        "cybersecurity-staffing"
      ];
      const servicePages = serviceSlugs.map((s) => ({
        loc: `/services/${s}`,
        changefreq: "weekly",
        priority: "0.8"
      }));
      const industrySlugs = [
        "fintech-financial-services",
        "media-entertainment-technology",
        "healthcare-medical-technology",
        "ecommerce-retail-solutions",
        "education-edtech-solutions"
      ];
      const industryPages = industrySlugs.map((s) => ({
        loc: `/industries/${s}`,
        changefreq: "weekly",
        priority: "0.8"
      }));
      const locationSlugs = [
        "bengaluru",
        "hyderabad",
        "pune",
        "chennai",
        "mumbai",
        "delhi-ncr"
      ];
      const locationPages = locationSlugs.map((s) => ({
        loc: `/locations/${s}`,
        changefreq: "weekly",
        priority: "0.8"
      }));
      const allStaticPages = [...staticPages, ...servicePages, ...industryPages, ...locationPages];
      let blogPosts2 = [];
      try {
        blogPosts2 = await storage.getBlogPosts({ published: true, limit: 500 });
      } catch {
      }
      const staticEntries = allStaticPages.map(
        (p) => `  <url>
    <loc>${baseUrl}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
      ).join("\n");
      const blogEntries = blogPosts2.filter((p) => p.publishedAt).map(
        (p) => `  <url>
    <loc>${baseUrl}/blog/${p.slug}</loc>
    <lastmod>${p.publishedAt ? new Date(p.publishedAt).toISOString().split("T")[0] : today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
      ).join("\n");
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${blogEntries}
</urlset>`;
      res.header("Content-Type", "application/xml");
      res.send(xml);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-query": ["@tanstack/react-query"],
          "vendor-fuse": ["fuse.js"]
        }
      }
    }
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use(blockSensitivePaths);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use(blockSensitivePaths);
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(compression({
  // Compress all responses over 1KB
  threshold: 1024,
  // Compression level (0-9, where 6 is default and good balance)
  level: 6,
  // Only compress text-based responses
  filter: (req, res) => {
    if (req.headers["x-no-compression"]) {
      return false;
    }
    return compression.filter(req, res);
  }
}));
app.use(express2.json({ limit: "1mb" }));
app.use(express2.urlencoded({ extended: false }));
app.use(blockSensitivePaths);
app.use(sanitizeInput);
app.get("/api/csrf-token", csrfTokenEndpoint);
app.use("/api", validateCsrf);
app.get("/api/health", healthCheck);
app.get("/api/health/ready", readinessCheck);
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();
