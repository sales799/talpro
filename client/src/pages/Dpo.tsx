import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Dpo() {
  return (
    <>
      <SEO
        title="Data Protection Officer | TALPRO India"
        description="Data protection contact and records-of-processing summary for TALPRO INDIA PRIVATE LIMITED."
        path="/dpo"
      />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'DPO' }]} />
        <section className="mx-auto max-w-4xl px-4 py-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary/70">
            Privacy Governance
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight">
            Data Protection Officer
          </h1>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              TALPRO INDIA PRIVATE LIMITED processes candidate, client, vendor, and website data for staffing, recruitment, compliance, and business communication purposes.
            </p>
            <div className="rounded-lg border border-border bg-muted/30 p-5">
              <h2 className="mb-2 text-lg font-semibold text-foreground">DPO contact</h2>
              <p>Email: <a className="underline" href="mailto:dpo@talproindia.com">dpo@talproindia.com</a></p>
              <p>Grievance Officer: <a className="underline" href="mailto:privacy@talproindia.com">privacy@talproindia.com</a></p>
              <p>Response SLA: acknowledgement within 72 hours.</p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Records-of-processing summary</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>Candidate profiles, CVs, role preferences, interview feedback, and placement communication.</li>
                <li>Client hiring briefs, commercial correspondence, staffing requests, and contract records.</li>
                <li>Website inquiries, newsletter subscriptions, analytics events, and consent records.</li>
                <li>Retention follows business, statutory, dispute-resolution, and consent-withdrawal requirements.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
