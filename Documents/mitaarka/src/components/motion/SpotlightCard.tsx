"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";

// Card that tilts toward the cursor, with a gold spotlight on its surface and border.
export function SpotlightCard({
  href,
  children,
  className = "",
  tilt = 6,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  tilt?: number;
}) {
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const spring = { stiffness: 180, damping: 18 };
  const rx = useSpring(0, spring);
  const ry = useSpring(0, spring);

  const glow = useMotionTemplate`radial-gradient(360px circle at ${mx}px ${my}px, rgb(200 154 74 / 0.16), transparent 70%)`;
  const border = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, rgb(200 154 74 / 0.9), transparent 70%)`;

  const inner = (
    <>
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: glow }} />
      <div className="relative h-full">{children}</div>
    </>
  );
  const innerClass = `relative block h-full overflow-hidden rounded-[15px] bg-surface ${className}`;

  return (
    <motion.div
      className="group relative h-full rounded-2xl bg-line p-px [transform-style:preserve-3d]"
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        mx.set(x);
        my.set(y);
        ry.set((x / r.width - 0.5) * tilt);
        rx.set(-(y / r.height - 0.5) * tilt);
      }}
      onPointerLeave={() => {
        mx.set(-400);
        my.set(-400);
        rx.set(0);
        ry.set(0);
      }}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: border }} />
      {href ? (
        <Link href={href} className={innerClass}>
          {inner}
        </Link>
      ) : (
        <div className={innerClass}>{inner}</div>
      )}
    </motion.div>
  );
}
