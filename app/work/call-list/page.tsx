import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import CallListForm from "../../components/CallListForm";

export const metadata: Metadata = {
  title: "Call List: Researched, Ranked Sales Prospects — 36 Dunes",
  description:
    "When a pipeline dries up, the usual fix is a bigger list. The real fix is a better one — researched, ranked, and built so a rep can start dialing instead of researching.",
  alternates: { canonical: "/work/call-list" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Call List: a researched, ranked prospect list built for reps, not for a database import",
  description:
    "A case study on building researched, ranked, call-ready prospect lists — the deliverable shape, shown with illustrative data, not a real client's.",
  author: { "@type": "Organization", name: "36 Dunes" },
  publisher: { "@type": "Organization", name: "36 Dunes" },
  datePublished: "2026-10-09",
  mainEntityOfPage: "https://36dunes.com/work/call-list",
};

export default function CallListCaseStudy() {
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
            <Link className="back-link" href="/">
              ← Back to home
            </Link>
            <div className="post-intro-grid">
              <div>
                <div className="eyebrow">CASE STUDY — SALES PROSPECTING</div>
                <h1>When a pipeline dries up, the problem is usually the list.</h1>
                <p className="lede">
                  A bought list is stale the day it arrives. A scraped one
                  is flat — every name gets the same generic email. I build
                  something in between: a list that&apos;s actually
                  researched, ranked by fit, and built so a rep can start
                  dialing instead of Googling. Here&apos;s what one looked
                  like, recently, for a client selling into a narrow
                  regional market.
                </p>
                <div className="article-meta">
                  <span>Regional B2B prospecting</span>
                  <span>Researched, not scraped</span>
                  <span>Built in days</span>
                </div>
              </div>
              <Image
                className="post-title-image"
                src="/work/call-list/thumb.jpg"
                alt="A glowing telephone handset connected to a ranked list of bars tapering from longest to shortest, converging into contact nodes, on a steel-blue background"
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
              The brief was simple and common: a sales team with a defined,
              narrow market — one industry, one region — whose usual lead
              sources had dried up. Directory exports. Old trade-show lists.
              The kind of &quot;leads&quot; that cost a rep twenty minutes of
              research before the first call is even worth making.
            </p>
            <p>
              What I built instead was a single ranked list, one row per
              real business, each one carrying everything a rep needs to
              make that first call a good one: a fit score, a direct
              contact where one could actually be found, and a short,
              specific reason to pick up the phone — not a form-letter
              opener.
            </p>

            <figure>
              <Link
                href="#get-a-list"
                className="call-list-banner-link"
                aria-label="Request your free 10-lead preview — jump to the form"
              >
                <Image
                  src="/call-list-banner@2x.png"
                  alt="36 Dunes Call List — request a free 10-lead preview. Ten ranked prospects, each with the reason to call."
                  width={1200}
                  height={320}
                  className="call-list-banner-img"
                  sizes="(max-width: 780px) 100vw, 80ch"
                />
              </Link>
            </figure>

            <h2>What a researched lead actually looks like</h2>
            <p>
              This is a mocked-up example, not the real client&apos;s data —
              same shape, fabricated business — because the real list isn&apos;t
              mine to show. But it&apos;s an honest picture of what shows up
              per prospect: a fit score, the signals that drove it, a direct
              contact where one exists, and a few specific reasons to call,
              not a generic pitch.
            </p>

            <figure>
              <Image
                src="/work/call-list/sample-card.png"
                alt="An illustrative example of a single researched lead card, showing a fit score, tier badge, contact info, talking points, and a call brief, with the specific contact details and research blurred out"
                width={1100}
                height={462}
                sizes="(max-width: 780px) 100vw, 80ch"
              />
              <figcaption>
                Illustrative example, built to show the shape of the
                deliverable — not real client data. Contact details and
                research blurred on purpose; what&apos;s real is for the
                person paying for it.
              </figcaption>
            </figure>

            <h2>What you see before you buy</h2>
            <p>
              The full list is ranked top to bottom, but it isn&apos;t
              handed over all at once, unqualified. A sample tier comes
              fully unlocked — real contacts, real research — so you can
              judge the quality before committing to the rest. Everything
              past that shows its rank, its tier, and what&apos;s available
              on it, with the specifics held back until it&apos;s actually
              yours.
            </p>

            <figure>
              <Image
                src="/work/call-list/sample-rows.png"
                alt="An illustrative example of locked rows in the full prospect list, showing rank, tier, industry, location, and which contact fields are available, with names withheld"
                width={1100}
                height={340}
                sizes="(max-width: 780px) 100vw, 80ch"
              />
              <figcaption>
                Again, illustrative — the mechanic is real, the rows aren&apos;t.
              </figcaption>
            </figure>

            <h2>What I won&apos;t put in a blog post</h2>
            <p>
              Every list is researched and ranked against the signals that
              actually predict fit for <em>that</em> client&apos;s pitch —
              and that mix is different every time, because the businesses
              worth calling in one market aren&apos;t the same ones worth
              calling in another. Figuring out which signals matter, where
              to source them, and how to verify a contact is real before it
              goes on the list is most of the actual work. That part I keep
              for the people who hire me, the same way I would for you.
            </p>
            <p>
              What I can tell you: it&apos;s built from research a rep could
              do themselves, just not for 300 businesses before lunch. Every
              phone number and email gets checked against the business&apos;s
              own site before it makes the list — nothing gets on there
              because a database said so.
            </p>

            <blockquote>
              A list of names isn&apos;t a pipeline. A list of reasons to
              call is.
            </blockquote>
          </div>
        </section>

        <section className="band" id="get-a-list">
          <div className="wrap contact-inner">
            <div className="eyebrow">GET A SAMPLE</div>
            <h2>If your pipeline&apos;s gone quiet, let&apos;s see what a real list for your market looks like.</h2>
            <p className="lede">
              Tell me the industry and the region. I&apos;ll tell you
              honestly whether it&apos;s researchable at the quality shown
              above — and if it is, what a sample would look like.
            </p>
            <CallListForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
