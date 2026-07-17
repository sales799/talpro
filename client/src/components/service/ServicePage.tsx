import { useEffect, useState } from "react";
import type { Service } from "@/config/services";
import { FeatureList } from "./FeatureList";
import { ProcessTimeline } from "./ProcessTimeline";
import { IndustriesGrid } from "./IndustriesGrid";
import { ContactCTA } from "./ContactCTA";
import { usePageSEO, useServiceJSONLD } from "@/hooks/useSEO";
import { buildFAQSchema } from "@/components/SEO";
import { analytics } from "@/lib/analytics";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Users, Target, Zap, Shield, Check, TrendingUp, HelpCircle, ChevronDown, Scale } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { DocumentJsonLd } from "@/components/DocumentHead";

export function ServicePage({ service }: { service: Service }) {
  usePageSEO({
    title: service.seo.title,
    description: service.seo.description,
    image: `https://talproindia.com/api/og?title=${encodeURIComponent(service.name)}&subtitle=${encodeURIComponent('Specialist Staffing Solutions')}&type=page`,
  });
  useServiceJSONLD({ name: service.name, description: service.seo.description, slug: service.slug });

  useEffect(() => {
    analytics.event("service_page_view", {
      service_slug: service.slug,
    });
  }, [service.name, service.slug]);

  const handleCTAClick = () => {
    analytics.event("cta_click", {
      surface: "service-page",
      destination: "/contact",
      service_slug: service.slug,
    });
  };

  return (
    <div className="pt-16" data-testid="service-page">
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
              <span className="text-[hsl(174,84%,32%)]">
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
                      className="text-2xl font-bold text-[hsl(174,84%,32%)]"
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
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[hsl(174,84%,32%)] text-white font-semibold rounded-xl shadow-lg shadow-teal-700/20 hover:brightness-110 transition-all"
                  data-testid="button-contact-cta"
                >
                  {service.hero.ctaLabel}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/how-we-work">
                <button
                  className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all"
                  data-testid="button-view-work"
                >
                  Review Our Process
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
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {cap.title}
                </h3>
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
          <div className={`grid gap-12 ${service.industries.length > 0 ? "lg:grid-cols-2" : "max-w-3xl mx-auto"}`}>
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

            {service.industries.length > 0 && <div className="bg-background border border-border rounded-2xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[hsl(222,47%,11%)] rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">
                  Industries We Serve
                </h2>
              </div>
              <IndustriesGrid items={service.industries} />
            </div>}
          </div>
        </div>
      </section>

      {service.governance && (
        <section className="py-20 bg-background" data-testid="service-governance">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-[hsl(187,92%,41%)] text-sm font-semibold uppercase tracking-widest mb-4">
                <Scale className="w-4 h-4 inline-block mr-1 -mt-0.5" />
                Offer Governance
              </p>
              <h2 className="text-4xl font-bold text-foreground">Clear ownership and delivery boundaries</h2>
            </div>
            <dl className="grid md:grid-cols-3 gap-6">
              {[
                ["Delivery owner", service.governance.owner],
                ["Commercial model", service.governance.commercialModel],
                ["Delivery boundary", service.governance.deliveryBoundary],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-border bg-muted/30 p-6">
                  <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">{label}</dt>
                  <dd className="text-sm leading-relaxed text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

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
              A governed method for scope, evidence, decisions, and delivery ownership
            </p>
          </div>
          <ProcessTimeline steps={service.processSteps} />
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      {service.faqs && service.faqs.length > 0 && (
        <>
          <DocumentJsonLd id="service-faq" value={buildFAQSchema(service.faqs)} />
          <FAQSection faqs={service.faqs} serviceName={service.name} />
        </>
      )}

      {/* ── CTA FOOTER ── */}
      <section className="py-24 bg-[hsl(222,47%,11%)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,hsl(187,92%,41%,0.12),transparent)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <p className="text-[hsl(187,92%,41%)] text-sm font-semibold uppercase tracking-widest mb-4">
            Ready to Start
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready to define the{" "}
            <span className="text-[hsl(174,84%,32%)]">right talent model?</span>
          </h2>

          <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
            Share the business outcome, roles, operating model, and constraints.
            Talpro will respond with a scoped approach, ownership boundary, and next decision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/contact?service=${encodeURIComponent(service.name)}`}>
              <button
                onClick={handleCTAClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[hsl(174,84%,32%)] text-white font-semibold rounded-xl shadow-lg shadow-teal-700/20 hover:brightness-110 transition-all"
                data-testid="button-get-started-cta"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/how-we-work">
              <button className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all">
                Review Our Process
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── FAQ Accordion Section ──────────────────────────────────────────
function FAQSection({ faqs, serviceName }: { faqs: { q: string; a: string }[]; serviceName: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-background" data-testid="service-faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[hsl(187,92%,41%)] text-sm font-semibold uppercase tracking-widest mb-4">
            <HelpCircle className="w-4 h-4 inline-block mr-1 -mt-0.5" />
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {serviceName} — Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Quick answers to common questions about our {serviceName.toLowerCase()} services.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-xl overflow-hidden bg-background hover:border-accent/30 transition-colors"
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-sm pr-4">{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
