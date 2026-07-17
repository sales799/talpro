import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, BriefcaseBusiness, MapPin, ShieldCheck } from "lucide-react";
import type { JobsResponse } from "@shared/schema";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getApprovedPublicClaim } from "@shared/claim-registry";

const noFeeClaim = getApprovedPublicClaim("candidate-no-application-fee");

export default function Jobs() {
  const { data, isPending, isError } = useQuery<JobsResponse>({ queryKey: ["/api/jobs"] });
  const roles = data?.jobs || [];
  const isUnavailable = isError || data?.availability === "temporarily_unavailable";

  return (
    <>
      <SEO
        title="Verified Technology Jobs | Talpro"
        description="Search current Talpro roles with permanent URLs, current details, expiry dates, and verified application links."
        path="/jobs"
      />
      <div className="pt-16">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Jobs" }]} />
        <section className="bg-[hsl(222,47%,11%)] py-16 text-white md:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(187,92%,41%)]">Current roles</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Verified job openings</h1>
            <p className="mx-auto mt-5 max-w-2xl text-white/70">
              Only current mandates with a verified owner, employer, expiry date,
              and secure application route can appear here.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-14 md:py-20">
          {isPending && <p className="text-center text-sm text-muted-foreground">Checking current roles…</p>}

          {isUnavailable && !isPending && (
            <div className="rounded-2xl border border-border bg-muted/30 p-8 text-center">
              <h2 className="text-xl font-bold">Roles are temporarily unavailable</h2>
              <p className="mt-2 text-sm text-muted-foreground">No unverified fallback jobs are shown. Please check again later.</p>
            </div>
          )}

          {!isPending && !isUnavailable && roles.length === 0 && (
            <div className="rounded-2xl border border-border bg-muted/30 p-8 text-center md:p-12">
              <BriefcaseBusiness className="mx-auto h-9 w-9 text-accent" />
              <h2 className="mt-4 text-2xl font-bold">No verified roles are open today</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Talpro does not publish sample, expired, or unconfirmed vacancies.
                Return to this page for current mandates.
              </p>
            </div>
          )}

          {roles.length > 0 && (
            <div className="space-y-4">
              {roles.map((job) => (
                <article key={job.id} className="rounded-2xl border border-border bg-background p-6">
                  <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                    <div>
                      <h2 className="text-lg font-bold">{job.title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{job.hiringOrganization}</p>
                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                        <span className="inline-flex items-center gap-1"><BriefcaseBusiness className="h-3.5 w-3.5" />{job.employmentType || "Not specified"}</span>
                        <span>Apply by {new Date(job.expiresAt).toLocaleDateString("en-IN")}</span>
                      </div>
                    </div>
                    <Link href={`/jobs/${job.slug}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(222,47%,11%)] px-5 py-3 text-sm font-semibold text-white">
                      View role <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-10 flex items-start gap-3 rounded-2xl border border-border p-6">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <div>
              <h2 className="font-bold">Candidate safety</h2>
              <p className="mt-1 text-sm text-muted-foreground">{noFeeClaim}</p>
              <Link href="/candidate-safety" className="mt-2 inline-block text-sm font-semibold text-accent hover:underline">Read the safety and fraud guidance</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
