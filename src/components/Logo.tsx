import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

// Full lockup (sun + wordmark). `light` swaps to the white-text version for dark backgrounds.
export function Logo({ light = false, className = "h-12 w-auto" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label={`${site.name} home`} className="inline-flex shrink-0">
      <Image
        src={light ? "/brand/mitraarka-logo-light.png" : "/brand/mitraarka-logo.png"}
        alt={site.name}
        width={2341}
        height={1271}
        priority
        className={className}
      />
    </Link>
  );
}
