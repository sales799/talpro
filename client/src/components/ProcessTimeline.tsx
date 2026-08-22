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
  { icon: ClipboardCheck, label: 'Map', desc: 'Define roles, milestones, service levels, dependencies, and delivery boundaries' },
  { icon: Network, label: 'Assemble', desc: 'Match vetted talent, delivery leads, and operating support' },
  { icon: ShieldCheck, label: 'Validate', desc: 'Run role evidence, reference, consent, and documentation checks' },
  { icon: Handshake, label: 'Launch', desc: 'Coordinate interviews, offers, onboarding, and ramp-up' },
  { icon: BarChart3, label: 'Govern', desc: 'Track agreed service outcomes, risks, feedback, and corrective actions' },
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

        {/* One semantic list, presented vertically on mobile and horizontally on desktop. */}
        <div className="relative grid grid-cols-1 gap-8 pl-10 md:grid-cols-6 md:gap-4 md:pl-0">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-border md:bottom-auto md:left-[8.33%] md:right-[8.33%] md:top-8 md:h-px md:w-auto" />
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                className="relative md:flex md:flex-col md:items-center md:text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="absolute -left-10 top-0 z-10 flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-background shadow-sm md:static md:mb-4 md:h-16 md:w-16 md:rounded-2xl">
                  <Icon className="h-4 w-4 text-primary md:h-6 md:w-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/50 md:mb-1">
                  Step {i + 1}
                </span>
                <h3 className="mt-0.5 text-sm font-semibold md:mt-0">{step.label}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground md:max-w-[140px]">
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
