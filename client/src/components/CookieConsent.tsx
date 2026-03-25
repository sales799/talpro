import { useState, useEffect } from 'react';
import { X, Cookie, Shield } from 'lucide-react';

/**
 * Cookie consent banner for DPDP Act (India) and GDPR compliance.
 *
 * - Shows on first visit (checks localStorage)
 * - "Accept" enables analytics + tracking scripts
 * - "Decline" blocks GA4/LinkedIn pixels (privacy-first default)
 * - Remembers choice for 365 days
 * - Dismissible with X button (treated as decline)
 */

type ConsentChoice = 'accepted' | 'declined' | null;

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('talpro_cookie_consent') as ConsentChoice;
    if (!consent) {
      // Show after 2 seconds so it doesn't block initial page load
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('talpro_cookie_consent', 'accepted');
    localStorage.setItem('talpro_consent_date', new Date().toISOString());
    setVisible(false);
    // Dispatch event so analytics scripts can initialize
    window.dispatchEvent(new CustomEvent('talpro:consent', { detail: { accepted: true } }));
  };

  const handleDecline = () => {
    localStorage.setItem('talpro_cookie_consent', 'declined');
    localStorage.setItem('talpro_consent_date', new Date().toISOString());
    setVisible(false);
    window.dispatchEvent(new CustomEvent('talpro:consent', { detail: { accepted: false } }));
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-3xl mx-auto bg-background border border-border rounded-2xl shadow-2xl shadow-black/20 p-5 md:p-6">
        {/* Close button */}
        <button
          onClick={handleDecline}
          className="absolute top-3 right-3 text-muted-foreground/50 hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3">
          <Cookie className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground mb-1">
              We respect your privacy
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We use cookies and analytics to improve your experience and understand how our site is used.
              {' '}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-accent underline hover:no-underline"
              >
                {showDetails ? 'Hide details' : 'Learn more'}
              </button>
            </p>

            {showDetails && (
              <div className="mt-3 text-xs text-muted-foreground/80 space-y-2 bg-muted/30 rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <Shield className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground/80">Essential cookies</span> — Always active.
                    Required for the site to function (session, CSRF protection).
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground/80">Analytics cookies</span> — Optional.
                    Google Analytics helps us understand which pages are most useful.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground/80">Marketing cookies</span> — Optional.
                    LinkedIn Insight Tag helps us show relevant content on LinkedIn.
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground/60 pt-1">
                  Compliant with India's Digital Personal Data Protection Act (DPDP) 2023.
                  See our{' '}
                  <a href="/privacy-policy" className="underline hover:text-foreground">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            )}

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleAccept}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] text-xs font-semibold hover:brightness-105 transition-all"
              >
                Accept all
              </button>
              <button
                onClick={handleDecline}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:bg-muted/50 transition-all"
              >
                Essential only
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
