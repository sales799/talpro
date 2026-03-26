import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Building2, RefreshCw, Rocket, Shield, MapPin, Clock, CheckCircle, FileText, DollarSign, Users, Globe, Briefcase, Target, TrendingUp, Zap, Scale } from 'lucide-react';

export default function GccAccelerator() {
  useEffect(() => {
    const originalTitle = document.title;
    let metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content') || null;
    const tagExisted = !!metaDescription;

    document.title = 'GCC Accelerator - Launch Your India Center in 45 Days | TalPro';

    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Set up a Global Capability Center in India in 45-60 days. Full-service GCC setup: incorporation, hiring, workspace, compliance. Build-Operate-Transfer available.');

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

  const engagementModels = [
    {
      icon: Building2,
      title: 'Full GCC Setup',
      description: 'We incorporate your entity, find and design your office space, hire your core team, and set up compliant operations. You own 100% of IP, assets, and contracts from Day 1.',
      tag: 'Best for: Enterprises committed to 10+ years in India',
    },
    {
      icon: RefreshCw,
      title: 'Build-Operate-Transfer',
      description: 'We build the team and run operations on our books for 18-24 months. Once stable, the entire unit — employees, assets, leases — transfers to you at a pre-agreed price.',
      tag: 'Best for: Companies wanting de-risked market entry',
    },
    {
      icon: Rocket,
      title: 'Talent-as-a-Service',
      description: 'Need engineers in 7-30 days? We activate pre-vetted talent pools and deploy engineering pods that plug directly into your sprints. Our EOR model means zero legal overhead.',
      tag: 'Best for: Startups and scale-ups needing speed',
    },
  ];

  const timelinePhases = [
    { days: 'Days 1-3', title: 'Discovery & Blueprinting', description: 'Stakeholder alignment, org design, role mapping, and compliance blueprint.' },
    { days: 'Days 3-10', title: 'Talent Pipeline Activation', description: 'Agentic AI + Shadow Pipelines activated across our proprietary talent graph.' },
    { days: 'Days 7-14', title: 'High-Signal Shortlisting', description: 'Multi-layer vetting with technical assessments and culture-fit interviews.' },
    { days: 'Days 10-20', title: 'Offers, BGV & Compliance', description: 'Offer rollouts, background verification, and regulatory compliance checks.' },
    { days: 'Days 15-45', title: 'Onboarding & Sprint Readiness', description: 'Team onboarding, workspace setup, IT provisioning, and sprint-ready deployment.' },
  ];

  const complianceItems = [
    { icon: FileText, title: 'GST Filing', description: 'Monthly and annual GST compliance managed end-to-end.' },
    { icon: DollarSign, title: 'Transfer Pricing', description: 'TP documentation and benchmarking aligned with OECD guidelines.' },
    { icon: Users, title: 'Payroll & PF', description: 'Statutory payroll processing including EPF, ESI, and PT.' },
    { icon: Scale, title: 'Corporate Tax', description: 'Quarterly advance tax and annual return filing.' },
    { icon: Shield, title: 'Budget 2026 Safe Harbour (₹2,000 Cr)', description: 'New safe harbour provisions for GCCs with turnover up to ₹2,000 Cr.' },
    { icon: Target, title: 'APAs', description: 'Advance Pricing Agreements for multi-year transfer pricing certainty.' },
  ];

  const cities = [
    { city: 'Bangalore', specialties: 'AI, Architecture, Product Engineering', color: 'from-blue-500 to-teal-500' },
    { city: 'Hyderabad', specialties: 'Cloud, Data Platforms, Scalable Teams', color: 'from-teal-500 to-green-500' },
    { city: 'Pune / Chennai', specialties: 'Backend, QA, Embedded Systems', color: 'from-green-500 to-blue-500' },
    { city: 'NCR (Delhi)', specialties: 'Analytics, Product Management, Business Ops', color: 'from-blue-500 to-purple-500' },
  ];

  return (
    <div className="pt-16" data-testid="gcc-accelerator-page">
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
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">GCC ACCELERATOR</span>
                Global Capability Centers
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight" data-testid="hero-title">
                Your India Center.<br />
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Our Execution</span><br />
                Engine.
              </h1>

              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                From zero to a fully operational Global Capability Center in 45-60 days. We handle incorporation, compliance, hiring, and workspace — you focus on building.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-gccs">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform" role="status">1,600+</div>
                  <div className="text-xs text-white/70">GCCs in India</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-fortune">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform" role="status">73%</div>
                  <div className="text-xs text-white/70">Fortune 2000 Untapped</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-launch">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform" role="status">45-60</div>
                  <div className="text-xs text-white/70">Day Launch</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-cost">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform" role="status">60%</div>
                  <div className="text-xs text-white/70">Cost Optimization</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/contact">
                  <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-discovery-call">
                    <span className="relative z-10 flex items-center gap-2">
                      Schedule a GCC Discovery Call
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </Link>
                <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105" data-testid="button-download-playbook">
                  Download GCC Playbook
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-2xl animate-float-rotate"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&h=600"
                  alt="Modern Global Capability Center office space in India"
                  className="rounded-2xl w-full h-auto shadow-2xl"
                />
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">GCC Launch Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800" data-testid="engagement-models">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20">
              <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">ENGAGEMENT MODELS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Choose Your</span><br />
              <span className="text-foreground">Entry Strategy</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Whether you want full ownership from Day 1 or a de-risked ramp, we have a model that fits your ambition.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {engagementModels.map((model, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 hover:scale-105 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                    <model.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{model.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-1">{model.description}</p>
                  <div className="mt-auto">
                    <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 border border-blue-200/30 dark:border-blue-700/30">
                      {model.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20" data-testid="process-timeline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">LAUNCH TIMELINE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">From Zero to</span><br />
              <span className="text-foreground">Sprint-Ready in 45 Days</span>
            </h2>
          </div>

          <div className="space-y-6">
            {timelinePhases.map((phase, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 hover:scale-105 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-full text-sm font-bold text-blue-700 dark:text-blue-300 border border-blue-200/30 dark:border-blue-700/30">
                          {phase.days}
                        </span>
                        <h3 className="text-xl font-bold text-foreground">{phase.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{phase.description}</p>
                    </div>
                    <div className="flex-shrink-0 hidden md:block">
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 w-32">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full animate-progress-pulse"
                          style={{ width: `${((index + 1) / timelinePhases.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Legal Shield */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800" data-testid="compliance-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20">
              <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">COMPLIANCE & LEGAL SHIELD</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Full Regulatory</span><br />
              <span className="text-foreground">Coverage from Day 1</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              India's 2026 Budget introduced landmark reforms for GCCs — including safe harbour provisions for entities with turnover up to ₹2,000 Cr and streamlined APA processes. Our compliance team ensures you capitalize on every advantage while staying fully compliant.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {complianceItems.map((item, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 hover:scale-105 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-City Strategy */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20" data-testid="multi-city-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">MULTI-CITY STRATEGY</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">We Don't Lock You</span><br />
              <span className="text-foreground">Into One City</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Each city brings a unique talent signature. We help you build a distributed center-of-excellence strategy across India's top tech corridors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cities.map((city, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 hover:scale-105 hover:shadow-xl transition-all duration-300 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${city.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{city.city}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{city.specialties}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white relative overflow-hidden" data-testid="cta-footer">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Build Your<br />
            <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">India Advantage?</span>
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
            Join the 1,600+ global companies leveraging India's engineering talent. Let's build your GCC together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-cta-discovery">
                <span className="relative z-10 flex items-center gap-2">
                  Schedule a GCC Discovery Call
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Link>
            <Link href="/contact">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105" data-testid="button-cta-talk">
                Talk to Our GCC Experts
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}