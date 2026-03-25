import { Linkedin, Twitter, Share2, Link2, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { analytics } from '@/lib/analytics';

interface SocialShareBarProps {
  /** Page title for share text */
  title: string;
  /** Optional description/excerpt for share text */
  description?: string;
  /** URL to share — defaults to current page */
  url?: string;
  /** Orientation of the bar */
  layout?: 'horizontal' | 'vertical';
  /** Show label text next to icons */
  showLabels?: boolean;
  /** Content type for analytics tracking */
  contentType?: 'blog' | 'case_study';
}

const BASE_URL = 'https://talproindia.com';

/**
 * Reusable social share bar — LinkedIn, X, WhatsApp, Copy Link.
 * Uses native Web Share API as fallback on mobile.
 *
 * UTM parameters are appended automatically for attribution tracking.
 */
export default function SocialShareBar({
  title,
  description,
  url,
  layout = 'horizontal',
  showLabels = false,
  contentType = 'blog',
}: SocialShareBarProps) {
  const [copied, setCopied] = useState(false);

  const pageUrl = url ?? (typeof window !== 'undefined' ? window.location.href : BASE_URL);

  const utmUrl = (source: string) => {
    const u = new URL(pageUrl);
    u.searchParams.set('utm_source', source);
    u.searchParams.set('utm_medium', 'social');
    u.searchParams.set('utm_campaign', 'share');
    return u.toString();
  };

  const shareText = description
    ? `${title} — ${description}`
    : title;

  const channels = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(utmUrl('linkedin'))}`,
      color: 'hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]',
    },
    {
      name: 'X',
      icon: Twitter,
      href: `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(utmUrl('twitter'))}&via=talproindia`,
      color: 'hover:bg-black/5 hover:text-black',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${utmUrl('whatsapp')}`)}`,
      color: 'hover:bg-[#25D366]/10 hover:text-[#25D366]',
    },
  ];

  const handleCopyLink = async () => {
    analytics.trackSocialShare('copy_link', contentType, title);
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input');
      input.value = pageUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url: pageUrl });
      } catch {
        // User cancelled or error — ignore
      }
    }
  };

  const isVertical = layout === 'vertical';
  const containerClass = isVertical
    ? 'flex flex-col items-center gap-2'
    : 'flex items-center gap-2';

  const buttonBase =
    'inline-flex items-center justify-center gap-1.5 rounded-lg border border-border/50 bg-background text-muted-foreground transition-all duration-200';
  const buttonSize = showLabels
    ? 'px-3 py-2 text-xs font-medium'
    : 'h-9 w-9 text-sm';

  return (
    <div className={containerClass}>
      {/* Share label */}
      {!isVertical && (
        <span className="text-xs font-medium text-muted-foreground mr-1">Share:</span>
      )}

      {channels.map(({ name, icon: Icon, href, color }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${name}`}
          onClick={() => analytics.trackSocialShare(name.toLowerCase(), contentType, title)}
          className={`${buttonBase} ${buttonSize} ${color}`}
        >
          <Icon className="h-4 w-4" />
          {showLabels && <span>{name}</span>}
        </a>
      ))}

      {/* Copy link button */}
      <button
        onClick={handleCopyLink}
        aria-label="Copy link"
        className={`${buttonBase} ${buttonSize} hover:bg-accent/10 hover:text-accent`}
      >
        <Link2 className="h-4 w-4" />
        {showLabels && <span>{copied ? 'Copied!' : 'Copy'}</span>}
        {!showLabels && copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-foreground text-background px-2 py-0.5 rounded whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>

      {/* Native share (mobile only) */}
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button
          onClick={handleNativeShare}
          aria-label="Share"
          className={`${buttonBase} ${buttonSize} hover:bg-primary/10 hover:text-primary sm:hidden`}
        >
          <Share2 className="h-4 w-4" />
          {showLabels && <span>More</span>}
        </button>
      )}
    </div>
  );
}
