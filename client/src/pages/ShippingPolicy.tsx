import { Link } from "wouter";
import SEO from "@/components/SEO";

export default function ShippingPolicy() {
  return (
    <>
      <SEO
        title="Shipping & Delivery Policy — TALPRO INDIA PRIVATE LIMITED"
        description="Shipping and delivery policy for TALPRO INDIA PRIVATE LIMITED — digital-only services. No physical goods shipped. Delivery method and timeline per product."
        path="/shipping"
      />
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24 prose prose-slate">
        <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-600 not-prose">
          Legal · Shipping &amp; delivery
        </div>
        <h1>Shipping &amp; Delivery Policy</h1>
        <p className="not-prose text-sm italic text-slate-600">
          Applies to all services operated by TALPRO INDIA PRIVATE LIMITED.
        </p>

        <p>
          <strong>TALPRO INDIA PRIVATE LIMITED</strong> (CIN U74999KA2020PTC135946;
          GSTIN 29AAHCT9485A1ZX) operates <strong>digital services only</strong>. We do
          not ship physical goods. This page complies with the Consumer Protection
          (E-Commerce) Rules 2020 and standard payment-gateway KYC requirements.
        </p>

        <h2>1. Delivery method — all products</h2>
        <ul>
          <li><strong>Talpro Staffing</strong> — placement and consulting deliverables (shortlists, reports, candidate dossiers) are delivered electronically per the Statement of Work.</li>
          <li><strong>PRAMAAN</strong> — worker badges issued as digital QR codes accessible at{" "}
            <a className="text-amber-600 hover:underline" href="https://pramaan.online" target="_blank" rel="noopener noreferrer">pramaan.online</a>;
            verification verdicts returned in-app and via API.
          </li>
          <li><strong>Talpro Universe</strong> — newsletter editions delivered to the registered email and via talprouniverse.com after sign-in.</li>
          <li><strong>Jharokha</strong> — software, mobile app access, and cloud features delivered digitally on activation. Any physical doorbell hardware, when bundled, ships via partner logistics under the specific product terms in effect at purchase.</li>
        </ul>

        <h2>2. Delivery timeline</h2>
        <ul>
          <li><strong>Instant</strong> — for email confirmations, PRAMAAN verdicts (2-minute target SLA), account activations.</li>
          <li><strong>Within 24 hours</strong> — for PRAMAAN badge issuance after KYC completion.</li>
          <li><strong>Per signed SOW</strong> — for staffing engagements.</li>
        </ul>

        <h2>3. Delivery failure</h2>
        <p>
          If a digital delivery fails for a reason attributable to us, see our{" "}
          <Link href="/refund" className="text-amber-600 hover:underline">Refund &amp; Cancellation Policy</Link>{" "}
          for refund / re-delivery.
        </p>

        <h2>4. Customs, duties, and import</h2>
        <p>
          As digital-only services, none of our products attract customs duties or
          import tariffs. GST is charged where applicable under Indian law and shown on
          the invoice.
        </p>

        <h2>5. Contact</h2>
        <p>
          Delivery questions:{" "}
          <a className="text-amber-600 hover:underline" href="mailto:support@talproindia.com">support@talproindia.com</a>{" "}
          · +91 80 4094 8407. For grievances, see{" "}
          <Link href="/grievance" className="text-amber-600 hover:underline">/grievance</Link>.
        </p>

        <p className="not-prose text-xs italic text-slate-500 mt-8">
          Last reviewed: 14 May 2026.
        </p>
      </div>
    </>
  );
}
