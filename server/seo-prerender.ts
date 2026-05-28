/**
 * TalPro India — SEO Pre-rendering Middleware (Cycle 1)
 *
 * Problem: TalPro is a client-side SPA. Search engines see an empty HTML shell
 * with no content, title, or meta tags — resulting in zero organic visibility
 * for a company that depends on being found online.
 *
 * Solution: Intercept requests from known crawlers and serve server-rendered
 * HTML with proper meta tags, structured data, and content. Regular users
 * still get the fast SPA experience.
 *
 * This is NOT full SSR — it's targeted prerendering for crawlers only.
 * The SPA continues to work normally for all other visitors.
 */

import type { Request, Response, NextFunction } from "express";
import { db } from "./db";
import { jobs, blogPosts } from "@shared/schema";
import type { BlogPost, DbJob } from "@shared/schema";
import { eq, and, desc, sql } from "drizzle-orm";

// ── Crawler Detection ──────────────────────────────────────────

const CRAWLER_AGENTS = [
  "googlebot",
  "bingbot",
  "yandexbot",
  "duckduckbot",
  "slurp", // Yahoo
  "baiduspider",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "whatsapp",
  "telegram",
  "discordbot",
  "slackbot",
  "applebot",
];

function isCrawler(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return CRAWLER_AGENTS.some((bot) => ua.includes(bot));
}

// ── Page Meta Data ─────────────────────────────────────────────

interface PageMeta {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
  jsonLd?: object;
  content?: string; // Rendered body content for crawlers
}

const BASE_URL = "https://nirantar.talpro.in";
const DEFAULT_IMAGE = `${BASE_URL}/og-talpro.png`;

// Static page metadata
const STATIC_PAGES: Record<string, Omit<PageMeta, "url">> = {
  "/": {
    title: "TalPro India — IT Staffing & Recruitment for GCCs & Product Companies",
    description:
      "India's specialist IT staffing partner. We fill your hardest tech roles in 48 hours — DevOps, Data, SAP, Salesforce, Cybersecurity. Serving GCCs, startups, and enterprises across 6 cities.",
    type: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "TalPro India",
      url: BASE_URL,
      logo: `${BASE_URL}/talpro-logo.png`,
      description: "India's specialist IT staffing and recruitment partner for GCCs and product companies",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "Bangalore",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "jobs@talproindia.com",
        contactType: "recruitment",
      },
      sameAs: ["https://www.linkedin.com/company/talpro-india"],
    },
  },
  "/about": {
    title: "About TalPro India — Our Story & Mission",
    description:
      "TalPro India bridges the gap between exceptional IT talent and forward-thinking companies. Learn about our 48-hour placement methodology and specialist recruitment approach.",
  },
  "/services": {
    title: "IT Staffing Services — Contract, Permanent & Executive Search | TalPro India",
    description:
      "Full-spectrum IT staffing: contract staffing, permanent hiring, executive search, GCC accelerator, and specialist verticals in Cloud, Data, SAP, Salesforce, and Cybersecurity.",
  },
  "/industries": {
    title: "Industries We Serve — Fintech, Healthcare, E-commerce & More | TalPro India",
    description:
      "Industry-specific IT staffing for fintech, healthcare technology, e-commerce, media & entertainment, and education technology sectors across India.",
  },
  "/contact": {
    title: "Contact TalPro India — Get a Quote in 8 Hours",
    description:
      "Reach out to TalPro India for your IT staffing needs. We respond within 8 business hours with a tailored recruitment plan and competitive pricing.",
  },
  "/careers": {
    title: "Current IT Job Openings — DevOps, Data, SAP, Cybersecurity | TalPro India",
    description:
      "Browse active IT job openings across Bangalore, Hyderabad, Pune, Chennai, Mumbai, and Delhi NCR. Contract and permanent roles in top GCCs and product companies.",
    type: "website",
  },
  "/blog": {
    title: "IT Staffing Blog — GCC Insights, Salary Trends & Hiring Tips | TalPro India",
    description:
      "Expert articles on GCC hiring, Indian labour compliance, IT salary benchmarks, and recruitment best practices from TalPro India's market intelligence team.",
  },
  "/gcc-hub": {
    title: "GCC Hub India — Global Capability Centre Staffing & Setup | TalPro India",
    description:
      "Comprehensive GCC staffing solutions: team ramp-up, compliance guidance, entity setup support, and India talent market intelligence for global capability centres.",
  },
  "/salary-guide": {
    title: "IT Salary Guide India 2026 — Benchmarks by Role & City | TalPro India",
    description:
      "Comprehensive IT salary data for India: compensation benchmarks for DevOps, Data Engineering, SAP, Salesforce, and Cybersecurity roles across 6 major cities.",
  },
  "/salary-calculator": {
    title: "IT Salary Calculator India — Compare Your CTC | TalPro India",
    description:
      "Calculate and compare your IT salary against market benchmarks. Get personalized CTC insights for your role, experience level, and city in India.",
  },
  "/how-we-work": {
    title: "How We Work — TalPro's 48-Hour Recruitment Process",
    description:
      "Our 5-step recruitment methodology: requirement deep-dive, AI-powered sourcing, skills assessment, cultural fit verification, and post-placement support — all within 48 hours.",
  },
  "/for-candidates": {
    title: "For IT Professionals — Find Your Next Role | TalPro India",
    description:
      "Join TalPro's talent network. We connect IT professionals with opportunities at top GCCs and product companies across India. Confidential, no-cost career support.",
  },
  "/case-studies": {
    title: "Client Success Stories — IT Staffing Case Studies | TalPro India",
    description:
      "Real results from TalPro's IT staffing engagements: see how we've helped GCCs and product companies build high-performing technical teams across India.",
  },
};

