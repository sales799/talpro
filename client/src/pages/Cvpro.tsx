import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { 
  ArrowRight, Shield, FileText, Users, Check, Eye, Brain, Target, 
  Building2, Briefcase, Rocket, Zap, Globe, CheckCircle2, Play, 
  ChevronRight, Star, Award, Database, Cpu, Cloud, Server, Network, 
  Phone, Mail, MapPin, Upload, BarChart3, Settings, Timer, MessageSquare,
  TrendingUp, Lock, Code2, Search, Filter, Download, Share
} from 'lucide-react';

const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: z.string().min(1, 'Work email is required').email('Invalid email address'),
  company: z.string().min(1, 'Company is required'),
  service: z.string().optional(),
  message: z.string().min(1, 'Message is required').min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Cvpro() {
  const [openFAQ, setOpenFAQ] = useState<string | undefined>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scorecardProgress, setScorecardProgress] = useState(0);
  const { toast } = useToast();

  // SEO meta tags management
  useEffect(() => {
    // Set document title
    document.title = "CVPRO by Talpro — AI Recruiter for Instant Shortlists";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'CVPRO by Talpro is an AI recruiter that parses resumes, extracts JD skills, bulk-processes profiles, and produces rubric-based scorecards for instant shortlists.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'CVPRO by Talpro is an AI recruiter that parses resumes, extracts JD skills, bulk-processes profiles, and produces rubric-based scorecards for instant shortlists.';
      document.head.appendChild(meta);
    }

    // Set Open Graph tags
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

    setOGTag('og:title', 'CVPRO by Talpro — AI Recruiter for Instant Shortlists');
    setOGTag('og:description', 'From resume parsing and JD skill extraction to rubric-based scoring and shortlist-ready outputs — all in one secure workflow.');
    setOGTag('og:type', 'website');

    // Set Twitter Card tags
    const setTwitterTag = (name: string, content: string) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (twitterTag) {
        twitterTag.setAttribute('content', content);
      } else {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', name);
        twitterTag.setAttribute('content', content);
        document.head.appendChild(twitterTag);
      }
    };

    setTwitterTag('twitter:card', 'summary_large_image');
    setTwitterTag('twitter:title', 'CVPRO by Talpro — AI Recruiter for Instant Shortlists');
    setTwitterTag('twitter:description', 'From resume parsing and JD skill extraction to rubric-based scoring and shortlist-ready outputs — all in one secure workflow.');

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = 'Talpro';
    };
  }, []);

  // Progress bar animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setScorecardProgress(81);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      service: 'CVPRO Demo Request',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: (data) => {
      setIsSubmitted(true);
      toast({
        title: "Demo Request Sent Successfully!",
        description: "Thanks, we'll reach out within one business day to schedule your personalized CVPRO demo.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "An error occurred while sending your demo request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-16">

      {/* Hero Section */}
      <section id="top" className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 text-white relative overflow-hidden">
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
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">AI recruiter</span>
                MVP live
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight" data-testid="hero-title">
                Hire faster with<br />
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">CVPRO</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0" data-testid="hero-description">
                CVPRO is Talpro's AI recruiter that grades every resume against your job description — at scale.
                It <strong>parses resumes</strong>, <strong>extracts JD skills</strong>, <strong>bulk‑processes profiles</strong>, and produces <strong>rubric‑based scorecards</strong> with clear explanations so you can move from intake to shortlist in minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" 
                  data-testid="button-book-demo"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Book a Demo
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
                <button 
                  onClick={() => scrollToSection('scorecard')}
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105"
                  data-testid="button-see-scorecard"
                >
                  See Sample Scorecard
                </button>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <span className="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm border border-white/20" data-testid="pill-resume-parsing">Resume Parsing</span>
                <span className="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm border border-white/20" data-testid="pill-jd-extraction">JD Skill Extraction</span>
                <span className="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm border border-white/20" data-testid="pill-bulk-processing">Bulk Profile Processing</span>
                <span className="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm border border-white/20" data-testid="pill-rubric-scoring">Rubric‑based Scoring</span>
                <span className="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm border border-white/20" data-testid="pill-explainable">Explainable Shortlists</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-2xl animate-float-rotate"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 stat-card-glass">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center" data-testid="stat-english-first">
                    <div className="text-2xl font-bold text-green-400">EN</div>
                    <div className="text-xs text-white/70">English-first</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center" data-testid="stat-mvp">
                    <div className="text-2xl font-bold text-blue-400">MVP</div>
                    <div className="text-xs text-white/70">Live Now</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center" data-testid="stat-users">
                    <div className="text-2xl font-bold text-purple-400">Internal</div>
                    <div className="text-xs text-white/70">& External</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center" data-testid="stat-speed">
                    <div className="text-2xl font-bold text-teal-400">Fast</div>
                    <div className="text-xs text-white/70">Shortlists</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition - Feature Cards */}
      <section id="features" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="features-title">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">From intake to shortlist</span><br />
              <span className="text-foreground">— in one flow</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stop tab‑hopping. CVPRO centralizes the screening workflow and gives you a defensible, repeatable way to select candidates.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Why CVPRO Card */}
            <Card className="card-hover-effect stat-card-glass bg-white/50 dark:bg-slate-800/50 border-0 lg:col-span-1" data-testid="card-why-cvpro">
              <CardContent className="p-6">
                <div className="w-16 h-16 mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center icon-hover-rotate">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2">Why CVPRO</div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Consistent, Fast, Clear</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Consistency:</strong> rubric‑based scoring that reflects your hiring criteria</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Speed:</strong> bulk processing for large profile sets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Clarity:</strong> transparent explanations you can share with stakeholders</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Core Capabilities Card */}
            <Card className="card-hover-effect stat-card-glass bg-white/50 dark:bg-slate-800/50 border-0 lg:col-span-1" data-testid="card-core-capabilities">
              <CardContent className="p-6">
                <div className="w-16 h-16 mb-4 bg-gradient-to-r from-purple-500 to-teal-600 rounded-2xl flex items-center justify-center icon-hover-rotate">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-2">Available today</div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Core capabilities (MVP)</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Resume parsing & normalization</strong> (PDF/DOCX)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>JD skill extraction</strong> with must‑have / good‑to‑have mapping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Bulk profile processing</strong> for high‑volume roles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Rubric‑based scoring</strong> with adjustable weights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Shareable scorecards</strong> for hiring managers</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">Internal & External Users</span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">English‑only</span>
                </div>
              </CardContent>
            </Card>

            {/* Roadmap Card */}
            <Card className="card-hover-effect stat-card-glass bg-white/50 dark:bg-slate-800/50 border-0 lg:col-span-1" data-testid="card-roadmap">
              <CardContent className="p-6">
                <div className="w-16 h-16 mb-4 bg-gradient-to-r from-teal-500 to-green-600 rounded-2xl flex items-center justify-center icon-hover-rotate">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wide mb-2">Roadmap</div>
                <h3 className="text-xl font-bold mb-3 text-foreground">What's next</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Multi‑language support beyond English</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Deeper ATS integrations (e.g., export & sync)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Admin controls: templates, role‑based access, audit logs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>API & webhooks for custom workflows</span>
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3 italic">
                  Note: roadmap items are under active evaluation and may change.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-12">
                <div className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2">How it works</div>
                <h2 className="text-4xl font-bold mb-4" data-testid="how-it-works-title">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">Five steps to an</span><br />
                  <span className="text-foreground">explainable shortlist</span>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl border border-white/20 dark:border-slate-600/20" data-testid="step-1">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <strong>Upload</strong> resumes (PDF/DOCX) and the target JD.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl border border-white/20 dark:border-slate-600/20" data-testid="step-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <strong>Extract</strong> skills from the JD; confirm must‑have vs good‑to‑have.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl border border-white/20 dark:border-slate-600/20" data-testid="step-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <strong>Calibrate</strong> weights/rubric to reflect your hiring criteria.
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl border border-white/20 dark:border-slate-600/20" data-testid="step-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <div>
                      <strong>Score</strong> candidates in bulk with per‑criterion explanations.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl border border-white/20 dark:border-slate-600/20" data-testid="step-5">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">5</span>
                    </div>
                    <div>
                      <strong>Share</strong> a shortlist & scorecards with stakeholders, then refine.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl border border-white/20 dark:border-slate-600/20" data-testid="step-iterate">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">⋯</span>
                    </div>
                    <div>
                      <strong>Iterate</strong> quickly across roles while maintaining consistency.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sample Scorecard */}
      <section id="scorecard" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-12">
                <div className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-2">Transparent evaluation</div>
                <h2 className="text-4xl font-bold mb-4" data-testid="scorecard-title">
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">Sample candidate</span><br />
                  <span className="text-foreground">scorecard</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  An illustrative snapshot of rubric‑based scoring. Adjust weights to match your hiring criteria.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Scoring Table */}
                <div className="overflow-x-auto" data-testid="scoring-table">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-3 px-2 font-semibold text-foreground">Criterion</th>
                        <th className="text-left py-3 px-2 font-semibold text-foreground">Weight</th>
                        <th className="text-left py-3 px-2 font-semibold text-foreground">Candidate Match</th>
                        <th className="text-left py-3 px-2 font-semibold text-foreground">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <td className="py-3 px-2 text-sm">Must‑have skills</td>
                        <td className="py-3 px-2 text-sm font-medium">40%</td>
                        <td className="py-3 px-2 text-sm text-muted-foreground">Strong alignment with JD keywords</td>
                        <td className="py-3 px-2 text-sm font-bold text-green-600">36/40</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <td className="py-3 px-2 text-sm">Good‑to‑have skills</td>
                        <td className="py-3 px-2 text-sm font-medium">20%</td>
                        <td className="py-3 px-2 text-sm text-muted-foreground">Partial coverage; learning curve acceptable</td>
                        <td className="py-3 px-2 text-sm font-bold text-blue-600">14/20</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <td className="py-3 px-2 text-sm">Relevant experience</td>
                        <td className="py-3 px-2 text-sm font-medium">20%</td>
                        <td className="py-3 px-2 text-sm text-muted-foreground">4.5 years in similar roles</td>
                        <td className="py-3 px-2 text-sm font-bold text-blue-600">16/20</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <td className="py-3 px-2 text-sm">Certifications</td>
                        <td className="py-3 px-2 text-sm font-medium">10%</td>
                        <td className="py-3 px-2 text-sm text-muted-foreground">Foundational certs present</td>
                        <td className="py-3 px-2 text-sm font-bold text-purple-600">7/10</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <td className="py-3 px-2 text-sm">Communication</td>
                        <td className="py-3 px-2 text-sm font-medium">10%</td>
                        <td className="py-3 px-2 text-sm text-muted-foreground">Clear, structured resume</td>
                        <td className="py-3 px-2 text-sm font-bold text-purple-600">8/10</td>
                      </tr>
                      <tr className="bg-slate-50 dark:bg-slate-800/50">
                        <td className="py-3 px-2 text-sm font-bold">Total</td>
                        <td className="py-3 px-2 text-sm">—</td>
                        <td className="py-3 px-2 text-sm">—</td>
                        <td className="py-3 px-2 text-lg font-bold text-green-600">81/100</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-sm text-muted-foreground mt-4 italic">
                    Explanation excerpt: "Matched 12/14 must‑have skills (e.g., React, Node.js, AWS). Good‑to‑have gaps: Docker, Kubernetes."
                  </p>
                </div>

                {/* Shortlist Readiness */}
                <div className="bg-white/50 dark:bg-slate-700/50 rounded-xl p-6 border border-white/20 dark:border-slate-600/20" data-testid="shortlist-readiness">
                  <h3 className="text-xl font-bold mb-4 text-foreground">Shortlist readiness</h3>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-4 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full transition-all duration-1000 ease-out animate-progress-pulse"
                      style={{ width: `${scorecardProgress}%` }}
                      data-testid="progress-bar"
                    ></div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    This candidate crosses your configured shortlist threshold.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">Explainability</span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">Auditable</span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">Shareable</span>
                  </div>
                  
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="btn-gradient-hover w-full py-3 px-4 font-semibold text-white rounded-xl shadow-lg"
                    data-testid="button-scorecard-walkthrough"
                  >
                    Get a live scorecard walkthrough
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Security & Responsible AI */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Trust & Privacy */}
            <Card className="card-hover-effect stat-card-glass bg-white/50 dark:bg-slate-800/50 border-0" data-testid="card-trust-privacy">
              <CardContent className="p-6">
                <div className="w-16 h-16 mb-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center icon-hover-rotate">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-bold text-green-600 dark:text-green-400 uppercase tracking-wide mb-2">Trust & privacy</div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Designed for responsible hiring</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Data control:</strong> configurable retention and deletion policies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Privacy‑first:</strong> we never sell candidate data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Human‑in‑the‑loop:</strong> reviewers can adjust and override scores</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Transparency:</strong> every score is paired with a plain‑language explanation</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4 italic">
                  Compliance posture and security add‑ons available on request.
                </p>
              </CardContent>
            </Card>

            {/* Where It Fits */}
            <Card className="card-hover-effect stat-card-glass bg-white/50 dark:bg-slate-800/50 border-0" data-testid="card-ideal-teams">
              <CardContent className="p-6">
                <div className="w-16 h-16 mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center icon-hover-rotate">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2">Where it fits</div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Ideal for these teams</h3>
                <ul className="space-y-3 text-muted-foreground mb-4">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Talent teams screening high‑volume roles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Hiring managers who want objective, explainable shortlists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>GCC/RPO/MSP programs that need consistency across locations</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">IT / Cloud / Data</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">ERP (Oracle / Microsoft)</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">Support & Service Desk</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-12">
                <div className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2">FAQ</div>
                <h2 className="text-4xl font-bold mb-4" data-testid="faq-title">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">Questions</span><br />
                  <span className="text-foreground">teams ask</span>
                </h2>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Accordion type="single" collapsible value={openFAQ} onValueChange={setOpenFAQ}>
                    <AccordionItem value="file-types" data-testid="faq-file-types">
                      <AccordionTrigger className="text-left font-semibold">
                        What file types are supported today?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        PDF and DOCX resumes work best in the current MVP. Additional types are being evaluated.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="languages" data-testid="faq-languages">
                      <AccordionTrigger className="text-left font-semibold">
                        Is CVPRO available in languages other than English?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Today's release is English‑only. Multi‑language support is on the roadmap.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="rubric" data-testid="faq-rubric">
                      <AccordionTrigger className="text-left font-semibold">
                        Can we tailor the scoring rubric?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes. You can set must‑have vs good‑to‑have skills and adjust weights to mirror your hiring criteria.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="space-y-4">
                  <Accordion type="single" collapsible value={openFAQ} onValueChange={setOpenFAQ}>
                    <AccordionItem value="ats-integration" data-testid="faq-ats">
                      <AccordionTrigger className="text-left font-semibold">
                        Does it integrate with our ATS?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Basic sharing and export are available now. Deeper ATS integrations are planned — talk to us about your stack.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="bias" data-testid="faq-bias">
                      <AccordionTrigger className="text-left font-semibold">
                        How does CVPRO handle bias?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        We focus on skill‑ and criteria‑based scoring with human review. Explanations make decisions auditable and adjustable.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="users" data-testid="faq-users">
                      <AccordionTrigger className="text-left font-semibold">
                        Who can use CVPRO?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        It supports internal Talpro users and approved external collaborators in the current release.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact/Demo Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 rounded-full mb-6">
              <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">GET STARTED</span>
            </div>
            <h2 className="text-4xl font-bold mb-4" data-testid="contact-title">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">Bring explainable AI to</span><br />
              <span className="text-foreground">your screening workflow</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From upload to shortlist, CVPRO keeps hiring objective, fast, and defensible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="card-hover-effect stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-xl rounded-3xl p-8 relative">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow shadow-lg">
                      <Check className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Thank You!</span>
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      We've received your demo request and will get back to you within one business day to schedule your personalized CVPRO demo.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)} 
                      className="btn-gradient-hover"
                      data-testid="button-send-another"
                    >
                      Send Another Request
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-600 rounded-2xl flex items-center justify-center animate-float-rotate">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">
                          <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Request a Demo</span>
                        </h3>
                        <p className="text-muted-foreground">See CVPRO in action</p>
                      </div>
                    </div>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground font-semibold">First Name *</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="John" 
                                    {...field} 
                                    className="bg-white/50 dark:bg-slate-700/50 border-white/30 dark:border-slate-600/30 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                                    data-testid="input-first-name"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground font-semibold">Last Name *</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Doe" 
                                    {...field}
                                    className="bg-white/50 dark:bg-slate-700/50 border-white/30 dark:border-slate-600/30 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                                    data-testid="input-last-name"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-semibold">Work Email *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder="john@company.com" 
                                  {...field}
                                  className="bg-white/50 dark:bg-slate-700/50 border-white/30 dark:border-slate-600/30 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                                  data-testid="input-email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-semibold">Company *</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your Company" 
                                  {...field}
                                  className="bg-white/50 dark:bg-slate-700/50 border-white/30 dark:border-slate-600/30 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                                  data-testid="input-company"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-semibold">Tell us about your hiring needs *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  rows={4}
                                  placeholder="Tell us about your current hiring challenges, volume of candidates you screen, and what you'd like to see in a CVPRO demo..."
                                  className="resize-none bg-white/50 dark:bg-slate-700/50 border-white/30 dark:border-slate-600/30 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                                  {...field}
                                  data-testid="textarea-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full btn-gradient-hover py-4 text-lg font-semibold"
                          disabled={contactMutation.isPending}
                          data-testid="button-submit-demo-request"
                        >
                          {contactMutation.isPending ? (
                            <span className="flex items-center gap-2">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Sending Request...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Request Demo
                              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </span>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </>
                )}
              </div>
            </div>

            {/* CTA Strip */}
            <div className="space-y-8">
              <Card className="card-hover-effect stat-card-glass bg-white/50 dark:bg-slate-800/50 border-0" data-testid="card-cta-info">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-6">
                    <div>
                      <div className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2">Future. Powered</div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">CV.PRO by Talpro</h3>
                      <p className="text-sm text-muted-foreground">From upload to shortlist, CVPRO keeps hiring objective, fast, and defensible.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <button 
                        onClick={() => scrollToSection('features')}
                        className="btn-gradient-hover px-6 py-3 font-semibold text-white rounded-xl shadow-lg"
                        data-testid="button-view-features"
                      >
                        View Features
                      </button>
                      <button 
                        onClick={() => scrollToSection('how')}
                        className="bg-white/20 backdrop-blur px-6 py-3 font-semibold text-white rounded-xl border border-white/20 hover:bg-white/30 transition-all duration-300"
                        data-testid="button-how-it-works"
                      >
                        How It Works
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info Cards */}
              <div className="space-y-4">
                <Card className="card-hover-effect stat-card-glass bg-white/50 dark:bg-slate-800/50 border-0" data-testid="card-mvp-info">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">MVP Available Now</h4>
                        <p className="text-sm text-muted-foreground">
                          English-first release supporting internal and external users with full resume parsing and scoring capabilities.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover-effect stat-card-glass bg-white/50 dark:bg-slate-800/50 border-0" data-testid="card-support-info">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">Expert Support</h4>
                        <p className="text-sm text-muted-foreground">
                          Get setup assistance, training, and ongoing support from our recruitment technology specialists.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}