import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import FlowDiagram from "../../components/FlowDiagram";

export const metadata: Metadata = {
  title: "Building SwingSync: Comparing Two Golf Swings — 36 Dunes",
  description:
    "An iPhone app for studying two golf swings side by side — synced by phase, not by the clock, with a local pose-estimation backend that refuses to guess timing markers more often than it offers one.",
  alternates: { canonical: "/blog/building-swingsync" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Building SwingSync: Comparing Two Golf Swings That Don't Run at the Same Speed",
  image: "https://36dunes.com/blog/building-swingsync/thumb.jpg",
  author: { "@type": "Organization", name: "36 Dunes" },
  publisher: { "@type": "Organization", name: "36 Dunes" },
  datePublished: "2026-10-19",
  mainEntityOfPage: "https://36dunes.com/blog/building-swingsync",
};

export default function BuildingSwingSyncPost() {
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
            <div className="post-intro-grid">
              <div>
                <div className="eyebrow">BUILD LOG</div>
                <h1>Building SwingSync: Comparing Two Golf Swings That Don&apos;t Run at the Same Speed</h1>
                <p className="lede">
                  An iPhone app for studying two golf swings side by side —
                  synced by phase, not by the clock, with a local
                  pose-estimation backend that refuses to guess timing
                  markers more often than it offers one.
                </p>
                <div className="article-meta">
                  <span>October 19, 2026</span>
                  <span>8 min read</span>
                  <span>Computer Vision</span>
                </div>
              </div>
              <Image
                className="post-title-image"
                src="/blog/building-swingsync/thumb.jpg"
                alt="Two overlaid golf swing pose skeletons, one gold and one silver, tracing the same swing sequence from address to follow-through with glowing ball-flight arcs, on a black background"
                width={720}
                height={540}
                priority
                sizes="(max-width: 780px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        <section className="plain" id="content">
          <div className="wrap prose">
            <p>
              SwingSync is a React Native / Expo app for putting two golf
              swings — yours and a reference clip, or this month&apos;s
              against last month&apos;s — side by side and actually comparing
              them: scrub together, draw on either panel, overlay one on the
              other with adjustable opacity and alignment. The first working
              prototype is the comparison studio itself; the App Store path
              (bundle identifier, signing, screenshots, device testing) is
              still ahead of it.
            </p>
            <p>
              The interesting engineering problem showed up almost
              immediately: two swings are almost never the same length. A
              smooth tempo swing might take 3.6 seconds; a quick, handsy one
              might take 2.8. Comparing them by raw timestamp means your
              backswing is already finishing while the reference golfer is
              still taking the club back — technically synced, practically
              useless.
            </p>

            <h2>Two ways to sync two clips that don&apos;t agree on how long a swing takes</h2>
            <p>
              SwingSync offers two sync modes. <strong>Real tempo</strong>{" "}
              preserves each clip&apos;s actual speed and aligns the two at
              impact — useful for comparing how rushed or smooth a swing
              feels. <strong>Phase sync</strong> is the more interesting one:
              it matches the six named moments of a swing — Address,
              Takeaway, Top, Impact, Release, Finish — between both clips, so
              scrubbing to 50% shows &quot;the same point in the swing&quot;
              on both panels regardless of how long either one actually
              took.
            </p>
            <p>
              The default phase spacing isn&apos;t evenly divided — it&apos;s{" "}
              <code>[0, .22, .46, .62, .77, 1]</code> as fractions of total
              swing time. Address to Top is 46% of the swing; Top to Impact
              is only 16%. That&apos;s not an arbitrary curve, it&apos;s the
              well-known shape of a golf swing&apos;s own tempo — backswing
              slow, downswing fast — baked into the default markers instead
              of left for every user to discover by fighting with evenly
              spaced timing. Scrubbing between two markers interpolates
              linearly within that phase&apos;s window, so progress maps
              onto &quot;where you are in this specific phase,&quot; not
              onto raw seconds.
            </p>

            <h2>Reading a swing without a trained golf model</h2>
            <p>
              The pose backend is deliberately narrow about what it claims.
              It runs two public Hugging Face checkpoints locally — YOLOS
              tiny to find the golfer, ViTPose base simple to predict 17 COCO
              body joints — and the code says plainly what that does and
              doesn&apos;t mean:{" "}
              <em>
                &quot;The model predicts joints, not golf events.&quot;
              </em>{" "}
              It does not detect club-ball contact, score technique, or know
              what a backswing is. Everything event-shaped is a heuristic
              layered on top, and it&apos;s labeled as one everywhere it
              shows up in the UI.
            </p>
            <p>
              A clip is sampled at up to 96 frames (roughly 12 fps), capped
              by both a frame count and a 20-second/4K ceiling. The person
              detector doesn&apos;t run on every frame — only every sixth —
              and in between, the pose model reuses the last detected
              bounding box, padded 35% wider and 18% taller to keep a raised
              club in frame between detections. If the tracked person&apos;s
              box center jumps more than a quarter of the image between
              re-detections, or a second person fills more than 60% of the
              area of the first, the backend stops and says so rather than
              silently tracking the wrong body.
            </p>

            <h2>The timing heuristic, and why it refuses more often than it guesses</h2>
            <p>
              Suggested timing markers come from one signal: wrist height
              relative to shoulder, normalized by torso length, median
              filtered, then run through peak-finding to locate the top of
              the backswing. From there it searches a bounded window (0.12 to
              1.5 seconds after the top) for the clearest downswing, derives
              address by walking backward to the last &quot;hands still
              low&quot; frame, and derives release and finish by walking
              forward for the first clear drop and then the first stretch of
              near-stillness.
            </p>
            <p>
              What stands out reading the code isn&apos;t the heuristic
              itself — it&apos;s how many ways it&apos;s built to say no.
              Not enough confident wrist/torso observations, gaps in
              tracking, no clear backswing-to-downswing transition, a
              downswing that doesn&apos;t drop far enough, phases closer
              together than 0.03 seconds, a follow-through that&apos;s
              missing or obscured — any one of those returns{" "}
              <code>None</code> and a specific, human-readable reason instead
              of a best guess. And when it does succeed, arriving suggested
              timing never silently overwrites markers you&apos;ve already
              set by hand.
            </p>

            <FlowDiagram
              label="SwingSync analysis pipeline"
              caption="From raw video to two swings scrubbing in step. Nothing in the chain claims to know golf."
              steps={[
                { label: "Clip", detail: "Up to 96 frames, about 12 fps" },
                { label: "Find the golfer", detail: "YOLOS tiny, every sixth frame" },
                { label: "17 joints", detail: "ViTPose base on each sampled frame" },
                { label: "Timing heuristic", detail: "Suggests markers, or says why it won’t" },
                { label: "Phase sync", detail: "Six markers line up both clips" },
              ]}
            />

            <h2>What ships, what&apos;s still manual</h2>
            <p>
              Measured angles are 2D, read off the image plane, not true 3D
              joint angles — a face-on clip and a down-the-line clip of the
              same swing will measure differently, and the app doesn&apos;t
              pretend otherwise. The transport steps in 1/30-second
              increments, which isn&apos;t guaranteed frame-exact for
              arbitrary source frame rates. There&apos;s no account system,
              cloud library, or multiple saved comparisons yet — one
              workspace, saved locally, is what restores on relaunch.
            </p>
            <p>
              The backend itself stays deliberately small in scope: no
              authentication, meant for a trusted local network, one
              analysis at a time (a second request while one&apos;s running
              gets a 429, not a queue), 80MB upload cap, and the uploaded
              clip is written to a temporary file that&apos;s removed on
              success, failure, or a dropped connection — nothing lands in a
              database. On this machine specifically, PyTorch is pinned to
              2.2.2 because that&apos;s the last version with Intel Mac
              wheels; production inference is meant to run on Apple Silicon
              or Linux, not this pin.
            </p>

            <blockquote>
              A model that predicts joints isn&apos;t a model that
              understands golf — the honest version of this tool says so in
              its own error messages, not just in the fine print.
            </blockquote>
          </div>
        </section>

        <section className="band" id="contact">
          <div className="wrap contact-inner">
            <div className="eyebrow">START A PROJECT</div>
            <h2>Have a comparison problem that a single number can&apos;t capture?</h2>
            <p className="lede">
              Tell us what you&apos;re trying to put side by side. We&apos;ll
              tell you honestly whether an off-the-shelf model gets you
              there, or what it actually takes to build the part that does.
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
