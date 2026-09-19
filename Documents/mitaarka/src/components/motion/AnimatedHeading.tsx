"use client";

import { motion } from "motion/react";

// Headline whose words slide up from behind a mask, one after another.
// Words listed in `highlight` get the animated gold shimmer.
export function AnimatedHeading({
  text,
  highlight = [],
  className,
  delay = 0,
  as = "h1",
}: {
  text: string;
  highlight?: string[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2";
}) {
  const Tag = as;
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${highlight.includes(word.replace(/[.,!?]/g, "")) ? "text-shimmer" : ""}`}
            initial={{ y: "110%", rotate: 4 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
