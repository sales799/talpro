import { ArrowRight, BriefcaseBusiness, ShieldCheck, UserRoundSearch } from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import { audienceJourneys } from "@shared/audience-journeys";

export default function WhoWeServe() {
  return (
    <>
      <SEO
        title="Who We Serve | Talpro"
        description="Governed technology talent and GCC workforce journeys for business, technology, India, talent, procurement, and candidate audiences."
        path="/who-we-serve"
      />
      <div className="pt-16">
        <section className="bg-[hsl(222,47%,11%)] py-20 text-white">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[hsl(187,92%,41%)]">Who we serve</p>
            <h1 className="text-4xl font-bold md:text-6xl">Start with the decision you own</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/70">
              Each journey explains the intended outcome, operating method, current evidence boundary, risk controls, and the next governed action.
            </p>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
            {audienceJourneys.map((journey) => (
              <article key={journey.slug} className="rounded-2xl border border-border bg-muted/20 p-7">
                <BriefcaseBusiness className="h-6 w-6 text-primary" />
                <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-primary">{journey.audience}</p>
                <h2 className="mt-2 text-2xl font-bold">{journey.title}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{journey.description}</p>
                <Link href={`/who-we-serve/${journey.slug}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
                  View this journey <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}

            <article className="rounded-2xl border border-border bg-muted/20 p-7">
              <UserRoundSearch className="h-6 w-6 text-primary" />
              <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-primary">Technology candidate</p>
              <h2 className="mt-2 text-2xl font-bold">Search safely and understand how your data is handled</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">Use the candidate route for verified jobs, no-fee and fraud guidance, consent, acknowledgement, and data-rights information.</p>
              <Link href="/for-candidates" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
                Candidate journey <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </div>

          <div className="mx-auto mt-10 max-w-4xl px-4">
            <div className="flex gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-primary" />
              <div>
                <h2 className="font-bold">Evidence boundary</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">These pages publish operating guidance, not unverified results. Client outcomes, research, regional capability and universal service-level claims remain withheld until their evidence records pass.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
