import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * Floating WhatsApp button (bottom-right).
 *
 * - Appears after the user scrolls past the hero (~400 px).
 * - Hidden on the Contact page (the form is the CTA there).
 * - Click opens a mini card with a pre-filled WhatsApp link.
 * - Mobile: positioned to avoid overlap with bottom nav bars.
 */

const WHATSAPP_NUMBER = '918040948407';
const PRE_FILLED_MESSAGE = encodeURIComponent(
  "Hi TalPro, I'd like to discuss my hiring requirements.",
);

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  // Hide on the Contact page
  const isContactPage = location === '/contact';

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isContactPage) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="panel"
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-72 rounded-2xl bg-background border border-border shadow-xl p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                    <h4 className="font-semibold text-sm">Chat with us</h4>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="p-1 rounded-md hover:bg-muted transition-colors -mt-1 -mr-1"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  Tell us about your hiring needs — we typically respond within
                  minutes during business hours.
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${PRE_FILLED_MESSAGE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center text-sm font-semibold py-2.5 rounded-xl bg-[#25D366] text-white hover:bg-[#20BD5A] transition-colors"
                >
                  Start WhatsApp Chat
                </a>
              </motion.div>
            ) : (
              <motion.button
                key="fab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(true)}
                aria-label="Chat on WhatsApp"
                className="flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                <WhatsAppIcon className="h-7 w-7" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
