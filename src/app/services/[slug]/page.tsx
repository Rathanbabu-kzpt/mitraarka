import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/content/services";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { RaysBackdrop } from "@/components/motion/RaysBackdrop";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  return service ? { title: service.title, description: service.summary } : {};
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow="Services" title={service.title} intro={service.summary} />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <h2 className="text-2xl font-bold">Overview</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{service.overview}</p>

          <h2 className="mt-12 text-2xl font-bold">What&apos;s included</h2>
          <Stagger as="ul" className="mt-6 grid gap-3 sm:grid-cols-2">
            {service.offerings.map((o) => (
              <StaggerItem
                as="li"
                key={o}
                className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-brand/50"
              >
                <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-dark">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                <span>{o}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        <Reveal delay={0.15} className="space-y-5 lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface p-7">
            <p className="eyebrow">Technologies</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {service.stack.map((t) => (
                <li key={t} className="rounded-full bg-brand-soft px-3 py-1.5 text-sm font-medium text-brand-dark">{t}</li>
              ))}
            </ul>
          </div>
          <div className="rays relative isolate overflow-hidden rounded-2xl p-7">
            <RaysBackdrop spotlight={false} />
            <div className="relative">
            <h3 className="text-lg font-bold">Discuss your project</h3>
            <p className="mt-2 text-sm text-white/70">Free consultation, no obligation.</p>
            <Link href="/contact" className="mt-5 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold hover:bg-brand-light">
              Contact us
            </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="text-2xl font-bold">Other services</h2>
          <Stagger className="mt-8 grid gap-5 md:grid-cols-3">
            {others.map((s) => (
              <StaggerItem key={s.slug}>
                <SpotlightCard href={`/services/${s.slug}`} className="p-6">
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted">{s.summary}</p>
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
