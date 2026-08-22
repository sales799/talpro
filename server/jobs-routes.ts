import type { Express, NextFunction, Request, Response } from "express";
import { and, desc, eq, gt, ilike, or, sql } from "drizzle-orm";
import { z } from "zod";
import { jobs, type DbJob } from "@shared/schema";
import { db } from "./db";
import { requireAdmin } from "./security-middleware";

const httpsUrl = z.string().url().refine(
  (value) => value.startsWith("https://"),
  "URL must use HTTPS",
);

const jobWriteSchema = z.object({
  title: z.string().trim().min(3).max(200),
  department: z.string().trim().min(2).max(100).optional(),
  location: z.string().trim().min(2).max(200),
  employmentType: z.enum(["full-time", "part-time", "contract", "internship"]),
  experienceLevel: z.enum(["entry", "mid", "senior", "executive"]).optional(),
  description: z.string().trim().min(80).max(20_000),
  requirements: z.array(z.string().trim().min(2).max(500)).min(1).max(30),
  benefits: z.array(z.string().trim().min(2).max(500)).max(30).default([]),
  salaryMin: z.number().int().nonnegative().optional(),
  salaryMax: z.number().int().positive().optional(),
  salaryCurrency: z.string().trim().length(3).default("INR"),
  remote: z.boolean().default(false),
  applicationUrl: httpsUrl,
  hiringOrganization: z.string().trim().min(2).max(200),
  expiresAt: z.coerce.date().refine((value) => value.getTime() > Date.now(), "Expiry must be in the future"),
  verifiedBy: z.string().trim().min(2).max(160),
  isActive: z.boolean().default(false),
  metaTitle: z.string().trim().max(70).optional(),
  metaDescription: z.string().trim().max(160).optional(),
});

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

function publicJob(job: DbJob) {
  return {
    id: job.id,
    slug: job.slug,
    title: job.title,
    hiringOrganization: job.hiringOrganization,
    department: job.department || undefined,
    location: job.location,
    employmentType: job.employmentType,
    experienceLevel: job.experienceLevel || undefined,
    description: job.description,
    requirements: job.requirements || [],
    benefits: job.benefits || [],
    salaryMin: job.salaryMin ?? undefined,
    salaryMax: job.salaryMax ?? undefined,
    salaryCurrency: job.salaryCurrency || undefined,
    remote: job.remote || false,
    applicationUrl: job.applicationUrl,
    postedDate: job.postedDate?.toISOString(),
    updatedDate: job.updatedDate?.toISOString(),
    expiresAt: job.expiresAt?.toISOString(),
    isActive: job.isActive,
  };
}

function unavailableJobsResponse(req: Request, res: Response) {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));
  return res.json({ jobs: [], total: 0, page, limit, availability: "temporarily_unavailable" });
}

export async function resolveJobPageStatus(req: Request, res: Response, next: NextFunction) {
  if (!db) {
    res.locals.spaStatus = 503;
    return next();
  }

  try {
    const [job] = await db
      .select({ id: jobs.id })
      .from(jobs)
      .where(and(
        eq(jobs.slug, req.params.slug),
        eq(jobs.isActive, true),
        gt(jobs.expiresAt, new Date()),
        sql`${jobs.verifiedAt} IS NOT NULL`,
        sql`${jobs.verifiedBy} IS NOT NULL`,
        sql`${jobs.applicationUrl} LIKE 'https://%'`,
        sql`${jobs.hiringOrganization} IS NOT NULL`,
        sql`${jobs.postedDate} IS NOT NULL`,
      ))
      .limit(1);
    res.locals.spaStatus = job ? 200 : 404;
  } catch (error) {
    console.error("[jobs] Failed to resolve job page status", error);
    res.locals.spaStatus = 503;
  }
  return next();
}

