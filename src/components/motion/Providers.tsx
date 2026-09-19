"use client";

import { MotionConfig, motion, useScroll, useSpring } from "motion/react";

// Global motion settings plus the gold reading-progress bar at the very top of the page.
export function MotionProviders({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.16, 1, 0.3, 1] }}>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-linear-to-r from-brand via-brand-light to-brand"
        style={{ scaleX }}
      />
      {children}
    </MotionConfig>
  );
}
