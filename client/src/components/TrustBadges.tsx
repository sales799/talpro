import { Shield, Award, BadgeCheck, Building2, Users, Star } from 'lucide-react';

interface Badge {
  icon: typeof Shield;
  label: string;
  sublabel?: string;
}

const badges: Badge[] = [
  { icon: Star, label: '4.8★ Google Rating', sublabel: 'Client reviews' },
  { icon: Shield, label: 'MSME Registered', sublabel: 'Govt. of India' },
  { icon: BadgeCheck, label: 'PF & ESI Compliant', sublabel: 'Statutory coverage' },
  { icon: Award, label: '15+ Years', sublabel: 'IT staffing expertise' },
  { icon: Users, label: '500+ Placements', sublabel: 'Across India' },
  { icon: Building2, label: '50+ Active Clients', sublabel: 'GCCs & enterprises' },
];

/**
 * Horizontal badge strip showing trust signals.
 * Placed on homepage between LogoTicker and StatsBar.
 */
export default function TrustBadges() {
  return (
    <section className="w-full py-4 md:py-5 bg-background border-b border-border/30 overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-3 md:grid-cols-6 items-center justify-items-center gap-x-4 gap-y-3 md:gap-x-6 lg:gap-x-8">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 text-muted-foreground/70"
            >
              <badge.icon className={`h-4 w-4 shrink-0 ${badge.label.includes('Google') ? 'text-amber-500' : 'text-primary/60'}`} />
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
