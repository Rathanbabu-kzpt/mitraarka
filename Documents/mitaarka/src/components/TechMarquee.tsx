import { services } from "@/content/services";

const tech = Array.from(new Set(services.flatMap((s) => s.stack)));

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="marquee-mask flex overflow-hidden">
      <div className={`marquee flex shrink-0 gap-4 pr-4 ${reverse ? "marquee-reverse" : ""}`}>
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="whitespace-nowrap rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink/80 transition-colors hover:border-brand hover:text-brand-dark"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// Two opposing, infinitely scrolling rows of the technologies we use. Pauses on hover.
export function TechMarquee() {
  const half = Math.ceil(tech.length / 2);
  return (
    <div className="space-y-4">
      <Row items={tech.slice(0, half)} />
      <Row items={tech.slice(half)} reverse />
    </div>
  );
}
