import ScrollReveal from "./components/ScrollReveal";

export default function Home() {
  return (
    <>
      <header>
        <div className="wrap header-row">
          <a className="brand" href="#top">
            <svg
              width="30"
              height="20"
              viewBox="0 0 64 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2 20 C 10 8, 18 8, 24 15 C 27 18.5, 22 21, 19 18 C 26 10, 36 9, 44 17 C 48 21, 56 22, 62 15"
                stroke="var(--accent)"
                strokeWidth="2.6"
                strokeLinecap="round"
                fill="none"
                opacity="0.55"
              />
              <path
                d="M2 27 C 12 15, 22 15, 30 23 C 33 26.5, 27 28.5, 24 25.5 C 32 17, 42 16, 50 24 C 54 28, 58 28.5, 62 23"
                stroke="var(--accent)"
                strokeWidth="2.6"
                strokeLinecap="round"
                fill="none"
                opacity="0.78"
              />
              <path
                d="M2 34 C 14 24, 24 24, 33 31 C 40 36.5, 52 36.5, 62 29"
                stroke="var(--accent)"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            36&nbsp;DUNES
          </a>
          <nav className="primary">
            <a href="#services">Capabilities</a>
            <a href="#work">Work</a>
            <a href="#approach">Approach</a>
            <a href="#about">About</a>
          </nav>
          <a className="btn btn-primary header-cta" href="#contact">
            Start a project
          </a>
          <label className="nav-toggle-btn" htmlFor="nav-toggle">
            Menu
          </label>
        </div>
        <input type="checkbox" id="nav-toggle" />
        <div className="wrap mobile-menu">
          <a href="#services">Capabilities</a>
          <a href="#work">Work</a>
          <a href="#approach">Approach</a>
          <a href="#about">About</a>
          <a href="#contact">Start a project</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
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
                    Full-stack products built with React, Next.js, and Python on
                    modern cloud infrastructure — from first prototype to
                    production.
                  </p>
                </div>
                <div className="cap-item">
                  <div className="name">iOS &amp; Mobile</div>
                  <p>
                    Native apps built with Swift and Core ML, designed to run fast
                    and stay private, on-device wherever possible.
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
                One recent build, detailed the way we&apos;d hand it to another
                engineer — not dressed up for a pitch.
              </p>
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
              </div>
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
          <div className="wrap contact-inner">
            <div className="eyebrow">START A PROJECT</div>
            <h2>Let&apos;s build something worth shipping.</h2>
            <p className="lede">
              Tell us what&apos;s slow, manual, or stuck in a spreadsheet.
              We&apos;ll tell you honestly whether AI is the right tool for it —
              and build it either way.
            </p>
            <div className="contact-actions">
              <a className="btn btn-primary" href="mailto:hello@36dunes.com">
                hello@36dunes.com
              </a>
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
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-row">
          <div className="footer-brand">
            <svg
              width="20"
              height="14"
              viewBox="0 0 64 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2 34 C 14 24, 24 24, 33 31 C 40 36.5, 52 36.5, 62 29"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            36 DUNES
          </div>
          <div>© 2026 36 Dunes. AI/ML &amp; software engineering studio.</div>
        </div>
      </footer>

      <ScrollReveal />
    </>
  );
}
