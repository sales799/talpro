import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';
import { 
  Shield, 
  Brain, 
  Zap, 
  BarChart3, 
  Server, 
  ArrowRight,
  CheckCircle,
  Users,
  Clock,
  Target,
  Monitor,
  FileCheck,
  Cpu,
  Globe
} from 'lucide-react';

export default function OnlineAssessmentPlatform() {
  return (
    <div className="pt-16">
      {/* SEO Meta Tags */}
      <div style={{ display: 'none' }}>
        <title>AIRA: Hire. Assured. - Secure AI-Powered Candidate Testing | Talpro</title>
        <meta name="description" content="Talpro's AIRA (Hire. Assured.) offers secure, AI-powered candidate testing with advanced proctoring, comprehensive skill assessments, and real-time analytics for smarter hiring decisions." />
        <meta property="og:title" content="AIRA: Hire. Assured. - Secure AI-Powered Candidate Testing | Talpro" />
        <meta property="og:description" content="Transform your hiring process with Talpro's AIRA assessment platform. AI proctoring, 40,000+ questions, instant custom tests, and real-time analytics." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://talproindia.com/assessments" />
      </div>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-teal-500/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              AIRA: Advanced Intelligence, Reliable Assessments
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold mb-8 leading-tight" data-testid="page-title">
              Stop Gambling<br />
              <span className="bg-gradient-to-r from-green-400 to-teal-300 bg-clip-text text-transparent">on Hires</span>
            </h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl sm:text-2xl font-medium mb-8 text-white/95 leading-relaxed">
                Know exactly what candidates can do <span className="text-green-400 font-bold">before</span> you hire them
              </p>
              <p className="text-lg mb-12 text-white/80 max-w-3xl mx-auto">
                Talpro's AI-powered assessment platform eliminates hiring guesswork with cheat-proof tests, 
                40,000+ verified questions, and instant results that actually predict job performance.
              </p>
              
              {/* Stats Cards */}
              <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="text-4xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform">40,000+</div>
                  <div className="text-sm text-white/80">Verified Questions</div>
                  <div className="w-full h-1 bg-white/20 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-teal-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="text-4xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform">99.9%</div>
                  <div className="text-sm text-white/80">Cheat Detection</div>
                  <div className="w-full h-1 bg-white/20 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-teal-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="text-4xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform">2 min</div>
                  <div className="text-sm text-white/80">Test Creation</div>
                  <div className="w-full h-1 bg-white/20 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-teal-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl hover:from-green-400 hover:to-teal-400 hover:scale-105 shadow-lg hover:shadow-green-500/25">
                  <span className="relative z-10 flex items-center gap-2">
                    Experience AIRA Live
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Your Current Assessment Reality</h2>
            <p className="text-xl text-muted-foreground">Why traditional interviews and basic tests fail you</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* The Problem */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-destructive mb-6">😩 Traditional Methods</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-destructive/5 border-l-4 border-destructive rounded-r-lg">
                  <div className="text-destructive font-bold">Fake skills</div>
                  <div className="text-muted-foreground">Candidates game interviews and basic tests</div>
                </div>
                
                <div className="flex gap-4 p-4 bg-destructive/5 border-l-4 border-destructive rounded-r-lg">
                  <div className="text-destructive font-bold">Manual chaos</div>
                  <div className="text-muted-foreground">Creating tests, grading papers, comparing results manually</div>
                </div>
                
                <div className="flex gap-4 p-4 bg-destructive/5 border-l-4 border-destructive rounded-r-lg">
                  <div className="text-destructive font-bold">Slow decisions</div>
                  <div className="text-muted-foreground">Weeks to get results, by then good candidates are gone</div>
                </div>
                
                <div className="flex gap-4 p-4 bg-destructive/5 border-l-4 border-destructive rounded-r-lg">
                  <div className="text-destructive font-bold">Bad hires</div>
                  <div className="text-muted-foreground">50% of new hires fail within 18 months</div>
                </div>
              </div>
            </div>

            {/* Talpro Solution */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-accent mb-6">🎯 Talpro's Assessment Platform</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-accent/5 border-l-4 border-accent rounded-r-lg">
                  <div className="text-accent font-bold">Cheat-proof</div>
                  <div className="text-foreground">AI proctoring catches every trick in the book</div>
                </div>
                
                <div className="flex gap-4 p-4 bg-accent/5 border-l-4 border-accent rounded-r-lg">
                  <div className="text-accent font-bold">Auto-everything</div>
                  <div className="text-foreground">Tests created, delivered, and graded automatically</div>
                </div>
                
                <div className="flex gap-4 p-4 bg-accent/5 border-l-4 border-accent rounded-r-lg">
                  <div className="text-accent font-bold">Instant results</div>
                  <div className="text-foreground">Real-time scoring and detailed performance reports</div>
                </div>
                
                <div className="flex gap-4 p-4 bg-accent/5 border-l-4 border-accent rounded-r-lg">
                  <div className="text-accent font-bold">Predict success</div>
                  <div className="text-foreground">Tests that actually correlate with job performance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">What Makes Our Platform Bulletproof</h2>
            <p className="text-xl text-muted-foreground">
              Every feature designed to give you confidence in your hiring decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* AI-Powered Proctoring */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-bold mb-3">AI-Powered Cheat Detection</h3>
                <p className="text-muted-foreground mb-4">
                  Catches multiple people on camera, unauthorized devices, tab switching, and even subtle cheating attempts. 
                  Aadhaar-based face verification for foolproof identity checks.
                </p>
                <div className="text-primary font-semibold text-sm">99.9% cheat detection accuracy</div>
              </CardContent>
            </Card>

            {/* Comprehensive Assessments */}
            <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3">40,000+ Expert Questions</h3>
                <p className="text-muted-foreground mb-4">
                  From coding challenges to aptitude tests, communication skills to domain expertise. 
                  Every question verified by experts and correlated with actual job performance.
                </p>
                <div className="text-accent font-semibold text-sm">Cover every skill and role</div>
              </CardContent>
            </Card>

            {/* Instant Test Creation */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3">2-Minute Test Creation</h3>
                <p className="text-muted-foreground mb-4">
                  AI builds custom tests based on job roles. Choose question types, difficulty levels, 
                  and time limits. No more manual question paper setting.
                </p>
                <div className="text-primary font-semibold text-sm">Templates for every role</div>
              </CardContent>
            </Card>

            {/* Real-Time Analytics */}
            <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-3">Live Performance Dashboards</h3>
                <p className="text-muted-foreground mb-4">
                  Watch candidates take tests in real-time. Instant scoring, detailed reports, 
                  and easy comparison tools to spot your top performers immediately.
                </p>
                <div className="text-accent font-semibold text-sm">Make decisions in minutes</div>
              </CardContent>
            </Card>

            {/* Scalable Infrastructure */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold mb-3">Handle 5,000+ Candidates</h3>
                <p className="text-muted-foreground mb-4">
                  Enterprise-grade infrastructure that stays fast and reliable whether you're testing 
                  5 or 5,000 candidates simultaneously. Cloud-based with 99.9% uptime.
                </p>
                <div className="text-primary font-semibold text-sm">Scale without limits</div>
              </CardContent>
            </Card>

            {/* Seamless Integration */}
            <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">🔗</div>
                <h3 className="text-xl font-bold mb-3">Works With Your Tools</h3>
                <p className="text-muted-foreground mb-4">
                  Integrates with popular ATS/HRMS systems. White-labeled with your branding. 
                  Results flow directly into your existing recruitment dashboard.
                </p>
                <div className="text-accent font-semibold text-sm">No workflow disruption</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Talpro */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Smart Companies Choose Talpro</h2>
            <p className="text-xl text-muted-foreground">
              Stop settling for "gut feeling" hires. Get data-driven confidence.
            </p>
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">What You Actually Get:</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <span>Candidates who can actually do the job (not just interview well)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <span>Hire 75% faster with automated scoring and reporting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <span>Reduce bad hires by 80% with predictive assessments</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <span>Scale testing to thousands without quality loss</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
                    <span>Sleep better knowing your assessments are bulletproof</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-accent/10 rounded-xl p-8 mb-6">
                  <div className="text-5xl font-bold text-accent mb-2">80%</div>
                  <div className="text-lg font-semibold mb-4">Reduction in Bad Hires</div>
                  <div className="text-muted-foreground text-sm">
                    Based on client results using our assessment platform
                  </div>
                </div>
                <div className="bg-primary/10 rounded-xl p-6">
                  <div className="text-3xl font-bold text-primary mb-2">75%</div>
                  <div className="text-sm font-semibold">Faster Hiring Decisions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Perfect For Every Hiring Scenario</h2>
            <p className="text-xl text-muted-foreground">
              From startups to enterprises, campus recruitment to remote hiring
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Campus Recruitment</h3>
                <p className="text-muted-foreground">
                  Test thousands of students simultaneously. Automated ranking and shortlisting 
                  for efficient campus drives.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Remote Hiring</h3>
                <p className="text-muted-foreground">
                  Assess global talent with AI proctoring. Ensure fair and secure testing 
                  regardless of location.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Lateral Hiring</h3>
                <p className="text-muted-foreground">
                  Custom assessments for specific roles. Evaluate experienced professionals 
                  with job-relevant challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Cpu className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Technical Interviews</h3>
                <p className="text-muted-foreground">
                  Pre-screening assessments before live technical rounds. Save interview time 
                  by filtering qualified candidates early.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Skill Benchmarking</h3>
                <p className="text-muted-foreground">
                  Compare candidate performance against industry standards. Identify top talent 
                  with data-driven insights.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Compliance Testing</h3>
                <p className="text-muted-foreground">
                  Secure, auditable assessments for regulated industries. Meet compliance 
                  requirements with detailed audit trails.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Stop Guessing on Hires?</h2>
          <p className="text-xl mb-8 text-primary-foreground/95">
            Your next hire could make or break your project. Why risk it on interviews and gut feelings 
            when you can know exactly what candidates can do?
          </p>
          <p className="text-lg mb-10 text-primary-foreground/90">
            Get a live demo of our assessment platform. See how it works with your actual job roles.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-semibold" data-testid="button-demo-request" asChild>
              <Link href="/contact">
                Request Live Demo
              </Link>
            </Button>
            <Button variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 px-8 py-4 text-lg" data-testid="button-contact-assessments" asChild>
              <Link href="/contact">
                Discuss Your Needs
              </Link>
            </Button>
          </div>
          
          <p className="text-sm text-primary-foreground/70">
            Custom setup available. Integration support included. No long-term contracts required.
          </p>
        </div>
      </section>
    </div>
  );
}