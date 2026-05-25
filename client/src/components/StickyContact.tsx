import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { Link } from 'wouter';

/**
 * Floating sticky CTA button (bottom-right) that appears after scrolling.
 *
 * - Fades in after user scrolls past the hero fold (~500px)
 * - Click expands to a mini contact prompt with a link to /contact
 * - Close button collapses back to the FAB icon
 */

export default function StickyContact() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 500);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
                className="w-72 rounded-lg bg-background border border-border shadow-xl p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-sm">Need tech talent?</h4>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="p-1 rounded-md hover:bg-muted transition-colors -mt-1 -mr-1"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  Tell us about your hiring needs and get a curated shortlist
                  within 48 hours.
                </p>
                <Link href="/contact">
                  <span className="block w-full text-center text-sm font-semibold py-2.5 rounded-lg bg-warning text-warning-foreground hover:bg-warning/90 transition-all cursor-pointer">
                    Get Talent →
                  </span>
                </Link>
              </motion.div>
            ) : (
              <motion.button
                key="fab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(true)}
                aria-label="Contact us"
                className="flex items-center justify-center h-14 w-14 rounded-full bg-warning text-warning-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                <MessageCircle className="h-6 w-6" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
