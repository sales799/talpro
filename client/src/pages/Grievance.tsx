import { Link } from "wouter";
import SEO from "@/components/SEO";

export default function Grievance() {
  return (
    <>
      <SEO
        title="Grievance Redressal — TALPRO INDIA PRIVATE LIMITED"
        description="Grievance redressal mechanism for TALPRO INDIA PRIVATE LIMITED under IT (Intermediary Guidelines) Rules 2021 and DPDPA 2023. Grievance officer contact, response timelines, escalation."
        path="/grievance"
      />
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24 prose prose-slate">
        <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-800 not-prose">
          Legal · Grievance redressal
        </div>
        <h1>Grievance Redressal Mechanism</h1>
        <p className="not-prose text-sm italic text-slate-600">
          Published under Rule 3(2) of the Information Technology (Intermediary
          Guidelines and Digital Media Ethics Code) Rules 2021 and §32 of the Digital
          Personal Data Protection Act 2023.
        </p>

        <p>
          <strong>TALPRO INDIA PRIVATE LIMITED</strong> takes complaints, data-subject
          requests, and content concerns seriously and responds on statutory timelines.
        </p>

        <h2>Grievance Officer</h2>
        <div className="not-prose rounded-lg border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm leading-relaxed text-slate-800">
            <strong>Office:</strong> Grievance Officer, TALPRO INDIA PRIVATE LIMITED<br />
            <strong>Email:</strong>{" "}
            <a className="text-amber-800 underline underline-offset-2 hover:text-amber-900" href="mailto:grievance@talproindia.com">
              grievance@talproindia.com
            </a><br />
            <strong>Phone:</strong> +91 80 4094 8407 (10:00–18:00 IST, Mon–Fri)<br />
            <strong>Postal address:</strong> Flat No. A-103, Prospect Princeton, 1st
            Floor, Manipal County Road, Singasandra, Bommanahalli, Bengaluru Urban,
            Karnataka 560068, India.
          </p>
        </div>

        <h2>What you can raise</h2>
        <ul>
          <li>Complaints about staffing engagements, placements, candidate experience, or fees.</li>
          <li>Complaints about content published on talproindia.com.</li>
          <li>
            <strong>Data-subject rights requests</strong> under the DPDPA 2023 — access,
            correction, erasure, grievance redressal, and withdrawal of consent.
          </li>
          <li>Reports of fraudulent use of the Talpro brand or impersonation.</li>
        </ul>

        <h2>How to raise a grievance</h2>
        <ol>
          <li>
            <strong>Email</strong> the Grievance Officer at{" "}
            <a className="text-amber-800 underline underline-offset-2 hover:text-amber-900" href="mailto:grievance@talproindia.com">
              grievance@talproindia.com
            </a>{" "}
            with subject line <code>Grievance — [topic]</code>.
          </li>
          <li>
            Include: your name, contact information, URL/service in question, a clear
            description of the complaint, and any evidence.
          </li>
          <li>
            For data-subject requests, also state which DPDPA right you are exercising
            and a proof of identity.
          </li>
        </ol>

        <h2>Response process</h2>
        <ul>
          <li><strong>Log and acknowledge:</strong> the complaint is recorded and assigned to an accountable owner.</li>
          <li><strong>Classify:</strong> the owner confirms whether the matter is a service, privacy, security, fraud, content, or legal request.</li>
          <li><strong>Communicate:</strong> the applicable statutory or case-specific timeline and any information still required are provided to the complainant.</li>
        </ul>

        <h2>Escalation</h2>
        <ul>
          <li><strong>Data Protection Board of India</strong> — for DPDPA-related grievances.</li>
          <li><strong>District Consumer Disputes Redressal Commission, Bengaluru Urban (Karnataka)</strong> — for consumer grievances.</li>
          <li><strong>cybercrime.gov.in</strong> — for grievances involving cybercrime, fraud, or impersonation.</li>
        </ul>

        <p className="not-prose text-xs italic text-slate-600 mt-8">
          Reviewed at minimum every 12 months and revised whenever the underlying law
          changes or the Grievance Officer changes. See also the{" "}
          <Link href="/legal/compliance" className="text-amber-800 underline underline-offset-2 hover:text-amber-900">Compliance Hub</Link>.
        </p>
      </div>
    </>
  );
}
