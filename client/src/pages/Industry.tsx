import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ExternalLink, CheckCircle, Star, TrendingUp, Zap, Shield, Code, Database, Cpu, Monitor, Smartphone, Globe, Settings, Award, Target, Clock, Users, Building2, Rocket, AlertTriangle } from 'lucide-react';
import { industriesConfig, IndustrySlug, industryIconMap } from '@/pages/industries/config';
import { caseStudiesData } from '@/data/caseStudies';
import Breadcrumbs from '@/components/Breadcrumbs';

// Helper function to get industry-specific hero images
const getHeroImage = (slug: IndustrySlug): string => {
  const heroImages = {
    'fintech-financial-services': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'media-entertainment-technology': 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'healthcare-medical-technology': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'ecommerce-retail-solutions': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'education-edtech-solutions': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
  };
  return heroImages[slug];
};

// Helper function to get solution-specific images
const getSolutionImage = (module: string, index: number): string => {
  const solutionImages: Record<string, string> = {
    'Security Architecture': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'Scalable Backend Systems': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'Frontend Development': 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'API & Integration Services': 'https://images.unsplash.com/photo-1518186233392-c232efbf2373?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'Streaming Technology': 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'Content Management': 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'Mobile Applications': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'AI & Analytics': 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'Telemedicine Solutions': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'Electronic Health Records': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'Mobile Health Apps': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'AI & Machine Learning': 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'E-commerce Platform': 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'Mobile Commerce': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'Inventory Management': 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'Learning Management System': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'Mobile Learning Apps': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'AI-Powered Learning': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'Virtual Classroom': 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
  };
  return solutionImages[module] || 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400';
};

// Helper function to get industry-specific user guide images
const getUserGuideImage = (slug: IndustrySlug): string => {
  const userGuideImages = {
    'fintech-financial-services': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'media-entertainment-technology': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'healthcare-medical-technology': 'https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'ecommerce-retail-solutions': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    'education-edtech-solutions': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
  };
  return userGuideImages[slug];
};

// Helper function to get industry-specific technology stacks
const getTechnologyStack = (slug: IndustrySlug) => {
  const techStacks = {
    'fintech-financial-services': [
      { name: 'Blockchain', icon: Shield, progress: 95 },
      { name: 'AI/ML', icon: Cpu, progress: 90 },
      { name: 'Cloud Security', icon: Database, progress: 98 },
      { name: 'API Development', icon: Code, progress: 92 }
    ],
    'media-entertainment-technology': [
      { name: 'Streaming Tech', icon: Monitor, progress: 95 },
      { name: 'Content Management', icon: Database, progress: 90 },
      { name: 'Mobile Apps', icon: Smartphone, progress: 88 },
      { name: 'AI Analytics', icon: Cpu, progress: 85 }
    ],
    'healthcare-medical-technology': [
      { name: 'HIPAA Compliance', icon: Shield, progress: 100 },
      { name: 'Telemedicine', icon: Monitor, progress: 92 },
      { name: 'Data Analytics', icon: TrendingUp, progress: 90 },
      { name: 'Mobile Health', icon: Smartphone, progress: 88 }
    ],
    'ecommerce-retail-solutions': [
      { name: 'E-commerce Platforms', icon: Globe, progress: 94 },
      { name: 'Payment Systems', icon: Shield, progress: 96 },
      { name: 'Mobile Commerce', icon: Smartphone, progress: 90 },
      { name: 'Analytics & AI', icon: TrendingUp, progress: 87 }
    ],
    'education-edtech-solutions': [
      { name: 'Learning Management', icon: Settings, progress: 93 },
      { name: 'Mobile Learning', icon: Smartphone, progress: 89 },
      { name: 'AI-Powered Learning', icon: Cpu, progress: 85 },
      { name: 'Virtual Classrooms', icon: Monitor, progress: 91 }
    ]
  };
  return techStacks[slug] || [];
};

