import { motion, type Variant } from 'framer-motion';
import { type ReactNode } from 'react';

type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  direction?: AnimationDirection;
  delay?: number;
  duration?: number;
  /** Distance in pixels for the slide effect */
  distance?: number;
  /** Trigger animation once or every time it enters viewport */
  once?: boolean;
  /** How much of the element must be visible to trigger (0-1) */
  threshold?: number;
  /** HTML element to render as */
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'span';
}

const directionOffsets: Record<AnimationDirection, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

export default function AnimatedSection({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 30,
  once = true,
  threshold = 0.15,
  as = 'div',
}: AnimatedSectionProps) {
  const offset = directionOffsets[direction];

  const hidden: Variant = {
    opacity: 0,
    x: offset.x * distance,
    y: offset.y * distance,
  };

  const visible: Variant = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for smooth decel
    },
  };

  const MotionComponent = motion[as] as typeof motion.div;

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={{ hidden, visible }}
    >
      {children}
    </MotionComponent>
  );
}

/**
 * Stagger container — wrap multiple AnimatedSection children
 * to create a cascading reveal effect.
 */
export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  once = true,
  threshold = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  threshold?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger item — use inside a StaggerContainer.
 * Inherits animation trigger from parent container.
 */
export function StaggerItem({
  children,
  className = '',
  direction = 'up',
  distance = 20,
  duration = 0.5,
}: {
  children: ReactNode;
  className?: string;
  direction?: AnimationDirection;
  distance?: number;
  duration?: number;
}) {
  const offset = directionOffsets[direction];

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          x: offset.x * distance,
          y: offset.y * distance,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
