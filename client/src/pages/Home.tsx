import { useRef, useState } from 'react';
import SEO, { organizationSchema, buildBreadcrumbSchema } from '@/components/SEO';
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
      {/* Subtle gradient backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-5">
              <span className="h-2 w-2 rounded-full bg-[hsl(160,84%,39%)] animate-pulse" />
              <span className="text-xs font-semibold text-accent tracking-wide">
                15+ Years · GCC Staffing Specialists
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              We fill your hardest{' '}
              <span className="text-accent">
                tech roles
              </span>{' '}
              in 48 hours
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-8">
              Pre-vetted developers, cloud architects, and tech leaders for GCCs
              and enterprises across India. Contract, permanent, or executive search —
              with a 97% client retention rate.
            </p>

            {/* Dual-audience CTAs */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold text-sm hover:brightness-105 transition-all cursor-pointer shadow-lg shadow-[hsl(38,92%,50%)]/20">
                  I&apos;m Hiring
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/for-candidates">
                <span className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border bg-background font-semibold text-sm hover:bg-muted transition-colors cursor-pointer">
                  I&apos;m Looking for Work
                </span>
              </Link>
            </div>

            {/* Social proof strip below CTAs */}
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {['bg-accent/80', 'bg-primary/60', 'bg-[hsl(160,84%,39%)]/80', 'bg-[hsl(38,92%,50%)]/70'].map((bg, i) => (
                  <div key={i} className={`h-8 w-8 rounded-full ${bg} border-2 border-background flex items-center justify-center`}>
                    <Users className="h-3.5 w-3.5 text-white" />
                  </div>
                ))}
              </div>
              <p>
                <span className="font-semibold text-foreground">500+</span> placements made for{' '}
                <span className="font-semibold text-foreground">GCCs & enterprises</span>
              </p>
            </div>
          </motion.div>

          {/* Right — abstract visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="hidden md:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent/20 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-6 rounded-full border border-border" />
              <div className="absolute inset-12 rounded-full border border-accent/30" />

              {/* Center badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-32 w-32 rounded-3xl bg-gradient-to-br from-accent/20 to-primary/10 border border-accent/30 flex items-center justify-center shadow-lg">
                  <Users className="h-14 w-14 text-accent" />
                </div>
              </div>

              {/* Floating satellite badges */}
              <div className="absolute top-6 right-8 h-14 w-14 rounded-2xl bg-background border border-border shadow-md flex items-center justify-center animate-bounce" style={{ animationDuration: '3s' }}>
                <Zap className="h-6 w-6 text-[hsl(38,92%,50%)]" />
              </div>
              <div className="absolute bottom-10 left-4 h-12 w-12 rounded-xl bg-background border border-border shadow-md flex items-center justify-center animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <ShieldCheck className="h-5 w-5 text-[hsl(160,84%,39%)]" />
              </div>

              {/* Trust badge — bottom right */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-6 right-0 bg-background border border-border rounded-xl px-4 py-2.5 shadow-lg"
              >
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Avg time to shortlist</p>
                <p className="text-xl font-bold text-accent">&lt;48 hrs</p>
              </motion.div>
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
    color: 'text-[hsl(38,92%,50%)]',
    bg: 'bg-[hsl(38,92%,50%)]/10',
  },
  {
    icon: ShieldCheck,
    title: 'Quality',
    headline: 'Multi-layer screening',
    desc: 'Technical assessments, behavioral interviews, and reference checks — every candidate is vetted before you ever see their profile.',
    color: 'text-[hsl(160,84%,39%)]',
    bg: 'bg-[hsl(160,84%,39%)]/10',
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Built different for tech hiring
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
                className="rounded-2xl border border-border bg-background p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div
                  className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl ${d.bg} mb-5`}
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
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
                  <div className="group h-full rounded-2xl border border-border bg-background p-6 hover:shadow-lg hover:border-accent/40 transition-all cursor-pointer">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-accent/10 mb-4">
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
    color: 'text-[hsl(160,84%,39%)]',
    bg: 'bg-[hsl(160,84%,39%)]/10',
    border: 'hover:border-[hsl(160,84%,39%)]/40',
  },
  {
    icon: Zap,
    title: '48-Hour Talent Pipeline',
    desc: 'Pre-vetted profiles delivered within 48 hours. Our active bench of 500+ IT professionals means no cold-start delays.',
    color: 'text-[hsl(38,92%,50%)]',
    bg: 'bg-[hsl(38,92%,50%)]/10',
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
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
                className={`rounded-2xl border border-border bg-background p-8 hover:shadow-lg transition-all ${f.border}`}
              >
                <div
                  className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl ${f.bg} mb-5`}
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
      {/* Gradient accent blob */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[hsl(38,92%,50%)]/10 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
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
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent/60 transition-all"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold text-sm hover:brightness-105 transition-all shadow-lg shadow-[hsl(38,92%,50%)]/20"
          >
            Schedule a Consultation
          </button>
        </form>

        {/* Social proof below CTA */}
        <div className="flex items-center justify-center gap-6 mt-8 text-white/50 text-xs">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[hsl(160,84%,39%)]" />
            97% client retention
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-[hsl(38,92%,50%)]" />
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
        jsonLd={[organizationSchema, homeBreadcrumb]}
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
      <CTASection />
    </>
  );
}
