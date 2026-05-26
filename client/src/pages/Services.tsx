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
  Rocket,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  TrendingUp,
} from 'lucide-react';
import { services } from '@/config/services';

/**
 * Services Hub — overview page for enterprise technology capabilities.
 *
 * Data-driven: pulls service entries from config/services.ts so content
 * changes automatically propagate. The GCC Accelerator card is appended
 * separately since it lives outside the config as a dedicated page.
 */

/* Icon map keyed by service slug — keeps the config file icon-free */
const iconMap: Record<string, React.ElementType> = {
  'it-staffing': Monitor,
  'engineering-staffing': Briefcase,
  'sales-staffing': Target,
  'direct-hiring-it': Users,
  'direct-hiring-functions': Users,
  'executive-search': Search,
};

/* Gradient accent per slug for visual variety */
const accentMap: Record<string, string> = {
  'it-staffing': 'from-cyan-500/10 to-blue-500/10',
  'engineering-staffing': 'from-violet-500/10 to-purple-500/10',
  'sales-staffing': 'from-amber-500/10 to-orange-500/10',
  'direct-hiring-it': 'from-emerald-500/10 to-teal-500/10',
  'direct-hiring-functions': 'from-emerald-500/10 to-teal-500/10',
  'executive-search': 'from-rose-500/10 to-pink-500/10',
};

/* Differentiators shown in the "Why TalPro" section */
const differentiators = [
  {
    icon: Clock,
    title: '48-Hour Operating Response',
    desc: 'Clear shortlist plans, role maps, and next actions for urgent technology and GCC requirements.',
  },
  {
    icon: Shield,
    title: 'Governed Delivery',
    desc: 'Technical screening, documentation, compliance checks, and replacement coverage built into the process.',
  },
  {
    icon: TrendingUp,
    title: '90%+ Client Retention',
    desc: 'Long-running partnerships built on transparent execution, practical timelines, and teams that stay productive.',
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
        title="Enterprise IT Services, GCC Buildout & Technology Staffing"
        description="TalPro helps global teams build India technology capability through enterprise IT services, GCC enablement, specialist staffing, executive search, and compliance-ready delivery."
        path="/services"
      />
      <div className="max-w-5xl mx-auto px-4 py-3 pt-20">
        <SocialShareBar title="Enterprise IT Services, GCC Buildout & Technology Staffing" url="/services" showLabels />
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
            className="text-xs uppercase tracking-widest text-[hsl(187,92%,41%)] font-semibold mb-3"
          >
            Enterprise Services
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto"
          >
            Enterprise IT Services{' '}
            <span className="text-[hsl(38,92%,50%)]">That Deliver</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            From cloud and engineering delivery to GCC buildout and specialist
            talent, Talpro helps global teams scale India capability with speed,
            control, and accountability.
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
              Capabilities for every stage of India technology growth
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

            {/* GCC Accelerator — separate card since it's not in the config */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: services.length * 0.08 }}
              className="sm:col-span-2 lg:col-span-3"
            >
              <Link href="/services/gcc-accelerator">
                <div className="group relative h-full rounded-2xl border border-border bg-gradient-to-br from-sky-500/10 to-indigo-500/10 p-6 md:p-8 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-background border border-border shadow-sm mb-5">
                    <Rocket className="h-5 w-5 text-primary" />
                  </div>

                  <h3 className="font-bold text-lg mb-2">GCC Accelerator</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                    Set up and scale your India Global Capability Center — from
                    entity formation to full team build-out. We handle
                    compliance, hiring ramp, and operational setup so you can
                    focus on product.
                  </p>

                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
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

      {/* ── Engagement Models ─────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">
              Flexible Hiring
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Engagement models that fit your needs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                label: 'Contract',
                items: ['Time-bound projects', 'Pay-as-you-go', 'Quick ramp-up'],
              },
              {
                label: 'Contract-to-Hire',
                items: ['Try before you commit', 'Lower risk hiring', '90-day conversion'],
              },
              {
                label: 'Permanent',
                items: ['Full-cycle hiring', 'Culture-fit focused', 'Replacement guarantee'],
              },
              {
                label: 'Dedicated Pods',
                items: ['Managed teams', 'Your tech stack', 'Embedded delivery'],
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
            Not sure which service fits?
          </h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto leading-relaxed">
            Tell us about your hiring challenge and we'll recommend the right
            engagement model — no commitment required.
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