// Helper function to get industry-specific metrics
const getIndustryMetrics = (slug: IndustrySlug) => {
  const metrics = {
    'fintech-financial-services': [
      { value: '99.9%', label: 'Uptime', icon: Clock },
      { value: '500ms', label: 'Response Time', icon: Zap },
      { value: '100%', label: 'Compliance', icon: Shield },
      { value: '$2.5B+', label: 'Processed', icon: TrendingUp }
    ],
    'media-entertainment-technology': [
      { value: '10M+', label: 'Concurrent Users', icon: Users },
      { value: '4K/8K', label: 'Streaming Quality', icon: Monitor },
      { value: '99%', label: 'Content Delivery', icon: Globe },
      { value: '50+', label: 'Platforms', icon: Building2 }
    ],
    'healthcare-medical-technology': [
      { value: '100%', label: 'HIPAA Compliant', icon: Shield },
      { value: '500K+', label: 'Patients Served', icon: Users },
      { value: '99.8%', label: 'Data Accuracy', icon: Target },
      { value: '24/7', label: 'Support Available', icon: Clock }
    ],
    'ecommerce-retail-solutions': [
      { value: '$5B+', label: 'Revenue Generated', icon: TrendingUp },
      { value: '50M+', label: 'Transactions', icon: Settings },
      { value: '99.9%', label: 'Payment Success', icon: CheckCircle },
      { value: '150+', label: 'Integrations', icon: Globe }
    ],
    'education-edtech-solutions': [
      { value: '1M+', label: 'Students Taught', icon: Users },
      { value: '500+', label: 'Institutions', icon: Building2 },
      { value: '95%', label: 'Completion Rate', icon: Target },
      { value: '24/7', label: 'Learning Access', icon: Clock }
    ]
  };
  return metrics[slug] || [];
};

