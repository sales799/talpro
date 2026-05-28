import { useParams, Link } from 'wouter';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, User, Loader2, Linkedin } from 'lucide-react';
import { blogPosts as staticPosts } from '@/data/blogPosts';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import SocialShareBar from '@/components/SocialShareBar';
import SocialFollowCTA from '@/components/SocialFollowCTA';

/* ── Types ─────────────────────────────────────────────────────────── */

interface PostDetail {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  authorRole: string;
  publishedAt: string;
  readingTime: string;
  featured: boolean;
}

interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
}

/* ── Component ─────────────────────────────────────────────────────── */

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [related, setRelated] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadPost() {
      setLoading(true);
      setNotFound(false);

      // Try API first
      try {
        const res = await fetch(`/api/blog/posts/${slug}`);
        if (!cancelled && res.ok) {
          const data = await res.json();

          // For seed posts with placeholder content, merge with static full content
          const staticMatch = staticPosts.find((p) => p.slug === data.slug);
          const content = (data.content && data.content.length > 500)
            ? data.content
            : staticMatch?.content || data.content;

          setPost({
            slug: data.slug,
            title: data.title,
            excerpt: data.excerpt,
            content,
            category: data.category || 'Insights',
            tags: data.tags || [],
            author: data.author || 'TalPro Editorial',
            authorRole: data.authorRole || data.author_role || 'Market Intelligence Team',
            publishedAt: data.publishedAt || data.published_at || data.createdAt || data.created_at,
            readingTime: data.readingTime
              ? `${data.readingTime} min read`
              : data.reading_time
                ? `${data.reading_time} min read`
                : '5 min read',
            featured: data.featured || false,
          });
          // Load related posts from API
          loadRelated(data.category, data.slug);
          if (!cancelled) setLoading(false);
          return;
        }
      } catch {
        // API failed — try static fallback
      }

      // Static fallback
      const staticPost = staticPosts.find((p) => p.slug === slug);
      if (!cancelled) {
        if (staticPost) {
          setPost({
            slug: staticPost.slug,
            title: staticPost.title,
            excerpt: staticPost.excerpt,
            content: staticPost.content,
            category: staticPost.category,
            tags: staticPost.tags,
            author: staticPost.author.name,
            authorRole: staticPost.author.role,
            publishedAt: staticPost.publishedAt,
            readingTime: staticPost.readingTime,
            featured: staticPost.featured || false,
          });
          // Related from static
          const staticRelated = staticPosts
            .filter((p) => p.slug !== slug)
            .filter((p) => p.category === staticPost.category || p.tags.some((t) => staticPost.tags.includes(t)))
            .slice(0, 2)
            .map((r) => ({ slug: r.slug, title: r.title, excerpt: r.excerpt, category: r.category }));
          setRelated(staticRelated);
        } else {
          setNotFound(true);
        }
        setLoading(false);
      }
    }

    async function loadRelated(category: string, currentSlug: string) {
      try {
        const res = await fetch('/api/blog/posts?limit=10');
        if (res.ok) {
          const data = await res.json();
          const allPosts = Array.isArray(data) ? data : data.posts || [];
          const filtered = allPosts
            .filter((p: any) => p.slug !== currentSlug)
            .filter((p: any) => p.category === category || (p.tags || []).some((t: string) => post?.tags?.includes(t)))
            .slice(0, 2)
            .map((r: any) => ({ slug: r.slug, title: r.title, excerpt: r.excerpt, category: r.category || 'Insights' }));
          setRelated(filtered);
        }
      } catch {
        // Related posts are non-critical — ignore errors
      }
    }

    loadPost();
    return () => { cancelled = true; };
  }, [slug]);

  /* ── Loading ────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="pt-20 min-h-[70vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  /* ── 404 ────────────────────────────────────────────── */
  if (notFound || !post) {
    return (
      <div className="pt-20 min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-7xl font-extrabold text-[hsl(222,47%,11%)] mb-4">404</div>
          <h1 className="text-xl font-bold mb-2">Article not found</h1>
          <p className="text-muted-foreground mb-6">
            This article may have been moved or doesn't exist.
          </p>
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold cursor-pointer">
              <ArrowLeft className="h-4 w-4" /> All Articles
            </span>
          </Link>
        </div>
      </div>
    );
  }

  /* ── Article ────────────────────────────────────────── */
  const publishDate = new Date(post.publishedAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <SEO
        title={`${post.title} — TalPro Insights`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={`https://nirantar.talpro.in/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.category + ' — TalPro Insights')}&type=blog`}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
          dateModified: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
          author: {
            '@type': 'Person',
            name: post.author,
            jobTitle: post.authorRole,
            url: 'https://www.linkedin.com/in/bhaskar-anand-it-staffing/',
          },
          publisher: {
            '@type': 'Organization',
            name: 'TalPro India',
            url: 'https://nirantar.talpro.in',
            logo: {
              '@type': 'ImageObject',
              url: 'https://nirantar.talpro.in/logo.png',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://nirantar.talpro.in/blog/${post.slug}`,
          },
          articleSection: post.category,
          keywords: post.tags?.join(', '),
          image: 'https://nirantar.talpro.in/og-image.png',
        }}
      />

      <div className="pt-20">
        {/* ── Breadcrumb with JSON-LD ─────────────────────── */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Insights', href: '/blog' },
            { label: post.title },
          ]}
        />
        {/* ── Header ──────────────────────────────────────── */}
        <header className="bg-gradient-to-b from-[hsl(222,47%,11%)] to-[hsl(222,47%,15%)] text-white py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <span className="inline-block text-xs uppercase tracking-widest text-[hsl(187,92%,41%)] font-semibold mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" /> {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {publishDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {post.readingTime}
              </span>
            </div>

            {/* Social share */}
            <div className="mt-6">
              <SocialShareBar
                title={post.title}
                description={post.excerpt}
                url={`https://nirantar.talpro.in/blog/${post.slug}`}
              />
            </div>
          </div>
        </header>

        {/* ── Article body ────────────────────────────────── */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div
            className="prose prose-neutral max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-muted-foreground
              prose-li:text-[15px] prose-li:text-muted-foreground
              prose-strong:text-foreground
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-accent prose-blockquote:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-border">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium rounded-lg bg-muted text-muted-foreground border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom share bar */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm font-medium text-muted-foreground mb-3">Found this useful? Share it with your network.</p>
            <SocialShareBar
              title={post.title}
              description={post.excerpt}
              url={`https://nirantar.talpro.in/blog/${post.slug}`}
              showLabels
            />
          </div>
        </article>

        {/* ── Author card ──────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 border-t border-border/30">
          <div className="flex items-start gap-4 p-5 rounded-xl bg-muted/30 border border-border/30">
            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
              <User className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">{post.author}</span>
                <a
                  href="https://www.linkedin.com/in/bhaskar-anand-it-staffing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A66C2] hover:text-[#0A66C2]/80 transition-colors"
                  aria-label={`${post.author} on LinkedIn`}
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{post.authorRole}</p>
              <p className="text-xs text-muted-foreground/80 leading-relaxed">
                Insights on India's IT staffing market — hiring trends, salary benchmarks, and talent strategy for GCCs and enterprises.
              </p>
            </div>
          </div>
        </div>

        {/* ── Social Follow CTA ──────────────────────────────── */}
        <SocialFollowCTA
          heading="Enjoyed this article?"
          subtitle="Follow TalPro for weekly insights on India's IT hiring market."
          variant="inline"
        />

        {/* ── Related posts ───────────────────────────────── */}
        {related.length > 0 && (
          <section className="bg-muted/30 py-12 md:py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <h2 className="text-xl font-bold tracking-tight mb-6">Related Articles</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`}>
                    <div className="group rounded-xl border border-border bg-background p-5 hover:shadow-md hover:border-accent/30 transition-all cursor-pointer">
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-accent">
                        {r.category}
                      </span>
                      <h3 className="font-semibold text-base mt-2 mb-2 group-hover:text-accent transition-colors leading-snug">
                        {r.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {r.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ─────────────────────────────────────────── */}
        <section className="py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Need Help Building Your Team?
            </h2>
            <p className="text-muted-foreground mb-8">
              TalPro places senior engineers, builds GCC teams, and provides
              contract staffing across India. Let's talk about your hiring needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold hover:bg-[hsl(38,92%,55%)] transition-colors cursor-pointer">
                  Start Hiring <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/blog">
                <span className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-border font-semibold hover:bg-muted transition-colors cursor-pointer">
                  More Articles
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
