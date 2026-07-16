import { Link } from 'wouter';
import {
  ArrowRight, Upload, Search, Briefcase, TrendingUp,
  CheckCircle, Star, MapPin, Users, Mail,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import SocialShareBar from '@/components/SocialShareBar';
import SocialFollowCTA from '@/components/SocialFollowCTA';

/* ── Data ──────────────────────────────────────────────────────────── */

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Submit Your Profile',
    description: 'Share your CV and preferences — roles, tech stack, location, salary expectations.',
    icon: Upload,
  },
  {
    step: '02',
    title: 'Get Matched',
    description: 'Our recruiters match you to openings that fit your skills, experience, and career goals.',
    icon: Search,
  },
  {
    step: '03',
    title: 'Interview Prep',
    description: 'Receive role-specific briefings, company insights, and interview coaching.',
    icon: Briefcase,
  },
  {
    step: '04',
    title: 'Land & Grow',
    description: 'Accept your offer with confidence. Any post-join support follows the agreed candidate and client process.',
    icon: TrendingUp,
  },
];

const FEATURED_ROLES = [
  { title: 'Engineering', location: 'Bangalore / Hybrid', range: 'Market aligned', tag: 'Frontend' },
  { title: 'Cloud & DevOps', location: 'Hyderabad / Hybrid', range: 'Market aligned', tag: 'DevOps' },
  { title: 'Data & AI', location: 'Remote / India', range: 'Market aligned', tag: 'Data' },
  { title: 'Leadership', location: 'Pune / Bengaluru', range: 'Market aligned', tag: 'Leadership' },
  { title: 'SAP & Enterprise Apps', location: 'India', range: 'Market aligned', tag: 'SAP' },
  { title: 'QA & Automation', location: 'Chennai / Hybrid', range: 'Market aligned', tag: 'QA' },
];

const WHY_TALPRO = [
  { icon: Star, title: 'No Spam, Only Relevant Roles', desc: 'We send you opportunities that match your skills and goals — not mass blasts.' },
  { icon: CheckCircle, title: 'Clear Communication', desc: 'We explain the opportunity and process before asking you to proceed.' },
  { icon: Briefcase, title: 'Mandate Context', desc: 'We explain the role, hiring process, and known constraints before asking you to proceed.' },
  { icon: Users, title: 'Consent and Ownership', desc: 'Your profile should be shared only for a relevant mandate and with clear recruiter ownership.' },
];

/* ── Component ─────────────────────────────────────────────────────── */

export default function ForCandidates() {
  return (
    <>
      <SEO
        title="For Candidates — Find Your Next Tech Role | TalPro"
        description="TalPro connects technology professionals with relevant hiring mandates. Submit your CV and share your role, location, and work preferences."
        path="/for-candidates"
      />

      <div className="pt-16">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'For Candidates' },
          ]}
        />
        <div className="max-w-5xl mx-auto px-4 py-3">
          <SocialShareBar title="For Tech Candidates — Launch Your Next Role with TalPro" url="/for-candidates" showLabels />
        </div>

        {/* ── Hero ──────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-[hsl(222,47%,11%)] to-[hsl(222,47%,15%)] text-white py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs uppercase tracking-widest text-[hsl(187,92%,41%)] font-semibold mb-4">
              For Tech Professionals
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Find Your Next{' '}
              <span className="text-[hsl(38,92%,50%)]">Tech Role</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
              TalPro connects technology professionals with relevant hiring
              mandates and clear role context.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:careers@talproindia.com?subject=CV%20Submission&body=Hi%20TalPro%2C%0A%0APlease%20find%20my%20CV%20attached.%0A%0APreferred%20roles%3A%20%0APreferred%20locations%3A%20%0ACurrent%20CTC%3A%20%0AExpected%20CTC%3A%20%0ANotice%20period%3A%20"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold rounded-xl shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all"
              >
                <Upload className="h-5 w-5" />
                Submit Your CV
              </a>
              <Link
                href="/resources"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all"
              >
                <Briefcase className="h-5 w-5" />
                Talent Resources
              </Link>
            </div>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────── */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-[hsl(187,92%,41%)] font-semibold mb-3">
                How It Works
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                From CV to Offer in 4 Steps
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {HOW_IT_WORKS.map(({ step, title, description, icon: Icon }) => (
                <div
                  key={step}
                  className="relative bg-muted/30 border border-border rounded-2xl p-6 text-center"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[hsl(222,47%,11%)] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {step}
                  </div>
                  <Icon className="h-8 w-8 text-[hsl(187,92%,41%)] mx-auto mt-4 mb-3" />
                  <h3 className="font-bold text-sm mb-2">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Roles ───────────────────────────── */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest text-[hsl(187,92%,41%)] font-semibold mb-3">
                Hiring Lanes
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Roles Publishing Soon
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                New roles are publishing soon. Drop your CV to get notified when a matching mandate opens.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURED_ROLES.map((role) => (
                <div
                  key={role.title}
                  className="bg-background border border-border rounded-2xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(187,92%,41%)] bg-[hsl(187,92%,41%)]/10 px-2 py-0.5 rounded">
                      {role.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm mb-2">{role.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {role.location}
                    </span>
                    <span className="font-medium text-foreground">
                      {role.range}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <a
                href="mailto:careers@talproindia.com?subject=Interested%20in%20Open%20Roles"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(187,92%,41%)] hover:underline"
              >
                Don't see your role? Send us your CV
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Why TalPro ──────────────────────────────── */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Why Candidates Choose TalPro
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {WHY_TALPRO.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 bg-muted/30 border border-border rounded-2xl p-6"
                >
                  <div className="w-10 h-10 bg-[hsl(222,47%,11%)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">{title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-[hsl(222,47%,11%)] text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <Mail className="h-6 w-6 text-[hsl(38,92%,50%)] mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Ready to Make Your Next Move?
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              Send your CV to our talent team. We'll match you to relevant
              openings and keep you updated on new roles that fit your profile.
            </p>
            <a
              href="mailto:careers@talproindia.com?subject=CV%20Submission"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold hover:brightness-110 transition-all"
            >
              Submit Your CV <ArrowRight className="h-4 w-4" />
            </a>
            <p className="text-xs text-white/40 mt-4">
              Or email us directly at careers@talproindia.com
            </p>
          </div>
        </section>
      </div>
      <SocialFollowCTA heading="Stay ahead in your tech career" subtitle="Job-search guidance and career advice for India's tech professionals." />
    </>
  );
}
