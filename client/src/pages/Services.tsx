import { useRef } from 'react';
import SEO from '@/components/SEO';
import SocialShareBar from '@/components/SocialShareBar';
import SocialFollowCTA from '@/components/SocialFollowCTA';
import { Link } from 'wouter';
import { motion, useInView } from 'framer-motion';
import {
  Monitor,
  Briefcase,
  Target,
  Users,
  Search,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  TrendingUp,
} from 'lucide-react';
import { services } from '@/config/services';

/**
 * Constitution v2.1 offer hub. Data-driven from the approved service registry.
 */

/* Icon map keyed by service slug — keeps the config file icon-free */
const iconMap: Record<string, React.ElementType> = {
  'it-staffing': Monitor,
  'contract-staffing': Briefcase,
  'permanent-hiring': Users,
  'executive-search': Search,
  'rpo-managed-talent': Target,
  'gcc-accelerator': Briefcase,
};

/* Gradient accent per slug for visual variety */
const accentMap: Record<string, string> = {
  'it-staffing': 'from-cyan-500/10 to-blue-500/10',
  'contract-staffing': 'from-violet-500/10 to-purple-500/10',
  'permanent-hiring': 'from-emerald-500/10 to-teal-500/10',
  'executive-search': 'from-rose-500/10 to-pink-500/10',
  'rpo-managed-talent': 'from-amber-500/10 to-orange-500/10',
  'gcc-accelerator': 'from-sky-500/10 to-indigo-500/10',
};

/* Differentiators shown in the "Why TalPro" section */
const differentiators = [
  {
    icon: Clock,
    title: 'Explicit Offer Selection',
    desc: 'Contract, permanent, executive, RPO, and GCC workforce needs use separate scopes, owners, and commercial models.',
  },
  {
    icon: Shield,
    title: 'Governed Delivery',
    desc: 'Screening evidence, documentation responsibilities, service levels, and any replacement term are defined for the signed mandate.',
  },
  {
    icon: TrendingUp,
    title: 'Clear Hiring Decisions',
    desc: 'Role scorecards, screening records, and agreed responsibilities help your team assess candidates and plan the next step.',
  },
];

export default function Services() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  const diffRef = useRef<HTMLDivElement>(null);
  const diffInView = useInView(diffRef, { once: true, amount: 0.2 });

  return (
    <>
      <SEO
        title="Technology Talent, Staffing, Search & GCC Workforce Offers | Talpro"
        description="Explore technology talent, contract staffing, permanent hiring, executive search, RPO, and GCC workforce support in India."
        path="/services"
      />
      <div className="max-w-5xl mx-auto px-4 py-3 pt-20">
        <SocialShareBar title="Talpro Technology Talent & GCC Workforce Offers" url="/services" showLabels />
      </div>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[hsl(222,47%,11%)] text-white">
        {/* Subtle radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,hsl(187,92%,41%,0.12),transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest text-accent font-semibold mb-3"
          >
            Talent & Workforce Solutions
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto"
          >
            Build India Technology Capability{' '}
            <span className="text-warning">Through the Right Talent Model</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Talpro separates technology talent, contract staffing, permanent
            hiring, executive search, RPO, and GCC workforce launch so every
            engagement has clear ownership, boundaries, and evidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold text-sm hover:brightness-105 transition-all cursor-pointer shadow-lg shadow-amber-500/20">
                Build Your India Team <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Service Cards Grid ────────────────────────────── */}
      <section ref={gridRef} className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">
              What We Do
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Find the right hiring model
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Config-driven service cards */}
            {services.map((svc, i) => {
              const Icon = iconMap[svc.slug] ?? Users;
              const accent = accentMap[svc.slug] ?? 'from-slate-500/10 to-slate-400/10';

              return (
                <motion.div
                  key={svc.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link href={`/services/${svc.slug}`}>
                    <div
                      className={`group relative h-full rounded-2xl border border-border bg-gradient-to-br ${accent} p-6 md:p-8 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden`}
                    >
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-background border border-border shadow-sm mb-5">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>

                      <h3 className="font-bold text-lg mb-2">{svc.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {svc.hero.subtitle}
                      </p>

                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                        Learn more <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}

          </div>
        </div>
      </section>

      {/* ── Why TalPro ────────────────────────────────────── */}
      <section ref={diffRef} className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">
              Why TalPro
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              What sets us apart
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
                    <Icon className="h-6 w-6 text-warning" />
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

      {/* ── Engagement Models ─────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">
              Flexible Hiring
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Commercial models follow the selected offer
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                label: 'Contract',
                items: ['Agreed role schedule', 'Bill-rate or monthly model', 'Client-led delivery boundary'],
              },
              {
                label: 'Permanent',
                items: ['Approved search mandate', 'Success-fee or exclusive terms', 'Contractual replacement terms'],
              },
              {
                label: 'Executive Search',
                items: ['Retained mandate', 'Confidential research', 'Milestone governance'],
              },
              {
                label: 'RPO / GCC Workforce',
                items: ['Scoped responsibility matrix', 'Managed recruitment workflows', 'Programme reporting and change control'],
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
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
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
            Not sure which service fits?
          </h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto leading-relaxed">
            Tell us about your hiring challenge and we'll recommend the right
            engagement model and the evidence needed to scope it.
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
