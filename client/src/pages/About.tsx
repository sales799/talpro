import { Link } from 'wouter';
import { motion } from 'framer-motion';
import SEO, { organizationSchema } from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import SocialShareBar from '@/components/SocialShareBar';
import SocialFollowCTA from '@/components/SocialFollowCTA';
import {
  ArrowRight,
  Handshake,
  Shield,
  Heart,
  Target,
  Users,
  MapPin,
  Linkedin,
} from 'lucide-react';

/**
 * About — company story, values, leadership and stats.
 * Rewritten 2026-05-17 for AI-first IT services + SaaS positioning per Pitch v2 doctrine.
 */

/* ── Values ──────────────────────────────────────── */
const values = [
  {
    icon: Handshake,
    title: 'Respect',
    description:
      'Every candidate is a person first. We treat talent and clients with transparency, dignity and honesty — no ghosting, no bait-and-switch.',
  },
  {
    icon: Target,
    title: 'Excellence',
    description:
      'Good enough isn\'t. We obsess over shortlist quality, screening rigour and placement outcomes because our reputation depends on every hire.',
  },
  {
    icon: Heart,
    title: 'Authenticity',
    description:
      'We tell clients the market truth — even when it\'s uncomfortable. Realistic expectations lead to better hires, faster.',
  },
  {
    icon: Shield,
    title: 'Accountability',
    description:
      'We name the delivery owner, document the evidence, and make commercial and service boundaries clear before work begins.',
  },
];

/* ── Leadership ──────────────────────────────────── */
const leaders = [
  {
    name: 'Bhaskar Anand',
    role: 'Founder & Managing Director',
    bio: 'Bhaskar is building Talpro around a simple operating belief: hiring must be fast, honest, technically relevant, and accountable after the offer.',
    linkedin: 'https://in.linkedin.com/in/bhaskar-anand-6007349',
  },
];

/* ── Stats ────────────────────────────────────────── */
const principles = [
  { value: 'Scoped', label: 'Mandates', icon: Target },
  { value: 'Evidence', label: 'Candidate decisions', icon: Users },
  { value: 'Named', label: 'Delivery ownership', icon: Shield },
  { value: 'India', label: 'Technology capability', icon: MapPin },
];

export default function About() {
  return (
    <>
      <SEO
        title="About TalPro - Technology Talent and GCC Workforce Partner"
        description="Talpro is India’s Technology Talent and GCC Workforce Partner—helping global companies build, staff and scale high-performing technology teams in India."
        path="/about"
        jsonLd={organizationSchema}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'About Us' },
        ]}
      />
      <div className="max-w-5xl mx-auto px-4 py-3">
        <SocialShareBar title="About TalPro — Technology Talent and GCC Workforce Partner" description="Speed, evidence, and ownership for India technology capability." url="/about" showLabels />
      </div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[hsl(222,47%,11%)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,hsl(187,92%,41%,0.12),transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest text-accent font-semibold mb-3"
          >
            About TalPro
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto"
          >
            India's Technology Talent and{' '}
            <span className="text-warning">GCC Workforce</span>{' '}
            Partner
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Helping global companies build, staff and scale high-performing technology teams in India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {principles.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="h-5 w-5 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/50">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">
              Our Story
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Built by recruiters, for hiring managers
            </h2>
          </div>

          <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed space-y-5 text-center md:text-left">
            <p>
              TalPro was built around a simple frustration: India\'s IT talent supply was
              too often noisy and slow. Hiring managers waited weeks for irrelevant resumes.
              Candidates were treated as interchangeable commodities. Nobody
              followed up after the invoice.
            </p>
            <p>
              We set out to build a different kind of talent services company — one where
              recruiters are specialists (not generalists), screening is
              technical (not keyword-based), and post-placement support is the
              norm (not an upsell).
            </p>
            <p>
              From Bengaluru, Talpro supports technology talent, contract staffing,
              permanent hiring, executive search, RPO, and GCC workforce mandates.
              Each offer has an explicit commercial model and delivery boundary.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-accent" />
            <span>Headquartered in Bengaluru, India</span>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">
              What We Stand For
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Our core values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="bg-background border border-border rounded-2xl p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[hsl(222,47%,11%)] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{v.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Leadership ────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-widest text-primary/60 font-semibold mb-2">
              Leadership
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              The team behind TalPro
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {leaders.map((leader) => (
              <div
                key={leader.name}
                className="bg-muted/30 border border-border rounded-2xl p-6 text-center hover:shadow-md transition-all"
              >
                <div className="w-20 h-20 bg-[hsl(222,47%,11%)] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {leader.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <h3 className="font-bold text-lg">{leader.name}</h3>
                <p className="text-xs text-accent font-medium mb-3">
                  {leader.role}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {leader.bio}
                </p>
                <a
                  href={leader.linkedin}
                  className="inline-flex items-center gap-1.5 text-xs text-primary/60 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="bg-[hsl(222,47%,11%)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Want to work with us?
          </h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto leading-relaxed">
            Whether you're hiring tech talent or looking for your next role,
            we'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold text-sm hover:brightness-105 transition-all cursor-pointer shadow-lg shadow-amber-500/20">
                Get in Touch <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link href="/careers">
              <span className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/5 transition-all cursor-pointer">
                View Careers
              </span>
            </Link>
          </div>
        </div>
      </section>
      <SocialFollowCTA heading="Follow our journey" subtitle="Team updates and India technology talent insights from TalPro." />
    </>
  );
}
