import { Link } from 'wouter';
import { ArrowRight, CalendarDays, ClipboardCheck, ShieldCheck, Users } from 'lucide-react';
import SEO, { buildBreadcrumbSchema } from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { services } from '@/config/services';

const employerBreadcrumb = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://talproindia.com/' },
  { name: 'For Employers', url: 'https://talproindia.com/employers' },
]);

const operatingControls = [
  { icon: ClipboardCheck, label: 'A scoped mandate with agreed assessment evidence' },
  { icon: Users, label: 'A named delivery owner for each approved engagement' },
  { icon: ShieldCheck, label: 'Commercial terms and service levels confirmed in the mandate' },
];

export default function Employers() {
  return (
    <>
      <SEO
        title="For Employers - Hire Technology Talent | TALPRO India"
        description="Choose Talpro support for technology talent, contract staffing, permanent hiring, executive search, RPO, or GCC workforce launch in India."
        path="/employers"
        jsonLd={employerBreadcrumb}
      />
      <div className="pt-16">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'For Employers' }]} />
        <section className="bg-[hsl(222,47%,11%)] text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24 lg:px-8">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[hsl(38,92%,60%)]">
                For Employers
              </p>
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Build your technology team in India.
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/70">
                Choose the hiring model that fits your team, with clear responsibilities, screening criteria, and a named delivery owner.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact?service=it-staffing"
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
              <h2 className="mb-5 text-xl font-semibold">Engagement controls</h2>
              <div className="space-y-4">
                {operatingControls.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(38,92%,60%)]" />
                    <p className="text-sm leading-relaxed text-white/75">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold">Choose the offer that matches the mandate</h2>
            <div className="grid gap-3 md:grid-cols-3">
              {services.map((offer) => (
                <Link key={offer.slug} href={`/services/${offer.slug}`} className="rounded-lg border border-border bg-muted/30 p-5 text-sm font-semibold hover:border-primary/40">
                  {offer.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary/70">
              Talpro promise
            </p>
            <p className="text-2xl font-semibold leading-relaxed">
              Agree the scope, responsibilities, timelines, and commercial terms before hiring begins.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
