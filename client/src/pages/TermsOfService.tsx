import { useState, useEffect } from 'react';
import {
  Shield, FileText, Clock, Mail, Phone, MapPin,
  ChevronDown, ChevronUp, ArrowUp, Scale, Handshake,
  CreditCard, Eye, Users, Building2, AlertTriangle,
  UserCheck, Settings, ScrollText, RefreshCw
} from 'lucide-react';
import SEO from '@/components/SEO';

/* ── Section data ──────────────────────────────────────────────────── */

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

const LAST_UPDATED = 'March 14, 2026';

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed text-muted-foreground mb-3">{children}</p>;
}
function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5 mb-3 ml-2">{children}</ul>;
}

const sections: Section[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    icon: Handshake,
    content: (
      <>
        <P>
          These Terms of Service ("Terms") govern the relationship between TALPRO INDIA PRIVATE LIMITED
          (commonly referenced as "TalPro India", "TalPro", "we", "us"; CIN U74999KA2020PTC135946;
          GSTIN 29AAHCT9485A1ZX) and any organisation or individual ("Client", "you")
          that engages our IT staffing, recruitment, or workforce solutions.
        </P>
        <P>
          By submitting a staffing request, signing a service agreement, or using our
          website at talproindia.com, you acknowledge that you have read, understood, and
          agree to be bound by these Terms. If you are acting on behalf of an organisation,
          you represent that you have authority to bind that organisation.
        </P>
        <P>
          These Terms apply to all service lines including contract staffing, permanent
          recruitment, executive search, GCC setup advisory, and any related workforce
          solutions we provide.
        </P>
      </>
    ),
  },
  {
    id: 'services',
    title: 'Services Description',
    icon: Building2,
    content: (
      <>
        <P>TalPro provides the following IT staffing and recruitment services:</P>
        <UL>
          <li><strong>Contract Staffing</strong> — Deploying pre-vetted technology professionals on time-bound engagements. Candidates remain on TalPro's payroll for the duration of the contract.</li>
          <li><strong>Permanent Recruitment</strong> — Sourcing, screening, and presenting candidates for full-time positions within your organisation.</li>
          <li><strong>Executive Search</strong> — Retained search for C-suite, VP, and Director-level technology leadership roles.</li>
          <li><strong>GCC Accelerator</strong> — End-to-end advisory and talent pipeline services for establishing Global Capability Centers in India.</li>
          <li><strong>Payroll & Compliance</strong> — Managing statutory compliance, payroll processing, and benefits administration for contract staff deployed through TalPro.</li>
        </UL>
        <P>
          The specific scope, deliverables, and commercial terms for each engagement are
          detailed in individual service agreements or statements of work ("SOW") executed
          between TalPro and the Client.
        </P>
      </>
    ),
  },
  {
    id: 'client-responsibilities',
    title: 'Client Responsibilities',
    icon: UserCheck,
    content: (
      <>
        <P>As a Client engaging TalPro's services, you agree to:</P>
        <UL>
          <li>Provide accurate and complete job descriptions, including required skills, experience levels, and reporting structures.</li>
          <li>Conduct interviews and provide feedback on presented candidates within mutually agreed timelines.</li>
          <li>Maintain a safe and compliant workplace for all deployed contract staff, in accordance with applicable labour laws.</li>
          <li>Not directly solicit, recruit, or hire any candidate introduced by TalPro outside the agreed engagement terms (see Non-Solicitation clause).</li>
          <li>Process invoices and make payments within the agreed credit period.</li>
          <li>Promptly inform TalPro of any performance concerns regarding deployed staff.</li>
        </UL>
      </>
    ),
  },
  {
    id: 'fees-payment',
    title: 'Fees & Payment Terms',
    icon: CreditCard,
    content: (
      <>
        <P>
          <strong>Permanent Recruitment:</strong> Fees are calculated as a percentage of the
          candidate's annual cost-to-company (CTC) as agreed in the service contract. The
          fee becomes payable upon the candidate's acceptance of the offer or date of joining,
          as specified in the SOW.
        </P>
        <P>
          <strong>Contract Staffing:</strong> Billing is on a per-resource, per-month (or
          per-hour) basis as defined in the rate card or SOW. Invoices are raised monthly
          and are payable within the agreed credit period (typically 30 days from invoice date).
        </P>
        <P>
          <strong>Executive Search:</strong> Retainer-based fee structure with milestones
          defined in the engagement letter. A non-refundable initiation fee is payable upon
          commencement of the search.
        </P>
        <P>
          Late payments beyond the agreed credit period will attract interest at 1.5% per
          month or the maximum rate permitted by law, whichever is lower. TalPro reserves
          the right to suspend services if invoices remain unpaid beyond 60 days.
        </P>
      </>
    ),
  },
  {
    id: 'replacement-guarantee',
    title: 'Replacement Guarantee',
    icon: RefreshCw,
    content: (
      <>
        <P>
          For permanent recruitment mandates, TalPro offers a replacement guarantee for
          candidates who leave or are terminated within the guarantee period specified in
          the service agreement (typically 90 days from the date of joining).
        </P>
        <P>The replacement guarantee is subject to the following conditions:</P>
        <UL>
          <li>The guarantee applies only when the candidate's departure is voluntary or due to performance reasons directly related to the role for which they were recruited.</li>
          <li>The guarantee does not apply if the role is eliminated, the candidate is made redundant, or the Client's work environment materially changes from what was described during the hiring process.</li>
          <li>The Client must notify TalPro in writing within 5 business days of the candidate's departure.</li>
          <li>TalPro will provide one replacement candidate search at no additional fee. If no suitable replacement is identified within a reasonable timeframe, a pro-rated credit will be applied toward future engagements.</li>
        </UL>
      </>
    ),
  },
  {
    id: 'non-solicitation',
    title: 'Non-Solicitation',
    icon: Users,
    content: (
      <>
        <P>
          During the term of any active service agreement and for a period of 12 months
          following its expiry or termination, the Client agrees not to directly or
          indirectly solicit, recruit, or hire any candidate introduced by TalPro without
          TalPro's prior written consent.
        </P>
        <P>
          "Introduced" means any candidate whose profile, resume, or details were shared
          by TalPro with the Client, regardless of whether the candidate was interviewed,
          shortlisted, or ultimately hired for the original mandate.
        </P>
        <P>
          If the Client hires an introduced candidate outside the agreed terms, TalPro
          reserves the right to invoice the Client at the standard permanent recruitment
          fee applicable to the candidate's CTC.
        </P>
      </>
    ),
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality',
    icon: Eye,
    content: (
      <>
        <P>
          Both parties agree to maintain the confidentiality of all proprietary information
          exchanged during the course of the engagement. Confidential information includes
          but is not limited to:
        </P>
        <UL>
          <li>Candidate profiles, resumes, assessment results, and compensation details shared by TalPro.</li>
          <li>Client's organisational structure, hiring plans, compensation benchmarks, and strategic initiatives.</li>
          <li>Commercial terms, fee structures, and rate cards.</li>
          <li>Any information explicitly marked as confidential by either party.</li>
        </UL>
        <P>
          Confidential information shall not be disclosed to third parties without prior
          written consent, except as required by law or regulatory authority. This obligation
          survives the termination of the service agreement for a period of 2 years.
        </P>
      </>
    ),
  },
  {
    id: 'candidate-representation',
    title: 'Candidate Representation',
    icon: Shield,
    content: (
      <>
        <P>
          TalPro exercises reasonable diligence in screening and presenting candidates,
          including verification of qualifications, experience, and references where
          applicable. However, TalPro does not guarantee:
        </P>
        <UL>
          <li>The accuracy of information provided by candidates in their resumes or during interviews.</li>
          <li>A candidate's future performance, conduct, or continued employment.</li>
          <li>That candidates will pass the Client's internal assessments, background checks, or probation periods.</li>
        </UL>
        <P>
          The final hiring decision rests solely with the Client. TalPro recommends that
          Clients conduct their own due diligence, including reference checks and background
          verification, before extending offers.
        </P>
      </>
    ),
  },
  {
    id: 'contract-staff',
    title: 'Contract Staff Terms',
    icon: FileText,
    content: (
      <>
        <P>
          For contract staffing engagements, deployed professionals remain employees of
          TalPro (or TalPro's payroll partner) for the duration of the assignment. The
          Client is responsible for:
        </P>
        <UL>
          <li>Day-to-day work supervision and task assignment.</li>
          <li>Providing necessary tools, access, and workspace (physical or virtual).</li>
          <li>Ensuring compliance with workplace safety regulations.</li>
        </UL>
        <P>
          TalPro handles statutory compliance (PF, ESI, Professional Tax, TDS), payroll
          processing, leave administration, and insurance for deployed contract staff.
        </P>
        <P>
          <strong>Right-to-Hire Conversion:</strong> If the Client wishes to convert a
          contract resource to a permanent employee, a conversion fee (as specified in the
          SOW or rate card) shall apply. The conversion fee is typically calculated based on
          the remaining contract tenure and the permanent recruitment fee applicable to the
          role.
        </P>
      </>
    ),
  },
  {
    id: 'warranties',
    title: 'Warranties & Disclaimers',
    icon: AlertTriangle,
    content: (
      <>
        <P>
          TalPro warrants that it will perform its services with reasonable skill and care,
          consistent with generally accepted industry practices for IT staffing and
          recruitment in India.
        </P>
        <P>
          Except as expressly stated in these Terms or in a signed service agreement, TalPro
          makes no warranties, express or implied, regarding the suitability, availability,
          or performance of candidates. All implied warranties, including merchantability and
          fitness for a particular purpose, are disclaimed to the fullest extent permitted
          by law.
        </P>
        <P>
          TalPro does not warrant specific timelines for candidate placement. While we
          commit to presenting a first shortlist within 48 business hours for most roles,
          actual placement timelines depend on role complexity, market conditions, and the
          Client's interview and decision-making processes.
        </P>
      </>
    ),
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    icon: Scale,
    content: (
      <>
        <P>
          To the maximum extent permitted by applicable law, TalPro's total aggregate
          liability under or in connection with these Terms — whether in contract, tort
          (including negligence), or otherwise — shall not exceed the total fees paid by
          the Client to TalPro in the 12 months preceding the event giving rise to the claim.
        </P>
        <P>In no event shall TalPro be liable for:</P>
        <UL>
          <li>Indirect, incidental, special, consequential, or punitive damages.</li>
          <li>Loss of profits, revenue, business, or anticipated savings.</li>
          <li>Damages arising from the acts, omissions, or misrepresentations of candidates placed through our services.</li>
          <li>Business interruption caused by a candidate's departure, underperformance, or misconduct.</li>
        </UL>
      </>
    ),
  },
  {
    id: 'termination',
    title: 'Termination',
    icon: Clock,
    content: (
      <>
        <P>
          Either party may terminate an active service agreement by providing 30 days'
          written notice to the other party.
        </P>
        <P>
          <strong>Immediate Termination:</strong> Either party may terminate immediately
          upon written notice if the other party: (a) commits a material breach that remains
          uncured for 15 days after written notice; (b) becomes insolvent or enters
          liquidation; or (c) engages in conduct that materially damages the other party's
          reputation.
        </P>
        <P>Upon termination:</P>
        <UL>
          <li>All outstanding invoices become immediately due and payable.</li>
          <li>For contract staffing, a 30-day transition period will apply for deployed resources unless otherwise agreed.</li>
          <li>Non-solicitation obligations remain in effect for the specified period post-termination.</li>
          <li>Confidentiality obligations survive termination as specified.</li>
          <li>Any active candidate searches will be concluded, and fees for candidates hired as a result remain payable.</li>
        </UL>
      </>
    ),
  },
  {
    id: 'governing-law',
    title: 'Governing Law & Dispute Resolution',
    icon: Scale,
    content: (
      <>
        <P>
          These Terms shall be governed by and construed in accordance with the laws of
          India. Any disputes arising out of or in connection with these Terms shall be
          subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.
        </P>
        <P>
          Before initiating legal proceedings, both parties agree to attempt to resolve
          disputes through good-faith negotiation for a period of 30 days. If negotiation
          fails, either party may refer the dispute to arbitration under the Arbitration
          and Conciliation Act, 1996, with a single arbitrator appointed by mutual consent
          in Bangalore.
        </P>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to These Terms',
    icon: Settings,
    content: (
      <>
        <P>
          TalPro reserves the right to update these Terms at any time. Material changes
          will be communicated to active Clients via email at least 30 days before they
          take effect. Continued use of our services after the effective date of any
          changes constitutes acceptance of the updated Terms.
        </P>
        <P>
          The "Last Updated" date at the top of this page reflects the most recent revision.
          We encourage Clients to review these Terms periodically.
        </P>
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Contact Information',
    icon: Mail,
    content: (
      <>
        <P>For questions regarding these Terms or our services, please contact us:</P>
        <div className="grid sm:grid-cols-2 gap-4 mt-2">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
            <Mail className="h-4 w-4 text-accent mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-medium">Email</div>
              <div className="text-sm text-muted-foreground">legal@talproindia.com</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
            <Phone className="h-4 w-4 text-accent mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-medium">Phone</div>
              <div className="text-sm text-muted-foreground">+91 80 4567 8900</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 sm:col-span-2">
            <MapPin className="h-4 w-4 text-accent mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-medium">Registered Office</div>
              <div className="text-sm text-muted-foreground">
                TalPro India, Bangalore, Karnataka, India
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

/* ── Component ─────────────────────────────────────────────────────── */

export default function TermsOfService() {
  const [expandedSections, setExpandedSections] = useState<string[]>(
    sections.map((s) => s.id) // all open by default
  );
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggle = (id: string) =>
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  return (
    <>
      <SEO
        title="Terms of Service — IT Staffing & Recruitment"
        description="Terms governing TalPro's IT staffing, contract recruitment, permanent hiring, and executive search services. Fair, transparent terms for technology workforce solutions in India."
        path="/terms-of-service"
      />

      <div className="pt-20 pb-16">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-[hsl(222,47%,11%)] to-[hsl(222,47%,15%)] text-white py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs font-medium tracking-wide uppercase mb-6">
              <ScrollText className="h-3.5 w-3.5" />
              Legal
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-base text-white/70 max-w-2xl mx-auto mb-3">
              Clear, fair terms for our IT staffing and recruitment services.
              Built on transparency and mutual respect.
            </p>
            <p className="text-sm text-white/50">Last updated: {LAST_UPDATED}</p>
          </div>
        </section>

        {/* ── Content ───────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="space-y-4">
            {sections.map((section) => {
              const Icon = section.icon;
              const isOpen = expandedSections.includes(section.id);
              return (
                <div
                  key={section.id}
                  id={section.id}
                  className="rounded-2xl border border-border bg-background overflow-hidden"
                >
                  <button
                    onClick={() => toggle(section.id)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-accent/10 text-accent shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h2 className="text-base font-semibold tracking-tight">
                        {section.title}
                      </h2>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                      <div className="pl-12">{section.content}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Summary bar ─────────────────────────────────── */}
          <div className="mt-10 rounded-2xl bg-muted/40 border border-border p-6 md:p-8">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <Scale className="h-5 w-5 mx-auto mb-2 text-accent" />
                <div className="text-sm font-semibold">Fair Terms</div>
                <div className="text-xs text-muted-foreground">Balanced & reasonable</div>
              </div>
              <div>
                <Handshake className="h-5 w-5 mx-auto mb-2 text-accent" />
                <div className="text-sm font-semibold">Professional</div>
                <div className="text-xs text-muted-foreground">Industry-standard practices</div>
              </div>
              <div>
                <Shield className="h-5 w-5 mx-auto mb-2 text-accent" />
                <div className="text-sm font-semibold">Transparent</div>
                <div className="text-xs text-muted-foreground">Clear, plain language</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Back to top ────────────────────────────────────── */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 h-10 w-10 rounded-full bg-accent text-white shadow-lg flex items-center justify-center hover:bg-accent/90 transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </>
  );
}
