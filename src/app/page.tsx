import Link from "next/link";
import { services } from "@/content/services";
import { CtaBand } from "@/components/CtaBand";
import { HeroSun } from "@/components/HeroSun";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ServiceIcon } from "@/components/ServiceIcon";
import { TechMarquee } from "@/components/TechMarquee";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { CountUp } from "@/components/motion/CountUp";
import { Magnetic } from "@/components/motion/Magnetic";
import { RaysBackdrop } from "@/components/motion/RaysBackdrop";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

const stats = [
  { value: "6+", label: "Core service lines" },
  { value: "100%", label: "Code ownership for clients" },
  { value: "24h", label: "Response time on enquiries" },
  { value: "1", label: "Team from idea to launch" },
];

const process = [
  { step: "01", title: "Discover", text: "We learn your goals, users and constraints, then agree on scope and success metrics." },
  { step: "02", title: "Design", text: "Wireframes and prototypes you can click through before a line of production code is written." },
  { step: "03", title: "Build", text: "Short sprints with a demo every two weeks, so you always see real progress." },
  { step: "04", title: "Launch & grow", text: "We ship, monitor and keep improving the product as your business grows." },
];

const reasons = [
  { title: "Transparent pricing", text: "Fixed quotes for defined scope, clear rates for ongoing work. No surprise invoices.", icon: "M12 3v18M17 7H9.5a3 3 0 000 6h5a3 3 0 010 6H6" },
  { title: "Senior-led delivery", text: "Experienced engineers own your project from the first call to the final release.", icon: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0" },
  { title: "Built to last", text: "Clean, documented, tested code that your team or ours can maintain for years.", icon: "M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="rays relative isolate overflow-hidden">
        <RaysBackdrop />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-32 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.1fr_1fr] lg:pb-40">
          <div>
            <Reveal y={12}>
              <p className="eyebrow-pill">Software Solutions · Hanumakonda</p>
            </Reveal>
            <AnimatedHeading
              text="Software that rises with your business."
              highlight={["rises"]}
              className="mt-7 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
              delay={0.15}
            />
            <Reveal delay={0.6} y={16}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
                We design, build and scale custom software, websites, mobile apps and AI automation for companies
                that want technology to work as hard as they do.
              </p>
            </Reveal>
            <Reveal delay={0.8} y={16} className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  href="/contact"
                  className="btn-glow group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 font-semibold transition-colors hover:bg-brand-light"
                >
                  Start a project
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </Magnetic>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-semibold backdrop-blur transition-colors hover:border-white/60 hover:bg-white/10"
              >
                Explore services
                <span className="transition-transform group-hover:translate-x-1">↗</span>
              </Link>
            </Reveal>
          </div>
          <HeroSun />
        </div>
      </section>

      {/* Stats: floating glass card overlapping the hero */}
      <section className="relative z-10 mx-auto -mt-16 max-w-6xl px-5 sm:px-8">
        <Stagger
          as="dl"
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line shadow-[0_30px_60px_-30px_rgba(19,17,14,0.35)] md:grid-cols-4"
        >
          {stats.map((s) => (
            <StaggerItem key={s.label} className="flex flex-col-reverse bg-white/95 px-6 py-8 text-center backdrop-blur">
              <dt className="mt-1 text-sm text-muted">{s.label}</dt>
              <dd className="text-4xl font-extrabold tracking-tight text-brand">
                <CountUp value={s.value} />
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-5xl">
              End-to-end services under one roof
            </h2>
          </div>
          <Link href="/services" className="group inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-dark">
            View all services <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <StaggerItem key={s.slug}>
              <SpotlightCard href={`/services/${s.slug}`} className="p-8">
                <div className="flex items-start justify-between">
                  <ServiceIcon slug={s.slug} />
                  <span className="font-display text-xs text-ink/25">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.summary}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Learn more
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Technology marquee */}
      <section className="border-y border-line bg-bg py-16">
        <Reveal className="mx-auto mb-10 max-w-7xl px-5 text-center sm:px-8">
          <p className="eyebrow">Our toolkit</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Modern technology, proven in production</h2>
        </Reveal>
        <TechMarquee />
      </section>

      {/* Process */}
      <section className="bg-surface py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">How we work</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">A clear path from idea to launch</h2>
          </Reveal>
          <ProcessTimeline steps={process} />
        </div>
      </section>

      {/* Why us: bento grid */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Why Mitraarka</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">A technology partner you can rely on</h2>
        </Reveal>
        <Stagger className="mt-14 grid gap-5 md:grid-cols-3 md:grid-rows-2">
          <StaggerItem className="md:row-span-2">
            <div className="rays relative isolate flex h-full min-h-80 flex-col justify-end overflow-hidden rounded-3xl p-9">
              <RaysBackdrop spotlight={false} />
              <div className="relative">
                <p className="eyebrow-pill">Mitra + Arka</p>
                <h3 className="mt-5 text-3xl font-bold leading-tight">
                  A friend who <span className="text-shimmer">shines like the sun.</span>
                </h3>
                <p className="mt-4 text-white/70">
                  Our name is our promise: a long-term partner who brings clarity to complex problems and stays with you
                  after launch.
                </p>
              </div>
            </div>
          </StaggerItem>
          {reasons.map((r) => (
            <StaggerItem key={r.title} className={r.title === "Built to last" ? "md:col-span-2" : ""}>
              <SpotlightCard className="p-8" tilt={3}>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand-dark">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={r.icon} />
                  </svg>
                </span>
                <h3 className="mt-5 text-lg font-bold">{r.title}</h3>
                <p className="mt-2 text-muted">{r.text}</p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CtaBand />
    </>
  );
}
