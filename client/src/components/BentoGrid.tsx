import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'wouter';
import {
  Monitor,
  Briefcase,
  Target,
  Users,
  Search,
  Rocket,
  ArrowRight,
} from 'lucide-react';

/**
 * Asymmetric 6-card bento grid showcasing staffing services.
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
    title: 'IT Staffing',
    desc: 'Full-stack developers, DevOps, QA, data engineers, and cloud architects — on contract or permanent basis.',
    href: '/services/it-staffing',
    accent: 'from-cyan-500/10 to-blue-500/10',
    featured: true,
  },
  {
    icon: Briefcase,
    title: 'Engineering Staffing',
    desc: 'Mechanical, electrical, and industrial engineers for manufacturing and R&D.',
    href: '/services/engineering-staffing',
    accent: 'from-violet-500/10 to-purple-500/10',
  },
  {
    icon: Target,
    title: 'Sales Staffing',
    desc: 'SDRs, account executives, and sales leaders for SaaS and enterprise.',
    href: '/services/sales-staffing',
    accent: 'from-amber-500/10 to-orange-500/10',
  },
  {
    icon: Users,
    title: 'Direct Hiring',
    desc: 'End-to-end recruitment for permanent roles across all functions.',
    href: '/services/direct-hiring-it',
    accent: 'from-emerald-500/10 to-teal-500/10',
  },
  {
    icon: Search,
    title: 'Executive Search',
    desc: 'C-suite and VP-level placements with discretion and speed.',
    href: '/services/executive-search',
    accent: 'from-rose-500/10 to-pink-500/10',
  },
  {
    icon: Rocket,
    title: 'GCC Accelerator',
    desc: 'Set up and scale your India Global Capability Center — from entity formation to full team build-out.',
    href: '/services/gcc-accelerator',
    accent: 'from-sky-500/10 to-indigo-500/10',
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
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Staffing solutions for every need
          </h2>
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
