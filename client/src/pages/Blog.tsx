import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import {
  ArrowRight, Calendar, Clock, Tag, BookOpen, Mail, Loader2,
} from 'lucide-react';
import { blogPosts as staticPosts, type BlogPostData } from '@/data/blogPosts';
import SEO from '@/components/SEO';
import NewsletterSignup from '@/components/NewsletterSignup';

/* ── Unified post type (DB posts + static posts) ─────────────────── */

interface DisplayPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  readingTime: string;
  featured: boolean;
}

/** Convert a DB API post to our display format */
function normalizeDbPost(p: any): DisplayPost {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category || 'Insights',
    tags: p.tags || [],
    author: p.author || 'TalPro Editorial',
    publishedAt: p.publishedAt || p.published_at || p.createdAt || p.created_at,
    readingTime: p.readingTime
      ? `${p.readingTime} min read`
      : p.reading_time
        ? `${p.reading_time} min read`
        : '5 min read',
    featured: p.featured || false,
  };
}

/** Convert a static post to display format */
function normalizeStaticPost(p: BlogPostData): DisplayPost {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    tags: p.tags,
    author: p.author.name,
    publishedAt: p.publishedAt,
    readingTime: p.readingTime,
    featured: p.featured || false,
  };
}

/* ── Helpers ──────────────────────────────────────────────────────── */

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/* ── Card ─────────────────────────────────────────────────────────── */

function PostCard({ post }: { post: DisplayPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group rounded-2xl border border-border bg-background overflow-hidden hover:shadow-md hover:border-accent/30 transition-all cursor-pointer h-full flex flex-col">
        {/* Category banner */}
        <div className="px-5 pt-5">
          <span className="inline-block text-[10px] uppercase tracking-widest font-semibold text-accent">
            {post.category}
          </span>
        </div>

        <div className="p-5 pt-3 flex flex-col flex-1">
          <h2 className="text-lg font-bold tracking-tight mb-2 group-hover:text-accent transition-colors leading-snug">
            {post.title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {post.readingTime}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-muted text-muted-foreground border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ── Featured Post ────────────────────────────────────────────────── */

function FeaturedPost({ post }: { post: DisplayPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group rounded-2xl border border-border bg-background overflow-hidden hover:shadow-md hover:border-accent/30 transition-all cursor-pointer">
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block text-[10px] uppercase tracking-widest font-semibold text-accent">
              {post.category}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-[hsl(38,92%,50%)]/10 text-[hsl(38,92%,50%)]">
              Featured
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 group-hover:text-accent transition-colors leading-snug">
            {post.title}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-5 max-w-2xl">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {post.readingTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" /> {post.tags.slice(0, 2).join(', ')}
            </span>
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:underline">
            Read Article <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts, setPosts] = useState<DisplayPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch from API first, fall back to static posts
  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      try {
        const res = await fetch('/api/blog/posts?limit=50');
        if (!cancelled && res.ok) {
          const data = await res.json();
          // API returns { posts: [...], pagination: {...} }
          const apiPosts = Array.isArray(data) ? data : data.posts || [];
          if (apiPosts.length > 0) {
            setPosts(apiPosts.map(normalizeDbPost));
          } else {
            // API returned empty — use static fallback
            setPosts(staticPosts.map(normalizeStaticPost));
          }
        } else {
          setPosts(staticPosts.map(normalizeStaticPost));
        }
      } catch {
        // Network error — use static fallback
        setPosts(staticPosts.map(normalizeStaticPost));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadPosts();
    return () => { cancelled = true; };
  }, []);

  const categories = ['All', ...new Set(posts.map((p) => p.category))];
  const featured = posts.filter((p) => p.featured);
  const filtered =
    activeCategory === 'All'
      ? posts.filter((p) => !p.featured)
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      <SEO
        title="Insights — IT Staffing Trends, Hiring Guides & Market Intelligence"
        description="Expert insights on IT hiring trends, salary benchmarks, GCC setup guides, and technology talent market intelligence from TalPro India."
        path="/blog"
      />

      <div className="pt-20">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-[hsl(222,47%,11%)] to-[hsl(222,47%,15%)] text-white py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs uppercase tracking-widest text-[hsl(187,92%,41%)] font-semibold mb-4">
              Insights
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Hiring Intelligence,{' '}
              <span className="text-[hsl(38,92%,50%)]">Delivered</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Market insights, salary benchmarks, and hiring playbooks from
              India's specialist IT staffing team.
            </p>
          </div>
        </section>

        {/* ── Loading state ────────────────────────────────── */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        )}

        {!loading && (
          <>
            {/* ── Featured posts ──────────────────────────── */}
            {featured.length > 0 && activeCategory === 'All' && (
              <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">
                <div className="space-y-6">
                  {featured.map((post) => (
                    <FeaturedPost key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            )}

            {/* ── Category filter + grid ─────────────────── */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-14 md:pb-20">
              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
                      activeCategory === cat
                        ? 'bg-[hsl(222,47%,11%)] text-white border-transparent'
                        : 'border-border text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Post grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    No posts in this category yet. Check back soon.
                  </p>
                </div>
              )}
            </section>
          </>
        )}

        {/* ── Newsletter CTA ─────────────────────────────── */}
        <section className="bg-[hsl(222,47%,11%)] text-white py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <Mail className="h-6 w-6 text-[hsl(38,92%,50%)] mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Stay Ahead of the Market
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              Get hiring trend reports, salary guides, and IT staffing insights
              delivered to your inbox.
            </p>
            <NewsletterSignup variant="dark" />
          </div>
        </section>
      </div>
    </>
  );
}
