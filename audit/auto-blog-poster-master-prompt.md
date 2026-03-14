# TALPRO INDIA — Auto Blog Poster: Master Prompt (Updated 2026-03-14)

> **Note**: This document supersedes the earlier 360° prompt. Objective 1 (sitemap redesign)
> was completed across Sprints 6–10 (Phase 2–3). This focuses solely on **Objective 2:
> Auto Blog Poster** — adapted to the current production architecture.

---

## CURRENT STATE (as of Sprint 10 deployment)

### Production Architecture

| Component | Details |
|-----------|---------|
| **Domain** | talproindia.com (NOT talpro.in — that's the old domain) |
| **Frontend** | React 18 + Vite + wouter routing + Tailwind v4 + Shadcn/ui |
| **Backend** | Express.js (esbuild-bundled to dist/index.js) |
| **Database** | Neon PostgreSQL (Drizzle ORM) |
| **Hosting** | Hostinger KVM4 VPS (Ubuntu 24.04, 8GB RAM) |
| **Process** | PM2 fork_mode, port 5001 |
| **Web Server** | Nginx reverse proxy → port 5001 |
| **SSL** | Let's Encrypt via Certbot |
| **Deploy** | GitHub (sales799/talpro) → SSH deploy script |
| **N8N** | Self-hosted at n8n.hcitalks.com (Docker stack) |
| **VPS Path** | /var/www/talpro/releases/20260306-initial/ |

### Existing Blog Infrastructure (ALREADY BUILT)

**Database table** (`blog_posts` in `talpro` PostgreSQL):
```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
title       TEXT NOT NULL
slug        TEXT NOT NULL UNIQUE
content     TEXT NOT NULL          -- stores HTML
excerpt     TEXT NOT NULL
image_url   TEXT
image_alt   TEXT
tags        TEXT[]                 -- PostgreSQL array
category    VARCHAR(100)
published_at TIMESTAMP            -- NULL = draft
source_url  TEXT
created_at  TIMESTAMP DEFAULT now()
```
**Status**: Table exists but contains **0 rows**.

**Express API routes** (in `server/routes.ts`):
- `GET /api/blog/posts` — Published posts with pagination, tag/search filtering
- `GET /api/blog/posts/:slug` — Single post by slug
- `POST /api/blog/webhook` — Automated publishing endpoint (accepts markdown, auto-slugifies, optional OG image extraction, optional AI enhancement)
- `GET /api/blog/admin/posts` — All posts including drafts
- `PUT /api/blog/admin/posts/:id` — Update post
- `DELETE /api/blog/admin/posts/:id` — Delete post

**Frontend** (current gap):
- `Blog.tsx` and `BlogPost.tsx` read from hardcoded `client/src/data/blogPosts.ts` (5 static posts)
- These need rewiring to call `/api/blog/posts` API instead
- Static posts serve as fallback content

**What's missing**:
1. Frontend doesn't consume the API — reads static config instead
2. No content generation pipeline (N8N or otherwise)
3. No auto-publish scheduling
4. No sitemap auto-update after publishing
5. No quality scoring/gate
6. No Google Search Console ping

### Completed Website Pages (Sprints 6–10)

- `/` — Homepage (IT staffing positioning)
- `/about` — Company story, team, certifications
- `/services` — Services hub
- `/services/{slug}` — 7 service detail pages (IT staffing, engineering, sales, direct-hiring-it, direct-hiring-functions, executive-search, gcc-accelerator)
- `/industries` — Industries hub
- `/industries/{slug}` — 5 industry pages (fintech, media, healthcare, ecommerce, education)
- `/how-we-work` — Recruitment methodology
- `/case-studies` — Client success stories
- `/blog` — Blog listing (currently static)
- `/blog/:slug` — Blog detail
- `/salary-guide` — IT salary benchmarks
- `/salary-calculator` — Interactive calculator
- `/staffing-quiz` — Staffing model recommender
- `/for-candidates` — Candidate landing page
- `/careers` — Internal hiring
- `/contact` — Contact form (honeypot + rate limiting)
- `/privacy-policy`, `/terms-of-service` — Legal

---

## OBJECTIVE: AUTO BLOG POSTER — DAILY AUTONOMOUS PUBLISHING

### Vision
A fully autonomous system that publishes 1 high-quality, SEO-optimized blog post per day on talproindia.com/blog/ without manual intervention.

### Content Themes (aligned with IT staffing + GCC positioning)
1. GCC hiring trends and expansion signals in India
2. India Labour Code compliance updates (4 new codes)
3. IT staffing industry insights (contract vs permanent, compliance, cost models)
4. CHRO/CTO hiring challenges and solutions
5. City-wise talent availability (Bangalore, Hyderabad, Pune, Chennai, NCR)
6. Salary benchmarks and compensation trends
7. Technology hiring trends (AI/ML, Cloud, DevOps, Security)
8. Compliance deep-dives (EPF, ESI, Gratuity, Professional Tax, DPDPA)
9. Case studies and client success patterns (anonymized)
10. Recruitment automation and AI in hiring

### System Architecture Required

#### A. Content Pipeline
- N8N workflow triggered daily (cron: 6:00 AM IST)
- Topic selection from: editorial calendar, trending keywords, news triggers
- Claude API (Sonnet) generates article with Talpro brand voice
- Auto-generates: title, slug, excerpt, SEO meta, schema markup, internal links
- Featured image: AI-generated via DALL-E or sourced from Unsplash API

#### B. Publishing Mechanism
- Posts via existing `POST /api/blog/webhook` endpoint
- Auto-updates sitemap.xml with new post URL
- Proper URL: `/blog/{keyword-slug}/`
- RSS feed generation for syndication

#### C. Quality & Safety
- Content quality scoring before publishing (readability, keyword density, uniqueness)
- Optional human review queue (Telegram notification with approve/reject)
- Rate limiting: max 1 post/day to avoid Google spam penalties
- Fallback: if quality score < threshold, hold in draft (publishedAt = NULL)

#### D. Distribution (Post-Publish)
- Auto-submit URL to Google Search Console API for indexing
- Optional: auto-share to LinkedIn company page
- Optional: email digest to subscriber list

#### E. Frontend Rewiring
- Blog.tsx: fetch from `/api/blog/posts` instead of static array
- BlogPost.tsx: fetch from `/api/blog/posts/:slug` instead of static array
- Keep static posts as seed data (migrate to DB on first run)
- Add loading states, error handling, pagination

### Database Schema Additions Needed

```sql
-- Add to existing blog_posts table:
ALTER TABLE blog_posts ADD COLUMN author VARCHAR(100) DEFAULT 'TalPro Editorial';
ALTER TABLE blog_posts ADD COLUMN reading_time INTEGER;       -- minutes
ALTER TABLE blog_posts ADD COLUMN featured BOOLEAN DEFAULT false;
ALTER TABLE blog_posts ADD COLUMN meta_title VARCHAR(70);
ALTER TABLE blog_posts ADD COLUMN meta_description VARCHAR(160);
ALTER TABLE blog_posts ADD COLUMN quality_score INTEGER;      -- 0-100
ALTER TABLE blog_posts ADD COLUMN generation_source VARCHAR(50); -- 'manual', 'n8n', 'webhook'
ALTER TABLE blog_posts ADD COLUMN keywords TEXT[];            -- target SEO keywords
```

### Implementation Phases

**Phase 1 — Foundation (Day 1–2)**
1. Add new columns to blog_posts table (migration)
2. Rewire Blog.tsx and BlogPost.tsx to use API
3. Migrate 5 static posts to database as seed data
4. Add sitemap auto-update on publish

**Phase 2 — Content Engine (Day 3–5)**
5. Build N8N workflow: topic selection → Claude API → quality check → publish
6. Create content quality scoring module
7. Set up editorial calendar in DB or N8N
8. Configure daily cron trigger

**Phase 3 — Distribution (Day 6–7)**
9. Google Search Console API integration
10. RSS feed endpoint
11. Optional: LinkedIn auto-share
12. Monitoring and alerting

### Costs Estimate

| Item | Monthly Cost |
|------|-------------|
| Claude API (Sonnet, ~30 posts × ~4K tokens each) | ~$5–10 |
| Unsplash API (free tier, 50 req/hr) | $0 |
| Google Search Console API | $0 |
| N8N (self-hosted, already running) | $0 |
| Neon PostgreSQL (already provisioned) | $0 |
| **Total** | **~$5–10/month** |

---

## TECH STACK REFERENCE

| Tool | Purpose | Access |
|------|---------|--------|
| Neon PostgreSQL | Blog storage | DATABASE_URL in .env |
| Drizzle ORM | Schema + queries | shared/schema.ts |
| Express.js | API server | server/routes.ts |
| N8N | Workflow automation | n8n.hcitalks.com |
| Claude API | Content generation | ANTHROPIC_API_KEY |
| PM2 | Process management | `pm2 restart talpro-india` |
| Nginx | Reverse proxy | /etc/nginx/sites-enabled/ |
