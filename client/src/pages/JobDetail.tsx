import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowUpRight, BriefcaseBusiness, MapPin, ShieldCheck } from "lucide-react";
import type { Job } from "@shared/schema";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getApprovedPublicClaim } from "@shared/claim-registry";

const noFeeClaim = getApprovedPublicClaim("candidate-no-application-fee");

const employmentTypeMap: Record<string, string> = {
  "full-time": "FULL_TIME",
  "part-time": "PART_TIME",
  contract: "CONTRACTOR",
  internship: "INTERN",
};

function jobPostingSchema(job: Job): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.postedDate,
    validThrough: job.expiresAt,
    employmentType: employmentTypeMap[job.employmentType || ""] || "OTHER",
    url: `https://talproindia.com/jobs/${job.slug}`,
    directApply: false,
    hiringOrganization: {
      "@type": "Organization",
      name: job.hiringOrganization,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "IN",
      },
    },
    ...(job.salaryMin && job.salaryMax ? {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: job.salaryCurrency || "INR",
        value: {
          "@type": "QuantitativeValue",
          minValue: job.salaryMin,
          maxValue: job.salaryMax,
          unitText: "YEAR",
        },
      },
    } : {}),
  };
}

export default function JobDetail({ params }: { params: { slug: string } }) {
  const { data: job, isPending, isError } = useQuery<Job>({
    queryKey: [`/api/jobs/${params.slug}`],
  });

  if (isPending) {
    return <main className="min-h-[60vh] pt-32 text-center text-sm text-muted-foreground">Checking role status…</main>;
  }

  if (isError || !job) {
    return (
      <main className="min-h-[60vh] px-4 pt-32 text-center">
        <h1 className="text-3xl font-bold">This role is not available</h1>
        <p className="mt-3 text-muted-foreground">It may have expired, closed, or be temporarily unavailable. No stale role is shown.</p>
        <Link href="/jobs" className="mt-6 inline-flex rounded-xl bg-[hsl(222,47%,11%)] px-5 py-3 text-sm font-semibold text-white">View current roles</Link>
      </main>
    );
  }

  return (
    <>
      <SEO
        title={`${job.title} | Jobs`}
        description={job.description.slice(0, 155)}
        path={`/jobs/${job.slug}`}
        jsonLd={jobPostingSchema(job)}
      />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Jobs", href: "/jobs" }, { label: job.title }]} />
        <section className="bg-[hsl(222,47%,11%)] py-14 text-white md:py-20">
          <div className="mx-auto max-w-4xl px-4">
            <p className="text-sm text-white/60">{job.hiringOrganization}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{job.title}</h1>
            <div className="mt-5 flex flex-wrap gap-5 text-sm text-white/70">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</span>
              <span className="inline-flex items-center gap-1.5"><BriefcaseBusiness className="h-4 w-4" />{job.employmentType || "Not specified"}</span>
              <span>Apply by {new Date(job.expiresAt).toLocaleDateString("en-IN")}</span>
            </div>
          </div>
        </section>
        <section className="mx-auto grid max-w-5xl gap-10 px-4 py-14 md:grid-cols-[1fr_280px] md:py-20">
          <article className="space-y-8">
            <section>
              <h2 className="text-xl font-bold">Role overview</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">{job.description}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold">Requirements</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {(job.requirements || []).map((requirement) => <li key={requirement}>{requirement}</li>)}
              </ul>
            </section>
            {job.benefits && job.benefits.length > 0 && (
              <section>
                <h2 className="text-xl font-bold">Role details and benefits</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  {job.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                </ul>
              </section>
            )}
          </article>
          <aside>
            <div className="sticky top-24 rounded-2xl border border-border p-6">
              <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[hsl(38,92%,50%)] px-5 py-3 text-sm font-semibold text-[hsl(222,47%,11%)]">
                Apply securely <ArrowUpRight className="h-4 w-4" />
              </a>
              <div className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <p>{noFeeClaim} The application opens on a verified HTTPS page.</p>
              </div>
              <Link href="/candidate-safety" className="mt-4 block text-xs font-semibold text-accent hover:underline">Candidate safety guidance</Link>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
