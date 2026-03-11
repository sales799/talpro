import { useParams, Link } from 'wouter';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Clock, Users, ExternalLink, CheckCircle, Target, Trophy, Zap, Star, Award, TrendingUp, Code, Database, Smartphone, Brain, Cloud, Server, Globe, Monitor, Shield, Rocket, Building2, Heart, Play, Lightbulb, Settings, Layout } from 'lucide-react';
import { caseStudiesData } from '@/data/caseStudies';
import { analytics } from '@/lib/analytics';
import { trackConversionWithValue } from '@/lib/conversionTracking';
import CaseStudyHero from '@/components/case-study/CaseStudyHero';
import CaseStudyMetrics from '@/components/case-study/CaseStudyMetrics';
import CaseStudyTestimonial from '@/components/case-study/CaseStudyTestimonial';
import CaseStudyMediaGallery from '@/components/case-study/CaseStudyMediaGallery';

export default function CaseStudyDetail() {
  const { id } = useParams();
  const [scrollProgress, setScrollProgress] = useState(0);

  const caseStudy = caseStudiesData.find(study => study.id === parseInt(id || '0'));

  // Set meta tags for case study
  useEffect(() => {
    const originalTitle = document.title;
    let metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content') || null;
    const tagExisted = !!metaDescription;
    
    if (caseStudy) {
      document.title = `${caseStudy.title} - Success Story | TalPro Case Studies`;
      
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', `${caseStudy.description} Learn how TalPro helped ${caseStudy.client} achieve remarkable results with innovative technology solutions.`);
      
      analytics.trackCaseStudyView(caseStudy.title, caseStudy.id);
      
      trackConversionWithValue('CASE_STUDY_VIEW');
    } else {
      document.title = 'Case Study Not Found | TalPro';
    }

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
  }, [caseStudy]);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Technology icon mapping
  const getTechIcon = (tech: string) => {
    const icons: { [key: string]: JSX.Element } = {
      'React': <Code className="w-5 h-5" />,
      'Node.js': <Server className="w-5 h-5" />,
      'AWS': <Cloud className="w-5 h-5" />,
      'PostgreSQL': <Database className="w-5 h-5" />,
      'MongoDB': <Database className="w-5 h-5" />,
      'TypeScript': <Code className="w-5 h-5" />,
      'JavaScript': <Code className="w-5 h-5" />,
      'Python': <Code className="w-5 h-5" />,
      'Docker': <Settings className="w-5 h-5" />,
      'Kubernetes': <Settings className="w-5 h-5" />,
      'React Native': <Smartphone className="w-5 h-5" />,
      'Flutter': <Smartphone className="w-5 h-5" />,
      'Swift': <Smartphone className="w-5 h-5" />,
      'Kotlin': <Smartphone className="w-5 h-5" />,
      'TensorFlow': <Brain className="w-5 h-5" />,
      'PyTorch': <Brain className="w-5 h-5" />,
      'GraphQL': <Globe className="w-5 h-5" />,
      'Redis': <Database className="w-5 h-5" />,
      'Elasticsearch': <Database className="w-5 h-5" />,
      'Vue.js': <Code className="w-5 h-5" />,
      'Angular': <Code className="w-5 h-5" />,
      'Laravel': <Server className="w-5 h-5" />,
      'Django': <Server className="w-5 h-5" />,
      'Spring Boot': <Server className="w-5 h-5" />,
      'MySQL': <Database className="w-5 h-5" />,
      'Figma': <Layout className="w-5 h-5" />,
      'Adobe XD': <Layout className="w-5 h-5" />
    };
    return icons[tech] || <Code className="w-5 h-5" />;
  };

  if (!caseStudy) {
    return (
      <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-600 via-purple-700 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        <div className="flex items-center justify-center min-h-screen relative z-10">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <Target className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Case Study</span><br />
              Not Found
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-md mx-auto">The case study you're looking for doesn't exist or has been moved.</p>
            <Button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-back-case-studies" asChild>
              <Link href="/case-studies">
                <span className="relative z-10 flex items-center gap-2">
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                  Back to Case Studies
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 relative">
      {/* Sticky Progress Indicator */}
      <div className="fixed top-16 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-white/20 dark:border-slate-800/20">
        <Progress value={scrollProgress} className="h-1 rounded-none animate-progress-pulse" data-testid="progress-reading" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <Link href="/case-studies" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors" data-testid="link-back-case-studies">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Case Studies
          </Link>
        </div>
      </div>

      <CaseStudyHero caseStudy={caseStudy} />

      {caseStudy.mediaAssets && caseStudy.mediaAssets.length > 0 && (
        <CaseStudyMediaGallery mediaAssets={caseStudy.mediaAssets} />
      )}

      <CaseStudyMetrics metrics={caseStudy.metrics} />

      {/* Enhanced Challenge & Solution */}
      {caseStudy.challenge && caseStudy.solution && (
        <section id="challenge" className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
          }}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full mb-6">
                <Lightbulb className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">PROBLEM & SOLUTION</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">From Challenge</span><br />
                <span className="text-foreground">to Success</span>
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="journey-card-wrapper h-full">
                <div className="group stat-card-glass bg-gradient-to-br from-red-50/80 to-orange-50/80 dark:from-red-900/20 dark:to-orange-900/20 backdrop-blur-lg rounded-3xl p-8 border border-red-200/30 dark:border-red-800/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 h-full relative overflow-hidden">
                  <div className="journey-card-bg absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full -translate-y-16 translate-x-16 transition-transform duration-700"></div>
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg animate-float-rotate group-hover:scale-110 transition-transform">
                      <Target className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-6">
                      <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">The Challenge</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{caseStudy.challenge}</p>
                  </div>
                </div>
              </div>

              <div className="journey-card-wrapper h-full">
                <div className="group stat-card-glass bg-gradient-to-br from-green-50/80 to-teal-50/80 dark:from-green-900/20 dark:to-teal-900/20 backdrop-blur-lg rounded-3xl p-8 border border-green-200/30 dark:border-green-800/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 h-full relative overflow-hidden">
                  <div className="journey-card-bg absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-full -translate-y-16 translate-x-16 transition-transform duration-700"></div>
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg animate-float-rotate group-hover:scale-110 transition-transform">
                      <Zap className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-6">
                      <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Our Solution</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{caseStudy.solution}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Technology Stack */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)`,
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6">
              <Settings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TECHNOLOGY STACK</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Cutting-Edge</span><br />
              <span className="text-foreground">Technologies</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Modern tools and frameworks that power exceptional digital experiences and robust solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {caseStudy.technologies.map((tech, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-slate-700/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform animate-float-rotate shadow-md">
                    {getTechIcon(tech)}
                  </div>
                  <Badge variant="outline" className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-blue-200 dark:border-blue-800 px-3 py-1">
                    {tech}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Results Section */}
      {caseStudy.results && (
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 10% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 90% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
          }}></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-full mb-6">
                <Award className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-semibold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">DETAILED OUTCOMES</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Project Results</span><br />
                <span className="text-foreground">& Impact</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive breakdown of all achievements, improvements, and business value delivered.
              </p>
            </div>
            
            <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl">
              <div className="grid md:grid-cols-2 gap-8">
                {caseStudy.results.map((result, index) => (
                  <div key={index} className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-300">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform animate-pulse-glow shadow-md">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">{result}</p>
                      <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full w-full animate-progress-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {caseStudy.testimonial && (
        <CaseStudyTestimonial testimonial={caseStudy.testimonial} index={0} />
      )}

      {caseStudy.testimonials && caseStudy.testimonials.length > 0 && (
        <>
          {caseStudy.testimonials.map((testimonial, index) => (
            <CaseStudyTestimonial key={index} testimonial={testimonial} index={index} />
          ))}
        </>
      )}

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-700 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-float-rotate opacity-60"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse-glow opacity-40"></div>
          <div className="absolute bottom-32 left-20 w-8 h-8 bg-gradient-to-r from-teal-400 to-green-400 rounded-full animate-float-rotate opacity-30"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-float-rotate shadow-2xl">
              <Rocket className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Ready to Start</span><br />
            Your Success Story?
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Let's discuss how we can help you achieve similar results for your business. Transform your ideas into reality with our proven expertise and innovative approach.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button className="btn-gradient-hover group relative inline-flex items-center justify-center px-10 py-5 font-semibold text-white rounded-2xl shadow-lg text-lg" data-testid="button-get-started" asChild>
              <Link href="/contact">
                <span className="relative z-10 flex items-center gap-3">
                  <Rocket className="w-6 h-6" />
                  Get Started Today
                  <ArrowLeft className="w-6 h-6 rotate-180 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
            
            <Button className="group relative inline-flex items-center justify-center px-10 py-5 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 text-lg" data-testid="button-view-more-case-studies" asChild>
              <Link href="/case-studies">
                <span className="flex items-center gap-3">
                  <ExternalLink className="w-6 h-6" />
                  View More Case Studies
                </span>
              </Link>
            </Button>
          </div>
          
          {/* Success Indicators */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <Award className="w-8 h-8 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-lg font-bold text-green-400">500+</div>
              <div className="text-xs text-white/70">Success Stories</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <Heart className="w-8 h-8 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-lg font-bold text-green-400">97%</div>
              <div className="text-xs text-white/70">Client Satisfaction</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <Globe className="w-8 h-8 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-lg font-bold text-green-400">Global</div>
              <div className="text-xs text-white/70">Reach</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}