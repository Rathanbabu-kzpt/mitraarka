"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

type Step = { step: string; title: string; text: string };

function Node({ progress, index, total }: { progress: MotionValue<number>; index: number; total: number }) {
  const start = index / total;
  const fill = useTransform(progress, [start, start + 0.12], [0, 1]);
  const scale = useTransform(progress, [start, start + 0.12], [0.6, 1]);
  return (
    <span className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand bg-bg">
      <motion.span className="h-2.5 w-2.5 rounded-full bg-brand" style={{ opacity: fill, scale }} />
    </span>
  );
}

// Steps connected by a gold line that fills in as you scroll through the section.
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <ol ref={ref} className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
      {/* Track + fill: horizontal on desktop, vertical on mobile */}
      <span aria-hidden className="absolute left-2.5 top-2.5 hidden h-0.5 w-[calc(100%-1.25rem)] bg-line md:block" />
      <motion.span
        aria-hidden
        className="absolute left-2.5 top-2.5 hidden h-0.5 w-[calc(100%-1.25rem)] origin-left bg-linear-to-r from-brand to-brand-light md:block"
        style={{ scaleX: progress }}
      />
      <span aria-hidden className="absolute left-2.5 top-2.5 h-[calc(100%-1.25rem)] w-0.5 bg-line md:hidden" />
      <motion.span
        aria-hidden
        className="absolute left-2.5 top-2.5 h-[calc(100%-1.25rem)] w-0.5 origin-top bg-linear-to-b from-brand to-brand-light md:hidden"
        style={{ scaleY: progress }}
      />

      {steps.map((s, i) => (
        <motion.li
          key={s.step}
          className="relative pl-10 md:pl-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: i * 0.12 }}
        >
          <span className="absolute left-0 top-0 md:static">
            <Node progress={progress} index={i} total={steps.length} />
          </span>
          <span className="mt-0 block font-display text-xs text-brand md:mt-6">{s.step}</span>
          <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
          <p className="mt-2 text-muted">{s.text}</p>
        </motion.li>
      ))}
    </ol>
  );
}
