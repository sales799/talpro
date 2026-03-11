import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowRight, ExternalLink, TrendingUp, Clock, Users, Search, Star, Award, Target, Zap, Building2, Heart, Trophy, Rocket, Globe } from 'lucide-react';
import { caseStudiesData } from '@/data/caseStudies';

export default function CaseStudies() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'E-commerce', 'Healthcare', 'Finance', 'Education', 'Manufacturing'];

  const caseStudies = caseStudiesData;

  const filteredCaseStudies = caseStudies.filter(study => {
    const matchesCategory = selectedCategory === 'All' || study.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">SUCCESS STORIES</span>
                Real Results & Impact
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Proven</span><br />
                Success Stories<br />
                <span className="bg-gradient-to-r from-teal-300 to-green-400 bg-clip-text text-transparent animate-gradient-shift">& Results</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Real results for real businesses. Explore how we've helped companies transform their operations, achieve their goals, and drive measurable growth through innovative technology solutions.
              </p>
              
              {/* Hero Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-value">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">$5B+</div>
                  <div className="text-xs text-white/70">Value Created</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-projects">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">500+</div>
                  <div className="text-xs text-white/70">Projects</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-hours">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">1M+</div>
                  <div className="text-xs text-white/70">Dev Hours</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-satisfaction">
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
                <Link href="/contact">
                  <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105" data-testid="button-schedule-consultation">
                    Schedule Consultation
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Success stories dashboard showcasing various completed projects and achievements" 
                  className="rounded-2xl w-full h-auto shadow-2xl"
                />
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">Live Projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Filtering UI */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 rounded-full mb-6">
              <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">FILTER & DISCOVER</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">Find Your</span><br />
              <span className="text-foreground">Perfect Case Study</span>
            </h2>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-2xl blur-lg opacity-75"></div>
              <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-1 border border-white/20 dark:border-slate-700/20">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search case studies, technologies, or client names..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 text-lg"
                    data-testid="search-case-studies"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Category Filters */}
          <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      isSelected 
                        ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg btn-gradient-hover' 
                        : 'bg-white/50 dark:bg-slate-700/50 backdrop-blur text-foreground hover:bg-white/80 dark:hover:bg-slate-600/80 border border-white/20 dark:border-slate-600/20'
                    } hover:scale-105 hover:shadow-xl`}
                    data-testid={`filter-${category.toLowerCase()}`}
                  >
                    <span className="relative z-10">{category}</span>
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl animate-pulse-glow opacity-20"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Case Study Cards */}
      <section className="py-20 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCaseStudies.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <Search className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">No case studies found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
              <Button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} data-testid="button-clear-filters">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCaseStudies.map((study, index) => (
                <div key={study.id} className="group relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <Card className="card-hover-effect stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col h-full">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
                      <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-full px-3 py-1 border border-white/20">
                          <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">{study.category}</span>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 z-20">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-float-rotate">
                          <Star className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 flex flex-col flex-grow relative z-10">
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-blue-600 transition-colors">{study.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          {study.client}
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{study.description}</p>
                      </div>

                      {/* Key Metrics */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          Key Results
                        </h4>
                        <div className="space-y-2">
                          {study.metrics.map((metric, metricIndex) => (
                            <div key={metricIndex} className="flex justify-between items-center p-2 bg-white/50 dark:bg-slate-700/50 rounded-lg backdrop-blur transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-600/80">
                              <span className="text-muted-foreground text-sm">{metric.label}:</span>
                              <span className="font-bold text-green-600 dark:text-green-400 animate-pulse-glow">{metric.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="mb-6">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-slate-700/50 rounded-lg backdrop-blur">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <div>
                              <div className="text-xs text-muted-foreground">Duration</div>
                              <div className="font-semibold">{study.duration}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-white/50 dark:bg-slate-700/50 rounded-lg backdrop-blur">
                            <Users className="w-4 h-4 text-purple-500" />
                            <div>
                              <div className="text-xs text-muted-foreground">Team Size</div>
                              <div className="font-semibold">{study.teamSize}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mb-6 flex-grow">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {study.technologies.map((tech, techIndex) => (
                            <div key={techIndex} className="bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 backdrop-blur rounded-full px-3 py-1 border border-white/20 hover:scale-105 transition-transform duration-300 animate-float-rotate" style={{animationDelay: `${techIndex * 0.5}s`}}>
                              <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">{tech}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Link href={`/case-studies/${study.id}`}>
                        <button className="btn-gradient-hover group relative w-full inline-flex items-center justify-center px-6 py-3 font-semibold text-white rounded-2xl shadow-lg" data-testid={`case-study-${study.id}`}>
                          <span className="relative z-10 flex items-center gap-2">
                            View Full Case Study
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Results/Metrics Showcase */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 rounded-full mb-6">
              <Trophy className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">PROVEN RESULTS</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">Measurable</span><br />
              <span className="text-foreground">Success Metrics</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our case studies demonstrate consistent delivery of exceptional results across all industries and project types.
            </p>
          </div>
          
          {/* Overall Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform animate-float-rotate">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2 group-hover:scale-110 transition-transform animate-pulse-glow" data-testid="metric-average-improvement">250%</div>
                <div className="text-sm text-muted-foreground">Average Performance<br />Improvement</div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-teal-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform animate-float-rotate">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2 group-hover:scale-110 transition-transform animate-pulse-glow" data-testid="metric-on-time-delivery">99.2%</div>
                <div className="text-sm text-muted-foreground">On-Time Project<br />Delivery Rate</div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 to-red-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform animate-float-rotate">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2 group-hover:scale-110 transition-transform animate-pulse-glow" data-testid="metric-client-retention">96.8%</div>
                <div className="text-sm text-muted-foreground">Client Retention<br />& Satisfaction</div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-green-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform animate-float-rotate">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2 group-hover:scale-110 transition-transform animate-pulse-glow" data-testid="metric-roi">485%</div>
                <div className="text-sm text-muted-foreground">Average ROI<br />Within 12 Months</div>
              </div>
            </div>
          </div>
          
          {/* Featured Case Study */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-2xl"></div>
            <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/20 dark:border-slate-700/20 shadow-xl relative">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-full mb-6">
                    <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-sm font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">FEATURED SUCCESS</span>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    How We Helped a Fortune 500 Company Achieve 
                    <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Digital Transformation</span>
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Complete enterprise modernization project that resulted in measurable improvements across all business metrics, enhanced security, and scalable architecture for future growth.
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/50 dark:bg-slate-700/50 backdrop-blur rounded-2xl p-4 text-center hover:bg-white/80 dark:hover:bg-slate-600/80 transition-all duration-300">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400 animate-pulse-glow">40%</div>
                      <div className="text-xs text-muted-foreground">Cost Reduction</div>
                    </div>
                    <div className="bg-white/50 dark:bg-slate-700/50 backdrop-blur rounded-2xl p-4 text-center hover:bg-white/80 dark:hover:bg-slate-600/80 transition-all duration-300">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 animate-pulse-glow">300%</div>
                      <div className="text-xs text-muted-foreground">Performance</div>
                    </div>
                    <div className="bg-white/50 dark:bg-slate-700/50 backdrop-blur rounded-2xl p-4 text-center hover:bg-white/80 dark:hover:bg-slate-600/80 transition-all duration-300">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 animate-pulse-glow">18mo</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                  </div>
                  <Link href="/case-studies/1">
                    <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-featured-case">
                      <span className="relative z-10 flex items-center gap-2">
                        Read Full Case Study
                        <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </button>
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-3xl blur-2xl"></div>
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                    alt="Digital transformation success story showcasing modern technology implementation"
                    className="rounded-2xl shadow-2xl w-full h-auto relative"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-green-400 to-blue-500 text-white p-4 rounded-2xl shadow-lg animate-float-rotate">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Enhancement */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-700 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full animate-pulse-glow"></div>
              <span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent font-bold animate-gradient-shift">YOUR SUCCESS AWAITS</span>
              Let's Build Together
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready to Create Your 
              <span className="bg-gradient-to-r from-green-400 via-yellow-300 to-orange-300 bg-clip-text text-transparent animate-gradient-shift">Success Story?</span>
            </h2>
            
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join hundreds of companies that have transformed their business with our innovative technology solutions. Let's discuss how we can drive your next breakthrough.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link href="/contact">
                <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-10 py-5 font-semibold text-white rounded-2xl shadow-xl" data-testid="button-start-project-cta">
                  <span className="relative z-10 flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    Start Your Project
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
              
              <Link href="/contact">
                <button className="group relative inline-flex items-center justify-center px-10 py-5 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 shadow-xl" data-testid="button-schedule-consultation-cta">
                  <span className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Schedule Consultation
                  </span>
                </button>
              </Link>
            </div>
          </div>
          
          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="stat-card-glass bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform animate-float-rotate">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Free Consultation</h3>
              <p className="text-white/80 text-sm">Get expert advice on your project requirements and technology strategy</p>
            </div>
            
            <div className="stat-card-glass bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform animate-float-rotate">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Custom Solutions</h3>
              <p className="text-white/80 text-sm">Tailored technology solutions designed specifically for your business needs</p>
            </div>
            
            <div className="stat-card-glass bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform animate-float-rotate">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Proven Results</h3>
              <p className="text-white/80 text-sm">Join our track record of 500+ successful projects and satisfied clients</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
