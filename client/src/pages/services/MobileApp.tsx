import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Monitor, Palette, Zap, Shield, Users, Check, ArrowRight, Apple, Play, Code, Cpu, Battery, Wifi, Globe, Settings, Target, TrendingUp, Award, Star, Rocket, Building2, Heart, Download, Clock, Database, Cloud, Lock, Eye, Layers, BarChart, Search, Camera, Map, Compass, CreditCard, Bell, Calendar, MessageCircle, Video } from 'lucide-react';

export default function MobileApp() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
                <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full animate-pulse-glow"></div>
                <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">MOBILE</span>
                App Development Excellence
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Mobile</span><br />
                Apps That<br />
                <span className="bg-gradient-to-r from-blue-300 to-pink-400 bg-clip-text text-transparent animate-gradient-shift">Users Love</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                High-performing native and cross-platform mobile applications that combine intuitive design, 
                smooth functionality, and business-driven innovation. We create apps that stand out in app stores.
              </p>
              
              {/* Mobile Stats */}
              <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto lg:mx-0">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-apps">
                  <div className="text-2xl font-bold text-pink-400 group-hover:scale-110 transition-transform">150+</div>
                  <div className="text-xs text-white/70">Mobile Apps</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-platforms">
                  <div className="text-2xl font-bold text-pink-400 group-hover:scale-110 transition-transform">3</div>
                  <div className="text-xs text-white/70">Platforms</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-rating">
                  <div className="text-2xl font-bold text-pink-400 group-hover:scale-110 transition-transform">4.8★</div>
                  <div className="text-xs text-white/70">Avg Rating</div>
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
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-blue-400/20 rounded-3xl blur-2xl animate-float-rotate"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                {/* Mobile Device Mockups */}
                <div className="flex justify-center items-end gap-4">
                  <div className="bg-white/90 backdrop-blur rounded-3xl p-2 shadow-2xl animate-float-rotate" style={{ animationDelay: '0s' }}>
                    <div className="w-32 h-56 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl relative overflow-hidden">
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/30 rounded-full"></div>
                      <div className="p-3 space-y-2">
                        <div className="h-2 bg-white/20 rounded"></div>
                        <div className="h-2 bg-white/30 rounded w-3/4"></div>
                        <div className="h-8 bg-white/20 rounded mt-4"></div>
                        <div className="space-y-1">
                          <div className="h-1 bg-white/20 rounded"></div>
                          <div className="h-1 bg-white/20 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur rounded-3xl p-2 shadow-2xl animate-float-rotate" style={{ animationDelay: '1s' }}>
                    <div className="w-36 h-64 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl relative overflow-hidden">
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/30 rounded-full"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-3 bg-white/20 rounded"></div>
                        <div className="h-3 bg-white/30 rounded w-4/5"></div>
                        <div className="h-12 bg-white/20 rounded mt-6"></div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-8 bg-white/20 rounded"></div>
                          <div className="h-8 bg-white/20 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur rounded-3xl p-2 shadow-2xl animate-float-rotate" style={{ animationDelay: '2s' }}>
                    <div className="w-32 h-56 bg-gradient-to-br from-pink-500 to-blue-600 rounded-2xl relative overflow-hidden">
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/30 rounded-full"></div>
                      <div className="p-3 space-y-2">
                        <div className="h-2 bg-white/20 rounded"></div>
                        <div className="h-2 bg-white/30 rounded w-3/4"></div>
                        <div className="h-8 bg-white/20 rounded mt-4"></div>
                        <div className="space-y-1">
                          <div className="h-1 bg-white/20 rounded"></div>
                          <div className="h-1 bg-white/20 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">App Building</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Expertise */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(219, 39, 119, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-blue-200/20 dark:border-blue-800/20">
              <Smartphone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">PLATFORMS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Cross-Platform <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We develop for all major platforms with 15+ years of expertise, ensuring your app reaches 
              every user with optimal performance and native experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* iOS Development Card */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-gradient-to-br from-blue-50/80 to-slate-50/80 dark:from-slate-800/80 dark:to-blue-900/80 backdrop-blur-lg rounded-3xl p-8 border border-blue-200/50 dark:border-blue-700/50 hover:bg-gradient-to-br hover:from-blue-100/90 hover:to-slate-100/90 dark:hover:from-slate-700/90 dark:hover:to-blue-800/90 transition-all duration-500 text-center h-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-slate-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-r from-blue-500/10 to-slate-500/10 rounded-3xl flex items-center justify-center mx-auto animate-float-rotate">
                    <Apple className="w-10 h-10 text-blue-600 dark:text-blue-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-blue-600 transition-colors">
                  iOS Development
                </h3>
                <p className="text-muted-foreground mb-6">
                  Native iOS apps built with Swift and Objective-C, optimized for iPhone and iPad with 
                  seamless App Store deployment.
                </p>
                
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">iOS Expertise</span>
                    <span className="text-blue-600 font-bold">95%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-slate-500 h-3 rounded-full w-[95%] animate-progress-pulse"></div>
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-muted-foreground text-left">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0" />
                    Swift & Objective-C
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0" />
                    iOS SDK Integration
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0" />
                    App Store Optimization
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0" />
                    Push Notifications
                  </li>
                </ul>
              </div>
            </div>

            {/* Android Development Card */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-slate-800/80 dark:to-green-900/80 backdrop-blur-lg rounded-3xl p-8 border border-green-200/50 dark:border-green-700/50 hover:bg-gradient-to-br hover:from-green-100/90 hover:to-emerald-100/90 dark:hover:from-slate-700/90 dark:hover:to-green-800/90 transition-all duration-500 text-center h-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto animate-float-rotate">
                    <Play className="w-10 h-10 text-green-600 dark:text-green-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-green-600 transition-colors">
                  Android Development
                </h3>
                <p className="text-muted-foreground mb-6">
                  High-performance Android applications using Kotlin and Java, designed for the diverse 
                  Android ecosystem with Material Design.
                </p>
                
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Android Expertise</span>
                    <span className="text-green-600 font-bold">92%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full w-[92%] animate-progress-pulse"></div>
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-muted-foreground text-left">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    Kotlin & Java
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    Material Design
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    Google Play Store
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    Firebase Integration
                  </li>
                </ul>
              </div>
            </div>

            {/* Cross-Platform Card */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-slate-800/80 dark:to-purple-900/80 backdrop-blur-lg rounded-3xl p-8 border border-purple-200/50 dark:border-purple-700/50 hover:bg-gradient-to-br hover:from-purple-100/90 hover:to-pink-100/90 dark:hover:from-slate-700/90 dark:hover:to-purple-800/90 transition-all duration-500 text-center h-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl flex items-center justify-center mx-auto animate-float-rotate">
                    <Monitor className="w-10 h-10 text-purple-600 dark:text-purple-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-purple-600 transition-colors">
                  Cross-Platform
                </h3>
                <p className="text-muted-foreground mb-6">
                  Cost-effective solutions using React Native and Flutter that deliver native performance 
                  across both platforms with shared codebase.
                </p>
                
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Cross-Platform</span>
                    <span className="text-purple-600 font-bold">88%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full w-[88%] animate-progress-pulse"></div>
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-muted-foreground text-left">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0" />
                    React Native
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0" />
                    Flutter Framework
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0" />
                    Code Reusability
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0" />
                    Hybrid Solutions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Development Process */}
      <section className="py-20 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.05) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-blue-200/20 dark:border-blue-800/20">
              <Settings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">PROCESS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Our Mobile App <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Development Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven methodology that ensures successful app delivery from concept to app store launch with continuous user feedback.
            </p>
          </div>

          {/* Process Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-20"></div>
            
            <div className="space-y-16">
              {/* Step 1 */}
              <div className="relative flex items-center">
                <div className="lg:w-1/2 lg:pr-8">
                  <div className="journey-card-wrapper">
                    <div className="stat-card-glass journey-card-bg bg-gradient-to-br from-blue-50/80 to-slate-50/80 dark:from-slate-800/80 dark:to-blue-900/80 backdrop-blur-lg rounded-3xl p-8 border border-blue-200/50 dark:border-blue-700/50 transition-all duration-500">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-slate-500 rounded-2xl flex items-center justify-center animate-float-rotate">
                          <Target className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-1">PHASE 01</div>
                          <h3 className="text-2xl font-bold text-foreground">Strategy & Planning</h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6">
                        Define app objectives, target audience, platform selection, and technical requirements with market research and competitive analysis.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-muted-foreground">Market Research</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-muted-foreground">User Personas</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-muted-foreground">Technical Roadmap</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-muted-foreground">Platform Strategy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-slate-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg z-10 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div className="lg:w-1/2 lg:pl-8"></div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-center">
                <div className="lg:w-1/2 lg:pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg z-10 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div className="lg:w-1/2 lg:pl-8">
                  <div className="journey-card-wrapper">
                    <div className="stat-card-glass journey-card-bg bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-slate-800/80 dark:to-purple-900/80 backdrop-blur-lg rounded-3xl p-8 border border-purple-200/50 dark:border-purple-700/50 transition-all duration-500">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-float-rotate">
                          <Palette className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-1">PHASE 02</div>
                          <h3 className="text-2xl font-bold text-foreground">Design & Prototype</h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6">
                        Create wireframes, UI/UX designs, and interactive prototypes for user validation with modern design principles and accessibility.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-muted-foreground">Wireframing</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-muted-foreground">UI/UX Design</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-muted-foreground">Interactive Prototypes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-muted-foreground">User Testing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-center">
                <div className="lg:w-1/2 lg:pr-8">
                  <div className="journey-card-wrapper">
                    <div className="stat-card-glass journey-card-bg bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-slate-800/80 dark:to-green-900/80 backdrop-blur-lg rounded-3xl p-8 border border-green-200/50 dark:border-green-700/50 transition-all duration-500">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center animate-float-rotate">
                          <Code className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-green-600 dark:text-green-400 font-semibold mb-1">PHASE 03</div>
                          <h3 className="text-2xl font-bold text-foreground">Development & Testing</h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6">
                        Agile development sprints with continuous testing, code reviews, and quality assurance across multiple devices and scenarios.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-muted-foreground">Agile Sprints</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-muted-foreground">Code Reviews</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-muted-foreground">Device Testing</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-muted-foreground">Performance QA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg z-10 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div className="lg:w-1/2 lg:pl-8"></div>
              </div>

              {/* Step 4 */}
              <div className="relative flex items-center">
                <div className="lg:w-1/2 lg:pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg z-10 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div className="lg:w-1/2 lg:pl-8">
                  <div className="journey-card-wrapper">
                    <div className="stat-card-glass journey-card-bg bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-slate-800/80 dark:to-orange-900/80 backdrop-blur-lg rounded-3xl p-8 border border-orange-200/50 dark:border-orange-700/50 transition-all duration-500">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center animate-float-rotate">
                          <Rocket className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-orange-600 dark:text-orange-400 font-semibold mb-1">PHASE 04</div>
                          <h3 className="text-2xl font-bold text-foreground">Launch & Support</h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6">
                        App store deployment, launch marketing support, ongoing maintenance, updates, and performance monitoring.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-muted-foreground">Store Deployment</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-muted-foreground">Launch Support</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-muted-foreground">Monitoring</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-muted-foreground">Maintenance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Technologies & Features */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-blue-200/20 dark:border-blue-800/20">
              <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">TECHNOLOGIES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Cutting-Edge <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Mobile Tech Stack</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We leverage the latest mobile technologies and frameworks to deliver high-performance, 
              feature-rich applications with seamless user experiences.
            </p>
          </div>

          {/* Core Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* UI/UX Excellence */}
            <div className="card-hover-effect group" data-testid="feature-card-ui-ux">
              <div className="stat-card-glass bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-slate-800/80 dark:to-blue-900/80 backdrop-blur-lg rounded-3xl p-8 border border-blue-200/50 dark:border-blue-700/50 hover:bg-gradient-to-br hover:from-blue-100/90 hover:to-indigo-100/90 dark:hover:from-slate-700/90 dark:hover:to-blue-800/90 transition-all duration-500 text-center h-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl flex items-center justify-center mx-auto animate-float-rotate">
                    <Eye className="w-10 h-10 text-blue-600 dark:text-blue-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-blue-600 transition-colors">
                  UI/UX Excellence
                </h3>
                <p className="text-muted-foreground mb-6">
                  Intuitive interfaces with smooth animations, accessibility features, and platform-specific design guidelines.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-700/50 rounded-xl">
                    <span className="flex items-center gap-2">
                      <Palette className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">Design Systems</span>
                    </span>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-700/50 rounded-xl">
                    <span className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">Responsive Design</span>
                    </span>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Optimization */}
            <div className="card-hover-effect group" data-testid="feature-card-performance">
              <div className="stat-card-glass bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-slate-800/80 dark:to-green-900/80 backdrop-blur-lg rounded-3xl p-8 border border-green-200/50 dark:border-green-700/50 hover:bg-gradient-to-br hover:from-green-100/90 hover:to-emerald-100/90 dark:hover:from-slate-700/90 dark:hover:to-green-800/90 transition-all duration-500 text-center h-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto animate-float-rotate">
                    <Zap className="w-10 h-10 text-green-600 dark:text-green-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-green-600 transition-colors">
                  Performance Optimization
                </h3>
                <p className="text-muted-foreground mb-6">
                  Optimized code, efficient algorithms, and smart caching for lightning-fast load times and smooth interactions.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-700/50 rounded-xl">
                    <span className="flex items-center gap-2">
                      <Battery className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Battery Efficiency</span>
                    </span>
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-700/50 rounded-xl">
                    <span className="flex items-center gap-2">
                      <BarChart className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Memory Management</span>
                    </span>
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security & Privacy */}
            <div className="card-hover-effect group" data-testid="feature-card-security">
              <div className="stat-card-glass bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-slate-800/80 dark:to-purple-900/80 backdrop-blur-lg rounded-3xl p-8 border border-purple-200/50 dark:border-purple-700/50 hover:bg-gradient-to-br hover:from-purple-100/90 hover:to-pink-100/90 dark:hover:from-slate-700/90 dark:hover:to-purple-800/90 transition-all duration-500 text-center h-full">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl flex items-center justify-center mx-auto animate-float-rotate">
                    <Shield className="w-10 h-10 text-purple-600 dark:text-purple-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-purple-600 transition-colors">
                  Security & Privacy
                </h3>
                <p className="text-muted-foreground mb-6">
                  Enterprise-grade security with data encryption, secure authentication, and compliance with privacy regulations.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-700/50 rounded-xl">
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium">Data Encryption</span>
                    </span>
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-700/50 rounded-xl">
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium">Secure Auth</span>
                    </span>
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Stack Showcase */}
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              Mobile Development Tech Stack
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {[
                { icon: Smartphone, name: 'Native iOS', color: 'blue' },
                { icon: Play, name: 'Android', color: 'green' },
                { icon: Monitor, name: 'React Native', color: 'cyan' },
                { icon: Code, name: 'Flutter', color: 'blue' },
                { icon: Database, name: 'Backend APIs', color: 'purple' },
                { icon: Cloud, name: 'Cloud Services', color: 'indigo' },
                { icon: Wifi, name: 'Real-time', color: 'green' },
                { icon: Lock, name: 'Security', color: 'red' }
              ].map((tech, index) => (
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 bg-gradient-to-r from-${tech.color}-500/10 to-${tech.color}-600/10 rounded-2xl flex items-center justify-center mx-auto mb-3 hover:scale-110 transition-transform duration-300 animate-float-rotate`} style={{ animationDelay: `${index * 0.2}s` }}>
                    <tech.icon className={`w-8 h-8 text-${tech.color}-600 dark:text-${tech.color}-400 group-hover:scale-110 transition-transform`} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* App Portfolio Showcase */}
      <section className="py-20 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(219, 39, 119, 0.05) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-pink-500/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-blue-200/20 dark:border-blue-800/20">
              <Award className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              <span className="bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent font-bold">PORTFOLIO</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Mobile App <span className="bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">Success Stories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our portfolio of successful mobile applications across various industries, 
              from startups to enterprise solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* E-commerce App */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-slate-800/80 dark:to-blue-900/80 backdrop-blur-lg rounded-3xl overflow-hidden border border-blue-200/50 dark:border-blue-700/50 hover:border-blue-300/70 dark:hover:border-blue-600/70 transition-all duration-500">
                {/* App Preview */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden">
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 2px, transparent 2px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                  <div className="absolute inset-4 bg-white/10 backdrop-blur rounded-2xl border border-white/20 flex flex-col">
                    <div className="flex-1 p-4 space-y-2">
                      <div className="h-3 bg-white/30 rounded w-3/4"></div>
                      <div className="h-2 bg-white/20 rounded w-1/2"></div>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="h-16 bg-white/20 rounded-lg"></div>
                        <div className="h-16 bg-white/20 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full border border-white/30 flex items-center justify-center">
                      <Apple className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full border border-white/30 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-blue-600 transition-colors">ShopEasy Mobile</h3>
                      <p className="text-sm text-muted-foreground">E-commerce Platform</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Comprehensive mobile commerce solution with AR try-on, one-click checkout, and personalized recommendations.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">4.9★</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">500K+</div>
                      <div className="text-xs text-muted-foreground">Downloads</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">40%</div>
                      <div className="text-xs text-muted-foreground">Sales Boost</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">React Native</span>
                    <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">AR Kit</span>
                    <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">Stripe</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fitness App */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-slate-800/80 dark:to-green-900/80 backdrop-blur-lg rounded-3xl overflow-hidden border border-green-200/50 dark:border-green-700/50 hover:border-green-300/70 dark:hover:border-green-600/70 transition-all duration-500">
                {/* App Preview */}
                <div className="relative h-48 bg-gradient-to-br from-green-500 to-emerald-600 overflow-hidden">
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 2px, transparent 2px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                  <div className="absolute inset-4 bg-white/10 backdrop-blur rounded-2xl border border-white/20 flex flex-col">
                    <div className="flex-1 p-4 space-y-2">
                      <div className="h-3 bg-white/30 rounded w-2/3"></div>
                      <div className="h-2 bg-white/20 rounded w-1/3"></div>
                      <div className="h-8 bg-white/20 rounded-full mt-4"></div>
                      <div className="flex gap-2 mt-2">
                        <div className="flex-1 h-12 bg-white/20 rounded-lg"></div>
                        <div className="flex-1 h-12 bg-white/20 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full border border-white/30 flex items-center justify-center">
                      <Apple className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full border border-white/30 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-green-600 transition-colors">FitTracker Pro</h3>
                      <p className="text-sm text-muted-foreground">Health & Fitness</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">
                    AI-powered fitness companion with workout tracking, nutrition planning, and social challenges.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">4.8★</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">1M+</div>
                      <div className="text-xs text-muted-foreground">Users</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">85%</div>
                      <div className="text-xs text-muted-foreground">Retention</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">Swift</span>
                    <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">HealthKit</span>
                    <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">ML Core</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social App */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-slate-800/80 dark:to-purple-900/80 backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-200/50 dark:border-purple-700/50 hover:border-purple-300/70 dark:hover:border-purple-600/70 transition-all duration-500">
                {/* App Preview */}
                <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-600 overflow-hidden">
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 2px, transparent 2px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                  <div className="absolute inset-4 bg-white/10 backdrop-blur rounded-2xl border border-white/20 flex flex-col">
                    <div className="flex-1 p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white/30 rounded-full"></div>
                        <div className="h-2 bg-white/30 rounded w-1/3"></div>
                      </div>
                      <div className="h-16 bg-white/20 rounded-lg mt-2"></div>
                      <div className="flex gap-2 mt-2">
                        <div className="h-6 bg-white/20 rounded w-12"></div>
                        <div className="h-6 bg-white/20 rounded w-12"></div>
                        <div className="h-6 bg-white/20 rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full border border-white/30 flex items-center justify-center">
                      <Apple className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full border border-white/30 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-purple-600 transition-colors">ConnectHub</h3>
                      <p className="text-sm text-muted-foreground">Social Networking</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Next-generation social platform with video sharing, live streaming, and community features.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">4.7★</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">2M+</div>
                      <div className="text-xs text-muted-foreground">Active Users</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">90%</div>
                      <div className="text-xs text-muted-foreground">Engagement</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">Flutter</span>
                    <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">WebRTC</span>
                    <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">Firebase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio CTA */}
          <div className="text-center mt-12">
            <Link href="/case-studies">
              <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-explore-portfolio">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Full Portfolio
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
            <Rocket className="w-4 h-4 text-white" />
            <span className="text-white font-bold">GET STARTED</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Build Your <span className="bg-gradient-to-r from-pink-300 to-blue-300 bg-clip-text text-transparent">Dream Mobile App?</span>
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Let's transform your mobile app idea into a powerful, user-friendly application that drives business growth 
            and delights users across all platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-blue-600 transition-all duration-300 bg-white rounded-2xl hover:bg-white/90 hover:scale-105 shadow-xl" data-testid="button-start-project">
                <span className="flex items-center gap-2">
                  Start Your App Project
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Link>
            <Link href="/case-studies">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105" data-testid="button-view-examples">
                View App Examples
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}