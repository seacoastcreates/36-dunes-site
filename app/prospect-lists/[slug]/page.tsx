import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import CallListForm from "../../components/CallListForm";
import BookCallButton from "../../components/BookCallButton";
import { industries, getIndustry } from "../../../lib/industries";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = getIndustry((await params).slug);
  if (!industry) return {};
  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    alternates: { canonical: `/prospect-lists/${industry.slug}` },
  };
}

export default async function IndustryPage({ params }: Props) {
  const industry = getIndustry((await params).slug);
  if (!industry) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: industry.metaTitle.replace(/ — 36 Dunes$/, ""),
    description: industry.metaDescription,
    provider: { "@type": "ProfessionalService", name: "36 Dunes", url: "https://36dunes.com" },
    areaServed: industry.region,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free 10-lead sample" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <main>
        <section className="plain page-intro">
          <div className="wrap">
            <Link className="back-link" href="/work/call-list">
              ← How the lists are made
            </Link>
            <div className="eyebrow">{industry.eyebrow}</div>
            <h1>{industry.h1}</h1>
            <p className="lede">{industry.lede}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#get-a-list">
                Get 10 free leads
              </a>
              <BookCallButton source={`industry-${industry.slug}`} />
            </div>
          </div>
        </section>

        <section className="band plain">
          <div className="wrap industry-grid">
            <div>
              <div className="eyebrow">WHO&apos;S ON THE LIST</div>
              <ul className="industry-list">
                {industry.buyers.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow">WHY NOW SIGNALS WE LOOK FOR</div>
              <ul className="industry-list">
                {industry.signals.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow">A RECENT BUILD · {industry.region.toUpperCase()}</div>
              <dl className="spec-list">
                {industry.stats.map((s) => (
                  <div className="spec-row" key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="plain">
          <div className="wrap prose">
            <h2>What you get for each lead</h2>
            <p>
              A priority score and tier, a paragraph on why the business fits,
              a direct contact where the business&apos;s own site names one
              (otherwise the role to ask for), and a call brief with a
              suggested opening. Every contact is checked against the
              business&apos;s own site. Nothing is bought from a data broker.
            </p>
            <p>
              <strong>Built for:</strong> {industry.forWho}
            </p>
          </div>
        </section>

        <section className="band" id="get-a-list">
          <div className="wrap contact-inner">
            <div className="eyebrow">FREE · NO COMMITMENT</div>
            <h2>See 10 ranked leads from your own territory.</h2>
            <p className="lede">
              Tell us what you sell and where. You&apos;ll hear back the same
              business day.
            </p>
            <CallListForm source={`industry-${industry.slug}`} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
