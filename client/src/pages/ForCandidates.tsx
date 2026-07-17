import { Link } from "wouter";
import { ArrowRight, FileCheck2, Search, ShieldCheck, UserCheck } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getApprovedPublicClaim } from "@shared/approved-public-claims";

const noFeeClaim = getApprovedPublicClaim("candidate-no-application-fee");

export default function ForCandidates() {
  return (
    <>
      <SEO
        title="For Candidates | Verified Technology Roles"
        description="Review verified Talpro technology roles, candidate protections, consent controls, and data-rights routes."
        path="/for-candidates"
      />
      <div className="pt-16">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "For Candidates" }]} />
        <section className="bg-[hsl(222,47%,11%)] py-20 text-white md:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(174,70%,55%)]">For technology professionals</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">Find a role you can verify</h1>
            <p className="mx-auto mt-5 max-w-2xl text-white/70">
              Start with a current vacancy, a clear application route, and control over how your profile is used.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/jobs" className="inline-flex items-center gap-2 rounded-xl bg-[hsl(38,92%,50%)] px-6 py-3 font-semibold text-[hsl(222,47%,11%)]">
                Search current roles <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/candidate-safety" className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white">Candidate safety</Link>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-5xl px-4 py-16 md:py-20">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Search, title: "Current vacancies", text: "Only roles that pass the publication gate appear on the jobs page." },
              { icon: FileCheck2, title: "Clear role context", text: "Review the employer, location, requirements, expiry, and application route." },
              { icon: UserCheck, title: "Consent and data rights", text: "Know the mandate before profile sharing and request correction or deletion when needed." },
              { icon: ShieldCheck, title: "No application fee", text: `${noFeeClaim} Do not pay to arrange an interview or release an offer letter.` },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-border p-6">
                <Icon className="h-6 w-6 text-accent" />
                <h2 className="mt-4 font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-border bg-muted/30 p-6 md:p-8">
            <h2 className="text-xl font-bold">Your privacy choices</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Use the published privacy and grievance routes to ask what data Talpro holds,
              correct it, withdraw consent, request deletion subject to legal retention,
              or report misuse.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/privacy-policy" className="rounded-xl bg-[hsl(222,47%,11%)] px-5 py-3 text-sm font-semibold text-white">Privacy and data rights</Link>
              <Link href="/grievance" className="rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold">Raise a concern</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
