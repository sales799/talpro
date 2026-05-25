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
 * Six-card service grid showcasing staffing services.
 */

const services = [
  {
    icon: Monitor,
    title: 'IT Staffing',
    desc: 'Full-stack developers, DevOps, QA, data engineers, and cloud architects — on contract or permanent basis.',
    href: '/services/it-staffing',
    accent: 'border-accent/50',
  },
  {
    icon: Briefcase,
    title: 'Engineering Staffing',
    desc: 'Mechanical, electrical, and industrial engineers for manufacturing and R&D.',
    href: '/services/engineering-staffing',
    accent: 'border-warning/50',
  },
  {
    icon: Target,
    title: 'Sales Staffing',
    desc: 'SDRs, account executives, and sales leaders for SaaS and enterprise.',
    href: '/services/sales-staffing',
    accent: 'border-primary/30',
  },
  {
    icon: Users,
    title: 'Direct Hiring',
    desc: 'End-to-end recruitment for permanent roles across all functions.',
    href: '/services/direct-hiring-it',
    accent: 'border-accent/50',
  },
  {
    icon: Search,
    title: 'Executive Search',
    desc: 'C-suite and VP-level placements with discretion and speed.',
    href: '/services/executive-search',
    accent: 'border-warning/50',
  },
  {
    icon: Rocket,
    title: 'GCC Accelerator',
    desc: 'Set up and scale your India Global Capability Center — from entity formation to full team build-out.',
    href: '/services/gcc-accelerator',
    accent: 'border-primary/30',
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
          <h2 className="font-display text-3xl md:text-4xl font-bold">
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
                className="min-h-full"
              >
                <Link href={svc.href}>
                  <div
                    className={`group relative h-full border border-border border-l-4 ${svc.accent} bg-background p-6 md:p-7 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden`}
                  >
                    {/* Icon */}
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-muted border border-border shadow-sm mb-5">
                      <Icon className="h-5 w-5 text-accent" />
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
