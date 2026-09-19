import Link from "next/link";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { RaysBackdrop } from "@/components/motion/RaysBackdrop";

export default function NotFound() {
  return (
    <section className="rays relative isolate overflow-hidden">
      <RaysBackdrop />
      <div className="relative mx-auto max-w-3xl px-5 py-36 text-center">
        <p className="eyebrow-pill mx-auto">404</p>
        <AnimatedHeading text="This page hasn't risen yet" className="mt-6 text-4xl font-bold sm:text-5xl" />
        <p className="mt-5 text-white/70">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link href="/" className="btn-glow mt-10 inline-flex rounded-full bg-brand px-8 py-4 font-semibold hover:bg-brand-light">
          Back to home
        </Link>
      </div>
    </section>
  );
}
