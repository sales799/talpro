import { useEffect } from 'react';
import { Handshake, Star, Shield, Compass, Users, Award, Globe, Heart, ArrowRight, TrendingUp, Target, Trophy, Calendar, Clock, Code2, Rocket, Building2, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  useEffect(() => {
    const originalTitle = document.title;
    let metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content') || null;
    const tagExisted = !!metaDescription;
    
    document.title = 'About TalPro - 15+ Years of Engineering Excellence | Our Story';
    
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Discover TalPro\'s journey from startup to global tech leader. 500+ successful projects, 450+ expert engineers, 97% client satisfaction. Learn about our values, expertise, and commitment to innovation.');
    
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
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">ABOUT TALPRO</span>
                Our Story & Vision
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Engineering</span><br />
                Excellence<br />
                <span className="bg-gradient-to-r from-teal-300 to-green-400 bg-clip-text text-transparent animate-gradient-shift">Since 2010</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                From a small startup vision to a global technology leader, we've been transforming businesses through innovative solutions and unwavering commitment to excellence.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto lg:mx-0">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-satisfaction">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">97%</div>
                  <div className="text-xs text-white/70">Satisfaction</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-projects">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">500+</div>
                  <div className="text-xs text-white/70">Projects</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-years">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">15+</div>
                  <div className="text-xs text-white/70">Years</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#story" className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-learn-story">
                  <span className="relative z-10 flex items-center gap-2">
                    Learn Our Story
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
                <a href="#values" className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105" data-testid="button-our-values">
                  Our Values
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-2xl animate-float-rotate"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Professional team collaborating in modern office environment" 
                  className="rounded-2xl w-full h-auto shadow-2xl"
                />
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">15+ Years Strong</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-blue-200/20 dark:border-blue-800/20">
                <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">OUR STORY</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8">
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">From Vision</span><br />
                to Global Impact
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Since our inception in 2010, Talpro has been delivering innovative IT solutions worldwide. 
                  What started as a small startup with a vision to bridge the gap between complex technology 
                  and business needs has evolved into a trusted technology partner for businesses of all sizes.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Over the past 15 years, we've witnessed the digital transformation of industries and have 
                  been privileged to play a key role in our clients' success stories. From our headquarters 
                  in Bengaluru, India to our global development teams, we've built a culture of innovation, 
                  excellence, and client-first thinking.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we're proud to be a leading software development company with a track record of 
                  delivering 500+ successful projects and maintaining a 97% client satisfaction rate.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-3xl blur-2xl animate-float-rotate"></div>
              <div className="relative stat-card-glass bg-white/10 dark:bg-slate-800/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 dark:border-slate-700/20 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Professional team collaborating in modern office environment" 
                  className="rounded-2xl w-full h-auto shadow-2xl"
                />
                <div className="absolute top-8 right-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Growing Strong</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="values" className="py-20 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20 dark:border-blue-800/20">
              <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">OUR PURPOSE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Mission</span> &
              <span className="bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent"> Vision</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The driving forces behind everything we do - our commitment to excellence and vision for the future.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="journey-card-wrapper h-full" data-testid="mission-card">
              <div className="group stat-card-glass bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-lg rounded-3xl p-8 border border-blue-200/30 dark:border-blue-800/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center h-full relative overflow-hidden">
                <div className="journey-card-bg absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16 transition-transform duration-700"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-float-rotate group-hover:scale-110 transition-transform">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Our Mission</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To drive business success through cutting-edge digital solutions that transform how 
                    companies operate, engage customers, and achieve their goals. We're committed to 
                    delivering innovative technology that creates measurable value for our clients.
                  </p>
                </div>
              </div>
            </div>

            <div className="journey-card-wrapper h-full" data-testid="vision-card">
              <div className="group stat-card-glass bg-gradient-to-br from-teal-50/80 to-green-50/80 dark:from-teal-900/20 dark:to-green-900/20 backdrop-blur-lg rounded-3xl p-8 border border-teal-200/30 dark:border-teal-800/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center h-full relative overflow-hidden">
                <div className="journey-card-bg absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-green-500/10 rounded-full -translate-y-16 translate-x-16 transition-transform duration-700"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-float-rotate group-hover:scale-110 transition-transform">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">Our Vision</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the world's most trusted technology partner, recognized for our ability to turn 
                    complex challenges into elegant solutions. We envision a future where technology 
                    seamlessly empowers every business to reach its full potential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-purple-200/20 dark:border-purple-800/20">
              <Star className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">OUR VALUES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Core Values</span><br />
              That Drive Our Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The fundamental principles that guide every decision, shape our culture, and define who we are.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            <div className="card-hover-effect h-full" data-testid="value-respect">
              <div className="stat-card-glass bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-900/20 dark:to-cyan-900/20 backdrop-blur-lg rounded-3xl p-6 border border-blue-200/30 dark:border-blue-800/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center group h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform animate-float-rotate">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Respect</span>
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  We value every client relationship and team member contribution, fostering an 
                  environment of mutual respect and collaboration.
                </p>
              </div>
            </div>

            <div className="card-hover-effect h-full" data-testid="value-excellence">
              <div className="stat-card-glass bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-lg rounded-3xl p-6 border border-purple-200/30 dark:border-purple-800/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center group h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform animate-float-rotate">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Excellence</span>
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  We strive for exceptional quality in everything we deliver, continuously 
                  improving our processes and pushing the boundaries of innovation.
                </p>
              </div>
            </div>

            <div className="card-hover-effect h-full" data-testid="value-authenticity">
              <div className="stat-card-glass bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-lg rounded-3xl p-6 border border-green-200/30 dark:border-green-800/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center group h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform animate-float-rotate">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Authenticity</span>
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  We believe in transparent communication and honest business practices, 
                  building trust through integrity and accountability.
                </p>
              </div>
            </div>

            <div className="card-hover-effect h-full" data-testid="value-leadership">
              <div className="stat-card-glass bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-orange-900/20 dark:to-red-900/20 backdrop-blur-lg rounded-3xl p-6 border border-orange-200/30 dark:border-orange-800/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center group h-full flex flex-col">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform animate-float-rotate">
                  <Compass className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Leadership</span>
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  We lead by example in innovation, technology adoption, and client service, 
                  setting new standards in the industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section id="story" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20 dark:border-blue-800/20">
              <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">OUR JOURNEY</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Milestones</span> That
              <br />Shaped Our Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From startup vision to industry leadership - discover the key moments that defined our evolution.
            </p>
          </div>

          <div className="relative">
            {/* Enhanced Timeline line with gradient */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-teal-500 to-green-500 hidden md:block rounded-full shadow-lg"></div>
            
            <div className="space-y-16">
              {/* 2010 - Company Founded */}
              <div className="flex flex-col md:flex-row items-center" data-testid="timeline-2010">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
                  <div className="card-hover-effect stat-card-glass bg-gradient-to-br from-blue-50/80 to-teal-50/80 dark:from-blue-900/20 dark:to-teal-900/20 backdrop-blur-lg rounded-3xl p-8 border border-blue-200/30 dark:border-blue-800/30 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg animate-float-rotate">
                        <Rocket className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="text-lg bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold mb-1">2010</div>
                        <h3 className="text-xl font-bold text-foreground">Company Founded</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Talpro was born with a revolutionary vision: to bridge the gap between complex technology and real business needs. Our founders set out to create solutions that actually work.
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full border-4 border-white dark:border-slate-900 shadow-xl z-20 hidden md:block animate-pulse-glow" data-testid="timeline-dot-2010"></div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>

              {/* 2011 - First Enterprise Client */}
              <div className="flex flex-col md:flex-row items-center" data-testid="timeline-2011">
                <div className="md:w-1/2 md:pr-12"></div>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full border-4 border-white dark:border-slate-900 shadow-xl z-20 hidden md:block animate-pulse-glow" data-testid="timeline-dot-2011"></div>
                <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0">
                  <div className="card-hover-effect stat-card-glass bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-lg rounded-3xl p-8 border border-purple-200/30 dark:border-purple-800/30 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg animate-float-rotate">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold mb-1">2011</div>
                        <h3 className="text-xl font-bold text-foreground">First Enterprise Client</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      A breakthrough moment - we secured our first Fortune 500 client. This marked our official entry into enterprise software development and validated our approach.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2012 - Global Expansion */}
              <div className="flex flex-col md:flex-row items-center" data-testid="timeline-2012">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
                  <div className="card-hover-effect stat-card-glass bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-lg rounded-3xl p-8 border border-green-200/30 dark:border-green-800/30 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg animate-float-rotate">
                        <Globe className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold mb-1">2012</div>
                        <h3 className="text-xl font-bold text-foreground">Global Expansion</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      We opened international offices and expanded into mobile app development. This strategic move positioned us as a global technology partner.
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full border-4 border-white dark:border-slate-900 shadow-xl z-20 hidden md:block animate-pulse-glow" data-testid="timeline-dot-2012"></div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>

              {/* 2018 - AI & ML Focus */}
              <div className="flex flex-col md:flex-row items-center" data-testid="timeline-2018">
                <div className="md:w-1/2 md:pr-12"></div>
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full border-4 border-white dark:border-slate-900 shadow-xl z-20 hidden md:block animate-pulse-glow" data-testid="timeline-dot-2018"></div>
                <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0">
                  <div className="card-hover-effect stat-card-glass bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-orange-900/20 dark:to-red-900/20 backdrop-blur-lg rounded-3xl p-8 border border-orange-200/30 dark:border-orange-800/30 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg animate-float-rotate">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="text-lg bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent font-bold mb-1">2018</div>
                        <h3 className="text-xl font-bold text-foreground">AI & ML Innovation</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      We launched our dedicated AI and Machine Learning division, pioneering intelligent software solutions that transform how businesses operate.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2024 - Present */}
              <div className="flex flex-col md:flex-row items-center" data-testid="timeline-2024">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
                  <div className="card-hover-effect stat-card-glass bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-900/20 dark:to-purple-900/20 backdrop-blur-lg rounded-3xl p-8 border border-indigo-200/30 dark:border-indigo-800/30 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg animate-float-rotate">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold mb-1">2024</div>
                        <h3 className="text-xl font-bold text-foreground">Industry Leadership</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Today, we're a recognized industry leader with 450+ expert team members serving 2500+ clients worldwide, setting new standards in software excellence.
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full border-4 border-white dark:border-slate-900 shadow-xl z-20 hidden md:block animate-pulse-glow" data-testid="timeline-dot-2024"></div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Key Statistics */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20 dark:border-blue-800/20">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">OUR IMPACT</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Proven Results</span><br />
              That Speak for Themselves
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every number tells a story of dedication, innovation, and the trust our clients place in us.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Years of Experience */}
            <div className="group" data-testid="stat-experience-card">
              <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2" data-testid="stat-years">15+</div>
                <div className="text-muted-foreground text-sm mb-3">Years of Experience</div>
                <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-full animate-progress-pulse"></div>
                </div>
              </div>
            </div>
            
            {/* Team Members */}
            <div className="group" data-testid="stat-team-card">
              <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2" data-testid="stat-team">450+</div>
                <div className="text-muted-foreground text-sm mb-3">Expert Team Members</div>
                <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-full animate-progress-pulse"></div>
                </div>
              </div>
            </div>
            
            {/* Satisfied Clients */}
            <div className="group" data-testid="stat-clients-card">
              <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2" data-testid="stat-clients">2500+</div>
                <div className="text-muted-foreground text-sm mb-3">Satisfied Clients</div>
                <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-full animate-progress-pulse"></div>
                </div>
              </div>
            </div>
            
            {/* Industry Awards */}
            <div className="group" data-testid="stat-awards-card">
              <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2" data-testid="stat-awards">15+</div>
                <div className="text-muted-foreground text-sm mb-3">Industry Awards</div>
                <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full w-full animate-progress-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 40% 60%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-purple-200/20 dark:border-purple-800/20">
              <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">LEADERSHIP</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Visionary Leaders</span><br />
              Driving Innovation
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the experienced technology leaders who guide our strategic vision and drive our success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* CEO */}
            <div className="card-hover-effect h-full" data-testid="leader-ceo">
              <div className="stat-card-glass bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-lg rounded-3xl p-8 border border-blue-200/30 dark:border-blue-800/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center group h-full flex flex-col">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform animate-float-rotate">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Bhaskar Anand</span>
                </h3>
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full border border-blue-200/30 dark:border-blue-800/30">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Chief Executive Officer</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  With 15+ years in tech leadership, Bhaskar drives Talpro's vision and strategic growth, 
                  ensuring we stay at the forefront of technology innovation.
                </p>
              </div>
            </div>

            {/* CTO */}
            <div className="card-hover-effect h-full" data-testid="leader-cto">
              <div className="stat-card-glass bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-lg rounded-3xl p-8 border border-purple-200/30 dark:border-purple-800/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center group h-full flex flex-col">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform animate-float-rotate">
                  <Code2 className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Binay Sinha</span>
                </h3>
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full border border-purple-200/30 dark:border-purple-800/30">
                    <Zap className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Chief Financial Officer</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  Binay leads our financial strategy and business operations, with expertise in 
                  financial planning, budgeting, and strategic business development.
                </p>
              </div>
            </div>

            {/* COO */}
            <div className="card-hover-effect h-full" data-testid="leader-coo">
              <div className="stat-card-glass bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-lg rounded-3xl p-8 border border-green-200/30 dark:border-green-800/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center group h-full flex flex-col">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform animate-float-rotate">
                  <Compass className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Ankita Raj</span>
                </h3>
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full border border-green-200/30 dark:border-green-800/30">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-700 dark:text-green-300">Chief Operating Officer</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  Ankita oversees our global operations and ensures project delivery excellence, 
                  maintaining our high standards of quality and client satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Partnerships */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 60% 40%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 60%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-indigo-200/20 dark:border-indigo-800/20">
              <Handshake className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold">PARTNERSHIPS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Technology</span><br />
              Alliance Partners
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Certified partnerships with industry-leading platforms ensuring cutting-edge solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
            <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl w-full h-24 flex items-center justify-center group" data-testid="partner-aws">
              <div className="text-lg font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">AWS</div>
            </div>
            <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl w-full h-24 flex items-center justify-center group" data-testid="partner-google">
              <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">Google Cloud</div>
            </div>
            <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl w-full h-24 flex items-center justify-center group" data-testid="partner-microsoft">
              <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">Microsoft</div>
            </div>
            <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl w-full h-24 flex items-center justify-center group" data-testid="partner-react">
              <div className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">React</div>
            </div>
            <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl w-full h-24 flex items-center justify-center group" data-testid="partner-nodejs">
              <div className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">Node.js</div>
            </div>
            <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl w-full h-24 flex items-center justify-center group" data-testid="partner-python">
              <div className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">Python</div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 75%, rgba(245, 158, 11, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 25%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-amber-200/20 dark:border-amber-800/20">
              <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-bold">RECOGNITION</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Awards</span> &<br />
              Industry Recognition
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commitment to excellence and innovation recognized by industry leaders worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            <div className="card-hover-effect h-full" data-testid="award-best-software">
              <div className="stat-card-glass bg-gradient-to-br from-yellow-50/80 to-amber-50/80 dark:from-yellow-900/20 dark:to-amber-900/20 backdrop-blur-lg rounded-3xl p-8 border border-yellow-200/30 dark:border-yellow-800/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center group h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform animate-float-rotate">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">Best Software Development Company</span>
                </h3>
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-full border border-yellow-200/30 dark:border-yellow-800/30">
                    <Star className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">Tech Excellence Awards 2023</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  Recognized for outstanding software development services and exceptional client satisfaction rates
                </p>
              </div>
            </div>

            <div className="card-hover-effect h-full" data-testid="award-innovation">
              <div className="stat-card-glass bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-lg rounded-3xl p-8 border border-blue-200/30 dark:border-blue-800/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center group h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform animate-float-rotate">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Innovation Leader</span>
                </h3>
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full border border-blue-200/30 dark:border-blue-800/30">
                    <Rocket className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Digital Innovation Summit 2023</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  Awarded for pioneering AI and machine learning solutions that transform business operations
                </p>
              </div>
            </div>

            <div className="card-hover-effect h-full" data-testid="award-mobile">
              <div className="stat-card-glass bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-lg rounded-3xl p-8 border border-green-200/30 dark:border-green-800/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center group h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform animate-float-rotate">
                  <Code2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Top Mobile App Developer</span>
                </h3>
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full border border-green-200/30 dark:border-green-800/30">
                    <Award className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-700 dark:text-green-300">Mobile World Congress 2022</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                  Excellence in mobile application development and creating exceptional user experiences
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
