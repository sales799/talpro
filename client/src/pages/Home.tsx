import { useRef, useState } from 'react';
import SEO, { organizationSchema, websiteSearchSchema, buildBreadcrumbSchema } from '@/components/SEO';
import { Link } from 'wouter';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Users,
  CreditCard,
  Monitor,
  Heart,
  ShoppingCart,
  GraduationCap,
  Phone,
  Building2,
  FileCheck,
} from 'lucide-react';

import LogoTicker from '@/components/LogoTicker';
import TrustBadges from '@/components/TrustBadges';
import StatsBar from '@/components/StatsBar';
import BentoGrid from '@/components/BentoGrid';
import ProcessTimeline from '@/components/ProcessTimeline';
import TestimonialCarousel from '@/components/TestimonialCarousel';

import SocialFollowCTA from '@/components/SocialFollowCTA';

// ── Industry data for the "Industries Served" section ──────────────
import { getIndustriesForNavigation } from '@/pages/industries/config';

const industries = getIndustriesForNavigation();

// Map icon string names → Lucide components (same as config but local for perf)
const iconMap: Record<string, React.ElementType> = {
  CreditCard,
  Monitor,
  Heart,
  ShoppingCart,
  GraduationCap,
};

// ── Hero Section ───────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-12 md:pt-28 md:pb-20">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(13,148,136,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(13,148,136,0.06)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="absolute inset-x-0 top-0 h-40 pointer-events-none bg-gradient-to-b from-white via-white/80 to-transparent dark:from-background dark:via-background/90" />
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-background via-background/90 to-transparent" />

      <div className="absolute left-0 top-24 hidden h-px w-1/3 bg-gradient-to-r from-transparent via-accent/40 to-transparent lg:block" />
      <div className="absolute right-0 bottom-20 hidden h-px w-1/3 bg-gradient-to-r from-transparent via-warning/50 to-transparent lg:block" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[1.02fr_0.98fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-warning/30 mb-5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-semibold text-primary tracking-wide">
                15+ years · Bengaluru-led GCC staffing specialists
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.04] mb-6">
              Your first serious tech shortlist,{' '}
              <span className="text-accent">
                inside 48 hours
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
              TALPRO helps GCCs and growth companies hire pre-vetted developers,
              cloud architects, data engineers, and tech leaders across India.
              Precise search, compliant onboarding, and no upfront fee.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-warning text-warning-foreground font-semibold text-sm hover:bg-warning/90 transition-all cursor-pointer shadow-lg shadow-warning/20">
                  Get Talent
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/for-candidates">
                <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-border bg-background/90 font-semibold text-sm hover:bg-muted transition-colors cursor-pointer">
                  Find Roles
                </span>
              </Link>
            </div>

            <div className="grid max-w-xl grid-cols-3 gap-3 text-sm">
              {[
                ['<48hr', 'first shortlist'],
                ['97%', 'client retention'],
                ['90-day', 'replacement cover'],
              ].map(([value, label]) => (
                <div key={value} className="border-l-2 border-accent/40 bg-white/70 px-3 py-2 dark:bg-white/5">
                  <p className="font-bold text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="hidden md:block"
          >
            <div className="relative">
              <div className="absolute -left-4 top-8 h-full w-full border border-accent/20 bg-accent/5" />
              <div className="relative border border-border bg-white shadow-2xl shadow-primary/10 dark:bg-card">
                <div className="border-b border-border px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase text-muted-foreground">Live hiring brief</p>
                      <h2 className="mt-1 text-xl font-bold">Senior Cloud Platform Team</h2>
                    </div>
                    <span className="rounded-full bg-warning/15 px-3 py-1 text-xs font-bold text-primary">
                      Day 2
                    </span>
                  </div>
                </div>

                <div className="grid gap-4 p-5">
                  <div className="grid grid-cols-4 gap-2">
                    {['Brief', 'Map', 'Screen', 'Shortlist'].map((step, i) => (
                      <div key={step} className="space-y-2">
                        <div className={`h-1.5 ${i < 3 ? 'bg-accent' : 'bg-warning'}`} />
                        <p className="text-[11px] font-semibold uppercase text-muted-foreground">{step}</p>
                      </div>
                    ))}
                  </div>

                  {[
                    ['AK', 'Platform Architect', 'Kubernetes · AWS · Terraform', '92% match'],
                    ['SR', 'Staff DevOps Engineer', 'CI/CD · Observability · SRE', '89% match'],
                    ['NV', 'Data Platform Lead', 'Spark · Lakehouse · Governance', '87% match'],
                  ].map(([initials, role, skills, match], i) => (
                    <motion.div
                      key={role}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: 0.35 + i * 0.12 }}
                      className="flex items-center justify-between gap-4 border border-border bg-background p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                          {initials}
                        </div>
                        <div>
                          <p className="font-semibold">{role}</p>
                          <p className="text-xs text-muted-foreground">{skills}</p>
                        </div>
                      </div>
                      <span className="whitespace-nowrap rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                        {match}
                      </span>
                    </motion.div>
                  ))}

                  <div className="flex items-center justify-between border-t border-border pt-4 text-sm">
                    <span className="inline-flex items-center gap-2 text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-accent" />
                      Compliance pack ready
                    </span>
                    <span className="inline-flex items-center gap-2 font-semibold text-primary">
                      <Zap className="h-4 w-4 text-warning" />
                      Interviews booked
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── How We're Different ────────────────────────────────────────────
const differentiators = [
  {
    icon: Zap,
    title: 'Speed',
    headline: 'First profiles in 48 hours',
    desc: 'Our pre-vetted talent pool means we can surface qualified candidates the same week you brief us — not the same month.',
    color: 'text-warning',
    bg: 'bg-warning/15',
  },
  {
    icon: ShieldCheck,
    title: 'Quality',
    headline: 'Multi-layer screening',
    desc: 'Technical assessments, behavioral interviews, and reference checks — every candidate is vetted before you ever see their profile.',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    icon: Users,
    title: 'Scale',
    headline: '500+ active tech professionals',
    desc: 'From a single developer to an entire GCC team, we have the bench strength to staff any tech function at any scale.',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
];

function HowWereDifferent() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">
            Why TALPRO
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Built for high-stakes tech hiring
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {differentiators.map((d, i) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="rounded-lg border border-border bg-background p-8 text-center hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <div
                  className={`inline-flex items-center justify-center h-14 w-14 rounded-lg ${d.bg} mb-5`}
                >
                  <Icon className={`h-6 w-6 ${d.color}`} />
                </div>
                <p className={`text-xs font-bold uppercase tracking-widest ${d.color} mb-1`}>
                  {d.title}
                </p>
                <h3 className="font-bold text-lg mb-3">{d.headline}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {d.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Industries Served ──────────────────────────────────────────────
function IndustriesServed() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">
            Industries
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Deep domain expertise where it matters
          </h2>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex md:grid md:grid-cols-5 gap-4 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory md:snap-none scrollbar-hide">
          {industries.map((ind, i) => {
            const Icon = iconMap[ind.icon] || Monitor;
            return (
              <motion.div
                key={ind.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="snap-start shrink-0 w-56 md:w-auto"
              >
                <Link href={`/industries/${ind.slug}`}>
                  <div className="group h-full rounded-lg border border-border bg-background p-6 hover:-translate-y-1 hover:shadow-lg hover:border-accent/40 transition-all cursor-pointer">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10 mb-4">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">
                      {ind.shortName || ind.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {ind.tagline}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-accent mt-3 group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Employer Branding ─────────────────────────────────────────────
const employerFeatures = [
  {
    icon: ShieldCheck,
    title: 'Compliance-First Hiring',
    desc: "Navigate India's Labour Codes 2025, DPDPA, and GCC-specific compliance requirements with zero risk. Every placement is audit-ready.",
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'hover:border-accent/40',
  },
  {
    icon: Zap,
    title: '48-Hour Talent Pipeline',
    desc: 'Pre-vetted profiles delivered within 48 hours. Our active bench of 500+ IT professionals means no cold-start delays.',
    color: 'text-[hsl(38,92%,50%)]',
    bg: 'bg-warning/15',
    border: 'hover:border-[hsl(38,92%,50%)]/40',
  },
  {
    icon: Building2,
    title: 'GCC Scale-Up Expertise',
    desc: "From founding team to 200+ engineers. We've scaled GCCs for Fortune 500 companies across Bengaluru, Hyderabad, and Pune.",
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'hover:border-accent/40',
  },
  {
    icon: FileCheck,
    title: 'Transparent SLAs',
    desc: 'Published SLAs: 48hr first shortlist, 5-day interview cycle, 90-day replacement guarantee. No hidden fees, no surprises.',
    color: 'text-[hsl(222,47%,11%)] dark:text-white',
    bg: 'bg-[hsl(222,47%,11%)]/10 dark:bg-white/10',
    border: 'hover:border-[hsl(222,47%,11%)]/40 dark:hover:border-white/40',
  },
];

const statsRibbon = [
  '\u20B90 Upfront',
  '90-Day Guarantee',
  'ISO-Ready Process',
  '15+ Year Track Record',
];

function EmployerBranding() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">
            For Employers
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Your GCC staffing command center
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to build and scale engineering teams in India,
            backed by 15+ years of IT staffing expertise.
          </p>
        </div>

        {/* 2x2 Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {employerFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-lg border border-border bg-background p-8 hover:-translate-y-1 hover:shadow-lg transition-all ${f.border}`}
              >
                <div
                  className={`inline-flex items-center justify-center h-14 w-14 rounded-lg ${f.bg} mb-5`}
                >
                  <Icon className={`h-6 w-6 ${f.color}`} />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
        >
          {statsRibbon.map((stat, i) => (
            <span key={stat} className="flex items-center gap-x-6">
              <span className="font-semibold">{stat}</span>
              {i < statsRibbon.length - 1 && (
                <span className="hidden sm:inline text-border">|</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Final CTA Section ──────────────────────────────────────────────
function CTASection() {
  const [email, setEmail] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 bg-[hsl(222,47%,11%)] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-warning/60 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center"
      >
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Ready to build your dream team?
        </h2>
        <p className="text-white/60 text-lg mb-8 max-w-lg mx-auto">
          Tell us what you need. Get a curated shortlist of pre-vetted
          candidates within 48 hours — no commitment required.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) {
              window.location.href = `/contact?email=${encodeURIComponent(email.trim())}`;
            } else {
              window.location.href = '/contact';
            }
          }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-warning/70 transition-all"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-warning text-warning-foreground font-semibold text-sm hover:bg-warning/90 transition-all shadow-lg shadow-warning/20"
          >
            Get Talent
          </button>
        </form>

        {/* Social proof below CTA */}
        <div className="flex items-center justify-center gap-6 mt-8 text-white/50 text-xs">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            97% client retention
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-warning" />
            48hr first shortlist
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-accent" />
            500+ placements
          </span>
        </div>

        {/* Click-to-call on mobile */}
        <div className="mt-6 md:hidden">
          <a
            href="tel:+918040948407"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
          >
            <Phone className="h-4 w-4" />
            Or call us: +91 80 4094 8407
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// ── Page Composition ───────────────────────────────────────────────
const homeBreadcrumb = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://talproindia.com/' },
]);

export default function Home() {
  return (
    <>
      <SEO
        title="India's Specialist IT Staffing Partner | Hire Top Tech Talent"
        description="TALPRO delivers pre-vetted developers, engineers, and tech leaders in under 48 hours. IT staffing, engineering recruitment, executive search, and GCC setup across India."
        path="/"
        jsonLd={[organizationSchema, websiteSearchSchema, homeBreadcrumb]}
      />
      <Hero />
      <LogoTicker />
      <TrustBadges />
      <StatsBar />
      <ProcessTimeline />
      <HowWereDifferent />
      <BentoGrid />
      <IndustriesServed />
      <EmployerBranding />
      <TestimonialCarousel />
      <SocialFollowCTA
        heading="Get hiring insights in your feed"
        subtitle="Salary trends, market reports, and staffing tips for India tech leaders."
      />
      <CTASection />
    </>
  );
}
