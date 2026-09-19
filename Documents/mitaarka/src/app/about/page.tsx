import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are at Mitraarka Software Solutions and how we work with our clients.",
};

const values = [
  { title: "Partnership", text: "Mitra means friend. We work as an extension of your team, not a vendor across the table." },
  { title: "Clarity", text: "Arka means the sun. We bring light to complex problems with honest advice and plain language." },
  { title: "Craft", text: "We care about the details users notice and the ones they never see." },
  { title: "Ownership", text: "We take responsibility for outcomes, and you keep full ownership of your code and data." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A friend who shines like the sun"
        intro="Mitraarka combines two Sanskrit words, mitra (friend) and arka (sun). That is the kind of technology partner we set out to be."
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Building software people enjoy using</h2>
        </Reveal>
        <Reveal delay={0.15} className="space-y-5 text-lg leading-relaxed text-muted">
          <p>
            Mitraarka Software Solutions helps startups, SMEs and enterprises turn ideas into reliable
            digital products. We cover the full journey: strategy, design, engineering, cloud and support.
          </p>
          <p>
            Every engagement starts with listening. We learn how your business runs, where time is lost,
            and what success looks like, then build the smallest thing that proves value and grow from there.
          </p>
        </Reveal>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Our values</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">What guides our work</h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <StaggerItem key={v.title}>
                <SpotlightCard className="p-7">
                  <span className="font-display text-xs text-brand">0{i + 1}</span>
                  <div className="mt-4 h-1 w-10 rounded bg-linear-to-r from-brand to-brand-light transition-all duration-500 group-hover:w-20" />
                  <h3 className="mt-5 text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-muted">{v.text}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
