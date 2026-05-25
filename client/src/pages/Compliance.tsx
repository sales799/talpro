import { Link } from "wouter";
import SEO from "@/components/SEO";

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-200 py-3 md:flex-row md:items-baseline md:gap-6">
      <div className="md:w-48 shrink-0 text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </div>
      <div className="text-sm text-slate-800 leading-relaxed">{value}</div>
    </div>
  );
}

export default function Compliance() {
  return (
    <>
      <SEO
        title="Compliance & Legal Entity Disclosure — TALPRO INDIA PRIVATE LIMITED"
        description="Statutory legal entity disclosure for TALPRO INDIA PRIVATE LIMITED — registered office and statutory contacts under Companies Act 2013, IT Rules 2021, DPDPA 2023."
        path="/legal/compliance"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "TALPRO INDIA PRIVATE LIMITED",
            alternateName: ["Talpro India Pvt. Ltd.", "Talpro India"],
            legalName: "TALPRO INDIA PRIVATE LIMITED",
            url: "https://talproindia.com",
            email: "compliance@talproindia.com",
            telephone: "+91-80-4094-8407",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "Flat No. A-103, Prospect Princeton, 1st Floor, Manipal County Road, Singasandra, Bommanahalli",
              addressLocality: "Bengaluru",
              addressRegion: "Karnataka",
              postalCode: "560068",
              addressCountry: "IN",
            },
          }),
        }}
      />

      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <header className="mb-10 border-b border-slate-200 pb-8">
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-600">
            Legal · Statutory disclosure
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Compliance &amp; Legal Entity Disclosure
          </h1>
          <p className="mt-4 text-sm italic text-slate-600">
            Published under the Companies Act 2013, the Information Technology
            (Intermediary Guidelines) Rules 2021, the Digital Personal Data Protection
            Act 2023, and the Consumer Protection (E-Commerce) Rules 2020.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-slate-900">Legal entity</h2>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm leading-relaxed text-slate-700">
              The operating company behind this website (talproindia.com), the
              pramaan.online verification platform, and the Talpro product suite is:
            </p>
            <p className="mt-3 text-2xl font-bold tracking-wide text-slate-900">
              TALPRO INDIA PRIVATE LIMITED
            </p>
            <p className="mt-2 text-xs italic text-slate-600">
              Also referenced commercially as &ldquo;Talpro India Pvt. Ltd.&rdquo; or
              &ldquo;Talpro India.&rdquo; The form above is the canonical legal name
              as registered with the Ministry of Corporate Affairs, Government of India.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-slate-900">Registered office</h2>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-sm leading-relaxed text-slate-800">
            Flat No. A-103, Prospect Princeton, 1st Floor,<br />
            Manipal County Road, Singasandra, Bommanahalli,<br />
            Bengaluru Urban,<br />
            Karnataka 560068, India
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-slate-900">Statutory contacts</h2>
          <Row
            label="Compliance Officer"
            value={
              <span>
                <a className="text-amber-600 hover:underline" href="mailto:compliance@talproindia.com">
                  compliance@talproindia.com
                </a>{" "}
                · +91 80 4094 8407
              </span>
            }
          />
          <Row
            label="Data Protection Officer"
            value={
              <a className="text-amber-600 hover:underline" href="mailto:dpo@talproindia.com">
                dpo@talproindia.com
              </a>
            }
          />
          <Row
            label="Grievance Officer"
            value={
              <span>
                <a className="text-amber-600 hover:underline" href="mailto:grievance@talproindia.com">
                  grievance@talproindia.com
                </a>{" "}
                ·{" "}
                <Link href="/grievance" className="text-amber-600 hover:underline">
                  Grievance redressal page
                </Link>
              </span>
            }
          />
          <Row
            label="Legal notices"
            value={
              <a className="text-amber-600 hover:underline" href="mailto:legal@talproindia.com">
                legal@talproindia.com
              </a>
            }
          />
          <Row
            label="General enquiries"
            value={
              <span>
                <a className="text-amber-600 hover:underline" href="mailto:hello@talproindia.com">
                  hello@talproindia.com
                </a>{" "}
                · +91 80 4094 8407
              </span>
            }
          />
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold text-slate-900">Policy library</h2>
          <ul className="space-y-2 text-sm text-slate-800">
            <li>
              <Link href="/privacy-policy" className="text-amber-600 hover:underline">
                Privacy Policy
              </Link>{" "}
              — DPDPA 2023 compliant
            </li>
            <li>
              <Link href="/terms-of-service" className="text-amber-600 hover:underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/grievance" className="text-amber-600 hover:underline">
                Grievance Redressal Mechanism
              </Link>
            </li>
            <li>
              <Link href="/refund" className="text-amber-600 hover:underline">
                Refund &amp; Cancellation Policy
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="text-amber-600 hover:underline">
                Shipping &amp; Delivery Policy
              </Link>{" "}
              (digital delivery)
            </li>
            <li>
              <Link href="/contact" className="text-amber-600 hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-6 text-xs italic text-slate-500">
          For KYC, vendor due diligence, or regulatory enquiries that require
          additional statutory documents, please write to{" "}
          <a className="text-amber-600 hover:underline" href="mailto:legal@talproindia.com">
            legal@talproindia.com
          </a>{" "}
          and we will share what is appropriate under signed NDA. Such documents are
          not published on this site.
        </footer>
      </div>
    </>
  );
}