export default function Industry() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const slug = params.slug as IndustrySlug;
  const [mounted, setMounted] = useState(false);

  // Check if the industry config exists, otherwise redirect to 404
  const industryConfig = industriesConfig[slug];
  
  useEffect(() => {
    setMounted(true);
    
    if (!industryConfig) {
      setLocation('/not-found');
      return;
    }

    // Set SEO meta tags
    document.title = `${industryConfig.title} | Talpro`;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', industryConfig.metaDescription);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', industryConfig.metaDescription);
      document.head.appendChild(metaDescription);
    }

    // Add Open Graph meta tags for better social media sharing
    const currentUrl = `${window.location.origin}/industries/${slug}`;
    
    // Helper function to set or create Open Graph meta tags
    const setOGTag = (property: string, content: string) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (ogTag) {
        ogTag.setAttribute('content', content);
      } else {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        ogTag.setAttribute('content', content);
        document.head.appendChild(ogTag);
      }
    };

    // Set Open Graph tags
    setOGTag('og:title', `${industryConfig.title} | Talpro`);
    setOGTag('og:description', industryConfig.metaDescription);
    setOGTag('og:type', 'website');
    setOGTag('og:url', currentUrl);
  }, [industryConfig, setLocation, slug]);

  if (!industryConfig) {
    return null; // Will redirect to 404
  }

  // Get the icon component dynamically from the icon map
  const IconComponent = industryIconMap[industryConfig.icon] || Building2;

  // Filter case studies by related IDs
  const relatedCaseStudies = caseStudiesData.filter(caseStudy => 
    industryConfig.relatedCaseStudyIds.includes(caseStudy.id)
  );

  // Get industry-specific data
  const techStack = getTechnologyStack(slug);
  const industryMetrics = getIndustryMetrics(slug);

  return (
    <div className="pt-16">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Industries', href: '/industries' },
          { label: industryConfig.shortName },
        ]}
      />
      {/* Enhanced Hero Section */}
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
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">INDUSTRY EXPERTISE</span>
                {industryConfig.tagline}
              </div>
              
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="w-20 h-20 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mr-6 animate-float-rotate group">
                  <IconComponent className="w-10 h-10 text-accent group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight" data-testid="industry-title">
                    <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">
                      {industryConfig.heroHeadline.split(' ').slice(0, 2).join(' ')}
                    </span><br />
                    <span className="bg-gradient-to-r from-teal-300 to-green-400 bg-clip-text text-transparent animate-gradient-shift">
                      {industryConfig.heroHeadline.split(' ').slice(2).join(' ')}
                    </span>
                  </h1>
                </div>
              </div>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0" data-testid="industry-subtitle">
                {industryConfig.heroSubheading}
              </p>

              {/* Industry Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto lg:mx-0">
                {industryMetrics.map((metric, index) => {
                  const MetricIcon = metric.icon;
                  return (
                    <div key={index} className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid={`hero-metric-${index}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <MetricIcon className="w-4 h-4 text-green-400" />
                        <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">{metric.value}</div>
                      </div>
                      <div className="text-xs text-white/70">{metric.label}</div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/contact">
                  <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-hero-cta">
                    <span className="relative z-10 flex items-center gap-2">
                      {industryConfig.ctaText}
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </Link>
                <Link href="/case-studies">
                  <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105" data-testid="button-view-case-studies">
                    View Case Studies
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-2xl animate-float-rotate"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <img 
                  src={getHeroImage(slug)} 
                  alt={`${industryConfig.title} workspace`}
                  className="rounded-2xl w-full h-auto shadow-2xl"
                />
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">Live Innovation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Showcase */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-blue-200/20 dark:border-blue-800/20">
              <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">TECHNOLOGY STACK</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Cutting-Edge</span><br />
              Technology Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our specialized technology stack designed specifically for {industryConfig.title.toLowerCase()} requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => {
              const TechIcon = tech.icon;
              return (
                <div key={index} className="card-hover-effect" data-testid={`tech-card-${index}`}>
                  <div className="stat-card-glass bg-gradient-to-br from-blue-50/80 to-teal-50/80 dark:from-blue-900/20 dark:to-teal-900/20 backdrop-blur-lg rounded-3xl p-6 border border-blue-200/30 dark:border-blue-800/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform animate-float-rotate">
                      <TechIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-3">
                      <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">{tech.name}</span>
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Expertise</span>
                        <span className="font-semibold text-foreground">{tech.progress}%</span>
                      </div>
                      <Progress value={tech.progress} className="h-2" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Industry Challenges */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-purple-200/20 dark:border-purple-800/20">
              <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">INDUSTRY CHALLENGES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6" data-testid="challenges-title">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Challenges</span> We<br />
              Solve Together
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understanding the unique challenges facing your industry is the first step to crafting effective solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industryConfig.challenges.map((challenge, index) => (
              <div key={challenge.id} className="card-hover-effect challenge-card-height" data-testid={`challenge-card-${challenge.id}`}>
                <div className="stat-card-glass bg-gradient-to-br from-red-50/80 to-orange-50/80 dark:from-red-900/20 dark:to-orange-900/20 backdrop-blur-lg rounded-3xl p-6 border border-red-200/30 dark:border-red-800/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group challenge-card-content">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform animate-float-rotate">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3" data-testid={`challenge-title-${challenge.id}`}>
                    <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">{challenge.title}</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed challenge-card-description" data-testid={`challenge-description-${challenge.id}`}>
                    {challenge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced TalPro Solutions */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-green-200/20 dark:border-green-800/20">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent font-bold">OUR SOLUTIONS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6" data-testid="solutions-title">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">How TalPro</span><br />
              Transforms Your Industry
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform modules are designed to tackle your specific industry challenges head-on.
            </p>
          </div>
          
          <div className="space-y-8">
            {industryConfig.solutions.map((solution, index) => (
              <div key={solution.id} className="card-hover-effect" data-testid={`solution-card-${solution.id}`}>
                <div className="stat-card-glass group relative overflow-hidden backdrop-blur-[16px] bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] p-8" 
                     style={{
                       background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                       backdropFilter: 'blur(16px)',
                       WebkitBackdropFilter: 'blur(16px)',
                       boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                     }}>
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg animate-float-rotate">
                          <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-gradient-to-r from-green-500/10 to-blue-500/10 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                          {solution.module}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold mb-4" data-testid={`solution-title-${solution.id}`}>
                        <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">{solution.title}</span>
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`solution-description-${solution.id}`}>
                        {solution.description}
                      </p>
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                          <Target className="w-4 h-4 text-green-600" />
                          Addresses challenges:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {solution.challengeIds.map(challengeId => {
                            const challenge = industryConfig.challenges.find(c => c.id === challengeId);
                            return challenge ? (
                              <Badge key={challengeId} variant="outline" className="text-xs bg-gradient-to-r from-green-500/5 to-blue-500/5 border-green-200 dark:border-green-800 hover:bg-gradient-to-r hover:from-green-500/10 hover:to-blue-500/10 transition-all duration-300">
                                {challenge.title}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                    <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-3xl blur-2xl"></div>
                      <img 
                        src={getSolutionImage(solution.module, index)} 
                        alt={solution.title}
                        className="relative rounded-2xl shadow-2xl w-full h-auto hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Specialized Services */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-900/20 dark:to-cyan-900/20 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 75%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 25%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-indigo-200/20 dark:border-indigo-800/20">
              <Settings className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent font-bold">SPECIALIZED SERVICES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6" data-testid="services-title">
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">Tailored Services</span><br />
              for Your Industry
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Specialized service offerings designed specifically for the unique needs of your sector.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {industryConfig.services.map((service, index) => (
              <div key={service.id} className="card-hover-effect" data-testid={`service-card-${service.id}`}>
                <div className="stat-card-glass bg-gradient-to-br from-indigo-50/80 to-cyan-50/80 dark:from-indigo-900/20 dark:to-cyan-900/20 backdrop-blur-lg rounded-3xl p-6 border border-indigo-200/30 dark:border-indigo-800/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform animate-float-rotate">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3" data-testid={`service-title-${service.id}`}>
                    <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">{service.title}</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid={`service-description-${service.id}`}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Case Studies Section */}
      {relatedCaseStudies.length > 0 && (
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 40% 60%, rgba(168, 85, 247, 0.1) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
          }}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-purple-200/20 dark:border-purple-800/20">
                <Star className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">SUCCESS STORIES</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6" data-testid="case-studies-title">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Proven Success</span><br />
                in Your Industry
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how we've helped companies like yours achieve remarkable results with innovative solutions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {relatedCaseStudies.map((caseStudy) => (
                <div key={caseStudy.id} className="card-hover-effect" data-testid={`case-study-card-${caseStudy.id}`}>
                  <div className="stat-card-glass bg-gradient-to-br from-purple-50/80 to-blue-50/80 dark:from-purple-900/20 dark:to-blue-900/20 backdrop-blur-lg rounded-3xl overflow-hidden border border-purple-200/30 dark:border-purple-800/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                    <div className="relative overflow-hidden">
                      <img 
                        src={caseStudy.image} 
                        alt={caseStudy.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                          {caseStudy.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground font-medium" data-testid={`case-study-client-${caseStudy.id}`}>
                          {caseStudy.client}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3" data-testid={`case-study-title-${caseStudy.id}`}>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{caseStudy.title}</span>
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed" data-testid={`case-study-description-${caseStudy.id}`}>
                        {caseStudy.description}
                      </p>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {caseStudy.metrics.map((metric, index) => (
                          <div key={index} className="text-center bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-xl p-3 border border-purple-200/20 dark:border-purple-800/20">
                            <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{metric.value}</div>
                            <div className="text-xs text-muted-foreground">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                      <Link href={`/case-studies/${caseStudy.id}`}>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300" data-testid={`button-case-study-${caseStudy.id}`}>
                          Read Full Case Study
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Enhanced User Guide/Educational Content */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
                <Award className="w-4 h-4 text-green-400" />
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">EXPERT INSIGHTS</span>
                Industry Knowledge
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6" data-testid="user-guide-title">
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">
                  {industryConfig.userGuideTitle}
                </span>
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed" data-testid="user-guide-content">
                {industryConfig.userGuideContent}
              </p>
              <Link href="/blog">
                <Button className="bg-white/10 backdrop-blur text-white border-2 border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 px-8 py-4" data-testid="button-read-more">
                  Read More Insights
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-2xl animate-float-rotate"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <img 
                  src={getUserGuideImage(slug)} 
                  alt={`${industryConfig.title} insights and thought leadership`}
                  className="rounded-2xl w-full h-auto shadow-2xl"
                />
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">Expert Guide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Call-to-Action */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 25% 75%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-teal-500/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-blue-200/20 dark:border-blue-800/20">
              <Rocket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">GET STARTED</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6" data-testid="cta-title">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Ready to Transform</span><br />
              Your {industryConfig.title.split(' ')[0]} Operations?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Let's discuss how TalPro Solutions can address your specific challenges and drive your business forward with innovative technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-main-cta">
                  <span className="relative z-10 flex items-center gap-2">
                    {industryConfig.ctaText}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
              <Link href="/about">
                <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-foreground transition-all duration-300 bg-background/50 backdrop-blur rounded-2xl border border-border hover:bg-background/70 hover:scale-105" data-testid="button-learn-more">
                  Learn More About Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}