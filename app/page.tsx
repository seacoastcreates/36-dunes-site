import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import ScrollReveal from "./components/ScrollReveal";
import ContactForm from "./components/ContactForm";
import ContactBubbles from "./components/ContactBubbles";
import HeroWorkCard from "./components/HeroWorkCard";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <div className="eyebrow">AI / ML STUDIO — SOFTWARE ENGINEERING PARTNER</div>
              <h1>
                Intelligence at scale. <em>Strategy</em> in code.
              </h1>
              <p className="lede">
                36&nbsp;Dunes is a machine learning and AI solutions studio that helps
                forward-thinking businesses unlock the power of their data — custom
                models, predictive analytics, and automation pipelines that turn
                information into strategic advantage. When the job calls for it, we
                build the software underneath it too: full-stack web apps, iOS, and
                the cloud infrastructure that keeps it all running.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#contact">
                  Start a project
                </a>
                <a className="btn btn-ghost" href="#work">
                  See the work →
                </a>
              </div>
            </div>
            <HeroWorkCard />
          </div>
          <div className="hero-scene" aria-hidden="true">
            <svg
              className="horizon"
              viewBox="0 0 1200 220"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 160 C 140 90, 260 90, 360 140 C 410 165, 340 185, 300 155 C 420 70, 560 65, 660 130 C 700 155, 780 160, 860 130 C 940 100, 1060 100, 1200 150 L1200 220 L0 220 Z"
                fill="var(--bg-elev)"
              />
              <path
                d="M0 200 C 180 140, 320 140, 430 185 C 520 220, 700 220, 820 175 C 920 137, 1060 140, 1200 190 L1200 220 L0 220 Z"
                fill="var(--band-bg)"
              />
            </svg>
          </div>
        </section>

        <section className="band plain" id="services">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">CAPABILITIES</div>
                <h2>Two disciplines, one senior team.</h2>
              </div>
              <p>
                Most studios pick a lane: applied AI, or product engineering.
                36&nbsp;Dunes runs both, because the models rarely matter without a
                product built well enough to put them in front of someone.
              </p>
            </div>
            <div className="capability-groups">
              <div className="capability-group">
                <h3>Applied AI &amp; Data</h3>
                <div className="cap-item">
                  <div className="name">Custom AI Models</div>
                  <p>
                    Task-specific machine learning models tailored to your domain —
                    from churn prediction to demand forecasting — built to scale
                    with your business.
                  </p>
                </div>
                <div className="cap-item">
                  <div className="name">Data Strategy Consulting</div>
                  <p>
                    Not sure where to start? We help you find the highest-impact
                    opportunities for AI adoption across operations, marketing, and
                    finance.
                  </p>
                </div>
                <div className="cap-item">
                  <div className="name">AI-Powered Automation</div>
                  <p>
                    Automation pipelines built on intelligent systems that turn
                    manual workflows into data-driven engines.
                  </p>
                </div>
                <div className="cap-item">
                  <div className="name">Visual Analytics Dashboards</div>
                  <p>
                    Dashboards that surface trends, flag risk, and support
                    decisions at every level of the business.
                  </p>
                </div>
              </div>
              <div className="capability-group">
                <h3>Software &amp; Product Engineering</h3>
                <div className="cap-item">
                  <div className="name">Web Applications</div>
                  <p>
                    Full-stack products built with React, Node.js, and Python on
                    modern cloud infrastructure — from first prototype to
                    production.
                  </p>
                </div>
                <div className="cap-item">
                  <div className="name">iOS &amp; Mobile</div>
                  <p>
                    Native apps built with Swift, React Native, and Core ML,
                    designed to run fast and stay private, on-device wherever
                    possible.
                  </p>
                </div>
                <div className="cap-item">
                  <div className="name">Cloud &amp; DevOps</div>
                  <p>
                    Infrastructure audits and automation that cut hosting costs and
                    remove deployment bottlenecks.
                  </p>
                </div>
                <div className="cap-item">
                  <div className="name">Platform Modernization</div>
                  <p>
                    Legacy systems brought forward without a rewrite-from-scratch
                    gamble — including healthcare and other compliance-sensitive
                    platforms.
                  </p>
                </div>
              </div>
            </div>
            <Link className="back-link case-read-more" href="/services">
              See all services →
            </Link>
          </div>
        </section>

        <section className="plain" id="work">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">FIELD NOTES</div>
                <h2>Proof, not a portfolio deck.</h2>
              </div>
              <p>
                Recent builds, detailed the way we&apos;d hand them to
                another engineer — not dressed up for a pitch.
              </p>
            </div>
            <div className="case-card reveal" data-anim="">
              <div>
                <div className="eyebrow">CASE STUDY — HOUSING MARKET FORECASTING</div>
                <h3>Groundwork: a housing forecast is only useful if you can check its track record.</h3>
                <p className="narrative">
                  A national housing headline tells you little about the ZIP
                  code you&apos;re actually looking at. We built Groundwork to
                  connect the two: one LightGBM model forecasts each metro&apos;s
                  direction, while another estimates how individual ZIPs will
                  perform relative to their market. Zillow home values, Redfin
                  market activity, and mortgage rates feed a searchable map
                  and comparison tool. Every 12-month forecast comes with an
                  uncertainty range, and walk-forward backtests show how the
                  models performed against nine years of real outcomes —
                  including the years they got wrong.
                </p>
                <a
                  className="back-link case-read-more"
                  href="https://groundwork.36dunes.com/model"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore the model and backtests →
                </a>
              </div>
              <div className="case-side">
                <dl className="spec-list">
                  <div className="spec-row">
                    <dt>Coverage</dt>
                    <dd>894 metros · 26,268 ZIP codes</dd>
                  </div>
                  <div className="spec-row">
                    <dt>Model</dt>
                    <dd>LightGBM · metro trend + ZIP-relative change</dd>
                  </div>
                  <div className="spec-row">
                    <dt>Forecast</dt>
                    <dd>12 months ahead, with 80% ranges</dd>
                  </div>
                  <div className="spec-row">
                    <dt>Validation</dt>
                    <dd>Walk-forward backtests · 2017–2025</dd>
                  </div>
                  <div className="spec-row">
                    <dt>Stack</dt>
                    <dd>Next.js · FastAPI · PostgreSQL</dd>
                  </div>
                </dl>
                <a
                  className="btn btn-ghost case-cta"
                  href="https://groundwork.36dunes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore Groundwork →
                </a>
              </div>
            </div>

            <div className="case-card reveal" data-anim="">
              <div>
                <div className="eyebrow">CASE STUDY — SALES PROSPECTING</div>
                <h3>Call List: when a pipeline dries up, the problem is usually the list.</h3>
                <p className="narrative">
                  A sales team with a defined, narrow market had run out of
                  leads worth calling — the usual sources were stale
                  directory exports and old trade-show lists. We built a
                  single ranked list instead: one row per real business,
                  researched for fit, with a direct contact where one could
                  be found and a specific reason to call, not a form-letter
                  opener. Every contact gets checked against the business&apos;s
                  own site before it makes the list.
                </p>
                <Link className="back-link case-read-more" href="/work/call-list">
                  Read the full case study →
                </Link>
              </div>
              <div className="case-side">
                <dl className="spec-list">
                  <div className="spec-row">
                    <dt>Scope</dt>
                    <dd>Regional, one industry</dd>
                  </div>
                  <div className="spec-row">
                    <dt>Method</dt>
                    <dd>Researched, not scraped</dd>
                  </div>
                  <div className="spec-row">
                    <dt>Per lead</dt>
                    <dd>Fit score, contact, call reasons</dd>
                  </div>
                  <div className="spec-row">
                    <dt>Verification</dt>
                    <dd>Checked against the business&apos;s own site</dd>
                  </div>
                  <div className="spec-row">
                    <dt>Timeline</dt>
                    <dd>Days, not weeks</dd>
                  </div>
                </dl>
                <Link className="btn btn-ghost case-cta" href="/work/call-list#get-a-list">
                  Get a sample for my market →
                </Link>
              </div>
            </div>

            <div className="case-card reveal" data-anim="">
              <div>
                <div className="eyebrow">CASE STUDY — CONSUMER iOS</div>
                <h3>PhotoNester: sorting a million photos without a single upload.</h3>
                <p className="narrative">
                  A camera roll with years of unsorted photos is a search problem,
                  not a storage problem. We built PhotoNester to solve it entirely
                  on-device: CLIP embeddings converted to Core&nbsp;ML classify each
                  photo&apos;s visual content, then k-means clustering groups them
                  into albums — Travel, Pets, Food, Documents — without hardcoded
                  labels and without a single image ever leaving the phone. Getting
                  there meant batching inference to protect battery life,
                  persisting progress mid-scan, and tracking down an App Store
                  rejection to a Core ML compute-unit fallback on older iPadOS
                  builds.
                </p>
                <Link className="back-link case-read-more" href="/work/photonester">
                  Read the full case study →
                </Link>
              </div>
              <div className="case-side">
                <dl className="spec-list">
                  <div className="spec-row">
                    <dt>Platform</dt>
                    <dd>iOS · Swift + SwiftUI</dd>
                  </div>
                  <div className="spec-row">
                    <dt>Model</dt>
                    <dd>OpenAI CLIP → Core ML</dd>
                  </div>
                  <div className="spec-row">
                    <dt>Method</dt>
                    <dd>Unsupervised k-means on embeddings</dd>
                  </div>
                  <div className="spec-row">
                    <dt>Privacy</dt>
                    <dd>100% on-device, no server</dd>
                  </div>
                  <div className="spec-row">
                    <dt>Result</dt>
                    <dd>Full library sorted in minutes</dd>
                  </div>
                </dl>
                <a
                  className="btn btn-ghost case-cta"
                  href="https://photonester.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try PhotoNester →
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="band plain" id="approach">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">APPROACH</div>
                <h2>How a two-person build stays fast.</h2>
              </div>
              <p>No account layer between you and the person writing the code. That&apos;s most of it.</p>
            </div>
            <div className="approach-list">
              <div className="approach-step">
                <div className="step-index">01 — DISCOVER</div>
                <h3>Scope the real problem</h3>
                <p>
                  A short technical audit of what you have and what&apos;s
                  actually blocking you — before any model gets chosen or any line
                  of code gets written.
                </p>
              </div>
              <div className="approach-step">
                <div className="step-index">02 — BUILD</div>
                <h3>Ship in working slices</h3>
                <p>
                  You see a running version early and often, not a roadmap slide.
                  Direction changes get absorbed as we go, not billed as change
                  orders.
                </p>
              </div>
              <div className="approach-step">
                <div className="step-index">03 — HANDOFF</div>
                <h3>Leave it maintainable</h3>
                <p>
                  Documented, tested, and built on infrastructure your own team can
                  operate — not a black box that only we can touch.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="plain" id="about">
          <div className="wrap about-grid">
            <div>
              <div className="eyebrow">FOUNDER-LED</div>
              <h2>One senior engineer, not a bench of juniors.</h2>
            </div>
            <div className="about-copy">
              <p>
                36&nbsp;Dunes is built around a full-stack engineer with over ten
                years of experience shipping web applications on Python,
                JavaScript, React, and AWS. That includes healthcare platforms
                connecting patients to clinical trials, predictive machine
                learning models built from scratch, and DevOps work that
                measurably cut infrastructure costs — the practical, unglamorous
                engineering that most AI pitches skip past.
              </p>
              <p>
                Based on the coast in York, Maine, and working with a small number
                of clients at a time, by design.
              </p>
              <div className="stat-row">
                <div className="stat">
                  <div className="value">10+</div>
                  <div className="label">Years engineering</div>
                </div>
                <div className="stat">
                  <div className="value">3</div>
                  <div className="label">Disciplines — AI, web, mobile</div>
                </div>
                <div className="stat">
                  <div className="value">1</div>
                  <div className="label">Engineer on your project</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="band" id="contact">
          <ContactBubbles />
          <div className="wrap contact-inner">
            <div className="eyebrow">START A PROJECT</div>
            <h2>Let&apos;s build something worth shipping.</h2>
            <p className="lede">
              Tell us what&apos;s slow, manual, or stuck in a spreadsheet.
              We&apos;ll tell you honestly whether AI is the right tool for it —
              and build it either way.
            </p>
            <ContactForm />
            <div className="contact-actions">
              <a className="btn btn-ghost" href="#top">
                Back to top ↑
              </a>
            </div>
            <div className="contact-meta">
              <span>
                <strong>Location</strong> — York, Maine
              </span>
              <span>
                <strong>Engagements</strong> — Fixed-scope &amp; embedded
              </span>
              <span>
                <strong>Phone</strong> —{" "}
                <a href="tel:+18572094404">(857) 209-4404</a>
              </span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <ScrollReveal />
    </>
  );
}
