import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Brain, MapPin, TrendingUp, Search, Shield, Users, Zap, Target, CheckCircle, Sparkles, Clock } from 'lucide-react';

export default function TalentIntelligence() {
  useEffect(() => {
    const originalTitle = document.title;
    let metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content') || null;
    const tagExisted = !!metaDescription;

    document.title = 'AI-Powered Talent Intelligence & Engineering Hiring | TalPro';

    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Find the top 1% engineering talent in 48 hours. Agentic AI screening, engineering pods, executive search, and Employer of Record services.');

    return () => {
      document.title = originalTitle;
      const currentMeta = document.querySelector('meta[name="description"]');
      if (currentMeta) {
        if (tagExisted) {
          if (originalDescription !== null) {
            currentMeta.setAttribute('content', originalDescription);
          } else {
            currentMeta.removeAttribute('content');
          }
        } else {
          currentMeta.remove();
        }
      }
    };
  }, []);

  const steps = [
    {
      num: 1,
      title: 'Capability Blueprinting',
      description: "We define what 'great' looks like for your role. Skills, ownership levels, cultural signals — not just job descriptions.",
    },
    {
      num: 2,
      title: 'Agentic AI Screening',
      description: 'Autonomous AI agents source, rank by skill + potential, predict retention risk, and deliver bias-reduced shortlists.',
    },
    {
      num: 3,
      title: 'Human Expert Validation',
      description: 'Our senior consultants verify every shortlisted candidate. Technical depth + cultural fit assessed before your team sees a single profile.',
    },
    {
      num: 4,
      title: '48-Hour Shortlist Delivered',
      description: 'You receive a curated slate of 5-8 candidates. You run 1-2 final rounds. We handle offers, BGV, and onboarding.',
    },
  ];

  const services = [
    {
      icon: Brain,
      title: 'Agentic AI Screening',
      description: 'Beyond keyword matching — skills ranking, retention prediction, bias detection.',
    },
    {
      icon: MapPin,
      title: 'Talent Density Mapping',
      description: 'Know where to hire. Data Engineers in Hyderabad, UI Designers in Bangalore, QA in Pune.',
    },
    {
      icon: TrendingUp,
      title: 'Salary Benchmarking',
      description: 'Granular compensation data by role, city, and experience band.',
    },
    {
      icon: Search,
      title: 'Executive Search',
      description: 'CXO-level and niche roles. Sniper approach, not job boards.',
    },
    {
      icon: Shield,
      title: 'Employer of Record',
      description: 'Hire in India today without a legal entity. We employ on your behalf.',
    },
    {
      icon: Users,
      title: 'Dedicated Engineering Pods',
      description: 'Pre-configured teams (3-8 engineers) that plug into your sprints.',
    },
  ];

  return (
    <div className="pt-16" data-testid="talent-intelligence-page">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse-glow"></div>
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">TALENT INTELLIGENCE</span>
                AI-Powered Hiring
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight" data-testid="hero-title">
                Stop Searching.<br />
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Start Selecting.</span>
              </h1>

              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Our Agentic AI screens thousands of profiles and surfaces the top 1% match in 48 hours. Engineer-vetted talent, not keyword-matched resumes.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-time">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform" role="status">48h</div>
                  <div className="text-xs text-white/70">Time to Shortlist</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-retention">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform" role="status">97%</div>
                  <div className="text-xs text-white/70">Client Retention</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-deployment">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform" role="status">30</div>
                  <div className="text-xs text-white/70">Day Deployment</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-projects">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform" role="status">500+</div>
                  <div className="text-xs text-white/70">Projects</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/contact">
                  <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-talk-talent-team">
                    <span className="relative z-10 flex items-center gap-2">
                      Talk to Our Talent Team
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </Link>
                <Link href="/services">
                  <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105" data-testid="button-explore-services">
                    Explore Services
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-2xl animate-float-rotate"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&h=600"
                  alt="AI-powered talent intelligence platform showcasing candidate screening"
                  className="rounded-2xl w-full h-auto shadow-2xl"
                />
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">AI Screening Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden" data-testid="how-it-works-section">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20">
              <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">HOW IT WORKS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">From Brief to</span><br />
              <span className="text-foreground">Shortlist in 48 Hours</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A battle-tested 4-step process that combines AI speed with human judgment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 hover:scale-105 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-white">{step.num}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Offerings Grid */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 relative overflow-hidden" data-testid="service-offerings-section">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(20, 184, 166, 0.08) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20">
              <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">SERVICE OFFERINGS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Talent Solutions</span><br />
              <span className="text-foreground">That Scale</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              End-to-end talent acquisition and management services powered by AI and validated by experts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="group relative" data-testid={`service-card-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 hover:scale-105 hover:shadow-xl transition-all duration-300 h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-5">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CVPRO Integration Callout */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden" data-testid="cvpro-callout-section">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)`,
        }}></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 to-teal-600/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 rounded-3xl p-10 md:p-14 border border-white/20 text-white overflow-hidden">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px)`,
                backgroundSize: '40px 40px'
              }}></div>
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur rounded-3xl flex items-center justify-center border border-white/20">
                    <Sparkles className="w-12 h-12 text-green-400" />
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                    Powered by <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent">CVPRO</span> — Our Proprietary AI Recruiter
                  </h3>
                  <p className="text-lg text-white/85 mb-6 leading-relaxed">
                    CVPRO parses resumes, scores against your custom rubric, and explains WHY each candidate was ranked. Transparent AI you can trust.
                  </p>
                  <Link href="/cvpro">
                    <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 font-semibold text-white" data-testid="button-learn-cvpro">
                      Learn About CVPRO
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white relative overflow-hidden" data-testid="cta-footer-section">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Find Your<br />
            <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Top 1%?</span>
          </h2>
          <p className="text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let our Agentic AI and expert consultants build your dream engineering team — in 48 hours, not 48 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-cta-contact">
                <span className="relative z-10 flex items-center gap-2">
                  Talk to Our Talent Team
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Link>
            <Link href="/case-studies">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105" data-testid="button-cta-case-studies">
                View Success Stories
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}