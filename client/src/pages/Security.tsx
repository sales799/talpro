import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Security() {
  return (
    <>
      <SEO
        title="Responsible Disclosure | TALPRO India"
        description="Responsible disclosure policy for TALPRO INDIA PRIVATE LIMITED."
        path="/security"
      />
      <div className="pt-16">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Security' }]} />
        <section className="mx-auto max-w-4xl px-4 py-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary/70">
            Responsible Disclosure
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight">
            Security Reporting
          </h1>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              If you believe you have found a vulnerability in talproindia.com or related Talpro India systems, please report it responsibly.
            </p>
            <div className="rounded-lg border border-border bg-muted/30 p-5">
              <h2 className="mb-2 text-lg font-semibold text-foreground">Contact</h2>
              <p>Email: <a className="underline" href="mailto:security@talproindia.com">security@talproindia.com</a></p>
              <p>Abuse reports: <a className="underline" href="mailto:abuse@talproindia.com">abuse@talproindia.com</a></p>
              <p>Reports are logged and triaged according to severity. The assigned contact will communicate the case-specific next step and disclosure plan where applicable.</p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-semibold text-foreground">In scope</h2>
              <p>Public web application, public API endpoints, authentication/session handling, and security headers.</p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Out of scope</h2>
              <p>Spam, social engineering, physical attacks, denial-of-service testing, automated noisy scanning, and findings requiring compromised third-party accounts.</p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-semibold text-foreground">Safe harbor</h2>
              <p>Good-faith testing that avoids privacy harm, service disruption, data exfiltration, and persistence will be treated as authorized security research.</p>
            </div>
            <div id="hall-of-fame">
              <h2 className="mb-2 text-lg font-semibold text-foreground">Hall of Fame</h2>
              <p>No public acknowledgements have been published yet.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
