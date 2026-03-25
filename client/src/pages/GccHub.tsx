import { Link } from 'wouter';
import { motion } from 'framer-motion';
import SEO, { buildFAQSchema } from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowRight,
  Building2,
  GraduationCap,
  Clock,
  Lightbulb,
  Users,
  Rocket,
  Shield,
  Target,
  Award,
  MapPin,
  TrendingUp,
  Brain,
  Cloud,
  Code2,
  Lock,
  Cpu,
  TestTube2,
  Briefcase,
  FileText,
  BookOpen,
  CheckCircle2,
  Zap,
  DollarSign,
  BarChart3,
  Layers,
  Globe,
  ChevronRight,
} from 'lucide-react';

/* ── Data ──────────────────────────────────────────────── */

const heroStats = [
  { value: '450+', label: 'GCCs in India' },
  { value: '1.7M+', label: 'GCC Employees' },
  { value: '35%', label: 'YoY Growth' },
  { value: '$46B', label: 'Market by 2030' },
];

const whyIndiaCards = [
  {
    icon: DollarSign,
    title: 'Cost Efficiency',
    description: '60-70% cost savings compared to onshore operations, without compromising on quality. India offers the best talent-to-cost ratio globally for technology roles.',
  },
  {
    icon: GraduationCap,
    title: 'Talent Depth',
    description: '5.4M+ STEM graduates enter the workforce annually. India produces more engineers than the US and Europe combined, across every technology domain.',
  },
  {
    icon: Clock,
    title: 'Time Zone Advantage',
    description: 'Follow-the-sun operations with overlap across US, Europe, and APAC. IST (UTC+5:30) enables real-time collaboration during critical business hours.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Ecosystem',
    description: '450+ R&D centers operated by global enterprises. India is the world\'s third-largest startup ecosystem with deep expertise in AI, cloud, and platform engineering.',
  },
];

const challenges = [
  {
    icon: Rocket,
    title: 'Rapid Team Ramp-Up',
    description: 'Scale from 0 to 50-200 hires in 6 months. We maintain pre-built talent pools and shadow pipelines that activate within 48 hours of kickoff.',
    stat: '50-200 hires',
    statLabel: 'in 6 months',
  },
  {
    icon: Brain,
    title: 'Niche Technology Talent',
    description: 'MLOps, Platform Engineering, SRE, Data Mesh architects — roles that don\'t show up on job boards. Our headhunting network reaches passive candidates others can\'t.',
    stat: '72%',
    statLabel: 'passive candidates',
  },
  {
    icon: Shield,
    title: 'Compliance Complexity',
    description: 'Indian labour codes, PF, ESI, GST, transfer pricing — we handle every regulatory requirement so your legal team doesn\'t have to become India experts overnight.',
    stat: '100%',
    statLabel: 'compliance coverage',
  },
  {
    icon: Target,
    title: 'Retention in Competitive Markets',
    description: 'Bengaluru and Hyderabad see 20%+ attrition in tech. Our compensation benchmarking, counter-offer defense, and employer branding strategies keep your top talent.',
    stat: '<12%',
    statLabel: 'attrition rate',
  },
  {
    icon: Award,
    title: 'Leadership Hiring for New GCCs',
    description: 'Your first 5 hires define the next 500. We specialize in placing GCC heads, VPs of Engineering, and Director-level leaders who\'ve built centers from scratch.',
    stat: '30+',
    statLabel: 'GCC leaders placed',
  },
  {
    icon: MapPin,
    title: 'Multi-City Talent Sourcing',
    description: 'The best talent isn\'t always in Bengaluru. We source across 6 major tech hubs, matching each role to the city with the deepest talent pool and optimal cost structure.',
    stat: '6',
    statLabel: 'cities covered',
  },
];

