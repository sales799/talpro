/**
 * TalPro India — Jobs Routes (Cycle 1)
 *
 * Replaces the broken PyjamaHR scraper with DB-backed job management.
 *
 * Public endpoints:
 *   GET /api/jobs — Paginated, filterable job listings
 *   GET /api/jobs/:slug — Single job by slug (SEO-friendly)
 *
 * Admin endpoints (require Bearer token):
 *   GET /api/admin/jobs — All jobs including inactive
 *   POST /api/admin/jobs — Create job
 *   PUT /api/admin/jobs/:id — Update job
 *   DELETE /api/admin/jobs/:id — Soft-delete (set inactive)
 */

import type { Express, Request, Response } from "express";
import { db } from "./db";
import { jobs } from "@shared/schema";
import type { DbJob } from "@shared/schema";
import { eq, and, ilike, desc, sql, or } from "drizzle-orm";
import { requireAdmin } from "./security-middleware";
import { z } from "zod";

// ── Slug Generator ──────────────────────────────────────────────

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .substring(0, 100);
}

// ── Public Job Endpoints ────────────────────────────────────────

export function registerJobRoutes(app: Express) {

  // GET /api/jobs — Public job listings
  app.get("/api/jobs", async (req: Request, res: Response) => {
    try {
      const {
        department,
        location,
        employmentType,
        experienceLevel,
        search,
        page = "1",
        limit = "10",
      } = req.query;

      const pageNum = Math.max(1, parseInt(page as string) || 1);
      const limitNum = Math.min(50, Math.max(1, parseInt(limit as string) || 10));
      const offset = (pageNum - 1) * limitNum;

      // Build dynamic WHERE conditions
      const conditions = [eq(jobs.isActive, true)];

      if (department) {
        conditions.push(ilike(jobs.department, `%${department}%`));
      }
      if (location) {
        conditions.push(ilike(jobs.location, `%${location}%`));
      }
      if (employmentType) {
        conditions.push(eq(jobs.employmentType, employmentType as string));
      }
      if (experienceLevel) {
        conditions.push(eq(jobs.experienceLevel, experienceLevel as string));
      }
      if (search) {
        const searchPattern = `%${search}%`;
        conditions.push(
          or(
            ilike(jobs.title, searchPattern),
            ilike(jobs.description, searchPattern),
            ilike(jobs.department, searchPattern)
          )!
        );
      }

      const where = and(...conditions);

      // Fetch paginated results + total count
      const [jobResults, countResult] = await Promise.all([
        db
          .select()
          .from(jobs)
          .where(where)
          .orderBy(desc(jobs.postedDate))
          .limit(limitNum)
          .offset(offset),
        db
          .select({ count: sql<number>`count(*)` })
          .from(jobs)
          .where(where),
      ]);

      const total = Number(countResult[0]?.count || 0);

      // Transform to match existing frontend schema
      const transformedJobs = (jobResults as DbJob[]).map((job) => ({
        id: job.id,
        title: job.title,
        slug: job.slug,
        department: job.department,
        location: job.location,
        employmentType: job.employmentType,
        experienceLevel: job.experienceLevel,
        description: job.description,
        requirements: job.requirements || [],
        benefits: job.benefits || [],
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        salaryCurrency: job.salaryCurrency,
        remote: job.remote,
        applicationUrl: job.applicationUrl,
        postedDate: job.postedDate?.toISOString(),
        updatedDate: job.updatedDate?.toISOString() || null,
        isActive: job.isActive,
      }));

      res.json({
        jobs: transformedJobs,
        total,
        page: pageNum,
        limit: limitNum,
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ message: "Error fetching jobs" });
    }
  });

  // GET /api/jobs/:slug — Single job (SEO-friendly URL)
  app.get("/api/jobs/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;

      const result = await db
        .select()
        .from(jobs)
        .where(and(eq(jobs.slug, slug), eq(jobs.isActive, true)))
        .limit(1);

      if (result.length === 0) {
        return res.status(404).json({ message: "Job not found" });
      }

      const job = result[0];
      res.json({
        ...job,
        requirements: job.requirements || [],
        benefits: job.benefits || [],
        postedDate: job.postedDate?.toISOString(),
        updatedDate: job.updatedDate?.toISOString() || null,
      });
    } catch (error) {
      console.error("Error fetching job:", error);
      res.status(500).json({ message: "Error fetching job" });
    }
  });

  // ── Admin Job Endpoints ─────────────────────────────────────

  // GET /api/admin/jobs — All jobs (including inactive)
  app.get("/api/admin/jobs", requireAdmin, async (_req: Request, res: Response) => {
    try {
      const allJobs = await db
        .select()
        .from(jobs)
        .orderBy(desc(jobs.createdAt));
      res.json(allJobs);
    } catch (error) {
      console.error("Error fetching admin jobs:", error);
      res.status(500).json({ message: "Error fetching jobs" });
    }
  });

  // POST /api/admin/jobs — Create job
  app.post("/api/admin/jobs", requireAdmin, async (req: Request, res: Response) => {
    try {
      const createJobSchema = z.object({
        title: z.string().min(3),
        department: z.string().optional(),
        location: z.string().default("India"),
        employmentType: z.enum(["full-time", "part-time", "contract", "internship"]).default("full-time"),
        experienceLevel: z.enum(["entry", "mid", "senior", "executive"]).optional(),
        description: z.string().min(10),
        requirements: z.array(z.string()).optional(),
        benefits: z.array(z.string()).optional(),
        salaryMin: z.number().optional(),
        salaryMax: z.number().optional(),
        salaryCurrency: z.string().default("INR"),
        remote: z.boolean().default(false),
        applicationUrl: z.string().url().optional(),
        isActive: z.boolean().default(true),
        metaTitle: z.string().max(70).optional(),
        metaDescription: z.string().max(160).optional(),
      });

      const validated = createJobSchema.parse(req.body);
      const slug = generateSlug(validated.title);

      const [newJob] = await db
        .insert(jobs)
        .values({
          ...validated,
          slug,
          postedDate: new Date(),
        })
        .returning();

      res.status(201).json(newJob);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error("Error creating job:", error);
      res.status(500).json({ message: "Error creating job" });
    }
  });

  // PUT /api/admin/jobs/:id — Update job
  app.put("/api/admin/jobs/:id", requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const [updated] = await db
        .update(jobs)
        .set({
          ...req.body,
          updatedDate: new Date(),
          slug: req.body.title ? generateSlug(req.body.title) : undefined,
        })
        .where(eq(jobs.id, id))
        .returning();

      if (!updated) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.json(updated);
    } catch (error) {
      console.error("Error updating job:", error);
      res.status(500).json({ message: "Error updating job" });
    }
  });

  // DELETE /api/admin/jobs/:id — Soft-delete
  app.delete("/api/admin/jobs/:id", requireAdmin, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const [deactivated] = await db
        .update(jobs)
        .set({ isActive: false, updatedDate: new Date() })
        .where(eq(jobs.id, id))
        .returning();

      if (!deactivated) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.json({ message: "Job deactivated", id });
    } catch (error) {
      console.error("Error deleting job:", error);
      res.status(500).json({ message: "Error deleting job" });
    }
  });
}
