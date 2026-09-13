import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "When to Build a Custom Model vs. Use an API — 36 Dunes",
  description:
    "A practical decision framework for choosing between a foundation model API and a custom-trained model — cost, latency, data privacy, and the questions that actually settle it.",
  alternates: { canonical: "/blog/custom-model-vs-api" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "When to Build a Custom Model vs. Use an API",
  author: { "@type": "Organization", name: "36 Dunes" },
  publisher: { "@type": "Organization", name: "36 Dunes" },
  datePublished: "2026-09-14",
  mainEntityOfPage: "https://36dunes.com/blog/custom-model-vs-api",
};

export default function CustomModelVsApiPost() {
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
            <Link className="back-link" href="/blog">
              ← All posts
            </Link>
            <div className="eyebrow">DECISION GUIDE</div>
            <h1>When to Build a Custom Model vs. Use an API</h1>
            <p className="lede">
              OpenAI&apos;s API is the right call more often than most
              technical founders want to admit. Here&apos;s the actual
              decision tree, not the sales pitch.
            </p>
            <div className="article-meta">
              <span>September 14, 2026</span>
              <span>9 min read</span>
              <span>ML strategy</span>
            </div>
          </div>
        </section>

        <section className="plain" id="content">
          <div className="wrap prose">
            <p>
              Every week, someone asks us to build a custom model for a
              problem a foundation model API would solve in an afternoon.
              We turn down that work more often than we take it — not out
              of some purity principle, but because a custom model is a
              multi-month commitment with ongoing maintenance cost, and if
              an API call gets you 90% of the way there for a fraction of
              the price, building custom is usually the wrong call.
            </p>
            <p>
              The reverse is also true: we&apos;ve seen teams burn six
              months wrapping API calls around a problem that needed a
              purpose-built model from the start, because the API version
              never got accurate enough, or because sending the data
              off-premise was never actually an option. Both mistakes are
              expensive. This is the framework we actually use to tell them
              apart.
            </p>

            <h2>Start with the question an API can&apos;t answer</h2>
            <p>
              Foundation model APIs — OpenAI, Anthropic, Google — are
              trained on enormous general-purpose datasets. That makes them
              extraordinarily good at tasks that look like the open
              internet: summarization, general classification, drafting
              text, answering questions about common knowledge. It makes
              them noticeably worse at tasks that depend on patterns
              specific to your business that never showed up in their
              training data — your churn signals, your fraud patterns, your
              domain&apos;s specific visual categories.
            </p>
            <p>
              The first real question isn&apos;t &quot;can an API do
              this?&quot; — a modern LLM can attempt almost anything if you
              prompt it well enough. The question is whether the accuracy
              you get from prompting is actually good enough for the
              decision riding on it. A support-ticket summarizer that&apos;s
              85% good is still useful. A fraud model that&apos;s 85% good
              is a liability.
            </p>

            <h2>Five questions that actually settle it</h2>

            <h3>1. Does the accuracy bar require domain-specific training data?</h3>
            <p>
              If the patterns you&apos;re trying to detect are specific to
              your business — your customers&apos; churn behavior, your
              specific product images, your industry&apos;s document
              formats — a general-purpose API has never seen that
              distribution. Few-shot prompting can close some of that gap;
              it rarely closes all of it. If you&apos;ve already tried
              prompting your way to acceptable accuracy and hit a wall,
              that&apos;s usually the signal to train something custom.
            </p>

            <h3>2. Can the data leave your infrastructure?</h3>
            <p>
              This one is binary more often than people expect. Healthcare
              data under HIPAA, financial data under various compliance
              regimes, or simply a customer contract that prohibits
              third-party data sharing — if the data legally or
              contractually can&apos;t go to a third-party API, that
              decision is already made for you, regardless of how good the
              API&apos;s accuracy would otherwise be. On-device inference
              (Core ML, ONNX Runtime) or a self-hosted open-weight model
              become the only real options.
            </p>

            <h3>3. What does the cost curve look like at your actual volume?</h3>
            <p>
              API pricing is per-token or per-call, which is cheap at low
              volume and can get surprisingly expensive at scale. A
              custom model has a large upfront cost — data preparation,
              training, evaluation — and a much lower marginal cost per
              inference after that. The crossover point depends entirely on
              your volume, but as a rough gut check: if you&apos;re running
              a few thousand inferences a month, an API almost always wins
              on total cost. At millions of inferences a month, the math
              starts favoring a custom model, especially if it can run on
              cheaper infrastructure than a call to a frontier model API.
            </p>

            <h3>4. Does latency or offline capability matter?</h3>
            <p>
              API calls mean a network round trip, typically a few hundred
              milliseconds at best, more under load. If the product needs
              sub-50ms response times, or needs to keep working with no
              connectivity — an on-device photo classifier, an
              industrial sensor pipeline — that rules out API-based
              inference structurally, not just on cost grounds.
            </p>

            <h3>5. Who maintains this in a year?</h3>
            <p>
              An API call has effectively zero ongoing ML maintenance —
              the provider handles model updates, though you inherit their
              behavior changes whether you want them or not. A custom
              model needs monitoring for drift, a retraining pipeline, and
              someone who understands the training data well enough to
              debug it when accuracy degrades. That&apos;s real
              organizational commitment, not a one-time build. This is
              exactly the work covered under{" "}
              <Link href="/services/mlops-consulting">
                MLOps consulting
              </Link>{" "}
              — and it&apos;s worth being honest with yourself about
              whether your team wants to own it before you commit to
              custom.
            </p>

            <h2>A rough decision table</h2>
            <p>
              None of this is precise — every project has exceptions — but
              as a starting heuristic:
            </p>
            <ul>
              <li>
                <strong>General task, no compliance constraint, low-to-medium volume</strong> —
                start with an API. Prompt engineering and few-shot examples
                will get you further than most teams expect.
              </li>
              <li>
                <strong>Domain-specific accuracy ceiling hit with prompting</strong> —
                consider fine-tuning an existing model before jumping to
                fully custom training from scratch. It&apos;s a meaningful
                middle ground.
              </li>
              <li>
                <strong>Data can&apos;t leave your infrastructure, or needs offline/low-latency inference</strong> —
                custom or on-device, full stop. The API question doesn&apos;t
                apply.
              </li>
              <li>
                <strong>High volume, stable task definition, team that can own MLOps</strong> —
                the cost and control argument for custom gets strong
                enough to justify the upfront investment.
              </li>
            </ul>

            <h2>The honest version</h2>
            <p>
              Most of the time, the right first move is the cheap one: try
              the API, measure the actual accuracy against your real data,
              and only build custom once you have evidence — not a
              hunch — that it&apos;s the ceiling. That&apos;s the same
              approach we bring to{" "}
              <Link href="/services/machine-learning-consulting">
                machine learning consulting
              </Link>{" "}
              engagements: an honest read before a build commitment, not
              after.
            </p>

            <blockquote>
              Try the API first. Build custom once you have evidence it&apos;s
              the ceiling — not a hunch.
            </blockquote>
          </div>
        </section>

        <section className="band plain" id="related">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">RELATED</div>
                <h2>Where this shows up in practice.</h2>
              </div>
            </div>
            <div className="article-callout">
              <p>
                PhotoNester needed on-device inference with no server round
                trip — a case where the API question never applied, and the
                whole build was shaped by that constraint from day one.
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
            <h2>Not sure which side of this you&apos;re on?</h2>
            <p className="lede">
              Tell us the problem. We&apos;ll tell you honestly whether it
              needs a custom model or an afternoon with an API.
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
