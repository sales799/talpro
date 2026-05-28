import { Link } from 'wouter';
import { ArrowRight, BadgeCheck, CalendarDays, Clock, ShieldCheck, Users } from 'lucide-react';
import SEO, { buildBreadcrumbSchema } from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import StatsBar from '@/components/StatsBar';
import TrustBadges from '@/components/TrustBadges';

const employerBreadcrumb = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://nirantar.talpro.in/' },
  { name: 'For Employers', url: 'https://nirantar.talpro.in/employers' },
]);

const slaItems = [
  { icon: Clock, label: 'First shortlist in 48 hours' },
  { icon: Users, label: 'Engineering · Cloud/DevOps · Data/AI · SAP · Leadership' },
  { icon: ShieldCheck, label: '₹0 upfront · success-based fee · 90-day replacement guarantee' },
];

const clientFrames = [
  'Talent placed at a leading fintech',
  'a US SaaS GCC',
  'a top Indian bank',
  'a Fortune-500 product company',
  'a high-growth healthtech',
];

export default function Employers() {
  return (
    <>
      <SEO
        title="For Employers - Hire Technology Talent | TALPRO India"
        description="Hire specialist IT talent in India with TALPRO. First shortlist in 48 hours, success-based fee, and 90-day replacement guarantee."
        path="/employers"
        jsonLd={employerBreadcrumb}
      />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'For Employers' }]} />
        <section className="bg-[hsl(222,47%,11%)] text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24 lg:px-8">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[hsl(38,92%,50%)]">
                For Employers
              </p>
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Hire technology talent without hiring theatre.
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/70">
                Talpro builds accountable shortlists for urgent engineering, cloud, data, SAP, and leadership roles across India.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact?service=Hire%20Talent"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[hsl(38,92%,50%)] px-6 py-3 font-semibold text-[hsl(222,47%,11%)]"
                >
                  Hire Talent
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://calendly.com/talproindia/consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 font-semibold text-white hover:bg-white/10"
                >
                  <CalendarDays className="h-4 w-4" />
                  Book a call
                </a>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h2 className="mb-5 text-xl font-semibold">SLA strip</h2>
              <div className="space-y-4">
                {slaItems.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(38,92%,50%)]" />
                    <p className="text-sm leading-relaxed text-white/75">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <TrustBadges />
        <StatsBar />

        <section className="bg-background py-16">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <div className="mb-8 flex items-center gap-2 text-sm font-semibold text-primary">
              <BadgeCheck className="h-4 w-4" />
              Anonymized client framing
            </div>
            <div className="grid gap-3 md:grid-cols-5">
              {clientFrames.map((frame) => (
                <div key={frame} className="rounded-lg border border-border bg-muted/30 p-4 text-sm font-medium">
                  {frame}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary/70">
              Founder view
            </p>
            <blockquote className="text-2xl font-semibold leading-relaxed">
              "The fastest shortlist is still useless if it is not relevant. Talpro's work is to reduce noise, protect trust, and help hiring teams move with evidence."
            </blockquote>
            <p className="mt-4 text-sm text-muted-foreground">
              Bhaskar Anand, Founder & Managing Director
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
