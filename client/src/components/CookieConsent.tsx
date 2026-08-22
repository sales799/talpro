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
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed bottom-3 left-3 right-3 z-50 animate-in slide-in-from-bottom duration-500 sm:left-auto sm:right-5 sm:bottom-5 sm:w-full sm:max-w-sm"
    >
      <div className="relative bg-background border border-border rounded-xl shadow-xl shadow-black/15 p-4">
        {/* Close button */}
        <button
          onClick={handleDecline}
          className="absolute top-3 right-3 text-slate-600 hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3">
          <Cookie className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p id="cookie-consent-title" className="text-sm font-semibold text-foreground mb-1">
              We respect your privacy
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              Optional analytics help us improve the site. Essential cookies stay on.
              {' '}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-teal-700 underline hover:no-underline hover:text-teal-900"
              >
                {showDetails ? 'Hide details' : 'Learn more'}
              </button>
            </p>

            {showDetails && (
              <div className="mt-3 text-xs text-slate-700 space-y-2 bg-muted/30 rounded-lg p-3">
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
                <p className="text-[10px] text-slate-600 pt-1">
                  Compliant with India's Digital Personal Data Protection Act (DPDP) 2023.
                  See our{' '}
                  <a href="/privacy-policy" className="text-teal-800 underline hover:text-teal-950">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={handleAccept}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] text-xs font-semibold hover:brightness-105 transition-all"
              >
                Accept all
              </button>
              <button
                onClick={handleDecline}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-border text-xs font-medium text-slate-700 hover:bg-muted/50 transition-all"
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
