"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

// Layered background for dark sections: slowly turning sun rays, a faint grid,
// a warm horizon glow and a soft spotlight that follows the cursor.
export function RaysBackdrop({ spotlight = true }: { spotlight?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(-1000), { stiffness: 90, damping: 25 });
  const y = useSpring(useMotionValue(-1000), { stiffness: 90, damping: 25 });
  const light = useMotionTemplate`radial-gradient(520px circle at ${x}px ${y}px, rgb(200 154 74 / 0.14), transparent 65%)`;

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!spotlight || !parent) return;
    const move = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };
    parent.addEventListener("pointermove", move);
    return () => parent.removeEventListener("pointermove", move);
  }, [spotlight, x, y]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="rays-spin absolute left-1/2 top-full h-[260vmax] w-[260vmax]" />
      <div className="grid-overlay absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-[radial-gradient(60%_70%_at_50%_100%,rgb(154_112_38/0.38),transparent_70%)]" />
      {spotlight && <motion.div className="absolute inset-0" style={{ background: light }} />}
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-brand-light/60 to-transparent" />
    </div>
  );
}
