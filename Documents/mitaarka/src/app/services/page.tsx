import type { Metadata } from "next";
import { services } from "@/content/services";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { ServiceIcon } from "@/components/ServiceIcon";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

export const metadata: Metadata = {
  title: "Services",
  description: "Custom software, web and mobile development, cloud, AI automation and UI/UX design.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything you need to build and scale"
        intro="One team for strategy, design, engineering and support, so nothing gets lost between vendors."
      />
      <Stagger as="section" className="mx-auto grid max-w-7xl gap-5 px-5 py-24 sm:px-8 md:grid-cols-2">
        {services.map((s) => (
          <StaggerItem key={s.slug}>
            <SpotlightCard href={`/services/${s.slug}`} className="flex gap-6 p-8">
            <ServiceIcon slug={s.slug} />
            <div>
              <h2 className="text-xl font-bold group-hover:text-brand-dark">{s.title}</h2>
              <p className="mt-2 text-muted">{s.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.stack.slice(0, 4).map((t) => (
                  <li key={t} className="rounded-full bg-bg px-3 py-1 text-xs font-medium text-muted">{t}</li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                Explore <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>
      <CtaBand />
    </>
  );
}
