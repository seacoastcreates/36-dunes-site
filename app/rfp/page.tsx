import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import RfpForm from "../components/RfpForm";

export const metadata: Metadata = {
  title: "Request a Proposal — 36 Dunes",
  description:
    "Tell us what you're building. Submit a request for proposal and 36 Dunes will follow up within two business days to scope your AI, ML, or software project.",
  alternates: {
    canonical: "/rfp",
  },
};

export default function RfpPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="plain page-intro">
          <div className="wrap">
            <div className="eyebrow">REQUEST A PROPOSAL</div>
            <h1>Tell us what you&apos;re building.</h1>
            <p className="lede">
              The best proposals start with a clear problem, not a finished
              spec. Fill out the form below with as much detail as you have —
              we&apos;ll fill in the rest on a short call.
            </p>
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

        <section className="band plain" id="process">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">HOW IT WORKS</div>
                <h2>From request to kickoff.</h2>
              </div>
              <p>
                Every request gets a human review — no forms disappearing
                into a queue.
              </p>
            </div>
            <div className="approach-list">
              <div className="approach-step">
                <svg
                  className="step-icon"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect x="4" y="8" width="22" height="16" rx="2" stroke="var(--accent)" strokeWidth="1.8" />
                  <path d="M4 9 L15 18 L26 9" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="step-index">01 — REVIEW</div>
                <h3>We read every request</h3>
                <p>
                  Expect a reply within two business days, even if it&apos;s
                  just to ask a clarifying question or let you know
                  it&apos;s not a fit.
                </p>
              </div>
              <div className="approach-step">
                <svg
                  className="step-icon"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 6h20a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H12l-6 5v-5H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
                    stroke="var(--accent)"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="step-index">02 — DISCOVERY CALL</div>
                <h3>A short call to clarify scope</h3>
                <p>
                  30 minutes to walk through the problem, constraints, and
                  what success looks like — before anything gets scoped in
                  writing.
                </p>
              </div>
              <div className="approach-step">
                <svg
                  className="step-icon"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M8 4v22" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M8 5h14l-3 5 3 5H8" stroke="var(--accent)" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
                </svg>
                <div className="step-index">03 — PROPOSAL &amp; KICKOFF</div>
                <h3>A written, fixed-scope proposal</h3>
                <p>
                  Clear deliverables, timeline, and cost. If it&apos;s a fit,
                  we start in working slices — not a roadmap slide.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="plain" id="tips">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">BEFORE YOU SUBMIT</div>
                <h2>What makes a strong request.</h2>
              </div>
              <p>
                A few minutes here saves a round-trip of clarifying emails
                later.
              </p>
            </div>
            <div className="capability-group">
              <div className="cap-item">
                <div className="name">Lead with the problem, not the solution</div>
                <p>
                  &quot;We need a chatbot&quot; tells us less than &quot;support
                  tickets take 3 days to triage.&quot; Describe what&apos;s
                  slow, manual, or broken — we&apos;ll help figure out the
                  right tool for it.
                </p>
              </div>
              <div className="cap-item">
                <div className="name">Share a real budget range</div>
                <p>
                  Even a rough range helps us scope something that fits,
                  instead of guessing and missing high or low. It never
                  locks you into anything.
                </p>
              </div>
              <div className="cap-item">
                <div className="name">Name your timeline and any hard deadlines</div>
                <p>
                  A launch date, a board meeting, a compliance deadline —
                  anything fixed changes how we&apos;d approach the build.
                </p>
              </div>
              <div className="cap-item">
                <div className="name">Mention constraints up front</div>
                <p>
                  Existing tech stack, compliance requirements, data you
                  can&apos;t move off-premise — the earlier we know, the
                  fewer surprises in the proposal.
                </p>
              </div>
              <div className="cap-item">
                <div className="name">Name one point of contact</div>
                <p>
                  Proposals move faster when there&apos;s a single person we
                  can loop back to with questions, even if others weigh in
                  on the final decision.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="band plain" id="form">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">SUBMIT A REQUEST</div>
                <h2>The details, whatever you have.</h2>
              </div>
              <p>Required fields are marked — everything else is optional but helps.</p>
            </div>
            <RfpForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
