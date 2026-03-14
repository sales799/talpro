import { useEffect } from "react";
import type { Service } from "@/config/services";
import { FeatureList } from "./FeatureList";
import { StatsStrip } from "./StatsStrip";
import { ProcessTimeline } from "./ProcessTimeline";
import { IndustriesGrid } from "./IndustriesGrid";
import { ContactCTA } from "./ContactCTA";
import { usePageSEO, useServiceJSONLD } from "@/hooks/useSEO";
import { analytics } from "@/lib/analytics";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Users, Target, Zap, Shield, Check, TrendingUp, Quote } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export function ServicePage({ service }: { service: Service }) {
  usePageSEO({ title: service.seo.title, description: service.seo.description });
  useServiceJSONLD({ name: service.name, description: service.seo.description, slug: service.slug });

  useEffect(() => {
    analytics.event("service_page_view", {
      event_category: "content",
      event_label: service.name,
      service_slug: service.slug,
      service_name: service.name,
    });
  }, [service.name, service.slug]);

  const handleCTAClick = () => {
    analytics.event("cta_click", {
      event_category: "service",
      event_label: service.name,
      service_name: service.name,
    });
  };

  return (
    <main className="pt-16" data-testid="service-page">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.name },
        ]}
      />
      {/* ── HERO ── */}
      <section
        className="py-24 bg-[hsl(222,47%,11%)] text-white relative overflow-hidden"
        data-testid="service-hero"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,hsl(187,92%,41%,0.12),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
            {service.hero.eyebrow && (
              <p
                className="text-[hsl(187,92%,41%)] text-sm font-semibold uppercase tracking-widest mb-4"
                data-testid="service-eyebrow"
              >
                {service.hero.eyebrow} &mdash; {service.name}
              </p>
            )}

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
              data-testid="service-title"
            >
              <span className="text-[hsl(38,92%,50%)]">
                {service.hero.title.split(" ")[0]}
              </span>
              {service.hero.title.split(" ").length > 1 && (
                <>
                  <br />
                  {service.hero.title.split(" ").slice(1).join(" ")}
                </>
              )}
            </h1>

            <p
              className="text-xl text-white/80 mb-10 leading-relaxed max-w-3xl"
              data-testid="service-subtitle"
            >
              {service.hero.subtitle}
            </p>

            {service.stats && service.stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto lg:mx-0">
                {service.stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl p-4 border border-white/10 hover:bg-white/5 transition-all"
                    data-testid={`stat-item-${index}`}
                  >
                    <div
                      className="text-2xl font-bold text-[hsl(38,92%,50%)]"
                      data-testid={`stat-value-${index}`}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-xs text-white/70"
                      data-testid={`stat-label-${index}`}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href={`/contact?service=${encodeURIComponent(service.name)}`}>
                <button
                  onClick={handleCTAClick}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold rounded-xl shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all"
                  data-testid="button-contact-cta"
                >
                  {service.hero.ctaLabel}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/case-studies">
                <button
                  className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all"
                  data-testid="button-view-work"
                >
                  View Success Stories
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="py-20 bg-muted/30" data-testid="service-overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[hsl(187,92%,41%)] text-sm font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-4 h-4 inline-block mr-1 -mt-0.5" />
              Overview
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
              What We Offer
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="bg-background border border-border rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[hsl(222,47%,11%)] rounded-2xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      Service Overview
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {service.overview}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-2xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[hsl(222,47%,11%)] rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Why TalPro</h3>
              </div>
              <FeatureList items={service.highlights} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="py-20 bg-background" data-testid="service-capabilities">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[hsl(187,92%,41%)] text-sm font-semibold uppercase tracking-widest mb-4">
              <Zap className="w-4 h-4 inline-block mr-1 -mt-0.5" />
              Our Capabilities
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Core Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive solutions powered by deep technical knowledge
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {service.capabilities.map((cap, index) => (
              <div
                key={cap.title}
                className="bg-background border border-border rounded-2xl p-6 h-full hover:shadow-md transition-all"
                data-testid={`capability-${index}`}
              >
                <div className="w-16 h-16 bg-[hsl(222,47%,11%)] rounded-2xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-4">
                  {cap.title}
                </h4>
                <ul className="space-y-2">
                  {cap.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 text-[hsl(160,84%,39%)] mt-0.5 flex-shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROLES & INDUSTRIES ── */}
      <section
        className="py-20 bg-muted/30"
        data-testid="service-roles-industries"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-background border border-border rounded-2xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[hsl(222,47%,11%)] rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">
                  Roles We Hire
                </h2>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3">
                {service.roles.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-[hsl(160,84%,39%)] mt-0.5 flex-shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background border border-border rounded-2xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[hsl(222,47%,11%)] rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">
                  Industries We Serve
                </h2>
              </div>
              <IndustriesGrid items={service.industries} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-20 bg-background" data-testid="service-process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[hsl(187,92%,41%)] text-sm font-semibold uppercase tracking-widest mb-4">
              <TrendingUp className="w-4 h-4 inline-block mr-1 -mt-0.5" />
              Our Process
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              How We Work
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven methodology for delivering exceptional results
            </p>
          </div>
          <ProcessTimeline steps={service.processSteps} />
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      {service.testimonial && (
        <section className="py-16 md:py-20 bg-muted/30" data-testid="service-testimonial">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-background border border-border rounded-2xl p-8 md:p-12">
              <Quote className="absolute top-6 left-6 h-10 w-10 text-[hsl(38,92%,50%)]/20" />
              <blockquote className="relative z-10">
                <p className="text-lg md:text-xl leading-relaxed text-foreground font-medium italic mb-6">
                  "{service.testimonial.quote}"
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[hsl(222,47%,11%)] flex items-center justify-center text-white font-bold text-sm">
                    {service.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      {service.testimonial.author}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {service.testimonial.role}, {service.testimonial.company}
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA FOOTER ── */}
      <section className="py-24 bg-[hsl(222,47%,11%)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,hsl(187,92%,41%,0.12),transparent)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <p className="text-[hsl(187,92%,41%)] text-sm font-semibold uppercase tracking-widest mb-4">
            Ready to Start
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready to{" "}
            <span className="text-[hsl(38,92%,50%)]">Transform</span>
            <br />
            Your Business?
          </h2>

          <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
            Partner with TalPro to access top talent and accelerate your success.
            Get started today with a free consultation.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
            {[
              { value: "8H", label: "Response Time" },
              { value: "97%", label: "Satisfaction" },
              { value: "500+", label: "Projects" },
              { value: "15+", label: "Years Exp" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-4 border border-white/10"
              >
                <div className="text-2xl font-bold text-[hsl(38,92%,50%)]">
                  {s.value}
                </div>
                <div className="text-xs text-white/70">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/contact?service=${encodeURIComponent(service.name)}`}>
              <button
                onClick={handleCTAClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold rounded-xl shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all"
                data-testid="button-get-started-cta"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/case-studies">
              <button className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all">
                View Case Studies
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
