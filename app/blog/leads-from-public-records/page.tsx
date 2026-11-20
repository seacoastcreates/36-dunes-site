import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import PostLeadOffers from "../../components/PostLeadOffers";
import FlowDiagram from "../../components/FlowDiagram";

export const metadata: Metadata = {
  title: "Your Best Leads Might Already Be Public Record — 36 Dunes",
  description:
    "A prospect list for a school seating manufacturer built from free state construction records and about $2 of AI. Why timing beats a bigger list, who actually makes the decision, and the stale-record mistake to avoid.",
  alternates: { canonical: "/blog/leads-from-public-records" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Your Best Leads Might Already Be Public Record",
  image: "https://36dunes.com/blog/leads-from-public-records/thumb.jpg",
  author: { "@type": "Organization", name: "36 Dunes" },
  publisher: { "@type": "Organization", name: "36 Dunes" },
  datePublished: "2026-11-20",
  mainEntityOfPage: "https://36dunes.com/blog/leads-from-public-records",
};

export default function LeadsFromPublicRecordsPost() {
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
                <h1>Your Best Leads Might Already Be Public Record</h1>
                <p className="lede">
                  A prospect list for a school seating manufacturer, built from
                  free state construction records and about $2 of AI. Why
                  timing beats a bigger list, who actually makes the decision,
                  and the stale-record mistake to avoid.
                </p>
                <div className="article-meta">
                  <span>November 20, 2026</span>
                  <span>6 min read</span>
                  <span>Prospecting</span>
                </div>
              </div>
              <Image
                className="post-title-image"
                src="/blog/leads-from-public-records/thumb.jpg"
                alt="A gold outline of a school building above a stack of documents, with a timeline beneath it where one segment glows brighter than the rest, on a dark slate-blue background"
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
              Most lead lists answer the question “who exists?” Every business
              of a certain type in a certain area, with a phone number. That’s
              useful, but it’s not the question a salesperson actually has. The
              real question is “who is about to buy, and when?”
            </p>
            <p>
              For some industries, the answer is sitting in public records.
              Nobody has to guess. A government agency already wrote it down,
              because spending public money means publishing what you’re
              spending it on.
            </p>
            <p>
              I built a prospect list on spec for a New England manufacturer
              of gym bleachers and auditorium seating, and it turned out to be
              one of the cheapest and most useful builds I’ve done.
            </p>

            <h2>Find out who really decides</h2>
            <p>
              The obvious customer for school seating is the school district.
              They pay for it. But they mostly don’t choose it.
            </p>
            <p>
              When a school gets built or renovated, the architect writes the
              specifications, including the section that describes the
              bleachers and auditorium seats. That happens during the design
              phases, often one to three years before the project goes out to
              bid. By the time contractors are bidding, the spec either names
              your product or it names a competitor’s with “or approved equal”
              tacked on, and you’re fighting uphill.
            </p>
            <p>
              So the most valuable thing a list can tell this company isn’t
              “here’s a school.” It’s “here’s a school whose architect is
              writing the seating spec right now, and here’s the firm.”
            </p>

            <h2>Where the records live</h2>
            <p>
              States that help pay for school construction track every project
              they fund. I used four free sources:
            </p>
            <ul>
              <li>
                <strong>Massachusetts’ school building authority</strong>{" "}
                publishes a project report before most board meetings. It lists
                every active project with its phase, budget, bid dates, and the
                names of the architect, project manager, and construction
                manager. That one document did most of the work.
              </li>
              <li>
                <strong>Maine’s Department of Education</strong> publishes its
                approved projects and a ranked list of schools with documented
                needs that haven’t been funded yet.
              </li>
              <li>
                <strong>New Hampshire’s</strong> building aid ranked list.
              </li>
              <li>
                <strong>The federal school directory</strong>, which adds phone
                numbers, addresses, and enrollment for every school and
                district.
              </li>
            </ul>
            <p>
              None of it was hard to read, but some of it was annoying to get.
              Two state websites block automated downloads, so a couple of
              files had to be pulled by hand, and one of the older lists was a
              scanned PDF.
            </p>

            <h2>What the AI did (not much, on purpose)</h2>
            <p>
              I wanted to keep this one cheap, and it didn’t need
              much AI. The only paid step was having Claude transcribe tables
              out of the PDFs, including the scanned one. That cost about $1.80,
              once.
            </p>
            <p>
              Everything after that is plain code. Each project gets matched to
              its school in the federal directory, then scored with a simple
              weighted formula anyone can read:
            </p>
            <ul>
              <li>
                <strong>Seating need (35%).</strong> A high school with a gym
                and an auditorium needs more seating than an elementary school.
              </li>
              <li>
                <strong>Timing (30%).</strong> Projects in the design phases,
                where the spec is being written, score highest. Projects
                already under construction score low, because the seating
                decision is mostly made.
              </li>
              <li>
                <strong>Size (20%).</strong> Bigger enrollment, bigger job.
              </li>
              <li>
                <strong>Project type (15%).</strong> New buildings beat
                renovations.
              </li>
            </ul>
            <p>
              Every row also gets a plain next step tied to its phase. For a
              project in early design, it says to contact the named
              architect’s K-12 team now. For one that’s already under
              construction, it says to ask the construction manager whether the
              seating package is still open, and if it isn’t, to offer an
              inspection and service agreement after the building opens.
            </p>

            <FlowDiagram
              label="From public records to a ranked project list"
              caption="The only paid step was the transcription. The ranking is a formula you can read and argue with."
              steps={[
                { label: "Public records", detail: "State project reports and lists" },
                { label: "Transcribe", detail: "Claude reads the PDFs, about $2" },
                { label: "Match", detail: "Each project tied to its school" },
                { label: "Score", detail: "Need, timing, size, project type" },
                { label: "Next step", detail: "Who to call, based on the phase" },
              ]}
            />

            <h2>What came out</h2>
            <p>
              123 active school projects across Maine, New Hampshire, and
              Massachusetts. In 25 of them, the seating spec is being written
              now. 72 name the architect, so the person to call is already on
              the page. On top of that, there’s a watch list of 93 Maine schools
              with a documented need but no state funding yet. Some of those
              will pass local bonds and turn into projects.
            </p>
            <p>
              Most of the active projects are in Massachusetts, simply because
              Massachusetts publishes the most detail. That’s worth knowing
              about public data: what you can find depends on what each agency
              decides to publish, not on where the business is.
            </p>

            <h2>The catch: public records go stale</h2>
            <p>
              Here’s the mistake I made. Some of Maine’s approved projects were
              years old. The list said “approved,” so I treated them as
              active. When I went back and checked each one, two schools had
              already been built and opened. Several others had moved on to
              construction. I caught it after I’d already reached out once,
              which is later than I should have.
            </p>
            <p>
              Nothing in the record was wrong. It was just old. A record shows
              what was true on the day it was written. So my rule now: anything
              older than a year gets checked against a current source before it
              goes on a list someone will use. Usually that means a quick look
              at the district’s website or a local news story. It takes minutes
              per record, and it’s the difference between looking like you did
              your homework and looking like you didn’t.
            </p>

            <h2>Where else this works</h2>
            <p>
              School seating is a niche, but the pattern isn’t. Lots of buying
              decisions leave a public trail before the money gets spent:
            </p>
            <ul>
              <li>
                <strong>Building permits</strong> for roofers, HVAC and solar
                installers, and anyone who sells into new construction.
              </li>
              <li>
                <strong>Property sales</strong> for businesses that serve new
                owners: dock builders, landscapers, movers, home services.
              </li>
              <li>
                <strong>New business registrations and licenses</strong> for
                insurance, bookkeeping, equipment, and restaurant suppliers.
              </li>
              <li>
                <strong>Public bid boards and meeting minutes</strong> for
                anyone who sells to towns, schools, or utilities.
              </li>
            </ul>
            <p>
              The questions are the same each time. Who actually makes the
              decision? What public record shows up before they make it? How
              old is that record, and is it still true?
            </p>

            <blockquote>
              The best lead isn’t everyone who might buy. It’s whoever is about
              to decide, found while there’s still time to be part of the
              decision.
            </blockquote>
          </div>
        </section>

        <section className="band plain" id="related">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">RELATED</div>
                <h2>Ranked lists with the reason attached.</h2>
              </div>
            </div>
            <div className="article-callout">
              <p>
                Call List is the same idea built on different data: a ranked
                list of prospects in your territory, with a direct contact and
                a reason to call on every row.
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
            <h2>Do your buyers leave a paper trail?</h2>
            <p className="lede">
              Tell us what you sell and who decides. We’ll tell you honestly
              whether there’s a public record that shows them coming.
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
