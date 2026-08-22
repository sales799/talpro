import { Link } from "wouter";
import SEO from "@/components/SEO";

export default function RefundPolicy() {
  return (
    <>
      <SEO
        title="Refund & Cancellation Policy — TALPRO INDIA PRIVATE LIMITED"
        description="Refund and cancellation policy for paid services operated by TALPRO INDIA PRIVATE LIMITED — staffing engagements, content subscriptions, PRAMAAN verifications, Jharokha plans."
        path="/refund"
      />
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24 prose prose-slate">
        <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-600 not-prose">
          Legal · Refunds &amp; cancellations
        </div>
        <h1>Refund &amp; Cancellation Policy</h1>
        <p className="not-prose text-sm italic text-slate-600">
          Applies to all paid services operated by TALPRO INDIA PRIVATE LIMITED.
        </p>

        <p>
          <strong>TALPRO INDIA PRIVATE LIMITED</strong> (CIN U74999KA2020PTC135946;
          GSTIN 29AAHCT9485A1ZX) operates the paid services listed below. This policy
          complies with the Consumer Protection (E-Commerce) Rules 2020 and Reserve Bank
          of India directions for payment aggregators.
        </p>

        <h2>1. Services covered</h2>
        <ul>
          <li><strong>Talpro IT Staffing</strong> — placement and consulting engagements invoiced on agreed milestones under a signed MSA / SOW.</li>
          <li><strong>PRAMAAN</strong> — worker badge issuance and per-verification scans on pramaan.online.</li>
          <li><strong>Jharokha</strong> — smart-doorbell subscription plans.</li>
          <li><strong>Talpro Universe</strong> — paid newsletter and membership tiers.</li>
        </ul>

        <h2>2. Staffing engagements</h2>
        <p>
          Staffing fees are governed by the signed Master Services Agreement and the
          individual Statement of Work for each engagement. Any replacement, credit, or
          refund term is mandate-specific, must be stated in the signed agreement, and
          prevails over this page in the event of conflict. This page does not create a
          universal replacement or refund promise for staffing services.
        </p>

        <h2>3. PRAMAAN per-scan verifications</h2>
        <ul>
          <li>A successful verification within published SLA is non-refundable.</li>
          <li>A failed verification caused by a system error on our side is fully refunded within 7 business days.</li>
          <li>Fees are not refunded if a worker correctly fails verification due to a problem with their documents.</li>
        </ul>

        <h2>4. PRAMAAN worker badge (₹19 one-time)</h2>
        <p>
          Refundable in full if the badge fails to activate within 24 hours for a reason
          attributable to us. Once activated and used, non-refundable.
        </p>

        <h2>5. Subscriptions</h2>
        <ul>
          <li>Cancel any subscription anytime via account dashboard or by emailing{" "}
            <a className="text-amber-600 hover:underline" href="mailto:support@talproindia.com">support@talproindia.com</a>.
            Access continues until end of paid period.
          </li>
          <li>Monthly subscriptions: no pro-rata refund.</li>
          <li>Annual subscriptions: full refund within 14 days of original payment, less 5% gateway processing fee. After 14 days, no refund but renewal is stopped.</li>
        </ul>

        <h2>6. How to request a refund</h2>
        <ol>
          <li>Email{" "}
            <a className="text-amber-600 hover:underline" href="mailto:support@talproindia.com">support@talproindia.com</a>{" "}
            with subject <code>Refund — [product] — [order ID]</code>.</li>
          <li>Attach payment confirmation, Razorpay/Cashfree order ID, and reason.</li>
          <li>Acknowledgement within 24 hours; resolution within 7 business days.</li>
        </ol>

        <h2>7. Where the money goes</h2>
        <p>
          Refunds are issued only to the <strong>original payment method</strong> (UPI,
          card, net-banking, wallet) per RBI payment aggregator rules. No cash, cheque,
          or alternate-account refunds.
        </p>

        <h2>8. Chargebacks</h2>
        <p>
          If you raise a chargeback through your bank without first contacting us, your
          account may be temporarily suspended pending investigation. We share
          transaction logs, consent records, and delivery evidence with the bank.
        </p>

        <h2>9. Disputes</h2>
        <p>
          Escalation path:{" "}
          <Link href="/grievance" className="text-amber-600 hover:underline">Grievance Officer</Link>{" "}
          → courts of Bengaluru Urban, Karnataka (exclusive jurisdiction).
        </p>

        <p className="not-prose text-xs italic text-slate-500 mt-8">
          Last reviewed: 14 May 2026.
        </p>
      </div>
    </>
  );
}
