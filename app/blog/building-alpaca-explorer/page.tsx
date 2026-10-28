import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import FlowDiagram from "../../components/FlowDiagram";

export const metadata: Metadata = {
  title: "Building Alpaca Explorer: AI Market Research Chat — 36 Dunes",
  description:
    "A chat interface over live Alpaca market data, with Claude running a read-only tool-use loop instead of a wall of tickers. The architecture, the \"unusual options activity\" heuristic, and what I'd build next.",
  alternates: { canonical: "/blog/building-alpaca-explorer" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Building Alpaca Explorer: Asking the Market a Question Instead of Reading a Dashboard",
  image: "https://36dunes.com/blog/building-alpaca-explorer/hero.jpg",
  author: { "@type": "Organization", name: "36 Dunes" },
  publisher: { "@type": "Organization", name: "36 Dunes" },
  datePublished: "2026-10-04",
  mainEntityOfPage: "https://36dunes.com/blog/building-alpaca-explorer",
};

export default function BuildingAlpacaExplorerPost() {
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
                <h1>Building Alpaca Explorer: Asking the Market a Question Instead of Reading a Dashboard</h1>
                <p className="lede">
                  A chat interface over live Alpaca market data, with Claude
                  running a read-only tool-use loop instead of a wall of
                  tickers. The architecture, the &quot;unusual options
                  activity&quot; heuristic, and what I&apos;d build next.
                </p>
                <div className="article-meta">
                  <span>October 4, 2026</span>
                  <span>7 min read</span>
                  <span>Agentic AI</span>
                </div>
              </div>
              <Image
                className="post-title-image"
                src="/blog/building-alpaca-explorer/thumb.jpg"
                alt="Gold candlestick chart cresting into a network of connected nodes on a dark navy background"
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
              Most retail market tools are dashboards: screeners, a dozen
              preset filters, a chart you have to know how to read. I wanted
              something closer to how I actually think about the market —
              ask a specific question, in plain English, and get back the
              answer plus the data behind it. &quot;Give me unusual call
              activity in the top traded stocks.&quot; &quot;How&apos;s my
              watchlist doing, chart the moves.&quot; &quot;Which of
              today&apos;s biggest gainers have heavy put buying?&quot;
            </p>
            <p>
              That&apos;s Alpaca Explorer: a chat UI backed by Claude running
              a tool-use loop over Alpaca&apos;s market-data API. One
              constraint shaped everything else — it&apos;s read-only. Claude
              can look at snapshots, bars, options chains, and news. It
              cannot place an order. The agent has no tool that touches the
              trading endpoints at all, so there&apos;s no prompt-injection
              or bad-judgment path that ends in a trade I didn&apos;t make.
            </p>

            <h2>The shape of it: a chat UI and an agent that narrates itself</h2>
            <p>
              The frontend is a Next.js chat interface; the backend is a
              small Express API with one real route,{" "}
              <code>POST /api/ask</code>. That route doesn&apos;t wait for
              Claude to finish and hand back JSON — it opens a
              Server-Sent-Events stream and pushes events as they happen:
              text deltas as the answer is written, a{" "}
              <code>tool_call</code> event the moment Claude decides to check
              something, a <code>tool_result</code> event with timing (and
              the error, if it failed) when that call returns.
            </p>
            <p>
              The point of streaming the tool calls, not just the final
              text, is that the UI can show its work: a small step list
              that fills in live — &quot;get_most_active_stocks · 420ms&quot;,
              then &quot;scan_unusual_options · 1.8s&quot; — so a question
              that takes six or seven seconds doesn&apos;t feel like a
              frozen spinner. It also makes the agent debuggable from the
              browser console alone; I didn&apos;t need server log access to
              see why an answer was wrong, just the step list that produced
              it.
            </p>

            <h2>Eight read-only tools, one model, fifteen rounds of back-and-forth</h2>
            <p>
              The agent runs on Claude Opus 5 through the SDK&apos;s{" "}
              <code>toolRunner</code>, with eight tools wrapping specific
              Alpaca endpoints: most-active screeners, market movers, stock
              snapshots and bars, an options-flow scanner, a single-name
              option chain, news, and account/clock lookups so Claude knows
              whether it&apos;s looking at today&apos;s session or
              Friday&apos;s close. A ninth tool, <code>show_chart</code>,
              doesn&apos;t call Alpaca at all — it just hands a chart spec
              back to the UI, which renders it inline exactly where Claude
              called it, so a chart shows up mid-answer instead of bolted on
              at the end.
            </p>
            <p>
              A few settings in that call matter more than they look. The
              loop is capped at 15 tool round-trips, which is generous for
              research questions but still a hard ceiling against an agent
              that keeps rescanning instead of answering. Tool inputs stream
              as they&apos;re generated (<code>eager_input_streaming</code>)
              rather than arriving all at once, which is part of why the
              step list in the UI feels immediate instead of laggy.
              Thinking runs in adaptive mode, so Claude spends more of it on
              &quot;which 12 of these 20 most-active names are actually real
              equities, not leveraged ETFs&quot; and less on questions that
              don&apos;t need it. And the call opts into Anthropic&apos;s
              server-side fallback beta, so a safety decline on one model
              retries automatically on the recommended fallback instead of
              just failing the request.
            </p>
            <p>
              The system prompt does real work too, not just tone-setting.
              It tells Claude to resolve vague universes itself — &quot;top
              traded stocks&quot; means call{" "}
              <code>get_most_active_stocks</code>, then actually pick
              roughly 10–15 real names out of the result, skipping leveraged
              and inverse products unless asked — and to scan all chosen
              symbols in <em>one</em> options call rather than one call per
              symbol, which is the difference between a three-second answer
              and a twenty-second one.
            </p>

            <FlowDiagram
              label="Alpaca Explorer request flow"
              caption="The answer and the work behind it stream to the browser together."
              steps={[
                { label: "Question", detail: "Typed into the chat UI" },
                { label: "POST /api/ask", detail: "Opens a Server-Sent Events stream" },
                { label: "Tool loop", detail: "Claude with eight read-only Alpaca tools, 15 rounds max" },
                { label: "Live steps", detail: "Each tool call streams with its timing" },
                { label: "Answer", detail: "Text, with charts drawn inline" },
              ]}
            />

            <h2>Defining &quot;unusual&quot;: the options-flow heuristic</h2>
            <p>
              &quot;Unusual options activity&quot; isn&apos;t a field Alpaca
              returns — it&apos;s a rule I had to decide on. A contract
              counts as flagged when its day volume is at least 1.5x open
              interest, that volume is at least 500 contracts, the implied
              premium is at least $50,000, and it expires within 45 days.
              Same-day (0DTE) contracts are excluded by default, because
              their volume dwarfs open interest as a matter of course — that
              ratio is close to meaningless on expiration day itself.
            </p>
            <p>
              Premium isn&apos;t in the API response either; it&apos;s
              volume × VWAP × 100, which tracks what was actually paid
              across the day&apos;s trades better than volume × the last
              print does, since one stale quote shouldn&apos;t swing a
              $50K/$49K threshold. All of these thresholds are just
              defaults — they&apos;re parameters on the tool, and the system
              prompt tells Claude to loosen them and rescan when a search
              comes back empty rather than report a false negative as
              &quot;nothing unusual today.&quot;
            </p>

            <h2>Watchlist, saved prompts, and a 9:45am email</h2>
            <p>
              The watchlist bar under the header is just <code>localStorage</code>{" "}
              on the client, sent along with every question so &quot;how&apos;s
              my watchlist doing&quot; resolves without Claude asking what
              that means. Saved prompts work the same way — star a question
              after asking it, and it shows up on the start screen next
              time. Neither needed a database; the app has no accounts at
              all.
            </p>
            <p>
              There&apos;s also a standalone script,{" "}
              <code>report.js</code>, that runs the same agent once against
              a fixed prompt — unusual calls, unusual puts, watchlist,
              today&apos;s movers and the news behind them — and emails the
              result through Resend. On Render it&apos;s a cron job, and the
              scheduling has a small gotcha worth mentioning: Render cron
              expressions run in UTC, and 9:45am ET is either 13:45 or
              14:45 UTC depending on daylight saving, so the job is
              scheduled at <em>both</em> times and the script itself checks
              the current Eastern hour and exits immediately unless it&apos;s
              really 9am ET. Cheaper than maintaining two separate cron
              entries that get swapped twice a year, and it can&apos;t drift
              out of sync with itself.
            </p>

            <h2>What&apos;s actually working, and what I&apos;d change next</h2>
            <p>
              The part that works well: natural-language questions reliably
              turn into the right sequence of tool calls, the answers read
              like a person wrote them — a finding up top, a compact table,
              a couple of notes on what stands out — and Claude is honest
              about the data under it, unprompted, when the caveats matter
              (more on that below).
            </p>
            <p>The list of things I&apos;d improve, roughly in order:</p>
            <ul>
              <li>
                <strong>The free-tier data feed is the real ceiling.</strong>{" "}
                On Alpaca&apos;s free plan, stock data is IEX-only — a few
                percent of consolidated volume — and options run on the
                15-minute-delayed &quot;indicative&quot; feed. Claude already
                states this caveat when it&apos;s relevant, which is the
                honest short-term fix. The real fix is flipping{" "}
                <code>ALPACA_STOCK_FEED=sip</code> and{" "}
                <code>ALPACA_OPTIONS_FEED=opra</code> with an Algo Trader
                Plus subscription — the code already reads both env vars, I
                just haven&apos;t paid for the upgrade yet.
              </li>
              <li>
                <strong>There&apos;s no evaluation harness for the heuristic
                itself.</strong> I chose 1.5x volume/OI and $50K premium
                because they&apos;re reasonable starting points, not because
                I&apos;ve checked whether flagged contracts actually predict
                a move. The honest next step is logging every flag with a
                timestamp and checking forward returns a day and a week
                out — the same discipline I built into Cellar Index&apos;s
                feature set, applied to a rule instead of a model.
              </li>
              <li>
                <strong>History doesn&apos;t survive a refresh.</strong>{" "}
                Conversation history is capped to the last 10 turns and
                lives only in the browser tab that asked. There&apos;s no
                server-side session, so &quot;what did we find out
                yesterday&quot; doesn&apos;t work from a different device,
                or even the same device after closing the tab.
              </li>
              <li>
                <strong>Auth is one shared password, not accounts.</strong>{" "}
                <code>APP_PASSWORD</code> keeps a public Render URL from
                burning API credits on strangers, which is fine for a tool
                one person uses. It&apos;s not a real auth model, so this
                stays a personal tool rather than something I&apos;d hand to
                a client as-is.
              </li>
              <li>
                <strong>Charts are bar or line only.</strong> Price action
                sometimes wants a candlestick, and right now Claude narrates
                that in prose instead — a sentence doing a chart&apos;s job.
              </li>
              <li>
                <strong>No caching layer.</strong> Two people (or two
                browser tabs) asking about the same ticker inside a minute
                hit Alpaca twice. A short-lived cache in front of the
                snapshot and bars endpoints would cut real rate-limit risk
                for free.
              </li>
            </ul>
            <p>
              None of that is a knock on the thing as it stands today — it
              answers real questions correctly, fast, and tells me what it
              doesn&apos;t know. It&apos;s just not a public product the way
              Cellar Index is; it&apos;s a personal research tool running on
              Render&apos;s free tier, gated behind a password because every
              question it answers costs real API credits.
            </p>

            <blockquote>
              The best thing a tool like this can say is &quot;here&apos;s
              what I found, and here&apos;s why you shouldn&apos;t fully
              trust the feed it came from.&quot;
            </blockquote>
          </div>
        </section>

        <section className="band" id="contact">
          <div className="wrap contact-inner">
            <div className="eyebrow">START A PROJECT</div>
            <h2>Have live data you&apos;d rather question than dashboard-ize?</h2>
            <p className="lede">
              Tell us what you&apos;re staring at. We&apos;ll tell you
              honestly whether an agent over it is the right call, or just
              the trendy one.
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
