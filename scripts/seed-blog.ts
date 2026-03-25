/**
 * Seeds the blog_posts table with static blog data.
 *
 * Run: npx tsx scripts/seed-blog.ts
 * Requires DATABASE_URL environment variable.
 */

import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { blogPosts } from '../shared/schema';
import { eq } from 'drizzle-orm';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is required');
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool });

// Static blog posts to seed (from client/src/data/blogPosts.ts)
const staticPosts = [
  {
    title: 'The State of IT Hiring in India: 2026 Market Report',
    slug: 'state-of-it-hiring-india-2026',
    excerpt: "An in-depth look at India's IT talent market — which skills are surging, how compensation is shifting, and what hiring managers need to know to compete for top engineers.",
    category: 'Market Intelligence',
    tags: ['Hiring Trends', 'Salary Data', 'India IT Market', '2026'],
    author: 'TalPro Research',
    authorRole: 'Market Intelligence Team',
    publishedAt: new Date('2026-03-10'),
    readingTime: 8,
    featured: true,
    metaTitle: 'State of IT Hiring in India 2026 | TalPro Market Report',
    metaDescription: "India's IT talent market analysis: surging skills, compensation shifts, and what hiring managers need to know in 2026.",
    qualityScore: 90,
    generationSource: 'manual',
    keywords: ['IT hiring India 2026', 'tech salary trends India', 'IT staffing market report'],
    content: `<p>India's IT workforce crossed 5.4 million professionals in 2025, and the demand curve shows no signs of flattening. This report covers the skills, compensation, and hiring patterns defining 2026.</p><h2>The Skills That Define 2026 Hiring</h2><p>AI/ML requirements appear in 34% of mandates (up from 8% in 2024). Platform engineering is replacing traditional DevOps. Go and Rust are eating into Java's share.</p><h2>Compensation Trends</h2><p>Mid-senior permanent roles in Bangalore, Hyderabad, and Pune show Full-Stack Engineers at ₹18-30 LPA (stable), Platform/DevOps Engineers at ₹22-38 LPA (up 12%), and AI/ML Engineers at ₹25-50 LPA (up 20%).</p><h2>What This Means for Hiring Managers</h2><p>The talent market is bifurcating. Commodity skills face compression while specialized skills command premiums. Speed-to-offer is the single biggest determinant of close rates.</p>`,
  },
  {
    title: 'Contract vs. Permanent Staffing: Which Model Wins in 2026?',
    slug: 'contract-vs-permanent-staffing',
    excerpt: 'A practical comparison of contract, contract-to-hire, and permanent placement models for Indian IT companies — with real cost breakdowns and decision frameworks.',
    category: 'Staffing Strategy',
    tags: ['Contract Staffing', 'Permanent Hiring', 'Cost Analysis', 'Staffing Models'],
    author: 'TalPro Editorial',
    authorRole: 'Staffing Strategy',
    publishedAt: new Date('2026-03-05'),
    readingTime: 6,
    featured: false,
    metaTitle: 'Contract vs Permanent Staffing India 2026 | TalPro Guide',
    metaDescription: 'Compare contract, C2H, and permanent staffing models with real cost breakdowns for Indian IT companies.',
    qualityScore: 85,
    generationSource: 'manual',
    keywords: ['contract vs permanent staffing India', 'C2H staffing', 'staffing cost comparison'],
    content: `<p>The contract-vs-permanent debate has shifted since the pandemic normalized flexible work arrangements. Here's what the 2026 landscape looks like.</p><h2>The Three Models</h2><p><strong>Contract staffing</strong> provides immediate access to vetted professionals on time-bound engagements. <strong>Contract-to-hire (C2H)</strong> offers a trial period before permanent commitment. <strong>Permanent placement</strong> targets long-term organizational capability building.</p><h2>Cost Comparison</h2><p>For a senior developer in Bangalore: Contract at ₹1.5-2.5L/month all-inclusive, C2H with 15-20% conversion fee after 3-6 months, or Permanent at 8.33-16.67% annual CTC placement fee.</p>`,
  },
  {
    title: 'How to Set Up a GCC in India: The Complete 2026 Playbook',
    slug: 'gcc-setup-guide-india',
    excerpt: "From entity registration to your first 50 hires — a step-by-step guide to establishing a Global Capability Centre in India, based on TalPro's experience building GCCs for Fortune 500 companies.",
    category: 'GCC Advisory',
    tags: ['GCC', 'Global Capability Centre', 'India Operations', 'Staffing Guide'],
    author: 'TalPro GCC Practice',
    authorRole: 'GCC Advisory',
    publishedAt: new Date('2026-02-25'),
    readingTime: 10,
    featured: true,
    metaTitle: 'GCC Setup Guide India 2026 | Complete Playbook | TalPro',
    metaDescription: 'Step-by-step guide to setting up a Global Capability Centre in India — entity registration to first 50 hires.',
    qualityScore: 92,
    generationSource: 'manual',
    keywords: ['GCC setup India', 'Global Capability Centre guide', 'GCC staffing India 2026'],
    content: `<p>India hosts 1,760+ GCCs with $64.6B in revenue, projected to reach 2,200 by 2030. Here's how to set one up.</p><h2>Phase 0: Feasibility and Planning (4-6 weeks)</h2><p>City selection, entity structure, talent availability assessment, and cost modeling.</p><h2>Phase 1: Entity and Core Team (8-12 weeks)</h2><p>Company registration, office setup, compliance frameworks, and hiring your founding team of 10-15.</p><h2>Phase 2: Scaling (Months 4-9)</h2><p>Ramp from 15 to 50+ with structured hiring pipelines, employer branding, and operational maturity.</p>`,
  },
  {
    title: '7 Signs Your IT Recruitment Process Is Broken',
    slug: 'signs-it-recruitment-process-broken',
    excerpt: "If your time-to-fill exceeds 45 days, your offer acceptance rate is below 80%, or your new hires keep leaving within 6 months, your recruitment process needs an overhaul.",
    category: 'Hiring Best Practices',
    tags: ['Recruitment', 'Hiring Process', 'Talent Acquisition', 'HR Strategy'],
    author: 'TalPro Editorial',
    authorRole: 'Hiring Strategy',
    publishedAt: new Date('2026-02-15'),
    readingTime: 5,
    featured: false,
    metaTitle: '7 Signs Your IT Recruitment Process Is Broken | TalPro',
    metaDescription: 'Diagnose broken IT recruitment: time-to-fill, offer acceptance, early attrition, and 4 more warning signs.',
    qualityScore: 80,
    generationSource: 'manual',
    keywords: ['IT recruitment problems', 'hiring process improvement', 'recruitment KPIs'],
    content: `<p>Most IT companies don't realize their hiring process is broken until top candidates stop accepting offers. Here are seven warning signs.</p><h2>1. Time-to-Fill Exceeds 45 Days</h2><p>In a competitive market, every week of delay costs you candidates. Top talent gets multiple offers within 2-3 weeks.</p><h2>2. Offer Acceptance Rate Below 80%</h2><p>If 20%+ of your offers are rejected, your compensation benchmarking or candidate experience is off.</p><h2>3. Early Attrition Above 15%</h2><p>New hires leaving within 6 months signals a disconnect between hiring promise and workplace reality.</p>`,
  },
  {
    title: "India's Top Tech Hubs: A Hiring Manager's Talent Guide",
    slug: 'india-top-tech-hubs-talent-guide',
    excerpt: 'Bengaluru leads with 2M+ IT professionals, but Hyderabad, Pune, and Chennai offer compelling alternatives. A city-by-city breakdown of talent density, salary ranges, and hiring dynamics.',
    category: 'Market Intelligence',
    tags: ['Tech Hubs', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Talent Map'],
    author: 'TalPro Research',
    authorRole: 'Market Intelligence Team',
    publishedAt: new Date('2026-02-01'),
    readingTime: 7,
    featured: false,
    metaTitle: "India's Top IT Hubs 2026: Talent & Salary Guide | TalPro",
    metaDescription: "City-by-city breakdown of India's tech talent hubs — Bengaluru, Hyderabad, Pune, Chennai, Mumbai, Delhi-NCR.",
    qualityScore: 88,
    generationSource: 'manual',
    keywords: ['IT hubs India', 'tech talent Bengaluru', 'Hyderabad IT staffing', 'Pune tech hiring'],
    content: `<p>Choosing where to hire is as important as choosing who to hire. Each Indian tech hub has distinct characteristics.</p><h2>Bengaluru: The Undisputed Capital</h2><p>2M+ IT professionals, 450+ GCCs, highest salary ranges but deepest talent pool. Cost premium of 15-20% over other metros.</p><h2>Hyderabad: The Rising Challenger</h2><p>Fast-growing, 10-15% lower costs than Bengaluru, strong in data engineering and cloud. Microsoft, Google, Amazon all expanding here.</p><h2>Pune: The Engineering Hub</h2><p>Strong automotive and manufacturing tech roots, growing SaaS ecosystem, 15-20% lower costs than Bengaluru.</p>`,
  },
];

async function seed() {
  console.log('🌱 Seeding blog posts...\n');

  let inserted = 0;
  let skipped = 0;

  for (const post of staticPosts) {
    try {
      // Check if slug already exists
      const existing = await db.select({ id: blogPosts.id })
        .from(blogPosts)
        .where(eq(blogPosts.slug, post.slug))
        .limit(1);

      if (existing.length > 0) {
        console.log(`⏭️  Skipped (exists): ${post.slug}`);
        skipped++;
        continue;
      }

      await db.insert(blogPosts).values(post);
      console.log(`✅ Inserted: ${post.slug}`);
      inserted++;
    } catch (err: any) {
      console.error(`❌ Failed: ${post.slug} — ${err.message}`);
    }
  }

  console.log(`\n📊 Seed complete: ${inserted} inserted, ${skipped} skipped`);
  await pool.end();
}

seed().catch((err) => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});
