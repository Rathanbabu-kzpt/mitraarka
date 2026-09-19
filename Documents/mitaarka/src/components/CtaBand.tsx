import Link from "next/link";
import { Magnetic } from "./motion/Magnetic";
import { Reveal } from "./motion/Reveal";
import { RaysBackdrop } from "./motion/RaysBackdrop";

export function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal className="rays relative isolate overflow-hidden rounded-[2rem] px-8 py-20 text-center sm:px-16">
        <RaysBackdrop />
        <div className="relative">
          <p className="eyebrow-pill mx-auto">Let&apos;s build together</p>
          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            Have an idea? We&apos;ll help you <span className="text-shimmer">ship it.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            Tell us what you&apos;re building. You&apos;ll hear back from us within one business day.
          </p>
          <div className="mt-10">
            <Magnetic>
              <Link
                href="/contact"
                className="btn-glow group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 font-semibold text-white transition-colors hover:bg-brand-light"
              >
                Get a free consultation
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
