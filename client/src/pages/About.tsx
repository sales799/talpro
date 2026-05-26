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
  Clock,
  TrendingUp,
  Zap,
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
      'We own the outcome, not just the process. Replacement guarantees, post-join support and SLAs mean we stand behind every placement.',
  },
];

/* ── Leadership ──────────────────────────────────── */
const leaders = [
  {
    name: '',
    role: 'Founder & CEO',
    bio: 'Former technology consultant turned recruitment leader. Founded TalPro in 2010 to fix what was broken in India\'s IT talent supply — slow cycles, mismatched candidates, zero post-placement support. Today TalPro is an AI-first IT services and SaaS product company shipping from Bengaluru.',
    linkedin: 'https://in.linkedin.com/in/bhaskar-anand-6007349',
  },
  {
    name: 'Binay Sinha',
    role: 'Head of Delivery',
    bio: 'Two decades across IT services and staffing operations. Binay runs TalPro\'s delivery engine — recruiter training, process quality and client SLA adherence.',
    linkedin: 'https://www.linkedin.com/in/binay-sinha-talpro',
  },
  {
    name: 'Ankita Raj',
    role: 'Head of Client Partnerships',
    bio: 'Enterprise sales and account management background across SaaS and professional services. Ankita ensures every client engagement starts — and stays — on track.',
    linkedin: 'https://www.linkedin.com/in/ankita-raj-talpro',
  },
];

/* ── Stats ────────────────────────────────────────── */
const stats = [
  { value: '2010', label: 'Founded', icon: Clock },
  { value: '500+', label: 'Placements', icon: Users },
  { value: '12+', label: 'Industries served', icon: TrendingUp },
  { value: '97%', label: 'Client retention', icon: Zap },
];

export default function About() {
  return (
    <>
      <SEO
        title="About TalPro — AI-first IT services + SaaS for India and the world"
        description="TalPro is India\'s AI-first IT services and SaaS product company headquartered in Bengaluru. 15 years inside India\'s IT engine — now shipping AI products to the world. Talent services across 12+ industries with a 97% client retention rate."
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
        <SocialShareBar title="About TalPro — AI-first IT services + SaaS for India and the world" description="15+ years inside India\'s IT engine — now shipping SaaS + AI to the world" url="/about" showLabels />
      </div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[hsl(222,47%,11%)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,hsl(187,92%,41%,0.12),transparent)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest text-[hsl(187,92%,41%)] font-semibold mb-3"
          >
            About TalPro
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto"
          >
            India's Specialist{' '}
            <span className="text-[hsl(38,92%,50%)]">IT Staffing</span>{' '}
            Partner
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            Connecting top tech talent with companies that move fast, since 2010.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="h-5 w-5 text-[hsl(187,92%,41%)] mx-auto mb-2" />
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
              TalPro started in 2010 with a simple frustration: India\'s IT talent supply was
              broken. Hiring managers waited weeks for irrelevant resumes.
              Candidates were treated as interchangeable commodities. Nobody
              followed up after the invoice.
            </p>
            <p>
              We set out to build a different kind of talent services company — one that would, 15 years later, become an AI-first IT services and SaaS product company — one where
              recruiters are specialists (not generalists), screening is
              technical (not keyword-based), and post-placement support is the
              norm (not an upsell).
            </p>
            <p>
              Today, from our headquarters in Bengaluru, we staff IT, engineering
              and sales roles across 12+ industries. Our clients include funded
              startups, mid-market SaaS companies and large enterprises scaling
              their India engineering centres.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-[hsl(187,92%,41%)]" />
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
                      <Icon className="h-5 w-5 text-[hsl(187,92%,41%)]" />
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
                <p className="text-xs text-[hsl(187,92%,41%)] font-medium mb-3">
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
      <SocialFollowCTA heading="Follow our journey" subtitle="Team updates, placement stories, and India IT industry insights from TalPro." />
    </>
  );
}
