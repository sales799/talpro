import { useState, useMemo, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Calendar, User, ArrowRight, BookOpen, TrendingUp, Heart, MessageSquare, Share2, Eye, Clock, Star, Filter, Grid, List, Bookmark, Rss, Mail, Globe, Users, Target, Award, Zap } from 'lucide-react';
import type { BlogPost } from '@shared/schema';
import BlogSearch from '@/components/blog/BlogSearch';
import BlogFilters from '@/components/blog/BlogFilters';
import { analytics } from '@/lib/analytics';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');
  
  const prevSearchQuery = useRef('');

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
      const response = await fetch(`/api/blog/posts?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      return response.json();
    },
  });

  const blogPosts = blogData?.posts || [];
  
  // Extract unique categories from all posts
  const categories = useMemo(() => {
    if (!blogPosts.length) return [];
    const uniqueCategories = new Set(
      blogPosts.filter((p: BlogPost) => p.category).map((p: BlogPost) => p.category!)
    );
    return Array.from(uniqueCategories).sort();
  }, [blogPosts]);

  // Extract unique tags from all posts
  const tags = useMemo(() => {
    if (!blogPosts.length) return [];
    const allTags = blogPosts.flatMap((p: BlogPost) => p.tags || []);
    const uniqueTags = new Set(allTags);
    return Array.from(uniqueTags).sort();
  }, [blogPosts]);

  // Filter posts based on search and filters
  const filteredPosts = useMemo(() => {
    if (!blogPosts.length) return [];
    
    let filtered = blogPosts;
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((post: BlogPost) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    }
    
    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((post: BlogPost) => post.category === selectedCategory);
    }
    
    // Tags filter (post must have ALL selected tags)
    if (selectedTags.length > 0) {
      filtered = filtered.filter((post: BlogPost) =>
        selectedTags.every((tag) => post.tags?.includes(tag))
      );
    }
    
    return filtered;
  }, [blogPosts, searchQuery, selectedCategory, selectedTags]);

  // Sort filtered posts based on sortBy criteria
  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a: BlogPost, b: BlogPost) => {
      switch (sortBy) {
        case 'latest':
          const dateA = new Date(a.publishedAt || '');
          const dateB = new Date(b.publishedAt || '');
          return dateB.getTime() - dateA.getTime();
        default:
          return 0;
      }
    });
  }, [filteredPosts, sortBy]);

  // Track search only when query changes (not when filters change)
  useEffect(() => {
    if (searchQuery && searchQuery !== prevSearchQuery.current) {
      analytics.trackSearch(searchQuery, filteredPosts.length);
      prevSearchQuery.current = searchQuery;
    } else if (!searchQuery) {
      prevSearchQuery.current = '';
    }
  }, [searchQuery]);

  // Analytics handlers
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      analytics.event('filter_category', {
        event_category: 'engagement',
        event_label: category,
      });
    }
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
    analytics.event('filter_tag', {
      event_category: 'engagement',
      event_label: tag,
      action: selectedTags.includes(tag) ? 'remove' : 'add',
    });
  };

  const handleClearAll = () => {
    setSelectedCategory(null);
    setSelectedTags([]);
    setSearchQuery('');
    analytics.event('clear_filters', {
      event_category: 'engagement',
      event_label: 'blog',
    });
  };

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

  // Empty state
  if (blogPosts.length === 0 && !isLoading) {
    return (
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">No Blog Posts Yet</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Check back soon for the latest insights and industry trends.
            </p>
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
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search & Filter */}
          <div className="mb-12">
            <BlogSearch value={searchQuery} onChange={setSearchQuery} />
            <BlogFilters
              categories={categories as string[]}
              tags={tags as string[]}
              selectedCategory={selectedCategory}
              selectedTags={selectedTags}
              onCategorySelect={handleCategorySelect}
              onTagToggle={handleTagToggle}
              onClearAll={handleClearAll}
            />
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <Card 
                key={post.id} 
                className="group stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg overflow-hidden shadow-lg border border-white/20 dark:border-slate-700/20 card-hover-effect cursor-pointer" 
                data-testid={`card-post-${post.id}`}
                onClick={() => handleReadArticle(post)}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-teal-600/10"></div>
                  <img
                    src={post.imageUrl || '/hero-default.jpg'}
                    alt={post.imageAlt || post.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    data-testid={`img-post-${post.id}`}
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse-glow">
                      {(post.tags && post.tags[0]) || 'Article'}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300" data-testid={`text-title-${post.id}`}>
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed" data-testid={`text-excerpt-${post.id}`}>
                    {post.excerpt}
                  </p>
                  
                  <Button 
                    className="btn-gradient-hover group relative inline-flex items-center justify-center px-6 py-3 font-semibold text-white rounded-xl shadow-lg w-full" 
                    data-testid={`button-read-${post.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReadArticle(post);
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Read Article
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}