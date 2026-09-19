import type { Metadata } from "next";
import { Manrope, Michroma } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MotionProviders } from "@/components/motion/Providers";
import { site } from "@/content/site";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const michroma = Michroma({ variable: "--font-michroma", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.shortName}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    images: ["/brand/mitraarka-logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/mitraarka-logo.png`,
  email: site.email,
  telephone: site.phone.replace(/\s/g, ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: "1-2-263, Rehmanth Nagar, Kazipet",
    addressLocality: "Hanumakonda",
    addressRegion: "Telangana",
    postalCode: "506003",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${michroma.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        <MotionProviders>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProviders>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