const staffingModelSteps = [
  {
    step: 1,
    title: 'GCC Talent Strategy Workshop',
    description: 'Collaborative session to define org structure, role priorities, seniority mix, compensation philosophy, and 12-month hiring roadmap.',
    duration: 'Day 1-2',
  },
  {
    step: 2,
    title: 'Market Mapping & Compensation Benchmarking',
    description: 'Data-driven analysis of talent availability, salary bands, notice period trends, and competitor hiring patterns across target cities.',
    duration: 'Days 3-5',
  },
  {
    step: 3,
    title: 'Candidate Sourcing & Pre-Screening',
    description: 'Activate pre-built talent pools, targeted outreach, referral networks, and AI-assisted matching against your specific requirements.',
    duration: 'Days 5-10',
  },
  {
    step: 4,
    title: 'Technical Assessment & Culture Fit',
    description: 'Multi-layer evaluation: coding challenges, system design discussions, scenario role-plays, and structured culture-fit interviews with your hiring managers.',
    duration: 'Days 10-15',
  },
  {
    step: 5,
    title: 'Offer Management & Counter-Offer Defense',
    description: 'Strategic offer structuring, competitive analysis, candidate expectation management, and proactive counter-offer mitigation to secure top talent.',
    duration: 'Days 15-20',
  },
  {
    step: 6,
    title: 'Onboarding Support & 90-Day Check-In',
    description: 'Structured onboarding coordination, 30/60/90-day check-ins, ramp tracking, and a replacement guarantee if things don\'t work out.',
    duration: 'Day 20+',
  },
];

const roleCategories = [
  {
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    roles: 'AWS, Azure, GCP Architects, Cloud Engineers, DevOps, SRE',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Brain,
    title: 'Data & AI',
    roles: 'Data Engineers, ML Engineers, Data Scientists, AI Researchers',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Layers,
    title: 'Platform Engineering',
    roles: 'Kubernetes, Terraform, CI/CD, Internal Developer Platforms',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Code2,
    title: 'Application Development',
    roles: 'Java, .NET, React, Node.js, Python, Go, Full-Stack',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Lock,
    title: 'Cybersecurity',
    roles: 'SOC Analysts, AppSec Engineers, Cloud Security, GRC',
    color: 'from-red-500 to-rose-500',
  },
  {
    icon: Cpu,
    title: 'SAP & Enterprise',
    roles: 'SAP S/4HANA, Oracle, Salesforce, ServiceNow, Workday',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Briefcase,
    title: 'Engineering Leadership',
    roles: 'VP Engineering, Director, Principal Engineer, CTO Office',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    icon: TestTube2,
    title: 'QA & Automation',
    roles: 'SDET, Performance Testing, Mobile Testing, Test Architects',
    color: 'from-teal-500 to-green-500',
  },
];

const cityGuides = [
  {
    city: 'Bengaluru',
    tagline: 'India\'s Silicon Valley — deepest talent pool for AI, product engineering, and startups',
    color: 'from-blue-500 to-teal-500',
  },
  {
    city: 'Hyderabad',
    tagline: 'Cloud & data hub — home to Microsoft, Google, Amazon\'s largest India campuses',
    color: 'from-teal-500 to-green-500',
  },
  {
    city: 'Pune',
    tagline: 'Enterprise engineering stronghold — strong in backend, embedded, and automotive tech',
    color: 'from-green-500 to-emerald-500',
  },
  {
    city: 'Chennai',
    tagline: 'FinTech & manufacturing tech corridor — cost-efficient alternative to Bengaluru',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    city: 'Mumbai',
    tagline: 'Financial services nerve center — ideal for FinTech, InsurTech, and capital markets GCCs',
    color: 'from-purple-500 to-pink-500',
  },
  {
    city: 'Delhi-NCR',
    tagline: 'Analytics & business ops hub — Gurgaon and Noida power consulting and BPM talent',
    color: 'from-orange-500 to-red-500',
  },
];

const resources = [
  {
    icon: BarChart3,
    title: 'GCC Salary Guide 2026',
    description: 'Comprehensive compensation benchmarks across 8 role families, 6 cities, and 4 seniority levels.',
    badge: 'Coming Soon',
  },
  {
    icon: FileText,
    title: 'India Labour Codes Compliance Checklist',
    description: 'Everything your legal team needs to know about PF, ESI, gratuity, and the new labour codes.',
    badge: 'Coming Soon',
  },
  {
    icon: BookOpen,
    title: 'GCC Setup vs Staff Augmentation: Decision Framework',
    description: 'A structured framework to decide between building your own entity and leveraging staff augmentation.',
    badge: 'Coming Soon',
  },
];

