import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FileText,
  ClipboardCheck,
  ShieldCheck,
  Network,
  Handshake,
  BarChart3,
} from 'lucide-react';

/**
 * Horizontal 6-step operating model timeline with staggered reveal.
 *
 * On mobile the layout switches to a vertical stack with a
 * connecting line on the left.
 */

const steps = [
  { icon: FileText, label: 'Diagnose', desc: 'Clarify capability, stack, urgency, and delivery model' },
  { icon: ClipboardCheck, label: 'Map', desc: 'Define roles, milestones, SLAs, and compliance needs' },
  { icon: Network, label: 'Assemble', desc: 'Match vetted talent, delivery leads, and operating support' },
  { icon: ShieldCheck, label: 'Validate', desc: 'Run technical, reference, and statutory readiness checks' },
  { icon: Handshake, label: 'Launch', desc: 'Coordinate interviews, offers, onboarding, and ramp-up' },
  { icon: BarChart3, label: 'Govern', desc: 'Track retention, replacement coverage, and delivery outcomes' },
];

export default function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Handshake className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-semibold text-accent tracking-wide">Enterprise Operating Model</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            From India strategy to operating team
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            A practical path for global companies that need technology capability in India, not just resumes in an inbox.
          </p>
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden md:grid grid-cols-6 gap-4 relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-[8.33%] right-[8.33%] h-px bg-border" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                className="relative flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className="relative z-10 flex items-center justify-center h-16 w-16 rounded-2xl bg-background border border-border shadow-sm mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/50 mb-1">
                  Step {i + 1}
                </span>
                <h3 className="font-semibold text-sm">{step.label}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-[140px]">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden relative pl-10">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                className="relative mb-8 last:mb-0"
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                {/* Dot on the line */}
                <div className="absolute -left-10 top-1 flex items-center justify-center h-8 w-8 rounded-xl bg-background border border-border shadow-sm">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/50">
                  Step {i + 1}
                </span>
                <h3 className="font-semibold text-sm mt-0.5">{step.label}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
