import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import ServiceArt from "../../components/ServiceArt";

export const metadata: Metadata = {
  title: "AI Automation for Businesses — 36 Dunes",
  description:
    "AI-powered automation for the manual, repetitive parts of your operations — support triage, reporting, data entry. Built on intelligent systems, not brittle scripts.",
  alternates: { canonical: "/services/ai-automation" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Automation",
  provider: { "@type": "ProfessionalService", name: "36 Dunes", url: "https://36dunes.com" },
  areaServed: "US",
  description:
    "AI-powered automation pipelines that replace manual, repetitive operational workflows with data-driven systems.",
};

export default function AiAutomationPage() {
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
            <Link className="back-link" href="/services">
              ← All services
            </Link>
            <div className="post-intro-grid">
              <div>
                <div className="eyebrow">AI AUTOMATION FOR BUSINESSES</div>
                <h1>Turn what&apos;s manual into something that runs itself.</h1>
                <p className="lede">
                  &quot;We need a chatbot&quot; tells us less than &quot;support
                  tickets take 3 days to triage.&quot; Automation starts with the
                  second sentence — the workflow that&apos;s actually slow, not
                  the tool everyone assumes fixes it.
                </p>
              </div>
              <ServiceArt kind="ai-automation" />
            </div>
          </div>
        </section>

        <section className="plain" id="what">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">WHERE THIS FITS</div>
                <h2>The operational work no one enjoys doing by hand.</h2>
              </div>
            </div>
            <ul className="service-list">
              <li>
                Support and ops triage — routing, prioritizing, and
                drafting first-pass responses so a human reviews instead of
                starts from scratch.
              </li>
              <li>
                Document and data-entry pipelines — extracting structured
                data from PDFs, emails, or spreadsheets into systems that
                currently require someone to retype it.
              </li>
              <li>
                Reporting and monitoring — pipelines that surface anomalies
                and summarize trends instead of someone building the same
                spreadsheet every Monday.
              </li>
              <li>
                Internal tooling that connects systems which don&apos;t
                talk to each other today — the unglamorous integration work
                most automation projects actually are.
              </li>
            </ul>
          </div>
        </section>

        <section className="band plain" id="fit">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">WHAT MAKES IT RELIABLE</div>
                <h2>Automation that degrades gracefully.</h2>
              </div>
            </div>
            <div className="prose">
              <p>
                The failure mode we design against isn&apos;t &quot;the
                model gets something wrong&quot; — it will, eventually.
                It&apos;s automation that fails silently and no one notices
                until a customer does. That means confidence thresholds that
                route uncertain cases to a human, monitoring on the pipeline
                itself, and a system your team can actually operate — not a
                black box only we can touch. That operational layer is the
                same discipline covered under{" "}
                <Link href="/services/mlops-consulting">
                  MLOps consulting
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="plain" id="proof">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">PROOF, NOT A PITCH</div>
                <h2>How we approach shipping, not just scoping.</h2>
              </div>
            </div>
            <div className="article-callout">
              <p>
                PhotoNester batches on-device inference to protect battery
                life and persists progress mid-scan — the kind of
                reliability engineering that separates a working automation
                pipeline from a demo.
              </p>
              <Link className="btn btn-ghost" href="/work/photonester">
                Read the case study →
              </Link>
            </div>
          </div>
        </section>

        <section className="band" id="contact">
          <div className="wrap contact-inner">
            <div className="eyebrow">START A PROJECT</div>
            <h2>Tell us what&apos;s slow, manual, or stuck in a spreadsheet.</h2>
            <p className="lede">
              We&apos;ll tell you honestly whether automation is the right
              tool for it — and build it either way.
            </p>
            <div className="contact-actions">
              <Link className="btn btn-primary" href="/rfp">
                Request a proposal
              </Link>
              <a className="btn btn-ghost" href="mailto:kirby@36dunes.com">
                kirby@36dunes.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
