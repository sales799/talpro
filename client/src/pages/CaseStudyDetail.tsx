import { useParams, Link } from 'wouter';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Users, Quote } from 'lucide-react';
import { caseStudiesData } from '@/data/caseStudies';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import SocialShareBar from '@/components/SocialShareBar';

export default function CaseStudyDetail() {
  const { id } = useParams();
  const caseStudy = caseStudiesData.find((s) => s.id === parseInt(id || '0'));

  if (!caseStudy) {
    return (
      <div className="pt-20 min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-7xl font-extrabold text-[hsl(222,47%,11%)] mb-4">404</div>
          <h1 className="text-xl font-bold mb-2">Case study not found</h1>
          <p className="text-muted-foreground mb-6">
            This success story may have been moved or doesn't exist.
          </p>
          <Link href="/case-studies">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold cursor-pointer">
              <ArrowLeft className="h-4 w-4" /> All Success Stories
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${caseStudy.title} — Success Story`}
        description={caseStudy.description}
        path={`/case-studies/${caseStudy.id}`}
        image={`https://nirantar.talpro.in/api/og?title=${encodeURIComponent(caseStudy.title)}&subtitle=${encodeURIComponent('Success Story — TalPro India')}&type=case-study`}
      />

      <div className="pt-20">
        {/* ── Breadcrumb with JSON-LD ─────────────────────── */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Case Studies', href: '/case-studies' },
            { label: caseStudy.title },
          ]}
        />

        {/* ── Hero ──────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-[hsl(222,47%,11%)] to-[hsl(222,47%,15%)] text-white py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <span className="inline-block text-xs uppercase tracking-widest text-[hsl(187,92%,41%)] font-semibold mb-4">
              {caseStudy.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
              {caseStudy.title}
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mb-8">{caseStudy.description}</p>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 text-sm text-white/50">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {caseStudy.duration}
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {caseStudy.teamSize}-person TalPro team
              </div>
            </div>

            {/* Social share */}
            <div className="mt-6">
              <SocialShareBar
                title={caseStudy.title}
                description={caseStudy.description}
                url={`https://nirantar.talpro.in/case-studies/${caseStudy.id}`}
              />
            </div>
          </div>
        </section>

        {/* ── Metrics band ─────────────────────────────── */}
        <section className="border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            <div className="grid grid-cols-3 gap-6 text-center">
              {caseStudy.metrics.map((m) => (
                <div key={m.label}>
                  <div className="text-3xl md:text-4xl font-bold text-[hsl(222,47%,11%)]">
                    {m.value}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Challenge & Solution ─────────────────────── */}
        {caseStudy.challenge && caseStudy.solution && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-2xl border border-red-200/50 bg-red-50/30 p-6 md:p-8">
                <h2 className="text-lg font-bold mb-4 text-red-900/80">The Challenge</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {caseStudy.challenge}
                </p>
              </div>
              <div className="rounded-2xl border border-green-200/50 bg-green-50/30 p-6 md:p-8">
                <h2 className="text-lg font-bold mb-4 text-green-900/80">Our Approach</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {caseStudy.solution}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── Results ──────────────────────────────────── */}
        {caseStudy.results && (
          <section className="bg-muted/30 py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl font-bold tracking-tight mb-8">Results & Impact</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {caseStudy.results.map((result, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{result}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Tech Stack ───────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-lg font-bold mb-4">Skills & Technologies Hired For</h2>
          <div className="flex flex-wrap gap-2">
            {caseStudy.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-muted text-foreground border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* ── Testimonial ──────────────────────────────── */}
        {caseStudy.testimonial && (
          <section className="bg-[hsl(222,47%,11%)] text-white py-12 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
              <Quote className="h-8 w-8 text-[hsl(38,92%,50%)] mx-auto mb-6" />
              <blockquote className="text-lg md:text-xl font-medium leading-relaxed mb-6 italic">
                "{caseStudy.testimonial.quote}"
              </blockquote>
              <div>
                <div className="font-semibold">{caseStudy.testimonial.author}</div>
                <div className="text-sm text-white/50">{caseStudy.testimonial.position}</div>
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ──────────────────────────────────────── */}
        <section className="py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Ready for Similar Results?
            </h2>
            <p className="text-muted-foreground mb-8">
              Tell us about your hiring needs. We'll build a staffing plan and deliver
              your first shortlist within 48 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold hover:bg-[hsl(38,92%,55%)] transition-colors cursor-pointer">
                  Start Hiring <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/case-studies">
                <span className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-border font-semibold hover:bg-muted transition-colors cursor-pointer">
                  More Success Stories
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