const faqItems = [
  {
    q: 'How long does it take to staff a new GCC from scratch?',
    a: 'For a typical 20-30 person founding team, we deliver the first shortlists within 1 week and complete the core team build within 8-12 weeks. Larger ramp-ups (100+ hires) follow a phased approach over 4-6 months with monthly cohort onboarding.',
  },
  {
    q: 'What makes GCC hiring different from regular IT staffing?',
    a: 'GCC hiring requires understanding of parent company culture, global engineering standards, compensation structures that compete with Big Tech, and candidates who thrive in greenfield environments. We specialize in finding talent that can operate with the autonomy and ownership a GCC demands.',
  },
  {
    q: 'Do you handle only tech hiring or also non-tech GCC roles?',
    a: 'While technology roles are our core strength, we also staff business operations, finance, HR, legal, and analytics functions within GCCs. Many centers need cross-functional teams from Day 1, and we provide end-to-end hiring support.',
  },
  {
    q: 'How do you handle compensation benchmarking for GCC roles?',
    a: 'We maintain proprietary compensation data across 6 Indian cities, updated quarterly. Our benchmarks cover base salary, variable pay, ESOPs, retention bonuses, and benefits — segmented by company type (product vs. services), funding stage, and seniority. This helps GCCs offer competitive yet sustainable packages.',
  },
  {
    q: 'Can you help with GCC employer branding in India?',
    a: 'Absolutely. New GCCs face the challenge of being unknown brands competing against established names. We advise on employer value proposition, help position your GCC on platforms like LinkedIn and Glassdoor, and leverage our recruiter network to build grassroots awareness among senior engineers.',
  },
  {
    q: 'What is your replacement guarantee for GCC placements?',
    a: 'All permanent placements come with a 90-day replacement guarantee. If a hire leaves or doesn\'t meet performance expectations within this period, we restart the search at no additional cost. For leadership roles, we offer extended guarantees up to 6 months.',
  },
];

/* ── Animation Variants ────────────────────────────────── */

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ── Component ─────────────────────────────────────────── */

