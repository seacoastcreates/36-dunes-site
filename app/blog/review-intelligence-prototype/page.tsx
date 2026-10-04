import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "What a 4.16-Star Average Doesn't Tell You — 36 Dunes",
  description:
    "Building a review-intelligence prototype for a multi-line hospitality business: sentiment scoring, zero-shot aspect classification, and what 1,531 real reviews revealed once broken out by business line.",
  alternates: { canonical: "/blog/review-intelligence-prototype" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What a 4.16-Star Average Doesn't Tell You",
  author: { "@type": "Organization", name: "36 Dunes" },
  publisher: { "@type": "Organization", name: "36 Dunes" },
  datePublished: "2026-09-18",
  mainEntityOfPage: "https://36dunes.com/blog/review-intelligence-prototype",
};

type Aspect = { aspect: string; mentions: number; negRate: number };

const ROOMS: Aspect[] = [
  { aspect: "Noise", mentions: 33, negRate: 0.394 },
  { aspect: "Check-in experience", mentions: 180, negRate: 0.122 },
  { aspect: "Ocean view", mentions: 349, negRate: 0.046 },
  { aspect: "Cleanliness", mentions: 157, negRate: 0.019 },
  { aspect: "Staff friendliness", mentions: 258, negRate: 0.008 },
  { aspect: "Value for money", mentions: 635, negRate: 0.002 },
];

const RESTAURANT: Aspect[] = [
  { aspect: "Service speed", mentions: 39, negRate: 0.308 },
  { aspect: "Pub atmosphere", mentions: 212, negRate: 0.08 },
  { aspect: "Food quality", mentions: 276, negRate: 0.08 },
  { aspect: "Drink quality", mentions: 20, negRate: 0.05 },
  { aspect: "Value for money", mentions: 261, negRate: 0.0 },
];

const EVENTS: Aspect[] = [
  { aspect: "Catering quality", mentions: 7, negRate: 0.143 },
  { aspect: "Venue quality", mentions: 107, negRate: 0.084 },
  { aspect: "Staff responsiveness", mentions: 29, negRate: 0.034 },
  { aspect: "Event coordination", mentions: 60, negRate: 0.033 },
  { aspect: "Value for money", mentions: 87, negRate: 0.0 },
];

const BAR_SCALE_MAX = 0.4; // shared across all three panels so they stay comparable

function AspectPanel({ title, aspects }: { title: string; aspects: Aspect[] }) {
  return (
    <div className="aspect-group">
      <h4>{title}</h4>
      {aspects.map((a) => (
        <div className="bar-row" key={a.aspect}>
          <div className="bar-label-row">
            <span>{a.aspect}</span>
            <span className="rate">{Math.round(a.negRate * 100)}%</span>
          </div>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{ width: `${Math.min((a.negRate / BAR_SCALE_MAX) * 100, 100)}%` }}
            />
          </div>
          <div className="bar-meta">{a.mentions.toLocaleString()} mentions</div>
        </div>
      ))}
    </div>
  );
}

const YEARLY: { year: number; rating: number }[] = [
  { year: 2011, rating: 3.93 },
  { year: 2012, rating: 4.14 },
  { year: 2013, rating: 4.42 },
  { year: 2014, rating: 4.24 },
  { year: 2015, rating: 4.31 },
  { year: 2016, rating: 4.24 },
  { year: 2017, rating: 4.21 },
  { year: 2018, rating: 4.4 },
  { year: 2019, rating: 4.01 },
  { year: 2020, rating: 3.67 },
  { year: 2021, rating: 4.38 },
  { year: 2022, rating: 4.15 },
  { year: 2023, rating: 3.63 },
  { year: 2024, rating: 4.11 },
  { year: 2025, rating: 4.35 },
  { year: 2026, rating: 4.41 },
];

const CHART_W = 620;
const CHART_H = 200;
const PLOT_X0 = 34;
const PLOT_X1 = 610;
const PLOT_Y0 = 14;
const PLOT_Y1 = 158;
const Y_MIN = 3.4;
const Y_MAX = 4.6;

function xForIndex(i: number) {
  return PLOT_X0 + (i / (YEARLY.length - 1)) * (PLOT_X1 - PLOT_X0);
}
function yForRating(r: number) {
  return PLOT_Y0 + ((Y_MAX - r) / (Y_MAX - Y_MIN)) * (PLOT_Y1 - PLOT_Y0);
}

const gridTicks = [3.5, 4.0, 4.5];
const xTickYears = [2011, 2014, 2017, 2020, 2023, 2026];
const linePath = YEARLY.map((d, i) => `${i === 0 ? "M" : "L"} ${xForIndex(i)} ${yForRating(d.rating)}`).join(" ");
const dipIndex = YEARLY.findIndex((d) => d.year === 2023);
const prevDipIndex = YEARLY.findIndex((d) => d.year === 2022);
const latestIndex = YEARLY.length - 1;

