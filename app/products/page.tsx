import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import CallListForm from "../components/CallListForm";
import FlowDiagram from "../components/FlowDiagram";
import { products } from "../../lib/products";

export const metadata: Metadata = {
  title: "Products: Prospect Radar — 36 Dunes",
  description:
    "Prospect Radar researches every business in your territory, ranks each one by how likely it is to buy what you sell, and hands your team a call brief and a shared call log.",
  alternates: { canonical: "/products" },
};

const builds = [
  {
    id: "docks",
    eyebrow: "DOCK BUYERS · NH, MAINE & NORTH-CENTRAL MA LAKES",
    name: "A New Hampshire dock dealer",
    sells: "Aluminum and floating dock systems, southern New Hampshire",
    who: "Marinas, yacht clubs, summer camps, lake associations, town beaches and waterfront resorts that buy docks, floats, swim platforms and kayak launches. No private homeowners, no ocean coast.",
    researched: "878",
    kept: "696",
    tierA: "139",
    withEmail: "358",
    signal: "Aging or damaged docks, ice and storm damage, slip waitlists, expansions",
    image: "/products/prospect-radar/dock-overview.jpg",
    width: 1760,
    height: 1272,
    alt: "The dock dealer's Prospect Radar dashboard, client name blurred: 696 prospects, 139 Tier A, 579 with phone, 358 with email, 251 named contacts, with filters for region, type, dock condition and kayak launch fit",
    label: "Dock buyer call list",
  },
  {
    id: "electronics",
    eyebrow: "ELECTRONIC COMPONENT BUYERS · NH, MAINE & NORTHERN MA",
    name: "A Seacoast electronic component broker",
    sells: "Independent electronic component broker, New Hampshire Seacoast",
    who: "Contract manufacturers, board and cable assemblers and electronics OEMs that need shortage, obsolete and hard-to-find parts, with excess-inventory sources tagged separately.",
    researched: "1,110",
    kept: "472",
    tierA: "94",
    withEmail: "249",
    signal: "Legacy and obsolete part demand, surplus stock, purchasing hires",
    image: "/products/prospect-radar/electronics-overview.jpg",
    width: 1760,
    height: 1320,
    alt: "The component broker's Prospect Radar dashboard, client name and logo blurred: 472 prospects, 94 Tier A, 461 with phone, 249 with email, 113 named contacts, 38 excess-inventory leads",
    label: "Component buyer call list",
  },
];

const weights = [
  { label: "AI-judged buyer fit", detail: "Does this business actually buy what the dealer sells?", pct: 35 },
  { label: "Waterfront and dock scale", detail: "Slips, jet docks, swim floats, launches, rentals", pct: 25 },
  { label: "Condition and timing", detail: "Aging or damaged docks, ice damage, rebuilds, expansion", pct: 15 },
  { label: "Size", detail: "Large and mid-size operations first", pct: 10 },
  { label: "Distance", detail: "Closer to the dealer's shop ranks higher", pct: 10 },
  { label: "Reachability", detail: "A real email and a named decision maker", pct: 5 },
];

const features = [
  {
    title: "Ranked, not just listed",
    body: "Every business gets a priority score and a tier, so the first call of the day goes to the best fit in the territory, not the next name in the alphabet.",
  },
  {
    title: "Why it fits, in one paragraph",
    body: "Each lead says what the business runs or builds and why that makes it a buyer, with the timing signals that suggest now is the right moment.",
  },
  {
    title: "A call brief with the pitch written",
    body: "A suggested opening tied to that business, talking points, the objections you're likely to hear and how the buying decision gets made.",
  },
  {
    title: "Who to ask for",
    body: "Named contacts only when the business's own site names them with a role. Otherwise, the role to ask for, so nobody invents a name.",
  },
  {
    title: "A shared call log",
    body: "One tap logs the outcome, a note and a call-back date. Outcomes fit the industry, and the whole team sees every call within a minute.",
  },
  {
    title: "Map, filters and export",
    body: "Plan a day of visits on the map, filter by region, type, tier or signal, group multi-location companies, and export to CSV for your CRM.",
  },
];