// Service page metadata
const SERVICE_META: Record<string, { title: string; description: string }> = {
  "it-staffing": {
    title: "IT Staffing Services India — Contract & Permanent | TalPro",
    description: "End-to-end IT staffing for contract and permanent roles across all technology stacks. Bangalore, Hyderabad, Pune, Chennai, Mumbai, Delhi NCR.",
  },
  "engineering-staffing": {
    title: "Engineering Staffing India — Software & Hardware | TalPro",
    description: "Specialist recruitment for software engineers, firmware developers, embedded systems, and R&D teams across India's engineering hubs.",
  },
  "gcc-accelerator": {
    title: "GCC Accelerator — Fast-Track Your India Capability Centre | TalPro",
    description: "Launch your Global Capability Centre in India in 90 days. Complete team ramp-up, compliance setup, and talent pipeline from TalPro India.",
  },
  "cloud-devops-staffing": {
    title: "Cloud & DevOps Staffing India — AWS, Azure, GCP | TalPro",
    description: "Hire cloud architects, DevOps engineers, SREs, and platform engineers skilled in AWS, Azure, GCP, Kubernetes, and Terraform.",
  },
  "data-ai-staffing": {
    title: "Data & AI Staffing India — Data Engineers, ML Engineers | TalPro",
    description: "Recruit data engineers, ML engineers, data scientists, and AI specialists. Expertise in Databricks, Spark, Python, and modern data stacks.",
  },
  "sap-enterprise-staffing": {
    title: "SAP Staffing India — S/4HANA, BTP, Basis | TalPro",
    description: "SAP specialists for S/4HANA migrations, BTP development, Basis administration, and functional consulting across all SAP modules.",
  },
  "cybersecurity-staffing": {
    title: "Cybersecurity Staffing India — SOC, GRC, Pen Testing | TalPro",
    description: "Hire cybersecurity analysts, SOC engineers, GRC consultants, and penetration testers from India's top security talent pool.",
  },
};

