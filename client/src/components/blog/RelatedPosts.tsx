import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string | null;
  category: string | null;
  tags: string[] | null;
  publishedAt: string | null;
}

interface RelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
  limit?: number;
}

export default function RelatedPosts({ currentPost, allPosts, limit = 3 }: RelatedPostsProps) {
  const relatedPosts = allPosts
    .filter((post) => post.id !== currentPost.id)
    .map((post) => {
      let score = 0;
      
      if (post.category && post.category === currentPost.category) {
        score += 10;
      }
      
      const currentTags = currentPost.tags || [];
      const postTags = post.tags || [];
      const sharedTags = currentTags.filter((tag) => postTags.includes(tag));
      score += sharedTags.length * 5;
      
      return { post, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.publishedAt || '').getTime() - new Date(a.post.publishedAt || '').getTime();
    })
    .slice(0, limit * 2);

  let finalPosts = relatedPosts.filter(({ score }) => score > 0).slice(0, limit);

  if (finalPosts.length < limit) {
    const needed = limit - finalPosts.length;
    const recentPosts = relatedPosts
      .filter(({ post, score }) => 
        !finalPosts.find(fp => fp.post.id === post.id) &&
        score === 0
      )
      .slice(0, needed);
    finalPosts = [...finalPosts, ...recentPosts];
  }

  let displayPosts = finalPosts.map(({ post }) => post);

  if (displayPosts.length === 0 && allPosts.length > 1) {
    displayPosts = allPosts
      .filter((post) => post.id !== currentPost.id)
      .sort((a, b) => new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime())
      .slice(0, limit);
  }

  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Related Posts</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid={`card-related-post-${post.slug}`}>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {post.excerpt && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }) : 'Date not available'}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
