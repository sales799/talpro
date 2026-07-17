import { Link } from "wouter";
import { ArrowRight, ClipboardCheck, FileSearch, Scale } from "lucide-react";
import SEO from "@/components/SEO";
import { contentGovernanceRegistry } from "@shared/content-governance";

const resources = [
  {
    icon: ClipboardCheck,
    title: "Hiring brief checklist",
    description: "Define the role outcome, skills, constraints, compensation context, interview owners, and decision process before sourcing begins.",
  },
  {
    icon: FileSearch,
    title: "Candidate evidence guide",
    description: "Decide what evidence must accompany each profile and which questions remain for the client interview loop.",
  },
  {
    icon: Scale,
    title: "Engagement model guide",
    description: "Separate contract staffing, permanent hiring, executive search, RPO, and GCC workforce needs before selecting commercial terms.",
  },
];

const withheldIntelligence = contentGovernanceRegistry.filter(
  (record) => record.contentType !== "buyer_journey" && record.publicationStatus !== "approved",
);

export default function ResourceLibrary() {
  return (
    <>
      <SEO
        title="Technology Talent Resources | TalPro"
        description="Governed hiring and workforce guidance for scoping mandates, assessing candidate evidence, and choosing the appropriate Talpro offer."
        path="/resources"
      />
      <main className="pt-16">
        <section className="bg-[hsl(222,47%,11%)] py-20 text-white">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[hsl(187,92%,41%)]">Talent resources</p>
            <h1 className="text-4xl font-bold md:text-6xl">Make the hiring decision easier to govern</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
              Practical guidance built around scope, evidence, ownership, and clear delivery boundaries.
            </p>
          </div>
        </section>
        <section className="bg-background py-16">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
            {resources.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-2xl border border-border bg-muted/20 p-6">
                <Icon className="mb-4 h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-3xl px-4 text-center">
            <p className="text-sm text-muted-foreground">Salary, market, industry, client-outcome, and service-level claims remain unpublished until evidence and approval exist in the claim registry.</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-warning px-6 py-3 font-semibold text-warning-foreground">
              Scope a mandate <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Intelligence governance</p>
            <h2 className="mt-2 text-3xl font-bold">Research stays withheld until its evidence record passes</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">The planned GCC, India talent, salary and regional material is not being represented as research before a dataset, method, human owner, expert review and claim approval exist.</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {withheldIntelligence.map((record) => (
                <article key={record.id} className="rounded-2xl border border-border bg-background p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-warning">Withheld — evidence required</p>
                  <h3 className="mt-2 text-xl font-bold">{record.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">Required: {record.missingEvidence.join(", ")}.</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
