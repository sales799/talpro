import { useState, useEffect } from 'react';
import {
  Shield, Eye, Lock, Globe, Users, FileText, Clock, Mail,
  MapPin, ChevronDown, ChevronUp, ArrowUp, Database,
  Settings, UserCheck, ScrollText
} from 'lucide-react';
import SEO from '@/components/SEO';

/* ── Helpers ───────────────────────────────────────────────────────── */

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

/* ── Section data ──────────────────────────────────────────────────── */

const sections: Section[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: FileText,
    content: (
      <>
        <P>
          TALPRO INDIA PRIVATE LIMITED (commonly referenced as "TalPro India", "TalPro", "we", "us"; CIN U74999KA2020PTC135946; GSTIN 29AAHCT9485A1ZX) is committed to protecting the privacy and
          personal data of everyone who interacts with our services — including candidates
          seeking employment, client organisations engaging our staffing solutions, and
          visitors to our website at talproindia.com.
        </P>
        <P>
          This Privacy Policy explains what personal data we collect, why we collect it,
          how we use and protect it, and your rights regarding your data. It applies to all
          personal data processed through our website, recruitment platforms, and offline
          interactions related to our IT staffing and recruitment services.
        </P>
        <P>
          We process personal data in accordance with applicable Indian law, including the
          Information Technology Act, 2000, its associated rules, and the Digital Personal
          Data Protection Act, 2023 (DPDPA) as and when its provisions come into effect.
        </P>
      </>
    ),
  },
  {
    id: 'information-collect',
    title: 'Information We Collect',
    icon: Database,
    content: (
      <>
        <P><strong>From Candidates:</strong></P>
        <UL>
          <li>Name, email address, phone number, and residential location.</li>
          <li>Resume/CV, work history, educational qualifications, and professional certifications.</li>
          <li>Skills, competencies, and technology stack experience.</li>
          <li>Salary expectations and current compensation (when voluntarily provided).</li>
          <li>Assessment and interview feedback collected during our screening process.</li>
          <li>References and background verification data (with your consent).</li>
          <li>Government-issued identification (PAN, Aadhaar) — collected only when required for payroll onboarding of contract staff.</li>
        </UL>
        <P><strong>From Clients:</strong></P>
        <UL>
          <li>Company name, address, and registration details.</li>
          <li>Contact person details (name, designation, email, phone).</li>
          <li>Job descriptions, hiring requirements, and organisational context shared for recruitment purposes.</li>
          <li>Billing and payment information for invoicing.</li>
        </UL>
        <P><strong>From Website Visitors:</strong></P>
        <UL>
          <li>IP address, browser type, device information, and pages visited (via standard web analytics).</li>
          <li>Information submitted through contact forms, staffing request forms, or newsletter sign-ups.</li>
        </UL>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: 'How We Use Your Information',
    icon: Settings,
    content: (
      <>
        <P>We use the personal data we collect for the following purposes:</P>
        <UL>
          <li><strong>Recruitment Services:</strong> Matching candidates with suitable job opportunities, conducting screenings, and presenting shortlists to clients.</li>
          <li><strong>Payroll & Compliance:</strong> Processing payroll, statutory deductions (PF, ESI, TDS), and benefits for contract staff deployed through TalPro.</li>
          <li><strong>Client Engagement:</strong> Managing client relationships, processing staffing requests, invoicing, and delivering agreed services.</li>
          <li><strong>Communication:</strong> Sending job alerts, market insights, service updates, and responding to enquiries.</li>
          <li><strong>Legal Compliance:</strong> Meeting regulatory obligations, responding to legal requests, and maintaining business records as required by Indian law.</li>
          <li><strong>Service Improvement:</strong> Analysing aggregated, anonymised data to improve our recruitment processes and website experience.</li>
        </UL>
        <P>
          We do not use your personal data for automated decision-making or profiling that
          produces legal effects. All candidate shortlisting decisions involve human review
          by our recruitment team.
        </P>
      </>
    ),
  },
  {
    id: 'information-sharing',
    title: 'Information Sharing',
    icon: Users,
    content: (
      <>
        <P>We share personal data only in the following circumstances:</P>
        <UL>
          <li><strong>With Clients:</strong> Candidate profiles (resume, skills, experience) are shared with client organisations only for specific job opportunities that match the candidate's preferences and qualifications.</li>
          <li><strong>With Payroll Partners:</strong> For contract staffing, employee data is shared with our payroll processing and compliance partners to administer salary, benefits, and statutory contributions.</li>
          <li><strong>With Background Verification Agencies:</strong> When a candidate consents to background checks as part of the hiring process, relevant data is shared with authorised verification partners.</li>
          <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process, or to protect the rights, property, or safety of TalPro, our clients, or others.</li>
        </UL>
        <P>
          We do not sell, rent, or trade personal data to third parties for marketing
          purposes. We do not share candidate data with clients without the candidate's
          knowledge — candidates are always informed before their profile is submitted for
          a specific role.
        </P>
      </>
    ),
  },
  {
    id: 'data-security',
    title: 'Data Security',
    icon: Shield,
    content: (
      <>
        <P>
          We implement appropriate technical and organisational measures to protect personal
          data against unauthorised access, alteration, disclosure, or destruction. These
          measures include:
        </P>
        <UL>
          <li>Encrypted data transmission (TLS/SSL) for all website interactions and API communications.</li>
          <li>Access controls limiting data access to authorised recruitment team members on a need-to-know basis.</li>
          <li>Secure cloud infrastructure with regular security updates and monitoring.</li>
          <li>Confidentiality agreements with all employees and partners who handle personal data.</li>
          <li>Regular review of security practices and incident response procedures.</li>
        </UL>
        <P>
          While we take reasonable steps to protect your data, no method of electronic
          transmission or storage is 100% secure. We encourage candidates and clients to
          exercise caution when sharing sensitive information online.
        </P>
      </>
    ),
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    icon: Clock,
    content: (
      <>
        <P>We retain personal data only for as long as necessary to fulfil the purposes for which it was collected:</P>
        <UL>
          <li><strong>Candidate Data:</strong> Active candidate profiles are retained for up to 3 years from the last interaction. Candidates may request earlier deletion at any time.</li>
          <li><strong>Client Data:</strong> Retained for the duration of the business relationship and for 7 years thereafter, as required by Indian tax and commercial law.</li>
          <li><strong>Payroll Records:</strong> Retained for a minimum of 8 years as required by Indian labour and tax regulations.</li>
          <li><strong>Website Analytics:</strong> Aggregated, anonymised analytics data may be retained indefinitely. Identifiable visitor data is retained for up to 12 months.</li>
        </UL>
        <P>
          When personal data is no longer required, it is securely deleted or anonymised.
        </P>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    icon: UserCheck,
    content: (
      <>
        <P>
          Under applicable Indian law (and the DPDPA once fully effective), you have the
          following rights regarding your personal data:
        </P>
        <UL>
          <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete data.</li>
          <li><strong>Right to Erasure:</strong> Request deletion of your personal data, subject to legal retention requirements.</li>
          <li><strong>Right to Withdraw Consent:</strong> Where processing is based on consent, you may withdraw it at any time. This does not affect the lawfulness of processing before withdrawal.</li>
          <li><strong>Right to Grievance Redressal:</strong> Lodge a complaint with us or with the relevant Data Protection Board if you believe your data rights have been violated.</li>
        </UL>
        <P>
          To exercise any of these rights, contact us at privacy@talproindia.com. We will
          respond to your request within 30 days.
        </P>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies & Tracking',
    icon: Globe,
    content: (
      <>
        <P>
          Our website uses cookies and similar technologies to improve your browsing
          experience and to understand how visitors interact with our site.
        </P>
        <UL>
          <li><strong>Essential Cookies:</strong> Required for the website to function properly (e.g., session management, security). These cannot be disabled.</li>
          <li><strong>Analytics Cookies:</strong> Help us understand page views, traffic sources, and user behaviour. We use privacy-respecting analytics tools.</li>
          <li><strong>Preference Cookies:</strong> Remember your settings and preferences (e.g., dark mode, language) for a better experience on return visits.</li>
        </UL>
        <P>
          We do not use third-party advertising cookies or cross-site tracking pixels.
          You can manage cookie preferences through your browser settings.
        </P>
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Policy Changes',
    icon: Eye,
    content: (
      <>
        <P>
          We may update this Privacy Policy from time to time to reflect changes in our
          practices, services, or applicable law. Material changes will be posted on this
          page with an updated "Last Updated" date.
        </P>
        <P>
          For significant changes affecting how we process candidate or client data, we
          will make reasonable efforts to notify affected individuals via email.
        </P>
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Contact Us',
    icon: Mail,
    content: (
      <>
        <P>
          If you have questions about this Privacy Policy, wish to exercise your data
          rights, or have a privacy-related concern, please contact us:
        </P>
        <div className="grid sm:grid-cols-2 gap-4 mt-2">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
            <Mail className="h-4 w-4 text-accent mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-medium">Privacy Enquiries</div>
              <div className="text-sm text-muted-foreground">privacy@talproindia.com</div>
              <div className="text-xs text-muted-foreground">72-hour acknowledgement SLA</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
            <Mail className="h-4 w-4 text-accent mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-medium">DPO Contact</div>
              <div className="text-sm text-muted-foreground">dpo@talproindia.com</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 sm:col-span-2">
            <MapPin className="h-4 w-4 text-accent mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-medium">Registered Office</div>
              <div className="text-sm text-muted-foreground">
                Flat No. A-103, Prospect Princeton, 1st Floor, Manipal County Road,
                Singasandra, Bommanahalli, Bengaluru Urban, Karnataka 560068, India
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

/* ── Component ─────────────────────────────────────────────────────── */

export default function PrivacyPolicy() {
  const [expandedSections, setExpandedSections] = useState<string[]>(
    sections.map((s) => s.id)
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
        title="Privacy Policy — Data Protection & Your Rights"
        description="How TalPro collects, uses, and protects personal data of candidates, clients, and website visitors. Compliant with Indian IT Act and DPDPA 2023."
        path="/privacy-policy"
      />

      <div className="pt-20 pb-16">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-[hsl(222,47%,11%)] to-[hsl(222,47%,15%)] text-white py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs font-medium tracking-wide uppercase mb-6">
              <Lock className="h-3.5 w-3.5" />
              Privacy
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-base text-white/70 max-w-2xl mx-auto mb-3">
              How we collect, use, and protect your personal data.
              Your privacy matters to us.
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
                <Shield className="h-5 w-5 mx-auto mb-2 text-accent" />
                <div className="text-sm font-semibold">Data Protected</div>
                <div className="text-xs text-muted-foreground">Encrypted & secure</div>
              </div>
              <div>
                <Eye className="h-5 w-5 mx-auto mb-2 text-accent" />
                <div className="text-sm font-semibold">Transparent</div>
                <div className="text-xs text-muted-foreground">Clear data practices</div>
              </div>
              <div>
                <UserCheck className="h-5 w-5 mx-auto mb-2 text-accent" />
                <div className="text-sm font-semibold">Your Rights</div>
                <div className="text-xs text-muted-foreground">Access, correct, delete</div>
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
