import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import FlowDiagram from "../../components/FlowDiagram";

export const metadata: Metadata = {
  title: "Building Rulebook Trader: Where the Rules Decide and AI Just Reviews — 36 Dunes",
  description:
    "A paper-trading side project built for fun, for testing strategies, and for trying tools. Deterministic rules make every call, a cheap AI reviewer can only veto, and every decision gets logged. The pattern travels well beyond trading.",
  alternates: { canonical: "/blog/building-rulebook-trader" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Building Rulebook Trader: Where the Rules Decide and AI Just Reviews",
  image: "https://36dunes.com/blog/building-rulebook-trader/thumb.jpg",
  author: { "@type": "Organization", name: "36 Dunes" },
  publisher: { "@type": "Organization", name: "36 Dunes" },
  datePublished: "2026-10-28",
  mainEntityOfPage: "https://36dunes.com/blog/building-rulebook-trader",
};

export default function BuildingRulebookTraderPost() {
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
                <h1>Building Rulebook Trader: Where the Rules Decide and AI Just Reviews</h1>
                <p className="lede">
                  A paper-trading side project built for fun, for testing
                  strategies, and for trying tools. Deterministic rules make
                  every call, a cheap AI reviewer can only veto, and every
                  decision gets logged. The pattern travels well beyond
                  trading.
                </p>
                <div className="article-meta">
                  <span>October 28, 2026</span>
                  <span>7 min read</span>
                  <span>AI strategy</span>
                </div>
              </div>
              <Image
                className="post-title-image"
                src="/blog/building-rulebook-trader/thumb.jpg"
                alt="An open gold-line rulebook sending a stream of candlestick shapes through a gold archway checkpoint with a glowing lens, where one candlestick is stopped with an X, on a deep green background"
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
              First, the disclaimer that matters: Rulebook Trader trades on
              an Alpaca <strong>paper</strong> account. No real money, ever.
              The app checks which trading endpoint it&apos;s pointed at on
              startup and refuses to place a single order if it isn&apos;t
              the paper API. This is a side project, and it exists for three
              reasons: it&apos;s fun, it&apos;s a cheap way to test trading
              ideas against live markets instead of a spreadsheet, and
              it&apos;s a sandbox for trying tools I want to know well before
              I put them in front of a client.
            </p>
            <p>
              The interesting part isn&apos;t the trading. It&apos;s the
              division of labor. Most &quot;AI trading bot&quot; pitches
              have a model picking stocks. This one deliberately doesn&apos;t.
              The rules make every decision; the AI gets exactly one narrow
              job, and no authority to override anything.
            </p>

            <h2>The rules do the trading</h2>
            <p>
              Every strategy is plain, deterministic code you could write on
              an index card. Trend + pullback buys a stock above its 50-day
              average when 14-day RSI dips below 35, with a 6% target, a 3%
              stop, and a 10-day maximum hold. RSI-2 mean reversion buys
              short, sharp dips in stocks above their 200-day average.
              Momentum breakout buys new 20-day highs on heavy volume with a
              trailing stop. Each has a bearish mirror image that only trades
              puts. They run side by side, every parameter is editable in the
              dashboard, and adding a new strategy is one file.
            </p>
            <p>
              Around the strategies sits a layer of global risk rules nothing
              can override: position size as a percent of equity, maximum open
              positions overall and per strategy and per sector, a cap on new
              entries per day, a daily-loss halt, a re-entry cooldown, and a
              kill switch. Entries go in as bracket orders, so the stop and
              target live at the broker even if the app misses a tick.
            </p>

            <h2>One narrow job for AI: catch what the rule can&apos;t see</h2>
            <p>
              A rule that says &quot;buy when RSI is oversold&quot; has no
              idea <em>why</em> the stock is oversold. Sometimes it&apos;s an
              ordinary pullback. Sometimes it&apos;s a fraud announcement, an
              earnings miss, or a stock split that broke the price history.
              That gap is where the AI comes in.
            </p>
            <p>
              Before any new entry, Claude Haiku gets the strategy&apos;s
              rules, the signal&apos;s indicators, the last 15 daily bars,
              and recent headlines for the symbol. Its instructions say,
              in so many words, that its job is <em>not</em> to second-guess
              the strategy&apos;s technical logic. It looks for exactly three
              things: news that changes the thesis, a binary event like
              earnings within a couple of trading days, or data that looks
              broken. It approves by default, vetoes only with a concrete
              reason drawn from the inputs, and is told never to invent news
              that isn&apos;t in the headlines.
            </p>
            <p>
              The answer comes back as structured output, validated against a
              schema: a decision, a confidence score, a one-sentence reason,
              and up to three risk notes. It can run in two modes: veto, where
              it can block a trade, or advisory, where it only records an
              opinion. And it fails closed. If the review call errors out in
              veto mode, the trade is skipped, not waved through. Each review
              costs about $0.0005. After the close, the same model writes a
              short daily journal from the day&apos;s signals, fills, and
              scoreboard.
            </p>

            <FlowDiagram
              label="Rulebook Trader entry pipeline"
              caption="Every new entry runs the same gauntlet. The AI sits in the middle with veto power only."
              steps={[
                { label: "Signal", detail: "A strategy’s rule fires" },
                { label: "Risk limits", detail: "Caps on positions, sectors, entries, daily loss" },
                { label: "Claude review", detail: "Approve, or veto with a reason. An error skips the trade" },
                { label: "Order", detail: "Paper account, stop and target attached" },
                { label: "Log", detail: "Every outcome, including blocks and vetoes" },
              ]}
            />

            <h2>The stack, and why each piece</h2>
            <ul>
              <li>
                <strong>Next.js on Vercel.</strong> The dashboard, the API
                routes, and the trading engine live in one TypeScript app,
                deployed on a free Hobby plan. One codebase, one deploy.
              </li>
              <li>
                <strong>Neon Postgres with Drizzle.</strong> Serverless
                Postgres suits a workload that wakes up once a minute and
                sleeps otherwise, and the free tier covers it. Drizzle keeps
                every query typed against the schema.
              </li>
              <li>
                <strong>A tiny Netlify function as the clock.</strong>{" "}
                Vercel&apos;s free plan only allows daily cron jobs, and the
                engine needs to tick every minute during market hours. Rather
                than pay for an upgrade, a separate Netlify scheduled function
                calls the engine&apos;s tick endpoint every minute on weekdays,
                authenticated with a shared secret. Vercel Cron still handles
                the two daily jobs: re-ranking the stock universe and writing
                the journal.
              </li>
              <li>
                <strong>Alpaca&apos;s paper API and free IEX data.</strong>{" "}
                Real order types, real fills against live quotes, zero risk,
                zero cost. Once a week, before the open, the scan list is
                re-ranked to the 500 most actively traded stocks plus the top
                50 ETFs.
              </li>
              <li>
                <strong>Claude Haiku with Zod.</strong> The cheapest capable
                model is plenty for a bounded review task, and the same Zod
                library that validates the app&apos;s data also defines the
                reviewer&apos;s output schema.
              </li>
            </ul>
            <p>
              All in, the infrastructure costs nothing, and the AI costs one
              to three cents a day.
            </p>

            <h2>Every decision gets logged, not just the trades</h2>
            <p>
              Every completed trade becomes one row in Postgres with the full
              story: which rule fired, the parameters it was running with,
              the app version, the indicators at entry and exit, slippage, the
              best and worst points while the position was open, the return
              versus simply holding SPY, and Claude&apos;s verdict, confidence,
              and reason. Every signal that <em>didn&apos;t</em> become a
              trade, because a risk rule blocked it or Claude vetoed it, gets
              logged too.
            </p>
            <p>
              That second table is what makes the reviewer testable instead of
              decorative. The performance page compares how vetoed signals
              moved over the next three sessions against the approved ones, and
              checking whether Claude&apos;s confidence actually predicts
              anything is a one-line query against the trade log. A separate backtester replays each strategy&apos;s own
              entry and exit code against up to three years of daily bars, so
              a parameter change can be checked against history before it
              touches the live paper account. The backtester&apos;s known
              blind spots are written down, too: it leaves the reviewer out,
              and it uses today&apos;s symbol list for the whole period, which
              flatters the results.
            </p>

            <h2>Why this pattern is bigger than trading</h2>
            <p>
              Strip out the stock tickers and here&apos;s what&apos;s left: a
              repeated decision made by transparent rules, a cheap AI layer
              with a narrow mandate and veto power only, hard limits nothing
              can override, a fail-closed default, and a log of every decision,
              including the ones that didn&apos;t happen. That shape fits a lot
              of businesses that will never touch a brokerage account.
            </p>
            <ul>
              <li>
                <strong>Lead and dealer scoring.</strong> Rules rank prospects
                on fit and territory; AI only flags the ones whose reviews or
                news suggest the score is missing something.
              </li>
              <li>
                <strong>Purchase and expense approvals.</strong> Policy rules
                auto-approve the routine; AI reads the memo and flags anything
                that doesn&apos;t match the stated purpose, for a person to
                decide.
              </li>
              <li>
                <strong>Reorder and pricing rules.</strong> Thresholds trigger
                the reorder or the price change; AI checks for a known reason
                not to, like a supplier notice or a recall.
              </li>
              <li>
                <strong>Intake and compliance queues.</strong> Rules clear the
                easy cases; AI reads the edge cases and routes them to a
                person with a one-line reason attached.
              </li>
            </ul>
            <p>
              In each case the AI is cheap, bounded, and checkable. You can see
              exactly what it blocked and whether blocking it was right. That
              is a far easier thing to trust, and to hand to a team, than a
              model making the decision itself. It&apos;s the same approach
              behind{" "}
              <Link href="/blog/where-ai-pays-off">
                where AI does and doesn&apos;t pay off
              </Link>
              : start with a transparent rule, and let the logged outcomes tell
              you whether anything smarter is worth building.
            </p>
            <p>
              The live dashboard is public and read-only at{" "}
              <a
                href="https://rulebook-trader.36dunes.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                rulebook-trader.36dunes.com
              </a>
              . None of it is investment advice. It&apos;s a workbench.
            </p>

            <blockquote>
              Let the rules decide. Give AI one narrow job, the power to say
              no, and a log that shows whether it was right.
            </blockquote>
          </div>
        </section>

        <section className="band plain" id="related">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">RELATED</div>
                <h2>Same idea, different problem.</h2>
              </div>
            </div>
            <div className="article-callout">
              <p>
                Call List applies the same principle to sales prospecting: a
                transparent, ranked list with the reasoning attached to every
                row, instead of a black box.
              </p>
              <Link className="btn btn-ghost" href="/work/call-list">
                Read the case study →
              </Link>
            </div>
          </div>
        </section>

        <section className="band" id="contact">
          <div className="wrap contact-inner">
            <div className="eyebrow">START A PROJECT</div>
            <h2>Have a decision your team makes the same way every day?</h2>
            <p className="lede">
              Tell us what it is. We&apos;ll show you what the rules, the
              guardrails, and the review layer would look like before anything
              gets built.
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
