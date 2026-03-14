import { useParams, Link } from 'wouter';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, User } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import SEO from '@/components/SEO';

/* ── Component ─────────────────────────────────────────────────────── */

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
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

  /* Related posts: same category, excluding current */
  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 2);

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
      />

      <div className="pt-20">
        {/* ── Breadcrumb ──────────────────────────────────── */}
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
            <Link href="/blog">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Insights
              </span>
            </Link>
          </div>
        </div>

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
                <User className="h-3.5 w-3.5" /> {post.author.name}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {publishDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {post.readingTime}
              </span>
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
        </article>

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
