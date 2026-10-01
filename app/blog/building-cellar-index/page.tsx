import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Building Cellar Index: Forecasting Wine Prices — 36 Dunes",
  description:
    "Ten years of government PDF price lists turned into three production models — and the ablation discipline that rejected most of the features I tried. Plus what's still left to tune.",
  alternates: { canonical: "/blog/building-cellar-index" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Building Cellar Index: Teaching a Model Which Wines Are About to Change Price",
  author: { "@type": "Organization", name: "36 Dunes" },
  publisher: { "@type": "Organization", name: "36 Dunes" },
  datePublished: "2026-10-01",
  mainEntityOfPage: "https://36dunes.com/blog/building-cellar-index",
};

export default function BuildingCellarIndexPost() {
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
            <div className="eyebrow">BUILD LOG</div>
            <h1>Building Cellar Index: Teaching a Model Which Wines Are About to Change Price</h1>
            <p className="lede">
              Ten years of government PDF price lists, three production
              models, and a lot of features that didn&apos;t make the cut.
              Here&apos;s how Cellar Index forecasts wine prices — and what
              I&apos;d tune next.
            </p>
            <div className="article-meta">
              <span>October 1, 2026</span>
              <span>8 min read</span>
              <span>MLOps</span>
            </div>
          </div>
        </section>

        <section className="plain" id="content">
          <div className="wrap prose">
            <p>
              I wanted a project that would force me to do real MLOps, not
              just train a notebook model and call it done: a shared feature
              pipeline between training and serving, a model registry,
              scheduled retraining, and honest evaluation against a holdout
              instead of a cherry-picked demo. I also wanted an excuse to use
              AWS&apos;s own ML services hands-on rather than read about
              them. Wine prices turned out to be a good problem for that —
              there&apos;s a real public dataset behind them, and the
              question &quot;is this about to get more expensive&quot; has an
              obvious, checkable answer a quarter later.
            </p>
            <p>
              The result is{" "}
              <Link href="https://www.thepriceofwine.com">Cellar Index</Link>,
              live at{" "}
              <a href="https://www.thepriceofwine.com">thepriceofwine.com</a>
              . It tracks about 31,000 wines and forecasts which ones are
              likely to move in price, whether today&apos;s price is fair for
              what the wine is, and how the next vintage is likely to be
              priced against the current one.
            </p>

            <h2>The data: 508,000 rows from 40 PDFs</h2>
            <p>
              Pennsylvania is a control state — the Pennsylvania Liquor
              Control Board is the retailer, and Act 39 of 2016 requires it
              to publish the full retail price list every quarter. That gives
              ten years of real, official shelf prices: 40 quarterly reports,
              each with 12,000–15,000 lines of code, description, size,
              regular price, and any sale or clearance price. No scraping
              fragile retailer pages, no synthetic placeholder data — just a
              government PDF that changes format on you once in a decade.
            </p>
            <p>
              Parsing it was most of the early work. The report layout
              changed in October 2023, names wrap onto extra lines, and
              there&apos;s no category column, so keyword rules split wine
              from spirits and accessories and assign a style. The harder
              decision was what counts as &quot;one wine.&quot; I settled on:
              one vintage of one product at one bottle size. Caymus 2019 and
              Caymus 2020 are different wines with separate price histories.
              A union-find join ties rows together within a vintage, using
              the PLCB code where it survives the 2023 rewrite and a
              normalized name otherwise, and vintages of the same product are
              grouped into a family so a wine&apos;s page can show its other
              vintages. About 30% of rows print no vintage at all — some are
              genuinely non-vintage (Champagne NV), others are everyday wines
              the PLCB just doesn&apos;t record a vintage for — and those
              are tracked as their own &quot;NV&quot; series rather than
              forced into a vintage they don&apos;t have.
            </p>

            <h2>Three models, one real question</h2>
            <p>
              List prices are sticky. About 3% of wines change price in a
              given quarter, so &quot;predict no change&quot; is right almost
              all the time and useless as a product. The actual question is
              which wines are about to move. Cellar Index answers that with a
              price-change classifier — P(higher), P(lower), and the typical
              size of the move, at one to four quarters out — calibrated with
              Platt scaling and conformalized quantile regression for the
              price ranges. On the last four holdout quarters it never saw
              during training, it hits 0.89 ROC AUC for next-quarter rises
              and 0.84 at a year out, and flagged wines are 3–6× more likely
              to actually move than an average wine.
            </p>
            <p>
              Two more models sit alongside it. A next-vintage model predicts
              how a wine&apos;s next vintage will be priced against the
              current one, trained on about 4,900 past vintage transitions;
              it beats a flat &quot;same price&quot; guess in every one of
              four rolling test years, by 4–21% in mean absolute error. And a
              fair-price model — a hedonic pricing model, the standard
              approach in wine economics — predicts what a wine{" "}
              <em>should</em> cost given what it is: region, grape,
              classification, style, bottle size, vintage age, the words in
              its name, and the producer&apos;s price level from its other
              wines, but never the wine&apos;s own price. Cross-validation is
              grouped by wine family, so a wine is always priced by a model
              that saw none of its vintages. On held-out wines it lands a
              16.3% median error and explains 80% of the variation in log
              price, against a 36.7% baseline from just region-plus-grape
              medians.
            </p>

            <h2>The part I&apos;m most glad I did: an ablation discipline</h2>
            <p>
              It would have been easy to throw every feature I could source
              at these models and ship whatever scored best on one test
              split. Instead every feature group had to clear the same bar:
              does it help across multiple rolling holdout years, not just
              one. Most didn&apos;t.
            </p>
            <p>
              I built a weather feature from NASA POWER reanalysis data —
              growing degree days, frost days, heatwave days, harvest and
              season rain, computed as anomalies against each region&apos;s
              1991–2020 normal — and it correctly captures real events like
              the April 2021 Champagne and Burgundy frost and Napa&apos;s hot
              2020. It helps predict price cuts, but it hurts rise ranking,
              and its effect on next-vintage pricing flips sign between test
              years. It&apos;s kept as data, not used. A USDA California
              grape-crush supply feature fared better: it lowered next-vintage
              error in all four rolling test years and is adopted there. A
              rule-of-thumb drinking-window feature helped the price-change
              model meaningfully for vintage-dated wines (rise AUC 0.771 →
              0.808) and is adopted.
            </p>
            <p>
              Brand momentum — the share of a producer&apos;s other wines
              raised or cut recently, computed point-in-time so a wine never
              sees its own future — looked like a clear win on the most
              recent holdout year (rise ranking 0.838 → 0.851). On an earlier
              holdout year it made every single comparison worse. The likely
              cause is a statewide price increase in April 2023 that touched
              31% of all wines at once: the model was probably just learning
              &quot;prices moved together that quarter,&quot; not anything
              about the brand. Grape variety and classification (Grand Cru,
              Reserva, DOCG) hurt in both models where I tried them, and in
              the next-vintage model specifically they overfit a training set
              of only about 4,900 transitions once the high-cardinality grape
              category was added. None of these four are adopted. All four
              are still computed and stored, because rejecting a feature
              isn&apos;t the same as deciding it&apos;s wrong forever — it
              means it didn&apos;t earn its place yet.
            </p>

            <h2>Making training and serving share one brain</h2>
            <p>
              The thing I was most deliberate about: there&apos;s exactly one
              feature pipeline, in a <code>wineprice</code> package, and both
              the training job and the FastAPI service call the same{" "}
              <code>WinePriceModel.forecast()</code> method from it. That
              rules out the most common way an ML system silently breaks —
              training and serving drifting apart because someone edited the
              feature logic in one place and not the other. An automated
              parity test checks that online predictions match the stored
              batch forecasts for a sample of wines on every run, specifically
              to catch that regression.
            </p>
            <p>
              Each training run writes to an immutable, versioned model
              registry — local folders in development, S3 in production —
              with its metrics and artifact path recorded and exactly one
              version marked active. The API polls for the active version and
              hot-swaps a newly promoted model within 60 seconds, no restart.
              Online inference for a single wine, including the what-if
              scenario endpoint (&quot;what would this forecast look like at
              a 40% clearance discount&quot;), runs in about 110ms.
            </p>
            <p>
              It&apos;s deployed on AWS with CDK: one EC2 instance behind
              CloudFront, Postgres on the same box, no SSH — admin access is
              through SSM Session Manager only. A quarterly EventBridge
              schedule, timed a week after each new PLCB price list, triggers
              an SSM command that ingests the new data and kicks off
              retraining as a SageMaker Processing job (the account&apos;s
              training-job quota is 0, so Processing jobs stand in). Trained
              artifacts land in the S3 registry and the API picks them up
              automatically. A Bedrock call to Amazon Nova Lite turns each
              wine&apos;s forecast, fair price, and drinking window into a
              plain-English explanation on click, cached and rate-limited so
              it stays cheap. The whole thing — compute, storage, and
              quarterly retraining — runs for about $17 a month.
            </p>

            <h2>Model tuning still to come</h2>
            <p>
              A few things are on the list for the next round, all of them
              problems the evaluation already surfaced rather than guesses
              about what might help:
            </p>
            <ul>
              <li>
                <strong>Fixing the calibration drift.</strong> At three to
                four quarters out, the model predicts a 4.7% rise rate
                against an actual rate of 2.6%, because price rises slowed
                down after 2024 and the recent calibration window still
                reflects the faster pace before that. A flat recency window
                isn&apos;t enough here — the fix is probably a calibration
                that&apos;s explicitly aware of the trend, not just the
                last few quarters, or a decay term that down-weights older,
                faster-moving periods more aggressively.
              </li>
              <li>
                <strong>Making brand momentum survive a statewide shock.</strong>{" "}
                The feature&apos;s instability traces to one event — the
                April 2023 increase — swamping the brand-level signal in
                whichever holdout year contains it. Before trying brand
                momentum again, I&apos;d detect statewide-shock quarters
                explicitly (a quarter where price-change rate is several
                standard deviations above normal) and either exclude them
                from the brand-momentum calculation or let the model see the
                shock as its own feature, so brand-specific moves and
                market-wide moves stop getting confused for each other.
              </li>
              <li>
                <strong>Giving grape and classification a fairer shot.</strong>{" "}
                These overfit hardest in the next-vintage model, which only
                has about 4,900 training transitions to work with — not
                because the signal is necessarily fake, but because raw
                high-cardinality categories are too expensive to fit on that
                little data. The fair-price model has 31,000 wines to learn
                from instead, so a hierarchical or shrinkage encoding (rather
                than one-hot or raw categorical) might let these attributes
                earn their place there even though they don&apos;t in the
                next-vintage model.
              </li>
              <li>
                <strong>A reputation signal for the fair-price model.</strong>{" "}
                Its clearest blind spot is prestige the features
                can&apos;t see: a famous producer&apos;s entry-level wine
                (Mouton&apos;s Aile d&apos;Argent) can look like a bargain,
                and icons like Grange or Opus One show large premiums the
                model reads as overpricing. The features it has — region,
                grape, the producer&apos;s own price level — can&apos;t
                distinguish a producer&apos;s reputation from its
                price-setting pattern. A critic-score or secondary-market
                reference feature would probably close most of that gap, but
                it&apos;s a harder data-sourcing problem than anything else
                on this list, since that data isn&apos;t sitting in a
                government PDF.
              </li>
            </ul>
            <p>
              None of these are things I&apos;d ship speculatively. The same
              rule applies as before: they go in only if they clear the
              rolling-holdout bar the adopted features already cleared, and
              they come back out if they don&apos;t.
            </p>

            <h2>See it for yourself</h2>
            <p>
              Cellar Index is live at{" "}
              <a href="https://www.thepriceofwine.com">thepriceofwine.com</a>
              , including a Model page that shows every ablation result above
              with the real numbers, not just the summary. The API docs are
              at{" "}
              <a href="https://www.thepriceofwine.com/api/v1/docs">
                /api/v1/docs
              </a>
              .
            </p>

            <blockquote>
              Rejecting a feature isn&apos;t the same as deciding it&apos;s
              wrong forever — it means it didn&apos;t earn its place yet.
            </blockquote>
          </div>
        </section>

        <section className="band" id="contact">
          <div className="wrap contact-inner">
            <div className="eyebrow">START A PROJECT</div>
            <h2>Have a forecasting problem buried in data nobody&apos;s modeled yet?</h2>
            <p className="lede">
              Tell us what you&apos;re sitting on. We&apos;ll tell you
              honestly whether there&apos;s a real signal in it worth
              building for.
            </p>
            <div className="contact-actions">
              <Link className="btn btn-primary" href="/rfp">
                Request a proposal
              </Link>
              <a className="btn btn-ghost" href="mailto:hello@36dunes.com">
                hello@36dunes.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
