import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Machine Learning Consulting — 36 Dunes",
  description:
    "Independent machine learning consulting for businesses deciding what to build, buy, or skip entirely. A technical assessment before you commit budget — from a working engineer, not a sales deck.",
  alternates: { canonical: "/services/machine-learning-consulting" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Machine Learning Consulting",
  provider: { "@type": "ProfessionalService", name: "36 Dunes", url: "https://36dunes.com" },
  areaServed: "US",
  description:
    "Independent machine learning consulting: technical audits, feasibility assessments, and build/buy/skip recommendations for businesses evaluating AI investment.",
};

export default function MachineLearningConsultingPage() {
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
            <div className="eyebrow">MACHINE LEARNING CONSULTING</div>
            <h1>An honest read on where ML fits, before you spend on it.</h1>
            <p className="lede">
              Most machine learning consulting companies show up already
              selling a model. We show up to answer one question first: does
              this problem actually need one — and if so, what&apos;s the
              smallest version that proves it?
            </p>
          </div>
        </section>

        <section className="plain" id="what">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">WHAT THIS LOOKS LIKE</div>
                <h2>A technical audit, not a pitch.</h2>
              </div>
              <p>
                Two to four weeks, depending on how much is already
                instrumented. You get a written assessment either way.
              </p>
            </div>
            <ul className="service-list">
              <li>
                Audit your existing data — volume, quality, labeling, and
                whether it&apos;s actually sufficient for the model you have
                in mind.
              </li>
              <li>
                Map the highest-impact opportunities for ML or AI adoption
                across your operations, ranked by effort vs. payoff, not by
                what&apos;s trendy.
              </li>
              <li>
                A build/buy/skip recommendation — sometimes the right answer
                is a $20/month API call, and we&apos;ll say so.
              </li>
              <li>
                If it&apos;s worth building, a scoped plan: model approach,
                data pipeline, infrastructure, and a realistic timeline.
              </li>
            </ul>
          </div>
        </section>

        <section className="band plain" id="fit">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">WHEN IT&apos;S NOT THE RIGHT FIT</div>
                <h2>Consulting doesn&apos;t make sense for every stage.</h2>
              </div>
            </div>
            <div className="prose">
              <p>
                If you already know exactly what you need to build and just
                need engineering hands, skip the audit and go straight to{" "}
                <Link href="/services/custom-ai-development">
                  custom AI development
                </Link>
                . And if the honest answer is &quot;your data isn&apos;t
                ready yet,&quot; we&apos;ll tell you that in the first call —
                not after a signed statement of work. Our{" "}
                <Link href="/resources/ai-readiness-checklist">
                  AI Readiness Checklist
                </Link>{" "}
                is a free way to get a rough read on that yourself first.
              </p>
            </div>
          </div>
        </section>

        <section className="plain" id="proof">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">PROOF, NOT A PITCH</div>
                <h2>See the engineering, not just the strategy.</h2>
              </div>
            </div>
            <div className="article-callout">
              <p>
                PhotoNester: how we scoped, built, and shipped an on-device
                ML app — CLIP embeddings, Core ML, unsupervised clustering,
                and the App Store rejection that came with it.
              </p>
              <Link className="btn btn-ghost" href="/work/photonester">
                Read the case study →
              </Link>
            </div>
          </div>
        </section>

        <section className="band" id="contact">
          <div className="wrap contact-inner">
            <div className="eyebrow">START WITH AN ASSESSMENT</div>
            <h2>Get a technical opinion before a proposal.</h2>
            <p className="lede">
              Tell us what you&apos;re considering. We&apos;ll tell you
              honestly whether ML consulting is even the right first step.
            </p>
            <div className="contact-actions">
              <Link className="btn btn-primary" href="/rfp">
                Request a proposal
              </Link>
              <a className="btn btn-ghost" href="mailto:hello@36dunes.com">
                hello@36dunes.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
