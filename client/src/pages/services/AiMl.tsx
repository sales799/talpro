import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Bot, TrendingUp, Database, Lightbulb, Cog, Check, ArrowRight, Cpu, Network, Zap, Target, Award, Star, Rocket, Building2, Activity, BarChart3, Eye, Layers, Settings, Monitor, Code, Cloud, Lock, GitBranch, Workflow, MessageSquare, Camera, Search, FileText, LineChart, ShieldCheck, Timer, Gauge, Sparkles, Clock, Mail, Phone } from 'lucide-react';

export default function AiMl() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-cyan-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.4) 2px, transparent 2px), radial-gradient(circle at 60% 70%, rgba(147, 51, 234, 0.3) 1px, transparent 1px), radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px, 30px 30px, 40px 40px'
        }}></div>
        {/* Neural Network Background Effect */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="neural-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.4)" className="animate-pulse-glow" />
                <circle cx="150" cy="50" r="2" fill="rgba(255,255,255,0.4)" className="animate-pulse-glow" style={{animationDelay: '1s'}} />
                <circle cx="100" cy="150" r="2" fill="rgba(255,255,255,0.4)" className="animate-pulse-glow" style={{animationDelay: '2s'}} />
                <line x1="50" y1="50" x2="150" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="animate-pulse-glow" />
                <line x1="150" y1="50" x2="100" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="animate-pulse-glow" style={{animationDelay: '0.5s'}} />
                <line x1="50" y1="50" x2="100" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="animate-pulse-glow" style={{animationDelay: '1.5s'}} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural-pattern)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
                <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse-glow"></div>
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-bold animate-gradient-shift">AI/ML</span>
                Intelligence That Powers Tomorrow
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Intelligent</span><br />
                Systems That<br />
                <span className="bg-gradient-to-r from-purple-300 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">Transform</span> Business
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Build advanced AI systems from neural networks to enterprise automation. We create intelligent 
                solutions that process data, predict outcomes, and automate decisions with cutting-edge precision.
              </p>
              
              {/* AI Stats */}
              <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto lg:mx-0">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-ai-models">
                  <div className="text-2xl font-bold text-cyan-400 group-hover:scale-110 transition-transform flex items-center gap-1">
                    <Brain className="w-6 h-6 animate-float-rotate" />
                    50+
                  </div>
                  <div className="text-xs text-white/70">AI Models</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-accuracy">
                  <div className="text-2xl font-bold text-cyan-400 group-hover:scale-110 transition-transform flex items-center gap-1">
                    <Target className="w-6 h-6 animate-float-rotate" />
                    99%
                  </div>
                  <div className="text-xs text-white/70">Accuracy</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-efficiency">
                  <div className="text-2xl font-bold text-cyan-400 group-hover:scale-110 transition-transform flex items-center gap-1">
                    <Zap className="w-6 h-6 animate-float-rotate" />
                    10x
                  </div>
                  <div className="text-xs text-white/70">Efficiency</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/contact">
                  <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-get-consultation">
                    <span className="relative z-10 flex items-center gap-2">
                      Get AI Consultation
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </Link>
                <Link href="/case-studies">
                  <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105" data-testid="button-view-portfolio">
                    View AI Portfolio
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-blue-400/20 rounded-3xl blur-2xl animate-float-rotate"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="AI and machine learning neural networks with data visualization and intelligent systems" 
                  className="rounded-2xl w-full h-auto shadow-2xl"
                />
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">AI Processing</span>
                  </div>
                </div>
                {/* Floating AI Particles */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-cyan-400/30 rounded-full animate-float-rotate"></div>
                <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-purple-400/30 rounded-full animate-float-rotate" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 -left-3 w-2 h-2 bg-blue-400/30 rounded-full animate-float-rotate" style={{animationDelay: '2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Services Overview */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.05) 0%, transparent 70%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-blue-200/20 dark:border-blue-800/20">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-float-rotate" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">AI SERVICES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Comprehensive <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">AI Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From neural network architecture to enterprise automation, we deliver cutting-edge 
              artificial intelligence solutions that redefine business operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Strategy & Consulting */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-500 h-full" data-testid="ai-service-strategy">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl flex items-center justify-center mx-auto animate-float-rotate">
                    <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-blue-600 transition-colors">
                  AI Strategy & Consulting
                </h3>
                <p className="text-muted-foreground mb-6">
                  Strategic AI roadmaps and implementation guidance using advanced neural architectures 
                  and machine learning frameworks tailored to your business objectives.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">AI Readiness</span>
                    <span className="text-blue-600 font-semibold">95%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-[95%] animate-progress-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">ROI Analysis</span>
                    <span className="text-purple-600 font-semibold">92%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full w-[92%] animate-progress-pulse" style={{animationDelay: '0.5s'}}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-blue-500/10 rounded-full border border-blue-200/20 dark:border-blue-800/20">
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Strategic Planning</span>
                  </div>
                  <div className="px-3 py-1 bg-purple-500/10 rounded-full border border-purple-200/20 dark:border-purple-800/20">
                    <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Implementation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chatbots & Virtual Assistants */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:from-purple-500/20 hover:to-cyan-500/20 transition-all duration-500 h-full" data-testid="ai-service-chatbots">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto animate-float-rotate" style={{animationDelay: '0.5s'}}>
                    <Bot className="w-8 h-8 text-purple-600 dark:text-purple-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-purple-600 transition-colors">
                  Conversational AI & Chatbots
                </h3>
                <p className="text-muted-foreground mb-6">
                  Advanced NLP-powered conversational agents with sentiment analysis, 
                  multi-language support, and seamless integration across platforms.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">NLP Accuracy</span>
                    <span className="text-purple-600 font-semibold">98%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full w-[98%] animate-progress-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="text-cyan-600 font-semibold">0.2s</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full w-[96%] animate-progress-pulse" style={{animationDelay: '0.3s'}}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-purple-500/10 rounded-full border border-purple-200/20 dark:border-purple-800/20">
                    <span className="text-xs font-medium text-purple-600 dark:text-purple-400">24/7 Support</span>
                  </div>
                  <div className="px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-200/20 dark:border-cyan-800/20">
                    <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">Multi-lingual</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Predictive Analytics */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-500 h-full" data-testid="ai-service-analytics">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl flex items-center justify-center mx-auto animate-float-rotate" style={{animationDelay: '1s'}}>
                    <TrendingUp className="w-8 h-8 text-cyan-600 dark:text-cyan-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-cyan-600 transition-colors">
                  Predictive Analytics & ML
                </h3>
                <p className="text-muted-foreground mb-6">
                  Deep learning models for forecasting, pattern recognition, and behavioral analysis 
                  using TensorFlow, PyTorch, and custom neural architectures.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Prediction Accuracy</span>
                    <span className="text-cyan-600 font-semibold">94%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full w-[94%] animate-progress-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Data Processing</span>
                    <span className="text-blue-600 font-semibold">Real-time</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-[97%] animate-progress-pulse" style={{animationDelay: '0.7s'}}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-200/20 dark:border-cyan-800/20">
                    <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">Deep Learning</span>
                  </div>
                  <div className="px-3 py-1 bg-blue-500/10 rounded-full border border-blue-200/20 dark:border-blue-800/20">
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Forecasting</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Analytics & Insights */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-gradient-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:from-emerald-500/20 hover:to-blue-500/20 transition-all duration-500 h-full" data-testid="ai-service-data">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl flex items-center justify-center mx-auto animate-float-rotate" style={{animationDelay: '1.5s'}}>
                    <Database className="w-8 h-8 text-emerald-600 dark:text-emerald-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-emerald-600 transition-colors">
                  AI-Powered Data Analytics
                </h3>
                <p className="text-muted-foreground mb-6">
                  Intelligent data processing pipelines with automated feature engineering, 
                  anomaly detection, and real-time visualization dashboards.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Data Processing</span>
                    <span className="text-emerald-600 font-semibold">99.9%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full w-[99%] animate-progress-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Insight Generation</span>
                    <span className="text-blue-600 font-semibold">Automated</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-[93%] animate-progress-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-200/20 dark:border-emerald-800/20">
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Real-time</span>
                  </div>
                  <div className="px-3 py-1 bg-blue-500/10 rounded-full border border-blue-200/20 dark:border-blue-800/20">
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Visualization</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Automation */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-500 h-full" data-testid="ai-service-automation">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl flex items-center justify-center mx-auto animate-float-rotate" style={{animationDelay: '2s'}}>
                    <Cog className="w-8 h-8 text-orange-600 dark:text-orange-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-orange-600 transition-colors">
                  Intelligent Process Automation
                </h3>
                <p className="text-muted-foreground mb-6">
                  RPA with cognitive capabilities, document AI, and workflow optimization 
                  using computer vision and natural language understanding.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Automation Rate</span>
                    <span className="text-orange-600 font-semibold">89%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full w-[89%] animate-progress-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Error Reduction</span>
                    <span className="text-red-600 font-semibold">95%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full w-[95%] animate-progress-pulse" style={{animationDelay: '0.6s'}}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-orange-500/10 rounded-full border border-orange-200/20 dark:border-orange-800/20">
                    <span className="text-xs font-medium text-orange-600 dark:text-orange-400">RPA</span>
                  </div>
                  <div className="px-3 py-1 bg-red-500/10 rounded-full border border-red-200/20 dark:border-red-800/20">
                    <span className="text-xs font-medium text-red-600 dark:text-red-400">Document AI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Generative AI Solutions */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:from-pink-500/20 hover:to-purple-500/20 transition-all duration-500 h-full" data-testid="ai-service-generative">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl flex items-center justify-center mx-auto animate-float-rotate" style={{animationDelay: '2.5s'}}>
                    <Lightbulb className="w-8 h-8 text-pink-600 dark:text-pink-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-pink-600 transition-colors">
                  Generative AI & LLMs
                </h3>
                <p className="text-muted-foreground mb-6">
                  Advanced generative models, custom LLM fine-tuning, and multimodal AI 
                  for content creation, code generation, and creative applications.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Model Performance</span>
                    <span className="text-pink-600 font-semibold">97%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full w-[97%] animate-progress-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Creativity Index</span>
                    <span className="text-purple-600 font-semibold">Advanced</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full w-[91%] animate-progress-pulse" style={{animationDelay: '0.8s'}}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-pink-500/10 rounded-full border border-pink-200/20 dark:border-pink-800/20">
                    <span className="text-xs font-medium text-pink-600 dark:text-pink-400">GPT/LLaMA</span>
                  </div>
                  <div className="px-3 py-1 bg-purple-500/10 rounded-full border border-purple-200/20 dark:border-purple-800/20">
                    <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Fine-tuned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Technologies Stack */}
      <section className="py-20 bg-gradient-to-br from-indigo-950 via-purple-950 to-cyan-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 via-purple-900/50 to-cyan-900/50"></div>
        {/* Animated Neural Network Background */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="tech-neural-pattern" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
                <circle cx="75" cy="75" r="3" fill="rgba(59, 130, 246, 0.6)" className="animate-pulse-glow" />
                <circle cx="225" cy="75" r="3" fill="rgba(147, 51, 234, 0.6)" className="animate-pulse-glow" style={{animationDelay: '1s'}} />
                <circle cx="75" cy="225" r="3" fill="rgba(6, 182, 212, 0.6)" className="animate-pulse-glow" style={{animationDelay: '2s'}} />
                <circle cx="225" cy="225" r="3" fill="rgba(16, 185, 129, 0.6)" className="animate-pulse-glow" style={{animationDelay: '1.5s'}} />
                <circle cx="150" cy="150" r="2" fill="rgba(168, 85, 247, 0.4)" className="animate-pulse-glow" style={{animationDelay: '0.5s'}} />
                <line x1="75" y1="75" x2="225" y2="75" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" className="animate-pulse-glow" />
                <line x1="225" y1="75" x2="225" y2="225" stroke="rgba(147, 51, 234, 0.3)" strokeWidth="1" className="animate-pulse-glow" style={{animationDelay: '0.7s'}} />
                <line x1="225" y1="225" x2="75" y2="225" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" className="animate-pulse-glow" style={{animationDelay: '1.2s'}} />
                <line x1="75" y1="225" x2="75" y2="75" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1" className="animate-pulse-glow" style={{animationDelay: '1.8s'}} />
                <line x1="75" y1="75" x2="150" y2="150" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" className="animate-pulse-glow" style={{animationDelay: '0.3s'}} />
                <line x1="225" y1="75" x2="150" y2="150" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" className="animate-pulse-glow" style={{animationDelay: '0.9s'}} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tech-neural-pattern)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
              <Network className="w-4 h-4 text-cyan-400 animate-float-rotate" />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">TECH STACK</span>
              Neural Architecture Powered
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-300 bg-clip-text text-transparent animate-gradient-shift">Advanced AI</span><br />
              Technology Ecosystem
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              State-of-the-art AI frameworks, neural network architectures, and cloud-native platforms 
              engineered for enterprise-scale machine learning deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* ML Frameworks */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 h-full" data-testid="tech-stack-ml">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto animate-float-rotate">
                    <Brain className="w-8 h-8 text-blue-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-6 group-hover:text-blue-400 transition-colors">
                  ML Frameworks
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse-glow"></div>
                      <span className="text-sm text-white/80">TensorFlow</span>
                    </div>
                    <div className="px-2 py-1 bg-blue-400/20 rounded text-xs text-blue-400 font-medium">
                      Expert
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-glow" style={{animationDelay: '0.5s'}}></div>
                      <span className="text-sm text-white/80">PyTorch</span>
                    </div>
                    <div className="px-2 py-1 bg-purple-400/20 rounded text-xs text-purple-400 font-medium">
                      Expert
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse-glow" style={{animationDelay: '1s'}}></div>
                      <span className="text-sm text-white/80">Scikit-learn</span>
                    </div>
                    <div className="px-2 py-1 bg-cyan-400/20 rounded text-xs text-cyan-400 font-medium">
                      Advanced
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-glow" style={{animationDelay: '1.5s'}}></div>
                      <span className="text-sm text-white/80">Keras/XGBoost</span>
                    </div>
                    <div className="px-2 py-1 bg-green-400/20 rounded text-xs text-green-400 font-medium">
                      Advanced
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cloud AI Services */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 h-full" data-testid="tech-stack-cloud">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto animate-float-rotate" style={{animationDelay: '0.5s'}}>
                    <Cloud className="w-8 h-8 text-purple-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-6 group-hover:text-purple-400 transition-colors">
                  Cloud AI Services
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse-glow"></div>
                      <span className="text-sm text-white/80">AWS SageMaker</span>
                    </div>
                    <div className="px-2 py-1 bg-orange-400/20 rounded text-xs text-orange-400 font-medium">
                      Expert
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse-glow" style={{animationDelay: '0.3s'}}></div>
                      <span className="text-sm text-white/80">Azure AI</span>
                    </div>
                    <div className="px-2 py-1 bg-blue-400/20 rounded text-xs text-blue-400 font-medium">
                      Expert
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-glow" style={{animationDelay: '0.7s'}}></div>
                      <span className="text-sm text-white/80">Google Cloud AI</span>
                    </div>
                    <div className="px-2 py-1 bg-green-400/20 rounded text-xs text-green-400 font-medium">
                      Advanced
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse-glow" style={{animationDelay: '1.2s'}}></div>
                      <span className="text-sm text-white/80">OpenAI APIs</span>
                    </div>
                    <div className="px-2 py-1 bg-pink-400/20 rounded text-xs text-pink-400 font-medium">
                      Expert
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Processing */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 h-full" data-testid="tech-stack-data">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto animate-float-rotate" style={{animationDelay: '1s'}}>
                    <Database className="w-8 h-8 text-cyan-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors">
                  Data Processing
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse-glow"></div>
                      <span className="text-sm text-white/80">Apache Spark</span>
                    </div>
                    <div className="px-2 py-1 bg-red-400/20 rounded text-xs text-red-400 font-medium">
                      Expert
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse-glow" style={{animationDelay: '0.4s'}}></div>
                      <span className="text-sm text-white/80">Pandas</span>
                    </div>
                    <div className="px-2 py-1 bg-yellow-400/20 rounded text-xs text-yellow-400 font-medium">
                      Expert
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse-glow" style={{animationDelay: '0.8s'}}></div>
                      <span className="text-sm text-white/80">NumPy</span>
                    </div>
                    <div className="px-2 py-1 bg-indigo-400/20 rounded text-xs text-indigo-400 font-medium">
                      Expert
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-glow" style={{animationDelay: '1.3s'}}></div>
                      <span className="text-sm text-white/80">Kafka/Dask</span>
                    </div>
                    <div className="px-2 py-1 bg-emerald-400/20 rounded text-xs text-emerald-400 font-medium">
                      Advanced
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Deployment & MLOps */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 h-full" data-testid="tech-stack-deployment">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center mx-auto animate-float-rotate" style={{animationDelay: '1.5s'}}>
                    <Rocket className="w-8 h-8 text-emerald-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-6 group-hover:text-emerald-400 transition-colors">
                  MLOps & Deployment
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse-glow"></div>
                      <span className="text-sm text-white/80">Docker</span>
                    </div>
                    <div className="px-2 py-1 bg-blue-400/20 rounded text-xs text-blue-400 font-medium">
                      Expert
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-glow" style={{animationDelay: '0.6s'}}></div>
                      <span className="text-sm text-white/80">Kubernetes</span>
                    </div>
                    <div className="px-2 py-1 bg-purple-400/20 rounded text-xs text-purple-400 font-medium">
                      Expert
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-glow" style={{animationDelay: '1.1s'}}></div>
                      <span className="text-sm text-white/80">MLflow</span>
                    </div>
                    <div className="px-2 py-1 bg-emerald-400/20 rounded text-xs text-emerald-400 font-medium">
                      Advanced
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse-glow" style={{animationDelay: '1.4s'}}></div>
                      <span className="text-sm text-white/80">Kubeflow</span>
                    </div>
                    <div className="px-2 py-1 bg-teal-400/20 rounded text-xs text-teal-400 font-medium">
                      Advanced
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Flow Visualization */}
          <div className="mt-16 relative">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-white mb-4">AI Data Processing Pipeline</h3>
              <p className="text-white/70">Real-time neural network data flow and processing architecture</p>
            </div>
            <div className="relative bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center group cursor-pointer" data-testid="pipeline-data-ingestion">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mb-3 animate-pulse-glow group-hover:scale-110 transition-transform">
                    <Database className="w-8 h-8 text-blue-400" />
                  </div>
                  <span className="text-sm text-white/80 font-medium">Data Ingestion</span>
                </div>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-4 animate-pulse-glow"></div>
                <div className="flex flex-col items-center group cursor-pointer" data-testid="pipeline-processing">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-3 animate-pulse-glow group-hover:scale-110 transition-transform" style={{animationDelay: '0.5s'}}>
                    <Cpu className="w-8 h-8 text-purple-400" />
                  </div>
                  <span className="text-sm text-white/80 font-medium">Neural Processing</span>
                </div>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 mx-4 animate-pulse-glow" style={{animationDelay: '0.3s'}}></div>
                <div className="flex flex-col items-center group cursor-pointer" data-testid="pipeline-insights">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mb-3 animate-pulse-glow group-hover:scale-110 transition-transform" style={{animationDelay: '1s'}}>
                    <Eye className="w-8 h-8 text-cyan-400" />
                  </div>
                  <span className="text-sm text-white/80 font-medium">AI Insights</span>
                </div>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-4 animate-pulse-glow" style={{animationDelay: '0.7s'}}></div>
                <div className="flex flex-col items-center group cursor-pointer" data-testid="pipeline-deployment">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center mb-3 animate-pulse-glow group-hover:scale-110 transition-transform" style={{animationDelay: '1.5s'}}>
                    <Rocket className="w-8 h-8 text-emerald-400" />
                  </div>
                  <span className="text-sm text-white/80 font-medium">Deployment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Solutions & Applications */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 90%, rgba(6, 182, 212, 0.05) 0%, transparent 60%)`,
        }}></div>
        {/* Neural Network Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="applications-neural" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
                <circle cx="37" cy="37" r="1.5" fill="rgba(59, 130, 246, 0.8)" className="animate-pulse-glow" />
                <circle cx="112" cy="37" r="1.5" fill="rgba(147, 51, 234, 0.8)" className="animate-pulse-glow" style={{animationDelay: '0.8s'}} />
                <circle cx="75" cy="112" r="1.5" fill="rgba(6, 182, 212, 0.8)" className="animate-pulse-glow" style={{animationDelay: '1.2s'}} />
                <line x1="37" y1="37" x2="112" y2="37" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5" className="animate-pulse-glow" />
                <line x1="112" y1="37" x2="75" y2="112" stroke="rgba(147, 51, 234, 0.3)" strokeWidth="0.5" className="animate-pulse-glow" style={{animationDelay: '0.4s'}} />
                <line x1="37" y1="37" x2="75" y2="112" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="0.5" className="animate-pulse-glow" style={{animationDelay: '0.6s'}} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#applications-neural)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-blue-200/20 dark:border-blue-800/20">
              <Rocket className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-float-rotate" />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-bold">AI APPLICATIONS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Intelligent Solutions<br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">Across Industries</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              AI-powered applications that transform business operations with neural network precision, 
              automated decision-making, and predictive intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Healthcare AI */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-500 h-full" data-testid="ai-solution-healthcare">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center animate-float-rotate">
                    <Activity className="w-8 h-8 text-red-600 dark:text-red-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-red-600 transition-colors">
                  Healthcare AI
                </h3>
                <p className="text-muted-foreground mb-6">
                  Medical imaging analysis, diagnostic assistance, drug discovery optimization, 
                  and AI-powered treatment recommendations with 99% accuracy.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Diagnostic Accuracy</span>
                    <span className="text-red-600 font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      99.2%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Processing Speed</span>
                    <span className="text-pink-600 font-semibold flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      5x Faster
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="px-2 py-1 bg-red-500/10 rounded text-xs text-red-600 dark:text-red-400 font-medium border border-red-200/20 dark:border-red-800/20">
                    Medical Imaging
                  </div>
                  <div className="px-2 py-1 bg-pink-500/10 rounded text-xs text-pink-600 dark:text-pink-400 font-medium border border-pink-200/20 dark:border-pink-800/20">
                    Drug Discovery
                  </div>
                </div>
              </div>
            </div>

            {/* Financial AI */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:from-emerald-500/20 hover:to-teal-500/20 transition-all duration-500 h-full" data-testid="ai-solution-finance">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center animate-float-rotate" style={{animationDelay: '0.5s'}}>
                    <BarChart3 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-emerald-600 transition-colors">
                  Financial AI
                </h3>
                <p className="text-muted-foreground mb-6">
                  Real-time fraud detection, algorithmic trading systems, credit scoring models, 
                  and automated compliance with risk assessment algorithms.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Fraud Detection</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      99.9%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Trading Performance</span>
                    <span className="text-teal-600 font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +23% ROI
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="px-2 py-1 bg-emerald-500/10 rounded text-xs text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-200/20 dark:border-emerald-800/20">
                    Fraud Prevention
                  </div>
                  <div className="px-2 py-1 bg-teal-500/10 rounded text-xs text-teal-600 dark:text-teal-400 font-medium border border-teal-200/20 dark:border-teal-800/20">
                    Algo Trading
                  </div>
                </div>
              </div>
            </div>

            {/* Retail & E-commerce AI */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:from-orange-500/20 hover:to-amber-500/20 transition-all duration-500 h-full" data-testid="ai-solution-retail">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-2xl flex items-center justify-center animate-float-rotate" style={{animationDelay: '1s'}}>
                    <Building2 className="w-8 h-8 text-orange-600 dark:text-orange-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-orange-600 transition-colors">
                  Retail AI Solutions
                </h3>
                <p className="text-muted-foreground mb-6">
                  Personalized recommendation engines, intelligent inventory management, 
                  dynamic pricing optimization, and customer behavior analysis.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Conversion Rate</span>
                    <span className="text-orange-600 font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +35%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Customer Satisfaction</span>
                    <span className="text-amber-600 font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      4.8/5
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="px-2 py-1 bg-orange-500/10 rounded text-xs text-orange-600 dark:text-orange-400 font-medium border border-orange-200/20 dark:border-orange-800/20">
                    Recommendations
                  </div>
                  <div className="px-2 py-1 bg-amber-500/10 rounded text-xs text-amber-600 dark:text-amber-400 font-medium border border-amber-200/20 dark:border-amber-800/20">
                    Price Optimization
                  </div>
                </div>
              </div>
            </div>

            {/* Manufacturing AI */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:from-indigo-500/20 hover:to-purple-500/20 transition-all duration-500 h-full" data-testid="ai-solution-manufacturing">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center animate-float-rotate" style={{animationDelay: '1.5s'}}>
                    <Settings className="w-8 h-8 text-indigo-600 dark:text-indigo-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-indigo-600 transition-colors">
                  Manufacturing AI
                </h3>
                <p className="text-muted-foreground mb-6">
                  Predictive maintenance systems, quality control automation, production optimization, 
                  and intelligent supply chain management with IoT integration.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Downtime Reduction</span>
                    <span className="text-indigo-600 font-semibold flex items-center gap-1">
                      <Timer className="w-3 h-3" />
                      -65%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Quality Score</span>
                    <span className="text-purple-600 font-semibold flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      98.7%
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="px-2 py-1 bg-indigo-500/10 rounded text-xs text-indigo-600 dark:text-indigo-400 font-medium border border-indigo-200/20 dark:border-indigo-800/20">
                    Predictive Maintenance
                  </div>
                  <div className="px-2 py-1 bg-purple-500/10 rounded text-xs text-purple-600 dark:text-purple-400 font-medium border border-purple-200/20 dark:border-purple-800/20">
                    Quality Control
                  </div>
                </div>
              </div>
            </div>

            {/* Autonomous Systems */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-500 h-full" data-testid="ai-solution-autonomous">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center animate-float-rotate" style={{animationDelay: '2s'}}>
                    <Cpu className="w-8 h-8 text-cyan-600 dark:text-cyan-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-cyan-600 transition-colors">
                  Autonomous Systems
                </h3>
                <p className="text-muted-foreground mb-6">
                  Self-driving vehicles, drone navigation, robotic process automation, 
                  and intelligent fleet management with computer vision and sensor fusion.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Navigation Accuracy</span>
                    <span className="text-cyan-600 font-semibold flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      99.8%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Fuel Efficiency</span>
                    <span className="text-blue-600 font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +28%
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="px-2 py-1 bg-cyan-500/10 rounded text-xs text-cyan-600 dark:text-cyan-400 font-medium border border-cyan-200/20 dark:border-cyan-800/20">
                    Computer Vision
                  </div>
                  <div className="px-2 py-1 bg-blue-500/10 rounded text-xs text-blue-600 dark:text-blue-400 font-medium border border-blue-200/20 dark:border-blue-800/20">
                    Fleet Management
                  </div>
                </div>
              </div>
            </div>

            {/* Marketing & Analytics AI */}
            <div className="card-hover-effect group">
              <div className="stat-card-glass bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:from-violet-500/20 hover:to-fuchsia-500/20 transition-all duration-500 h-full" data-testid="ai-solution-marketing">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-2xl flex items-center justify-center animate-float-rotate" style={{animationDelay: '2.5s'}}>
                    <Eye className="w-8 h-8 text-violet-600 dark:text-violet-400 icon-hover-rotate" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-violet-600 transition-colors">
                  Marketing AI
                </h3>
                <p className="text-muted-foreground mb-6">
                  Customer behavior prediction, content personalization engines, campaign optimization, 
                  and sentiment analysis with real-time audience insights.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Engagement Rate</span>
                    <span className="text-violet-600 font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +89%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Prediction Accuracy</span>
                    <span className="text-fuchsia-600 font-semibold flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      96.4%
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="px-2 py-1 bg-violet-500/10 rounded text-xs text-violet-600 dark:text-violet-400 font-medium border border-violet-200/20 dark:border-violet-800/20">
                    Behavior Analysis
                  </div>
                  <div className="px-2 py-1 bg-fuchsia-500/10 rounded text-xs text-fuchsia-600 dark:text-fuchsia-400 font-medium border border-fuchsia-200/20 dark:border-fuchsia-800/20">
                    Personalization
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Overview */}
          <div className="mt-16 grid md:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300" data-testid="performance-stat-models">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                  500+
                </div>
                <div className="text-sm text-muted-foreground">AI Models Deployed</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300" data-testid="performance-stat-accuracy">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform">
                  99.2%
                </div>
                <div className="text-sm text-muted-foreground">Average Accuracy</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300" data-testid="performance-stat-processing">
                <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
                  2.1s
                </div>
                <div className="text-sm text-muted-foreground">Avg Processing Time</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300" data-testid="performance-stat-industries">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2 group-hover:scale-110 transition-transform">
                  25+
                </div>
                <div className="text-sm text-muted-foreground">Industries Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Development Process */}
      <section className="py-20 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 via-slate-800/40 to-purple-900/40"></div>
        {/* Animated Data Flow Background */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="workflow-pattern" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
                <circle cx="100" cy="100" r="4" fill="rgba(59, 130, 246, 0.6)" className="animate-pulse-glow" />
                <circle cx="300" cy="100" r="4" fill="rgba(147, 51, 234, 0.6)" className="animate-pulse-glow" style={{animationDelay: '1s'}} />
                <circle cx="100" cy="300" r="4" fill="rgba(6, 182, 212, 0.6)" className="animate-pulse-glow" style={{animationDelay: '2s'}} />
                <circle cx="300" cy="300" r="4" fill="rgba(16, 185, 129, 0.6)" className="animate-pulse-glow" style={{animationDelay: '1.5s'}} />
                <circle cx="200" cy="200" r="3" fill="rgba(168, 85, 247, 0.5)" className="animate-pulse-glow" style={{animationDelay: '0.5s'}} />
                <line x1="100" y1="100" x2="300" y2="100" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" className="animate-pulse-glow" />
                <line x1="300" y1="100" x2="300" y2="300" stroke="rgba(147, 51, 234, 0.4)" strokeWidth="2" className="animate-pulse-glow" style={{animationDelay: '0.7s'}} />
                <line x1="300" y1="300" x2="100" y2="300" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="2" className="animate-pulse-glow" style={{animationDelay: '1.2s'}} />
                <line x1="100" y1="300" x2="100" y2="100" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2" className="animate-pulse-glow" style={{animationDelay: '1.8s'}} />
                <line x1="100" y1="100" x2="200" y2="200" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" className="animate-pulse-glow" style={{animationDelay: '0.3s'}} />
                <line x1="300" y1="100" x2="200" y2="200" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" className="animate-pulse-glow" style={{animationDelay: '0.9s'}} />
                <line x1="200" y1="200" x2="100" y2="300" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" className="animate-pulse-glow" style={{animationDelay: '1.4s'}} />
                <line x1="200" y1="200" x2="300" y2="300" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" className="animate-pulse-glow" style={{animationDelay: '1.9s'}} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#workflow-pattern)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
              <Workflow className="w-4 h-4 text-purple-400 animate-float-rotate" />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold animate-gradient-shift">AI WORKFLOW</span>
              Neural Development Pipeline
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent animate-gradient-shift">Intelligent</span><br />
              Development Process
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Our systematic AI development methodology combines neural architecture design, automated testing, 
              and continuous optimization for production-ready intelligent systems.
            </p>
          </div>

          {/* Animated Workflow Timeline */}
          <div className="relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 animate-gradient-shift"></div>
            
            <div className="space-y-16">
              {/* Step 1: Problem Definition & Strategy */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <div className="card-hover-effect group">
                    <div className="stat-card-glass bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500" data-testid="workflow-step-strategy">
                      <div className="flex items-center justify-end gap-4 mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          AI Strategy & Problem Analysis
                        </h3>
                        <div className="relative w-12 h-12 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl flex items-center justify-center animate-float-rotate">
                          <Brain className="w-6 h-6 text-blue-400 icon-hover-rotate" />
                        </div>
                      </div>
                      <p className="text-white/80 mb-4">
                        Deep analysis of business objectives, data landscape assessment, and AI opportunity identification 
                        using strategic frameworks and feasibility studies.
                      </p>
                      <div className="flex justify-end gap-2">
                        <div className="px-3 py-1 bg-blue-500/20 rounded-full border border-blue-400/30">
                          <span className="text-xs font-medium text-blue-400">Strategy Design</span>
                        </div>
                        <div className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-400/30">
                          <span className="text-xs font-medium text-purple-400">ROI Analysis</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white animate-pulse-glow z-10 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Step 2: Data Engineering & Preparation */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full border-4 border-white animate-pulse-glow z-10 flex items-center justify-center" style={{animationDelay: '0.5s'}}>
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div className="flex-1 pl-8">
                  <div className="card-hover-effect group">
                    <div className="stat-card-glass bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500" data-testid="workflow-step-data">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative w-12 h-12 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-2xl flex items-center justify-center animate-float-rotate" style={{animationDelay: '0.5s'}}>
                          <Database className="w-6 h-6 text-purple-400 icon-hover-rotate" />
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                          Data Engineering & Neural Prep
                        </h3>
                      </div>
                      <p className="text-white/80 mb-4">
                        Advanced data pipelines, feature engineering, data validation, and preprocessing 
                        optimized for neural network training with automated quality assurance.
                      </p>
                      <div className="flex gap-2">
                        <div className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-400/30">
                          <span className="text-xs font-medium text-purple-400">Data Pipelines</span>
                        </div>
                        <div className="px-3 py-1 bg-cyan-500/20 rounded-full border border-cyan-400/30">
                          <span className="text-xs font-medium text-cyan-400">Feature Engineering</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Model Architecture & Training */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <div className="card-hover-effect group">
                    <div className="stat-card-glass bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500" data-testid="workflow-step-model">
                      <div className="flex items-center justify-end gap-4 mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          Neural Architecture & Training
                        </h3>
                        <div className="relative w-12 h-12 bg-gradient-to-r from-cyan-500/30 to-emerald-500/30 rounded-2xl flex items-center justify-center animate-float-rotate" style={{animationDelay: '1s'}}>
                          <Cpu className="w-6 h-6 text-cyan-400 icon-hover-rotate" />
                        </div>
                      </div>
                      <p className="text-white/80 mb-4">
                        Custom neural network design, hyperparameter optimization, distributed training, 
                        and advanced techniques like transfer learning and ensemble methods.
                      </p>
                      <div className="flex justify-end gap-2">
                        <div className="px-3 py-1 bg-cyan-500/20 rounded-full border border-cyan-400/30">
                          <span className="text-xs font-medium text-cyan-400">Neural Networks</span>
                        </div>
                        <div className="px-3 py-1 bg-emerald-500/20 rounded-full border border-emerald-400/30">
                          <span className="text-xs font-medium text-emerald-400">Training Optimization</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full border-4 border-white animate-pulse-glow z-10 flex items-center justify-center" style={{animationDelay: '1s'}}>
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Step 4: Deployment & MLOps */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full border-4 border-white animate-pulse-glow z-10 flex items-center justify-center" style={{animationDelay: '1.5s'}}>
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <div className="flex-1 pl-8">
                  <div className="card-hover-effect group">
                    <div className="stat-card-glass bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500" data-testid="workflow-step-deployment">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative w-12 h-12 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-2xl flex items-center justify-center animate-float-rotate" style={{animationDelay: '1.5s'}}>
                          <Rocket className="w-6 h-6 text-emerald-400 icon-hover-rotate" />
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                          Production Deployment & MLOps
                        </h3>
                      </div>
                      <p className="text-white/80 mb-4">
                        Container orchestration, CI/CD pipelines, model versioning, performance monitoring, 
                        and automated retraining with enterprise-scale infrastructure.
                      </p>
                      <div className="flex gap-2">
                        <div className="px-3 py-1 bg-emerald-500/20 rounded-full border border-emerald-400/30">
                          <span className="text-xs font-medium text-emerald-400">MLOps Pipeline</span>
                        </div>
                        <div className="px-3 py-1 bg-teal-500/20 rounded-full border border-teal-400/30">
                          <span className="text-xs font-medium text-teal-400">Auto-scaling</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Process Metrics */}
          <div className="mt-16 grid md:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="stat-card-glass bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300" data-testid="process-metric-timeline">
                <div className="text-3xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform flex items-center justify-center gap-2">
                  <Clock className="w-8 h-8 animate-float-rotate" />
                  4-6
                </div>
                <div className="text-sm text-white/70">Week Timeline</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="stat-card-glass bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300" data-testid="process-metric-accuracy">
                <div className="text-3xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform flex items-center justify-center gap-2">
                  <Target className="w-8 h-8 animate-float-rotate" style={{animationDelay: '0.5s'}} />
                  99.2%
                </div>
                <div className="text-sm text-white/70">Model Accuracy</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="stat-card-glass bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300" data-testid="process-metric-deployment">
                <div className="text-3xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform flex items-center justify-center gap-2">
                  <Gauge className="w-8 h-8 animate-float-rotate" style={{animationDelay: '1s'}} />
                  24/7
                </div>
                <div className="text-sm text-white/70">Monitoring</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="stat-card-glass bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300" data-testid="process-metric-optimization">
                <div className="text-3xl font-bold text-emerald-400 mb-2 group-hover:scale-110 transition-transform flex items-center justify-center gap-2">
                  <TrendingUp className="w-8 h-8 animate-float-rotate" style={{animationDelay: '1.5s'}} />
                  +40%
                </div>
                <div className="text-sm text-white/70">Performance Boost</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-indigo-950 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)`,
        }}></div>
        {/* Animated Background Particles */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="cta-particles" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="rgba(59, 130, 246, 0.6)" className="animate-pulse-glow" />
                <circle cx="150" cy="50" r="2" fill="rgba(147, 51, 234, 0.6)" className="animate-pulse-glow" style={{animationDelay: '1s'}} />
                <circle cx="50" cy="150" r="2" fill="rgba(6, 182, 212, 0.6)" className="animate-pulse-glow" style={{animationDelay: '2s'}} />
                <circle cx="150" cy="150" r="2" fill="rgba(168, 85, 247, 0.6)" className="animate-pulse-glow" style={{animationDelay: '1.5s'}} />
                <circle cx="100" cy="100" r="1.5" fill="rgba(16, 185, 129, 0.5)" className="animate-pulse-glow" style={{animationDelay: '0.5s'}} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-particles)" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-blue-200/20 dark:border-blue-800/20">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-float-rotate" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">GET STARTED</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Ready to Transform Your Business<br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">with AI Intelligence?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Join 500+ companies leveraging our AI expertise to automate processes, predict outcomes, 
            and unlock unprecedented growth opportunities with cutting-edge neural architectures.
          </p>
          
          {/* Enhanced CTA Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:scale-105 transition-all duration-300 group" data-testid="cta-stat-accuracy">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform flex items-center justify-center gap-2">
                <Target className="w-8 h-8 animate-float-rotate" />
                99.2%
              </div>
              <div className="text-sm text-muted-foreground">Model Accuracy</div>
            </div>
            <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:scale-105 transition-all duration-300 group" data-testid="cta-stat-deployment">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform flex items-center justify-center gap-2">
                <Rocket className="w-8 h-8 animate-float-rotate" style={{animationDelay: '0.5s'}} />
                4-6 Weeks
              </div>
              <div className="text-sm text-muted-foreground">Deployment Time</div>
            </div>
            <div className="stat-card-glass bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:scale-105 transition-all duration-300 group" data-testid="cta-stat-roi">
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2 group-hover:scale-110 transition-transform flex items-center justify-center gap-2">
                <TrendingUp className="w-8 h-8 animate-float-rotate" style={{animationDelay: '1s'}} />
                +40% ROI
              </div>
              <div className="text-sm text-muted-foreground">Average Performance Boost</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button 
                size="lg" 
                className="card-hover-effect bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 px-8 py-4 text-lg font-semibold rounded-2xl border border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
                data-testid="button-start-ai-project"
              >
                <Zap className="w-5 h-5 mr-2 animate-float-rotate" />
                Start Your AI Project
              </Button>
            </Link>
            <Link href="/case-studies">
              <Button 
                size="lg" 
                variant="outline" 
                className="card-hover-effect bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg hover:bg-white/90 dark:hover:bg-slate-700/90 border border-slate-300/50 dark:border-slate-600/50 hover:border-purple-400/50 dark:hover:border-purple-500/50 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                data-testid="button-view-ai-examples"
              >
                <Eye className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                View AI Success Stories
              </Button>
            </Link>
          </div>
          
          {/* Contact Information */}
          <div className="mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-700/50">
            <p className="text-sm text-muted-foreground mb-4">
              Need immediate assistance? Our AI specialists are available 24/7
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground group cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors" data-testid="contact-email">
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>ai@talpro.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground group cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors" data-testid="contact-phone">
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground group cursor-pointer hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors" data-testid="contact-support">
                <Clock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>24/7 AI Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
