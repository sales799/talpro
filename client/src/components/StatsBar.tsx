import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { companyStats, type Stat } from '@/data/stats';

/**
 * Full-width dark stats strip with animated count-up numbers.
 *
 * The counter starts only when the bar scrolls into view (useInView)
 * and animates via requestAnimationFrame for smooth 60fps rendering.
 */

function CountUp({
  target,
  suffix,
  duration = 2000,
  start,
}: {
  target: number;
  suffix: string;
  duration?: number;
  start: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();

    function tick(now: number) {
      const elapsed = now - t0;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return (
    <span>
      {suffix === 'hr' ? '<' : ''}
      {display}
      {suffix}
      {suffix === '%' ? '+' : ''}
    </span>
  );
}

function StatItem({ stat, index, inView }: { stat: Stat; index: number; inView: boolean }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tabular-nums">
        <CountUp target={stat.numericValue} suffix={stat.suffix} start={inView} />
      </div>
      <p className="text-white/60 text-sm mt-1.5">{stat.label}</p>
    </motion.div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      ref={ref}
      className="bg-[hsl(222,47%,11%)] py-14 md:py-16"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {companyStats.map((stat, i) => (
          <StatItem key={stat.label} stat={stat} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
