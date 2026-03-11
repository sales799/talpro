import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Zap, 
  UserCheck, 
  Settings, 
  BarChart3, 
  CheckCircle, 
  Video,
  FileText,
  Users,
  Clock,
  Target,
  ArrowRight,
  TrendingUp,
  Award,
  Star,
  Rocket,
  Building2,
  Heart,
  Shield,
  Trophy,
  Timer,
  ChevronRight,
  Brain,
  Sparkles,
  Flame
} from 'lucide-react';

export default function HowWeDiffer() {
  return (
    <div className="pt-16">
      {/* Dynamic Gradient Hero Section */}
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
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">HOW WE DIFFER</span>
                The TalPro Advantage
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight" data-testid="page-title">
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Stop</span><br />
                Hiring<br />
                <span className="bg-gradient-to-r from-teal-300 to-green-400 bg-clip-text text-transparent animate-gradient-shift">Nightmares</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                While others make you wait months for average developers, we deliver 
                <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent font-bold"> vetted experts in days</span>.
                Experience the difference that sets industry leaders apart.
              </p>
              
              {/* Animated Differentiation Stats */}
              <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto lg:mx-0">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-speed">
                  <div className="flex items-center justify-center mb-2">
                    <Zap className="w-5 h-5 text-green-400 animate-pulse-glow" />
                  </div>
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">3-5 days</div>
                  <div className="text-xs text-white/70">Avg. Hire Time</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-success">
                  <div className="flex items-center justify-center mb-2">
                    <Trophy className="w-5 h-5 text-green-400 animate-pulse-glow" />
                  </div>
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">98%</div>
                  <div className="text-xs text-white/70">Success Rate</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-hassle">
                  <div className="flex items-center justify-center mb-2">
                    <Shield className="w-5 h-5 text-green-400 animate-pulse-glow" />
                  </div>
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">Zero</div>
                  <div className="text-xs text-white/70">Admin Hassle</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/contact">
                  <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-get-started">
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started Today
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </Link>
                <Link href="/case-studies">
                  <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105" data-testid="button-see-results">
                    See Real Results
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10 group hover:bg-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform animate-float-rotate">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-lg font-bold mb-2">AI-Powered</div>
                    <div className="text-sm text-white/70">Smart Matching</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10 group hover:bg-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform animate-float-rotate">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-lg font-bold mb-2">Pre-Vetted</div>
                    <div className="text-sm text-white/70">Elite Talent</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10 group hover:bg-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform animate-float-rotate">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-lg font-bold mb-2">Instant</div>
                    <div className="text-sm text-white/70">Deployment</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10 group hover:bg-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform animate-float-rotate">
                      <Flame className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-lg font-bold mb-2">24/7</div>
                    <div className="text-sm text-white/70">Support</div>
                  </div>
                </div>
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">Active Now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Comparison Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-3xl animate-pulse-glow"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 rounded-full mb-6">
              <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">HONEST COMPARISON</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">Your Current Hiring</span><br />
              <span className="text-foreground">Reality vs. TalPro</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              See the dramatic difference between traditional agencies and our modern approach. 
              The choice is clear when you compare side by side.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Traditional Agencies - The Problem */}
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float-rotate">
                  <span className="text-3xl">😤</span>
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-2">Traditional Agencies</h3>
                <p className="text-muted-foreground">The old, broken way of hiring</p>
              </div>
              
              <div className="space-y-6">
                <div className="group relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="stat-card-glass bg-gradient-to-br from-red-50/80 to-orange-50/80 dark:from-red-900/20 dark:to-orange-900/20 backdrop-blur-lg rounded-2xl p-6 border border-red-200/30 dark:border-red-800/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative" data-testid="comparison-traditional-time">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300">
                        <Clock className="w-8 h-8 text-white animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-red-600 mb-2">3-6 months</div>
                        <p className="text-muted-foreground leading-relaxed">Endless waiting to find "the right fit" - spoiler alert: they're often not the right fit at all</p>
                        <div className="w-full h-2 bg-red-100 dark:bg-red-900/30 rounded-full mt-4 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full w-[20%] animate-progress-pulse"></div>
                        </div>
                        <div className="text-xs text-red-600 font-medium mt-2">20% Success Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="stat-card-glass bg-gradient-to-br from-red-50/80 to-orange-50/80 dark:from-red-900/20 dark:to-orange-900/20 backdrop-blur-lg rounded-2xl p-6 border border-red-200/30 dark:border-red-800/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative" data-testid="comparison-traditional-volume">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300">
                        <FileText className="w-8 h-8 text-white animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-red-600 mb-2">50+ resumes</div>
                        <p className="text-muted-foreground leading-relaxed">Random candidates who "might work" - forcing you to waste time on interviews that go nowhere</p>
                        <div className="w-full h-2 bg-red-100 dark:bg-red-900/30 rounded-full mt-4 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full w-[15%] animate-progress-pulse"></div>
                        </div>
                        <div className="text-xs text-red-600 font-medium mt-2">15% Quality Match</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="stat-card-glass bg-gradient-to-br from-red-50/80 to-orange-50/80 dark:from-red-900/20 dark:to-orange-900/20 backdrop-blur-lg rounded-2xl p-6 border border-red-200/30 dark:border-red-800/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative" data-testid="comparison-traditional-paperwork">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300">
                        <Settings className="w-8 h-8 text-white animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-red-600 mb-2">Paperwork hell</div>
                        <p className="text-muted-foreground leading-relaxed">Drowning in HR compliance, payroll setup, legal contracts, and administrative nightmares</p>
                        <div className="w-full h-2 bg-red-100 dark:bg-red-900/30 rounded-full mt-4 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full w-[90%] animate-progress-pulse"></div>
                        </div>
                        <div className="text-xs text-red-600 font-medium mt-2">90% Admin Overhead</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="stat-card-glass bg-gradient-to-br from-red-50/80 to-orange-50/80 dark:from-red-900/20 dark:to-orange-900/20 backdrop-blur-lg rounded-2xl p-6 border border-red-200/30 dark:border-red-800/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative" data-testid="comparison-traditional-hope">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300">
                        <Target className="w-8 h-8 text-white animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-red-600 mb-2">Pray & hope</div>
                        <p className="text-muted-foreground leading-relaxed">Cross your fingers they actually know what they claimed on their resume - usually they don't</p>
                        <div className="w-full h-2 bg-red-100 dark:bg-red-900/30 rounded-full mt-4 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full w-[30%] animate-progress-pulse"></div>
                        </div>
                        <div className="text-xs text-red-600 font-medium mt-2">30% Skills Accuracy</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TalPro Solution */}
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float-rotate">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent mb-2">The TalPro Way</h3>
                <p className="text-muted-foreground">Modern, intelligent talent solutions</p>
              </div>
              
              <div className="space-y-6">
                <div className="group relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-teal-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="stat-card-glass bg-gradient-to-br from-green-50/80 to-teal-50/80 dark:from-green-900/20 dark:to-teal-900/20 backdrop-blur-lg rounded-2xl p-6 border border-green-200/30 dark:border-green-800/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative" data-testid="comparison-talpro-speed">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300">
                        <Zap className="w-8 h-8 text-white animate-pulse-glow" />
                      </div>
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-green-600 mb-2">3-5 days</div>
                        <p className="text-foreground leading-relaxed font-medium">AI finds perfect matches from our pre-vetted talent pool - qualified developers ready to start immediately</p>
                        <div className="w-full h-2 bg-green-100 dark:bg-green-900/30 rounded-full mt-4 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-teal-600 rounded-full w-[98%] animate-progress-pulse"></div>
                        </div>
                        <div className="text-xs text-green-600 font-bold mt-2">98% Success Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-teal-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="stat-card-glass bg-gradient-to-br from-green-50/80 to-teal-50/80 dark:from-green-900/20 dark:to-teal-900/20 backdrop-blur-lg rounded-2xl p-6 border border-green-200/30 dark:border-green-800/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative" data-testid="comparison-talpro-quality">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300">
                        <UserCheck className="w-8 h-8 text-white animate-pulse-glow" />
                      </div>
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-green-600 mb-2">3-5 candidates</div>
                        <p className="text-foreground leading-relaxed font-medium">All pre-screened, tested, and ready to start Monday - every candidate is interview-ready and project-ready</p>
                        <div className="w-full h-2 bg-green-100 dark:bg-green-900/30 rounded-full mt-4 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-teal-600 rounded-full w-[95%] animate-progress-pulse"></div>
                        </div>
                        <div className="text-xs text-green-600 font-bold mt-2">95% Quality Match</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-teal-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="stat-card-glass bg-gradient-to-br from-green-50/80 to-teal-50/80 dark:from-green-900/20 dark:to-teal-900/20 backdrop-blur-lg rounded-2xl p-6 border border-green-200/30 dark:border-green-800/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative" data-testid="comparison-talpro-simplicity">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300">
                        <Shield className="w-8 h-8 text-white animate-pulse-glow" />
                      </div>
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-green-600 mb-2">Zero paperwork</div>
                        <p className="text-foreground leading-relaxed font-medium">We handle ALL compliance, payroll, and legal requirements - you focus on building, we handle everything else</p>
                        <div className="w-full h-2 bg-green-100 dark:bg-green-900/30 rounded-full mt-4 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-teal-600 rounded-full w-[100%] animate-progress-pulse"></div>
                        </div>
                        <div className="text-xs text-green-600 font-bold mt-2">0% Admin Overhead</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-teal-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="stat-card-glass bg-gradient-to-br from-green-50/80 to-teal-50/80 dark:from-green-900/20 dark:to-teal-900/20 backdrop-blur-lg rounded-2xl p-6 border border-green-200/30 dark:border-green-800/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative" data-testid="comparison-talpro-guarantee">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300">
                        <Award className="w-8 h-8 text-white animate-pulse-glow" />
                      </div>
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-green-600 mb-2">Guaranteed skills</div>
                        <p className="text-foreground leading-relaxed font-medium">Every developer passes our rigorous technical assessment - no more surprises, just proven expertise</p>
                        <div className="w-full h-2 bg-green-100 dark:bg-green-900/30 rounded-full mt-4 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-teal-600 rounded-full w-[100%] animate-progress-pulse"></div>
                        </div>
                        <div className="text-xs text-green-600 font-bold mt-2">100% Skills Verified</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Comparison Summary */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950/50 dark:to-teal-950/50 rounded-3xl p-8 md:p-12 backdrop-blur border border-blue-200/50 dark:border-blue-800/20">
              <h3 className="text-3xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">The Numbers Don't Lie</span>
              </h3>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">15x</div>
                  <div className="text-muted-foreground">Faster hiring process</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
                  <div className="text-muted-foreground">First-match success rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">0</div>
                  <div className="text-muted-foreground">Administrative headaches</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics & Proof Points */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950/50 dark:to-teal-950/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-2xl animate-pulse-glow"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-teal-400 to-green-500 rounded-full blur-3xl animate-pulse-glow"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">PROVEN RESULTS</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">Real Results from</span><br />
              <span className="text-foreground">Real Clients</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Here's what happens when you stop wasting time with traditional hiring and 
              experience the TalPro difference. These aren't just testimonials - they're transformations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {/* Fintech Success Story */}
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <Card className="card-hover-effect stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-green-200/50 dark:border-green-800/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden" data-testid="success-story-fintech">
                <CardContent className="p-8">
                  <div className="relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-full blur-2xl opacity-20"></div>
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 animate-float-rotate">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white animate-pulse-glow" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Fintech</span><br />
                    <span className="text-foreground">Startup</span>
                  </h3>
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/50 dark:to-teal-950/50 rounded-xl p-4 mb-6 border border-green-200/30 dark:border-green-800/20">
                    <p className="text-foreground italic leading-relaxed">
                      "Needed 5 React developers for a critical product launch. TalPro had them working in 4 days. 
                      Our product launched on time and we closed our Series A."
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Time Saved</span>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-green-600">3 months</div>
                        <Clock className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    <div className="w-full h-3 bg-green-100 dark:bg-green-900/30 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-teal-600 rounded-full w-[95%] animate-progress-pulse"></div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Speed: 15x Faster Than Traditional</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enterprise Success Story */}
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <Card className="card-hover-effect stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-blue-200/50 dark:border-blue-800/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden" data-testid="success-story-enterprise">
                <CardContent className="p-8">
                  <div className="relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20"></div>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 animate-float-rotate">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-white animate-pulse-glow" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Enterprise</span><br />
                    <span className="text-foreground">Corp</span>
                  </h3>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-xl p-4 mb-6 border border-blue-200/30 dark:border-blue-800/20">
                    <p className="text-foreground italic leading-relaxed">
                      "Replaced our entire offshore team disaster. TalPro's developers actually understood our 
                      business logic and fixed 6 months of bad code in 3 weeks."
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Project Value</span>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-blue-600">$2M</div>
                        <Building2 className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="w-full h-3 bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-[100%] animate-progress-pulse"></div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Recovery: Project Saved from Failure</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Scale-up Success Story */}
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <Card className="card-hover-effect stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-purple-200/50 dark:border-purple-800/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden" data-testid="success-story-scaleup">
                <CardContent className="p-8">
                  <div className="relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-2xl opacity-20"></div>
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 animate-float-rotate">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white animate-pulse-glow" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Scale-up</span><br />
                    <span className="text-foreground">Success</span>
                  </h3>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 rounded-xl p-4 mb-6 border border-purple-200/30 dark:border-purple-800/20">
                    <p className="text-foreground italic leading-relaxed">
                      "Needed to 10x our engineering team fast. TalPro delivered 15 senior developers in 2 weeks. 
                      All still with us after 8 months."
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Retention Rate</span>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-purple-600">98%</div>
                        <Users className="w-4 h-4 text-purple-600" />
                      </div>
                    </div>
                    <div className="w-full h-3 bg-purple-100 dark:bg-purple-900/30 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full w-[98%] animate-progress-pulse"></div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Growth: 10x Team Scaling Success</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Animated Statistics Summary */}
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="group text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 animate-float-rotate">
                <Timer className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">15x</div>
              <div className="text-muted-foreground">Faster Hiring</div>
            </div>
            <div className="group text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 animate-float-rotate">
                <Award className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div className="group text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 animate-float-rotate">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">$5M+</div>
              <div className="text-muted-foreground">Projects Saved</div>
            </div>
            <div className="group text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 animate-float-rotate">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-red-600 mb-2">97%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Bottom Line - Enhanced Value Proposition */}
      <section className="py-24 bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-3xl animate-pulse-glow"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full mb-6">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">THE BOTTOM LINE</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">You're Paying for Talent</span><br />
              <span className="text-foreground">Anyway</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Why settle for mediocre results when you could have exceptional ones? 
              The investment is the same - the outcomes are dramatically different.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold mb-8">
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">What You Actually Get</span><br />
                <span className="text-foreground">With TalPro:</span>
              </h3>
              <div className="space-y-6">
                <div className="group relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <Card className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-green-200/50 dark:border-green-800/20 shadow-lg hover:shadow-xl transition-all duration-300 relative" data-testid="benefit-developers">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300">
                          <CheckCircle className="w-6 h-6 text-white animate-pulse-glow" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground mb-1">Developers who actually code</div>
                          <div className="text-sm text-muted-foreground">(Not just talk about coding)</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="group relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <Card className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-blue-200/50 dark:border-blue-800/20 shadow-lg hover:shadow-xl transition-all duration-300 relative" data-testid="benefit-paperwork">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300">
                          <Shield className="w-6 h-6 text-white animate-pulse-glow" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground mb-1">Zero time wasted on paperwork</div>
                          <div className="text-sm text-muted-foreground">We handle all compliance and admin</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="group relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <Card className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-purple-200/50 dark:border-purple-800/20 shadow-lg hover:shadow-xl transition-all duration-300 relative" data-testid="benefit-speed">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300">
                          <Zap className="w-6 h-6 text-white animate-pulse-glow" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground mb-1">Start getting value in days</div>
                          <div className="text-sm text-muted-foreground">Not months of waiting and hoping</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="group relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <Card className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-green-200/50 dark:border-green-800/20 shadow-lg hover:shadow-xl transition-all duration-300 relative" data-testid="benefit-scaling">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300">
                          <TrendingUp className="w-6 h-6 text-white animate-pulse-glow" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground mb-1">Scale up or down without drama</div>
                          <div className="text-sm text-muted-foreground">Flexible teams that adapt with you</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="group relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <Card className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-blue-200/50 dark:border-blue-800/20 shadow-lg hover:shadow-xl transition-all duration-300 relative" data-testid="benefit-peace">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300">
                          <Heart className="w-6 h-6 text-white animate-pulse-glow" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground mb-1">Sleep better knowing your tech</div>
                          <div className="text-sm text-muted-foreground">Is in expert hands 24/7</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="group relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-all duration-500"></div>
                <Card className="stat-card-glass bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg border border-green-200/50 dark:border-green-800/20 shadow-2xl relative overflow-hidden" data-testid="pricing-highlight">
                  <CardContent className="p-12">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full blur-2xl"></div>
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float-rotate">
                        <span className="text-3xl font-bold text-white">$0</span>
                      </div>
                      <h4 className="text-3xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Setup Fees</span>
                      </h4>
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        Same rates as other agencies, but you actually get what you pay for - 
                        and more importantly, when you need it.
                      </p>
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50 rounded-xl p-6 border border-green-200/30 dark:border-green-800/20">
                        <div className="text-2xl font-bold text-green-600 mb-2">ROI Guarantee</div>
                        <div className="text-sm text-muted-foreground">See measurable results in the first week or we'll make it right</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Enhanced with Modern Design */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-teal-500/40"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px, 40px 40px'
        }}></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-green-400/30 to-blue-500/30 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-400/30 to-pink-500/30 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-teal-400 rounded-full animate-pulse-glow"></div>
            <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent font-bold animate-gradient-shift">READY TO START?</span>
            No More Delays
          </div>
          
          <h2 className="text-5xl sm:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Stop Wasting Time</span><br />
            With Bad Hires
          </h2>
          
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-xl text-white/90 mb-6 leading-relaxed">
              Your next project deadline is coming. Your current team is overwhelmed. 
              You know you need help, but you're tired of rolling the dice with agencies.
            </p>
            <p className="text-lg text-white/80 font-medium">
              Let's get you the developers you actually need. This week.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link href="/contact">
              <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105" data-testid="button-get-developers">
                <span className="relative z-10 flex items-center gap-3">
                  <Rocket className="w-6 h-6" />
                  Get Developers This Week
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Link>
            <Link href="/contact">
              <button className="group relative inline-flex items-center justify-center px-10 py-5 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 shadow-xl" data-testid="button-schedule-call">
                <span className="flex items-center gap-3">
                  <Video className="w-5 h-5" />
                  Schedule 15-Min Call
                </span>
              </button>
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-green-400 animate-pulse-glow" />
              </div>
              <div className="text-sm font-medium text-white/90">No Contracts</div>
              <div className="text-xs text-white/70">Flexible terms</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center justify-center mb-2">
                <Shield className="w-5 h-5 text-green-400 animate-pulse-glow" />
              </div>
              <div className="text-sm font-medium text-white/90">No Commitments</div>
              <div className="text-xs text-white/70">Risk-free trial</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-5 h-5 text-green-400 animate-pulse-glow" />
              </div>
              <div className="text-sm font-medium text-white/90">Just Results</div>
              <div className="text-xs text-white/70">Faster & better</div>
            </div>
          </div>
          
          <p className="text-sm text-white/60 italic">
            "The best time to hire great developers was yesterday. The second best time is now."
          </p>
        </div>
      </section>
    </div>
  );
}