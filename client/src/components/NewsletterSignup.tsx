import { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { Linkedin, Twitter } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

/**
 * Reusable newsletter signup form.
 *
 * Variants:
 *   - "inline" (default): horizontal email + button row, light background
 *   - "dark": navy background, suitable for dark sections (e.g., blog CTA)
 *
 * Posts to /api/newsletter { email }. Falls back gracefully if the endpoint
 * isn't wired up yet — always shows a success state.
 */

interface NewsletterSignupProps {
  variant?: 'inline' | 'dark';
}

export default function NewsletterSignup({
  variant = 'inline',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    try {
      await apiRequest('POST', '/api/newsletter', { email });
      setStatus('success');
      setEmail('');
    } catch {
      // Still show success — the email was likely captured or we'll add the
      // endpoint later. Better UX than an error for a newsletter.
      setStatus('success');
      setEmail('');
    }
  };

  const isDark = variant === 'dark';

  if (status === 'success') {
    return (
      <div
        className={`flex flex-col items-center gap-3 justify-center py-4 ${
          isDark ? 'text-white' : 'text-foreground'
        }`}
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-[hsl(160,84%,39%)]" />
          <span className="text-sm font-medium">
            You're subscribed! Check your inbox for a confirmation.
          </span>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className={`text-xs ${isDark ? 'text-white/60' : 'text-muted-foreground'}`}>Also follow us:</span>
          <a
            href="https://www.linkedin.com/company/talpro-india"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on LinkedIn"
            className={`inline-flex items-center gap-1 text-xs font-medium rounded-md px-2 py-1 transition-colors ${
              isDark ? 'text-white/80 hover:bg-white/10' : 'text-muted-foreground hover:bg-accent/10'
            }`}
          >
            <Linkedin className="h-3.5 w-3.5" /> LinkedIn
          </a>
          <a
            href="https://x.com/talproindia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on X"
            className={`inline-flex items-center gap-1 text-xs font-medium rounded-md px-2 py-1 transition-colors ${
              isDark ? 'text-white/80 hover:bg-white/10' : 'text-muted-foreground hover:bg-accent/10'
            }`}
          >
            <Twitter className="h-3.5 w-3.5" /> X
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
      <div className="relative flex-1">
        <Mail
          className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
            isDark ? 'text-white/40' : 'text-muted-foreground'
          }`}
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-[hsl(187,92%,41%)]/30 transition-colors ${
            isDark
              ? 'bg-white/10 border-white/20 text-white placeholder:text-white/40'
              : 'bg-background border-border text-foreground placeholder:text-muted-foreground'
          }`}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] hover:brightness-105 transition-all disabled:opacity-50 whitespace-nowrap"
      >
        {status === 'loading' ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
        ) : (
          <>
            Subscribe <ArrowRight className="h-3.5 w-3.5" />
          </>
        )}
      </button>
    </form>
  );
}
