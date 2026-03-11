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
import { ArrowRight, Sparkles, Users, Target, Zap, Shield, Check, TrendingUp } from "lucide-react";

export function ServicePage({ service }: { service: Service }) {
  usePageSEO({ title: service.seo.title, description: service.seo.description });
  useServiceJSONLD({
    name: service.name,
    description: service.seo.description,
    slug: service.slug
  });

  useEffect(() => {
    analytics.event("service_page_view", {
      event_category: "content",
      event_label: service.name,
      service_slug: service.slug,
      service_name: service.name
    });
  }, [service.name, service.slug]);

  const handleCTAClick = () => {
    analytics.event("cta_click", {
      event_category: "service",
      event_label: service.name,
      service_name: service.name
    });
  };

  return (
    <main className="pt-16" data-testid="service-page">
      {/* GRADIENT HERO SECTION */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white relative overflow-hidden" data-testid="service-hero">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
            {service.hero.eyebrow && (
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20" data-testid="service-eyebrow">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse-glow"></div>
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">{service.hero.eyebrow.toUpperCase()}</span>
                {service.name}
              </div>
            )}
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight" data-testid="service-title">
              <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">
                {service.hero.title.split(' ')[0]}
              </span>
              {service.hero.title.split(' ').length > 1 && (
                <><br />{service.hero.title.split(' ').slice(1).join(' ')}</>
              )}
            </h1>
            
            <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-3xl" data-testid="service-subtitle">
              {service.hero.subtitle}
            </p>
            
            {/* Quick Stats in Hero */}
            {service.stats && service.stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto lg:mx-0">
                {service.stats.map((stat, index) => (
                  <div key={stat.label} className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid={`stat-item-${index}`}>
                    <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform" data-testid={`stat-value-${index}`}>{stat.value}</div>
                    <div className="text-xs text-white/70" data-testid={`stat-label-${index}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href={`/contact?service=${encodeURIComponent(service.name)}`}>
                <button 
                  onClick={handleCTAClick}
                  className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" 
                  data-testid="button-contact-cta"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {service.hero.ctaLabel}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
              <Link href="/case-studies">
                <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105" data-testid="button-view-work">
                  View Success Stories
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800" data-testid="service-overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">OVERVIEW</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">What We Offer</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 relative">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center animate-float-rotate">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">
                        <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Service Overview</span>
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">{service.overview}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 relative h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">
                    <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Why TalPro</span>
                  </h3>
                </div>
                <FeatureList items={service.highlights} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES SECTION */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20" data-testid="service-capabilities">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 rounded-full mb-6">
              <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">OUR CAPABILITIES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">Core Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive solutions powered by deep technical knowledge
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {service.capabilities.map((cap, index) => (
              <div key={cap.title} className="group relative" data-testid={`capability-${index}`}>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 relative h-full hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">{cap.title}</span>
                  </h4>
                  <ul className="space-y-2">
                    {cap.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES & INDUSTRIES SECTION */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800" data-testid="service-roles-industries">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 relative h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold">
                    <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Roles We Hire</span>
                  </h2>
                </div>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {service.roles.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 relative h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold">
                    <span className="bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">Industries We Serve</span>
                  </h2>
                </div>
                <IndustriesGrid items={service.industries} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20" data-testid="service-process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">OUR PROCESS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">How We Work</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven methodology for delivering exceptional results
            </p>
          </div>

          <ProcessTimeline steps={service.processSteps} />
        </div>
      </section>

      {/* CTA FOOTER SECTION */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse-glow"></div>
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">READY TO START</span>
            Let's Build Together
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready to <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Transform</span><br />
            Your Business?
          </h2>
          
          <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
            Partner with TalPro to access top talent and accelerate your success. Get started today with a free consultation.
          </p>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-green-400">8H</div>
              <div className="text-xs text-white/70">Response Time</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-green-400">97%</div>
              <div className="text-xs text-white/70">Satisfaction</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-green-400">500+</div>
              <div className="text-xs text-white/70">Projects</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10">
              <div className="text-2xl font-bold text-green-400">15+</div>
              <div className="text-xs text-white/70">Years Exp</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/contact?service=${encodeURIComponent(service.name)}`}>
              <button 
                onClick={handleCTAClick}
                className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" 
                data-testid="button-get-started-cta"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Link>
            <Link href="/case-studies">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105">
                View Case Studies
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