export function registerJobRoutes(app: Express) {
  app.get("/api/jobs", async (req: Request, res: Response) => {
    if (!db) return unavailableJobsResponse(req, res);

    try {
      const page = Math.max(1, Number(req.query.page) || 1);
      const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));
      const offset = (page - 1) * limit;
      const now = new Date();
      const conditions = [
        eq(jobs.isActive, true),
        gt(jobs.expiresAt, now),
        sql`${jobs.verifiedAt} IS NOT NULL`,
        sql`${jobs.verifiedBy} IS NOT NULL`,
        sql`${jobs.applicationUrl} IS NOT NULL`,
        sql`${jobs.applicationUrl} LIKE 'https://%'`,
        sql`${jobs.hiringOrganization} IS NOT NULL`,
        sql`${jobs.postedDate} IS NOT NULL`,
      ];

      if (typeof req.query.department === "string") {
        conditions.push(ilike(jobs.department, `%${req.query.department}%`));
      }
      if (typeof req.query.location === "string") {
        conditions.push(ilike(jobs.location, `%${req.query.location}%`));
      }
      if (typeof req.query.employmentType === "string") {
        conditions.push(eq(jobs.employmentType, req.query.employmentType));
      }
      if (typeof req.query.experienceLevel === "string") {
        conditions.push(eq(jobs.experienceLevel, req.query.experienceLevel));
      }
      if (typeof req.query.search === "string" && req.query.search.trim()) {
        const pattern = `%${req.query.search.trim()}%`;
        conditions.push(or(
          ilike(jobs.title, pattern),
          ilike(jobs.description, pattern),
          ilike(jobs.department, pattern),
        )!);
      }

      const where = and(...conditions);
      const [results, countResult] = await Promise.all([
        db.select().from(jobs).where(where).orderBy(desc(jobs.postedDate)).limit(limit).offset(offset),
        db.select({ count: sql<number>`count(*)` }).from(jobs).where(where),
      ]);

      return res.json({
        jobs: (results as DbJob[]).map(publicJob),
        total: Number(countResult[0]?.count || 0),
        page,
        limit,
        availability: "available",
      });
    } catch (error) {
      console.error("[jobs] Failed to read governed job listings", error);
      return res.status(503).json({
        jobs: [],
        total: 0,
        page: 1,
        limit: 10,
        availability: "temporarily_unavailable",
        message: "Job listings are temporarily unavailable.",
      });
    }
  });

  app.get("/api/jobs/:slug", async (req: Request, res: Response) => {
    if (!db) {
      return res.status(503).json({ message: "Job listings are temporarily unavailable." });
    }

    try {
      const [job] = await db
        .select()
        .from(jobs)
        .where(and(
          eq(jobs.slug, req.params.slug),
          eq(jobs.isActive, true),
          gt(jobs.expiresAt, new Date()),
          sql`${jobs.verifiedAt} IS NOT NULL`,
          sql`${jobs.verifiedBy} IS NOT NULL`,
          sql`${jobs.applicationUrl} IS NOT NULL`,
          sql`${jobs.applicationUrl} LIKE 'https://%'`,
          sql`${jobs.hiringOrganization} IS NOT NULL`,
          sql`${jobs.postedDate} IS NOT NULL`,
        ))
        .limit(1);

      if (!job) return res.status(404).json({ message: "Job not found" });
      return res.json(publicJob(job as DbJob));
    } catch (error) {
      console.error("[jobs] Failed to read governed job detail", error);
      return res.status(503).json({ message: "Job listing is temporarily unavailable." });
    }
  });

  app.get("/api/admin/jobs", requireAdmin, async (_req: Request, res: Response) => {
    if (!db) return res.status(503).json({ message: "Job management is temporarily unavailable." });
    try {
      const allJobs = await db.select().from(jobs).orderBy(desc(jobs.createdAt));
      return res.json(allJobs);
    } catch (error) {
      console.error("[jobs] Failed to read admin job list", error);
      return res.status(503).json({ message: "Job management is temporarily unavailable." });
    }
  });

  app.post("/api/admin/jobs", requireAdmin, async (req: Request, res: Response) => {
    if (!db) return res.status(503).json({ message: "Job management is temporarily unavailable." });
    const parsed = jobWriteSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

    try {
      const verifiedAt = new Date();
      const [job] = await db.insert(jobs).values({
        ...parsed.data,
        slug: generateSlug(parsed.data.title),
        postedDate: verifiedAt,
        verifiedAt,
      }).returning();
      return res.status(201).json(job);
    } catch (error) {
      console.error("[jobs] Failed to create job", error);
      return res.status(503).json({ message: "Job management is temporarily unavailable." });
    }
  });

  app.put("/api/admin/jobs/:id", requireAdmin, async (req: Request, res: Response) => {
    if (!db) return res.status(503).json({ message: "Job management is temporarily unavailable." });
    const parsed = jobWriteSchema.partial().safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

    try {
      const [job] = await db.update(jobs).set({
        ...parsed.data,
        slug: parsed.data.title ? generateSlug(parsed.data.title) : undefined,
        updatedDate: new Date(),
        verifiedAt: new Date(),
      }).where(eq(jobs.id, req.params.id)).returning();
      if (!job) return res.status(404).json({ message: "Job not found" });
      return res.json(job);
    } catch (error) {
      console.error("[jobs] Failed to update job", error);
      return res.status(503).json({ message: "Job management is temporarily unavailable." });
    }
  });

  app.delete("/api/admin/jobs/:id", requireAdmin, async (req: Request, res: Response) => {
    if (!db) return res.status(503).json({ message: "Job management is temporarily unavailable." });
    try {
      const [job] = await db.update(jobs).set({
        isActive: false,
        updatedDate: new Date(),
      }).where(eq(jobs.id, req.params.id)).returning();
      if (!job) return res.status(404).json({ message: "Job not found" });
      return res.json({ message: "Job deactivated", id: job.id });
    } catch (error) {
      console.error("[jobs] Failed to deactivate job", error);
      return res.status(503).json({ message: "Job management is temporarily unavailable." });
    }
  });
}
