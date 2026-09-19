// Public origin used for metadata, sitemap and structured data. Blank or malformed env values
// (e.g. an empty NEXT_PUBLIC_SITE_URL on Vercel) fall through instead of crashing the build.
function resolveSiteUrl() {
  const candidates = [process.env.NEXT_PUBLIC_SITE_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL];
  for (const raw of candidates) {
    const value = raw?.trim();
    if (!value) continue;
    try {
      return new URL(/^https?:\/\//.test(value) ? value : `https://${value}`).origin;
    } catch {
      // try the next candidate
    }
  }
  return "https://www.mitraarka.com";
}

// Company details used across the header, footer, contact page and metadata.
export const site = {
  name: "Mitraarka Software Solutions",
  shortName: "Mitraarka",
  tagline: "Software that rises with your business.",
  description:
    "Mitraarka Software Solutions builds custom software, web and mobile apps, cloud platforms and AI automation for growing businesses.",
  url: resolveSiteUrl(),
  email: "info@mitraaka.com",
  phone: "+91 99669 45450",
  address: ["1-2-263, Rehmanth Nagar, Kazipet", "Hanumakonda, Telangana 506003"],
  mapUrl: "https://www.google.com/maps/search/?api=1&query=1-2-263+Rehmanth+Nagar+Kazipet+Hanumakonda+Telangana+506003",
  social: {
    linkedin: "https://www.linkedin.com/",
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];
