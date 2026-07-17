import { Link } from "wouter";
import { BadgeIndianRupee, FileCheck2, ShieldAlert, UserCheck } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getApprovedPublicClaim } from "@shared/claim-registry";

const noFeeClaim = getApprovedPublicClaim("candidate-no-application-fee");

const protections = [
  {
    icon: BadgeIndianRupee,
    title: "No application fee",
    text: `${noFeeClaim} Do not pay anyone to submit an application, arrange an interview, or release an offer letter.`,
  },
  {
    icon: FileCheck2,
    title: "Verify the role",
    text: "Treat a vacancy as official only when it appears on the Talpro jobs page with a permanent role URL, current expiry date, employer, location, and HTTPS application link.",
  },
  {
    icon: UserCheck,
    title: "Consent before profile sharing",
    text: "Ask which mandate your profile is being considered for. Candidate information should be shared only for a relevant opportunity and with your knowledge.",
  },
  {
    icon: ShieldAlert,
    title: "Pause and report fraud",
    text: "Stop if someone requests money, passwords, one-time codes, banking credentials, or identity documents before a verified onboarding step. Preserve the message and report it.",
  },
];

export default function CandidateSafety() {
  return (
    <>
      <SEO
        title="Candidate Safety, Fees & Fraud Protection | Talpro"
        description="How candidates can verify Talpro roles, avoid recruitment fraud, understand application fees, and exercise data rights."
        path="/candidate-safety"
      />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Candidate Safety" }]} />
        <section className="bg-[hsl(222,47%,11%)] py-16 text-white md:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(187,92%,41%)]">Candidate protection</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Apply safely and stay in control</h1>
            <p className="mx-auto mt-5 max-w-2xl text-white/70">Verify the vacancy, understand how your data is used, and never pay to apply.</p>
          </div>
        </section>
        <section className="mx-auto max-w-5xl px-4 py-14 md:py-20">
          <div className="grid gap-5 md:grid-cols-2">
            {protections.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-border p-6">
                <Icon className="h-6 w-6 text-accent" />
                <h2 className="mt-4 text-lg font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 rounded-2xl bg-muted/40 p-6 md:p-8">
            <h2 className="text-xl font-bold">Report a concern or change your data</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Report suspected impersonation to <a className="underline" href="mailto:grievance@talproindia.com">grievance@talproindia.com</a>.
              For access, correction, consent withdrawal, or deletion requests, use the published privacy route.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/jobs" className="rounded-xl bg-[hsl(222,47%,11%)] px-5 py-3 text-sm font-semibold text-white">View verified roles</Link>
              <Link href="/privacy-policy" className="rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold">Privacy and data rights</Link>
              <Link href="/grievance" className="rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold">Grievance route</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
