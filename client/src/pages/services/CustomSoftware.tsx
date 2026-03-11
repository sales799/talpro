import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Database, Globe, Settings, Shield, Zap, Check, ArrowRight, Monitor, Server, Cpu, Brain, Layers, Target, Award, Star, Rocket, Building2 } from 'lucide-react';

export default function CustomSoftware() {
  return (
    <div className="pt-16">
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
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">CUSTOM</span>
                Software Development Excellence
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                Build What's<br />
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Exactly</span> Right<br />
                <span className="bg-gradient-to-r from-teal-300 to-green-400 bg-clip-text text-transparent animate-gradient-shift">For You</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Bespoke software solutions tailored to your unique business requirements. We build scalable, 
                secure applications that achieve milestones, scale platforms, and ensure compliance.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto lg:mx-0">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-projects">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">200+</div>
                  <div className="text-xs text-white/70">Custom Apps</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-industries">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">25+</div>
                  <div className="text-xs text-white/70">Industries</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-scalability">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">10x</div>
                  <div className="text-xs text-white/70">Scalability</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/contact">
                  <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-get-consultation">
                    <span className="relative z-10 flex items-center gap-2">
                      Get Free Consultation
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </Link>
                <Link href="/case-studies">
                  <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105" data-testid="button-view-portfolio">
                    View Portfolio
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-2xl animate-float-rotate"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Custom software development workspace with code on multiple screens" 
                  className="rounded-2xl w-full h-auto shadow-2xl"
                />
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">Live Coding</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-blue-200/20 dark:border-blue-800/20">
              <Rocket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">BENEFITS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Custom Software?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Unlike off-the-shelf solutions, custom software is built specifically for your business processes, 
              ensuring perfect alignment with your goals and scalable growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-500 text-center h-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-2xl flex items-center justify-center mx-auto animate-float-rotate">
                    <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-blue-600 transition-colors">
                  Enhanced Efficiency
                </h3>
                <p className="text-muted-foreground mb-4">
                  Streamline workflows and eliminate bottlenecks with software designed specifically 
                  for your business processes.
                </p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-4/5 animate-progress-pulse"></div>
                </div>
              </div>
            </div>

            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-500 text-center h-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-2xl flex items-center justify-center mx-auto animate-float-rotate">
                    <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-blue-600 transition-colors">
                  Complete Control
                </h3>
                <p className="text-muted-foreground mb-4">
                  Own your software completely with full control over features, data, and future 
                  development roadmap.
                </p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-full animate-progress-pulse"></div>
                </div>
              </div>
            </div>

            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-500 text-center h-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-2xl flex items-center justify-center mx-auto animate-float-rotate">
                    <Settings className="w-8 h-8 text-blue-600 dark:text-blue-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-blue-600 transition-colors">
                  Perfect Integration
                </h3>
                <p className="text-muted-foreground mb-4">
                  Seamlessly integrate with your existing systems and third-party services without 
                  compatibility issues.
                </p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-5/6 animate-progress-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
              <Code className="w-4 h-4 text-green-400" />
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold">SERVICES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Our Custom <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Development</span> Services
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Comprehensive software development solutions covering every aspect of your digital transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-hover-effect group">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative w-14 h-14 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center flex-shrink-0 animate-float-rotate">
                      <Code className="w-7 h-7 text-green-400 icon-hover-rotate" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">Software Consulting</h3>
                    <p className="text-white/80 mb-4">
                      Strategic guidance on technology choices, architecture design, and development 
                      approach to ensure project success from day one.
                    </p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-400 mr-2" />
                        Technology Stack Selection
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-400 mr-2" />
                        Architecture Planning
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-400 mr-2" />
                        Requirements Analysis
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-hover-effect group">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative w-14 h-14 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center flex-shrink-0 animate-float-rotate">
                      <Globe className="w-7 h-7 text-green-400 icon-hover-rotate" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">Web Application Development</h3>
                    <p className="text-white/80 mb-4">
                      Modern, responsive web applications built with cutting-edge technologies for 
                      optimal performance and user experience.
                    </p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-400 mr-2" />
                        Progressive Web Apps (PWA)
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-400 mr-2" />
                        Single Page Applications (SPA)
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-400 mr-2" />
                        E-commerce Platforms
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-hover-effect group">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative w-14 h-14 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center flex-shrink-0 animate-float-rotate">
                      <Database className="w-7 h-7 text-green-400 icon-hover-rotate" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">Enterprise Applications</h3>
                    <p className="text-white/80 mb-4">
                      Robust enterprise-grade applications that handle complex business logic, 
                      high traffic, and mission-critical operations.
                    </p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-400 mr-2" />
                        ERP Systems
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-400 mr-2" />
                        CRM Solutions
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-400 mr-2" />
                        Business Intelligence
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-hover-effect group">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative w-14 h-14 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center flex-shrink-0 animate-float-rotate">
                      <Settings className="w-7 h-7 text-green-400 icon-hover-rotate" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">API Development & Integration</h3>
                    <p className="text-white/80 mb-4">
                      Secure, scalable APIs and seamless integrations that connect your systems 
                      and enable data flow across your digital ecosystem.
                    </p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-400 mr-2" />
                        RESTful API Development
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-400 mr-2" />
                        GraphQL APIs
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-400 mr-2" />
                        Third-party Integrations
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-blue-200/20 dark:border-blue-800/20">
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">TECH STACK</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Technology</span> Arsenal
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We use modern, proven technologies to build software that's reliable, scalable, and future-ready.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-500 text-center h-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-2xl flex items-center justify-center mx-auto animate-float-rotate">
                    <Monitor className="w-8 h-8 text-blue-600 dark:text-blue-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-6 group-hover:text-blue-600 transition-colors">Frontend</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">React.js</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-5/6 animate-progress-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">Vue.js</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-4/5 animate-progress-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">Angular</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-3/4 animate-progress-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">TypeScript</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-full animate-progress-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">Next.js</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-5/6 animate-progress-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-500 text-center h-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-2xl flex items-center justify-center mx-auto animate-float-rotate">
                    <Server className="w-8 h-8 text-blue-600 dark:text-blue-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-6 group-hover:text-blue-600 transition-colors">Backend</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">Node.js</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-full animate-progress-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">Python</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-5/6 animate-progress-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">Java</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-4/5 animate-progress-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">C#/.NET</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-3/4 animate-progress-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">PHP</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-2/3 animate-progress-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-500 text-center h-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-2xl flex items-center justify-center mx-auto animate-float-rotate">
                    <Database className="w-8 h-8 text-blue-600 dark:text-blue-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-6 group-hover:text-blue-600 transition-colors">Database</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">PostgreSQL</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-full animate-progress-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">MySQL</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-5/6 animate-progress-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">MongoDB</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-4/5 animate-progress-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">Redis</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-4/5 animate-progress-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">Elasticsearch</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-3/4 animate-progress-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-500 text-center h-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-2xl flex items-center justify-center mx-auto animate-float-rotate">
                    <Cpu className="w-8 h-8 text-blue-600 dark:text-blue-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-6 group-hover:text-blue-600 transition-colors">Cloud</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">AWS</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-full animate-progress-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">Azure</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-5/6 animate-progress-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">Google Cloud</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-4/5 animate-progress-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">Docker</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-full animate-progress-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">Kubernetes</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full w-4/5 animate-progress-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
              <Target className="w-4 h-4 text-green-400" />
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold">PROCESS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Development</span> Process
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Agile methodology ensures transparent communication, regular deliveries, and high-quality results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-hover-effect group text-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 h-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-20 h-20 bg-white/10 backdrop-blur rounded-full flex items-center justify-center mx-auto animate-float-rotate">
                    <span className="text-3xl font-bold text-green-400 group-hover:scale-110 transition-transform">1</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">Discovery</h3>
                <p className="text-white/80 mb-4">
                  Understanding your business requirements, goals, and technical constraints
                </p>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full w-1/4 animate-progress-pulse"></div>
                </div>
              </div>
            </div>

            <div className="card-hover-effect group text-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 h-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-20 h-20 bg-white/10 backdrop-blur rounded-full flex items-center justify-center mx-auto animate-float-rotate">
                    <span className="text-3xl font-bold text-green-400 group-hover:scale-110 transition-transform">2</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">Planning</h3>
                <p className="text-white/80 mb-4">
                  Creating detailed project roadmap, architecture design, and sprint planning
                </p>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full w-2/4 animate-progress-pulse"></div>
                </div>
              </div>
            </div>

            <div className="card-hover-effect group text-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 h-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-20 h-20 bg-white/10 backdrop-blur rounded-full flex items-center justify-center mx-auto animate-float-rotate">
                    <span className="text-3xl font-bold text-green-400 group-hover:scale-110 transition-transform">3</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">Development</h3>
                <p className="text-white/80 mb-4">
                  Iterative development with regular demos and feedback incorporation
                </p>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full w-3/4 animate-progress-pulse"></div>
                </div>
              </div>
            </div>

            <div className="card-hover-effect group text-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 h-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-20 h-20 bg-white/10 backdrop-blur rounded-full flex items-center justify-center mx-auto animate-float-rotate">
                    <span className="text-3xl font-bold text-green-400 group-hover:scale-110 transition-transform">4</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">Deployment</h3>
                <p className="text-white/80 mb-4">
                  Seamless deployment with ongoing support and maintenance services
                </p>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full w-full animate-progress-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-12 border border-slate-200/50 dark:border-slate-700/50">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-blue-200/20 dark:border-blue-800/20">
              <Rocket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">GET STARTED</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Ready to Build Your <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Custom Solution?</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Let's discuss your project requirements and create software that perfectly fits your business needs.
            </p>
            
            {/* Success indicators */}
            <div className="grid grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-sm font-semibold text-foreground">Free Consultation</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-sm font-semibold text-foreground">Expert Team</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-sm font-semibold text-foreground">Quality Assured</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-start-project">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Project
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
              <Link href="/case-studies">
                <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-foreground transition-all duration-300 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105" data-testid="button-view-examples">
                  View Examples
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
