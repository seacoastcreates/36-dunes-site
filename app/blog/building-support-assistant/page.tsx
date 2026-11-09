import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import PostLeadOffers from "../../components/PostLeadOffers";
import FlowDiagram from "../../components/FlowDiagram";

export const metadata: Metadata = {
  title: "Building a Support Assistant That Knows When to Say “I Don’t Know” — 36 Dunes",
  description:
    "A prototype support assistant for a small manufacturer that answers only from the company’s own FAQ, policies, and instructions, shows its sources, and hands anything it can’t answer to a person.",
  alternates: { canonical: "/blog/building-support-assistant" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Building a Support Assistant That Knows When to Say “I Don’t Know”",
  image: "https://36dunes.com/blog/building-support-assistant/thumb.jpg",
  author: { "@type": "Organization", name: "36 Dunes" },
  publisher: { "@type": "Organization", name: "36 Dunes" },
  datePublished: "2026-11-09",
  mainEntityOfPage: "https://36dunes.com/blog/building-support-assistant",
};

export default function BuildingSupportAssistantPost() {
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
                <h1>Building a Support Assistant That Knows When to Say “I Don’t Know”</h1>
                <p className="lede">
                  A prototype support assistant for a small manufacturer. It
                  answers only from the company’s own FAQ, policies, and
                  instructions, shows where each answer came from, and hands
                  anything it can’t answer to a person.
                </p>
                <div className="article-meta">
                  <span>November 9, 2026</span>
                  <span>6 min read</span>
                  <span>Applied NLP</span>
                </div>
              </div>
              <Image
                className="post-title-image"
                src="/blog/building-support-assistant/thumb.jpg"
                alt="A stack of gold-outlined documents feeding a chat bubble with two source tags beneath it, and a dashed question-mark box pointing to a phone handset, on a deep teal background"
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
              Small manufacturers answer the same handful of questions over
              and over. Will it fit my boat? Can I use it in salt water? How
              long does installation take? What’s the warranty? The answers
              are almost always written down somewhere already, in an FAQ, a
              product page, or an instructions PDF. Customers just don’t find
              them, so they email or call, and someone stops what they’re
              doing to retype an answer that’s already on the website.
            </p>
            <p>
              That’s a good fit for AI, with one big condition: it can’t make
              things up. A support assistant that confidently invents an
              installation step or a safety rule is worse than no assistant
              at all. So I built a prototype for a small company that makes a
              boat docking product, using nothing but their public documents,
              and designed it around one rule: answer from the documents or
              say you don’t know.
            </p>
            <p>
              It’s a prototype, not something their customers use. I built it
              on spec to show what this would look like for a business their
              size.
            </p>

            <h2>Start with the documents, not the model</h2>
            <p>
              Before any AI, the first job was collecting what the company has
              actually published: their FAQ, product page, About page, return
              policy, contact page, a page written for boat owners, and the
              official Instructions for Use PDF. That came to 28 passages from
              seven sources.
            </p>
            <p>
              The instructions PDF was the one that mattered most, and it was
              the hardest to find. It isn’t in the site’s menu or the FAQ.
              It’s linked from one spot on the product page. That PDF holds the
              safety-critical material, like how to approach the dock and how
              to tie the boat down in wind and current. My guess going in was
              that this kind of content wouldn’t be public at all. It was
              public, just buried. That’s a finding in itself: if I had trouble
              finding it, customers do too.
            </p>

            <h2>Finding the right passage</h2>
            <p>
              When a customer asks a question, the assistant first looks for
              the passages most likely to answer it. It uses a classic
              keyword-weighting method (TF-IDF): words that are rare across the
              documents, like “salt” or “tritoon,” count for more than common
              ones. Each question gets compared against all 28 passages, and
              the top four go forward, but only if they clear a minimum match
              score. If nothing clears the bar, the assistant is told that
              nothing relevant was found.
            </p>
            <p>
              The word weights are computed ahead of time by a small batch job
              written in Apache Spark, which builds the vocabulary (449 terms)
              and figures out how rare each word is across the whole
              collection. Spark is overkill for 28 passages, and I’ll admit I
              partly used it for the practice. But the split is the right one:
              the heavy, whole-collection math runs offline, and answering a
              question only does a quick comparison. The same job would handle
              a few thousand pages of manuals without changing shape.
            </p>
            <p>
              Why not the newer approach, where an AI model converts every
              passage into an “embedding” for meaning-based search? At this
              size, keyword matching works well, and it’s easy to inspect: you
              can see exactly why a passage was picked. If the document set
              grew, or customers started phrasing questions very differently
              from the docs, embeddings would be the next step.
            </p>

            <h2>The rule that matters: answer only from the material</h2>
            <p>
              The passages and the question go to Claude with strict
              instructions. Answer using only the reference material. Never
              invent installation steps, specifications, safety guidance,
              warranty terms, or policies that aren’t in it. If the material
              doesn’t answer the question, say so plainly and give the
              customer the support email and phone number, and never guess
              about anything safety-related. Keep answers to two to four
              sentences, in plain language rather than long quotes.
            </p>
            <p>
              Every answer also shows its sources underneath, so a customer
              (or the business owner reviewing it) can see whether it came
              from the FAQ, the return policy, or the instructions PDF.
            </p>

            <FlowDiagram
              label="Support assistant answer flow"
              caption="If nothing in the documents matches, the answer is a phone number, not a guess."
              steps={[
                { label: "Question", detail: "Typed by the customer" },
                { label: "Find passages", detail: "Top four of 28, above a minimum match score" },
                { label: "Grounded answer", detail: "Claude answers only from those passages" },
                { label: "Sources shown", detail: "Every answer lists where it came from" },
                { label: "Or hand off", detail: "No match means support’s email and phone" },
              ]}
            />

            <h2>What it looks like</h2>
            <p>
              Here are two example exchanges. The first answer is written from
              the company’s actual FAQ wording; the second shows what happens
              when the documents don’t cover something. Company details are
              removed.
            </p>
            <figure>
              <div className="chat-example">
                <div className="chat-msg chat-q">Can I use it in salt water?</div>
                <div className="chat-msg chat-a">
                  It was designed for freshwater lakes and ponds. In salt
                  water you’d need a floating dock attachment, and the company
                  says salt-water products are in development.
                </div>
                <div className="chat-sources">
                  <span>FAQ</span>
                </div>
                <div className="chat-msg chat-q">
                  What torque should I use on the mounting bolts?
                </div>
                <div className="chat-msg chat-a">
                  I don’t have that in the documentation, and I’d rather not
                  guess on anything that affects how the unit holds your boat.
                  The support team can answer it directly by email or phone.
                </div>
              </div>
              <figcaption>
                Illustrative exchanges, written from the real documents to
                show the shape of the answers.
              </figcaption>
            </figure>
            <p>
              The second answer is the one I care about. A lot of chatbots
              would have produced a plausible-sounding number there. This one
              doesn’t, because nothing in the documents supports one.
            </p>

            <h2>What it would take to go live</h2>
            <p>
              Right now the prototype runs inside Claude’s own environment,
              which handles the AI connection for it. Putting it on a real
              website takes a small server-side piece to hold the AI key
              (you can’t safely put that in a web page) and pass questions
              through. Beyond that, a production version would want two more
              things:
            </p>
            <ul>
              <li>
                <strong>A way to refresh the documents.</strong> When the FAQ
                or a policy changes, the batch job reruns so the assistant
                never quotes last year’s return window.
              </li>
              <li>
                <strong>A log of the questions it couldn’t answer.</strong>
                That list is the most useful output of the whole thing: it’s a
                to-do list of what’s missing from the company’s documentation.
                Fix the docs, and the assistant gets better without touching
                the AI at all.
              </li>
            </ul>
            <p>
              The running cost is small. Each answer is a short request to the
              AI with four passages attached, which works out to about a cent
              or less per answer, depending on the model.
            </p>

            <h2>Where this fits for other businesses</h2>
            <p>
              The pattern isn’t specific to boats. It fits any business where
              the same questions keep coming in and the answers already exist
              in writing: manufacturers with install guides and warranties,
              property managers fielding tenant questions, clinics sending
              pre-visit instructions, software companies with help docs.
            </p>
            <p>
              It doesn’t fit when the answers live in someone’s head instead
              of on paper, or when every question is genuinely different. In
              that case the first project isn’t AI. It’s writing things down.
              That’s the same test from{" "}
              <Link href="/blog/where-ai-pays-off">
                where small businesses should (and shouldn’t) use AI
              </Link>
              : repetitive questions with written answers are one of the few
              places it reliably earns its keep.
            </p>

            <blockquote>
              The most useful thing a support assistant can say is “I don’t
              know, but here’s who does.”
            </blockquote>
          </div>
        </section>

        <section className="band plain" id="related">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">RELATED</div>
                <h2>Start small, and start with what exists.</h2>
              </div>
            </div>
            <div className="article-callout">
              <p>
                This prototype follows the same shape as any good first build:
                one repeated job, documents that already exist, and an output
                you can check. More on scoping that kind of project in why most
                “add AI” pitches fail.
              </p>
              <Link className="btn btn-ghost" href="/blog/scoped-ai-mvp">
                Read the post →
              </Link>
            </div>
          </div>
        </section>

        <PostLeadOffers />

        <section className="band" id="contact">
          <div className="wrap contact-inner">
            <div className="eyebrow">START A PROJECT</div>
            <h2>Answering the same customer questions every week?</h2>
            <p className="lede">
              Send a link to your FAQ or manuals. We’ll tell you honestly
              whether an assistant would help, or whether better docs would do
              more.
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