const quality = [
  {
    title: "Sourced from the business itself",
    body: "Contact details come from the Google listing and the organization's own website. Every email on both lists was found on that organization's own site, not bought from a data broker.",
  },
  {
    title: "Read, not keyword-matched",
    body: "AI reads each website and its reviews the way a researcher would, then judges fit against your actual product. A marina with 80 slips and a jet-dock waitlist ranks above one with a single launch ramp.",
  },
  {
    title: "Filtered hard",
    body: "Of 1,110 electronics companies researched for the component broker, 472 made the list. Chains, retailers, competitors and businesses that don't buy what you sell are removed or set aside with the reason why.",
  },
  {
    title: "A reason to call, not just a number",
    body: "Timing signals such as storm-damaged docks, legacy-part demand or a new purchasing hire turn a cold call into a relevant one.",
  },
  {
    title: "Built for your territory",
    body: "Search terms and anchor towns are set for your market, and distance from your shop is part of the score, so the list covers the ground you can actually serve.",
  },
  {
    title: "Honest about its limits",
    body: "Scores show relative fit, not purchase probability. Every list ships with a sources-and-accuracy page that says where each field came from and what to confirm on the call.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="plain page-intro products-intro">
          <div className="wrap">
            <div className="eyebrow">PRODUCTS</div>
            <h1>Tools we build once and run for you.</h1>
            <p className="lede">
              Our consulting work turned into products: the same research
              and AI pipelines, packaged so you get the result without
              commissioning a project.
            </p>
            <nav className="product-index" aria-label="Products">
              {products.map((product) => (
                <a key={product.slug} className="product-chip" href={`#${product.slug}`}>
                  <span className="product-chip-eyebrow">{product.eyebrow}</span>
                  <span className="product-chip-name">{product.name}</span>
                  <span className="product-chip-desc">{product.shortDescription}</span>
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* ---------- Prospect Radar ---------- */}
        <section className="band product-hero" id="prospect-radar">
          <div className="wrap">
            <div className="product-hero-grid">
              <div>
                <div className="eyebrow">PROSPECT RADAR · SALES PROSPECTING</div>
                <h2>Know who to call next, and what to say when they answer.</h2>
                <p className="lede">
                  Prospect Radar researches every business in your territory,
                  ranks each one by how likely it is to buy what you sell, and
                  gives your team a dashboard with a call brief for every lead
                  and a shared log of every call.
                </p>
                <div className="contact-actions">
                  <a className="btn btn-primary" href="#get-a-sample">
                    Request a sample for your market
                  </a>
                  <a className="btn btn-ghost" href="#how-leads-are-made">
                    How the leads are made
                  </a>
                </div>
              </div>
              <dl className="product-stats">
                <div>
                  <dt>Businesses researched</dt>
                  <dd>1,988</dd>
                </div>
                <div>
                  <dt>Kept as prospects</dt>
                  <dd>1,168</dd>
                </div>
                <div>
                  <dt>Tier A leads</dt>
                  <dd>233</dd>
                </div>
                <div>
                  <dt>Time to a first list</dt>
                  <dd>Days</dd>
                </div>
              </dl>
            </div>
            <p className="product-stats-note">
              Totals across the two lists shown below, built in October 2026.
            </p>
            <figure className="browser-frame product-hero-shot">
              <div className="browser-bar" aria-hidden="true">
                <span />
                <span />
                <span />
                <code>Dock buyer call list</code>
              </div>
              <Image
                src="/products/prospect-radar/dock-card.jpg"
                alt="A Prospect Radar lead card for Akwa Marina Yacht Club on Lake Winnipesaukee: Tier A, priority 68, 80 slips, swim area, kayak launch fit, phone numbers and a Why it fits summary"
                width={2176}
                height={1164}
                priority
                sizes="(max-width: 1120px) 100vw, 1072px"
              />
            </figure>
          </div>
        </section>

        {/* ---------- Two real builds ---------- */}
        <section className="plain" id="examples">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">TWO LISTS, TWO VERY DIFFERENT MARKETS</div>
                <h2>Docks on the lakes. Chips on the Seacoast.</h2>
              </div>
              <p>
                Same pipeline, completely different buyers. Both lists were
                built in October 2026 for New Hampshire businesses, shown here
                with the client names blurred.
              </p>
            </div>

            {builds.map((b) => (
              <article className="build-card" key={b.id}>
                <figure className="browser-frame">
                  <div className="browser-bar" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <code>{b.label}</code>
                  </div>
                  <Image
                    src={b.image}
                    alt={b.alt}
                    width={b.width}
                    height={b.height}
                    sizes="(max-width: 900px) 100vw, 640px"
                  />
                </figure>
                <div className="build-body">
                  <div className="eyebrow">{b.eyebrow}</div>
                  <h3>{b.name}</h3>
                  <p className="build-sells">{b.sells}</p>
                  <p>{b.who}</p>
                  <dl className="build-funnel">
                    <div>
                      <dt>Researched</dt>
                      <dd>{b.researched}</dd>
                    </div>
                    <div>
                      <dt>Prospects</dt>
                      <dd>{b.kept}</dd>
                    </div>
                    <div>
                      <dt>Tier A</dt>
                      <dd>{b.tierA}</dd>
                    </div>
                    <div>
                      <dt>With email</dt>
                      <dd>{b.withEmail}</dd>
                    </div>
                  </dl>
                  <p className="build-signal">
                    <span>Timing signals tracked</span>
                    {b.signal}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- Features ---------- */}
        <section className="plain product-features" id="features">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">WHAT YOUR TEAM GETS</div>
                <h2>A dashboard built for the person making the calls.</h2>
              </div>
              <p>
                Not a spreadsheet export. A working tool your reps open in the
                morning and log calls in all day.
              </p>
            </div>

            <div className="feature-split">
              <div>
                <div className="eyebrow">THE CALL BRIEF AND PITCH</div>
                <h3>Prepared for the call before you dial.</h3>
                <p>
                  Open any lead and the research is already done: what the
                  business makes, why it needs you, a suggested opening line
                  written for that specific business, talking points, the
                  objections you&apos;ll probably hear, and who decides.
                </p>
                <p>
                  On the electronics list, the brief for a nearby rectifier
                  maker notes it publishes cross-references for
                  discontinued lines and is hiring for purchasing, and opens
                  with that. On the dock list, a marina with a jet-dock waitlist gets an
                  opener about adding capacity a section at a time.
                </p>
                <ul className="feature-ticks">
                  <li>Suggested opening, tied to the business</li>
                  <li>Talking points and likely objections</li>
                  <li>Buying process, including public bids</li>
                  <li>Who to ask for, sourced from their own site</li>
                </ul>
              </div>
              <figure className="browser-frame feature-shot-tall">
                <div className="browser-bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <code>Component buyer call list</code>
                </div>
                <Image
                  src="/products/prospect-radar/electronics-brief.jpg"
                  alt="An open call brief for PD&E Electronics: why it fits, legacy and obsolete-part demand, excess inventory angle, summary, suggested opening, talking points, builds, industries, objections and supplier rules. Named contacts are blurred."
                  width={2176}
                  height={2780}
                  sizes="(max-width: 900px) 100vw, 560px"
                />
                <figcaption>Client name and named contacts blurred.</figcaption>
              </figure>
            </div>

            <div className="feature-split feature-split-flip">
              <div>
                <div className="eyebrow">THE CALL LOG</div>
                <h3>Every call logged in two taps, shared with the team.</h3>
                <p>
                  Pick the outcome, add a note and a call-back date, and
                  press Log call. The outcomes match how your industry
                  actually sells: the dock list has &quot;Send EZ Dock
                  info&quot;, &quot;Site visit booked&quot; and &quot;Watch
                  for bid / RFP&quot; because town beaches buy by bid.
                </p>
                <p>
                  Logs sync across everyone using the list and refresh every
                  minute, so two reps never call the same marina on the same
                  morning. Closed leads fade out, and a status filter pulls up
                  everything not called yet or waiting on a follow-up.
                </p>
              </div>
              <figure className="browser-frame">
                <div className="browser-bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <code>Dock buyer call list</code>
                </div>
                <Image
                  src="/products/prospect-radar/dock-call-log.jpg"
                  alt="The Log activity panel: outcome buttons from No answer to Won / ordered, a note field, a call-back date, a Log call button and the logged entry below"
                  width={1102}
                  height={686}
                  sizes="(max-width: 900px) 100vw, 480px"
                />
                <figcaption>Example entry, not a real call.</figcaption>
              </figure>
            </div>

            <div className="feature-split">
              <div>
                <div className="eyebrow">THE MAP</div>
                <h3>Plan a day on the road, not just on the phone.</h3>
                <p>
                  Every lead is pinned and colored by tier. Zoom into a lake or
                  an industrial park and see which prospects are worth a stop
                  on the way to a job you already have.
                </p>
              </div>
              <figure className="browser-frame">
                <div className="browser-bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <code>Dock buyer call list</code>
                </div>
                <Image
                  src="/products/prospect-radar/dock-map.jpg"
                  alt="A map of Lake Winnipesaukee around Meredith with Prospect Radar leads pinned and colored by tier"
                  width={2176}
                  height={1122}
                  sizes="(max-width: 900px) 100vw, 560px"
                />
              </figure>
            </div>

            <div className="feature-grid">
              {features.map((f) => (
                <div className="feature-item" key={f.title}>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- How leads are made ---------- */}
        <section className="band" id="how-leads-are-made">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">HOW THE LEADS ARE MADE</div>
                <h2>Five steps from a territory to a ranked call list.</h2>
              </div>
              <p>
                The research a good rep would do on one prospect, done on every
                business in the territory before anyone picks up the phone.
              </p>
            </div>

            <FlowDiagram
              label="How Prospect Radar builds a list"
              steps={[
                {
                  label: "Sweep the territory",
                  detail: "Search terms for your buyers, run around dozens of anchor towns. The dock list: 10 terms × 33 lake towns.",
                },
                {
                  label: "Filter out the noise",
                  detail: "Drop closed, out-of-territory and wrong-type listings, national chains and your own business.",
                },
                {
                  label: "Read every website",
                  detail: "Crawl each site and its reviews, most relevant pages first: slips and beaches, or products and capabilities.",
                },
                {
                  label: "Write the brief",
                  detail: "AI judges fit against your product and writes the signals, opener, talking points and objections.",
                },
                {
                  label: "Score and rank",
                  detail: "Weighted score, tiers, competitors set aside, multi-location companies grouped.",
                },
              ]}
            />

            <div className="weights">
              <div>
                <h3>What goes into a score</h3>
                <p>
                  Weights are set for each product and market. These are
                  the dock dealer&apos;s. The component broker&apos;s list swaps
                  waterfront scale for exposure to obsolete parts and adds a signal for
                  surplus stock worth buying.
                </p>
                <p>
                  Penalties then apply: a town that buys by public bid is
                  marked and adjusted, a business with no phone is pushed
                  down, and anything that isn&apos;t really a buyer, including
                  competing dealers, is set aside with a written reason.
                </p>
              </div>
              <div className="chart-card weights-chart" role="img" aria-label="Dock dealer score weights: buyer fit 35%, waterfront scale 25%, condition and timing 15%, size 10%, distance 10%, reachability 5%">
                <div className="chart-title">Dock dealer · priority score weights</div>
                {weights.map((w) => (
                  <div className="bar-row" key={w.label}>
                    <div className="bar-label-row">
                      <span>{w.label}</span>
                      <span className="rate">{w.pct}%</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${(w.pct / 35) * 100}%` }} />
                    </div>
                    <div className="bar-meta">{w.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Why quality ---------- */}
        <section className="plain" id="why-quality">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">WHY THESE ARE HIGH-QUALITY LEADS</div>
                <h2>A bought list is stale the day it arrives. This one is researched.</h2>
              </div>
              <p>
                Lead databases sort businesses by industry code. Prospect
                Radar reads what each one actually does and asks whether it
                would buy from you.
              </p>
            </div>
            <div className="quality-grid">
              {quality.map((q, i) => (
                <div className="quality-item" key={q.title}>
                  <span className="step-index">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{q.title}</h3>
                  <p>{q.body}</p>
                </div>
              ))}
            </div>

            <div className="how-you-start">
              <div className="eyebrow">HOW IT STARTS</div>
              <ol>
                <li>
                  <strong>Tell us what you sell and where.</strong> Your product,
                  your best customers and the territory you can serve.
                </li>
                <li>
                  <strong>Get a preview.</strong> A dashboard with the leads
                  nearest you unlocked, so you can check the research against
                  businesses you know.
                </li>
                <li>
                  <strong>Unlock the full list.</strong> Every ranked lead, the
                  shared call log, and research refreshed as your market
                  changes.
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="band" id="get-a-sample">
          <div className="wrap contact-inner">
            <div className="eyebrow">GET A SAMPLE</div>
            <h2>See what Prospect Radar finds in your territory.</h2>
            <p className="lede">
              Tell us the industry and the region. We&apos;ll tell you honestly
              whether it&apos;s researchable at the quality shown above, and if
              it is, build you a sample.
            </p>
            <CallListForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
