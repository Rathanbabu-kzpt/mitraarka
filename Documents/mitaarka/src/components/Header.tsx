"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./Logo";
import { Magnetic } from "./motion/Magnetic";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-500 ${
        scrolled ? "border-line/80 bg-white/80 shadow-[0_10px_30px_-18px_rgba(19,17,14,0.35)] backdrop-blur-xl" : "border-line bg-white"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-[height] duration-500 sm:px-8 ${
          scrolled ? "h-20" : "h-24"
        }`}
      >
        <Logo className={`w-auto transition-[height] duration-500 ${scrolled ? "h-12 sm:h-14" : "h-14 sm:h-16"}`} />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                isActive(item.href) ? "text-brand-dark" : "text-ink hover:text-brand"
              }`}
            >
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-brand-soft"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {item.label}
            </Link>
          ))}
          <span className="ml-4">
            <Magnetic strength={0.25}>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand"
              >
                Start a project
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
          </span>
        </nav>

        <button
          type="button"
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <motion.span className="absolute h-0.5 w-5 rounded bg-ink" animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }} />
          <motion.span className="absolute h-0.5 w-5 rounded bg-ink" animate={{ opacity: open ? 0 : 1 }} />
          <motion.span className="absolute h-0.5 w-5 rounded bg-ink" animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile"
            aria-label="Mobile"
            className="overflow-hidden border-t border-line bg-white md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="px-5 py-4">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-lg font-semibold ${isActive(item.href) ? "bg-brand-soft text-brand-dark" : ""}`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-3 block rounded-xl bg-ink px-4 py-3 text-center font-semibold text-white"
              >
                Start a project →
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
