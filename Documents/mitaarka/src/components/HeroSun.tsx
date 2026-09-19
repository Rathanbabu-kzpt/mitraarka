"use client";

import { motion } from "motion/react";

// Animated take on the logo mark: the sun rises over the horizon, rays draw outward
// from the horizon up, then the rays shimmer and the glow breathes.
const CX = 300;
const CY = 300;
// [angle from horizon (deg), inner radius, outer radius, stroke width]
const RAYS: [number, number, number, number][] = [
  [18, 150, 246, 12],
  [36, 152, 272, 14],
  [54, 150, 262, 14],
  [66, 240, 284, 7],
  [73, 142, 224, 11],
  [90, 142, 292, 14],
];

const r2 = (n: number) => Math.round(n * 100) / 100;
const point = (deg: number, r: number) => ({
  x: r2(CX + r * Math.cos((deg * Math.PI) / 180)),
  y: r2(CY - r * Math.sin((deg * Math.PI) / 180)),
});

const rays = RAYS.flatMap(([deg, r1, rOut, w], i) =>
  (deg === 90 ? [deg] : [deg, 180 - deg]).map((a) => ({ a, from: point(a, r1), to: point(a, rOut), w, order: i })),
);

const chips = [
  { label: "AI & Automation", className: "left-[2%] top-[6%]" },
  { label: "Cloud & DevOps", className: "right-[0%] top-[20%]" },
  { label: "Web & Mobile", className: "left-[10%] -bottom-[10%]" },
  { label: "UI/UX Design", className: "right-[10%] -bottom-[10%]" },
];

export function HeroSun() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <svg viewBox="0 0 600 330" className="w-full overflow-visible" role="img" aria-label="Rising sun">
        <defs>
          <radialGradient id="sunGlow">
            <stop offset="0%" stopColor="#e0b364" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9a7026" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sunFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e3b76a" />
            <stop offset="100%" stopColor="#9a7026" />
          </linearGradient>
          <clipPath id="aboveHorizon">
            <rect x="0" y="-50" width="600" height="352" />
          </clipPath>
        </defs>

        <motion.circle
          cx={CX}
          cy={CY}
          r={240}
          fill="url(#sunGlow)"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.08, 0.95] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />

        <g clipPath="url(#aboveHorizon)">
          <motion.path
            d="M176 300 A124 124 0 0 1 424 300 Z"
            fill="url(#sunFill)"
            initial={{ y: 140 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />
        </g>

        {[
          { x1: 162, x2: 36 },
          { x1: 438, x2: 564 },
        ].map((h, i) => (
          <motion.line
            key={i}
            x1={h.x1}
            y1={CY}
            x2={h.x2}
            y2={CY}
            stroke="#b7883a"
            strokeWidth={9}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          />
        ))}

        {rays.map((ray, i) => (
          <motion.g
            key={i}
            animate={{ opacity: [1, 0.45, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 2.4 + ray.order * 0.22 }}
          >
            <motion.line
              x1={ray.from.x}
              y1={ray.from.y}
              x2={ray.to.x}
              y2={ray.to.y}
              stroke="#b7883a"
              strokeWidth={ray.w}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 + ray.order * 0.12, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.g>
        ))}
      </svg>

      {chips.map((chip, i) => (
        <motion.div
          key={chip.label}
          className={`absolute hidden sm:block ${chip.className}`}
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.8 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-white/85 shadow-lg backdrop-blur-md"
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: 2.6 + i * 0.3 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light shadow-[0_0_10px_2px_rgba(224,179,100,0.7)]" />
            {chip.label}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}
