import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'wouter';
import { services as approvedServices } from '@/config/services';
import {
  Monitor,
  Briefcase,
  ShieldCheck,
  Users,
  Rocket,
  ArrowRight,
  UserRoundSearch,
} from 'lucide-react';

/**
 * Constitution v2.1 approved offer architecture.
 */

const serviceCards = [
  {
    slug: 'it-staffing',
    icon: Monitor,
    desc: 'Technology search, role-specific screening, market mapping, and hiring support.',
    accent: 'from-cyan-500/10 to-blue-500/10',
    featured: true,
  },
  {
    slug: 'contract-staffing',
    icon: Briefcase,
    desc: 'Named professionals for client-led teams under a clear staffing scope, service model, and workforce boundary.',
    accent: 'from-sky-500/10 to-indigo-500/10',
  },
  {
    slug: 'permanent-hiring',
    icon: Users,
    desc: 'Structured permanent search with role calibration, evidence-led selection, and joining-risk management.',
    accent: 'from-amber-500/10 to-orange-500/10',
  },
  {
    slug: 'executive-search',
    icon: UserRoundSearch,
    desc: 'Confidential, research-led leadership search with an agreed success profile and decision governance.',
    accent: 'from-emerald-500/10 to-teal-500/10',
  },
  {
    slug: 'rpo-managed-talent',
    icon: ShieldCheck,
    desc: 'Defined recruitment-process ownership, workflows, reporting, service levels, and continuous improvement.',
    accent: 'from-rose-500/10 to-pink-500/10',
  },
  {
    slug: 'gcc-accelerator',
    icon: Rocket,
    desc: 'Workforce planning, role sequencing, leadership search, hiring operations, and talent-market guidance for India capability centres.',
    accent: 'from-violet-500/10 to-purple-500/10',
    wide: true,
  },
].map((card) => {
  const service = approvedServices.find((offer) => offer.slug === card.slug);
  if (!service) throw new Error(`Unknown homepage service: ${card.slug}`);
  return { ...card, title: service.name, href: `/services/${service.slug}` };
});

export default function BentoGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">
            Talent & Workforce Solutions
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Six distinct ways to build India technology capability
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Each offer has a named owner, commercial model, delivery boundary, and evidence-led operating process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {serviceCards.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`${svc.featured ? 'md:row-span-2' : ''} ${
                  svc.wide ? 'md:col-span-3' : ''
                }`}
              >
                <Link href={svc.href}>
                  <div
                    className={`group relative h-full rounded-2xl border border-border bg-gradient-to-br ${svc.accent} p-6 md:p-8 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden`}
                  >
                    {/* Icon */}
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-background border border-border shadow-sm mb-5">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <h3 className="font-bold text-lg mb-2">{svc.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {svc.desc}
                    </p>

                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      Learn more{' '}
                      <ArrowRight className="h-3.5 w-3.5" />
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
