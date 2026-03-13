import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import { type ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Wraps route content with a fade + slide-up animation on route change.
 * Uses wouter's useLocation to derive a key for AnimatePresence.
 *
 * Usage: Wrap the <Switch> (or its parent) inside <PageTransition>.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.25,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
