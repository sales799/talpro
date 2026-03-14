import { Link } from 'wouter';
import {
  ArrowRight, Upload, Search, Briefcase, TrendingUp,
  CheckCircle, Star, MapPin, BarChart3, Users, Mail,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';

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
    description: 'Accept your offer with confidence. We check in at 30, 60, and 90 days post-join.',
    icon: TrendingUp,
  },
];

const FEATURED_ROLES = [
  { title: 'Senior React Engineer', location: 'Bangalore', range: '25-35 LPA', tag: 'Frontend' },
  { title: 'DevOps Lead (AWS)', location: 'Hyderabad', range: '30-42 LPA', tag: 'DevOps' },
  { title: 'Data Engineer', location: 'Remote', range: '22-32 LPA', tag: 'Data' },
  { title: 'Engineering Manager', location: 'Pune', range: '40-55 LPA', tag: 'Leadership' },
  { title: 'Full-Stack (Node/React)', location: 'Bangalore', range: '18-28 LPA', tag: 'Full-Stack' },
  { title: 'QA Automation Lead', location: 'Chennai', range: '20-30 LPA', tag: 'QA' },
];

const CANDIDATE_TESTIMONIALS = [
  {
    quote: 'TalPro understood exactly what I was looking for. Within a week, I had interviews at two companies that matched my tech stack and growth ambitions.',
    name: 'Priya R.',
    role: 'Senior Backend Engineer',
    placed: 'Series B FinTech',
  },
  {
    quote: 'The interview prep was genuinely helpful — they briefed me on the team culture, tech decisions, and what the hiring manager valued. I felt prepared, not just sent.',
    name: 'Arjun M.',
    role: 'DevOps Engineer',
    placed: 'US SaaS Company (GCC)',
  },
  {
    quote: 'After months of random LinkedIn messages from agencies, TalPro was refreshingly different. They listened first, then sent me roles that actually made sense.',
    name: 'Sneha K.',
    role: 'Data Scientist',
    placed: 'Healthcare AI Startup',
  },
];

const WHY_TALPRO = [
  { icon: Star, title: 'No Spam, Only Relevant Roles', desc: 'We send you opportunities that match your skills and goals — not mass blasts.' },
  { icon: CheckCircle, title: 'Free for Candidates', desc: 'Our service is 100% free for job seekers. Companies pay us, not you.' },
  { icon: BarChart3, title: 'Salary Transparency', desc: 'Know your market worth before you interview. Access our India IT Salary Guide.' },
  { icon: Users, title: '14+ Years of Relationships', desc: 'We work with 50+ companies across FinTech, SaaS, GCCs, and more.' },
];

/* ── Component ─────────────────────────────────────────────────────── */

export default function ForCandidates() {
  return (
    <>
      <SEO
        title="For Candidates — Find Your Next Tech Role | TalPro"
        description="TalPro connects top tech professionals with India's most exciting companies. Free for candidates. Submit your CV and get matched to relevant openings."
        path="/for-candidates"
      />

      <div className="pt-16">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'For Candidates' },
          ]}
        />

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
              TalPro connects top tech professionals with India's most exciting
              companies. Get discovered by employers who value what you build.
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
                href="/salary-guide"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all"
              >
                <BarChart3 className="h-5 w-5" />
                Check Salary Guide
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
                Current Openings
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Featured Roles
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                A snapshot of active positions. New roles added weekly.
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

        {/* ── Candidate Testimonials ───────────────────── */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                What Candidates Say
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {CANDIDATE_TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="bg-background border border-border rounded-2xl p-6"
                >
                  <p className="text-sm text-muted-foreground italic leading-relaxed mb-4">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[hsl(222,47%,11%)] flex items-center justify-center text-white font-bold text-xs">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{t.name}</div>
                      <div className="text-[10px] text-muted-foreground">
                        {t.role} → Placed at {t.placed}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Salary Guide Preview ─────────────────────── */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-[hsl(222,47%,11%)] text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <BarChart3 className="h-6 w-6 text-[hsl(38,92%,50%)] mb-3" />
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                  Know Your Market Worth
                </h2>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Benchmark your compensation against 28+ tech roles across
                  Bangalore, Hyderabad, Pune, Chennai, and NCR. Updated quarterly
                  from real placement data.
                </p>
                <Link
                  href="/salary-guide"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold rounded-xl hover:brightness-110 transition-all"
                >
                  View Salary Guide <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-[hsl(38,92%,50%)]">28+</div>
                  <div className="text-[10px] text-white/60">Tech Roles</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-[hsl(38,92%,50%)]">5</div>
                  <div className="text-[10px] text-white/60">Cities</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-[hsl(38,92%,50%)]">Q1</div>
                  <div className="text-[10px] text-white/60">2026 Data</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-[hsl(38,92%,50%)]">Free</div>
                  <div className="text-[10px] text-white/60">Always</div>
                </div>
              </div>
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
    </>
  );
}
