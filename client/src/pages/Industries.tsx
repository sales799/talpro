import { useRef } from 'react';
import SEO from '@/components/SEO';
import { Link } from 'wouter';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  CreditCard,
  Monitor,
  Heart,
  ShoppingCart,
  GraduationCap,
  CheckCircle2,
  Globe,
  Users,
  TrendingUp,
} from 'lucide-react';
import {
  industriesConfig,
  type IndustrySlug,
  industryIconMap,
} from '@/pages/industries/config';

/**
 * Industries Hub — overview page for all 5 industry verticals.
 *
 * Data-driven: pulls from industries/config.ts so content changes
 * propagate automatically. Follows the same design language as
 * the Services Hub page.
 */

/* Icon map keyed by lucide icon name */
const iconLookup: Record<string, React.ElementType> = {
  CreditCard,
  Monitor,
  Heart,
  ShoppingCart,
  GraduationCap,
};

/* Accent gradient per industry slug for visual variety */
const accentMap: Record<string, string> = {
  'fintech-financial-services': 'from-amber-500/10 to-orange-500/10',
  'media-entertainment-technology': 'from-violet-500/10 to-purple-500/10',
  'healthcare-medical-technology': 'from-emerald-500/10 to-teal-500/10',
  'ecommerce-retail-solutions': 'from-cyan-500/10 to-blue-500/10',
  'education-edtech-solutions': 'from-rose-500/10 to-pink-500/10',
};

/* Why TalPro differentiators */
const differentiators = [
  {
    icon: Globe,
    title: 'Deep Domain Knowledge',
    desc: 'Our recruiters specialise by vertical — so they speak your industry language and know exactly what skills matter.',
  },
  {
    icon: Users,
    title: 'Pre-Built Talent Pools',
    desc: 'Thousands of pre-vetted professionals tagged by industry, ready to be shortlisted the same week you brief us.',
  },
  {
    icon: TrendingUp,
    title: 'Compliance-Ready Talent',
    desc: 'From HIPAA to PCI-DSS, we screen for domain-specific certifications and regulatory awareness upfront.',
  },
];

const industries = Object.entries(industriesConfig) as [IndustrySlug, typeof industriesConfig[IndustrySlug]][];

export default function Industries() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  const diffRef = useRef<HTMLDivElement>(null);
  const diffInView = useInView(diffRef, { once: true, amount: 0.2 });

  return (
    <>
      <SEO
        title="Industries We Serve — FinTech, Healthcare, E-commerce & More"
        description="TalPro delivers specialist IT staffing across FinTech, Healthcare, Media, E-commerce, and Education. Domain-expert recruiters, pre-vetted talent, 48-hour shortlists."
        path="/industries"
      />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[hsl(222,47%,11%)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,hsl(187,92%,41%,0.12),transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest text-[hsl(187,92%,41%)] font-semibold mb-3"
          >
            Industries We Serve
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto"
          >
            Talent That Understands{' '}
            <span className="text-[hsl(38,92%,50%)]">Your Industry</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Every vertical has its own tech stack, compliance landscape, and
            hiring bar. Our domain-specialist recruiters know what good
            looks like in your world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold text-sm hover:brightness-105 transition-all cursor-pointer shadow-lg shadow-amber-500/20">
                Hire for Your Industry <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Industry Cards Grid ─────────────────────────── */}
      <section ref={gridRef} className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">
              Verticals
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Five industries, one recruiting standard
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map(([slug, cfg], i) => {
              const Icon = iconLookup[cfg.icon] ?? Globe;
              const accent =
                accentMap[slug] ?? 'from-slate-500/10 to-slate-400/10';

              return (
                <motion.div
                  key={slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link href={`/industries/${slug}`}>
                    <div
                      className={`group relative h-full rounded-2xl border border-border bg-gradient-to-br ${accent} p-6 md:p-8 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden`}
                    >
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-background border border-border shadow-sm mb-5">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>

                      <h3 className="font-bold text-lg mb-1">{cfg.title}</h3>
                      <p className="text-xs text-muted-foreground/70 font-medium uppercase tracking-wide mb-3">
                        {cfg.tagline}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {cfg.heroSubheading.length > 120
                          ? cfg.heroSubheading.slice(0, 120) + '...'
                          : cfg.heroSubheading}
                      </p>

                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                        Explore <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why TalPro for Industry Hiring ──────────────── */}
      <section ref={diffRef} className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">
              Why TalPro
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Industry-focused hiring, done right
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {differentiators.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={diffInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-[hsl(38,92%,50%)]/10 mx-auto mb-5">
                    <Icon className="h-6 w-6 text-[hsl(38,92%,50%)]" />
                  </div>
                  <h3 className="font-bold text-base mb-2">{d.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {d.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Hiring Models per Industry ──────────────────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">
              Flexible Engagement
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Engagement models across every vertical
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                label: 'Contract Specialists',
                items: [
                  'Domain-specific contractors',
                  'Project-based engagements',
                  'Rapid onboarding',
                ],
              },
              {
                label: 'Permanent Placement',
                items: [
                  'Industry-aligned culture fit',
                  'Compliance-vetted hires',
                  'Replacement guarantee',
                ],
              },
              {
                label: 'Team Augmentation',
                items: [
                  'Plug into existing teams',
                  'Your tools & processes',
                  'Flexible scale up/down',
                ],
              },
              {
                label: 'Managed Delivery',
                items: [
                  'Dedicated industry pods',
                  'Outcome-based pricing',
                  'Full lifecycle ownership',
                ],
              },
            ].map((model, i) => (
              <motion.div
                key={model.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-base mb-4">{model.label}</h3>
                <ul className="space-y-2.5">
                  {model.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[hsl(160,84%,39%)] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────── */}
      <section className="bg-[hsl(222,47%,11%)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Don't see your industry?
          </h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto leading-relaxed">
            We staff technology roles across every sector. Tell us about your
            hiring needs and we'll build a custom sourcing strategy — no
            commitment required.
          </p>
          <Link href="/contact">
            <span className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold text-sm hover:brightness-105 transition-all cursor-pointer shadow-lg shadow-amber-500/20">
              Talk to a Specialist <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
