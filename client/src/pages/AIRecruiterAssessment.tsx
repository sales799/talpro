import { useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  Eye, 
  Lock, 
  Monitor,
  Brain,
  Code,
  Database,
  Cloud,
  Settings,
  Network,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Send
} from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function AIRecruiterAssessment() {
  useEffect(() => {
    // Set SEO meta tags programmatically
    document.title = 'EVA: Evaluate. Validate. | Talpro';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Talpro\'s EVA (Evaluate. Validate.) platform—fair, fast, and job-relevant. See how we evaluate candidates using proctoring and a transparent rubric.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Talpro\'s EVA (Evaluate. Validate.) platform—fair, fast, and job-relevant. See how we evaluate candidates using proctoring and a transparent rubric.';
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
    
    setOrCreateMetaProperty('og:title', 'EVA: Evaluate. Validate. | Talpro');
    setOrCreateMetaProperty('og:description', 'Fair. Fast. Job‑relevant. Talpro uses EVA to technically assess candidates with proctoring and a transparent rubric.');
    setOrCreateMetaProperty('og:type', 'website');
    
    // Add FAQ JSON-LD structured data to head
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long does the assessment take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most role assessments take 45–90 minutes to complete. The timer is visible throughout the assessment."
            }
          },
          {
            "@type": "Question",
            "name": "Can candidates use AI tools during the assessment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Unless explicitly allowed in the job description, AI‑assist tools are discouraged. Signals are flagged for reviewer visibility."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if my internet connection drops?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can resume your assessment once within the allocated time window. Disconnections are logged for transparency."
            }
          },
          {
            "@type": "Question",
            "name": "Can a candidate retake the assessment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Retakes are disabled by default. Hiring teams may allow one retake per role at their discretion."
            }
          },
          {
            "@type": "Question",
            "name": "How are assessment scores shared?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Candidates receive pass/fail guidance. Detailed rubric and results are shared with the hiring panel."
            }
          }
        ]
      });
      document.head.appendChild(script);
    }
  }, []);

  const evaluationAreas = [
    'Programming & Scripting',
    'Cloud (Azure, AWS)',
    'Data & SQL',
    'DevOps Fundamentals',
    'Framework Skills (.NET, Oracle, IFS)',
    'ITSM & Networking',
    'Problem Solving & Debugging',
    'Communication in Code Comments'
  ];

  return (
    <div className="pt-16">

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-500/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">EVA</span>
              Powered Assessment Engine
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold mb-8 leading-tight" data-testid="page-title">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">EVA:</span><br />
              Evaluate. Validate.
            </h1>
            
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-xl sm:text-2xl font-medium mb-6 text-white/95 leading-relaxed">
                Fair. Fast. Job‑relevant.
              </p>
              <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
                Talpro leverages EVA to technically assess candidates with secure proctoring 
                and a transparent, role‑specific rubric powered by advanced AI.
              </p>
              
              {/* EVA Features Showcase */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
                <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="text-2xl mb-2">🧠</div>
                  <div className="text-sm font-medium text-purple-300">AI-Powered</div>
                  <div className="text-xs text-white/70">Smart Evaluation</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="text-2xl mb-2">🔒</div>
                  <div className="text-sm font-medium text-purple-300">Secure</div>
                  <div className="text-xs text-white/70">Proctored Environment</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-sm font-medium text-purple-300">Fast</div>
                  <div className="text-xs text-white/70">Instant Results</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-sm font-medium text-purple-300">Transparent</div>
                  <div className="text-xs text-white/70">Clear Rubrics</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl hover:from-purple-400 hover:to-pink-400 hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                <a href="#platform" className="relative z-10 flex items-center gap-2">
                  Explore EVA Platform
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </button>
              <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105">
                <a href="#faq">View FAQ</a>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Assessment Platform Features */}
      <section className="py-20 bg-background" id="platform">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Technical Assessment Portal</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete your technical assessment below. The experience is white-labeled for Talpro 
              with secure proctoring and real-time evaluation.
            </p>
          </div>
          
          {/* Assessment Portal Preview */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
              {/* Portal Header */}
              <div className="bg-primary text-primary-foreground p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">Talpro Technical Assessment</h3>
                    <p className="text-primary-foreground/80 text-sm">
                      Welcome to your technical assessment. This is a secure, proctored environment designed to evaluate your technical skills fairly and accurately.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-primary-foreground/10 rounded-lg px-4 py-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold">45:00 remaining</span>
                  </div>
                </div>
              </div>
              
              {/* Status Indicators */}
              <div className="p-6 bg-muted/30">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Secure Environment</div>
                      <div className="text-sm text-muted-foreground">Proctoring active</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                      <Eye className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium">Monitoring</div>
                      <div className="text-sm text-muted-foreground">Tab switches logged</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">Connection</div>
                      <div className="text-sm text-muted-foreground">Stable</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Assessment Content */}
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    Assessment Instructions
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• This assessment evaluates your technical skills in programming, cloud technologies, and problem-solving</li>
                    <li>• You have 45 minutes to complete all sections</li>
                    <li>• Your screen activity is being monitored for security purposes</li>
                    <li>• Please ensure you have a stable internet connection</li>
                  </ul>
                </div>
                
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    Ready to begin? Click "Start Assessment" when you're prepared to begin the technical evaluation.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Platform Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Shield className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-3">AI-Powered Proctoring</h3>
                <p className="text-muted-foreground text-sm">
                  Advanced monitoring detects cheating attempts, unauthorized devices, and ensures fair evaluation for all candidates.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Lock className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-3">Secure Environment</h3>
                <p className="text-muted-foreground text-sm">
                  Browser lockdown, screen recording, and real-time monitoring create a secure testing environment.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Monitor className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-3">Live Monitoring</h3>
                <p className="text-muted-foreground text-sm">
                  Real-time tracking of assessment progress with instant alerts for any suspicious activity or technical issues.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered assessment process ensures fair, consistent, and thorough technical evaluation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">1. Role Brief Ingestion</h3>
                <p className="text-muted-foreground text-sm">
                  We transform your job description and must‑have skills into a structured skill graph.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">2. Assessment Generation</h3>
                <p className="text-muted-foreground text-sm">
                  Timed, randomized tasks and questions tailored specifically to the role requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">3. Secure Proctoring</h3>
                <p className="text-muted-foreground text-sm">
                  Browser guard, webcam snapshots (with consent), and tab‑switch logging for integrity.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">4. Auto‑Scoring + Rubric</h3>
                <p className="text-muted-foreground text-sm">
                  Code checks, unit tests, and weighted criteria produce a transparent assessment score.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">5. Reviewer Validation</h3>
                <p className="text-muted-foreground text-sm">
                  A human‑in‑the‑loop confirms outcomes and adds qualitative assessment notes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">6. Results Delivery</h3>
                <p className="text-muted-foreground text-sm">
                  Comprehensive assessment report delivered to hiring team with detailed insights and recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Evaluate */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">What We Evaluate</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive technical assessment across key competency areas
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center max-w-5xl mx-auto">
            {evaluationAreas.map((area, index) => (
              <span 
                key={index}
                className="bg-card border border-border text-foreground px-4 py-2 rounded-full text-sm font-medium"
                data-testid={`evaluation-area-${index}`}
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Integrity */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Trust & Integrity</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ensuring fair assessments with robust anti-cheat measures and data privacy protection
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">Anti‑Cheat Measures</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Randomized items and timeboxing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Copy‑paste guard and shortcut monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Plagiarism & AI‑assist detection signals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Webcam snapshots (with explicit consent)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">Data Privacy</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>PII minimization (name, email only)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Default retention 180 days (configurable)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Encryption in transit & at rest</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>GDPR‑aligned candidate rights</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about our AI-powered assessment process
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="duration" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline" data-testid="faq-duration">
                How long does the assessment take?
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <p className="text-muted-foreground">
                  Most role assessments take 45–90 minutes to complete. The timer is visible throughout 
                  the assessment, so you'll always know how much time remains.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ai-tools" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline" data-testid="faq-ai-tools">
                Can candidates use AI tools during the assessment?
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <p className="text-muted-foreground">
                  Unless explicitly allowed in the job description, AI‑assist tools are discouraged. 
                  Our system detects AI assistance signals which are flagged for reviewer visibility 
                  and evaluation.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="internet-drop" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline" data-testid="faq-internet">
                What happens if my internet connection drops?
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <p className="text-muted-foreground">
                  You can resume your assessment once within the allocated time window. Our proctoring 
                  system logs the disconnection and reconnection for transparency with the hiring team.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="retake" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline" data-testid="faq-retake">
                Can a candidate retake the assessment?
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <p className="text-muted-foreground">
                  Retakes are disabled by default to ensure assessment integrity. However, hiring teams 
                  may allow one retake per role at their discretion.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="score-sharing" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline" data-testid="faq-scores">
                How are assessment scores shared?
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-6">
                <p className="text-muted-foreground">
                  Candidates receive pass/fail guidance and general feedback. The detailed rubric, 
                  code artifacts, and comprehensive evaluation results are shared directly with 
                  the hiring panel for thorough review.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Showcase Your Technical Skills?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Join hundreds of candidates who have successfully completed our AI-powered technical assessments. 
            Experience fair, transparent evaluation that lets your expertise shine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3" data-testid="button-start-now" asChild>
              <a href="#start">Start Assessment Now</a>
            </Button>
            <Button variant="outline" className="border-accent bg-accent/20 text-accent-foreground hover:bg-accent hover:text-accent-foreground px-8 py-3" data-testid="button-contact-support" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}