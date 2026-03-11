import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, ChevronUp, MessageCircle, Clock, Shield, Code, 
  Search, Star, Users, Award, HelpCircle, ThumbsUp, ThumbsDown,
  Sparkles, TrendingUp, Lightbulb, Phone, Mail, ArrowRight,
  Filter, Grid, List, Heart, Share2, Bookmark, Eye, CheckCircle2,
  BarChart3, Target, Zap, Globe, Building2, Rocket
} from 'lucide-react';
import { Link } from 'wouter';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  popular?: boolean;
  trending?: boolean;
  helpful?: number;
  notHelpful?: number;
  views?: number;
  relatedQuestions?: number[];
}

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [userFeedback, setUserFeedback] = useState<{[key: number]: 'helpful' | 'not-helpful' | null}>({});

  const categories = ['All', 'General', 'Services', 'Process', 'Pricing', 'Support'];

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: 'How do you ensure project quality and timely delivery?',
      answer: 'We follow agile development methodologies with regular sprint reviews, automated testing, and continuous integration. Our project managers provide weekly updates and maintain transparent communication throughout the development process. We also conduct thorough quality assurance testing and have dedicated QA specialists for each project.',
      category: 'Process',
      popular: true,
      helpful: 89,
      notHelpful: 12,
      views: 1250,
      relatedQuestions: [2, 9]
    },
    {
      id: 2,
      question: 'What is your typical project timeline?',
      answer: 'Project timelines vary based on complexity and scope. Simple web applications typically take 4-8 weeks, mobile apps range from 8-16 weeks, while enterprise solutions may require 3-6 months. We provide detailed timeline estimates during our initial consultation, including milestones and delivery phases.',
      category: 'General',
      trending: true,
      helpful: 95,
      notHelpful: 8,
      views: 2100,
      relatedQuestions: [1, 6]
    },
    {
      id: 3,
      question: 'Do you provide ongoing support and maintenance?',
      answer: 'Yes, we offer comprehensive support packages including bug fixes, security updates, performance monitoring, and feature enhancements. Our support team is available 24/7 for critical issues, with guaranteed response times based on your service level agreement.',
      category: 'Support',
      popular: true,
      helpful: 76,
      notHelpful: 5,
      views: 980,
      relatedQuestions: [10, 14]
    },
    {
      id: 4,
      question: 'What technologies do you specialize in?',
      answer: 'We work with modern tech stacks including React, Node.js, Python, Java, Swift, Kotlin, Flutter, AWS, Azure, and emerging technologies like AI/ML frameworks (TensorFlow, PyTorch) and blockchain platforms. Our team stays updated with the latest technologies to deliver cutting-edge solutions.',
      category: 'Services',
      trending: true,
      helpful: 112,
      notHelpful: 15,
      views: 1780,
      relatedQuestions: [8, 11, 13]
    },
    {
      id: 5,
      question: 'How do you handle data security and privacy?',
      answer: 'We implement industry-standard security practices including encryption, secure coding standards, regular security audits, and compliance with regulations like GDPR, HIPAA, and SOC 2. All team members sign NDAs, and we follow strict data handling protocols throughout the development process.',
      category: 'General',
      helpful: 67,
      notHelpful: 3,
      views: 890,
      relatedQuestions: [12]
    },
    {
      id: 6,
      question: 'What is your pricing structure?',
      answer: 'We offer flexible pricing models including fixed-price projects, hourly rates, and dedicated team arrangements. Pricing depends on project complexity, timeline, and technology requirements. We provide transparent quotes with detailed breakdowns and no hidden costs.',
      category: 'Pricing',
      popular: true,
      helpful: 85,
      notHelpful: 18,
      views: 1650,
      relatedQuestions: [14, 2]
    },
    {
      id: 7,
      question: 'Can you work with our existing development team?',
      answer: 'Absolutely! We excel at collaborating with existing teams and can integrate seamlessly into your development workflow. We can provide additional resources, specialized expertise, or take on specific components of your project while maintaining full coordination.',
      category: 'Process',
      helpful: 73,
      notHelpful: 7,
      views: 720,
      relatedQuestions: [1, 9]
    },
    {
      id: 8,
      question: 'Do you offer mobile app development for both iOS and Android?',
      answer: 'Yes, we develop native iOS and Android applications as well as cross-platform solutions using React Native and Flutter. Our team includes certified iOS and Android developers who follow platform-specific design guidelines and best practices.',
      category: 'Services',
      trending: true,
      helpful: 98,
      notHelpful: 11,
      views: 1420,
      relatedQuestions: [4, 11]
    },
    {
      id: 9,
      question: 'How do you handle project changes and scope adjustments?',
      answer: 'We use an agile approach that accommodates changes naturally. All scope changes are documented, discussed with stakeholders, and approved before implementation. We provide impact assessments for timeline and budget adjustments to ensure transparency.',
      category: 'Process',
      helpful: 58,
      notHelpful: 9,
      views: 560,
      relatedQuestions: [1, 7]
    },
    {
      id: 10,
      question: 'What kind of documentation do you provide?',
      answer: 'We provide comprehensive documentation including technical specifications, API documentation, user manuals, deployment guides, and maintenance procedures. All code is well-commented and follows industry standards for future maintainability.',
      category: 'Support',
      helpful: 41,
      notHelpful: 2,
      views: 380,
      relatedQuestions: [3, 11]
    },
    {
      id: 11,
      question: 'Can you help with cloud migration and DevOps?',
      answer: 'Yes, we offer complete cloud migration services and DevOps implementation including CI/CD pipelines, infrastructure as code, monitoring solutions, and automated deployment processes. We work with all major cloud providers including AWS, Azure, and Google Cloud.',
      category: 'Services',
      helpful: 62,
      notHelpful: 4,
      views: 845,
      relatedQuestions: [4, 8, 10]
    },
    {
      id: 12,
      question: 'How do you ensure intellectual property protection?',
      answer: 'We sign comprehensive NDAs and intellectual property agreements before starting any project. All code and intellectual property developed for your project remains 100% owned by you. We maintain strict confidentiality protocols and secure development environments.',
      category: 'General',
      helpful: 79,
      notHelpful: 6,
      views: 925,
      relatedQuestions: [5]
    },
    {
      id: 13,
      question: 'What is included in your AI and ML services?',
      answer: 'Our AI/ML services include strategy consulting, custom model development, data analysis, chatbot development, predictive analytics, computer vision solutions, and natural language processing. We help from proof of concept to full production deployment.',
      category: 'Services',
      trending: true,
      popular: true,
      helpful: 134,
      notHelpful: 21,
      views: 2350,
      relatedQuestions: [4, 11]
    },
    {
      id: 14,
      question: 'Do you offer free consultations?',
      answer: 'Yes, we provide free initial consultations to understand your project requirements, discuss technology options, and provide preliminary estimates. This helps ensure we\'re the right fit for your project before any commitment.',
      category: 'Pricing',
      popular: true,
      helpful: 156,
      notHelpful: 8,
      views: 2890,
      relatedQuestions: [6, 3]
    }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedFAQs = [...filteredFAQs].sort((a, b) => {
    if (sortBy === 'popular') {
      return (b.helpful || 0) - (a.helpful || 0);
    } else if (sortBy === 'trending') {
      return (b.views || 0) - (a.views || 0);
    } else {
      return a.question.localeCompare(b.question);
    }
  });

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const handleFeedback = (faqId: number, feedback: 'helpful' | 'not-helpful') => {
    setUserFeedback(prev => ({
      ...prev,
      [faqId]: prev[faqId] === feedback ? null : feedback
    }));
  };

  const getRelatedQuestions = (relatedIds?: number[]) => {
    if (!relatedIds) return [];
    return faqData.filter(faq => relatedIds.includes(faq.id));
  };

  const totalQuestions = faqData.length;
  const avgHelpfulRating = Math.round(faqData.reduce((acc, faq) => acc + (faq.helpful || 0), 0) / totalQuestions);
  const totalViews = faqData.reduce((acc, faq) => acc + (faq.views || 0), 0);
  const categoryCounts = categories.slice(1).map(cat => ({
    name: cat,
    count: faqData.filter(faq => faq.category === cat).length
  }));

  return (
    <div className="pt-16">
      {/* Modern Gradient Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
        
        {/* Animated Particles */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-full blur-xl animate-float-rotate"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-2xl animate-float-rotate" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-teal-400/20 to-green-400/20 rounded-full blur-lg animate-pulse-glow" style={{animationDelay: '1s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse-glow"></div>
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">HELP CENTER</span>
                Get Instant Answers
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Frequently</span><br />
                Asked<br />
                <span className="bg-gradient-to-r from-teal-300 to-green-400 bg-clip-text text-transparent animate-gradient-shift">Questions</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Find instant answers to common questions about our services, processes, and how we can help accelerate your business growth with cutting-edge technology solutions.
              </p>
              
              {/* Enhanced Hero FAQ Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group stat-card-glass" data-testid="hero-stat-questions">
                  <div className="flex items-center justify-center mb-2">
                    <HelpCircle className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform animate-float-rotate" />
                  </div>
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">{totalQuestions}+</div>
                  <div className="text-xs text-white/70">Questions</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group stat-card-glass" data-testid="hero-stat-satisfaction">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform animate-pulse-glow" />
                  </div>
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">{avgHelpfulRating}%</div>
                  <div className="text-xs text-white/70">Satisfaction</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group stat-card-glass" data-testid="hero-stat-response">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform animate-progress-pulse" />
                  </div>
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">2hr</div>
                  <div className="text-xs text-white/70">Avg Response</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group stat-card-glass" data-testid="hero-stat-views">
                  <div className="flex items-center justify-center mb-2">
                    <Eye className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform animate-gradient-shift" />
                  </div>
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">{Math.round(totalViews/1000)}k+</div>
                  <div className="text-xs text-white/70">Monthly Views</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl text-lg font-medium border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse-glow" 
                  data-testid="button-browse-questions"
                >
                  <Sparkles className="w-5 h-5 mr-2 animate-float-rotate" />
                  Browse Questions
                </Button>
                <Link href="/contact">
                  <Button 
                    variant="outline" 
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur px-8 py-4 rounded-xl text-lg font-medium hover:scale-105 transition-all duration-300"
                    data-testid="button-contact-support"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              {/* Glassmorphism Feature Box */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                    <Lightbulb className="w-8 h-8 text-white animate-float-rotate" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Quick Self-Service</h3>
                  <p className="text-white/80 mb-6">Get instant answers to common questions and reduce wait times</p>
                </div>
                
                {/* Mini Category Preview */}
                <div className="grid grid-cols-2 gap-3">
                  {categoryCounts.slice(0, 4).map((cat, index) => (
                    <div key={cat.name} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                      <div className="text-sm font-medium mb-1 group-hover:text-green-300 transition-colors">{cat.name}</div>
                      <div className="text-xs text-white/70">{cat.count} questions</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Search and Filter Section */}
      <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-teal-500/5"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Search Bar */}
          <div className="text-center mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-transparent bg-white/50 backdrop-blur focus:border-blue-300 focus:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl"
                data-testid="input-search-faq"
              />
            </div>
          </div>
          
          {/* Glassmorphism Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-xl px-6 py-3 font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg hover:shadow-xl border-0 hover:scale-105'
                    : 'bg-white/50 backdrop-blur border-white/30 hover:bg-white/70 hover:scale-105 shadow-md'
                }`}
                data-testid={`filter-${category.toLowerCase()}`}
              >
                {category}
                {category !== 'All' && (
                  <Badge variant="secondary" className="ml-2 bg-white/20 text-current border-0">
                    {faqData.filter(faq => faq.category === category).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
          
          {/* Sort Options */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground font-medium">Sort by:</span>
              <Button
                variant={sortBy === 'popular' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSortBy('popular')}
                className="rounded-lg"
                data-testid="sort-popular"
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Popular
              </Button>
              <Button
                variant={sortBy === 'trending' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSortBy('trending')}
                className="rounded-lg"
                data-testid="sort-trending"
              >
                <Star className="w-4 h-4 mr-1" />
                Trending
              </Button>
              <Button
                variant={sortBy === 'alphabetical' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSortBy('alphabetical')}
                className="rounded-lg"
                data-testid="sort-alphabetical"
              >
                <Filter className="w-4 h-4 mr-1" />
                A-Z
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modern FAQ Accordion Section */}
      <section className="py-20 bg-background relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {selectedCategory === 'All' ? 'All Questions' : `${selectedCategory} Questions`}
            </h2>
            <p className="text-xl text-muted-foreground">
              {searchTerm 
                ? `Found ${sortedFAQs.length} results for "${searchTerm}"`
                : `Browse through ${sortedFAQs.length} frequently asked questions`
              }
            </p>
          </div>
          
          <div className="space-y-6">
            {sortedFAQs.map((faq, index) => (
              <Card 
                key={faq.id} 
                className={`overflow-hidden transition-all duration-500 hover:shadow-2xl border-2 ${
                  openFAQ === faq.id 
                    ? 'border-gradient-to-r from-blue-300 to-teal-300 shadow-xl scale-[1.02]' 
                    : 'border-transparent hover:border-blue-200/50'
                } ${faq.popular ? 'bg-gradient-to-br from-blue-50/50 to-teal-50/50' : ''}`}
                style={{
                  background: faq.popular 
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(20, 184, 166, 0.05) 100%)' 
                    : undefined
                }}
              >
                {/* Question Header */}
                <button 
                  className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-teal-50/30" 
                  onClick={() => toggleFAQ(faq.id)}
                  data-testid={`faq-question-${faq.id}`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {faq.popular && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 animate-pulse-glow" data-testid={`badge-popular-${faq.id}`}>
                            <Star className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                        {faq.trending && (
                          <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white border-0 animate-gradient-shift" data-testid={`badge-trending-${faq.id}`}>
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs bg-white/50 backdrop-blur" data-testid={`badge-category-${faq.id}`}>
                          {faq.category}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground pr-4 hover:text-blue-600 transition-colors">
                        {faq.question}
                      </h3>
                      
                      {/* Question Stats */}
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {faq.views} views
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {faq.helpful} helpful
                        </div>
                        {faq.relatedQuestions && faq.relatedQuestions.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {faq.relatedQuestions.length} related
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <div className={`transform transition-all duration-300 ${openFAQ === faq.id ? 'rotate-180 scale-110' : ''}`}>
                        {openFAQ === faq.id ? (
                          <ChevronUp className="w-6 h-6 text-blue-500" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-muted-foreground hover:text-blue-500 transition-colors" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>
                
                {/* Answer Content with Animation */}
                {openFAQ === faq.id && (
                  <CardContent className="px-6 pb-6 pt-0 animate-in slide-in-from-top-2 duration-300">
                    <div className="bg-gradient-to-br from-slate-50/50 to-blue-50/30 rounded-xl p-6 border border-blue-100/50">
                      <div className="text-muted-foreground leading-relaxed mb-6" data-testid={`faq-answer-${faq.id}`}>
                        {faq.answer}
                      </div>
                      
                      {/* Feedback Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-foreground">Was this helpful?</span>
                          <div className="flex gap-2">
                            <Button
                              variant={userFeedback[faq.id] === 'helpful' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => handleFeedback(faq.id, 'helpful')}
                              className={`rounded-lg transition-all duration-300 ${
                                userFeedback[faq.id] === 'helpful' 
                                  ? 'bg-green-500 text-white scale-105' 
                                  : 'hover:bg-green-50 hover:text-green-600 hover:scale-105'
                              }`}
                              data-testid={`button-helpful-${faq.id}`}
                            >
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              Helpful ({faq.helpful})
                            </Button>
                            <Button
                              variant={userFeedback[faq.id] === 'not-helpful' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => handleFeedback(faq.id, 'not-helpful')}
                              className={`rounded-lg transition-all duration-300 ${
                                userFeedback[faq.id] === 'not-helpful' 
                                  ? 'bg-red-500 text-white scale-105' 
                                  : 'hover:bg-red-50 hover:text-red-600 hover:scale-105'
                              }`}
                              data-testid={`button-not-helpful-${faq.id}`}
                            >
                              <ThumbsDown className="w-4 h-4 mr-1" />
                              Not Helpful ({faq.notHelpful})
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform" data-testid={`button-bookmark-${faq.id}`}>
                            <Bookmark className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform" data-testid={`button-share-${faq.id}`}>
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Related Questions */}
                      {faq.relatedQuestions && faq.relatedQuestions.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-blue-100/50">
                          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4 text-blue-500" />
                            Related Questions
                          </h4>
                          <div className="space-y-2">
                            {getRelatedQuestions(faq.relatedQuestions).map((relatedFaq) => (
                              <button
                                key={relatedFaq.id}
                                onClick={() => toggleFAQ(relatedFaq.id)}
                                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors block text-left"
                                data-testid={`related-question-${relatedFaq.id}`}
                              >
                                • {relatedFaq.question}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
          
          {sortedFAQs.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No questions found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search terms or category filter</p>
              <Button onClick={() => {setSearchTerm(''); setSelectedCategory('All')}} data-testid="button-clear-filters">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Still Have Questions Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 75%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 25%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <MessageCircle className="w-10 h-10 text-white animate-float-rotate" />
            </div>
            
            <h2 className="text-4xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Can't find the answer you're looking for? Our expert team is ready to provide personalized assistance and detailed guidance for your specific needs.
            </p>
            
            {/* Contact Options */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <Phone className="w-6 h-6 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-medium mb-1">Phone Support</div>
                <div className="text-sm text-white/70">Available 24/7</div>
              </div>
              <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <Mail className="w-6 h-6 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-medium mb-1">Email Support</div>
                <div className="text-sm text-white/70">2hr response time</div>
              </div>
              <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <MessageCircle className="w-6 h-6 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-medium mb-1">Live Chat</div>
                <div className="text-sm text-white/70">Instant assistance</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl text-lg font-medium border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" 
                  data-testid="button-contact-us"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Our Team
                </Button>
              </Link>
              <Button 
                className="bg-white/10 backdrop-blur hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-medium border border-white/20 hover:scale-105 transition-all duration-300" 
                data-testid="button-schedule-call"
              >
                <Phone className="w-5 h-5 mr-2" />
                Schedule a Free Call
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Help Categories with Glassmorphism */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-teal-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/50 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/30">
              <Sparkles className="w-4 h-4 text-blue-500 animate-pulse-glow" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">SUPPORT OPTIONS</span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">How Can We Help You Today?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the support option that best fits your needs. Our team is ready to assist you with expert guidance and personalized solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group relative overflow-hidden bg-white/70 backdrop-blur border-2 border-transparent hover:border-blue-200/50 transition-all duration-500 hover:shadow-2xl card-hover-effect">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 animate-float-rotate">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-blue-600 transition-colors">Technical Support</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Get expert help with technical issues, bug reports, system troubleshooting, and implementation guidance from our certified specialists.
                </p>
                <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    24/7 Technical Support
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Expert Troubleshooting
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Priority Queue Access
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 hover:scale-105 transition-all duration-300" data-testid="button-technical-support">
                  <Zap className="w-4 h-4 mr-2" />
                  Get Technical Help
                </Button>
              </div>
            </Card>

            <Card className="group relative overflow-hidden bg-white/70 backdrop-blur border-2 border-transparent hover:border-teal-200/50 transition-all duration-500 hover:shadow-2xl card-hover-effect">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 animate-float-rotate" style={{animationDelay: '1s'}}>
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-teal-600 transition-colors">Project Consultation</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Discuss your project requirements, get technology recommendations, timeline estimates, and strategic planning guidance from our experts.
                </p>
                <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Free Consultation Call
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Technology Roadmap
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Custom Project Quotes
                  </div>
                </div>
                <Link href="/contact">
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white border-0 hover:scale-105 transition-all duration-300" data-testid="button-project-consultation">
                    <Target className="w-4 h-4 mr-2" />
                    Start Consultation
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="group relative overflow-hidden bg-white/70 backdrop-blur border-2 border-transparent hover:border-purple-200/50 transition-all duration-500 hover:shadow-2xl card-hover-effect">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 animate-float-rotate" style={{animationDelay: '2s'}}>
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-purple-600 transition-colors">Partnership Inquiries</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Explore partnership opportunities, reseller programs, strategic collaborations, and enterprise solutions tailored for your business.
                </p>
                <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Strategic Partnerships
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Enterprise Solutions
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Custom Agreements
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 hover:scale-105 transition-all duration-300" data-testid="button-partnership">
                  <Globe className="w-4 h-4 mr-2" />
                  Learn About Partnerships
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