export default function ReviewIntelligencePost() {
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
                <h1>What a 4.16-Star Average Doesn&apos;t Tell You</h1>
                <p className="lede">
                  A prototype for a client pitch: sentiment scoring and
                  zero-shot aspect classification run against 1,531 real
                  reviews for a multi-line hospitality business — and what
                  showed up once the star average got broken apart.
                </p>
                <div className="article-meta">
                  <span>September 18, 2026</span>
                  <span>7 min read</span>
                  <span>Applied NLP</span>
                </div>
              </div>
              <Image
                className="post-title-image"
                src="/blog/review-intelligence-prototype/thumb.jpg"
                alt="Gold star-rating review cards dissolving into data particles connected to a network of hospitality icons on a dark navy background"
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
              A historic coastal hotel client I was putting a proposal
              together for runs three separate guest experiences under one
              roof: rooms, a restaurant that also operates as a pub, and an
              event venue that hosts weddings and corporate functions. Three
              business lines means three different ways to disappoint a
              guest, and a single star average sitting on Google or
              TripAdvisor doesn&apos;t say which one is actually driving the
              number, or whether it&apos;s slipping in one specific place
              while holding steady everywhere else.
            </p>
            <p>
              Nobody on staff at a property like this is systematically
              reading every review across every platform. They get skimmed
              when something goes wrong, not tracked as a trend. So instead
              of pitching that idea as a slide, I built it — the same
              approach I&apos;d used before:{" "}
              <Link href="/blog/building-photonester">
                show up with real output, not a deck
              </Link>
              .
            </p>

            <h2>The idea: sentiment plus aspect, not just stars</h2>
            <p>
              The plan was to run every review through two transformer
              models instead of one:
            </p>
            <ul>
              <li>
                <strong>Sentiment scoring</strong> —{" "}
                <code>cardiffnlp/twitter-roberta-base-sentiment-latest</code>{" "}
                reads the text itself for positive / neutral / negative,
                which catches what a star rating alone misses — a 3-star
                review that reads as sharply negative in the text, or a
                5-star review burying a real complaint in the second
                sentence.
              </li>
              <li>
                <strong>Zero-shot aspect classification</strong> —{" "}
                <code>MoritzLaurer/deberta-v3-base-zeroshot-v2.0</code> tags
                each review against a label set specific to its business
                line: rooms get judged against cleanliness, noise, view,
                staff, value, check-in; the restaurant against food quality,
                service speed, atmosphere, value, drinks; events against
                coordination, venue quality, catering, responsiveness,
                value.
              </li>
            </ul>
            <p>
              Zero-shot is what makes this buildable solo, with no labeled
              training set: the label lists are just supplied per business
              line at inference time, and the model figures out which apply
              — no hand-tagging a few thousand reviews first.
            </p>

            <h2>v0: validate the mechanics before touching real data</h2>
            <p>
              Before scraping anything, I ran the full pipeline against ten
              made-up reviews covering all three business lines, clearly
              marked as illustrative, just to confirm the mechanics held up
              — that sentiment and aspects were both landing on sensible
              labels, that a mixed review (great view, noisy room) correctly
              flagged both a positive aspect and a negative one instead of
              collapsing to one score. That step is cheap and it&apos;s
              saved me from wiring a real data source into a pipeline that
              had a bug in it.
            </p>

            <h2>Going real: 1,531 reviews, three platforms</h2>
            <p>
              With the mechanics confirmed, I pointed an Apify scrape at the
              property&apos;s actual public listings — Google Maps, Yelp,
              and TripAdvisor — and pulled everything: 1,531 reviews going
              back to 2003, averaging 4.16 stars overall. Every one of them
              ran through both models, tagged with a business line inferred
              from which listing it came from (with reviews that touched
              more than one line, like a wedding guest also reviewing the
              room, counted against each).
            </p>

            <h2>What a 4.16-star average was hiding</h2>
            <p>
              The overall number looks fine. It&apos;s fine because one
              aspect — value for money — gets mentioned constantly and is
              almost never the subject of a complaint, and it drags the
              average up along with it. Underneath that, a few specific
              things are going wrong at a rate the star average completely
              absorbs:
            </p>

            <div className="chart-card">
              <div className="chart-title">
                Negative-mention rate by aspect, per business line
              </div>
              <div className="aspect-charts">
                <AspectPanel title="Rooms" aspects={ROOMS} />
                <AspectPanel title="Restaurant" aspects={RESTAURANT} />
                <AspectPanel title="Events" aspects={EVENTS} />
              </div>
            </div>

            <p>
              Noise complaints in rooms only come up 33 times out of 1,531
              reviews — but 39% of those mentions are negative, by far the
              worst rate on the property. Restaurant service speed is the
              same shape: rare (39 mentions) but bad when it comes up (31%
              negative). Meanwhile ocean view gets mentioned 349 times and
              is negative only 5% of the time, and value for money — the
              single most-mentioned aspect anywhere on the property at 635
              mentions in rooms alone — is negative essentially never. A
              handful of loud, low-volume problems are sitting right next to
              the property&apos;s biggest strengths, and a star average has
              no way to tell them apart.
            </p>

            <h2>Finding the one bad year</h2>
            <p>
              With reviews dated back to 2011 in meaningful volume, I could
              also chart the year-over-year average and let the same
              aspect-tagging explain any dip, not just show that one
              happened.
            </p>

            <div className="chart-card">
              <div className="chart-title">Average rating by year, 2011–2026</div>
              <svg
                className="trend-chart"
                viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                role="img"
                aria-label="Line chart of average yearly rating from 2011 to 2026, dipping sharply in 2023 before recovering."
              >
                {gridTicks.map((t) => (
                  <g key={t}>
                    <line
                      className="grid-line"
                      x1={PLOT_X0}
                      x2={PLOT_X1}
                      y1={yForRating(t)}
                      y2={yForRating(t)}
                    />
                    <text className="axis-label" x={PLOT_X0 - 8} y={yForRating(t) + 3} textAnchor="end">
                      {t.toFixed(1)}
                    </text>
                  </g>
                ))}
                {xTickYears.map((yr) => {
                  const i = YEARLY.findIndex((d) => d.year === yr);
                  return (
                    <text
                      key={yr}
                      className="axis-label"
                      x={xForIndex(i)}
                      y={PLOT_Y1 + 16}
                      textAnchor="middle"
                    >
                      {yr}
                    </text>
                  );
                })}
                <path className="trend-line" d={linePath} />
                {YEARLY.map((d, i) => (
                  <g key={d.year}>
                    <circle
                      className="trend-dot-ring"
                      cx={xForIndex(i)}
                      cy={yForRating(d.rating)}
                      r={5}
                    />
                    <circle
                      className="trend-dot"
                      cx={xForIndex(i)}
                      cy={yForRating(d.rating)}
                      r={3}
                    />
                  </g>
                ))}
                <text
                  className="point-label-dim"
                  x={xForIndex(prevDipIndex)}
                  y={yForRating(YEARLY[prevDipIndex].rating) - 10}
                  textAnchor="middle"
                >
                  4.15
                </text>
                <text
                  className="point-label"
                  x={xForIndex(dipIndex)}
                  y={yForRating(YEARLY[dipIndex].rating) + 18}
                  textAnchor="middle"
                >
                  3.63 (−0.52)
                </text>
                <text
                  className="point-label-dim"
                  x={xForIndex(latestIndex) - 4}
                  y={yForRating(YEARLY[latestIndex].rating) - 10}
                  textAnchor="end"
                >
                  4.41
                </text>
              </svg>
            </div>

            <p>
              2023 is the sharpest single-year drop in the whole dataset —
              down half a star from the year before. The drilldown (same
              aspect tags, just filtered to that year) points at what
              actually happened: check-in experience complaints in rooms
              (4 of 16 mentions negative that year), ocean-view complaints,
              a rough patch in venue quality for events, and a food-quality
              dip in the restaurant — a cluster across all three business
              lines in the same year, not one isolated problem. That&apos;s
              a materially different conversation than &quot;2023 was a bad
              year&quot; — it&apos;s &quot;here&apos;s what was actually
              going wrong, and where.&quot;
            </p>

            <h2>Being honest about what&apos;s recent versus what&apos;s thin</h2>
            <p>
              The one design decision I&apos;m most glad I made: every
              recent-vs-prior comparison carries a low-confidence flag when
              the recent sample is small. Noise complaints in rooms, for
              instance, look like they&apos;ve improved a lot recently — but
              that&apos;s 2 negative mentions out of 7 in the last twelve
              months, not enough to trust on its own, and the report says so
              rather than quietly presenting a trend line built on 7 data
              points as fact. Almost everything else on the property is
              trending flat or better over the last year; the one aspect
              that ticked up slightly — cleanliness in rooms, from 1.6%
              negative to 3.4% — is a small enough move that it&apos;s worth
              watching, not worth alarm.
            </p>

            <h2>Where this goes next</h2>
            <p>
              This is v0 — a static report, not a live dashboard. The path
              from here is exactly what makes it a real pitch instead of a
              proof of concept: a lightweight dashboard the ownership group
              can check on a schedule instead of reading a PDF once, and
              eventually alerting when a negative-aspect rate crosses a
              threshold, so a problem gets caught while it&apos;s still
              small instead of after enough guests have mentioned it that
              it&apos;s obvious in the star average anyway.
            </p>
            <p>
              The broader point holds for any business with more than one
              way to disappoint a customer: the aggregate score is real, but
              it&apos;s an average of things that don&apos;t actually
              average well together. Breaking it apart by what customers are
              specifically saying, and being honest about how much evidence
              backs each finding, is a more useful artifact than the number
              on the door.
            </p>

            <blockquote>
              A handful of loud, low-volume problems were sitting right next
              to the property&apos;s biggest strengths — and the star
              average had no way to tell them apart.
            </blockquote>
          </div>
        </section>

        <section className="band" id="contact">
          <div className="wrap contact-inner">
            <div className="eyebrow">START A PROJECT</div>
            <h2>Sitting on review or feedback data nobody&apos;s systematically reading?</h2>
            <p className="lede">
              Tell us what you&apos;re working with. We&apos;ll tell you
              honestly whether there&apos;s a real signal in it worth
              building for.
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
