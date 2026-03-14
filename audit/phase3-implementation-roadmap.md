# PHASE 3: IMPLEMENTATION ROADMAP
## TalPro India — Developer-Ready Sprint Plan
**Date:** 2026-03-14
**Source:** Phase 1 Discovery + Phase 2 Benchmark Analysis
**Scope:** 5 sprints (Sprint 6-10) covering all gaps identified

---

## SPRINT 6: BRAND CONSISTENCY & LEGACY PAGE REWRITES
**Duration:** 5 days | **Theme:** Kill the split personality
**Priority:** 🔴 CRITICAL — Every day these legacy pages exist, they erode trust

### 6.1 — Branded Favicon (30 min)
**Files:** `client/public/favicon.ico`, `client/public/favicon-32x32.png`, `client/public/favicon-192x192.png`, `client/public/apple-touch-icon.png`, `client/index.html`

**Task:**
- Create favicon from TalPro logo (gold "T" on navy background)
- Generate all sizes: 16x16, 32x32, 192x192, apple-touch-icon 180x180
- Add `<link rel="icon">` tags to `index.html`
- Update `manifest.json` with correct icon paths

### 6.2 — Remove Blog Preview from Homepage (15 min)
**File:** `client/src/pages/Home.tsx`

**Task:**
- Remove or comment out the blog preview section that shows "The State of IT Hiring in India: 2026 Outlook"
- This card links to an empty blog page — actively misleading
- Re-add when blog has real content

### 6.3 — Add Breadcrumbs Component (2 hours)
**Files:** New `client/src/components/Breadcrumbs.tsx`, modify `ServiceRoute` and `IndustryDetail` templates

**Wireframe:**
```
┌─────────────────────────────────────────────┐
│ Home  ›  Services  ›  IT Staffing           │
└─────────────────────────────────────────────┘
```

**Task:**
- Create `<Breadcrumbs>` component that accepts `items: {label, href}[]`
- Use Lucide `ChevronRight` as separator
- Style: `text-sm text-muted-foreground` with last item as `text-foreground font-medium`
- Add JSON-LD `BreadcrumbList` schema
- Insert into ServiceRoute template (below nav, above hero)
- Insert into IndustryDetail template

### 6.4 — Rewrite Terms of Service (2 hours)
**File:** `client/src/pages/TermsOfService.tsx`

**Task:**
- Complete rewrite — current version says "Professional Software Development Terms"
- New content: IT staffing services agreement terms
- Sections: Service Scope (staffing/recruitment), Client Obligations, Candidate Guarantees, Fees & Payment, Replacement Policy, Confidentiality, Non-Solicitation, Limitation of Liability, Governing Law (India)
- Match new design system (navy headings, clean typography, proper spacing)
- Use `<SEO>` component with correct title/description
- Remove old vibrant gradient styling

### 6.5 — Rewrite Privacy Policy (2 hours)
**File:** `client/src/pages/PrivacyPolicy.tsx`

