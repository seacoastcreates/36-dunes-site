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

const siteTitle = "36 Dunes — Researched Sales Prospect Lists & Custom AI | York, Maine";
const siteDescription =
  "Ranked, researched lists of the businesses in your territory worth calling, each with a direct contact and a reason to call. First 10 leads free. Plus custom AI and software from a York, Maine engineer.";

export const metadata: Metadata = {
  metadataBase: new URL("https://36dunes.com"),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "sales prospect lists",
    "B2B lead generation New England",
    "sales leads New Hampshire Maine",
    "AI consulting Maine",
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
  telephone: "+1-857-209-4404",
  founder: { "@type": "Person", name: "Kirby Robinson" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "York",
    addressRegion: "ME",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "State", name: "Maine" },
    { "@type": "State", name: "New Hampshire" },
    { "@type": "State", name: "Massachusetts" },
    { "@type": "Country", name: "United States" },
  ],
  knowsAbout: [
    "Sales Prospecting",
    "B2B Lead Generation",
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