// City landing page metadata
const CITY_META: Record<string, { title: string; description: string }> = {
  bengaluru: {
    title: "IT Staffing in Bangalore — Top Tech Talent | TalPro India",
    description: "Hire IT professionals in Bangalore, India's silicon valley. 500+ active candidates in DevOps, Data, Cloud, and full-stack development.",
  },
  hyderabad: {
    title: "IT Staffing in Hyderabad — GCC & Enterprise Hiring | TalPro India",
    description: "Specialist IT recruitment in Hyderabad. Deep network in the city's GCC corridor: Microsoft, Amazon, Google, and Tier-1 enterprises.",
  },
  pune: {
    title: "IT Staffing in Pune — Software & SAP Talent | TalPro India",
    description: "IT recruitment in Pune for software development, SAP consulting, data engineering, and automotive tech roles across Hinjewadi and Kharadi.",
  },
  chennai: {
    title: "IT Staffing in Chennai — Manufacturing & Fintech Tech Talent | TalPro",
    description: "Chennai IT staffing for manufacturing tech, fintech, and healthcare IT. Strong network in OMR, Tidel Park, and Siruseri corridors.",
  },
  mumbai: {
    title: "IT Staffing in Mumbai — Fintech & BFSI Talent | TalPro India",
    description: "IT recruitment in Mumbai for fintech, BFSI, and media technology. Covering BKC, Powai, Navi Mumbai, and Thane tech hubs.",
  },
  "delhi-ncr": {
    title: "IT Staffing in Delhi NCR — Gurgaon & Noida Tech Hiring | TalPro",
    description: "IT staffing across Delhi NCR: Gurgaon Cyber Hub, Noida Sector 62, and Greater Noida. E-commerce, SaaS, and GCC hiring specialists.",
  },
};

// ── HTML Template ──────────────────────────────────────────────

function renderSeoPage(meta: PageMeta): string {
  const jsonLdScript = meta.jsonLd
    ? `<script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>`
    : "";

  const bodyContent = meta.content || `<h1>${meta.title}</h1><p>${meta.description}</p>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}">
  <link rel="canonical" href="${meta.url}">

  <!-- Open Graph -->
  <meta property="og:type" content="${meta.type || "website"}">
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:url" content="${meta.url}">
  <meta property="og:image" content="${meta.image || DEFAULT_IMAGE}">
  <meta property="og:site_name" content="TalPro India">
  <meta property="og:locale" content="en_IN">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="${meta.image || DEFAULT_IMAGE}">

  ${jsonLdScript}

  <!-- Redirect to SPA after crawl -->
  <noscript><meta http-equiv="refresh" content="0;url=${meta.url}"></noscript>
</head>
<body>
  <main>
    ${bodyContent}
  </main>
  <footer>
    <p>&copy; ${new Date().getFullYear()} TalPro India. IT Staffing & Recruitment.</p>
    <nav>
      <a href="${BASE_URL}/">Home</a> |
      <a href="${BASE_URL}/services">Services</a> |
      <a href="${BASE_URL}/careers">Careers</a> |
      <a href="${BASE_URL}/blog">Blog</a> |
      <a href="${BASE_URL}/contact">Contact</a>
    </nav>
  </footer>
</body>
</html>`;
}

// ── Dynamic Page Renderers ─────────────────────────────────────

async function renderJobListingPage(): Promise<PageMeta> {
  try {
    const activeJobs = await db
      .select()
      .from(jobs)
      .where(eq(jobs.isActive, true))
      .orderBy(desc(jobs.postedDate))
      .limit(50);

    const typedJobs = activeJobs as DbJob[];

    const jobsHtml = typedJobs
      .map(
        (job) => `
      <article>
        <h2><a href="${BASE_URL}/careers/${job.slug}">${job.title}</a></h2>
        <p><strong>Location:</strong> ${job.location} | <strong>Type:</strong> ${job.employmentType} | <strong>Department:</strong> ${job.department || "General"}</p>
        <p>${job.description.substring(0, 200)}...</p>
      </article>`
      )
      .join("\n");

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: typedJobs.map((job, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "JobPosting",
          title: job.title,
          description: job.description,
          datePosted: job.postedDate?.toISOString(),
          employmentType: job.employmentType?.toUpperCase().replace("-", "_"),
          jobLocation: {
            "@type": "Place",
            address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "IN" },
          },
          hiringOrganization: {
            "@type": "Organization",
            name: "TalPro India",
            sameAs: BASE_URL,
          },
        },
      })),
    };

    return {
      ...STATIC_PAGES["/careers"]!,
      url: `${BASE_URL}/careers`,
      content: `<h1>Current IT Job Openings at TalPro India</h1><p>${typedJobs.length} active positions across India.</p>${jobsHtml}`,
      jsonLd,
    };
  } catch {
    return { ...STATIC_PAGES["/careers"]!, url: `${BASE_URL}/careers` };
  }
}

