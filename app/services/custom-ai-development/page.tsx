import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Custom AI Development — 36 Dunes",
  description:
    "Custom AI development for businesses that need a model built around their own data, not a generic wrapper around someone else's API. Full-stack: model, pipeline, and the product it ships in.",
  alternates: { canonical: "/services/custom-ai-development" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Custom AI Development",
  provider: { "@type": "ProfessionalService", name: "36 Dunes", url: "https://36dunes.com" },
  areaServed: "US",
  description:
    "Custom AI and machine learning model development, from data pipeline through production deployment, for businesses whose problem doesn't fit an off-the-shelf API.",
};

export default function CustomAiDevelopmentPage() {
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
            <div className="eyebrow">CUSTOM AI DEVELOPMENT</div>
            <h1>A model built around your data, not the other way around.</h1>
            <p className="lede">
              A generic API call is the right answer for most AI features.
              Custom development is for the rest: when your data, your
              constraints, or your accuracy bar don&apos;t fit what an
              off-the-shelf model was trained for.
            </p>
          </div>
        </section>

        <section className="plain" id="what">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">WHAT WE BUILD</div>
                <h2>Task-specific models, shipped in a real product.</h2>
              </div>
              <p>Not a notebook that proves a concept — a model in production.</p>
            </div>
            <ul className="service-list">
              <li>
                Task-specific models for churn prediction, demand
                forecasting, classification, or clustering — trained on your
                domain, evaluated against your actual failure modes.
              </li>
              <li>
                On-device and privacy-constrained inference where it matters
                — Core ML on iOS, quantized models, or anything that can
                &apos;t leave a server you don&apos;t control.
              </li>
              <li>
                The data pipeline underneath it: ingestion, labeling,
                feature engineering, and versioning — the part that
                determines whether the model still works in six months.
              </li>
              <li>
                Integration into the actual product — API, dashboard, or
                mobile app — so the model ships with something people use,
                not a standalone script.
              </li>
            </ul>
          </div>
        </section>

        <section className="band plain" id="stack">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">STACK &amp; APPROACH</div>
                <h2>Specific tools, chosen for the problem.</h2>
              </div>
            </div>
            <div className="prose">
              <p>
                PyTorch and scikit-learn for training, Core ML when a model
                needs to run on-device, and cloud infrastructure sized to
                actual load — not a GPU cluster for a problem that fits on a
                laptop. We&apos;d rather ship a k-means clustering model that
                works than a transformer that impresses in a demo and
                times out in production.
              </p>
              <p>
                For pure feasibility work — figuring out whether a model can
                hit the accuracy you need before committing engineering time
                — see{" "}
                <Link href="/services/machine-learning-consulting">
                  machine learning consulting
                </Link>
                . Once a model&apos;s in production, keeping it that way is{" "}
                <Link href="/services/mlops-consulting">MLOps</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="plain" id="proof">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">PROOF, NOT A PITCH</div>
                <h2>One recent build, in detail.</h2>
              </div>
            </div>
            <div className="article-callout">
              <p>
                PhotoNester sorts a million photos on-device using CLIP
                embeddings converted to Core ML and unsupervised k-means
                clustering — no server, no uploads. Here&apos;s how it was
                built, including the part that got it rejected from the App
                Store once.
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
            <h2>Tell us what you&apos;re trying to predict, classify, or automate.</h2>
            <p className="lede">
              We&apos;ll tell you honestly whether a custom model is the
              right tool for it — and scope it if it is.
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
