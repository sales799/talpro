import { useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Smartphone, Brain, Cloud, Users, ArrowRight, Check, Zap, Cpu, Database, Globe, Server, Monitor, Shield, Target, TrendingUp, Award, Star, Rocket, Building2, Heart } from 'lucide-react';

export default function Services() {
  useEffect(() => {
    const originalTitle = document.title;
    let metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content') || null;
    const tagExisted = !!metaDescription;
    
    document.title = 'Technology Services - Custom Software, Mobile Apps & AI Solutions | TalPro';
    
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Comprehensive technology solutions for digital transformation. Custom software development, mobile apps, AI/ML, cloud solutions, and consulting. End-to-end services with 99% on-time delivery.');
    
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
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">TALPRO SERVICES</span>
                Technology Solutions
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Transform</span><br />
                Your Business<br />
                <span className="bg-gradient-to-r from-teal-300 to-green-400 bg-clip-text text-transparent animate-gradient-shift">Digitally</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Comprehensive technology solutions designed to accelerate your business growth. From custom software to AI-powered systems, we deliver end-to-end digital transformation.
              </p>
              
              {/* Service Stats */}
              <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto lg:mx-0">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-services">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">6+</div>
                  <div className="text-xs text-white/70">Services</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-expertise">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">25+</div>
                  <div className="text-xs text-white/70">Technologies</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-delivery">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">99%</div>
                  <div className="text-xs text-white/70">On-Time</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/contact">
                  <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-get-quote">
                    <span className="relative z-10 flex items-center gap-2">
                      Get Free Quote
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
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Modern technology services dashboard showing various software solutions" 
                  className="rounded-2xl w-full h-auto shadow-2xl"
                />
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">Active Services</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 rounded-full mb-6">
              <Rocket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">COMPREHENSIVE SOLUTIONS</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">Complete Technology</span><br />
              <span className="text-foreground">Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We provide end-to-end solutions with a quality-first approach that delivers tangible business value and measurable ROI.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Custom Software Development */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <Card className="card-hover-effect stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative">
                <CardContent className="p-8">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 animate-float-rotate shadow-lg">
                      <Code className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">★</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Custom Software</span><br />
                    <span className="text-foreground">Development</span>
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Bespoke software solutions tailored to your unique business requirements. We build scalable, 
                    secure applications that grow with your business and deliver measurable ROI.
                  </p>
                  <ul className="space-y-3 mb-6 text-sm">
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Enterprise Applications</span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Web Applications</span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">API Development & Integration</span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Legacy System Modernization</span>
                    </li>
                  </ul>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-6 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-[95%] animate-progress-pulse"></div>
                  </div>
                  <Link href="/services/custom-software">
                    <Button className="w-full btn-gradient-hover group/btn relative overflow-hidden" data-testid="button-custom-software">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Learn More 
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Mobile App Development */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <Card className="card-hover-effect stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative">
                <CardContent className="p-8">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 animate-float-rotate shadow-lg">
                      <Smartphone className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">★</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Mobile App</span><br />
                    <span className="text-foreground">Development</span>
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    High-performing native and cross-platform mobile applications that deliver exceptional 
                    user experiences across iOS and Android devices.
                  </p>
                  <ul className="space-y-3 mb-6 text-sm">
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Native iOS & Android Apps</span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Cross-Platform Solutions</span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">UI/UX Design & Optimization</span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">App Store Deployment</span>
                    </li>
                  </ul>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-6 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full w-[92%] animate-progress-pulse"></div>
                  </div>
                  <Link href="/services/mobile-app">
                    <Button className="w-full btn-gradient-hover group/btn relative overflow-hidden" data-testid="button-mobile-app">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Learn More 
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* AI & Machine Learning */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <Card className="card-hover-effect stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative">
                <CardContent className="p-8">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 animate-float-rotate shadow-lg">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">★</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">AI & Machine</span><br />
                    <span className="text-foreground">Learning</span>
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Intelligent systems that automate processes, derive insights, and drive growth through 
                    cutting-edge artificial intelligence and machine learning technologies.
                  </p>
                  <ul className="space-y-3 mb-6 text-sm">
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">AI Strategy & Consulting</span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Machine Learning Models</span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Natural Language Processing</span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Predictive Analytics</span>
                    </li>
                  </ul>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-6 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full w-[98%] animate-progress-pulse"></div>
                  </div>
                  <Link href="/services/ai-ml">
                    <Button className="w-full btn-gradient-hover group/btn relative overflow-hidden" data-testid="button-ai-ml">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Learn More 
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Cloud Solutions */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-sky-600/20 to-indigo-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <Card className="card-hover-effect stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative">
                <CardContent className="p-8">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 animate-float-rotate shadow-lg">
                      <Cloud className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">★</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">Cloud</span><br />
                    <span className="text-foreground">Solutions</span>
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Scalable cloud infrastructure and migration services that improve performance, 
                    reduce costs, and enhance security for your business operations.
                  </p>
                  <ul className="space-y-3 mb-6 text-sm">
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Cloud Migration Services</span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">DevOps & CI/CD</span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Infrastructure as Code</span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Security & Compliance</span>
                    </li>
                  </ul>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-6 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full w-[90%] animate-progress-pulse"></div>
                  </div>
                  <Link href="/contact">
                    <Button className="w-full btn-gradient-hover group/btn relative overflow-hidden" data-testid="button-cloud-solutions">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Learn More 
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Technology Consulting */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <Card className="card-hover-effect stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative">
                <CardContent className="p-8">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 animate-float-rotate shadow-lg">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">★</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Technology</span><br />
                    <span className="text-foreground">Consulting</span>
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Strategic technology guidance to help you make informed decisions, optimize your 
                    tech stack, and align technology with your business objectives.
                  </p>
                  <ul className="space-y-3 mb-6 text-sm">
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Digital Strategy Planning</span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Technology Architecture</span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Performance Optimization</span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Security Assessments</span>
                    </li>
                  </ul>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-6 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full w-[96%] animate-progress-pulse"></div>
                  </div>
                  <Link href="/contact">
                    <Button className="w-full btn-gradient-hover group/btn relative overflow-hidden" data-testid="button-consulting">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Learn More 
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Quality Assurance */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-teal-600/20 to-green-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <Card className="card-hover-effect stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative">
                <CardContent className="p-8">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 animate-float-rotate shadow-lg">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">★</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">Quality</span><br />
                    <span className="text-foreground">Assurance</span>
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Comprehensive testing services to ensure your software is reliable, secure, and 
                    performs optimally across all platforms and environments.
                  </p>
                  <ul className="space-y-3 mb-6 text-sm">
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Automated Testing</span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Performance Testing</span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Security Testing</span>
                    </li>
                    <li className="flex items-center group/item">
                      <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">User Acceptance Testing</span>
                    </li>
                  </ul>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-6 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal-500 to-green-600 rounded-full w-[94%] animate-progress-pulse"></div>
                  </div>
                  <Link href="/contact">
                    <Button className="w-full btn-gradient-hover group/btn relative overflow-hidden" data-testid="button-qa">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Learn More 
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* GCC & Operational Services */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20" data-testid="section-gcc-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20">
              <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">GCC & OPERATIONS</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">India Market Entry &</span><br />
              <span className="text-foreground">Operational Excellence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Set up and scale your India operations with our comprehensive 4-pillar service model. From GCC setup to talent acquisition, workspace, and compliance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* GCC Accelerator */}
            <div className="group relative" data-testid="hub-gcc-accelerator">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <Card className="card-hover-effect stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative h-full">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-foreground">GCC Accelerator</h3>
                        <span className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full">FLAGSHIP</span>
                      </div>
                      <p className="text-muted-foreground mb-4">Launch your India center in 45-60 days. Full incorporation, compliance, hiring, and workspace. Build-Operate-Transfer available.</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">Entity Setup</span>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">Compliance</span>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">BOT Model</span>
                      </div>
                      <Link href="/services/gcc-accelerator">
                        <Button className="btn-gradient-hover group/btn relative overflow-hidden" data-testid="button-hub-gcc">
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            Explore GCC Setup
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Talent Intelligence */}
            <div className="group relative" data-testid="hub-talent-intelligence">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <Card className="card-hover-effect stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative h-full">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-foreground">Talent Intelligence</h3>
                        <span className="px-2 py-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-full">AI-POWERED</span>
                      </div>
                      <p className="text-muted-foreground mb-4">48-hour shortlists powered by Agentic AI. Engineer-vetted candidates, not keyword-matched resumes. Top 1% talent guaranteed.</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-full">AI Screening</span>
                        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-full">EOR</span>
                        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-full">Eng Pods</span>
                      </div>
                      <Link href="/services/talent-intelligence">
                        <Button className="btn-gradient-hover group/btn relative overflow-hidden" data-testid="button-hub-talent">
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            Find Top Talent
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Workspace Solutions */}
            <div className="group relative" data-testid="hub-workspace-solutions">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <Card className="card-hover-effect stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative h-full">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Monitor className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-foreground">Workspace Solutions</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">Day-1 ready offices in Bangalore, Hyderabad, Pune. Brand-integrated design, IT infrastructure, managed operations.</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">4 Cities</span>
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">IT Ready</span>
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full">Branded</span>
                      </div>
                      <Link href="/services/workspace-solutions">
                        <Button className="btn-gradient-hover group/btn relative overflow-hidden" data-testid="button-hub-workspace">
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            Explore Workspaces
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Business Operations */}
            <div className="group relative" data-testid="hub-business-operations">
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-600/20 to-amber-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <Card className="card-hover-effect stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative h-full">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-foreground">Business Operations</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">Payroll, compliance, tax filings, onboarding. Your operational backbone managed end-to-end with 100% compliance rate.</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded-full">Payroll</span>
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded-full">Compliance</span>
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded-full">CXO-aaS</span>
                      </div>
                      <Link href="/services/business-operations">
                        <Button className="btn-gradient-hover group/btn relative overflow-hidden" data-testid="button-hub-operations">
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            Simplify Operations
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack & Expertise */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 2px, transparent 2px), radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px, 25px 25px'
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-6">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">TECHNOLOGY EXPERTISE</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-shift">Cutting-Edge</span><br />
              <span className="text-white">Technology Stack</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              We leverage the latest technologies and frameworks to deliver scalable, high-performance solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Frontend Technologies */}
            <div className="group">
              <div className="stat-card-glass bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform animate-float-rotate">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">Frontend</h3>
                <div className="space-y-2 text-sm text-white/70">
                  <div>React, Vue, Angular</div>
                  <div>TypeScript, Next.js</div>
                  <div>Tailwind CSS</div>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-[95%] animate-progress-pulse"></div>
                </div>
              </div>
            </div>

            {/* Backend Technologies */}
            <div className="group">
              <div className="stat-card-glass bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform animate-float-rotate">
                  <Server className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">Backend</h3>
                <div className="space-y-2 text-sm text-white/70">
                  <div>Node.js, Python</div>
                  <div>Java, .NET Core</div>
                  <div>Express, FastAPI</div>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-[98%] animate-progress-pulse"></div>
                </div>
              </div>
            </div>

            {/* Database Technologies */}
            <div className="group">
              <div className="stat-card-glass bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform animate-float-rotate">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Database</h3>
                <div className="space-y-2 text-sm text-white/70">
                  <div>PostgreSQL, MongoDB</div>
                  <div>Redis, Elasticsearch</div>
                  <div>MySQL, DynamoDB</div>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-[92%] animate-progress-pulse"></div>
                </div>
              </div>
            </div>

            {/* Cloud & DevOps */}
            <div className="group">
              <div className="stat-card-glass bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform animate-float-rotate">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">Cloud & DevOps</h3>
                <div className="space-y-2 text-sm text-white/70">
                  <div>AWS, Azure, GCP</div>
                  <div>Docker, Kubernetes</div>
                  <div>CI/CD, Terraform</div>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-[96%] animate-progress-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Expertise Levels */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-8">Our Expertise Levels</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-2" data-testid="expertise-years">13+</div>
                <div className="text-white/80">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2" data-testid="expertise-technologies">25+</div>
                <div className="text-white/80">Technologies Mastered</div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2" data-testid="expertise-certifications">50+</div>
                <div className="text-white/80">Certifications</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6">
              <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">OUR APPROACH</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Why Choose</span><br />
              <span className="text-foreground">Talpro Services?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our proven approach ensures successful project delivery and long-term partnership through excellence and innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="group text-center">
              <div className="journey-card-wrapper relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-6 border border-white/20 dark:border-slate-700/20 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Discovery &</span><br />
                    <span className="text-foreground">Planning</span>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We start by understanding your business goals and technical requirements through comprehensive analysis
                  </p>
                  <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-4 animate-progress-pulse"></div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group text-center">
              <div className="journey-card-wrapper relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-6 border border-white/20 dark:border-slate-700/20 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Design &</span><br />
                    <span className="text-foreground">Architecture</span>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Creating scalable architecture and user-centered design solutions that ensure optimal performance
                  </p>
                  <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mt-4 animate-progress-pulse"></div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group text-center">
              <div className="journey-card-wrapper relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-6 border border-white/20 dark:border-slate-700/20 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3">
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Development &</span><br />
                    <span className="text-foreground">Testing</span>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Agile development with continuous testing and quality assurance for reliable, robust solutions
                  </p>
                  <div className="w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mt-4 animate-progress-pulse"></div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group text-center">
              <div className="journey-card-wrapper relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-6 border border-white/20 dark:border-slate-700/20 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3">
                    <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Launch &</span><br />
                    <span className="text-foreground">Support</span>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Smooth deployment with ongoing maintenance and support services for continued success
                  </p>
                  <div className="w-full h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mt-4 animate-progress-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-700 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-purple-600/40"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px, 40px 40px'
        }}></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse-glow"></div>
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">READY TO START?</span>
            Transform Your Vision
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Ready to Transform</span><br />
            Your Business <span className="bg-gradient-to-r from-teal-300 to-green-400 bg-clip-text text-transparent animate-gradient-shift">Digitally?</span>
          </h2>
          
          <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            Let's discuss your project requirements and explore how our cutting-edge services can drive your success and accelerate your digital transformation journey.
          </p>
          
          {/* Enhanced Stats */}
          <div className="grid grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="cta-stat-consultation">
              <div className="text-3xl font-bold text-green-400 group-hover:scale-110 transition-transform">FREE</div>
              <div className="text-sm text-white/70">Consultation</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="cta-stat-response">
              <div className="text-3xl font-bold text-green-400 group-hover:scale-110 transition-transform">24H</div>
              <div className="text-sm text-white/70">Response</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="cta-stat-guarantee">
              <div className="text-3xl font-bold text-green-400 group-hover:scale-110 transition-transform">100%</div>
              <div className="text-sm text-white/70">Satisfaction</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/contact">
              <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white rounded-2xl shadow-2xl text-lg" data-testid="button-get-consultation">
                <span className="relative z-10 flex items-center gap-3">
                  <Rocket className="w-6 h-6" />
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Link>
            <Link href="/case-studies">
              <button className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border-2 border-white/20 hover:bg-white/20 hover:scale-105 hover:shadow-2xl text-lg" data-testid="button-view-portfolio">
                <span className="flex items-center gap-3">
                  <Award className="w-6 h-6" />
                  View Our Portfolio
                </span>
              </button>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/60">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">5.0 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">Secure & Reliable</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">Proven Results</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
