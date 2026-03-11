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
  ArrowRight, Shield, Settings, BarChart3, Users, Check, 
  Eye, Lock, FileText, Code2, Timer, Upload, Mic, Video, 
  Brain, Target, Building2, Briefcase, Rocket, Zap, Globe,
  CheckCircle2, Play, ChevronRight, Star, Award, Database,
  Cpu, Cloud, Server, Network, Phone, Mail, MapPin
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

export default function Hireiq() {
  const [openFAQ, setOpenFAQ] = useState<string | undefined>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // SEO meta tags management
  useEffect(() => {
    // Set document title
    document.title = "HIREIQ by Talpro — AI‑Powered Talent Assessments";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'HIREIQ by Talpro helps you run cheat‑resistant, role‑based assessments with AI proctoring, instant scoring, and analytics—at any scale.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'HIREIQ by Talpro helps you run cheat‑resistant, role‑based assessments with AI proctoring, instant scoring, and analytics—at any scale.';
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

    setOGTag('og:title', 'HIREIQ by Talpro — AI‑Powered Talent Assessments');
    setOGTag('og:description', 'HIREIQ by Talpro helps you run cheat‑resistant, role‑based assessments with AI proctoring, instant scoring, and analytics—at any scale.');
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
    setTwitterTag('twitter:title', 'HIREIQ by Talpro — AI‑Powered Talent Assessments');
    setTwitterTag('twitter:description', 'HIREIQ by Talpro helps you run cheat‑resistant, role‑based assessments with AI proctoring, instant scoring, and analytics—at any scale.');

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = 'Talpro';
    };
  }, []);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      service: 'HIREIQ Demo Request',
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
        description: "Thanks, we'll reach out within one business day to schedule your personalized HIREIQ demo.",
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
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">HIREIQ by Talpro</span>
                Intelligence. Applied.
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight" data-testid="hero-title">
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">HIREIQ</span><br />
                by Talpro
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0" data-testid="hero-description">
                Smarter, faster, fairer hiring with AI‑powered, cheat‑resistant assessments—fully white‑labeled to your brand.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" 
                  data-testid="button-request-demo"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Request a Demo
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105"
                  data-testid="button-explore-features"
                >
                  Explore Features
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-2xl animate-float-rotate"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 stat-card-glass">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">AI</div>
                    <div className="text-xs text-white/70">Powered</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">99.9%</div>
                    <div className="text-xs text-white/70">Secure</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">10K+</div>
                    <div className="text-xs text-white/70">Scale</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-teal-400">Real-time</div>
                    <div className="text-xs text-white/70">Results</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why HIREIQ - Value Pillars */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="why-hireiq-title">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">Why HIREIQ</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="card-hover-effect stat-card-glass bg-white/50 dark:bg-slate-800/50 border-0" data-testid="pillar-ai-proctoring">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center icon-hover-rotate">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">AI Proctoring & Security</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Face/ID checks, browser lockdown, tab‑switch detection, and session recording for integrity.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover-effect stat-card-glass bg-white/50 dark:bg-slate-800/50 border-0" data-testid="pillar-role-based">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-teal-600 rounded-2xl flex items-center justify-center icon-hover-rotate">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Role‑Based & Custom Tests</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Use ready templates or build your own with section weights, time windows, and question pools.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover-effect stat-card-glass bg-white/50 dark:bg-slate-800/50 border-0" data-testid="pillar-instant-scoring">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-teal-500 to-green-600 rounded-2xl flex items-center justify-center icon-hover-rotate">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Instant Scoring & Insights</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Auto‑scored results, per‑skill breakdowns, percentiles, leaderboards, and easy exports.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover-effect stat-card-glass bg-white/50 dark:bg-slate-800/50 border-0" data-testid="pillar-scales">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center icon-hover-rotate">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Scales from 10 to 10,000</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Cloud performance, SSO/RBAC, and enterprise‑grade controls for global hiring drives.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="features-title">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">Everything you need to assess talent—end to end</span>
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Proctoring & Governance */}
              <Card className="card-hover-effect bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-0" data-testid="feature-proctoring">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">Proctoring & Governance</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Photo/ID verification, face match prompts
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Browser lockdown & tab‑switch alerts
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Audio/video stream monitoring and anomaly flags
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Randomized questions, section timers, negative marking
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Candidate consent and privacy notices
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Question Types */}
              <Card className="card-hover-effect bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-950/30 dark:to-green-950/30 border-0" data-testid="feature-question-types">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">Question Types</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          MCQ, multi‑select, short/long answer
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Coding (Python, Java, JS, C/C++), SQL with test cases
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Case studies & file uploads
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Typing speed & accuracy
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Audio/video responses & situational judgement
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Test Builder */}
              <Card className="card-hover-effect bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-0" data-testid="feature-test-builder">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">Test Builder</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Start from templates or create from scratch
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Blueprints with section weights and cutoffs
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Item banks & randomization
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Preview mode and pilot runs
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Analytics & Decisions */}
              <Card className="card-hover-effect bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border-0" data-testid="feature-analytics">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">Analytics & Decisions</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Skill‑wise scorecards and percentiles
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Leaderboards and auto‑shortlists
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          CSV export, APIs & webhooks
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Audit trails for compliance
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Integrations & Workflow */}
              <Card className="card-hover-effect bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-0" data-testid="feature-integrations">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">Integrations & Workflow</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Bulk invites via CSV or secure link
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Email templates with branding
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          ATS/HRIS integration via API/webhooks
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Slack/Teams notifications (optional)
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Branding & Access */}
              <Card className="card-hover-effect bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-0" data-testid="feature-branding">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">Branding & Access</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          White‑label experience with your logo & theme
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          SSO (SAML/OAuth) and role‑based access control
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          Region-aware data handling and retention policies
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Role Templates */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="role-templates-title">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">Ready templates for in‑demand roles</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Use or adapt pre‑built blueprints to move fast—then fine‑tune skills, difficulty, and scoring.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Senior Data Engineer (Azure Databricks)',
              'FortiGate Network Engineer',
              'Oracle Cloud P2P Functional Consultant',
              'Service Desk L2 Analyst',
              'Configuration Manager (ServiceNow CMDB)',
              'Microsoft Dynamics 365 CRM Senior Consultant',
              'IFS ERP Support Analyst',
              '.NET Full Stack Developer',
              'Oracle EBS Technical Consultant',
              'API Engineer / Twilio Flex Specialist',
              'Creative Designer'
            ].map((role, index) => (
              <div
                key={index}
                className="bg-white/50 dark:bg-slate-800/50 stat-card-glass rounded-xl p-4 text-center card-hover-effect"
                data-testid={`role-template-${index}`}
              >
                <div className="w-10 h-10 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm font-medium text-foreground">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="use-cases-title">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">Built for every hiring motion</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="card-hover-effect stat-card-glass bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30 border-0" data-testid="use-case-campus">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center icon-hover-rotate">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Campus & High‑Volume</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Secure large drives with bulk scheduling and fair, scalable proctoring.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover-effect stat-card-glass bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/30 dark:to-pink-950/30 border-0" data-testid="use-case-technical">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center icon-hover-rotate">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Technical & Digital</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Deep skills coverage for engineering, data, cloud, network, and ERP roles.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover-effect stat-card-glass bg-gradient-to-br from-teal-50 to-green-100 dark:from-teal-950/30 dark:to-green-950/30 border-0" data-testid="use-case-business">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-teal-500 to-green-600 rounded-2xl flex items-center justify-center icon-hover-rotate">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Business & Customer‑Facing</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sales, support, operations, and situational judgement.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover-effect stat-card-glass bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950/30 dark:to-red-950/30 border-0" data-testid="use-case-leadership">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center icon-hover-rotate">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Leadership & Psychometrics</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Behavior, communication, and decision‑making scenarios.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="how-it-works-title">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">From role to shortlist in minutes</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6">
            {[
              { step: 1, title: 'Define role & competencies', icon: Target },
              { step: 2, title: 'Pick a template or build your own', icon: Settings },
              { step: 3, title: 'Configure governance (proctoring, timers, cutoffs)', icon: Shield },
              { step: 4, title: 'Invite candidates (CSV or secure link)', icon: Users },
              { step: 5, title: 'Candidates attempt with live proctoring', icon: Play },
              { step: 6, title: 'Auto‑score, analyze, and rank', icon: BarChart3 },
              { step: 7, title: 'Export to ATS and schedule interviews', icon: CheckCircle2 }
            ].map((item, index) => (
              <Card key={index} className="card-hover-effect bg-white/50 dark:bg-slate-800/50 stat-card-glass border-0" data-testid={`how-it-works-step-${item.step}`}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center icon-hover-rotate relative">
                    <item.icon className="w-8 h-8 text-white" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {item.step}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust, Security & Compliance */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="trust-security-title">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">Enterprise‑grade reliability</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover-effect stat-card-glass bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30 border-0" data-testid="trust-security">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center icon-hover-rotate">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Security</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Encryption in transit/at rest, audit logs, RBAC, SSO.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover-effect stat-card-glass bg-gradient-to-br from-green-50 to-teal-100 dark:from-green-950/30 dark:to-teal-950/30 border-0" data-testid="trust-privacy">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center icon-hover-rotate">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Privacy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Consent, time‑boxed retention, region‑aware data handling.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover-effect stat-card-glass bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/30 dark:to-pink-950/30 border-0" data-testid="trust-uptime">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center icon-hover-rotate">
                  <Cloud className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Uptime & Scale</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Cloud auto‑scaling for peak demand.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" data-testid="faq-title">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">FAQs</span>
            </h2>
          </div>
          
          <Accordion type="single" collapsible value={openFAQ} onValueChange={setOpenFAQ} data-testid="faq-accordion">
            <AccordionItem value="item-1" className="bg-white/50 dark:bg-slate-800/50 stat-card-glass rounded-lg mb-4 border-0">
              <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="faq-item-1-trigger">
                <span className="text-left font-semibold">What is HIREIQ?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4" data-testid="faq-item-1-content">
                <p className="text-muted-foreground leading-relaxed">
                  HIREIQ is Talpro's AI‑powered assessment platform to design, deliver, and proctor skill‑based tests for any role.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white/50 dark:bg-slate-800/50 stat-card-glass rounded-lg mb-4 border-0">
              <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="faq-item-2-trigger">
                <span className="text-left font-semibold">Can it be white‑labeled?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4" data-testid="faq-item-2-content">
                <p className="text-muted-foreground leading-relaxed">
                  Yes. Use your logo, colors, and candidate communications.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white/50 dark:bg-slate-800/50 stat-card-glass rounded-lg mb-4 border-0">
              <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="faq-item-3-trigger">
                <span className="text-left font-semibold">How secure is it?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4" data-testid="faq-item-3-content">
                <p className="text-muted-foreground leading-relaxed">
                  Enterprise‑grade encryption, RBAC, SSO, and detailed audit trails.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white/50 dark:bg-slate-800/50 stat-card-glass rounded-lg mb-4 border-0">
              <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="faq-item-4-trigger">
                <span className="text-left font-semibold">What question types are supported?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4" data-testid="faq-item-4-content">
                <p className="text-muted-foreground leading-relaxed">
                  MCQ, coding, SQL, case studies, file uploads, typing, and audio/video.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white/50 dark:bg-slate-800/50 stat-card-glass rounded-lg border-0">
              <AccordionTrigger className="px-6 py-4 hover:no-underline" data-testid="faq-item-5-trigger">
                <span className="text-left font-semibold">Do we need new tools?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4" data-testid="faq-item-5-content">
                <p className="text-muted-foreground leading-relaxed">
                  No. Invite via CSV or link, export results, and connect to your ATS via API/webhooks.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl font-bold mb-6" data-testid="contact-title">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">Ready to see HIREIQ in action?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Request a demo to explore templates, governance, analytics, and integrations tailored to your hiring needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  onClick={() => {
                    const form = document.getElementById('contact-form');
                    if (form) form.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-gradient-hover px-8 py-4 text-lg"
                  data-testid="button-request-demo-cta"
                >
                  Request a Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button
                  variant="outline"
                  asChild
                  className="px-8 py-4 text-lg border-2"
                  data-testid="button-talk-to-sales"
                >
                  <a href="mailto:sales@talpro.com?subject=HIREIQ Sales Inquiry">
                    Talk to Sales
                  </a>
                </Button>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>sales@talpro.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Global availability with regional data centers</span>
                </div>
              </div>
            </div>

            <Card className="stat-card-glass bg-white/50 dark:bg-slate-800/50 border-0" id="contact-form" data-testid="contact-form-card">
              <CardContent className="p-8">
                {isSubmitted ? (
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">Thank you!</h3>
                    <p className="text-muted-foreground">
                      We'll reach out within one business day to schedule your personalized HIREIQ demo.
                    </p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} data-testid="input-first-name" />
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
                              <FormLabel>Last Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} data-testid="input-last-name" />
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
                            <FormLabel>Work Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john.doe@company.com" {...field} data-testid="input-email" />
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
                            <FormLabel>Company *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Company Inc." {...field} data-testid="input-company" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="HIREIQ Demo Request" {...field} data-testid="input-service" />
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
                            <FormLabel>Message *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your hiring needs and what you'd like to see in the demo..." 
                                rows={4}
                                {...field} 
                                data-testid="input-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full btn-gradient-hover py-3" 
                        disabled={contactMutation.isPending}
                        data-testid="button-submit-form"
                      >
                        {contactMutation.isPending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            Request a Demo
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}