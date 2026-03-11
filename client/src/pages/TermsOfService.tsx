import { useState, useEffect } from 'react';
import { Shield, FileText, Clock, Mail, Phone, MapPin, Check, Star, Award, Zap, ArrowRight, ChevronRight, ScrollText, Database, Settings, UserCheck, Scale, Handshake, CreditCard, Eye, Users, Building2, AlertTriangle, ArrowUp, Search, X, ChevronDown, ChevronUp, Download, Printer, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [showFloatingNav, setShowFloatingNav] = useState(false);

  useEffect(() => {
    // Set SEO meta tags programmatically
    document.title = 'Terms of Service | Talpro - Professional Software Development Terms';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Comprehensive Terms of Service for Talpro\'s professional software development, mobile app development, and AI/ML solutions. Clear, fair terms built on trust and mutual respect.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Comprehensive Terms of Service for Talpro\'s professional software development, mobile app development, and AI/ML solutions. Clear, fair terms built on trust and mutual respect.';
      document.head.appendChild(meta);
    }
    
    // Set Open Graph tags
    const setOrCreateMetaProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };
    
    setOrCreateMetaProperty('og:title', 'Terms of Service | Talpro');
    setOrCreateMetaProperty('og:description', 'Fair and transparent terms of service for professional software development services. Built on trust, clarity, and mutual respect.');
    setOrCreateMetaProperty('og:type', 'website');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setReadingProgress(Math.min(scrolled, 100));
      setShowBackToTop(window.scrollY > 300);
      setShowFloatingNav(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length > 2) {
      const results = sections.filter(section => 
        section.title.toLowerCase().includes(term.toLowerCase()) ||
        section.id.toLowerCase().includes(term.toLowerCase())
      ).map(section => section.id);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms', icon: Handshake },
    { id: 'services', title: 'Services Description', icon: Building2 },
    { id: 'client-responsibilities', title: 'Client Responsibilities', icon: UserCheck },
    { id: 'payment-terms', title: 'Payment Terms', icon: CreditCard },
    { id: 'intellectual-property', title: 'Intellectual Property', icon: Shield },
    { id: 'confidentiality', title: 'Confidentiality', icon: Eye },
    { id: 'warranties', title: 'Warranties & Disclaimers', icon: AlertTriangle },
    { id: 'liability', title: 'Limitation of Liability', icon: Scale },
    { id: 'termination', title: 'Termination', icon: Clock },
    { id: 'governing-law', title: 'Governing Law', icon: Database },
    { id: 'contact', title: 'Contact Information', icon: Mail },
    { id: 'changes', title: 'Changes to Terms', icon: Settings }
  ];

  return (
    <div className="pt-16">
      {/* Reading Progress Bar */}
      <div className="fixed top-16 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 transition-all duration-300 animate-progress-pulse"
          style={{ width: `${readingProgress}%` }}
          data-testid="reading-progress-bar"
        ></div>
      </div>

      {/* Floating Navigation */}
      {showFloatingNav && (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 max-h-96 overflow-y-auto">
          <div className="stat-card-glass bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl p-4 border border-white/20 dark:border-slate-700/20 shadow-xl w-64">
            <div className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <ScrollText className="w-4 h-4" />
              Quick Navigation
            </div>
            <div className="space-y-2">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left p-2 rounded-xl text-xs hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex items-center gap-2 ${
                      activeSection === section.id ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-muted-foreground'
                    }`}
                    data-testid={`floating-nav-${section.id}`}
                  >
                    <IconComponent className="w-3 h-3" />
                    {section.title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 btn-gradient-hover w-12 h-12 rounded-full flex items-center justify-center shadow-lg text-white"
          data-testid="button-back-to-top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Modern Gradient Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        
        {/* Floating Animated Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-green-400/30 rounded-full animate-float-rotate"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-blue-400/20 rounded-full animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-teal-400/40 rounded-full animate-float-rotate"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse-glow"></div>
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">TERMS OF SERVICE</span>
                Professional Standards
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Clear</span><br />
                Terms &<br />
                <span className="bg-gradient-to-r from-teal-300 to-green-400 bg-clip-text text-transparent animate-gradient-shift">Standards</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Transparent and fair terms that govern our professional relationship. 
                Built on trust, clarity, and mutual respect for successful partnerships.
              </p>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto lg:mx-0">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="trust-indicator-fair">
                  <div className="text-lg font-bold text-green-400 group-hover:scale-110 transition-transform">Fair</div>
                  <div className="text-xs text-white/70">Terms</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="trust-indicator-transparent">
                  <div className="text-lg font-bold text-green-400 group-hover:scale-110 transition-transform">Clear</div>
                  <div className="text-xs text-white/70">Language</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="trust-indicator-professional">
                  <div className="text-lg font-bold text-green-400 group-hover:scale-110 transition-transform">Legal</div>
                  <div className="text-xs text-white/70">Compliant</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => scrollToSection('acceptance')}
                  className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" 
                  data-testid="button-read-terms"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Read Full Terms
                    <ScrollText className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105" 
                  data-testid="button-contact-legal"
                >
                  Legal Questions?
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-2xl animate-float-rotate"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 text-center">
                    <Scale className="w-8 h-8 text-green-400 mx-auto mb-3 animate-float-rotate" />
                    <div className="text-sm font-semibold text-white">Fair Terms</div>
                    <div className="text-xs text-white/70">Balanced Rights</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 text-center">
                    <Handshake className="w-8 h-8 text-blue-400 mx-auto mb-3 animate-float-rotate" />
                    <div className="text-sm font-semibold text-white">Professional</div>
                    <div className="text-xs text-white/70">Standards</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 text-center">
                    <Shield className="w-8 h-8 text-teal-400 mx-auto mb-3 animate-float-rotate" />
                    <div className="text-sm font-semibold text-white">Protected</div>
                    <div className="text-xs text-white/70">Interests</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 text-center">
                    <FileText className="w-8 h-8 text-purple-400 mx-auto mb-3 animate-float-rotate" />
                    <div className="text-sm font-semibold text-white">Clear Terms</div>
                    <div className="text-xs text-white/70">No Hidden Clauses</div>
                  </div>
                </div>
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">Terms Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Actions Bar */}
      <section className="py-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search terms of service..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-10 stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border-white/20 dark:border-slate-700/20"
                data-testid="search-terms-service"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSearchResults([]);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  data-testid="clear-search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handlePrint}
                variant="outline" 
                className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border-white/20 dark:border-slate-700/20 hover:bg-white/90 dark:hover:bg-slate-800/90"
                data-testid="print-terms"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button
                variant="outline"
                className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border-white/20 dark:border-slate-700/20 hover:bg-white/90 dark:hover:bg-slate-800/90"
                data-testid="download-terms"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents Navigation */}
      <section className="py-12 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Quick Navigation</span>
            </h2>
            <p className="text-muted-foreground">Jump to any section of our terms of service</p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              const isSearchResult = searchResults.includes(section.id);
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`group stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-4 border border-white/20 dark:border-slate-700/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-left ${
                    isSearchResult ? 'ring-2 ring-blue-500 bg-blue-50/70 dark:bg-blue-900/20' : ''
                  }`}
                  data-testid={`nav-${section.id}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-foreground group-hover:text-blue-600 transition-colors">{section.title}</div>
                      <div className="text-xs text-muted-foreground">Section {index + 1}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Content */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)`
        }}></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Last Updated Badge */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium border border-blue-200/20 dark:border-blue-800/20">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">LAST UPDATED</span>
              <span className="text-muted-foreground">September 24, 2025</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Content */}
            <div className="lg:col-span-3">
              <div className="space-y-12">
                
                {/* Acceptance of Terms Section */}
                <section id="acceptance" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <Handshake className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Acceptance of Terms</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                      </div>
                      <button
                        onClick={() => toggleSection('acceptance')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        data-testid="toggle-acceptance"
                      >
                        {expandedSections.includes('acceptance') ? 
                          <ChevronUp className="w-5 h-5" /> : 
                          <ChevronDown className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                      By accessing and using the services provided by Talpro India Private Limited ("Company," "we," "our," or "us"), 
                      you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide 
                      by the above, please do not use this service.
                    </p>
                    {expandedSections.includes('acceptance') && (
                      <div className="mt-6 p-6 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl border border-blue-200/30 dark:border-blue-800/30">
                        <h4 className="font-semibold text-foreground mb-3">Understanding Your Agreement</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          These terms constitute a legally binding agreement between you and Talpro India Private Limited. 
                          By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms. 
                          If you are entering into this agreement on behalf of a company or other legal entity, you represent that you 
                          have the authority to bind such entity to these terms.
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                {/* Services Description Section */}
                <section id="services" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">Services Description</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-green-600 rounded-full"></div>
                      </div>
                      <button
                        onClick={() => toggleSection('services')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        data-testid="toggle-services"
                      >
                        {expandedSections.includes('services') ? 
                          <ChevronUp className="w-5 h-5" /> : 
                          <ChevronDown className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 text-lg">
                      Talpro India Private Limited provides custom software development, mobile application development, 
                      AI/ML solutions, and technology consulting services. Our services include but are not limited to:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        'Custom software development and programming services',
                        'Mobile application development for iOS and Android platforms',
                        'Artificial Intelligence and Machine Learning solutions',
                        'Technology consulting and advisory services',
                        'System integration and API development',
                        'Cloud solutions and deployment services'
                      ].map((service, index) => (
                        <div key={index} className="flex items-center gap-3 group/item p-3 rounded-xl hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-green-50/50 dark:hover:from-teal-900/10 dark:hover:to-green-900/10 transition-all">
                          <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-green-500 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-muted-foreground group-hover/item:text-foreground transition-colors leading-relaxed">{service}</span>
                        </div>
                      ))}
                    </div>

                    {expandedSections.includes('services') && (
                      <div className="mt-6 p-6 bg-gradient-to-br from-teal-50/50 to-green-50/50 dark:from-teal-900/10 dark:to-green-900/10 rounded-2xl border border-teal-200/30 dark:border-teal-800/30">
                        <h4 className="font-semibold text-foreground mb-3">Service Delivery Standards</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-green-500 rounded-full flex items-center justify-center mt-0.5">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">Professional Quality</div>
                              <div className="text-sm text-muted-foreground">All deliverables meet industry standards and best practices</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-green-500 rounded-full flex items-center justify-center mt-0.5">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">Timely Delivery</div>
                              <div className="text-sm text-muted-foreground">Projects completed according to agreed timelines</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Client Responsibilities Section */}
                <section id="client-responsibilities" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <UserCheck className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Client Responsibilities</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></div>
                      </div>
                      <button
                        onClick={() => toggleSection('client-responsibilities')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        data-testid="toggle-client-responsibilities"
                      >
                        {expandedSections.includes('client-responsibilities') ? 
                          <ChevronUp className="w-5 h-5" /> : 
                          <ChevronDown className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    <p className="text-muted-foreground mb-6 text-lg">As a client, you agree to:</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        'Provide accurate and complete information necessary for project completion',
                        'Respond to requests for information in a timely manner',
                        'Make payments according to the agreed schedule',
                        'Review and approve deliverables within specified timeframes',
                        'Provide necessary access to systems, accounts, and resources as required',
                        'Respect intellectual property rights and confidentiality agreements'
                      ].map((responsibility, index) => (
                        <div key={index} className="flex items-start gap-3 group/item p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-50/50 hover:to-emerald-50/50 dark:hover:from-green-900/10 dark:hover:to-emerald-900/10 transition-all">
                          <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-muted-foreground group-hover/item:text-foreground transition-colors leading-relaxed">{responsibility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Payment Terms Section */}
                <section id="payment-terms" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <CreditCard className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Payment Terms</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
                      </div>
                      <button
                        onClick={() => toggleSection('payment-terms')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        data-testid="toggle-payment-terms"
                      >
                        {expandedSections.includes('payment-terms') ? 
                          <ChevronUp className="w-5 h-5" /> : 
                          <ChevronDown className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="journey-card-wrapper">
                        <div className="group stat-card-glass bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-900/20 dark:to-cyan-900/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-200/30 dark:border-blue-800/30 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                          <div className="journey-card-bg absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-12 translate-x-12 transition-transform duration-700"></div>
                          <div className="relative">
                            <h3 className="text-xl font-bold text-foreground mb-3">Payment Schedule</h3>
                            <p className="text-muted-foreground">
                              Payment terms will be specified in individual project agreements. Generally, we operate on milestone-based 
                              payments or monthly billing cycles depending on the project scope and duration.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="journey-card-wrapper">
                        <div className="group stat-card-glass bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-200/30 dark:border-purple-800/30 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                          <div className="journey-card-bg absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-12 translate-x-12 transition-transform duration-700"></div>
                          <div className="relative">
                            <h3 className="text-xl font-bold text-foreground mb-3">Late Payment Policy</h3>
                            <p className="text-muted-foreground">
                              Invoices are due within 30 days of issuance. Late payments may incur interest charges at 1.5% per month. 
                              Services may be suspended for accounts past due beyond 60 days.
                            </p>
                          </div>
                        </div>
                      </div>

                      {expandedSections.includes('payment-terms') && (
                        <div className="mt-6 p-6 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-900/10 dark:to-red-900/10 rounded-2xl border border-orange-200/30 dark:border-orange-800/30">
                          <h4 className="font-semibold text-foreground mb-3">Payment Methods</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mt-0.5">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <div className="font-medium text-foreground">Bank Transfer</div>
                                <div className="text-sm text-muted-foreground">Preferred method for larger amounts</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mt-0.5">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <div className="font-medium text-foreground">Online Payment</div>
                                <div className="text-sm text-muted-foreground">Credit cards and digital wallets accepted</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* Intellectual Property Section */}
                <section id="intellectual-property" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Intellectual Property</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
                      </div>
                      <button
                        onClick={() => toggleSection('intellectual-property')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        data-testid="toggle-intellectual-property"
                      >
                        {expandedSections.includes('intellectual-property') ? 
                          <ChevronUp className="w-5 h-5" /> : 
                          <ChevronDown className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    <p className="text-muted-foreground mb-6 text-lg">
                      All custom work performed specifically for clients becomes the intellectual property of the client upon full payment. 
                      Talpro retains rights to general methodologies, techniques, and know-how developed during the project.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Client Ownership</h4>
                        {[
                          'Custom source code developed specifically for your project',
                          'Project documentation and deliverables',
                          'Databases and data structures created for your project',
                          'Custom designs and user interfaces'
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3 group/item">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-muted-foreground group-hover/item:text-foreground transition-colors leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Talpro Retains</h4>
                        {[
                          'General programming methodologies and techniques',
                          'Pre-existing code libraries and frameworks',
                          'Development tools and proprietary software',
                          'Business processes and operational knowledge'
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3 group/item">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-muted-foreground group-hover/item:text-foreground transition-colors leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Confidentiality Section */}
                <section id="confidentiality" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Confidentiality</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full"></div>
                      </div>
                      <button
                        onClick={() => toggleSection('confidentiality')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        data-testid="toggle-confidentiality"
                      >
                        {expandedSections.includes('confidentiality') ? 
                          <ChevronUp className="w-5 h-5" /> : 
                          <ChevronDown className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                      We maintain strict confidentiality regarding all client information, business processes, and proprietary data. 
                      All team members sign comprehensive non-disclosure agreements before working on any client project.
                    </p>
                    {expandedSections.includes('confidentiality') && (
                      <div className="mt-6 p-6 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 dark:from-indigo-900/10 dark:to-blue-900/10 rounded-2xl border border-indigo-200/30 dark:border-indigo-800/30">
                        <h4 className="font-semibold text-foreground mb-3">Our Confidentiality Commitments</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full flex items-center justify-center mt-0.5">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">Data Protection</div>
                              <div className="text-sm text-muted-foreground">All client data is encrypted and securely stored</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full flex items-center justify-center mt-0.5">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">Access Control</div>
                              <div className="text-sm text-muted-foreground">Only authorized team members access project information</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                {/* Warranties Section */}
                <section id="warranties" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <AlertTriangle className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Warranties & Disclaimers</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"></div>
                      </div>
                      <button
                        onClick={() => toggleSection('warranties')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        data-testid="toggle-warranties"
                      >
                        {expandedSections.includes('warranties') ? 
                          <ChevronUp className="w-5 h-5" /> : 
                          <ChevronDown className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                      We warrant that our services will be performed in a professional manner consistent with industry standards. 
                      However, given the nature of software development, we cannot guarantee that all deliverables will be error-free 
                      or will meet every possible requirement or expectation.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="stat-card-glass bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-lg rounded-2xl p-6 border border-green-200/30 dark:border-green-800/30">
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                          What We Warrant
                        </h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div>• Professional service delivery</div>
                          <div>• Industry-standard practices</div>
                          <div>• Timely completion of agreed milestones</div>
                          <div>• Code quality and documentation</div>
                        </div>
                      </div>
                      <div className="stat-card-glass bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-900/20 dark:to-orange-900/20 backdrop-blur-lg rounded-2xl p-6 border border-amber-200/30 dark:border-amber-800/30">
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                          Disclaimer
                        </h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div>• No guarantee of error-free software</div>
                          <div>• Performance depends on various factors</div>
                          <div>• Third-party integrations not warranted</div>
                          <div>• Client responsible for final testing</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Limitation of Liability Section */}
                <section id="liability" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <Scale className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Limitation of Liability</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-rose-600 rounded-full"></div>
                      </div>
                      <button
                        onClick={() => toggleSection('liability')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        data-testid="toggle-liability"
                      >
                        {expandedSections.includes('liability') ? 
                          <ChevronUp className="w-5 h-5" /> : 
                          <ChevronDown className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      In no event shall Talpro India Private Limited be liable for any indirect, incidental, special, 
                      consequential, or punitive damages, including but not limited to loss of profits, data, or business 
                      opportunities. Our total liability is limited to the amount paid for services under the specific project agreement.
                    </p>
                  </div>
                </section>

                {/* Termination Section */}
                <section id="termination" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-slate-500 to-gray-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <Clock className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">Termination</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-slate-500 to-gray-600 rounded-full"></div>
                      </div>
                      <button
                        onClick={() => toggleSection('termination')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        data-testid="toggle-termination"
                      >
                        {expandedSections.includes('termination') ? 
                          <ChevronUp className="w-5 h-5" /> : 
                          <ChevronDown className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      Either party may terminate services with 30 days written notice. Client remains responsible for payment 
                      of all work completed prior to termination. All deliverables completed and paid for will be provided to the client.
                    </p>
                  </div>
                </section>

                {/* Governing Law Section */}
                <section id="governing-law" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <Database className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Governing Law</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"></div>
                      </div>
                      <button
                        onClick={() => toggleSection('governing-law')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        data-testid="toggle-governing-law"
                      >
                        {expandedSections.includes('governing-law') ? 
                          <ChevronUp className="w-5 h-5" /> : 
                          <ChevronDown className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      These terms are governed by the laws of India. Any disputes arising from these terms will be subject 
                      to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.
                    </p>
                  </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Contact Information</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-8 text-lg">
                      If you have questions about these Terms of Service or need legal clarification, please contact us:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="stat-card-glass bg-gradient-to-br from-teal-50/80 to-cyan-50/80 dark:from-teal-900/20 dark:to-cyan-900/20 backdrop-blur-lg rounded-2xl p-6 border border-teal-200/30 dark:border-teal-800/30 hover:shadow-xl transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Mail className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">Email</h3>
                        </div>
                        <p className="text-muted-foreground mb-2">Legal Department</p>
                        <a href="mailto:legal@talproindia.com" className="text-teal-600 dark:text-teal-400 hover:underline font-medium">
                          legal@talproindia.com
                        </a>
                      </div>
                      
                      <div className="stat-card-glass bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-200/30 dark:border-blue-800/30 hover:shadow-xl transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Phone className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">Phone</h3>
                        </div>
                        <p className="text-muted-foreground mb-2">Legal Helpline</p>
                        <a href="tel:+918142850666" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                          +91 8142850666
                        </a>
                      </div>
                      
                      <div className="stat-card-glass bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-200/30 dark:border-purple-800/30 hover:shadow-xl transition-all duration-300 group md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <MapPin className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">Registered Address</h3>
                        </div>
                        <p className="text-muted-foreground">
                          Talpro India Private Limited<br />
                          Plot No. 42, 2nd Floor, Vittal Rao Nagar<br />
                          Madhapur, Hyderabad, Telangana 500081<br />
                          India
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Changes to Terms Section */}
                <section id="changes" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <Settings className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Changes to Terms</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
                      </div>
                      <button
                        onClick={() => toggleSection('changes')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        data-testid="toggle-changes"
                      >
                        {expandedSections.includes('changes') ? 
                          <ChevronUp className="w-5 h-5" /> : 
                          <ChevronDown className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                      We may update these Terms of Service from time to time. We will notify existing clients of any material 
                      changes by email at least 30 days before the changes take effect. Continued use of our services after 
                      changes are posted constitutes acceptance of the new terms.
                    </p>
                    {expandedSections.includes('changes') && (
                      <div className="mt-6 p-6 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/10 dark:to-teal-900/10 rounded-2xl border border-emerald-200/30 dark:border-emerald-800/30">
                        <h4 className="font-semibold text-foreground mb-3">Change Notification Process</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mt-0.5">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">Email Notification</div>
                              <div className="text-sm text-muted-foreground">Active clients receive detailed change notifications</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mt-0.5">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">Grace Period</div>
                              <div className="text-sm text-muted-foreground">30-day notice period for all material changes</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

              </div>
            </div>
            
            {/* Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Quick Actions */}
                <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 shadow-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button 
                      onClick={handlePrint}
                      className="w-full justify-start bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white"
                      data-testid="sidebar-print"
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print Terms
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      data-testid="sidebar-download"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => scrollToSection('contact')}
                      data-testid="sidebar-contact"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Legal Questions
                    </Button>
                  </div>
                </div>
                
                {/* Legal Standards */}
                <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 shadow-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Legal Standards</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50/50 dark:bg-green-900/10 border border-green-200/30 dark:border-green-800/30">
                      <Scale className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div>
                        <div className="text-sm font-medium text-foreground">Fair Terms</div>
                        <div className="text-xs text-muted-foreground">Balanced & Reasonable</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200/30 dark:border-blue-800/30">
                      <Handshake className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <div className="text-sm font-medium text-foreground">Professional</div>
                        <div className="text-xs text-muted-foreground">Industry Standards</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50/50 dark:bg-purple-900/10 border border-purple-200/30 dark:border-purple-800/30">
                      <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <div className="text-sm font-medium text-foreground">Transparent</div>
                        <div className="text-xs text-muted-foreground">Clear Language</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}