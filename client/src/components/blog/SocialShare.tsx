import { Button } from '@/components/ui/button';
import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { analytics } from '@/lib/analytics';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
  const { toast } = useToast();
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    analytics.trackSocialShare(platform, 'blog', title);
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'Link copied!',
        description: 'The blog post link has been copied to your clipboard.',
      });
      analytics.event('copy_link', {
        event_category: 'engagement',
        event_label: 'blog_post',
        content_title: title,
      });
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Please copy the URL manually from your browser.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex items-center gap-4 py-6 border-y border-gray-200 dark:border-gray-800 my-8">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Share2 className="w-5 h-5" />
        Share this post:
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleShare('facebook')}
          aria-label="Share on Facebook"
          data-testid="button-share-facebook"
        >
          <Facebook className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleShare('twitter')}
          aria-label="Share on Twitter"
          data-testid="button-share-twitter"
        >
          <Twitter className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleShare('linkedin')}
          aria-label="Share on LinkedIn"
          data-testid="button-share-linkedin"
        >
          <Linkedin className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopyLink}
          aria-label="Copy link"
          data-testid="button-copy-link"
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