async function renderBlogListingPage(): Promise<PageMeta> {
  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .where(sql`${blogPosts.publishedAt} IS NOT NULL`)
      .orderBy(desc(blogPosts.publishedAt))
      .limit(20);

    const typedPosts = posts as BlogPost[];

    const postsHtml = typedPosts
      .map(
        (post) => `
      <article>
        <h2><a href="${BASE_URL}/blog/${post.slug}">${post.title}</a></h2>
        <p>${post.excerpt}</p>
        <time>${post.publishedAt?.toISOString().split("T")[0]}</time>
      </article>`
      )
      .join("\n");

    return {
      ...STATIC_PAGES["/blog"]!,
      url: `${BASE_URL}/blog`,
      content: `<h1>TalPro India Blog — IT Staffing Insights</h1>${postsHtml}`,
    };
  } catch {
    return { ...STATIC_PAGES["/blog"]!, url: `${BASE_URL}/blog` };
  }
}

async function renderBlogPostPage(slug: string): Promise<PageMeta | null> {
  try {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (!post) return null;

    return {
      title: post.metaTitle || `${post.title} | TalPro India Blog`,
      description: post.metaDescription || post.excerpt,
      url: `${BASE_URL}/blog/${post.slug}`,
      image: post.imageUrl || DEFAULT_IMAGE,
      type: "article",
      content: `<article><h1>${post.title}</h1><p>By ${post.author || "TalPro Editorial"} · ${post.readingTime || 5} min read</p>${post.content}</article>`,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt?.toISOString(),
        author: { "@type": "Person", name: post.author || "TalPro Editorial" },
        publisher: { "@type": "Organization", name: "TalPro India", url: BASE_URL },
        mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
      },
    };
  } catch {
    return null;
  }
}

// ── Main Middleware ─────────────────────────────────────────────

export function seoPrerender(req: Request, res: Response, next: NextFunction) {
  const userAgent = req.headers["user-agent"] || "";

  // Only intercept for crawlers
  if (!isCrawler(userAgent)) {
    return next();
  }

  // Only handle GET requests
  if (req.method !== "GET") {
    return next();
  }

  // Skip API routes and static assets
  if (req.path.startsWith("/api/") || req.path.match(/\.\w+$/)) {
    return next();
  }

  handleCrawlerRequest(req, res, next).catch((err) => {
    console.error("[seo-prerender] Error:", err);
    next(); // Fall through to SPA on error
  });
}

async function handleCrawlerRequest(req: Request, res: Response, next: NextFunction) {
  const path = req.path;
  let meta: PageMeta | null = null;

  // Static pages
  if (STATIC_PAGES[path]) {
    if (path === "/careers") {
      meta = await renderJobListingPage();
    } else if (path === "/blog") {
      meta = await renderBlogListingPage();
    } else {
      meta = { ...STATIC_PAGES[path]!, url: `${BASE_URL}${path}` };
    }
  }
  // Blog post pages
  else if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    meta = await renderBlogPostPage(slug);
  }
  // Service pages
  else if (path.startsWith("/services/")) {
    const slug = path.replace("/services/", "");
    const serviceMeta = SERVICE_META[slug];
    if (serviceMeta) {
      meta = { ...serviceMeta, url: `${BASE_URL}${path}` };
    }
  }
  // City pages
  else if (path.startsWith("/locations/")) {
    const slug = path.replace("/locations/", "");
    const cityMeta = CITY_META[slug];
    if (cityMeta) {
      meta = { ...cityMeta, url: `${BASE_URL}${path}` };
    }
  }

  if (meta) {
    console.log(`[seo-prerender] Serving prerendered page for ${path} to ${req.headers["user-agent"]?.substring(0, 30)}`);
    return res.status(200).type("html").send(renderSeoPage(meta));
  }

  // Unknown page — let SPA handle it
  next();
}
