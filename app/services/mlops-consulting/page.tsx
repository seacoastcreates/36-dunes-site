import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import ServiceArt from "../../components/ServiceArt";

export const metadata: Metadata = {
  title: "MLOps Consulting — 36 Dunes",
  description:
    "MLOps consulting for models that need to survive contact with production — versioning, monitoring, retraining pipelines, and infrastructure that doesn't quietly rot after launch.",
  alternates: { canonical: "/services/mlops-consulting" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "MLOps Consulting",
  provider: { "@type": "ProfessionalService", name: "36 Dunes", url: "https://36dunes.com" },
  areaServed: "US",
  description:
    "MLOps consulting covering model versioning, monitoring, retraining pipelines, and production infrastructure for machine learning systems.",
};

export default function MlopsConsultingPage() {
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
                <div className="eyebrow">MLOPS CONSULTING</div>
                <h1>The unglamorous work that keeps a model working.</h1>
                <p className="lede">
                  A model that scored well in a notebook and a model that&apos;s
                  still accurate six months into production are two different
                  engineering problems. MLOps is the second one.
                </p>
              </div>
              <ServiceArt kind="mlops-consulting" />
            </div>
          </div>
        </section>

        <section className="plain" id="what">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">WHAT THIS COVERS</div>
                <h2>The infrastructure most AI pitches skip.</h2>
              </div>
            </div>
            <ul className="service-list">
              <li>
                Model versioning and reproducibility — so &quot;which model
                is actually in production&quot; has a real answer, not a
                guess.
              </li>
              <li>
                Monitoring for drift and degradation — catching a model
                that&apos;s quietly gotten worse before a customer does.
              </li>
              <li>
                Retraining pipelines that run on a schedule or a trigger,
                instead of &quot;whenever someone remembers.&quot;
              </li>
              <li>
                Cloud infrastructure and DevOps sized to actual inference
                load — audits that have measurably cut hosting costs on
                past projects, not just added tooling.
              </li>
            </ul>
          </div>
        </section>

        <section className="band plain" id="fit">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">WHO THIS IS FOR</div>
                <h2>Usually: a model that already shipped.</h2>
              </div>
            </div>
            <div className="prose">
              <p>
                MLOps consulting makes the most sense once something&apos;s
                already in production and the question has shifted from
                &quot;does this work&quot; to &quot;will this still work in
                a year.&quot; If you&apos;re earlier than that — still
                deciding whether to build — start with{" "}
                <Link href="/services/machine-learning-consulting">
                  machine learning consulting
                </Link>{" "}
                instead. If the model exists but the product around it
                doesn&apos;t, that&apos;s{" "}
                <Link href="/services/custom-ai-development">
                  custom AI development
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
                <h2>Production discipline, in a real build.</h2>
              </div>
            </div>
            <div className="article-callout">
              <p>
                Tracking down an App Store rejection to a Core ML
                compute-unit fallback on older iPadOS builds — the kind of
                production issue that only shows up after a model ships,
                and the reason MLOps discipline matters before launch, not
                after.
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
            <h2>Tell us what&apos;s already in production.</h2>
            <p className="lede">
              We&apos;ll audit what&apos;s there and tell you honestly what
              needs shoring up before it breaks.
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
