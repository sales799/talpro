import { Link } from 'wouter';
import { BookOpen, TrendingUp, Users, Building2, ArrowRight, Mail } from 'lucide-react';
import SEO from '@/components/SEO';

const UPCOMING_TOPICS = [
  {
    icon: TrendingUp,
    title: 'IT Hiring Trends 2026',
    description: 'What skills are in demand, which cities are hiring, and how compensation benchmarks are shifting across India.',
  },
  {
    icon: Users,
    title: 'Building High-Performing Tech Teams',
    description: 'Insights on team composition, interview design, and retention strategies from our decade of placing engineers.',
  },
  {
    icon: Building2,
    title: 'GCC Playbook: India Operations',
    description: 'Practical guides for US and European companies setting up Global Capability Centers in India.',
  },
  {
    icon: BookOpen,
    title: 'Salary & Market Intelligence',
    description: 'Quarterly compensation data for popular tech roles — React, Java, DevOps, AI/ML, and more — across Tier 1 and Tier 2 cities.',
  },
];

export default function Blog() {
  return (
    <>
      <SEO
        title="Insights — IT Staffing Trends, Hiring Guides & Market Intelligence"
        description="Expert insights on IT hiring trends, salary benchmarks, GCC setup guides, and technology talent market intelligence from TalPro India."
        path="/blog"
      />

      <div className="pt-20">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-[hsl(222,47%,11%)] to-[hsl(222,47%,15%)] text-white py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs uppercase tracking-widest text-[hsl(187,92%,41%)] font-semibold mb-4">
              Insights
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Hiring Intelligence,{' '}
              <span className="text-[hsl(38,92%,50%)]">Delivered</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Market insights, salary benchmarks, and hiring playbooks from
              India's specialist IT staffing team. Coming soon.
            </p>
          </div>
        </section>

        {/* ── Coming Soon + Topic Previews ─────────────────── */}
        <section className="py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">
              What We'll Be Writing About
            </h2>

            <div className="grid sm:grid-cols-2 gap-6 mb-14">
              {UPCOMING_TOPICS.map((topic) => (
                <div
                  key={topic.title}
                  className="rounded-2xl border border-border bg-background p-6 hover:shadow-md transition-shadow"
                >
                  <topic.icon className="h-5 w-5 text-accent mb-3" />
                  <h3 className="font-semibold text-base mb-2">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Newsletter signup */}
            <div className="rounded-2xl bg-muted/40 border border-border p-8 md:p-10 text-center">
              <Mail className="h-6 w-6 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Get Notified When We Launch</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                Be the first to receive our hiring trend reports, salary guides,
                and IT staffing insights.
              </p>
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold hover:bg-[hsl(38,92%,55%)] transition-colors cursor-pointer">
                  Get in Touch <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