**Task:**
- Rewrite for staffing context: candidate data handling, client data, cookie policy
- Match new design system
- Reference DPDP Act 2023 (India's data protection law) and GDPR (for international clients)
- Use `<SEO>` component
- Remove old vibrant gradient styling

### 6.6 — Rewrite Careers Page (1 day)
**File:** `client/src/pages/Careers.tsx`

**Wireframe:**
```
┌─────────────────────────────────────────────────────┐
│ HERO                                                 │
│ "Join India's Specialist IT Staffing Team"           │
│ "Help companies build the teams that build the       │
│  future. We're hiring recruiters, researchers,       │
│  and operations professionals."                      │
│                          [View Open Roles ↓]         │
├─────────────────────────────────────────────────────┤
│ WHY TALPRO  (3 cards)                               │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│ │ Specialist│ │ Growth   │ │ Culture  │             │
│ │ Focus    │ │ Path     │ │ First    │             │
│ └──────────┘ └──────────┘ └──────────┘             │
├─────────────────────────────────────────────────────┤
│ OPEN POSITIONS (from PyjamaHR or hardcoded)         │
│ ┌─────────────────────────────────────────┐         │
│ │ Senior IT Recruiter  │ Bangalore │ Apply│         │
│ │ Research Analyst      │ Remote    │ Apply│         │
│ │ Business Development  │ Mumbai    │ Apply│         │
│ └─────────────────────────────────────────┘         │
├─────────────────────────────────────────────────────┤
│ CTA: "Don't see a role? Send us your CV"            │
│                    [careers@talproindia.com]          │
└─────────────────────────────────────────────────────┘
```

**Task:**
- Complete rewrite with new design system
- Remove "450+ Projects Delivered", "500+ Team Members" stats (software company metrics)
- Replace with staffing-relevant stats: "500+ placements", "50+ active clients", "6 service lines"
- Fix PyjamaHR integration or maintain clean hardcoded roles
- Remove 50+ unused icon imports
- Use `<SEO>` component with title "Careers at TalPro — Join India's Specialist Staffing Team"

### 6.7 — Rewrite Case Studies as Staffing Success Stories (1 day)
**Files:** `client/src/pages/CaseStudies.tsx`, `client/src/pages/CaseStudyDetail.tsx`

**Wireframe:**
```
┌─────────────────────────────────────────────────────┐
│ HERO                                                 │
│ "Staffing Success Stories"                           │
│ "See how TalPro helped companies build high-         │
│  performing teams — fast."                           │
├─────────────────────────────────────────────────────┤
│ STATS BAR                                            │
│ 500+ Placements │ <48h Avg Shortlist │ 97% Retention│
├─────────────────────────────────────────────────────┤
│ CASE STUDY CARDS (3-6 stories)                      │
│ ┌──────────────────┐ ┌──────────────────┐           │
│ │ FinTech Scale-up  │ │ GCC Team Build   │           │
│ │ 15 engineers      │ │ 40-person center  │           │
│ │ in 6 weeks        │ │ in 12 weeks       │           │
│ │ [Read Story →]    │ │ [Read Story →]    │           │
│ └──────────────────┘ └──────────────────┘           │
└─────────────────────────────────────────────────────┘
```

**Case Study Template (each story):**
```
┌─────────────────────────────────────────────────────┐
│ [Industry Tag]  [Service Tag]                        │
│                                                      │
│ THE CHALLENGE                                        │
│ "Client needed 15 full-stack engineers for a new     │
│  payments platform. Internal HR had been searching   │
│  for 3 months with 2 hires."                         │
│                                                      │
│ THE APPROACH                                         │
│ • Deployed 2-person sourcing pod                     │
│ • Custom technical assessment for payments domain    │
│ • 3-layer screening: skills + culture + motivation   │
│                                                      │
│ THE RESULTS                                          │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │
│ │ 15     │ │ 6 wks  │ │ 97%    │ │ 4.8/5  │        │
│ │ hires  │ │ to fill│ │ retain │ │ client │        │
│ └────────┘ └────────┘ └────────┘ └────────┘        │
│                                                      │
│ CLIENT QUOTE                                         │
│ "TalPro's speed and quality transformed our          │
│  hiring pipeline."                                   │
│                                    — VP Eng, [Co]    │
├─────────────────────────────────────────────────────┤
│ CTA: "Need similar results?" [Talk to Us →]          │
└─────────────────────────────────────────────────────┘
```

**Task:**
- Replace software project case studies with staffing placement stories
- Create config-driven case study data (similar to services.ts pattern)
- Use new design system
- Add metric cards (hires, time, retention, satisfaction)
- Industry/service tags for filtering
- Use `<SEO>` component

### 6.8 — Fix Blog Page or Gate It (2 hours)
**File:** `client/src/pages/Blog.tsx`

**Task (choose one):**
- **Option A (Recommended):** Rewrite as clean "coming soon" page matching design system. Remove complex filter/search UI. Add newsletter signup form ("Get notified when we publish our first insights").
- **Option B:** Remove `/blog` route from App.tsx and footer links until content exists.
- Either way: Fix title from "TalPro Solutions" to "TalPro" and remove software dev language.

---

## SPRINT 7: CONTENT ENGINE & TRUST INFRASTRUCTURE
**Duration:** 5 days | **Theme:** Build the content moat

### 7.1 — Foundational Blog Posts (2-3 days content, 1 day implementation)
**Files:** Blog content in database or markdown files, `client/src/pages/Blog.tsx` (if rewritten in Sprint 6)

**5 Foundational Posts:**
1. "The State of IT Hiring in India: 2026 Market Report" — hiring trends, hot skills, salary ranges
2. "Contract vs Permanent: Which IT Staffing Model Is Right for Your Team?" — education content
3. "How to Set Up a GCC in India: A Step-by-Step Guide" — positions TalPro's GCC Accelerator
4. "5 Signs Your IT Recruitment Process Is Broken (And How to Fix It)" — pain-point content
5. "India's Top Tech Hubs: City-by-City Talent Guide" — Bangalore vs Hyderabad vs Pune vs NCR

**Implementation:**
- Blog post schema in database (title, slug, excerpt, body, author, date, tags, coverImage)
- Blog listing page with card grid and tag filtering
- Blog detail page with reading time, author info, related posts, share buttons, CTA

### 7.2 — India IT Salary Guide (1-2 days)
**Files:** New page at `/salary-guide`, new route in App.tsx, new data file

**Wireframe:**
```
┌─────────────────────────────────────────────────────┐
│ HERO                                                 │
│ "India IT Salary Guide 2026"                         │
│ "Benchmark salaries for 50+ tech roles across        │
│  Bangalore, Hyderabad, Pune, NCR, and Chennai"       │
│                [Download PDF ↓] [View Online ↓]      │
├─────────────────────────────────────────────────────┤
│ ROLE FILTER                                          │
│ [Frontend ▾] [Backend ▾] [DevOps ▾] [Data ▾] [All] │
├─────────────────────────────────────────────────────┤
│ SALARY TABLE                                         │
│ ┌──────────────┬──────────┬──────────┬─────────┐    │
│ │ Role         │ Junior   │ Mid      │ Senior  │    │
│ │ React Dev    │ 6-10 LPA │ 12-18   │ 20-35   │    │
│ │ Node.js Dev  │ 5-9 LPA  │ 11-16   │ 18-30   │    │
│ │ DevOps Eng   │ 8-12 LPA │ 15-22   │ 25-40   │    │
│ └──────────────┴──────────┴──────────┴─────────┘    │
├─────────────────────────────────────────────────────┤
│ TRENDS SECTION                                       │
│ "Hottest roles", "Fastest salary growth",            │
│ "Most in-demand skills"                              │
├─────────────────────────────────────────────────────┤
│ GATED PDF DOWNLOAD                                   │
│ "Get the complete 2026 salary report"                │
│ [Name] [Email] [Company] [Download →]                │
└─────────────────────────────────────────────────────┘
```

**Task:**
- Create salary data file (JSON) with roles, experience levels, city ranges
- Build filterable salary table component
- Add gated PDF download form (email capture → lead nurture)
- Add to navigation under "Insights" dropdown
- JSON-LD structured data for the page

### 7.3 — Staffing Case Studies Content (1 day)
**Task:** Create 3-4 realistic staffing case studies with real metrics:

1. **FinTech Scale-up**: 15 engineers, 6-week fill, React/Node stack, 97% retention
2. **GCC Team Build**: 40-person engineering center for US SaaS company, 12-week ramp
3. **Sales Team Build**: 8 enterprise AEs for manufacturing company, role-play assessment
4. **Emergency Backfill**: CTO-level executive search, confidential, 4-week placement

### 7.4 — Trust Infrastructure (1 day)
**Files:** `client/src/components/Footer.tsx`, new `client/src/components/TrustBadges.tsx`

**Task:**
- Add compliance/certification section to footer: MSME, PF/ESI compliant, ISO (if applicable)
- Add "Trusted by 50+ companies" badge with select client logos
- Add real leadership photos to About page (request from team)
- Update LinkedIn URLs in About page (request real URLs from team)
- Add a small "Awards & Recognition" section if any exist

---

## SPRINT 8: CONVERSION & ENGAGEMENT
**Duration:** 5 days | **Theme:** Convert visitors to leads

### 8.1 — WhatsApp Floating Button (1 hour)
**File:** `client/src/components/WhatsAppButton.tsx`, add to Layout

**Task:**
- Green floating button (bottom-right, above fold)
- Links to `wa.me/91XXXXXXXXXX` with pre-filled message
- Hide on Contact page (form is the CTA there)
- Mobile: ensure it doesn't overlap navigation

### 8.2 — Google Maps Embed on Contact Page (30 min)
**File:** `client/src/pages/Contact.tsx`

**Task:**
- Add Google Maps iframe below contact details
- Show TalPro office location
- Responsive: full-width on mobile

### 8.3 — Calendly "Schedule a Call" Integration (2 hours)
**File:** `client/src/pages/Contact.tsx` or new modal component

**Task:**
- Add "Schedule a Call" button alongside "Submit Brief" form
- Embed Calendly inline or as popup
- Alternative: simple time-slot picker that emails the team

### 8.4 — Testimonials on Service Pages (2 hours)
**Files:** `client/src/config/services.ts` (add testimonials to config), `ServiceRoute` template

**Task:**
- Add `testimonial?: { quote: string; author: string; role: string; company: string }` to Service type
- Create `<Testimonial>` component (blockquote style with author attribution)
- Insert between process timeline and CTA on each service detail page

### 8.5 — Newsletter Signup Component (2 hours)
**File:** New `client/src/components/NewsletterSignup.tsx`, add to Blog page and Footer

**Task:**
- Simple email input + submit button
- Copy: "Get weekly IT hiring insights for India"
- Integrate with email service (Mailchimp, Resend, or simple API endpoint)
- Add to Blog page and optionally to Footer

### 8.6 — Contact Form Anti-Spam (1 hour)
**File:** `client/src/pages/Contact.tsx`, `server/routes.ts`

**Task:**
- Add honeypot field (hidden input that bots fill but humans don't)
- Add rate limiting on server-side (max 5 submissions per IP per hour)
- Consider adding Turnstile (Cloudflare's free CAPTCHA alternative)

---

## SPRINT 9: CANDIDATE EXPERIENCE & ADVANCED UX
**Duration:** 5 days | **Theme:** Serve the other half of your audience

### 9.1 — "For Candidates" Section (2-3 days)
**Files:** New page at `/for-candidates`, new components, nav update

**Wireframe:**
```
┌─────────────────────────────────────────────────────┐
│ HERO                                                 │
│ "Find Your Next Tech Role"                           │
│ "TalPro connects top tech professionals with         │
│  India's most exciting companies. Get discovered."   │
│                [Upload Your CV →] [Browse Roles →]   │
├─────────────────────────────────────────────────────┤
│ HOW IT WORKS (for candidates)                        │
│ 1. Submit your profile                               │
│ 2. Get matched to relevant openings                  │
│ 3. Interview prep & offer support                    │
│ 4. Onboarding & career growth                        │
├─────────────────────────────────────────────────────┤
│ FEATURED ROLES (if job board exists)                 │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│ │ Sr React │ │ DevOps   │ │ Data Eng │             │
│ │ BLR, 25L │ │ HYD, 30L │ │ Remote   │             │
│ └──────────┘ └──────────┘ └──────────┘             │
├─────────────────────────────────────────────────────┤
│ SALARY GUIDE PREVIEW                                 │
│ "Know your market worth" [View Salary Guide →]       │
├─────────────────────────────────────────────────────┤
│ CANDIDATE TESTIMONIALS                               │
│ "TalPro helped me land my dream role at..."          │
└─────────────────────────────────────────────────────┘
```

**Task:**
- Create candidate-facing landing page
- Add "For Employers" / "For Candidates" split in nav (or header pills)
- CV upload form (file input → server endpoint → email to team)
- Link to Salary Guide
- Candidate testimonials (different from employer testimonials)

### 9.2 — Site-Wide Search (1 day)
**File:** New `client/src/components/SearchModal.tsx`, nav update

**Task:**
- Search icon in nav bar → opens modal with search input
- Client-side search across services, industries, blog posts
- Use Fuse.js for fuzzy matching
- Search results grouped: Services, Industries, Blog Posts, Pages
- Keyboard shortcut: `Cmd+K` / `Ctrl+K`

### 9.3 — Breadcrumb JSON-LD Enhancement (2 hours)
**Task:** Ensure BreadcrumbList schema is emitted for all detail pages for Google rich results.

### 9.4 — Performance Optimization (1 day)
**Task:**
- Audit bundle size with `vite-bundle-visualizer`
- Lazy-load heavy components (testimonial carousel, animations)
- Add `loading="lazy"` to all images
- Consider image optimization pipeline (WebP conversion)
- Add `preconnect` hints for external resources
- Target Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

---

## SPRINT 10: ADVANCED FEATURES & POLISH
**Duration:** 5 days | **Theme:** Competitive differentiation

### 10.1 — India IT Salary Calculator (2 days)
**Files:** New page/component, new data model

**Task:**
- Interactive calculator: select Role + Experience + City → show salary range
- Visualization: bar chart or range slider
- Compare: "You're earning X, the market median is Y"
- Lead capture: "Get a personalized report" → email
- This becomes the #1 organic traffic driver

### 10.2 — "Which Staffing Model?" Quiz (1 day)
**File:** New interactive component

**Task:**
- 5-question quiz: team size, timeline, budget, duration, flexibility needs
- Result: recommended staffing model (Contract, C2H, Permanent, Pods, Executive Search)
- CTA at end: "Talk to us about [recommended model]" → Contact form pre-filled

### 10.3 — Dark Mode Support (4 hours)
**Task:**
- CSS custom properties already partially set up via Tailwind
- Add theme toggle in nav/footer
- Ensure all components work in dark mode
- Store preference in localStorage
- Respect `prefers-color-scheme`

### 10.4 — Performance & SEO Final Pass
- Validate all pages with Lighthouse (target 90+ on all metrics)
- Validate structured data with Google Rich Results Test
- Submit updated sitemap to Google Search Console
- Set up Google Analytics 4 with conversion tracking
- Set up Microsoft Clarity for session recordings

---

## IMPLEMENTATION SEQUENCE SUMMARY

```
Sprint 6 (Week 1): IDENTITY FIXES
├── Favicon + breadcrumbs + blog fix (Day 1)
├── Terms of Service rewrite (Day 2)
├── Privacy Policy rewrite (Day 2)
├── Careers page rewrite (Day 3)
├── Case Studies rewrite (Day 4)
└── Blog page rewrite + testing (Day 5)

Sprint 7 (Week 2): CONTENT ENGINE
├── Blog infrastructure + 2 posts (Days 1-2)
├── Salary Guide page + data (Days 2-3)
├── Case study content creation (Day 4)
└── Trust badges + real photos (Day 5)

Sprint 8 (Week 3): CONVERSION
├── WhatsApp + Maps + Calendly (Day 1)
├── Testimonials on service pages (Day 2)
├── Newsletter signup (Day 3)
├── Form anti-spam (Day 3)
└── Testing + deployment (Days 4-5)

Sprint 9 (Week 4): CANDIDATE EXPERIENCE
├── For Candidates page (Days 1-2)
├── Site-wide search (Day 3)
├── Performance optimization (Day 4)
└── SEO & schema enhancements (Day 5)

Sprint 10 (Week 5): DIFFERENTIATION
├── Salary Calculator tool (Days 1-2)
├── Staffing Model Quiz (Day 3)
├── Dark mode (Day 4)
└── Final audit & launch polish (Day 5)
```

---

## POST-LAUNCH ONGOING

| Item | Cadence | Owner |
|------|---------|-------|
| Blog posts | 2/week minimum | Content team |
| Salary data updates | Quarterly | Research team |
| Case study additions | 1/month | Sales + Marketing |
| Testimonial collection | Ongoing | Account managers |
| Performance monitoring | Weekly | Engineering |
| SEO rank tracking | Weekly | Marketing |
| Conversion rate analysis | Monthly | Growth |

---

## EXPECTED SCORE IMPACT

| Dimension | Current | After Sprint 6 | After Sprint 7 | After Sprint 10 |
|-----------|:-------:|:--------------:|:--------------:|:---------------:|
| Brand & Identity | 5.8 | **8.0** | 8.5 | 9.0 |
| Information Architecture | 5.7 | **6.5** | 7.0 | 8.0 |
| User Experience | 5.5 | **6.0** | 6.5 | 8.0 |
| Visual Design | 6.5 | **7.5** | 8.0 | 8.5 |
| Content Quality | 2.6 | **3.5** | **7.0** | 8.0 |
| Conversion Architecture | 3.5 | **4.0** | 5.0 | **7.5** |
| Trust & Credibility | 2.3 | **4.0** | **6.5** | 7.5 |
| **COMPOSITE** | **48** | **57** | **68** | **80** |

**Target: 80/100** — Competitive with TeamLease/Quess, above Xpheno/CIEL HR, approaching Hays India level.

---

*Implementation roadmap generated from Phase 1 Discovery Crawl + Phase 2 Benchmark Gap Analysis. All file paths reference the TALPRO codebase at `/Users/bhaskaranand/TALPRO/`.*
