import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  MapPin, 
  Building, 
  Clock, 
  DollarSign, 
  Users, 
  Heart, 
  Lightbulb, 
  Target, 
  Award,
  ExternalLink,
  Filter,
  RefreshCw,
  ChevronRight,
  Star,
  Rocket,
  TrendingUp,
  Zap,
  Globe,
  BookOpen,
  GraduationCap,
  Coffee,
  Gamepad2,
  Shield,
  Brain,
  Code,
  Camera,
  Briefcase,
  Send,
  CheckCircle,
  BarChart3,
  ArrowUp,
  Plus,
  FileText,
  Upload,
  Sparkles,
  Trophy,
  Calendar,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'wouter';
import type { Job, JobsResponse } from '@shared/schema';

export default function Careers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('all');
  const [experienceLevelFilter, setExperienceLevelFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Update document title and meta tags
  useEffect(() => {
    document.title = 'Careers at TalPro - Join Our Growing Team | TalPro Solutions';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join TalPro Solutions and build the future of software development. Explore exciting career opportunities in custom software, mobile apps, and AI/ML. Apply today!');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Join TalPro Solutions and build the future of software development. Explore exciting career opportunities in custom software, mobile apps, and AI/ML. Apply today!';
      document.head.appendChild(meta);
    }

    // Add Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', 'Careers at TalPro - Join Our Growing Team');
    if (!document.head.contains(ogTitle)) document.head.appendChild(ogTitle);

    const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.setAttribute('content', 'Join TalPro Solutions and build the future of software development. Explore exciting career opportunities in custom software, mobile apps, and AI/ML.');
    if (!document.head.contains(ogDescription)) document.head.appendChild(ogDescription);

    const ogType = document.querySelector('meta[property="og:type"]') || document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.setAttribute('content', 'website');
    if (!document.head.contains(ogType)) document.head.appendChild(ogType);

    // Structured data for job postings
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'TalPro Solutions',
      'url': 'https://talproindia.com',
      'description': 'Professional software development company specializing in custom software, mobile apps, and AI/ML solutions',
      'foundingDate': '2010',
      'employee': {
        '@type': 'QuantitativeValue',
        'value': '450+'
      }
    };

    const existingScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    const scriptTag = existingScript || document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.textContent = JSON.stringify(structuredData);
    if (!document.head.contains(scriptTag)) document.head.appendChild(scriptTag);

    return () => {
      // Cleanup is handled by React's natural unmounting
    };
  }, []);

  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append('search', searchTerm);
    if (departmentFilter && departmentFilter !== 'all') params.append('department', departmentFilter);
    if (locationFilter && locationFilter !== 'all') params.append('location', locationFilter);
    if (employmentTypeFilter && employmentTypeFilter !== 'all') params.append('employmentType', employmentTypeFilter);
    if (experienceLevelFilter && experienceLevelFilter !== 'all') params.append('experienceLevel', experienceLevelFilter);
    params.append('page', page.toString());
    params.append('limit', '20');
    return params.toString();
  };

  const { data: jobsData, isLoading, error, refetch } = useQuery<JobsResponse>({
    queryKey: ['/api/jobs?' + buildQueryString()],
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    staleTime: 2 * 60 * 1000, // Consider data stale after 2 minutes
  });

  const clearFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('all');
    setLocationFilter('all');
    setEmploymentTypeFilter('all');
    setExperienceLevelFilter('all');
    setPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
  };

  const formatSalary = (min?: number, max?: number, currency = 'USD') => {
    if (!min && !max) return null;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    
    if (min && max) {
      return `${formatter.format(min)} - ${formatter.format(max)}`;
    } else if (min) {
      return `From ${formatter.format(min)}`;
    } else {
      return `Up to ${formatter.format(max!)}`;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Recently posted';
    }
  };

  const getEmploymentTypeDisplay = (type?: string) => {
    const types = {
      'full-time': 'Full-time',
      'part-time': 'Part-time',
      'contract': 'Contract',
      'internship': 'Internship'
    };
    return types[type as keyof typeof types] || type || 'Full-time';
  };

  const getExperienceLevelDisplay = (level?: string) => {
    const levels = {
      'entry': 'Entry Level',
      'mid': 'Mid Level',
      'senior': 'Senior Level',
      'executive': 'Executive'
    };
    return levels[level as keyof typeof levels] || level;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Gradient Hero Section */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-purple-700 to-teal-600 text-white relative overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/20 rounded-full animate-float-rotate"></div>
          <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-teal-300/30 rounded-full animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-300/40 rounded-full animate-float-rotate"></div>
          <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-blue-300/25 rounded-full animate-pulse-glow"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20" data-testid="badge-hiring">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse-glow"></div>
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">WE'RE HIRING</span>
                Join Our Growing Team
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight" data-testid="heading-hero">
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Build</span> Your<br />
                Dream <span className="bg-gradient-to-r from-teal-300 to-purple-300 bg-clip-text text-transparent animate-gradient-shift">Career</span><br />
                with <span className="bg-gradient-to-r from-purple-300 to-green-400 bg-clip-text text-transparent animate-gradient-shift">TalPro</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0" data-testid="text-hero-description">
                Join a company where innovation meets opportunity. We're building the future of software development and looking for passionate professionals to shape tomorrow's technology landscape.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white border-0 btn-gradient-hover" data-testid="button-view-positions">
                  <Rocket className="w-5 h-5 mr-2" />
                  View Open Positions
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" data-testid="button-learn-culture">
                  <Heart className="w-5 h-5 mr-2" />
                  Learn About Our Culture
                </Button>
              </div>
            </div>
            
            {/* Animated Statistics */}
            <div className="grid grid-cols-2 gap-6 lg:gap-8">
              <div className="stat-card-glass bg-white/10 p-6 rounded-2xl text-center card-hover-effect" data-testid="stat-team-size">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">450+</div>
                <div className="text-white/80 text-sm">Team Members</div>
              </div>
              
              <div className="stat-card-glass bg-white/10 p-6 rounded-2xl text-center card-hover-effect" data-testid="stat-experience">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">15+</div>
                <div className="text-white/80 text-sm">Years Excellence</div>
              </div>
              
              <div className="stat-card-glass bg-white/10 p-6 rounded-2xl text-center card-hover-effect" data-testid="stat-projects">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">500+</div>
                <div className="text-white/80 text-sm">Projects Delivered</div>
              </div>
              
              <div className="stat-card-glass bg-white/10 p-6 rounded-2xl text-center card-hover-effect" data-testid="stat-satisfaction">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">98%</div>
                <div className="text-white/80 text-sm">Employee Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Company Culture Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 relative overflow-hidden" data-testid="section-culture">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)`,
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/10 to-teal-600/10 rounded-full mb-6" data-testid="badge-culture">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-semibold text-sm">COMPANY CULTURE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6" data-testid="heading-culture">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Why Choose</span>
              <br />TalPro Solutions?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-culture-description">
              Join a company where innovation meets opportunity, and where your career growth is our top priority. Experience a workplace that values creativity, collaboration, and continuous learning.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="stat-card-glass bg-white/50 dark:bg-gray-800/50 p-8 rounded-3xl text-center card-hover-effect" data-testid="card-innovation">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow icon-hover-rotate">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Innovation-Driven Culture</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Work on cutting-edge technologies including AI/ML, cloud solutions, and modern web frameworks. 
                We encourage experimentation and continuous learning.
              </p>
              <div className="flex justify-center space-x-4 text-sm">
                <div className="flex items-center text-blue-600">
                  <Code className="w-4 h-4 mr-1" />
                  <span>Latest Tech</span>
                </div>
                <div className="flex items-center text-teal-600">
                  <Brain className="w-4 h-4 mr-1" />
                  <span>AI/ML Projects</span>
                </div>
              </div>
            </div>

            <div className="stat-card-glass bg-white/50 dark:bg-gray-800/50 p-8 rounded-3xl text-center card-hover-effect" data-testid="card-balance">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow icon-hover-rotate">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Work-Life Balance</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Flexible working arrangements, comprehensive health benefits, mental health support, 
                and unlimited PTO to help you maintain a healthy work-life balance.
              </p>
              <div className="flex justify-center space-x-4 text-sm">
                <div className="flex items-center text-purple-600">
                  <Globe className="w-4 h-4 mr-1" />
                  <span>Remote Friendly</span>
                </div>
                <div className="flex items-center text-pink-600">
                  <Shield className="w-4 h-4 mr-1" />
                  <span>Health Coverage</span>
                </div>
              </div>
            </div>

            <div className="stat-card-glass bg-white/50 dark:bg-gray-800/50 p-8 rounded-3xl text-center card-hover-effect" data-testid="card-growth">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow icon-hover-rotate">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Career Growth</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Clear career progression paths, mentorship programs, conference attendance, 
                certification support, and leadership development opportunities.
              </p>
              <div className="flex justify-center space-x-4 text-sm">
                <div className="flex items-center text-green-600">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  <span>Learning Budget</span>
                </div>
                <div className="flex items-center text-teal-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>Mentorship</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Employee Testimonials */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="stat-card-glass bg-white/30 dark:bg-gray-800/30 p-8 rounded-3xl card-hover-effect" data-testid="testimonial-sarah">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white">Sarah Chen</h4>
                  <p className="text-muted-foreground">Senior Full-Stack Developer</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed italic">
                "TalPro has been an incredible journey. The company truly cares about its employees and provides amazing opportunities for growth. I've worked on cutting-edge AI projects and learned more in 2 years than I did in my previous 5 years elsewhere."
              </p>
              <div className="flex justify-between items-center mt-6">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-sm text-muted-foreground">2 years at TalPro</span>
              </div>
            </div>
            
            <div className="stat-card-glass bg-white/30 dark:bg-gray-800/30 p-8 rounded-3xl card-hover-effect" data-testid="testimonial-mike">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white">Mike Rodriguez</h4>
                  <p className="text-muted-foreground">Product Manager</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed italic">
                "The collaborative culture at TalPro is unmatched. Every team member's voice is heard, and innovation is encouraged at every level. The work-life balance and remote-first approach make this the best place I've ever worked."
              </p>
              <div className="flex justify-between items-center mt-6">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-sm text-muted-foreground">3 years at TalPro</span>
              </div>
            </div>
          </div>
          
          {/* Perks and Benefits */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-6" data-testid="heading-perks">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Amazing Perks</span> & Benefits
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="stat-card-glass bg-white/40 dark:bg-gray-800/40 p-6 rounded-2xl text-center card-hover-effect" data-testid="perk-remote">
              <Globe className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Remote-First</h4>
              <p className="text-sm text-muted-foreground">Work from anywhere in the world</p>
            </div>
            
            <div className="stat-card-glass bg-white/40 dark:bg-gray-800/40 p-6 rounded-2xl text-center card-hover-effect" data-testid="perk-learning">
              <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Learning Budget</h4>
              <p className="text-sm text-muted-foreground">$3000 annual education allowance</p>
            </div>
            
            <div className="stat-card-glass bg-white/40 dark:bg-gray-800/40 p-6 rounded-2xl text-center card-hover-effect" data-testid="perk-wellness">
              <Coffee className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Wellness Program</h4>
              <p className="text-sm text-muted-foreground">Mental health & fitness support</p>
            </div>
            
            <div className="stat-card-glass bg-white/40 dark:bg-gray-800/40 p-6 rounded-2xl text-center card-hover-effect" data-testid="perk-fun">
              <Gamepad2 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Team Events</h4>
              <p className="text-sm text-muted-foreground">Regular team building & fun activities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Search and Filters */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover exciting opportunities to grow your career with us. Find the perfect role that matches your skills and aspirations.
            </p>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="stat-card-glass bg-white/80 dark:bg-gray-800/80 border border-white/20 rounded-2xl p-8 mb-12 space-y-6" data-testid="section-job-filters">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search jobs by title, keyword, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 bg-white/50 dark:bg-gray-900/50 border-white/30 rounded-xl text-lg"
                  data-testid="input-job-search"
                />
              </div>
              <Button type="submit" size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 btn-gradient-hover" data-testid="button-search-jobs">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                type="button" 
                onClick={() => setShowFilters(!showFilters)}
                className="border-white/30 hover:bg-white/10 px-6"
                data-testid="button-toggle-filters"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </form>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger data-testid="select-department">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger data-testid="select-location">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="california">California</SelectItem>
                    <SelectItem value="london">London</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={employmentTypeFilter} onValueChange={setEmploymentTypeFilter}>
                  <SelectTrigger data-testid="select-employment-type">
                    <SelectValue placeholder="Employment Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={experienceLevelFilter} onValueChange={setExperienceLevelFilter}>
                  <SelectTrigger data-testid="select-experience-level">
                    <SelectValue placeholder="Experience Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>

                <div className="md:col-span-2 lg:col-span-4 flex gap-2">
                  <Button variant="outline" onClick={clearFilters} data-testid="button-clear-filters">
                    Clear Filters
                  </Button>
                  <Button variant="outline" onClick={() => refetch()} data-testid="button-refresh-jobs">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Job Listings */}
          {isLoading ? (
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Alert className="border-destructive">
              <AlertDescription className="text-destructive">
                Unable to load job listings at this time. Please try again later or{' '}
                <Button variant="link" onClick={() => refetch()} className="p-0 h-auto text-destructive">
                  click here to retry
                </Button>
                .
              </AlertDescription>
            </Alert>
          ) : !jobsData?.jobs?.length ? (
            <Card className="text-center p-12">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No Jobs Found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || (departmentFilter !== 'all') || (locationFilter !== 'all') || (employmentTypeFilter !== 'all') || (experienceLevelFilter !== 'all')
                    ? "No jobs match your search criteria. Try adjusting your filters."
                    : "We don't have any open positions at the moment. Check back soon!"}
                </p>
                {(searchTerm || (departmentFilter !== 'all') || (locationFilter !== 'all') || (employmentTypeFilter !== 'all') || (experienceLevelFilter !== 'all')) && (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            </Card>
          ) : (
            <>
              {/* Results Summary */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground" data-testid="text-job-count">
                  {jobsData.total} {jobsData.total === 1 ? 'position' : 'positions'} found
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Updated every 5 minutes</span>
                </div>
              </div>

              {/* Modern Job Cards with Glassmorphism */}
              <div className="space-y-8">
                {jobsData.jobs.map((job: Job) => (
                  <div key={job.id} className="stat-card-glass bg-white/60 dark:bg-gray-800/60 rounded-3xl p-8 card-hover-effect group relative overflow-hidden" data-testid={`card-job-${job.id}`}>
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300">{job.title}</h3>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                {job.department && (
                                  <div className="flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                    <Building className="w-4 h-4 mr-2 text-blue-600" />
                                    <span className="font-medium">{job.department}</span>
                                  </div>
                                )}
                                <div className="flex items-center px-3 py-1 bg-teal-100 dark:bg-teal-900/30 rounded-full">
                                  <MapPin className="w-4 h-4 mr-2 text-teal-600" />
                                  <span className="font-medium">{job.location}</span>
                                  {job.remote && <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700 border-green-200">Remote</Badge>}
                                </div>
                                <div className="flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                                  <Clock className="w-4 h-4 mr-2 text-purple-600" />
                                  <span className="font-medium">{getEmploymentTypeDisplay(job.employmentType)}</span>
                                </div>
                                {job.experienceLevel && (
                                  <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200 text-blue-700 font-medium">
                                    {getExperienceLevelDisplay(job.experienceLevel)}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center text-sm text-muted-foreground mb-2">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>Posted {formatDate(job.postedDate)}</span>
                              </div>
                              {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency) && (
                                <div className="flex items-center justify-end text-lg font-bold text-green-600">
                                  <DollarSign className="w-5 h-5 mr-1" />
                                  <span>{formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                            {job.description}
                          </p>
                          
                          <div className="grid md:grid-cols-2 gap-6 mb-6">
                            {job.requirements && job.requirements.length > 0 && (
                              <div>
                                <h4 className="font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                                  <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                                  Key Requirements
                                </h4>
                                <div className="space-y-2">
                                  {job.requirements.slice(0, 3).map((req, index) => (
                                    <div key={index} className="flex items-center">
                                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mr-3 animate-pulse-glow"></div>
                                      <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition-colors">
                                        {req}
                                      </Badge>
                                    </div>
                                  ))}
                                  {job.requirements.length > 3 && (
                                    <Badge variant="outline" className="text-xs text-blue-600 border-blue-300">
                                      +{job.requirements.length - 3} more skills
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}

                            {job.benefits && job.benefits.length > 0 && (
                              <div>
                                <h4 className="font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                                  <Star className="w-5 h-5 mr-2 text-teal-600" />
                                  Benefits & Perks
                                </h4>
                                <div className="space-y-2">
                                  {job.benefits.slice(0, 3).map((benefit, index) => (
                                    <div key={index} className="flex items-center">
                                      <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-green-500 rounded-full mr-3 animate-pulse-glow"></div>
                                      <Badge variant="outline" className="bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-200 hover:bg-teal-100 transition-colors">
                                        {benefit}
                                      </Badge>
                                    </div>
                                  ))}
                                  {job.benefits.length > 3 && (
                                    <Badge variant="secondary" className="text-xs text-teal-600 bg-teal-50">
                                      +{job.benefits.length - 3} more benefits
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                        <Button 
                          asChild 
                          size="lg" 
                          className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 btn-gradient-hover flex-1 sm:flex-none" 
                          data-testid={`button-apply-${job.id}`}
                        >
                          <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer">
                            <Send className="w-5 h-5 mr-2" />
                            Apply Now
                            <ExternalLink className="w-5 h-5 ml-2" />
                          </a>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950 px-6"
                          data-testid={`button-save-${job.id}`}
                        >
                          <Sparkles className="w-5 h-5 mr-2" />
                          Save Job
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="lg" 
                          className="text-muted-foreground hover:text-blue-600 px-6"
                          data-testid={`button-share-${job.id}`}
                        >
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {jobsData.total > 20 && (
                <div className="flex justify-center mt-12">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      data-testid="button-prev-page"
                    >
                      Previous
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setPage(page + 1)}
                      disabled={jobsData.jobs.length < 20}
                      data-testid="button-next-page"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Team & Growth Opportunities Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 relative overflow-hidden" data-testid="section-growth">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full mb-6" data-testid="badge-growth">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-purple-600 font-semibold text-sm">CAREER DEVELOPMENT</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6" data-testid="heading-growth">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Grow Your Career</span>
              <br />with Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-growth-description">
              We invest in your professional growth with comprehensive learning programs, mentorship opportunities, and clear career progression paths.
            </p>
          </div>
          
          {/* Career Path Visualization */}
          <div className="grid lg:grid-cols-4 gap-8 mb-16">
            <div className="stat-card-glass bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl text-center card-hover-effect" data-testid="path-junior">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Junior Level</h3>
              <p className="text-sm text-muted-foreground mb-4">Start your journey with comprehensive onboarding and mentorship</p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-center text-green-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span>6-month mentoring</span>
                </div>
                <div className="flex items-center justify-center text-green-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span>Training programs</span>
                </div>
              </div>
            </div>
            
            <div className="stat-card-glass bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl text-center card-hover-effect" data-testid="path-mid">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Mid Level</h3>
              <p className="text-sm text-muted-foreground mb-4">Take on complex projects and start leading initiatives</p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-center text-blue-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span>Leadership training</span>
                </div>
                <div className="flex items-center justify-center text-blue-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span>Project ownership</span>
                </div>
              </div>
            </div>
            
            <div className="stat-card-glass bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl text-center card-hover-effect" data-testid="path-senior">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Senior Level</h3>
              <p className="text-sm text-muted-foreground mb-4">Lead teams and drive strategic technical decisions</p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-center text-purple-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span>Team leadership</span>
                </div>
                <div className="flex items-center justify-center text-purple-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span>Architecture decisions</span>
                </div>
              </div>
            </div>
            
            <div className="stat-card-glass bg-white/50 dark:bg-gray-800/50 p-6 rounded-2xl text-center card-hover-effect" data-testid="path-executive">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Executive</h3>
              <p className="text-sm text-muted-foreground mb-4">Shape company vision and drive organizational growth</p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-center text-orange-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span>Strategic planning</span>
                </div>
                <div className="flex items-center justify-center text-orange-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span>Company leadership</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Learning & Development Programs */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="stat-card-glass bg-white/40 dark:bg-gray-800/40 p-8 rounded-3xl card-hover-effect" data-testid="program-learning">
              <BookOpen className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Learning & Development</h3>
              <p className="text-muted-foreground mb-6">Access to premium courses, conferences, and certification programs with a $3000 annual budget.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-blue-600">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Online course subscriptions</span>
                </li>
                <li className="flex items-center text-blue-600">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Conference attendance</span>
                </li>
                <li className="flex items-center text-blue-600">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Certification support</span>
                </li>
              </ul>
            </div>
            
            <div className="stat-card-glass bg-white/40 dark:bg-gray-800/40 p-8 rounded-3xl card-hover-effect" data-testid="program-mentorship">
              <Users className="w-12 h-12 text-green-600 mb-6" />
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Mentorship Program</h3>
              <p className="text-muted-foreground mb-6">Connect with experienced professionals who will guide your career growth and development.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-green-600">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>1:1 monthly sessions</span>
                </li>
                <li className="flex items-center text-green-600">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Career planning</span>
                </li>
                <li className="flex items-center text-green-600">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Skill development roadmaps</span>
                </li>
              </ul>
            </div>
            
            <div className="stat-card-glass bg-white/40 dark:bg-gray-800/40 p-8 rounded-3xl card-hover-effect" data-testid="program-innovation">
              <Rocket className="w-12 h-12 text-purple-600 mb-6" />
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Innovation Time</h3>
              <p className="text-muted-foreground mb-6">Dedicate 20% of your time to personal projects and innovative ideas that could benefit the company.</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-purple-600">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Personal project time</span>
                </li>
                <li className="flex items-center text-purple-600">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Innovation challenges</span>
                </li>
                <li className="flex items-center text-purple-600">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  <span>Patent support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Application Flow Enhancement Section */}
      <section className="py-24 bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-950 dark:to-green-950" data-testid="section-application">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600/10 to-green-600/10 rounded-full mb-6" data-testid="badge-application">
              <FileText className="w-4 h-4 text-teal-600" />
              <span className="text-teal-600 font-semibold text-sm">APPLICATION PROCESS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6" data-testid="heading-application">
              <span className="bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">Streamlined</span>
              <br />Application Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-application-description">
              Our modern application process is designed to be quick, transparent, and user-friendly. From application to offer, we'll keep you informed every step of the way.
            </p>
          </div>
          
          {/* Application Steps */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center" data-testid="step-apply">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
                  <Send className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-teal-500 text-teal-600 font-bold text-sm">
                  1
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Apply Online</h3>
              <p className="text-sm text-muted-foreground">Submit your application with our user-friendly form and upload your resume.</p>
            </div>
            
            <div className="text-center" data-testid="step-review">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-blue-500 text-blue-600 font-bold text-sm">
                  2
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Application Review</h3>
              <p className="text-sm text-muted-foreground">Our HR team reviews your application within 48 hours and provides feedback.</p>
            </div>
            
            <div className="text-center" data-testid="step-interview">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-purple-500 text-purple-600 font-bold text-sm">
                  3
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Interview Process</h3>
              <p className="text-sm text-muted-foreground">Virtual or in-person interviews with team members and technical assessments.</p>
            </div>
            
            <div className="text-center" data-testid="step-offer">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-green-500 text-green-600 font-bold text-sm">
                  4
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Job Offer</h3>
              <p className="text-sm text-muted-foreground">Receive a competitive offer with comprehensive benefits and start your journey!</p>
            </div>
          </div>
          
          {/* Enhanced Application Form Preview */}
          <div className="max-w-2xl mx-auto">
            <div className="stat-card-glass bg-white/80 dark:bg-gray-800/80 p-8 rounded-3xl" data-testid="form-preview">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white flex items-center justify-center">
                <Sparkles className="w-6 h-6 mr-2 text-teal-600" />
                Quick Application Demo
              </h3>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
                        setUploadedFile(file);
                      } else if (file) {
                        alert('File size must be less than 5MB');
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    data-testid="file-input"
                  />
                  <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-0" />
                  <div 
                    className={`pl-12 py-4 rounded-xl border-2 border-dashed text-center cursor-pointer transition-all duration-200 ${
                      isDragOver 
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/50' 
                        : uploadedFile
                        ? 'border-green-500 bg-green-50 dark:bg-green-950/50'
                        : 'border-teal-300 bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-950 dark:to-green-950 hover:border-teal-500'
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setIsDragOver(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragOver(false);
                      const file = e.dataTransfer.files[0];
                      if (file && file.size <= 5 * 1024 * 1024 && 
                          (file.type === 'application/pdf' || 
                           file.type === 'application/msword' || 
                           file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                        setUploadedFile(file);
                      } else if (file && file.size > 5 * 1024 * 1024) {
                        alert('File size must be less than 5MB');
                      } else if (file) {
                        alert('Please upload a PDF, DOC, or DOCX file');
                      }
                    }}
                  >
                    {uploadedFile ? (
                      <div>
                        <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <p className="text-green-600 font-medium">{uploadedFile.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">File uploaded successfully</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 text-red-500 hover:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadedFile(null);
                            const input = document.querySelector('[data-testid="file-input"]') as HTMLInputElement;
                            if (input) input.value = '';
                          }}
                        >
                          Remove file
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-muted-foreground">
                          {isDragOver ? 'Drop your resume here' : 'Drag & drop your resume or click to browse'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Supports PDF, DOC, DOCX (Max 5MB)</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed" 
                    disabled={!uploadedFile}
                    onClick={() => {
                      if (uploadedFile) {
                        // Create a more user-friendly success notification
                        const successDiv = document.createElement('div');
                        successDiv.innerHTML = `
                          <div style="
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            background: white;
                            border-radius: 12px;
                            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                            padding: 32px;
                            z-index: 10000;
                            max-width: 400px;
                            text-align: center;
                            border: 1px solid #e5e7eb;
                          ">
                            <div style="
                              width: 64px;
                              height: 64px;
                              background: linear-gradient(135deg, #059669 0%, #10b981 100%);
                              border-radius: 50%;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              margin: 0 auto 24px auto;
                            ">
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <path d="M9 12l2 2 4-4"/>
                                <circle cx="12" cy="12" r="10"/>
                              </svg>
                            </div>
                            <h3 style="
                              font-size: 24px;
                              font-weight: 700;
                              color: #111827;
                              margin-bottom: 16px;
                              font-family: 'Inter', sans-serif;
                            ">Thank You!</h3>
                            <p style="
                              color: #6b7280;
                              font-size: 16px;
                              line-height: 1.6;
                              margin-bottom: 24px;
                              font-family: 'Inter', sans-serif;
                            ">Your application has been submitted successfully. Our HR team will review your resume and contact you soon.</p>
                            <button onclick="this.parentElement.parentElement.remove()" style="
                              background: linear-gradient(135deg, #059669 0%, #10b981 100%);
                              color: white;
                              border: none;
                              padding: 12px 24px;
                              border-radius: 8px;
                              font-weight: 600;
                              cursor: pointer;
                              font-size: 16px;
                              font-family: 'Inter', sans-serif;
                              transition: all 0.2s ease;
                            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                              Got it!
                            </button>
                          </div>
                          <div style="
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: rgba(0, 0, 0, 0.5);
                            z-index: 9999;
                          " onclick="this.parentElement.remove()"></div>
                        `;
                        document.body.appendChild(successDiv);
                        
                        setUploadedFile(null);
                        const input = document.querySelector('[data-testid="file-input"]') as HTMLInputElement;
                        if (input) input.value = '';
                      }
                    }}
                    data-testid="submit-application"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Application
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-teal-300 text-teal-600 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed" 
                    disabled={!uploadedFile}
                    onClick={() => {
                      if (uploadedFile) {
                        alert('Draft saved! You can continue your application later.');
                      }
                    }}
                    data-testid="save-draft"
                  >
                    Save Draft
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced Call to Action */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-700 to-teal-600 text-white relative overflow-hidden" data-testid="section-cta">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse-glow"></div>
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold">READY TO JOIN?</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-6" data-testid="heading-cta">
            Don't See the <span className="bg-gradient-to-r from-green-400 to-teal-300 bg-clip-text text-transparent">Perfect Role</span>?
          </h2>
          <p className="text-xl mb-10 text-white/90 leading-relaxed max-w-3xl mx-auto" data-testid="text-cta-description">
            We're always looking for exceptional talent to join our innovative team. Send us your resume and let us know how you'd like to contribute to our mission of building tomorrow's technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white border-0 btn-gradient-hover px-8" data-testid="button-contact-careers">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Our HR Team
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white/50 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8" data-testid="button-learn-more">
                <Building className="w-5 h-5 mr-2" />
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}