// Company details used across the header, footer, contact page and metadata.
export const site = {
  name: "Mitraarka Software Solutions",
  shortName: "Mitraarka",
  tagline: "Software that rises with your business.",
  description:
    "Mitraarka Software Solutions builds custom software, web and mobile apps, cloud platforms and AI automation for growing businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mitraarka.com",
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
