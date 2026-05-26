import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'wouter';
import {
  Monitor,
  Briefcase,
  ShieldCheck,
  Users,
  BrainCircuit,
  Rocket,
  ArrowRight,
  CloudCog,
} from 'lucide-react';

/**
 * Asymmetric 6-card bento grid showcasing enterprise technology services.
 *
 * Desktop layout (3 cols):
 *   [IT Staffing — spans 2 rows]  [Engineering]  [Sales]
 *                                 [Direct Hire]  [Exec Search]
 *   [GCC Accelerator — spans full width]
 *
 * Mobile: single-column stack.
 */

const services = [
  {
    icon: Monitor,
    title: 'Enterprise IT Services',
    desc: 'Engineering, cloud, QA, data, and product delivery support for global teams that need accountable India execution.',
    href: '/services/it-staffing',
    accent: 'from-cyan-500/10 to-blue-500/10',
    featured: true,
  },
  {
    icon: CloudCog,
    title: 'Cloud & Platform Delivery',
    desc: 'DevOps, cloud migration, infrastructure, observability, and managed platform capability for enterprise systems.',
    href: '/services/engineering-staffing',
    accent: 'from-sky-500/10 to-indigo-500/10',
  },
  {
    icon: BrainCircuit,
    title: 'AI & Automation Teams',
    desc: 'AI engineers, data specialists, workflow automation talent, and delivery pods for practical enterprise automation.',
    href: '/services/sales-staffing',
    accent: 'from-amber-500/10 to-orange-500/10',
  },
  {
    icon: Users,
    title: 'Technology Staffing',
    desc: 'Contract, permanent, and project-based technology hiring with shortlist discipline and replacement coverage.',
    href: '/services/direct-hiring-it',
    accent: 'from-emerald-500/10 to-teal-500/10',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance Operations',
    desc: 'PF, ESI, onboarding, documentation, and audit-ready workflows for India workforce and GCC delivery.',
    href: '/services/executive-search',
    accent: 'from-rose-500/10 to-pink-500/10',
  },
  {
    icon: Rocket,
    title: 'GCC Buildout & Scale',
    desc: 'Set up and scale India Global Capability Centers from founding teams to multi-function delivery capability.',
    href: '/services/gcc-accelerator',
    accent: 'from-violet-500/10 to-purple-500/10',
    wide: true,
  },
];

export default function BentoGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">
            Enterprise Capabilities
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            One partner for technology delivery, GCC buildout, and talent
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Talpro combines IT services discipline with specialist staffing execution, so global teams can build capability in India without fragmented vendors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((svc, i) => {
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
