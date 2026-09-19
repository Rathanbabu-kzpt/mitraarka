import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Mitraarka Software Solutions about your next software project.",
};

const details = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { label: "Office", value: site.address.join(", "), href: site.mapUrl, external: true },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project"
        intro="Share a few details and we'll get back to you within one business day."
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_1.6fr]">
        <Reveal className="space-y-8">
          {details.map((d) => (
            <div key={d.label}>
              <p className="eyebrow">{d.label}</p>
              {d.href ? (
                <a
                  href={d.href}
                  {...("external" in d && d.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-2 block text-xl font-semibold hover:text-brand"
                >
                  {d.value}
                </a>
              ) : (
                <p className="mt-2 text-xl font-semibold">{d.value}</p>
              )}
            </div>
          ))}
          <div className="rounded-2xl bg-brand-soft p-7">
            <h2 className="font-bold">What happens next?</h2>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-muted">
              <li>We review your message and reply within 24 hours.</li>
              <li>A short call to understand your goals.</li>
              <li>You get a clear proposal with scope, timeline and cost.</li>
            </ol>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
