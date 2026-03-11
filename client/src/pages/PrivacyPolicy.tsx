import { useState, useEffect } from 'react';
import { Shield, Eye, Lock, Globe, Users, FileText, Clock, Mail, Phone, MapPin, Check, Star, Award, Zap, ArrowRight, ChevronRight, ScrollText, Database, Settings, UserCheck, ArrowUp, Search, X, ChevronDown, ChevronUp, Download, Printer, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [showFloatingNav, setShowFloatingNav] = useState(false);

  useEffect(() => {
    // Set SEO meta tags programmatically
    document.title = 'Privacy Policy | Talpro - Data Protection & Privacy Standards';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Comprehensive Privacy Policy for Talpro\'s professional software development services. Learn how we protect your data with industry-leading security standards and transparency.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Comprehensive Privacy Policy for Talpro\'s professional software development services. Learn how we protect your data with industry-leading security standards and transparency.';
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
    
    setOrCreateMetaProperty('og:title', 'Privacy Policy | Talpro');
    setOrCreateMetaProperty('og:description', 'Transparent privacy policy showcasing our commitment to data protection and user privacy with industry-leading security standards.');
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
    { id: 'introduction', title: 'Introduction', icon: FileText },
    { id: 'information-collect', title: 'Information We Collect', icon: Database },
    { id: 'how-we-use', title: 'How We Use Information', icon: Settings },
    { id: 'information-sharing', title: 'Information Sharing', icon: Users },
    { id: 'data-security', title: 'Data Security', icon: Shield },
    { id: 'your-rights', title: 'Your Rights', icon: UserCheck },
    { id: 'cookies', title: 'Cookies', icon: Globe },
    { id: 'contact', title: 'Contact Information', icon: Mail },
    { id: 'changes', title: 'Policy Changes', icon: Clock }
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
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">PRIVACY POLICY</span>
                Your Privacy Matters
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Protecting</span><br />
                Your Privacy<br />
                <span className="bg-gradient-to-r from-teal-300 to-green-400 bg-clip-text text-transparent animate-gradient-shift">& Data</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Transparency and trust are at the heart of everything we do. Learn how we collect, 
                use, and protect your information with industry-leading security standards.
              </p>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto lg:mx-0">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="trust-indicator-gdpr">
                  <div className="text-lg font-bold text-green-400 group-hover:scale-110 transition-transform">GDPR</div>
                  <div className="text-xs text-white/70">Compliant</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="trust-indicator-secure">
                  <div className="text-lg font-bold text-green-400 group-hover:scale-110 transition-transform">256-bit</div>
                  <div className="text-xs text-white/70">Encryption</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="trust-indicator-iso">
                  <div className="text-lg font-bold text-green-400 group-hover:scale-110 transition-transform">ISO</div>
                  <div className="text-xs text-white/70">Certified</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => scrollToSection('introduction')}
                  className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" 
                  data-testid="button-read-policy"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Read Full Policy
                    <ScrollText className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105" 
                  data-testid="button-contact-privacy"
                >
                  Privacy Questions?
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-2xl animate-float-rotate"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 text-center">
                    <Shield className="w-8 h-8 text-green-400 mx-auto mb-3 animate-float-rotate" />
                    <div className="text-sm font-semibold text-white">Data Protection</div>
                    <div className="text-xs text-white/70">Enterprise Grade</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 text-center">
                    <Lock className="w-8 h-8 text-blue-400 mx-auto mb-3 animate-float-rotate" />
                    <div className="text-sm font-semibold text-white">Secure Storage</div>
                    <div className="text-xs text-white/70">Encrypted Always</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 text-center">
                    <Eye className="w-8 h-8 text-teal-400 mx-auto mb-3 animate-float-rotate" />
                    <div className="text-sm font-semibold text-white">Transparency</div>
                    <div className="text-xs text-white/70">Full Disclosure</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 text-center">
                    <UserCheck className="w-8 h-8 text-purple-400 mx-auto mb-3 animate-float-rotate" />
                    <div className="text-sm font-semibold text-white">Your Rights</div>
                    <div className="text-xs text-white/70">Full Control</div>
                  </div>
                </div>
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">Privacy First</span>
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
                placeholder="Search privacy policy..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-10 stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border-white/20 dark:border-slate-700/20"
                data-testid="search-privacy-policy"
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
                data-testid="print-policy"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button
                variant="outline"
                className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border-white/20 dark:border-slate-700/20 hover:bg-white/90 dark:hover:bg-slate-800/90"
                data-testid="download-policy"
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
            <p className="text-muted-foreground">Jump to any section of our privacy policy</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
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
                
                {/* Introduction Section */}
                <section id="introduction" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Introduction</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                      </div>
                      <button
                        onClick={() => toggleSection('introduction')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        data-testid="toggle-introduction"
                      >
                        {expandedSections.includes('introduction') ? 
                          <ChevronUp className="w-5 h-5" /> : 
                          <ChevronDown className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                      Talpro India Private Limited ("we," "our," or "us") is committed to protecting your privacy with 
                      industry-leading security standards. This Privacy Policy explains how we collect, use, disclose, 
                      and safeguard your information when you visit our website talproindia.com or use our services.
                    </p>
                    {expandedSections.includes('introduction') && (
                      <div className="mt-6 p-6 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl border border-blue-200/30 dark:border-blue-800/30">
                        <h4 className="font-semibold text-foreground mb-3">Our Commitment to Privacy</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          We believe that privacy is a fundamental right. Our approach to data protection goes beyond compliance - 
                          we've built privacy into the very foundation of our services. This policy is written in plain language 
                          to help you understand exactly how your information is handled.
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                {/* Information We Collect Section */}
                <section id="information-collect" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <Database className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">Information We Collect</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-green-600 rounded-full"></div>
                      </div>
                      <button
                        onClick={() => toggleSection('information-collect')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        data-testid="toggle-information-collect"
                      >
                        {expandedSections.includes('information-collect') ? 
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
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                              </div>
                              <h3 className="text-xl font-bold text-foreground">Personal Information</h3>
                            </div>
                            <p className="text-muted-foreground mb-4">
                              We may collect personal information that you voluntarily provide when you:
                            </p>
                            <div className="grid md:grid-cols-2 gap-3">
                              {[
                                'Contact us through our contact form',
                                'Subscribe to our newsletter',
                                'Apply for jobs through our careers page',
                                'Request a consultation or quote'
                              ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3 group/item">
                                  <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform">
                                    <Check className="w-3 h-3 text-white" />
                                  </div>
                                  <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="journey-card-wrapper">
                        <div className="group stat-card-glass bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-200/30 dark:border-purple-800/30 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                          <div className="journey-card-bg absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-12 translate-x-12 transition-transform duration-700"></div>
                          <div className="relative">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" />
                              </div>
                              <h3 className="text-xl font-bold text-foreground">Automatic Information</h3>
                            </div>
                            <p className="text-muted-foreground mb-4">
                              We automatically collect certain information when you visit our website, including:
                            </p>
                            <div className="grid md:grid-cols-2 gap-3">
                              {[
                                'IP addresses and device information',
                                'Browser type and version',
                                'Pages visited and time spent on our site',
                                'Referring website information'
                              ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3 group/item">
                                  <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform">
                                    <Check className="w-3 h-3 text-white" />
                                  </div>
                                  <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {expandedSections.includes('information-collect') && (
                        <div className="mt-6 p-6 bg-gradient-to-br from-teal-50/50 to-green-50/50 dark:from-teal-900/10 dark:to-green-900/10 rounded-2xl border border-teal-200/30 dark:border-teal-800/30">
                          <h4 className="font-semibold text-foreground mb-3">Data Collection Principles</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-green-500 rounded-full flex items-center justify-center mt-0.5">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <div className="font-medium text-foreground">Minimal Collection</div>
                                <div className="text-sm text-muted-foreground">We only collect data necessary for providing our services</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-green-500 rounded-full flex items-center justify-center mt-0.5">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <div className="font-medium text-foreground">Purpose Limitation</div>
                                <div className="text-sm text-muted-foreground">Data is used only for specified, legitimate purposes</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* How We Use Information Section */}
                <section id="how-we-use" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <Settings className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">How We Use Your Information</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></div>
                      </div>
                      <button
                        onClick={() => toggleSection('how-we-use')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        data-testid="toggle-how-we-use"
                      >
                        {expandedSections.includes('how-we-use') ? 
                          <ChevronUp className="w-5 h-5" /> : 
                          <ChevronDown className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    <p className="text-muted-foreground mb-6 text-lg">
                      We use the information we collect for various purposes, including:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        'Responding to your inquiries and providing customer support',
                        'Processing job applications and recruitment',
                        'Improving our website and services',
                        'Sending you relevant updates and information (with your consent)',
                        'Complying with legal obligations',
                        'Protecting against fraud and unauthorized access'
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3 group/item p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-50/50 hover:to-emerald-50/50 dark:hover:from-green-900/10 dark:hover:to-emerald-900/10 transition-all">
                          <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-muted-foreground group-hover/item:text-foreground transition-colors leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Information Sharing Section */}
                <section id="information-sharing" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Information Sharing</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></div>
                      </div>
                      <button
                        onClick={() => toggleSection('information-sharing')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        data-testid="toggle-information-sharing"
                      >
                        {expandedSections.includes('information-sharing') ? 
                          <ChevronUp className="w-5 h-5" /> : 
                          <ChevronDown className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    <p className="text-muted-foreground mb-6 text-lg">
                      We do not sell, trade, or otherwise transfer your personal information to third parties. We may share information only in these circumstances:
                    </p>
                    <div className="grid gap-4">
                      {[
                        'With your explicit consent',
                        'To comply with legal obligations or court orders',
                        'To protect our rights, property, or safety',
                        'With trusted service providers who assist in our operations',
                        'In connection with a business transfer or merger'
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3 group/item p-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-red-50/50 dark:hover:from-orange-900/10 dark:hover:to-red-900/10 transition-all">
                          <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-muted-foreground group-hover/item:text-foreground transition-colors leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Data Security Section */}
                <section id="data-security" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Data Security</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
                      </div>
                      <button
                        onClick={() => toggleSection('data-security')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        data-testid="toggle-data-security"
                      >
                        {expandedSections.includes('data-security') ? 
                          <ChevronUp className="w-5 h-5" /> : 
                          <ChevronDown className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    <p className="text-muted-foreground mb-6 text-lg">
                      We implement industry-leading security measures to protect your personal information:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        {[
                          'End-to-end encryption for data transmission',
                          'Secure servers with regular security updates',
                          'Access controls and authentication protocols',
                          'Regular security audits and assessments'
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3 group/item">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-muted-foreground group-hover/item:text-foreground transition-colors leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="stat-card-glass bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-200/30 dark:border-purple-800/30">
                        <div className="flex items-center gap-3 mb-3">
                          <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                          <h4 className="font-semibold text-foreground">Security Certifications</h4>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div>• ISO 27001 Certified</div>
                          <div>• SOC 2 Type II Compliant</div>
                          <div>• GDPR & CCPA Compliant</div>
                          <div>• Regular penetration testing</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Your Rights Section */}
                <section id="your-rights" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <UserCheck className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Your Rights</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full"></div>
                      </div>
                      <button
                        onClick={() => toggleSection('your-rights')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        data-testid="toggle-your-rights"
                      >
                        {expandedSections.includes('your-rights') ? 
                          <ChevronUp className="w-5 h-5" /> : 
                          <ChevronDown className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    <p className="text-muted-foreground mb-6 text-lg">
                      You have the following rights regarding your personal information:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { title: 'Right to Access', desc: 'Request a copy of your personal data we hold' },
                        { title: 'Right to Rectification', desc: 'Correct any inaccurate or incomplete data' },
                        { title: 'Right to Erasure', desc: 'Request deletion of your personal data' },
                        { title: 'Right to Portability', desc: 'Receive your data in a machine-readable format' },
                        { title: 'Right to Object', desc: 'Object to processing of your personal data' },
                        { title: 'Right to Restrict', desc: 'Limit how we process your data' }
                      ].map((right, index) => (
                        <div key={index} className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/50 to-blue-50/50 dark:from-indigo-900/10 dark:to-blue-900/10 border border-indigo-200/30 dark:border-indigo-800/30 hover:shadow-lg transition-all duration-300 group">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-foreground group-hover:text-indigo-600 transition-colors">{right.title}</div>
                              <div className="text-sm text-muted-foreground mt-1">{right.desc}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Cookies Section */}
                <section id="cookies" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <Globe className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Cookies</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"></div>
                      </div>
                      <button
                        onClick={() => toggleSection('cookies')}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        data-testid="toggle-cookies"
                      >
                        {expandedSections.includes('cookies') ? 
                          <ChevronUp className="w-5 h-5" /> : 
                          <ChevronDown className="w-5 h-5" />
                        }
                      </button>
                    </div>
                    <p className="text-muted-foreground mb-6 text-lg">
                      We use cookies and similar tracking technologies to enhance your browsing experience:
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { type: 'Essential Cookies', desc: 'Required for website functionality', color: 'from-green-400 to-emerald-500' },
                        { type: 'Analytics Cookies', desc: 'Help us understand website usage', color: 'from-blue-400 to-cyan-500' },
                        { type: 'Preference Cookies', desc: 'Remember your choices and settings', color: 'from-purple-400 to-pink-500' }
                      ].map((cookie, index) => (
                        <div key={index} className="p-4 rounded-xl bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-200/30 dark:border-amber-800/30 hover:shadow-lg transition-all duration-300 group text-center">
                          <div className={`w-8 h-8 bg-gradient-to-r ${cookie.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <div className="font-semibold text-foreground group-hover:text-amber-600 transition-colors">{cookie.type}</div>
                          <div className="text-sm text-muted-foreground mt-1">{cookie.desc}</div>
                        </div>
                      ))}
                    </div>
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
                      If you have questions about this Privacy Policy or want to exercise your rights, please contact us:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="stat-card-glass bg-gradient-to-br from-teal-50/80 to-cyan-50/80 dark:from-teal-900/20 dark:to-cyan-900/20 backdrop-blur-lg rounded-2xl p-6 border border-teal-200/30 dark:border-teal-800/30 hover:shadow-xl transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Mail className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">Email</h3>
                        </div>
                        <p className="text-muted-foreground mb-2">Data Protection Officer</p>
                        <a href="mailto:privacy@talproindia.com" className="text-teal-600 dark:text-teal-400 hover:underline font-medium">
                          privacy@talproindia.com
                        </a>
                      </div>
                      
                      <div className="stat-card-glass bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-200/30 dark:border-blue-800/30 hover:shadow-xl transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Phone className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">Phone</h3>
                        </div>
                        <p className="text-muted-foreground mb-2">Privacy Helpline</p>
                        <a href="tel:+918142850666" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                          +91 8142850666
                        </a>
                      </div>
                      
                      <div className="stat-card-glass bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-200/30 dark:border-purple-800/30 hover:shadow-xl transition-all duration-300 group md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <MapPin className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">Address</h3>
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

                {/* Policy Changes Section */}
                <section id="changes" className="card-hover-effect">
                  <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <Clock className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">Policy Changes</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-rose-500 to-red-600 rounded-full"></div>
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
                      We may update this Privacy Policy from time to time. We will notify you of any material changes by posting 
                      the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this 
                      Privacy Policy periodically to stay informed about how we protect your information.
                    </p>
                    {expandedSections.includes('changes') && (
                      <div className="mt-6 p-6 bg-gradient-to-br from-rose-50/50 to-red-50/50 dark:from-rose-900/10 dark:to-red-900/10 rounded-2xl border border-rose-200/30 dark:border-rose-800/30">
                        <h4 className="font-semibold text-foreground mb-3">Change Notification Process</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-rose-400 to-red-500 rounded-full flex items-center justify-center mt-0.5">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">Email Notification</div>
                              <div className="text-sm text-muted-foreground">Registered users will receive email updates for significant changes</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-rose-400 to-red-500 rounded-full flex items-center justify-center mt-0.5">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">Website Banner</div>
                              <div className="text-sm text-muted-foreground">Important updates will be highlighted on our homepage</div>
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
                      Print Policy
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
                      Contact Us
                    </Button>
                  </div>
                </div>
                
                {/* Trust Badges */}
                <div className="stat-card-glass bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 shadow-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Privacy Certifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50/50 dark:bg-green-900/10 border border-green-200/30 dark:border-green-800/30">
                      <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div>
                        <div className="text-sm font-medium text-foreground">GDPR Compliant</div>
                        <div className="text-xs text-muted-foreground">EU Privacy Standards</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200/30 dark:border-blue-800/30">
                      <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <div className="text-sm font-medium text-foreground">ISO 27001</div>
                        <div className="text-xs text-muted-foreground">Information Security</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50/50 dark:bg-purple-900/10 border border-purple-200/30 dark:border-purple-800/30">
                      <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <div className="text-sm font-medium text-foreground">SOC 2 Type II</div>
                        <div className="text-xs text-muted-foreground">Security Controls</div>
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