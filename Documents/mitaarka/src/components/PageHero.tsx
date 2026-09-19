import { AnimatedHeading } from "./motion/AnimatedHeading";
import { Reveal } from "./motion/Reveal";
import { RaysBackdrop } from "./motion/RaysBackdrop";

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="rays relative isolate overflow-hidden">
      <RaysBackdrop />
      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-20 sm:px-8 sm:pb-28 sm:pt-24">
        <Reveal y={12}>
          <p className="eyebrow-pill">{eyebrow}</p>
        </Reveal>
        <AnimatedHeading text={title} className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl" delay={0.1} />
        {intro && (
          <Reveal delay={0.45} y={16}>
            <p className="mt-6 max-w-2xl text-lg text-white/70">{intro}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
