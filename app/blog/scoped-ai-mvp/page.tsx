import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import PostLeadOffers from "../../components/PostLeadOffers";
import FlowDiagram from "../../components/FlowDiagram";

export const metadata: Metadata = {
  title: "Why Most “Add AI” Pitches Fail (and What a Good Scoped MVP Looks Like) — 36 Dunes",
  description:
    "“You need to add AI” is a pitch, not a plan. Five reasons those pitches fail, what a well-scoped first build looks like instead, and a five-question test to run before spending anything.",
  alternates: { canonical: "/blog/scoped-ai-mvp" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why Most “Add AI” Pitches Fail (and What a Good Scoped MVP Looks Like)",
  image: "https://36dunes.com/blog/scoped-ai-mvp/thumb.jpg",
  author: { "@type": "Organization", name: "36 Dunes" },
  publisher: { "@type": "Organization", name: "36 Dunes" },
  datePublished: "2026-11-02",
  mainEntityOfPage: "https://36dunes.com/blog/scoped-ai-mvp",
};

export default function ScopedAiMvpPost() {
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
                <div className="eyebrow">DECISION GUIDE</div>
                <h1>Why Most “Add AI” Pitches Fail (and What a Good Scoped MVP Looks Like)</h1>
                <p className="lede">
                  “You need to add AI” is a pitch, not a plan. Five reasons
                  those pitches fail, what a well-scoped first build looks
                  like instead, and a five-question test to run before
                  spending anything.
                </p>
                <div className="article-meta">
                  <span>November 2, 2026</span>
                  <span>5 min read</span>
                  <span>AI strategy</span>
                </div>
              </div>
              <Image
                className="post-title-image"
                src="/blog/scoped-ai-mvp/thumb.jpg"
                alt="A sprawling, faint dashed network on the left narrowing through a gold arrow into a single clipboard holding a short ranked list with check marks, on a deep plum background"
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
              If you run a business that sells a physical product, you’ve
              probably gotten the pitch. Maybe it came by email, or from a
              consultant at a trade show, or from your cousin who just
              discovered ChatGPT. The pitch is always some version of: “You
              need to add AI.”
            </p>
            <p>Add it to what? Nobody says. That’s the problem.</p>
            <p>
              I build AI/ML systems for a living, so I’m supposed to be the
              guy who tells you AI is the answer. Most of the time it
              isn’t. When it is, it’s usually a much smaller, duller
              project than anyone is pitching.
            </p>

            <h2>Why the pitches fail</h2>

            <h3>1. They start with the technology instead of the decision.</h3>
            <p>
              “We’ll build you an AI platform” is a solution looking for a
              problem. A good project starts with a sentence like: “We
              decide X over and over, mostly by gut feel, and we’re
              probably getting it wrong a lot.” If nobody can finish that
              sentence, there’s nothing to build yet.
            </p>

            <h3>2. They’re scoped like a moonshot.</h3>
            <p>
              Six months, a big budget, “transformation.” Then the first
              usable output shows up at month five, and by then the
              business has changed, the champion has moved on, and nobody
              trusts it. Big scopes fail slowly and expensively.
            </p>

            <h3>3. They’re black boxes.</h3>
            <p>
              A model spits out a score, and the person who has to act on it
              has no idea why. So they ignore it and go with their gut,
              which is what they did before. If a salesperson can’t see the
              reasoning, the tool doesn’t get used. I’ve seen very smart
              models fail this way.
            </p>

            <h3>4. They need data you don’t have yet.</h3>
            <p>
              Many pitches quietly assume you have years of clean, labeled
              history. Most small and mid-size companies don’t, and
              that’s normal. If the project only works after you’ve
              collected two more years of data, it’s not a project yet.
            </p>

            <h3>5. Nobody defined “better.”</h3>
            <p>
              If you can’t say what success looks like in advance (faster,
              cheaper, more leads, fewer mistakes), you can’t tell whether
              it worked. It just becomes a thing you paid for.
            </p>

            <h2>What a good scoped MVP looks like</h2>
            <p>Here’s the shape I aim for.</p>
            <p>
              <strong>One decision.</strong> Not “improve sales.” Something
              like “which prospects do we call next?” or “which support
              tickets need a human right now?” A decision you make dozens or
              hundreds of times is ideal, because small improvements add up.
            </p>
            <p>
              <strong>Public or already-existing data.</strong> If I need
              your internal systems to get started, the project is already
              too heavy. The best first builds run on data that’s already
              available, so there’s a real result before anyone signs off on
              integrations.
            </p>
            <p>
              <strong>A transparent v0.</strong> Start with a simple
              weighted score, not a fancy trained model. Every
              recommendation comes with its reasons attached: “gap in your
              coverage,” “customers there are already complaining about the
              problem you solve,” “looks like your best existing partner.” A
              non-technical person can read that, argue with it, and tell me
              where I’m wrong. Those arguments are the most valuable input I
              get.
            </p>
            <p>
              <strong>Something you can hold in your hands.</strong> A
              ranked list or a one-page report, not a slide deck. A real
              output makes a better conversation than a concept does.
            </p>
            <p>
              <strong>A clear path to v1.</strong> Once people use the v0
              and you start recording outcomes (who converted, who
              didn’t, who was a bad fit), then you train something on real
              results. The trained model is the second step. Most pitches
              try to sell it as the first.
            </p>

            <FlowDiagram
              label="A scoped MVP, from v0 to v1"
              caption="The trained model is the second step, not the first."
              steps={[
                { label: "One decision", detail: "Made dozens or hundreds of times" },
                { label: "Existing data", detail: "Public or already on hand" },
                { label: "Transparent v0", detail: "A weighted score with reasons attached" },
                { label: "Record outcomes", detail: "Who converted, who didn’t, who was a bad fit" },
                { label: "Trained v1", detail: "Built on real results" },
              ]}
            />

            <h2>A quick example</h2>
            <p>
              Say you sell a specialized product through a network of
              dealers, and you want more dealers. Today, “who should we
              approach next?” is answered by inbound interest and instinct.
            </p>
            <p>
              A scoped MVP might pull public listings for every likely
              prospect in one or two states and flag where your existing
              coverage has gaps. It could also read public reviews of those
              prospects and pick out the ones whose own customers are
              already describing the problem your product solves. Then it
              ranks everyone with a plain-English reason attached to each
              name.
            </p>
            <p>
              That’s a few weeks of work, not a few quarters. It uses no
              internal data, so there’s nothing to approve before starting.
              Even where it’s wrong, it shows you something about your
              market. And you can judge it quickly, because you probably
              already know a few of the prospects it ranks and can check
              whether it agrees with you.
            </p>

            <h2>The test I’d use</h2>
            <p>Before spending anything on AI, ask:</p>
            <ul>
              <li>Is there one specific decision we make repeatedly?</li>
              <li>Can we start with data that already exists?</li>
              <li>Will the output come with reasons a human can check?</li>
              <li>Can we see something real in weeks, not months?</li>
              <li>Is a wrong answer cheap and catchable?</li>
            </ul>
            <p>
              If you can’t say yes to most of these, wait on the AI. A
              spreadsheet and a phone call may genuinely serve you better,
              and I’d rather tell you that than build you something shiny.
            </p>
            <p>
              If you do have a decision you’re making on gut feel and suspect
              there’s a better way, I’m happy to take a look. No deck, just a
              conversation about whether it’s worth building.
            </p>

            <blockquote>
              The trained model is the second step. Most pitches try to sell
              it as the first.
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
                Call List is this shape applied to prospecting: one ranked
                list, researched rather than scraped, with the reason to
                call attached to every row. For a broader take on where AI
                earns its keep, see{" "}
                <Link href="/blog/where-ai-pays-off">
                  where small businesses should (and shouldn’t) use AI
                </Link>
                .
              </p>
              <Link className="btn btn-ghost" href="/work/call-list">
                Read the Call List case study →
              </Link>
            </div>
          </div>
        </section>

        <PostLeadOffers />

        <section className="band" id="contact">
          <div className="wrap contact-inner">
            <div className="eyebrow">START A PROJECT</div>
            <h2>Making a decision on gut feel and suspect there’s a better way?</h2>
            <p className="lede">
              No deck, just a conversation about whether it’s worth
              building.
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
