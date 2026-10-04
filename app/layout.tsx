import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Fraunces, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import CookieConsent from "./components/CookieConsent";

// Inlined (not linked) on purpose: the whole stylesheet is ~30KB raw, small
// enough that a <style> tag in the initial HTML beats a separate
// render-blocking <link> request — PageSpeed was flagging that extra round
// trip as delaying LCP/FCP. Stripped of comments/whitespace to keep the
// inlined payload lean; read once at module load (build time), not per-request.
const globalCss = fs
  .readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8")
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\s+/g, " ")
  .trim();

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const siteTitle = "36 Dunes — AI/ML & Software Engineering Studio";
const siteDescription =
  "36 Dunes is a machine learning and AI solutions studio that helps forward-thinking businesses unlock the power of their data — custom models, predictive analytics, and automation pipelines that turn information into strategic advantage.";

export const metadata: Metadata = {
  metadataBase: new URL("https://36dunes.com"),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "AI consulting",
    "machine learning studio",
    "custom AI models",
    "AI automation",
    "data strategy consulting",
    "predictive analytics",
    "full-stack software engineering",
    "iOS development",
    "AI/ML software engineering",
    "36 Dunes",
  ],
  authors: [{ name: "36 Dunes", url: "https://36dunes.com" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "36 Dunes",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "36 Dunes",
  description: siteDescription,
  url: "https://36dunes.com",
  email: "kirby@36dunes.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "York",
    addressRegion: "ME",
    addressCountry: "US",
  },
  areaServed: "US",
  knowsAbout: [
    "Machine Learning",
    "Artificial Intelligence",
    "Data Strategy Consulting",
    "AI Automation",
    "Full-Stack Web Development",
    "iOS Development",
    "Cloud Infrastructure",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${workSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: globalCss }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
