import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/contact", ...services.map((s) => `/services/${s.slug}`)];
  return pages.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
