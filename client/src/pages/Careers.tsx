import { Link } from "wouter";
import { ArrowRight, BriefcaseBusiness, ShieldCheck, Users } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getApprovedPublicClaim } from "@shared/claim-registry";

const noFeeClaim = getApprovedPublicClaim("candidate-no-application-fee");

export default function Careers() {
  return (
    <>
      <SEO
        title="Careers at Talpro"
        description="Learn how Talpro publishes current internal roles and review verified openings without sample vacancies or unsupported employment claims."
        path="/careers"
      />
      <div className="pt-16">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Careers" }]} />
        <section className="bg-[hsl(222,47%,11%)] py-20 text-white md:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(187,92%,41%)]">Careers at Talpro</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">Build accountable talent systems</h1>
            <p className="mx-auto mt-5 max-w-2xl text-white/70">
              Talpro publishes an internal opening only after the role, owner,
              employer, application route, and closing date are verified.
            </p>
            <Link href="/jobs" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[hsl(38,92%,50%)] px-6 py-3 font-semibold text-[hsl(222,47%,11%)]">
              View verified roles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
        <section className="mx-auto max-w-5xl px-4 py-16 md:py-20">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: Users, title: "Candidate respect", text: "Clear role context, consent before profile sharing, and a published route for concerns." },
              { icon: BriefcaseBusiness, title: "Real vacancies only", text: "No sample roles, evergreen placeholders, or applications to an unconfirmed opening." },
              { icon: ShieldCheck, title: "Safe applications", text: `Permanent role URLs, HTTPS application links, closing dates. ${noFeeClaim}` },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-border p-6">
                <Icon className="h-6 w-6 text-accent" />
                <h2 className="mt-4 font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 rounded-2xl bg-muted/30 p-6 text-sm text-muted-foreground">
            If no verified role appears on the jobs page, Talpro is not accepting
            applications for an open website vacancy at that time. Please do not send
            sensitive identity or financial information through unsolicited messages.
          </div>
        </section>
      </div>
    </>
  );
}
