import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Calendar, User, ArrowRight, BookOpen, TrendingUp, Heart, MessageSquare, Share2, Eye, Clock, Star, Filter, Grid, List, Bookmark, Rss, Mail, Globe, Users, Target, Award, Zap } from 'lucide-react';
import type { BlogPost } from '@shared/schema';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');

  // Update document title and meta tags
  useEffect(() => {
    document.title = 'Blog - Latest Tech Insights & Industry Trends | TalPro Solutions';
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore TalPro\'s blog for the latest insights on AI, mobile development, cloud computing, and industry trends. Expert analysis and practical guides.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Explore TalPro\'s blog for the latest insights on AI, mobile development, cloud computing, and industry trends. Expert analysis and practical guides.';
      document.head.appendChild(meta);
    }
    
    return () => {
      document.title = 'TalPro Solutions';
    };
  }, []);

  const handleReadArticle = (post: BlogPost) => {
    // Navigate to individual blog post page using slug
    window.location.href = `/blog/${post.slug}`;
  };

  // Fetch blog posts from API
  const { data: blogData, isLoading, error } = useQuery({
    queryKey: ['/api/blog/posts'],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: '1',
        limit: '20'
      });
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      const response = await fetch(`/api/blog/posts?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      return response.json();
    },
  });

  const blogPosts = blogData?.posts || [];
  
  // Extract unique tags from all posts for category filtering
  const allTags = blogPosts.flatMap((post: BlogPost) => post.tags || []);
  const uniqueTags = ['All', ...Array.from(new Set(allTags))];
  const categories = uniqueTags.length > 1 ? uniqueTags : ['All', 'AI & ML', 'Mobile Dev', 'Web Dev', 'Cloud', 'DevOps', 'Industry Insights'];

  // Use only real API data to prevent slug issues
    {
      id: 3,
      title: 'Scaling Your Infrastructure: Cloud Migration Best Practices',
      excerpt: 'Essential strategies for successful cloud migration that minimize downtime and maximize performance while ensuring security and compliance.',
      category: 'Cloud',
      author: 'Alex Kumar',
      date: '2024-01-10',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      views: '15.7k',
      likes: 312,
      comments: 67,
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64',
      readingProgress: 0
    },
    {
      id: 4,
      title: '10-Step Checklist to Build a Successful MVP for Startups',
      excerpt: 'A practical guide for startups to build and launch minimum viable products that validate market demand and accelerate time to market.',
      category: 'Industry Insights',
      author: 'Jennifer Liu',
      date: '2024-01-08',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      views: '22.1k',
      likes: 445,
      comments: 89,
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64',
      readingProgress: 0
    },
    {
      id: 5,
      title: 'Modern Web Development: React vs Vue vs Angular in 2024',
      excerpt: 'An in-depth comparison of the three major frontend frameworks, helping developers choose the right tool for their next project.',
      category: 'Web Dev',
      author: 'David Park',
      date: '2024-01-05',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      views: '18.9k',
      likes: 387,
      comments: 76,
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64',
      readingProgress: 0
    },
    {
      id: 6,
      title: 'DevOps Best Practices: CI/CD Pipeline Implementation',
      excerpt: 'Learn how to implement robust continuous integration and deployment pipelines that improve code quality and accelerate delivery.',
      category: 'DevOps',
      author: 'Rachel Green',
      date: '2024-01-03',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      views: '11.3k',
      likes: 276,
      comments: 54,
      authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64',
      readingProgress: 0
    },
    {
      id: 7,
      title: 'Machine Learning Model Deployment: From Training to Production',
      excerpt: 'A step-by-step guide to deploying machine learning models in production environments with monitoring and maintenance best practices.',
      category: 'AI & ML',
      author: 'Dr. Amanda Foster',
      date: '2024-01-01',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      views: '9.7k',
      likes: 198,
      comments: 41,
      authorAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64',
      readingProgress: 0
    },
    {
      id: 8,
      title: 'Mobile App Security: Protecting User Data in 2024',
      excerpt: 'Essential security practices for mobile app development, covering data encryption, authentication, and common vulnerability prevention.',
      category: 'Mobile Dev',
      author: 'Kevin Zhang',
      date: '2023-12-28',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      views: '14.2k',
      likes: 298,
      comments: 58,
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64',
      readingProgress: 0
    },
    {
      id: 9,
      title: 'Microservices Architecture: Building Scalable Distributed Systems',
      excerpt: 'Learn how to design and implement microservices architecture for maximum scalability, maintainability, and team productivity in enterprise applications.',
      category: 'Web Dev',
      author: 'Thomas Chen',
      date: '2024-01-18',
      readTime: '11 min read',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      views: '13.8k',
      likes: 267,
      comments: 52,
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64',
      readingProgress: 0
    },
    {
      id: 10,
      title: 'Blockchain Technology in Business: Beyond Cryptocurrency',
      excerpt: 'Explore practical blockchain applications in supply chain, healthcare, and finance sectors, with real-world case studies and implementation strategies.',
      category: 'Industry Insights',
      author: 'Maria Santos',
      date: '2024-01-16',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      views: '16.4k',
      likes: 334,
      comments: 71,
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64',
      readingProgress: 0
    }
  ];

  // Use only real API data
  const displayPosts = blogPosts;

  const filteredPosts = displayPosts.filter((post: any) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    // For real blog posts, use tags; for fallback, use category
    const matchesCategory = selectedCategory === 'All' || 
      (post.tags ? post.tags.includes(selectedCategory) : post.category === selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  // Sort filtered posts based on sortBy criteria
  const sortedPosts = [...filteredPosts].sort((a: any, b: any) => {
    switch (sortBy) {
      case 'latest':
        // For real posts, use publishedAt or createdAt; for fallback, use date
        const dateA = new Date(a.publishedAt || a.createdAt || a.date);
        const dateB = new Date(b.publishedAt || b.createdAt || b.date);
        return dateB.getTime() - dateA.getTime();
      case 'popular':
        // Sort by views (convert '12.5k' format to numbers for comparison)
        if (a.views && b.views) {
          const aViews = parseFloat(a.views.replace('k', '')) * (a.views.includes('k') ? 1000 : 1);
          const bViews = parseFloat(b.views.replace('k', '')) * (b.views.includes('k') ? 1000 : 1);
          return bViews - aViews;
        }
        return 0;
      case 'trending':
        // Sort by engagement score (likes + comments) - fallback data only
        if (a.likes && b.likes) {
          const aEngagement = a.likes + a.comments;
          const bEngagement = b.likes + b.comments;
          return bEngagement - aEngagement;
        }
        return 0;
      default:
        return 0;
    }
  });

  const featuredPost = displayPosts.find((post: any) => post.featured);
  const regularPosts = sortedPosts.filter((post: any) => !post.featured);

  // Loading state
  if (isLoading) {
    return (
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Unable to Load Blog Posts</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              We're having trouble loading the latest blog posts. Please try again later.
            </p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Modern Gradient Hero Section */}
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
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">THOUGHT LEADERSHIP</span>
                Expert Insights & Innovation
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Tech</span><br />
                Insights &<br />
                <span className="bg-gradient-to-r from-teal-300 to-green-400 bg-clip-text text-transparent animate-gradient-shift">Innovation</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Stay ahead of the curve with expert insights, industry trends, and practical guides from our technology leaders. Join thousands of developers and business leaders who trust our expertise.
              </p>
              
              {/* Hero Blog Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-articles">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">500+</div>
                  <div className="text-xs text-white/70">Articles</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-readers">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">50k+</div>
                  <div className="text-xs text-white/70">Monthly Readers</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-experts">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">25+</div>
                  <div className="text-xs text-white/70">Tech Experts</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="hero-stat-engagement">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">95%</div>
                  <div className="text-xs text-white/70">Engagement</div>
                </div>
              </div>
              
              {/* Enhanced Newsletter Signup */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">Stay Updated</h3>
                <p className="text-white/80 mb-6">Get the latest insights delivered to your inbox weekly</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
                    data-testid="input-newsletter-email"
                  />
                  <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-6 py-3 font-semibold text-white rounded-xl shadow-lg" data-testid="button-subscribe">
                    <span className="relative z-10 flex items-center gap-2">
                      Subscribe
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Tech insights and innovation dashboard showcasing blog analytics and engagement metrics" 
                  className="rounded-2xl w-full h-auto shadow-2xl"
                />
                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">Live Content</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Search & Filtering */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 rounded-full mb-6">
              <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">DISCOVER & EXPLORE</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">Find Your</span><br />
              <span className="text-foreground">Perfect Article</span>
            </h2>
          </div>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-2xl blur-lg opacity-75"></div>
              <div className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-1 border border-white/20 dark:border-slate-700/20">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search articles, topics, or authors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 text-lg"
                    data-testid="input-search"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Category Filters */}
          <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-slate-700/20 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-foreground">Filter by Category</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-xl"
                    data-testid="button-view-grid"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-xl"
                    data-testid="button-view-list"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg transform scale-105'
                      : 'bg-white/50 dark:bg-slate-700/50 text-foreground hover:bg-white/80 dark:hover:bg-slate-700/80 hover:scale-105'
                  } border border-white/30 dark:border-slate-600/30 backdrop-blur-sm`}
                  data-testid={`filter-${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
              <div className="flex gap-2">
                {[
                  { key: 'latest', label: 'Latest', icon: Clock },
                  { key: 'popular', label: 'Popular', icon: TrendingUp },
                  { key: 'trending', label: 'Trending', icon: Star }
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setSortBy(key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      sortBy === key
                        ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white'
                        : 'bg-white/30 dark:bg-slate-700/30 text-foreground hover:bg-white/50 dark:hover:bg-slate-700/50'
                    }`}
                    data-testid={`sort-${key}`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Featured Article */}
      {featuredPost && selectedCategory === 'All' && !searchTerm && (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full mb-6">
                <Star className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">FEATURED CONTENT</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">Editor's</span><br />
                <span className="text-foreground">Choice</span>
              </h2>
            </div>
            
            <div className="relative group" data-testid="card-featured-post">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Card className="relative stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg overflow-hidden shadow-2xl border border-white/20 dark:border-slate-700/20 card-hover-effect" data-testid="card-featured-content">
                <div className="grid lg:grid-cols-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20"></div>
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-64 lg:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse-glow">
                        ⭐ Featured
                      </div>
                    </div>
                    <div className="absolute bottom-6 right-6 flex gap-2">
                      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl px-3 py-2 text-white text-sm font-medium">
                        <Eye className="w-4 h-4 inline mr-1" />
                        {featuredPost.views}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-8 lg:p-12">
                    <div className="mb-4">
                      <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white animate-pulse-glow">
                        {featuredPost.category}
                      </Badge>
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-4 group-hover:text-purple-600 transition-colors duration-300" data-testid="text-featured-title">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed" data-testid="text-featured-excerpt">{featuredPost.excerpt}</p>
                    
                    {/* Enhanced Author Card */}
                    <div className="bg-white/30 dark:bg-slate-700/30 backdrop-blur rounded-2xl p-4 mb-6 border border-white/20 dark:border-slate-600/20">
                      <div className="flex items-center gap-4">
                        <img
                          src={featuredPost.authorAvatar}
                          alt={featuredPost.author}
                          className="w-12 h-12 rounded-full border-2 border-white/50"
                          data-testid="img-featured-author-avatar"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <User className="w-4 h-4" />
                            <span className="font-semibold text-foreground" data-testid="text-featured-author">{featuredPost.author}</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(featuredPost.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {featuredPost.readTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Engagement Metrics */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors" data-testid="button-like-featured">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm font-medium">{featuredPost.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors" data-testid="button-comment-featured">
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-sm font-medium">{featuredPost.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors" data-testid="button-share-featured">
                          <Share2 className="w-4 h-4" />
                          <span className="text-sm font-medium">Share</span>
                        </button>
                      </div>
                      <button className="text-muted-foreground hover:text-yellow-500 transition-colors" data-testid="button-bookmark-featured">
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <button 
                      className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg w-full" 
                      data-testid="button-read-featured"
                      onClick={() => handleReadArticle(featuredPost)}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Read Full Article
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </button>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Articles Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-blue-100 dark:from-gray-900/30 dark:to-blue-900/30 rounded-full mb-6">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">LATEST CONTENT</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                {searchTerm ? `Search Results for "${searchTerm}"` : 
                 selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {filteredPosts.length} articles found • Updated weekly with fresh insights
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-2xl"></div>
                <div className="relative stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-12 border border-white/20 dark:border-slate-700/20">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 animate-float-rotate" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
                  <p className="text-muted-foreground">Try adjusting your search terms or category filter to discover more content.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className={`grid gap-8 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'max-w-4xl mx-auto'}`}>
              {regularPosts.map((post, index) => (
                <div key={post.id} className="group relative" data-testid={`card-blog-post-${post.id}`}>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Card className={`relative stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-xl card-hover-effect overflow-hidden ${viewMode === 'list' ? 'flex flex-row' : ''}`} data-testid={`card-post-content-${post.id}`}>
                    <div className={`relative ${viewMode === 'list' ? 'w-1/3' : ''}`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-teal-600/10"></div>
                      <img
                        src={post.image}
                        alt={post.title}
                        className={`object-cover transition-transform duration-700 group-hover:scale-110 ${viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'}`}
                        data-testid={`img-post-${post.id}`}
                      />
                      <div className="absolute top-4 left-4">
                        <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse-glow">
                          {post.category}
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl px-2 py-1 text-white text-xs font-medium">
                          <Eye className="w-3 h-3 inline mr-1" />
                          {post.views}
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <button className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-full p-2 text-white hover:bg-white/30 transition-colors" data-testid={`button-bookmark-${post.id}`}>
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                        <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300" data-testid={`text-title-${post.id}`}>
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed" data-testid={`text-excerpt-${post.id}`}>
                        {post.excerpt}
                      </p>
                      
                      {/* Enhanced Author Card */}
                      <div className="bg-white/30 dark:bg-slate-700/30 backdrop-blur rounded-xl p-3 mb-4 border border-white/20 dark:border-slate-600/20">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.authorAvatar}
                            alt={post.author}
                            className="w-8 h-8 rounded-full border border-white/50"
                            data-testid={`img-author-avatar-${post.id}`}
                          />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-foreground" data-testid={`text-author-${post.id}`}>{post.author}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Engagement Metrics */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <button className="flex items-center gap-1 text-muted-foreground hover:text-red-500 transition-colors animate-float-rotate" data-testid={`button-like-${post.id}`}>
                            <Heart className="w-4 h-4" />
                            <span className="text-xs font-medium">{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-muted-foreground hover:text-blue-500 transition-colors animate-float-rotate" data-testid={`button-comment-${post.id}`}>
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-xs font-medium">{post.comments}</span>
                          </button>
                          <button className="flex items-center gap-1 text-muted-foreground hover:text-green-500 transition-colors animate-float-rotate" data-testid={`button-share-${post.id}`}>
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <button 
                        className="btn-gradient-hover group relative inline-flex items-center justify-center px-6 py-3 font-semibold text-white rounded-xl shadow-lg w-full" 
                        data-testid={`button-read-${post.id}`}
                        onClick={() => handleReadArticle(post)}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Read Article
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}

          {/* Enhanced Load More Button */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-16">
              <div className="relative inline-block">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-2xl blur-lg"></div>
                <button className="relative btn-gradient-hover group inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-load-more">
                  <span className="relative z-10 flex items-center gap-2">
                    Load More Articles
                    <TrendingUp className="w-5 h-5 transition-transform group-hover:translate-y-[-2px]" />
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Newsletter CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-700 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-500/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 30px 30px'
        }}></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse-glow"></div>
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold animate-gradient-shift">STAY INFORMED</span>
                Join Our Community
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient-shift">Never Miss</span><br />
                an Update
              </h2>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Subscribe to our newsletter for the latest tech insights, industry trends, and exclusive content 
                from our team of experts. Join 50,000+ professionals staying ahead of the curve.
              </p>
              
              {/* Newsletter Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="newsletter-stat-subscribers">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">50k+</div>
                  <div className="text-xs text-white/70">Subscribers</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="newsletter-stat-articles">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">Weekly</div>
                  <div className="text-xs text-white/70">Articles</div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group" data-testid="newsletter-stat-rating">
                  <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform">4.9★</div>
                  <div className="text-xs text-white/70">Rating</div>
                </div>
              </div>
            </div>
            
            {/* Newsletter Form Side */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Join Our Newsletter</h3>
                  <p className="text-white/80">Get weekly insights delivered to your inbox</p>
                </div>
                
                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 h-12"
                    data-testid="input-newsletter-cta"
                  />
                  
                  <button className="btn-gradient-hover group relative inline-flex items-center justify-center w-full px-8 py-4 font-semibold text-white rounded-2xl shadow-lg" data-testid="button-subscribe-cta">
                    <span className="relative z-10 flex items-center gap-2">
                      Subscribe to Newsletter
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                  
                  <div className="flex items-center justify-center gap-4 text-white/60 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>50k+ subscribers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      <span>No spam, ever</span>
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
