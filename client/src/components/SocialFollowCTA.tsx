import { Linkedin, Twitter, Youtube, Instagram } from 'lucide-react';

const socialChannels = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/company/talpro-india',
    followers: '1K+',
    color: 'hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] hover:border-[#0A66C2]/30',
    cta: 'Follow',
  },
  {
    name: 'X',
    icon: Twitter,
    href: 'https://x.com/talproindia',
    followers: '',
    color: 'hover:bg-black/5 hover:text-black hover:border-black/20',
    cta: 'Follow',
  },
  {
    name: 'YouTube',
    icon: Youtube,
    href: 'https://youtube.com/@TalProIndia',
    followers: '',
    color: 'hover:bg-red-500/10 hover:text-red-600 hover:border-red-500/30',
    cta: 'Subscribe',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com/indiatalpro',
    followers: '',
    color: 'hover:bg-pink-500/10 hover:text-pink-600 hover:border-pink-500/30',
    cta: 'Follow',
  },
];

interface SocialFollowCTAProps {
  /** Heading text */
  heading?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Visual style */
  variant?: 'inline' | 'card';
}

/**
 * Mid-page social follow CTA — prompts visitors to follow TalPro.
 * Drop into any page to grow social audience.
 *
 * Variants:
 * - `inline`: horizontal strip (for between content sections)
 * - `card`: bordered card (for sidebars or below content)
 */
export default function SocialFollowCTA({
  heading = 'Stay connected with TalPro',
  subtitle = 'Hiring trends, salary data, and staffing insights — direct to your feed.',
  variant = 'inline',
}: SocialFollowCTAProps) {
  if (variant === 'card') {
    return (
      <div className="rounded-xl border border-border/50 bg-muted/30 p-5 sm:p-6">
        <p className="text-sm font-semibold text-foreground mb-1">{heading}</p>
        <p className="text-xs text-muted-foreground mb-4">{subtitle}</p>
        <div className="flex flex-wrap gap-2">
          {socialChannels.map((ch) => (
            <a
              key={ch.name}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 rounded-lg border border-border/50 bg-background px-3 py-2 text-xs font-medium text-muted-foreground transition-all duration-200 ${ch.color}`}
            >
              <ch.icon className="h-3.5 w-3.5" />
              <span>{ch.cta}</span>
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Inline variant — full-width strip
  return (
    <section className="w-full py-8 md:py-10 bg-muted/20 border-y border-border/30">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
          {heading}
        </h3>
        <p className="text-sm text-muted-foreground mb-5">{subtitle}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {socialChannels.map((ch) => (
            <a
              key={ch.name}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 shadow-sm ${ch.color}`}
            >
              <ch.icon className="h-4 w-4" />
              <span>{ch.cta} on {ch.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
