import { Link } from 'wouter';
import { motion } from 'framer-motion';
import SEO, { buildFAQSchema } from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import SocialShareBar from '@/components/SocialShareBar';
import SocialFollowCTA from '@/components/SocialFollowCTA';
import {
  ArrowRight,
  CheckCircle2,
  Search,
  ClipboardCheck,
  UserCheck,
  Handshake,
  HeartHandshake,
  Clock,
  Shield,
  TrendingUp,
  Zap,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/**
 * How We Work — process page explaining TalPro's staffing methodology.
 *
 * Replaces the old /how-we-differ page. Absorbs FAQ content.
 * Design: Navy hero, 6-step process, comparison table, FAQ accordion, CTA.
 */

/* ── Process Steps ────────────────────────────────── */
const processSteps = [
  {
    icon: ClipboardCheck,
    title: 'Brief',
    subtitle: 'Day 1',
    description:
      'You share the role requirements, team culture, must-haves and nice-to-haves. We align on seniority, budget, timeline and engagement model.',
  },
  {
    icon: Search,
    title: 'Source',
    subtitle: 'Days 1–2',
    description:
      'Our domain-specialist recruiters activate pre-built talent pools, targeted outreach and referral networks specific to your industry and tech stack.',
  },
  {
    icon: Shield,
    title: 'Screen',
    subtitle: 'Days 2–3',
    description:
      'Every candidate goes through technical assessment, scenario-based evaluation, culture-fit interview and background verification before reaching you.',
  },
  {
    icon: UserCheck,
    title: 'Present',
    subtitle: 'Day 3–4',
    description:
      'You receive a curated shortlist with detailed profiles, assessment scores and our recruiter notes. Typically 3–5 high-signal candidates per role.',
  },
  {
    icon: Handshake,
    title: 'Hire',
    subtitle: 'Days 4–7',
    description:
      'We coordinate interviews, manage offer negotiation, handle compliance documentation and ensure a smooth acceptance process.',
  },
  {
    icon: HeartHandshake,
    title: 'Support',
    subtitle: 'Ongoing',
    description:
      'Post-join check-ins at 30, 60 and 90 days. Onboarding support, ramp tracking and a replacement guarantee if things don\'t work out.',
  },
];

/* ── Comparison Data ─────────────────────────────── */
const comparisonRows = [
  {
    dimension: 'Time to first shortlist',
    talpro: '48 hours',
    traditional: '2–4 weeks',
  },
  {
    dimension: 'Recruiter specialisation',
    talpro: 'Industry & tech-stack aligned',
    traditional: 'Generalist',
  },
  {
    dimension: 'Technical screening',
    talpro: 'In-house assessments + code reviews',
    traditional: 'Resume keyword matching',
  },
  {
    dimension: 'Candidate quality',
    talpro: '3–5 pre-vetted per shortlist',
    traditional: '15–20 unscreened resumes',
  },
  {
    dimension: 'Engagement models',
    talpro: 'Contract, C2H, permanent, pods',
    traditional: 'Permanent only',
  },
  {
    dimension: 'Post-placement support',
    talpro: '90-day check-ins + replacement guarantee',
    traditional: 'Invoice and move on',
  },
  {
    dimension: 'Compliance & documentation',
    talpro: 'Handled end-to-end',
    traditional: 'Client responsibility',
  },
];

/* ── FAQ Data ────────────────────────────────────── */
const faqItems = [
  {
    q: 'How quickly can you fill a role?',
    a: 'For common IT roles (full-stack, frontend, backend, QA, DevOps), we typically present the first shortlist within 48 hours. Niche roles like security architects or ML engineers may take 5–7 business days. Executive searches typically run 4–6 weeks.',
  },
  {
    q: 'What engagement models do you offer?',
    a: 'We offer contract staffing, contract-to-hire (C2H), permanent placement, dedicated pods/squads, and SOW-based engagements. You can switch models as your needs evolve — start with contract and convert to permanent, or scale a pod up and down.',
  },
  {
    q: 'How do you screen candidates technically?',
    a: 'Every candidate goes through a structured assessment designed for their role: coding challenges for developers, system-design discussions for architects, scenario role-plays for sales roles, and domain-specific evaluations for industry specialists. Our in-house tech team reviews all assessments.',
  },
  {
    q: 'What industries do you specialise in?',
    a: 'We have deep talent pools in FinTech & Financial Services, Healthcare & MedTech, Media & Entertainment, E-commerce & Retail, and Education & EdTech. We also staff across SaaS, Manufacturing, Logistics, Telecom and Energy.',
  },
  {
    q: 'What happens if a hire doesn\'t work out?',
    a: 'All permanent placements come with a replacement guarantee (typically 90 days). If the hire leaves or doesn\'t meet expectations within the guarantee period, we restart the search at no additional cost. For contract roles, we can provide a replacement within days.',
  },
  {
    q: 'Do you handle compliance and documentation?',
    a: 'Yes. We manage background verification, employment documentation, NDA execution, IP assignment agreements and any industry-specific compliance requirements (HIPAA screening for healthcare, PCI-DSS awareness for FinTech, etc.).',
  },
  {
    q: 'How is pricing structured?',
    a: 'For contract staffing, we charge a transparent markup on the contractor\'s bill rate. For permanent placement, we work on a success-fee basis (percentage of annual CTC). Executive searches are retained. We\'re happy to discuss specifics on a call.',
  },
  {
    q: 'Can you build an entire team, not just fill one role?',
    a: 'Absolutely. Team build-outs are one of our strengths — from founding engineer through to a full squad (frontend, backend, QA, DevOps, product). We handle hiring plans, role sequencing, and staggered onboarding so the team ramps effectively.',
  },
];

export default function HowWeWork() {
  return (
    <>
      <SEO
        title="How We Work — Our IT Staffing Process"
        description="TalPro's 6-step IT services process: Brief, Source, Screen, Present, Hire, Support. First shortlist in 48 hours, replacement guarantee included."
        path="/how-we-work"
        jsonLd={buildFAQSchema(faqItems)}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'How We Work' },
        ]}
      />
      <div className="max-w-5xl mx-auto px-4 py-3">
        <SocialShareBar title="How TalPro Works — From Brief to Placement in 48 Hours" url="/how-we-work" showLabels />
      </div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[hsl(222,47%,11%)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,hsl(187,92%,41%,0.12),transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest text-[hsl(187,92%,41%)] font-semibold mb-3"
          >
            Our Process
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto"
          >
            From Brief to{' '}
            <span className="text-[hsl(38,92%,50%)]">First Shortlist</span>
            <br className="hidden sm:block" />{' '}
            in 48 Hours
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            A rigorous, repeatable process that delivers pre-vetted tech talent
            fast — without sacrificing quality or compliance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold text-sm hover:brightness-105 transition-all cursor-pointer shadow-lg shadow-amber-500/20">
                Start Hiring <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { icon: Clock, value: '48h', label: 'First shortlist' },
              { icon: Shield, value: '3-layer', label: 'Screening' },
              { icon: TrendingUp, value: '90-day', label: 'Guarantee' },
              { icon: Zap, value: '90%+', label: 'Client retention' },
            ].map((s, i) => (
              <div key={s.label} className="text-center">
                <s.icon className="h-5 w-5 text-[hsl(187,92%,41%)] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/50">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6-Step Process ──────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">
              The TalPro Method
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Six steps to the right hire
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative">
                  <div className="bg-background border border-border rounded-2xl p-6 h-full hover:shadow-md transition-all">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-[hsl(222,47%,11%)] rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">
                          {i + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{step.title}</h3>
                          <span className="text-xs text-[hsl(187,92%,41%)] font-medium bg-[hsl(187,92%,41%)]/10 px-2 py-0.5 rounded-full">
                            {step.subtitle}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[hsl(160,84%,39%)] font-medium">
                      <Icon className="w-4 h-4" />
                      <span>
                        Step {i + 1} of {processSteps.length}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TalPro vs Traditional ────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">
              The Difference
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              TalPro vs. traditional staffing
            </h2>
          </div>

          <div className="rounded-2xl border border-border overflow-hidden bg-background">
            {/* Table header */}
            <div className="grid grid-cols-3 bg-[hsl(222,47%,11%)] text-white">
              <div className="p-4 text-sm font-semibold" />
              <div className="p-4 text-sm font-semibold text-center border-l border-white/10">
                TalPro
              </div>
              <div className="p-4 text-sm font-semibold text-center border-l border-white/10">
                Traditional Agency
              </div>
            </div>

            {/* Table rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={row.dimension}
                className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-background' : 'bg-muted/30'} ${i < comparisonRows.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div className="p-4 text-sm font-medium text-foreground">
                  {row.dimension}
                </div>
                <div className="p-4 text-sm text-center border-l border-border">
                  <span className="inline-flex items-center gap-1.5 text-[hsl(160,84%,39%)] font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                    {row.talpro}
                  </span>
                </div>
                <div className="p-4 text-sm text-center border-l border-border text-muted-foreground">
                  {row.traditional}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">
              Common Questions
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Everything you need to know
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-xl px-6 data-[state=open]:shadow-sm transition-all"
              >
                <AccordionTrigger className="text-left font-semibold text-sm md:text-base hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

    </>
  );
}
