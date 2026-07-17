import { useEffect } from "react";
import { ArrowRight, CheckCircle2, FileCheck2, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import { APPROVED_BRAND_POSITION } from "@shared/approved-brand";
import type { AudienceJourney as AudienceJourneyRecord } from "@shared/audience-journeys";
import { serviceMap } from "@/config/services";
import { analytics } from "@/lib/analytics";

export default function AudienceJourney({ journey }: { journey: AudienceJourneyRecord }) {
  const path = `/who-we-serve/${journey.slug}`;
  const offers = journey.recommendedOfferSlugs.map((slug) => serviceMap[slug]).filter(Boolean);

  useEffect(() => {
    analytics.event("buyer_journey_view", { audience_slug: journey.slug });
  }, [journey.slug]);

  return (
    <>
      <SEO title={`${journey.audience} | Talpro`} description={journey.description} path={path} />
      <div className="pt-16">
        <section className="bg-[hsl(222,47%,11%)] py-20 text-white">
          <div className="mx-auto max-w-5xl px-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(187,92%,41%)]">{journey.audience}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold md:text-6xl">{journey.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70">{journey.description}</p>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-warning px-6 py-3 font-semibold text-warning-foreground">
              Scope the decision <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-2">
            <article className="rounded-2xl border border-border p-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Why Talpro</p>
              <h2 className="mt-2 text-2xl font-bold">A workforce partner with explicit delivery boundaries</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{APPROVED_BRAND_POSITION}</p>
            </article>
            <article className="rounded-2xl border border-border p-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Why now</p>
              <h2 className="mt-2 text-2xl font-bold">Make the operating decision before adding volume</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{journey.whyNow}</p>
            </article>
          </div>
        </section>

        <section className="bg-muted/30 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-2">
            <article>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Expected outcomes</p>
              <h2 className="mt-2 text-3xl font-bold">The decisions this journey is designed to clarify</h2>
              <ul className="mt-6 space-y-4">
                {journey.expectedOutcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>{outcome}</span></li>
                ))}
              </ul>
            </article>
            <article>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Operating method</p>
              <h2 className="mt-2 text-3xl font-bold">A governed path from brief to review</h2>
              <ol className="mt-6 space-y-4">
                {journey.operatingMethod.map((step, index) => (
                  <li key={step} className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{index + 1}</span><span>{step}</span></li>
                ))}
              </ol>
            </article>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-2">
            <article className="rounded-2xl border border-border p-7">
              <FileCheck2 className="h-6 w-6 text-primary" />
              <h2 className="mt-4 text-2xl font-bold">Evidence available today</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">The public Trust Centre identifies verified baselines, evidence still required, and claims that are not made. Client results and original research stay unpublished until approval, method and expiry records exist.</p>
              <Link href="/trust" className="mt-5 inline-flex items-center gap-2 font-semibold text-primary">Review trust evidence <ArrowRight className="h-4 w-4" /></Link>
            </article>
            <article className="rounded-2xl border border-border p-7">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h2 className="mt-4 text-2xl font-bold">Risk controls</h2>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                {journey.riskControls.map((control) => <li key={control} className="flex gap-3"><span aria-hidden="true">•</span><span>{control}</span></li>)}
              </ul>
            </article>
          </div>
        </section>

        <section className="bg-[hsl(222,47%,11%)] py-16 text-white">
          <div className="mx-auto max-w-6xl px-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(187,92%,41%)]">Relevant governed offers</p>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {offers.map((offer) => (
                <Link key={offer.slug} href={`/services/${offer.slug}`} className="rounded-2xl border border-white/15 bg-white/5 p-6 hover:bg-white/10">
                  <h2 className="text-xl font-bold">{offer.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{offer.hero.subtitle}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(187,92%,41%)]">Review offer <ArrowRight className="h-4 w-4" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
