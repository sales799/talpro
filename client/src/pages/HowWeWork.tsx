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
    subtitle: 'Scope',
    description:
      'You share the role requirements, team culture, must-haves and nice-to-haves. We align on seniority, budget, timeline and engagement model.',
  },
  {
    icon: Search,
    title: 'Source',
    subtitle: 'Map',
    description:
      'Our role-aligned recruiters use targeted outreach, referral networks, and mandate-specific search signals for the agreed talent market.',
  },
  {
    icon: Shield,
    title: 'Screen',
    subtitle: 'Evidence',
    description:
      'Candidates are assessed against the evidence plan agreed for the mandate, including skills, scenarios, communication, and joining constraints where applicable.',
  },
  {
    icon: UserCheck,
    title: 'Present',
    subtitle: 'Decide',
    description:
      'You receive a curated shortlist with recruiter notes, known risks, and recommended interview focus so the hiring team can make an informed decision.',
  },
  {
    icon: Handshake,
    title: 'Hire',
    subtitle: 'Close',
    description:
      'We coordinate interviews and offers, and support the documentation responsibilities explicitly included in the signed engagement.',
  },
  {
    icon: HeartHandshake,
    title: 'Support',
    subtitle: 'Review',
    description:
      'We follow the agreed onboarding and post-join review plan, record issues, and close the engagement against its mandate-specific terms.',
  },
];

/* ── Comparison Data ─────────────────────────────── */
const comparisonRows = [
  {
    dimension: 'Mandate calibration',
    talpro: 'Documents scope, evidence and constraints',
    traditional: 'Confirms business priorities and decision rights',
  },
  {
    dimension: 'Candidate evidence',
    talpro: 'Records screening notes and known risks',
    traditional: 'Runs the final interview and hiring decision',
  },
  {
    dimension: 'Service level',
    talpro: 'Proposes a mandate-specific delivery plan',
    traditional: 'Approves timing and internal response commitments',
  },
  {
    dimension: 'Commercial model',
    talpro: 'States the offer model and delivery boundary',
    traditional: 'Approves the signed engagement terms',
  },
  {
    dimension: 'Post-join review',
    talpro: 'Follows the agreed support plan',
    traditional: 'Owns employment and performance decisions',
  },
];

/* ── FAQ Data ────────────────────────────────────── */
const faqItems = [
  {
    q: 'How quickly can you fill a role?',
    a: 'The delivery plan and service level are agreed after the role, market, assessment depth, client decision process, and joining constraints are understood. Talpro does not publish a universal shortlist promise for every mandate.',
  },
  {
    q: 'What engagement models do you offer?',
    a: 'Talpro offers GCC Advisory and Workforce Launch, Technology Talent Solutions, Contract Staffing and Staff Augmentation, Permanent Hiring, Executive Search, and RPO and Managed Talent Capability. Each offer has a separate scope and commercial model.',
  },
  {
    q: 'How do you screen candidates technically?',
    a: 'Screening is agreed for each mandate and may include structured interviews, work samples, scenarios, reference validation, compensation context, and joining-risk review. Public copy does not claim evidence that was not actually collected.',
  },
  {
    q: 'Do you publish industry-specific capability claims?',
    a: 'Only after the claim registry contains evidence, an owner, approval and review date. Unsupported industry pages and claims remain unpublished.',
  },
  {
    q: 'What happens if a hire doesn\'t work out?',
    a: 'Any replacement or post-join support term must be stated in the signed engagement. Talpro does not publish a universal replacement promise or duration.',
  },
  {
    q: 'Do you handle compliance and documentation?',
    a: 'Responsibilities are mapped before work begins. Talpro performs only the checks and documentation support included in the signed engagement and does not present itself as legal, tax, payroll, or regulatory counsel.',
  },
  {
    q: 'How is pricing structured?',
    a: 'Commercial structure depends on the selected offer and signed mandate. Contract staffing, permanent hiring, executive search, RPO, and GCC workforce work are quoted and governed separately.',
  },
  {
    q: 'Can Talpro support a multi-role workforce mandate?',
    a: 'Yes, when the mandate is structured under the appropriate staffing, RPO, or GCC workforce offer. Talpro retains talent-delivery ownership; it does not claim software delivery ownership unless that separate capability is substantiated and approved.',
  },
];

export default function HowWeWork() {
  return (
    <>
      <SEO
        title="How We Work — Our IT Staffing Process"
        description="Talpro's governed talent process: Brief, Source, Screen, Present, Hire, and Support—with mandate-specific evidence, ownership, and service boundaries."
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
        <SocialShareBar title="How TalPro Works — Speed, Evidence and Ownership" url="/how-we-work" showLabels />
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
            <span className="text-[hsl(38,92%,50%)]">Evidence-Led Hiring</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            A governed process that aligns scope, candidate evidence, decision
            support, commercial terms, and named delivery ownership.
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
              { icon: Clock, value: 'Scoped', label: 'Service level' },
              { icon: Shield, value: 'Evidence', label: 'Screening' },
              { icon: TrendingUp, value: 'Named', label: 'Ownership' },
              { icon: Zap, value: 'Clear', label: 'Boundaries' },
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

      {/* ── Engagement ownership ─────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">
              Clear Responsibilities
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Engagement ownership
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
                Client
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
