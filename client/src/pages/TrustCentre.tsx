import { Link } from "wouter";
import { CheckCircle2, Clock3, ExternalLink, ShieldCheck } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { trustRegistry, type TrustStatus } from "@shared/trust-registry";

const statusLabel: Record<TrustStatus, string> = {
  verified_public: "Verified public",
  published_baseline: "Published baseline",
  evidence_required: "Evidence required",
  not_claimed: "Not publicly claimed",
};

function StatusIcon({ status }: { status: TrustStatus }) {
  return status === "verified_public" || status === "published_baseline"
    ? <CheckCircle2 className="h-5 w-5 text-emerald-600" />
    : <Clock3 className="h-5 w-5 text-amber-600" />;
}

export default function TrustCentre() {
  return (
    <>
      <SEO
        title="Trust & Procurement Centre | Talpro India"
        description="Talpro's public legal, privacy, security, candidate-protection, accessibility, and procurement evidence status."
        path="/trust"
      />
      <div className="pt-16">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Trust & Procurement" }]} />
        <section className="bg-[hsl(222,47%,11%)] py-16 text-white md:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <ShieldCheck className="mx-auto mb-5 h-10 w-10 text-warning" />
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Trust & Procurement Centre</h1>
            <p className="mx-auto mt-5 max-w-2xl text-white/70">
              A clear view of what is public, what requires mandate-specific review,
              and what Talpro does not claim without current evidence.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-14 md:py-20">
          <div className="grid gap-5 md:grid-cols-2">
            {trustRegistry.map((control) => (
              <article key={control.id} className="rounded-2xl border border-border bg-background p-6">
                <div className="flex items-start gap-3">
                  <StatusIcon status={control.status} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="font-bold">{control.title}</h2>
                      <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold">
                        {statusLabel[control.status]}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {control.publicSummary}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">Accountable owner: {control.owner}</p>
                    {control.href && (
                      <Link href={control.href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
                        Review public record <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-muted/30 p-6 md:p-8">
            <h2 className="text-xl font-bold">Procurement request</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Supporting documents are not posted publicly when they contain sensitive,
              personal, commercial, or security information. Request the relevant pack for
              a defined mandate; release remains subject to verification, authorization,
              and an appropriate confidentiality process.
            </p>
            <Link href="/contact" className="mt-5 inline-flex rounded-xl bg-[hsl(222,47%,11%)] px-5 py-3 text-sm font-semibold text-white">
              Start a procurement request
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
