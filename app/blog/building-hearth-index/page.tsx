import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import FlowDiagram from "../../components/FlowDiagram";

export const metadata: Metadata = {
  title: "Building Hearth Index: ZIP-Level Price Forecasts — 36 Dunes",
  description:
    "A one-day feasibility spike that forecasts home values for 894 metros and 26,268 ZIP codes, backtested against nine years of real outcomes. The two-part model, the ablation discipline, and the bugs it caught along the way.",
  alternates: { canonical: "/blog/building-hearth-index" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Building Hearth Index: Forecasting Home Prices for Every ZIP Code, Not Just the Metro",
  image: "https://36dunes.com/blog/building-hearth-index/thumb.jpg",
  author: { "@type": "Organization", name: "36 Dunes" },
  publisher: { "@type": "Organization", name: "36 Dunes" },
  datePublished: "2026-10-09",
  mainEntityOfPage: "https://36dunes.com/blog/building-hearth-index",
};

export default function BuildingHearthIndexPost() {
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
                <h1>Building Hearth Index: Forecasting Home Prices for Every ZIP Code, Not Just the Metro</h1>
                <p className="lede">
                  A one-day feasibility spike that forecasts home values for
                  894 metros and 26,268 ZIP codes, backtested against nine
                  years of real outcomes. The two-part model, the ablation
                  discipline, and the bugs it caught along the way.
                </p>
                <div className="article-meta">
                  <span>October 9, 2026</span>
                  <span>8 min read</span>
                  <span>MLOps</span>
                </div>
              </div>
              <Image
                className="post-title-image"
                src="/blog/building-hearth-index/thumb.jpg"
                alt="A glowing amber city skyline hub connected to surrounding neighborhoods by forecast lines, on a dark clay-terracotta background"
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
              Hearth Index is the housing counterpart to{" "}
              <Link href="/blog/building-cellar-index">Cellar Index</Link>,
              built the same way: free bulk data, a model that has to earn
              every feature it keeps, and a backtest that&apos;s honest about
              where it loses. It forecasts the 12-month change in home values
              for 894 metros and 26,268 ZIP codes, and it came together in a
              single day as a feasibility spike — which is as much a
              statement about reusing a working pattern as it is about the
              problem being easy.
            </p>
            <p>
              It isn&apos;t live anywhere. It runs against a local Postgres
              database, trains in about four minutes, and the whole pipeline
              — download, load, train, publish — is one shell script. More
              on what&apos;s next for it at the end.
            </p>

            <h2>Two forecasts, not one</h2>
            <p>
              The first version used a single LightGBM model per ZIP code.
              It beat momentum on <em>ranking</em> ZIPs within their metro in
              every year from 2014 to 2025, but it lost on raw error in 2023
              and 2025, because it got the national level wrong — a bias of
              −4.4 points in 2023 alone. A model that&apos;s good at telling
              you which ZIPs will outperform their metro isn&apos;t
              automatically good at telling you what the metro itself will
              do, and conflating the two was costing real accuracy.
            </p>
            <p>
              So the forecast splits into two models. A{" "}
              <strong>trend model</strong> predicts the metro&apos;s (and the
              nation&apos;s) own 12-month change, from its lagged momentum,
              the mortgage rate and its change, and Redfin market heat. A{" "}
              <strong>relative model</strong> predicts a ZIP&apos;s change{" "}
              <em>minus</em> its parent metro&apos;s — from the ZIP&apos;s
              own history, its price level relative to its parent and the
              nation, its mortgage-payment change, and, where Zillow tracks
              it, its price-to-rent ratio. A ZIP&apos;s final forecast is
              just the parent&apos;s trend plus the ZIP&apos;s relative
              forecast. Splitting the problem this way fixed most of the
              2023 miss.
            </p>
            <p>
              One detail worth keeping: some feature groups — Redfin heat,
              mainly — only exist for part of history. Training one booster
              on everything would silently teach it &quot;missing data =
              old era,&quot; which is exactly backwards. Instead, one booster
              gets trained per combination of available sparse groups, and
              each row is scored by the most complete booster it qualifies
              for. With the adopted feature set that means a Redfin-era
              booster (2013 onward) plus a core booster for the nation and
              any metro Redfin doesn&apos;t cover.
            </p>

            <FlowDiagram
              label="Hearth Index forecast structure"
              caption="Splitting the forecast in two fixed most of the 2023 miss."
              steps={[
                { label: "Trend model", detail: "The metro’s (and nation’s) own 12-month change" },
                { label: "Relative model", detail: "The ZIP’s change minus its metro’s", joiner: "+" },
                { label: "ZIP forecast", detail: "Parent trend plus relative forecast", joiner: "=" },
              ]}
            />

            <h2>The data, and the gotcha that cost the first few hours</h2>
            <p>
              Everything is free bulk data: Zillow&apos;s Home Value Index
              (ZHVI) for actual values, Zillow&apos;s published forecast
              (ZHVF, archived monthly so it can be scored against reality
              later), Redfin&apos;s metro market tracker for supply and
              demand signals, and FRED&apos;s 30-year mortgage rate.
            </p>
            <p>
              The first real gotcha: linking 26,268 ZIPs to their metro by
              name should be trivial and wasn&apos;t. Zillow&apos;s ZIP
              file uses full CBSA names (&quot;Houston-The Woodlands-Sugar
              Land, TX&quot;), and its metro file uses short ones
              (&quot;Houston, TX&quot;). A naive join matched about 9,600
              ZIPs. Mapping the long names down to the short ones got that
              to 21,048 — the rest are rural ZIPs or small metros Zillow
              doesn&apos;t publish, and they fall back to the nation as
              their parent.
            </p>
            <p>
              The second: Redfin&apos;s public file was stale — last updated
              2026-06-02 — so it&apos;s used three months lagged in both the
              backtest and the live forecast, not because that&apos;s
              ideal, but because that&apos;s what&apos;s actually available.
              And BLS&apos;s own unemployment bulk files return 403 to
              scripted downloads without a contact email in the User-Agent
              header, so that series comes through FRED instead — which has
              its own limit, a silent 12-series-per-request cap that
              fredgraph doesn&apos;t document anywhere obvious.
            </p>

            <h2>Backtesting honestly</h2>
            <p>
              The backtest is walk-forward: test origins run quarterly from
              2017 to 2025, and each fold trains only on data that would
              have actually been available at that point — no peeking at
              outcomes the model couldn&apos;t have seen yet. Errors are in
              percentage points of log change.
            </p>
            <p>
              Adding Redfin heat to the trend model drops metro MAE from
              4.02 to 3.45 overall — a 14% improvement, and 32% since 2023
              specifically, which is exactly the period the first single-model
              version struggled with. The headline number, though, is
              ranking: the two-part ZIP model hits a 0.25 rank correlation
              with actual outcomes against 0.12 for damped momentum, and
              it&apos;s the better model in <strong>all nine test years</strong>,
              not just on average. ZIPs in the top predicted decile beat
              their own metro 70% of the time, with a realized gap of 4.0
              points over the top and bottom deciles across 12 months.
            </p>

            <h2>The ablation discipline</h2>
            <p>
              Same rule as Cellar Index: every feature group has to clear a
              bar that&apos;s written down before the results come in, and
              it goes back out if it doesn&apos;t clear it. For the trend
              model, a group had to beat the baseline on average, in at
              least two-thirds of the years it changes anything, and be no
              worse from 2023 onward. For the relative model, higher
              within-metro rank correlation on average and in two-thirds of
              years, with error no more than 1% worse.
            </p>
            <p>
              Nothing beat Redfin alone for the trend model — shape
              (volatility, drawdown), affordability, rent, Zillow market
              data, unemployment, and national macro were each tried on top
              of it and none cleared the bar. Two are worth a second look
              later, and I&apos;m writing down exactly why they failed
              instead of just discarding them: Zillow market data
              (&quot;zheat&quot;) wins 2021 and 2024 but blows up in 2022
              (7.34 MAE against 4.83) — with only three years of history to
              learn from at the time, it learned the boom and missed the
              turn. Unemployment helps in ordinary years but actively hurts
              2020–2022, which is precisely when unemployment spiked while
              home prices kept climbing — the correlation it learned from
              every other year inverted at the worst possible moment.
              National macro series only offer about 80 independent time
              points to train on, and they overfit.
            </p>
            <p>
              For the relative model, affordability and rent both passed
              individually and together reached a 0.245 rank correlation,
              good in 8 of 9 years — adopted. A second round added
              unemployment and macro on top of that combination; both made
              it worse and were rejected.
            </p>

            <h2>Where tuning almost went wrong</h2>
            <p>
              Optuna searched hyperparameters on 2017–2021 only, then both
              the tuned result and the existing defaults got scored on
              2022–2025 — years the search never saw. For the trend model,
              the tuned configuration (L1 loss, 948 small trees, heavy
              feature subsampling) was 7% better on the years it was tuned
              against, and 31% worse on the holdout. Defaults kept, for both
              models. That gap is the entire reason the holdout step exists
              — a config that looks like a clear win can be quietly
              memorizing a five-year window instead of learning something
              that generalizes.
            </p>

            <h2>Two bugs the backtest caught before anything shipped</h2>
            <p>
              The first trend-model run had a gating bug: rows without
              Zillow market data were also silently losing their Redfin
              features, which weren&apos;t supposed to depend on it at all.
              Separately, a handful of relative-model test rows had no
              target because of real gaps in one parent metro&apos;s Zillow
              series, and the ablation&apos;s MAE averages had been quietly
              skipping those years rather than flagging them. Both got
              fixed, the affected rounds got re-run, and neither fix changed
              which features got adopted — but I&apos;d rather find that out
              than assume it.
            </p>

            <h2>What&apos;s actually working, and what&apos;s still weak</h2>
            <p>
              The two-part design is the real result here: a single ZIP
              model that&apos;s good at ranking but blind to the national
              level, versus a split model that keeps the ranking skill and
              fixes the level. That trade held up across nine years of
              walk-forward testing, not a cherry-picked window.
            </p>
            <p>Where it&apos;s still weak, plainly:</p>
            <ul>
              <li>
                The two-part ZIP model loses narrowly to damped momentum in
                2022, 2024, and 2025 on raw error, even though it wins on
                ranking every year.
              </li>
              <li>
                The national forecast comes from the core booster — the one
                with no Redfin data, because Redfin doesn&apos;t publish a
                national series — and it&apos;s the weakest piece of the
                whole pipeline.
              </li>
              <li>
                Zillow&apos;s market-data features and unemployment are both
                genuinely useful in the years they help and actively harmful
                in the years they don&apos;t, and three years of history
                isn&apos;t enough to tell those years apart in advance.
              </li>
            </ul>
            <p>
              Next: deploying it on AWS using the same CDK pattern that
              already runs Cellar Index — one EC2 instance, CloudFront, a
              monthly refresh through EventBridge and SSM. After that, a
              better national trend (probably aggregating the metro
              forecasts rather than training a separate weak model for it),
              revisiting Zillow market data once it has more history behind
              it, and a running scorecard of this model&apos;s forecasts
              against Zillow&apos;s own, since both are archived monthly and
              outcomes will eventually settle the question.
            </p>

            <blockquote>
              A model that ranks well and a model that&apos;s right about
              the level aren&apos;t the same model until you check — the
              backtest is what tells you which one you actually built.
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