export default function GccHub() {
  return (
    <>
      <SEO
        title="GCC Intelligence Hub — India's #1 GCC Staffing Specialist"
        description="Your command center for building world-class Global Capability Centers in India. GCC talent strategy, compensation benchmarking, rapid ramp-up, compliance support, and multi-city sourcing by India's specialist GCC staffing partner."
        path="/gcc-hub"
        image="https://talproindia.com/api/og?title=GCC+Intelligence+Hub&subtitle=India%27s+%231+GCC+Staffing+Specialist&type=gcc"
        jsonLd={buildFAQSchema(faqItems)}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'GCC Intelligence Hub' },
        ]}
      />

      {/* ═══════════════════════════════════════════════════
          SECTION 1 — Hero
          ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white">
        {/* Background pattern */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px, 30px 30px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20"
            >
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse-glow" />
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold">
                INDIA'S #1 GCC STAFFING SPECIALIST
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6"
            >
              GCC Intelligence Hub
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-10"
            >
              Your Command Center for Building World-Class Global Capability
              Centers in India
            </motion.p>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
            >
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-green-400 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/contact">
                <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg">
                  <span className="relative z-10 flex items-center gap-2">
                    Schedule a GCC Staffing Consultation
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
              <Link href="/services/gcc-accelerator">
                <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105">
                  Explore GCC Accelerator
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2 — Why GCCs Choose India
          ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20">
              <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">
                THE INDIA ADVANTAGE
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Why GCCs Choose
              </span>
              <br />
              <span className="text-foreground">India</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              India is the undisputed global leader for capability centers. Here
              is why 450+ multinational enterprises have built their innovation
              engines here.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {whyIndiaCards.map((card, i) => (
              <motion.div key={card.title} variants={fadeInUp} custom={i}>
                <div className="group relative h-full">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <Card className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 hover:scale-105 hover:shadow-xl transition-all duration-300 h-full rounded-3xl">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                        <card.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {card.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {card.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3 — GCC Staffing Challenges We Solve
          ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20">
              <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">
                CHALLENGES WE SOLVE
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                GCC Staffing Challenges
              </span>
              <br />
              <span className="text-foreground">We Solve Every Day</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Building a GCC in India is a strategic win — but the talent
              acquisition complexity can derail even the best plans. We have
              solved these problems for dozens of global enterprises.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {challenges.map((item, i) => (
              <motion.div key={item.title} variants={fadeInUp} custom={i}>
                <div className="group relative h-full">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <Card className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 hover:scale-105 hover:shadow-xl transition-all duration-300 h-full rounded-3xl">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                            {item.stat}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.statLabel}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 4 — The Talpro GCC Staffing Model
          ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">
                OUR PROCESS
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                The Talpro GCC
              </span>
              <br />
              <span className="text-foreground">Staffing Model</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A battle-tested 6-step methodology designed specifically for the
              unique demands of GCC hiring — from founding team to full-scale
              operations.
            </p>
          </div>

          <div className="space-y-6">
            {staffingModelSteps.map((phase, index) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center">
                        <span className="text-xl font-bold text-white">
                          {phase.step}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-full text-sm font-bold text-blue-700 dark:text-blue-300 border border-blue-200/30 dark:border-blue-700/30">
                          {phase.duration}
                        </span>
                        <h3 className="text-xl font-bold text-foreground">
                          {phase.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground">{phase.description}</p>
                    </div>
                    <div className="flex-shrink-0 hidden md:block">
                      <div className="w-32 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"
                          style={{
                            width: `${((index + 1) / staffingModelSteps.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 5 — GCC Roles We Staff
          ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">
                ROLE CATEGORIES
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                GCC Roles
              </span>
              <br />
              <span className="text-foreground">We Staff</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From cloud architects to QA leads, we cover every technology
              function a modern GCC needs. Deep domain expertise across 8 role
              families.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {roleCategories.map((role, i) => (
              <motion.div key={role.title} variants={fadeInUp} custom={i}>
                <div className="group relative h-full">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <Card className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 hover:scale-105 hover:shadow-xl transition-all duration-300 h-full rounded-3xl">
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${role.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                      >
                        <role.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {role.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {role.roles}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 6 — GCC City Guide
          ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">
                CITY GUIDE
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                GCC City Guide
              </span>
              <br />
              <span className="text-foreground">Across India</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Each city offers a unique talent signature, cost structure, and
              industry ecosystem. We help you choose the right location — or
              build across multiple cities.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {cityGuides.map((city, i) => (
              <motion.div key={city.city} variants={fadeInUp} custom={i}>
                <Link href="/contact">
                  <div className="group relative h-full cursor-pointer">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <Card className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 hover:scale-105 hover:shadow-xl transition-all duration-300 h-full rounded-3xl">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className={`w-14 h-14 bg-gradient-to-br ${city.color} rounded-2xl flex items-center justify-center flex-shrink-0`}
                          >
                            <MapPin className="w-7 h-7 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-foreground">
                            {city.city}
                          </h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                          {city.tagline}
                        </p>
                        <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                          Explore talent landscape
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 7 — Resources & Insights
          ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">
                RESOURCES
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Resources &
              </span>
              <br />
              <span className="text-foreground">Insights</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Data-driven guides and frameworks to help you make smarter GCC
              talent decisions.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid md:grid-cols-3 gap-8"
          >
            {resources.map((resource, i) => (
              <motion.div key={resource.title} variants={fadeInUp} custom={i}>
                <div className="group relative h-full">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <Card className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 hover:scale-105 hover:shadow-xl transition-all duration-300 h-full rounded-3xl">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <resource.icon className="w-7 h-7 text-white" />
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200/50"
                        >
                          {resource.badge}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        {resource.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {resource.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 8 — FAQ
          ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">
                FAQ
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Frequently Asked
              </span>
              <br />
              <span className="text-foreground">Questions</span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-200/50 dark:border-slate-700/50 px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:no-underline py-5">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 9 — Final CTA
          ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px, 30px 30px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Build Your
              <br />
              <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">
                GCC Dream Team?
              </span>
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
              Whether you are launching a new GCC or scaling an existing one,
              Talpro is the talent partner that global enterprises trust to build
              high-performing teams in India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg">
                  <span className="relative z-10 flex items-center gap-2">
                    Schedule a GCC Staffing Consultation
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
              <Link href="/contact">
                <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105">
                  Talk to Our GCC Experts
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
