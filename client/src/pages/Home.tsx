import { useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Code, Smartphone, Brain, Check, Star, Shield, Compass, Handshake, Rocket, Building2, Settings, Zap, Search, Layout, Palette, TrendingUp, RefreshCw, Heart, CreditCard, ShoppingCart, GraduationCap, Truck, Plane, Monitor, Database, Cloud, Cpu, FileCode2, Globe, Server, MessageCircle } from 'lucide-react';

export default function Home() {
  useEffect(() => {
    const originalTitle = document.title;
    let metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content') || null;
    const tagExisted = !!metaDescription;
    
    document.title = 'TalPro - Custom Software Development & AI Solutions | Engineering Excellence';
    
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'TalPro delivers future-ready software solutions with 500+ successful projects. Expert custom software development, mobile apps, AI/ML solutions, and cloud services. Transform your business today.');
    
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

  return (
    <div>
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
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">TALPRO</span>
                Software Engineering Excellence
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-gradient-shift">
                Engineer What's<br />
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent">Next</span> - Faster,<br />
                <span className="bg-gradient-to-r from-teal-300 to-green-400 bg-clip-text text-transparent">Smarter</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Delivering future-ready software solutions on time and on budget. We transform your ideas into scalable, innovative digital products that drive business growth.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto lg:mx-0">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">500+</div>
                  <div className="text-xs text-white/70">Projects</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">450+</div>
                  <div className="text-xs text-white/70">Experts</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">97%</div>
                  <div className="text-xs text-white/70">Satisfaction</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/contact">
                  <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-start-project">
                    <span className="relative z-10 flex items-center gap-2">
                      Start Your Project
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </Link>
                <Link href="/case-studies">
                  <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105" data-testid="button-view-work">
                    View Our Work
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Modern software development workspace with multiple monitors showing code" 
                  className="rounded-2xl w-full h-auto shadow-2xl"
                />
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">Live Development</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 48-Hour Promise Banner */}
      <section className="py-6 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white relative overflow-hidden" data-testid="section-48h-promise">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center animate-pulse-glow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">The 48-Hour Promise</h3>
                <p className="text-white/90 text-sm">From brief to shortlist in 48 hours. Top 1% talent, engineer-vetted, ready to deploy.</p>
              </div>
            </div>
            <Link href="/services/talent-intelligence">
              <button className="group relative inline-flex items-center justify-center px-6 py-3 font-semibold text-amber-600 bg-white rounded-xl shadow-lg hover:scale-105 transition-all duration-300" data-testid="button-48h-promise">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* India Market Entry - 4 Pillar Service Model */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20" data-testid="section-india-market-entry">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20">
              <Globe className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">INDIA MARKET ENTRY</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">Your Complete India</span><br />
              <span className="text-foreground">Growth Platform</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              73% of Fortune 2000 companies haven't entered India yet. We make it happen in 45-60 days with our 4-pillar service model.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: GCC Accelerator */}
            <div className="group relative" data-testid="pillar-gcc">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-6 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">GCC Accelerator</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">Launch your India center in 45-60 days. Full incorporation, compliance, and team setup.</p>
                <Link href="/services/gcc-accelerator">
                  <span className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Pillar 2: Workspace Solutions */}
            <div className="group relative" data-testid="pillar-workspace">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-6 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Monitor className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Workspace Solutions</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">Day-1 ready offices in Bangalore, Hyderabad, Pune. Brand-integrated, IT-provisioned.</p>
                <Link href="/services/workspace-solutions">
                  <span className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Pillar 3: Talent Intelligence */}
            <div className="group relative" data-testid="pillar-talent">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-6 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Talent Intelligence</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">AI-powered hiring for the top 1%. 48-hour shortlists, engineer-vetted candidates.</p>
                <Link href="/services/talent-intelligence">
                  <span className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Pillar 4: Business Operations */}
            <div className="group relative" data-testid="pillar-operations">
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-600/20 to-amber-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-6 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Business Operations</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">Payroll, compliance, tax, and onboarding. Your operational backbone, handled.</p>
                <Link href="/services/business-operations">
                  <span className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-explore-all-services">
                <span className="relative z-10 flex items-center gap-2">
                  Explore All Services
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Trusted by Industry Leaders</h2>
            <p className="text-muted-foreground">Building excellence through proven expertise and commitment</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="group">
              <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FileCode2 className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2" data-testid="stat-projects">500+</div>
                <div className="text-muted-foreground text-sm">Projects Completed</div>
                <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full w-full animate-progress-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2" data-testid="stat-developers">450+</div>
                <div className="text-muted-foreground text-sm">Expert Developers</div>
                <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-full animate-progress-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2" data-testid="stat-satisfaction">97%</div>
                <div className="text-muted-foreground text-sm">Client Satisfaction</div>
                <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-[97%] animate-progress-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2" data-testid="stat-experience">15+</div>
                <div className="text-muted-foreground text-sm">Years Experience</div>
                <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-full animate-progress-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Journey Paths */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Choose Your Path Forward</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you're building your first product or scaling your enterprise, we have tailored solutions to accelerate your success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Startup Path */}
            <div className="journey-card-wrapper h-full">
              <Card className="group bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border-2 border-transparent hover:border-blue-500/50 shadow-lg h-full backdrop-blur-sm">
                <CardContent className="p-8 flex flex-col h-full relative overflow-hidden">
                  <div className="journey-card-bg absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-full -translate-y-16 translate-x-16 transition-transform duration-700"></div>
                
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 icon-hover-rotate shadow-lg animate-float-rotate">
                    <Rocket className="w-10 h-10 text-white" />
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-foreground">Startups</h3>
                      <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-xs font-bold rounded-full">RAPID</div>
                    </div>
                    <p className="text-muted-foreground text-sm font-medium">For early-growth CTOs and founders</p>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    From idea to market-ready product. We help startups build, launch, and scale with speed and efficiency.
                  </p>
                  
                  <div className="space-y-3 mb-8 flex-1">
                    <div className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">MVP Development</h4>
                        <p className="text-xs text-muted-foreground">Rapid prototype to validate your concept</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Compass className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">Product Discovery</h4>
                        <p className="text-xs text-muted-foreground">Market research and feature planning</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Code className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">Rapid Prototyping</h4>
                        <p className="text-xs text-muted-foreground">Quick iterations and user feedback</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">CTO as a Service</h4>
                        <p className="text-xs text-muted-foreground">Technical leadership and strategy</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/contact?type=startup">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-startup-cta">
                      Start Building Your MVP
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            </div>

            {/* Enterprise Path */}
            <div className="journey-card-wrapper h-full">
              <Card className="group bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-2 border-transparent hover:border-purple-500/50 shadow-lg h-full backdrop-blur-sm">
                <CardContent className="p-8 flex flex-col h-full relative overflow-hidden">
                  <div className="journey-card-bg absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full -translate-y-16 translate-x-16 transition-transform duration-700"></div>
                
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 icon-hover-rotate shadow-lg animate-float-rotate">
                    <Building2 className="w-10 h-10 text-white" />
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-foreground">Enterprise</h3>
                      <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold rounded-full">SCALE</div>
                    </div>
                    <p className="text-muted-foreground text-sm font-medium">For CROs and technology leaders</p>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    Transform your business with scalable solutions. We modernize systems and optimize operations at enterprise scale.
                  </p>
                  
                  <div className="space-y-3 mb-8 flex-1">
                    <div className="flex items-start space-x-3">
                      <Settings className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">Digital Transformation</h4>
                        <p className="text-xs text-muted-foreground">End-to-end modernization strategy</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Code className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">Legacy System Modernization</h4>
                        <p className="text-xs text-muted-foreground">Upgrade outdated infrastructure</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Building2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">Enterprise Application Development</h4>
                        <p className="text-xs text-muted-foreground">Scalable solutions for complex needs</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">QA & Testing Services</h4>
                        <p className="text-xs text-muted-foreground">Comprehensive quality assurance</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link href="/contact?type=enterprise">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-enterprise-cta">
                      Schedule Enterprise Consultation
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - After Customer Journey Paths */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Choose Your Path to Success?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're a startup or enterprise, we're here to guide you through every step of your digital transformation journey.
          </p>
          <Link href="/contact">
            <Button className="bg-primary text-primary-foreground px-8 py-3 hover:bg-primary/90" data-testid="button-choose-path">
              Get Started Today
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Proven Development Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From initial concept to ongoing support, our structured approach ensures your project succeeds at every stage. 
              We follow proven methodologies that deliver results on time and within budget.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Discovery & Analysis */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20" data-testid="card-discovery">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Discovery & Analysis</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We gather detailed requirements, analyze your business needs, and define project scope to ensure clear objectives and deliverables.
                </p>
              </CardContent>
            </Card>

            {/* Planning & Architecture */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20" data-testid="card-planning">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Layout className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Planning & Architecture</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our experts assemble the right team and create a comprehensive technical roadmap with timelines and milestones.
                </p>
              </CardContent>
            </Card>

            {/* Design & Prototyping */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20" data-testid="card-design">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Palette className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Design & Prototyping</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We create intuitive UI/UX designs and interactive prototypes, conducting user testing to validate the user experience.
                </p>
              </CardContent>
            </Card>

            {/* Development & Testing */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20" data-testid="card-development">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Development & Testing</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Agile development methodology with continuous integration, rigorous testing, and quality assurance at every sprint.
                </p>
              </CardContent>
            </Card>

            {/* Deployment & Launch */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20" data-testid="card-deployment">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Deployment & Launch</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Seamless production deployment with comprehensive go-live support, ensuring smooth transition and minimal downtime.
                </p>
              </CardContent>
            </Card>

            {/* Monitoring & Support */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20" data-testid="card-monitoring">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Monitoring & Support</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Continuous performance monitoring, proactive maintenance, and responsive technical support to keep your system running optimally.
                </p>
              </CardContent>
            </Card>

            {/* Optimization & Scaling */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20" data-testid="card-optimization">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Optimization & Scaling</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Performance optimization and infrastructure scaling to handle growing user demands and evolving business requirements.
                </p>
              </CardContent>
            </Card>

            {/* Maintenance & Evolution */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20" data-testid="card-maintenance">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <RefreshCw className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Maintenance & Evolution</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ongoing system updates, feature enhancements, and technology upgrades to keep your solution current and competitive.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/contact">
              <Button className="bg-primary text-primary-foreground px-8 py-3 hover:bg-primary/90" data-testid="button-start-process">
                Start Your Development Journey
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA - After Development Process */}
      <section className="py-10 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Start Your Development Journey?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and create a roadmap for success.
          </p>
          <Link href="/contact">
            <Button variant="outline" className="border-2 border-primary text-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground" data-testid="button-start-project">
              Discuss Your Needs
              <MessageCircle className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Industries We Serve</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We deliver specialized software solutions across diverse industries, helping businesses transform their operations and achieve sustainable growth through technology innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Healthcare */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20 group" data-testid="card-healthcare">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Healthcare</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Digital health solutions that improve patient outcomes and streamline medical operations.
                </p>
                <ul className="space-y-2 mb-4 text-xs text-muted-foreground">
                  <li className="flex items-center">
                    <Check className="w-3 h-3 text-accent mr-2 flex-shrink-0" />
                    Patient Management Systems
                  </li>
                  <li className="flex items-center">
                    <Check className="w-3 h-3 text-accent mr-2 flex-shrink-0" />
                    Telemedicine Platforms
                  </li>
                  <li className="flex items-center">
                    <Check className="w-3 h-3 text-accent mr-2 flex-shrink-0" />
                    Healthcare Analytics
                  </li>
                </ul>
                <Link href="/industries/healthcare-medical-technology">
                  <Button variant="link" className="text-primary text-sm p-0 font-semibold" data-testid="button-explore-healthcare">
                    Explore Solutions <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Finance & Banking */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20 group" data-testid="card-finance">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Finance & Banking</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Secure fintech solutions that enhance financial services and ensure regulatory compliance.
                </p>
                <ul className="space-y-2 mb-4 text-xs text-muted-foreground">
                  <li className="flex items-center">
                    <Check className="w-3 h-3 text-accent mr-2 flex-shrink-0" />
                    Payment Processing Systems
                  </li>
                  <li className="flex items-center">
                    <Check className="w-3 h-3 text-accent mr-2 flex-shrink-0" />
                    Digital Banking Platforms
                  </li>
                  <li className="flex items-center">
                    <Check className="w-3 h-3 text-accent mr-2 flex-shrink-0" />
                    Risk Management Tools
                  </li>
                </ul>
                <Link href="/industries/fintech-financial-services">
                  <Button variant="link" className="text-primary text-sm p-0 font-semibold" data-testid="button-explore-finance">
                    Explore Solutions <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* E-commerce & Retail */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20 group" data-testid="card-ecommerce">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">E-commerce & Retail</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Comprehensive retail solutions that drive online sales and optimize inventory management.
                </p>
                <ul className="space-y-2 mb-4 text-xs text-muted-foreground">
                  <li className="flex items-center">
                    <Check className="w-3 h-3 text-accent mr-2 flex-shrink-0" />
                    Online Marketplaces
                  </li>
                  <li className="flex items-center">
                    <Check className="w-3 h-3 text-accent mr-2 flex-shrink-0" />
                    Inventory Management
                  </li>
                  <li className="flex items-center">
                    <Check className="w-3 h-3 text-accent mr-2 flex-shrink-0" />
                    Customer Experience Tools
                  </li>
                </ul>
                <Link href="/industries/ecommerce-retail-solutions">
                  <Button variant="link" className="text-primary text-sm p-0 font-semibold" data-testid="button-explore-ecommerce">
                    Explore Solutions <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Education & E-Learning */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20 group" data-testid="card-education">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Education & E-Learning</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Educational technology that transforms learning experiences and improves academic outcomes.
                </p>
                <ul className="space-y-2 mb-4 text-xs text-muted-foreground">
                  <li className="flex items-center">
                    <Check className="w-3 h-3 text-accent mr-2 flex-shrink-0" />
                    Learning Management Systems
                  </li>
                  <li className="flex items-center">
                    <Check className="w-3 h-3 text-accent mr-2 flex-shrink-0" />
                    Virtual Classrooms
                  </li>
                  <li className="flex items-center">
                    <Check className="w-3 h-3 text-accent mr-2 flex-shrink-0" />
                    Student Assessment Tools
                  </li>
                </ul>
                <Link href="/industries/education-edtech-solutions">
                  <Button variant="link" className="text-primary text-sm p-0 font-semibold" data-testid="button-explore-education">
                    Explore Solutions <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA - After Industries */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Transform Your Industry?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            No matter your industry, we have the expertise and technology stack to deliver solutions that drive your business forward.
          </p>
          <Link href="/contact">
            <Button className="bg-primary text-primary-foreground px-8 py-3 hover:bg-primary/90" data-testid="button-transform-industry">
              Start Your Transformation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Technology Stack We Master */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Technology Stack We Master</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From MVPs to Enterprise Systems – We've Got the Stack. Our expertise spans the entire technology spectrum, enabling us to build robust, scalable solutions with the right tools for every project.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Frontend Technologies */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20 group" data-testid="card-frontend-stack">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Frontend Technologies</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Modern, responsive user interfaces that deliver exceptional user experiences across all devices and platforms.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">React</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">Vue.js</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">Angular</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">Next.js</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Backend Technologies */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20 group" data-testid="card-backend-stack">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Server className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Backend Technologies</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Robust server-side solutions that ensure high performance, security, and scalability for your applications.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">Node.js</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">Python</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">Java</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">.NET</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cloud & DevOps */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20 group" data-testid="card-cloud-devops">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Cloud className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Cloud & DevOps</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Scalable cloud infrastructure and DevOps practices that ensure reliable deployment and continuous delivery.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">AWS</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">Azure</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">Docker</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">Kubernetes</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Database Technologies */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20 group" data-testid="card-database-stack">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Database Technologies</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Robust data management solutions that ensure reliable storage, quick access, and seamless scalability.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">PostgreSQL</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">MongoDB</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">Redis</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">MySQL</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Technologies */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20 group" data-testid="card-mobile-stack">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Mobile Technologies</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Cross-platform mobile solutions that deliver native performance and user experience across iOS and Android.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">React Native</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">Flutter</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">Swift</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">Kotlin</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI/ML Technologies */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20 group" data-testid="card-ai-ml-stack">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">AI/ML Technologies</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Advanced AI and machine learning solutions that drive intelligent automation and data-driven insights.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">TensorFlow</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">PyTorch</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">OpenAI</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium">Scikit-learn</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Why Leading Companies Choose Us
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                With 15+ years of experience and 500+ successful projects, we've built a reputation for delivering exceptional software solutions that drive business growth.
              </p>
              
              {/* Core Values */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Reliability</h4>
                    <p className="text-sm text-muted-foreground">On-time delivery and budget adherence with transparent communication</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Innovation</h4>
                    <p className="text-sm text-muted-foreground">Cutting-edge technology solutions that keep you ahead of the competition</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Handshake className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Partnership</h4>
                    <p className="text-sm text-muted-foreground">Long-term collaboration focused on your business success</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Compass className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Leadership</h4>
                    <p className="text-sm text-muted-foreground">Leading innovation in technology and client service</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link href="/about">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-learn-more-about">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional team collaborating in modern office environment" 
                className="rounded-xl shadow-xl w-full h-auto"
              />
              
              {/* Achievement Cards */}
              <div className="absolute -bottom-8 -left-8 bg-card rounded-lg p-4 shadow-lg border border-border">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Industry Awards</div>
              </div>
              
              <div className="absolute -top-8 -right-8 bg-card rounded-lg p-4 shadow-lg border border-border">
                <div className="text-2xl font-bold text-primary">2500+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}