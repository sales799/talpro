import { Award, Clock, Users, Star } from 'lucide-react';

interface Badge {
  icon: typeof Award;
  label: string;
  sublabel?: string;
  href?: string;
}

const badges: Badge[] = [
  { icon: Star, label: '4.5★ Glassdoor', sublabel: '16 verified reviews', href: 'https://www.glassdoor.co.in/Reviews/TALPRO-Reviews-E1056684.htm' },
  { icon: Award, label: '15+ Years', sublabel: 'IT staffing expertise' },
  { icon: Users, label: '500+ Tech Placements', sublabel: 'Across India' },
  { icon: Clock, label: '48-Hour Shortlist', sublabel: 'First shortlist promise' },
];

/**
 * Horizontal badge strip showing trust signals.
 * Placed on homepage between LogoTicker and StatsBar.
 */
export default function TrustBadges() {
  return (
    <section className="w-full py-4 md:py-5 bg-background border-b border-border/30 overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-items-center gap-x-4 gap-y-3 md:gap-x-6 lg:gap-x-8">
          {badges.map((badge) => (
            <a
              key={badge.label}
              href={badge.href}
              target={badge.href ? '_blank' : undefined}
              rel={badge.href ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-2 text-muted-foreground/70"
            >
              <badge.icon className={`h-4 w-4 shrink-0 ${badge.label.includes('Glassdoor') ? 'text-amber-500' : 'text-primary/60'}`} />
              <div className="flex flex-col leading-tight">
                <span className="text-xs md:text-sm font-semibold text-foreground/80">
                  {badge.label}
                </span>
                {badge.sublabel && (
                  <span className="text-[10px] md:text-xs text-muted-foreground/60">
                    {badge.sublabel}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
