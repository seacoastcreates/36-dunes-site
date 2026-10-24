import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Where Small Businesses Should (and Shouldn't) Use AI — 36 Dunes",
  description:
    "AI pays off where you have a pile of messy text or a decision repeated hundreds of times — and it wastes money everywhere else. A three-question test, with real examples from a dealer-network build.",
  alternates: { canonical: "/blog/where-ai-pays-off" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Where Small Businesses Should (and Shouldn't) Use AI",
  image: "https://36dunes.com/blog/where-ai-pays-off/thumb.jpg",
  author: { "@type": "Organization", name: "36 Dunes" },
  publisher: { "@type": "Organization", name: "36 Dunes" },
  datePublished: "2026-10-24",
  mainEntityOfPage: "https://36dunes.com/blog/where-ai-pays-off",
};

export default function WhereAiPaysOffPost() {
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
                <h1>Where Small Businesses Should (and Shouldn&apos;t) Use AI</h1>
                <p className="lede">
                  AI pays off where you have a pile of messy text or a
                  decision repeated hundreds of times — and it wastes money
                  everywhere else. A three-question test, with real examples
                  from a dealer-network build.
                </p>
                <div className="article-meta">
                  <span>October 24, 2026</span>
                  <span>6 min read</span>
                  <span>AI strategy</span>
                </div>
              </div>
              <Image
                className="post-title-image"
                src="/blog/where-ai-pays-off/thumb.jpg"
                alt="A gold-line funnel filtering abstract document shapes through to one side, while a wrench and a handshake bounce off the rim and fall away on the other side, on a dark navy background"
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
              If you sell a physical product through a network of dealers,
              you&apos;ve probably gotten at least three emails this month
              telling you to &quot;leverage AI.&quot; Most of them are
              selling something. Here&apos;s the less exciting truth: for a
              business like yours, AI is a great tool for about four jobs
              and a waste of money for about forty others. The trick is
              knowing which is which before you spend anything.
            </p>
            <p>
              We&apos;ve turned down more AI work than we&apos;ve taken,
              usually because the honest answer to &quot;should this be
              AI&quot; was no. Here&apos;s the test we actually use, and
              where it lands for a physical-product business specifically.
            </p>

            <h2>A simple test for whether AI fits</h2>
            <p>
              Before anyone writes a line of code, three questions settle
              most of it:
            </p>
            <ul>
              <li>
                <strong>Is there a pile of unstructured text, photos, or
                history nobody has time to read?</strong> Reviews, support
                threads, years of notes — the kind of thing a person could
                technically read, but won&apos;t.
              </li>
              <li>
                <strong>Is a decision being repeated dozens or hundreds of
                times, mostly by gut feel?</strong> One-off judgment calls
                don&apos;t need a model. The same call made every week does.
              </li>
              <li>
                <strong>Is a wrong answer cheap and catchable?</strong> Not
                safety-critical, not expensive to undo, reviewed by a person
                before it matters.
              </li>
            </ul>
            <p>
              Three yeses, it&apos;s worth prototyping. Zero, spend the
              budget on headcount or a better CRM instead. Most real
              situations land somewhere in between, which is exactly why
              this has to get answered project by project — not as a
              blanket &quot;yes, we need AI&quot; from a slide deck.
            </p>

            <h2>Where it earns its keep (physical-product / dealer-network edition)</h2>
            <p>
              Four places this pattern shows up again and again for a
              hardware company that sells through independent dealers
              instead of direct to consumers.
            </p>

            <h3>Deciding who to approach next</h3>
            <p>
              We built a lead-scoring tool for exactly this: a hardware
              company whose growth person was deciding who to call next by
              gut feel and inbound interest, out of thousands of
              unscored prospects. The v0 was a transparent, weighted blend
              of a coverage-gap score (does this prospect fill a real hole
              in the territory, or sit next to someone we already work
              with) and a look-alike score (how similar is this prospect to
              our best existing partners, measured on their own public
              profile). The AI/ML piece was reading public reviews for
              language that matched the exact problem the product solves —
              and it took three failed approaches to get that part right.
              Comparing review text to hand-written examples miscalibrated.
              A general-purpose zero-shot classifier produced confident
              false positives at scale. Only having a language model
              actually read each review and reason about it, rather than
              score it by similarity, held up under scrutiny. The output
              was a ranked list with the reasoning attached to each row —
              usable by a non-technical salesperson, not a black box.
            </p>

            <h3>Reading what customers already say</h3>
            <p>
              Reviews, support emails, and warranty notes hold your product
              roadmap and your earliest defect signals — nobody has time
              to read all of it by hand, and a summarization or
              classification pass over that pile is close to the ideal
              AI use case: high text volume, low risk if a single
              classification is slightly off, and a human still reads the
              interesting cases it surfaces.
            </p>

            <h3>Triage of repetitive questions</h3>
            <p>
              Dealer FAQs and order-status questions repeat constantly and
              rarely need judgment — a good candidate for AI handling the
              first pass, with a person still on the other end of anything
              that doesn&apos;t fit the common cases. That&apos;s a
              meaningfully different thing from a chatbot that tries to
              replace the person entirely, which is usually where this
              goes wrong.
            </p>

            <h3>Forecasting, once you have the history</h3>
            <p>
              Demand or inventory forecasting can be genuinely valuable for
              a seasonal, regional business — but only once there are a
              few seasons of clean sales data to learn from. Before that,
              a forecast is just a guess with a confident-looking chart
              around it.
            </p>

            <h2>Where it doesn&apos;t (yet)</h2>
            <p>
              Just as important as the four jobs above are the places we
              tell clients not to spend the budget, at least not yet:
            </p>
            <ul>
              <li>
                <strong>Replacing relationships.</strong> Dealers sign on
                because they trust a person, and no model changes that.
              </li>
              <li>
                <strong>Safety-critical guidance.</strong> Install or load
                instructions for anything that could hurt someone need
                human-reviewed content, not freeform generation.
              </li>
              <li>
                <strong>Fixing a process nobody&apos;s written down.</strong>{" "}
                If you can&apos;t explain how you decide today, AI will
                just automate the confusion.
              </li>
              <li>
                <strong>Tiny datasets.</strong> With 15 customers, a
                spreadsheet and a phone call beat a model — there&apos;s no
                pattern at that size for anything to learn.
              </li>
              <li>
                <strong>&quot;AI-powered&quot; as a marketing label.</strong>{" "}
                It doesn&apos;t move sales, and it invites skepticism from
                buyers who&apos;ve been burned by vague AI claims before.
              </li>
            </ul>

            <h2>How to start small</h2>
            <p>
              The same four steps work for almost any candidate that passes
              the test above:
            </p>
            <ul>
              <li>Pick one decision you make repeatedly.</li>
              <li>
                Build a transparent v0 — a weighted score you can explain in
                one sentence, not a black box.
              </li>
              <li>Show it to the people who&apos;d actually use it.</li>
              <li>
                Add a trained model only after you have outcome data to
                learn from.
              </li>
            </ul>

            <p>
              The best AI project we&apos;ve shipped is usually the most
              boring one — a ranked list, a sorted inbox, a flagged
              outlier — not the thing that looks impressive in a
              boardroom demo. If you&apos;ve got a decision you&apos;re
              making on gut feel right now, we&apos;re happy to take a
              look.
            </p>

            <blockquote>
              Three yeses, it&apos;s worth prototyping. Zero, spend the
              budget somewhere else.
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
                The lead-scoring example above is a genericized version of
                Call List — a ranked, explainable prospecting tool built
                for exactly the &quot;who should we approach next&quot;
                problem, with the reasoning attached to every row.
              </p>
              <Link className="btn btn-ghost" href="/work/call-list">
                Read the full case study →
              </Link>
            </div>
          </div>
        </section>

        <section className="band" id="contact">
          <div className="wrap contact-inner">
            <div className="eyebrow">START A PROJECT</div>
            <h2>Making a call on gut feel that happens a hundred times a year?</h2>
            <p className="lede">
              Tell us what it is. We&apos;ll tell you honestly whether AI
              earns its keep there, or whether the money&apos;s better
              spent somewhere else.
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
