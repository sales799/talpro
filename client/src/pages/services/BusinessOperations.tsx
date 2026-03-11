import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight, CreditCard, FileText, UserPlus, Heart, TrendingUp, Crown, Shield, CheckCircle, Clock, Target, Zap, Award, Building2 } from 'lucide-react';

export default function BusinessOperations() {
  useEffect(() => {
    const originalTitle = document.title;
    let metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content') || null;
    const tagExisted = !!metaDescription;

    document.title = 'GCC Business Operations & Compliance Services | TalPro';

    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Payroll, tax, compliance, and onboarding services for Global Capability Centers in India. Budget 2026 advisory and CXO-as-a-Service.');

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

  const services = [
    {
      icon: CreditCard,
      title: 'Payroll Processing',
      description: 'Monthly payroll, PF, ESI, Professional Tax — 100% statutory compliance, zero payslip errors.',
    },
    {
      icon: FileText,
      title: 'Tax & Regulatory',
      description: 'GST filing, Transfer Pricing documentation, Corporate Tax returns. Full compliance shield.',
    },
    {
      icon: UserPlus,
      title: 'Onboarding Engine',
      description: 'Structured onboarding: background verification, document collection, induction programs, Day-1 access setup.',
    },
    {
      icon: Heart,
      title: 'Retention Strategy',
      description: 'Total Rewards design: competitive compensation, insurance, learning budgets, ESOP advisory.',
    },
    {
      icon: TrendingUp,
      title: 'Budget 2026 Advisory',
      description: 'We architect your GCC structure to leverage Safe Harbour thresholds (₹2,000 Cr), cloud tax holidays (to 2047), and fast-tracked APAs.',
    },
    {
      icon: Crown,
      title: 'CXO-as-a-Service',
      description: 'Fractional leadership. A seasoned CTO or VP Engineering to set up your India technical roadmap before you hire a permanent leader.',
    },
  ];

  const differentiators = [
    {
      icon: Shield,
      title: 'Zero-Error Guarantee',
      description: 'Our multi-layer audit process ensures 100% accuracy on payslips, tax filings, and statutory submissions — every single month.',
    },
    {
      icon: Clock,
      title: 'Same-Day Resolution',
      description: 'Dedicated ops managers with 24/7 availability. Employee queries resolved within hours, not days.',
    },
    {
      icon: Target,
      title: 'Budget 2026 Expertise',
      description: 'We stay ahead of regulatory changes. Our advisory team is already optimizing GCC structures for Safe Harbour and cloud tax provisions.',
    },
    {
      icon: Award,
      title: 'Single Vendor, Full Stack',
      description: 'Payroll, compliance, onboarding, retention — all managed under one roof. No vendor coordination headaches.',
    },
  ];

  return (
    <div className="pt-16" data-testid="business-operations-page">
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
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">BUSINESS OPERATIONS</span>
                GCC Operations & Compliance
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight" data-testid="hero-title">
                The Boring Stuff<br />
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">That Makes Everything Work.</span>
              </h1>

              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Payroll, compliance, tax filings, onboarding — we manage the operational backbone of your India center so your leaders can focus on strategy.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-compliance">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">100%</div>
                  <div className="text-xs text-white/70">Compliance Rate</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-errors">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">Zero</div>
                  <div className="text-xs text-white/70">Payslip Errors</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-budget">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">2026</div>
                  <div className="text-xs text-white/70">Budget Ready</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-support">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">24/7</div>
                  <div className="text-xs text-white/70">Support</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/contact">
                  <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-simplify-ops">
                    <span className="relative z-10 flex items-center gap-2">
                      Simplify Your Operations
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </Link>
                <Link href="/services">
                  <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105" data-testid="button-explore-services">
                    Explore All Services
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-2xl animate-float-rotate"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&h=600"
                  alt="Business operations management dashboard with compliance and payroll tools"
                  className="rounded-2xl w-full h-auto shadow-2xl"
                />
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">100% Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden" data-testid="services-grid-section">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20">
              <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">OUR SERVICES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Operational Excellence</span><br />
              <span className="text-foreground">End to End</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From payroll to compliance to fractional leadership — every operational function your India center needs, managed under one roof.
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

      {/* Why Choose TalPro Operations */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 relative overflow-hidden" data-testid="why-choose-section">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(20, 184, 166, 0.08) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20">
              <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">WHY TALPRO</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Why Choose</span><br />
              <span className="text-foreground">TalPro Operations</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We don't just process payroll — we architect your entire operational backbone for scale, compliance, and retention.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map((diff) => {
              const Icon = diff.icon;
              return (
                <div key={diff.title} className="group relative" data-testid={`differentiator-${diff.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 hover:scale-105 hover:shadow-xl transition-all duration-300 h-full flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{diff.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{diff.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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
            Let's Simplify Your<br />
            <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">India Operations</span>
          </h2>
          <p className="text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed">
            From payroll to compliance to leadership — let our operations team handle the complexity so you can focus on building world-class products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-cta-contact">
                <span className="relative z-10 flex items-center gap-2">
                  Simplify Your Operations
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Link>
            <Link href="/services/gcc-accelerator">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105" data-testid="button-cta-gcc">
                Explore GCC Accelerator
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}