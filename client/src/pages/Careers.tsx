import { Link } from 'wouter';
import {
  ArrowRight, Users, TrendingUp, Heart, Target,
  BookOpen, Globe, Mail, Briefcase, Award, MessageCircle
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO, { buildJobPostingSchema, buildBreadcrumbSchema } from '@/components/SEO';

const WHATSAPP_NUMBER = '919008800276';

/* ── Data ──────────────────────────────────────────────────────────── */

const WHY_TALPRO = [
  {
    icon: Target,
    title: 'Specialist, Not Generalist',
    description:
      'We focus exclusively on IT staffing. Every process, tool, and training is designed to make you the best tech recruiter in the market.',
  },
  {
    icon: TrendingUp,
    title: 'Grow Fast',
    description:
      'Clear progression from Associate Recruiter to Team Lead to Delivery Head. High performers reach leadership roles in 2-3 years.',
  },
  {
    icon: Heart,
    title: 'People-First Culture',
    description:
      'Flexible work, health insurance, learning budgets, and a team that celebrates wins together. No micromanagement.',
  },
  {
    icon: Globe,
    title: 'Work with Top Companies',
    description:
      'Our clients include Series B startups, global consulting firms, and Fortune 500 GCCs. You\'ll build relationships that matter.',
  },
];

const OPEN_ROLES = [
  {
    title: 'IT Recruiter — Contract Staffing',
    location: 'Bangalore (Hybrid)',
    type: 'Full-time',
    description:
      'Source and screen technology professionals for contract staffing engagements across BFSI, SaaS, and enterprise clients.',
  },
  {
    title: 'Senior Tech Recruiter — Permanent Hiring',
    location: 'Bangalore / Remote',
    type: 'Full-time',
    description:
      'Own end-to-end recruitment for permanent engineering roles. 3+ years of IT recruitment experience required.',
  },
  {
    title: 'Recruitment Coordinator',
    location: 'Bangalore',
    type: 'Full-time',
    description:
      'Manage interview scheduling, candidate communication, and onboarding logistics. Great entry point into IT staffing.',
  },
  {
    title: 'Business Development Manager — IT Staffing',
    location: 'Bangalore / Mumbai',
    type: 'Full-time',
    description:
      'Identify and close new client accounts for contract staffing and permanent recruitment services. Hunter profile preferred.',
  },
];

const TEAM_STATS = [
  { value: '25+', label: 'Team Members' },
  { value: '6', label: 'Cities Covered' },
  { value: '92%', label: 'Retention Rate' },
  { value: '2x', label: 'Avg. Growth in 2 Years' },
];

/* ── Structured Data ───────────────────────────────────────────────── */

const careersBreadcrumb = buildBreadcrumbSchema([
  { name: 'Home', url: 'https://talproindia.com/' },
  { name: 'Careers', url: 'https://talproindia.com/careers' },
]);

const jobPostingSchemas = OPEN_ROLES.map((role) =>
  buildJobPostingSchema({
    title: role.title,
    location: role.location,
    type: role.type,
    description: role.description,
  }),
);

/* ── Component ─────────────────────────────────────────────────────── */

export default function Careers() {
  return (
    <>
      <SEO
        title="Careers at TalPro — Join India's Specialist IT Staffing Team"
        description="Build your career in IT recruitment. Open roles in tech recruiting, business development, and delivery management. Bangalore-based, people-first culture."
        path="/careers"
        jsonLd={[careersBreadcrumb, ...jobPostingSchemas]}
      />

      <div className="pt-20">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Careers' },
          ]}
        />
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-[hsl(222,47%,11%)] to-[hsl(222,47%,15%)] text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs uppercase tracking-widest text-[hsl(187,92%,41%)] font-semibold mb-4">
              We're Hiring
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Help Companies Build{' '}
              <span className="text-[hsl(38,92%,50%)]">Great Tech Teams</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
              Join TalPro and work at the intersection of technology and talent.
              We're building India's most trusted IT staffing practice — and we
              need sharp, driven people to do it.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {TEAM_STATS.map((s) => (
                <div key={s.label} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-white/50">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why TalPro ───────────────────────────────────── */}
        <section className="py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">
              Why Work at TalPro?
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {WHY_TALPRO.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-background p-6 hover:shadow-md transition-shadow"
                >
                  <item.icon className="h-5 w-5 text-accent mb-3" />
                  <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Open Roles ───────────────────────────────────── */}
        <section className="py-14 md:py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">
                  Open Positions
                </p>
                <h2 className="text-2xl font-bold tracking-tight">
                  Current Openings
                </h2>
              </div>
              <span className="text-sm text-muted-foreground">
                {OPEN_ROLES.length} roles
              </span>
            </div>

            <div className="space-y-4">
              {OPEN_ROLES.map((role) => (
                <div
                  key={role.title}
                  className="group rounded-2xl border border-border bg-background p-5 md:p-6 hover:shadow-md hover:border-accent/30 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base mb-1">
                        {role.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" /> {role.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" /> {role.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {role.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Link href="/contact">
                          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent/10 text-accent text-xs font-semibold hover:bg-accent/20 transition-colors cursor-pointer">
                            Apply Now <ArrowRight className="h-3 w-3" />
                          </span>
                        </Link>
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi TalPro, I'm interested in the "${role.title}" position (${role.location}). I'd like to discuss this opportunity.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#25D366]/10 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/20 transition-colors"
                        >
                          <MessageCircle className="h-3 w-3" />
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Perks ────────────────────────────────────────── */}
        <section className="py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">
              What You Get
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Heart, label: 'Health Insurance' },
                { icon: BookOpen, label: 'Learning Budget' },
                { icon: Globe, label: 'Hybrid / Remote' },
                { icon: Award, label: 'Performance Bonuses' },
                { icon: Users, label: 'Small Team Energy' },
                { icon: TrendingUp, label: 'Fast Promotions' },
                { icon: Briefcase, label: 'ESIC & PF' },
                { icon: Target, label: 'Annual Retreats' },
              ].map((perk) => (
                <div
                  key={perk.label}
                  className="flex flex-col items-center text-center p-4 rounded-xl border border-border bg-background"
                >
                  <perk.icon className="h-5 w-5 text-accent mb-2" />
                  <span className="text-xs font-medium">{perk.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-[hsl(222,47%,11%)] text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <Mail className="h-6 w-6 text-[hsl(38,92%,50%)] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Don't See Your Role?
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              We're always looking for talented recruiters and business developers.
              Send your resume and tell us why you'd be great at TalPro.
            </p>
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold hover:bg-[hsl(38,92%,55%)] transition-colors cursor-pointer">
                Get in Touch <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
