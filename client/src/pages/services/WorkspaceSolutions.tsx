import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight, MapPin, Palette, Server, Settings, Heart, Layers, Building2, Shield, Zap, CheckCircle, Monitor, Wifi, Clock, Users, Star, TrendingUp } from 'lucide-react';

export default function WorkspaceSolutions() {
  useEffect(() => {
    const originalTitle = document.title;
    let metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content') || null;
    const tagExisted = !!metaDescription;

    document.title = 'Managed Workspace Solutions for Global Teams in India | TalPro';

    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Day-1 ready offices in Bangalore, Hyderabad, Pune. Brand-integrated design, IT infrastructure, managed operations for your India team.');

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
      icon: MapPin,
      title: 'Location Strategy',
      description: 'Micro-market advisory across Bangalore, Hyderabad, Pune, and Chennai. We analyze commute patterns, talent density, and cost-per-seat to find your optimal location.',
    },
    {
      icon: Palette,
      title: 'Brand-Integrated Design',
      description: 'Custom interiors reflecting your global brand identity. From color palettes to signage, your India office looks and feels like an extension of your HQ.',
    },
    {
      icon: Server,
      title: 'IT Infrastructure',
      description: 'Day-1 Digital Ready — enterprise-grade networking, video conferencing, security systems, and cloud-connected workstations provisioned before your team arrives.',
    },
    {
      icon: Settings,
      title: 'Managed Operations',
      description: 'End-to-end facility management including utilities, security, housekeeping, and vendor coordination. One SLA, zero operational headaches.',
    },
    {
      icon: Heart,
      title: 'Hospitality & Experience',
      description: 'Front desk services, pantry management, team events, and employee experience programs that make your India office a place people love to work.',
    },
    {
      icon: Layers,
      title: 'Flexible Models',
      description: 'From hot desks for 5 to a 500-seat private campus — scale up or down with flexible lease structures and zero lock-in beyond your current needs.',
    },
  ];

  const highlights = [
    { icon: Clock, title: '72-Hour Activation', description: 'From signed agreement to move-in-ready workspace in as little as 72 hours for co-working setups.' },
    { icon: Shield, title: 'Enterprise-Grade Security', description: 'CCTV, biometric access, fire safety, and ISO-compliant physical security across all facilities.' },
    { icon: Wifi, title: 'Redundant Connectivity', description: 'Dual ISP links with automatic failover, SD-WAN ready, and VPN tunnels to your global network.' },
    { icon: Users, title: 'Dedicated Account Manager', description: 'A single point of contact for all workspace needs — from maintenance requests to expansion planning.' },
    { icon: TrendingUp, title: 'Cost Transparency', description: 'All-inclusive per-seat pricing with no hidden charges. Monthly reporting on utilization and cost metrics.' },
    { icon: Star, title: 'Culture Integration', description: 'We help you bring your company culture to life through space design, community events, and branded experiences.' },
  ];

  return (
    <div className="pt-16" data-testid="workspace-solutions-page">
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
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">WORKSPACE SOLUTIONS</span>
                Managed Offices
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight" data-testid="hero-title">
                Beyond a Desk.<br />
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">An Extension</span> of<br />
                Your Global HQ.
              </h1>

              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                From seat leasing to fully branded private offices — we design, provision, and manage workspaces that reflect your culture and empower your India team.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-cities">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform" role="status">4</div>
                  <div className="text-xs text-white/70">Cities</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-seats">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform" role="status">500+</div>
                  <div className="text-xs text-white/70">Seats Managed</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-ready">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform" role="status">Day 1</div>
                  <div className="text-xs text-white/70">Digital Ready</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-uptime">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform" role="status">100%</div>
                  <div className="text-xs text-white/70">Uptime</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/contact">
                  <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-explore-options">
                    <span className="relative z-10 flex items-center gap-2">
                      Explore Workspace Options
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-2xl animate-float-rotate"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&h=600"
                  alt="Modern managed workspace with brand-integrated design"
                  className="rounded-2xl w-full h-auto shadow-2xl"
                />
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">Move-In Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800" data-testid="services-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20">
              <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">OUR SERVICES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">End-to-End</span><br />
              <span className="text-foreground">Workspace Management</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Everything your India team needs to be productive from Day 1 — designed, provisioned, and managed by TalPro.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 hover:scale-105 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why TalPro Workspaces */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20" data-testid="why-talpro-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20">
              <Star className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">WHY TALPRO WORKSPACES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">More Than</span><br />
              <span className="text-foreground">Just Four Walls</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We don't just find you space — we create an environment that attracts top talent, reflects your brand, and scales with your growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 hover:scale-105 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4">
                    <highlight.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{highlight.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{highlight.description}</p>
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
            Let's Design Your<br />
            <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">India Workspace</span>
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
            Whether you need 5 seats or 500, we'll design a workspace that your team will love and your leadership will trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-cta-workspace">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Workspace Options
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Link>
            <Link href="/contact">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105" data-testid="button-cta-consultation">
                Schedule a Site Visit
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}