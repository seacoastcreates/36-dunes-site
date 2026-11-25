import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import PostLeadOffers from "../../components/PostLeadOffers";

export const metadata: Metadata = {
  title: "Thanksgiving Travel by the Numbers, and Which Models Can Predict It — 36 Dunes",
  description:
    "81.5 million travelers, the priciest Thanksgiving airfare in a decade, and the airports most likely to delay you. Plus an engineer's look at which predictive models actually work for holiday crowds, flight delays, and fares.",
  alternates: { canonical: "/blog/thanksgiving-travel-by-the-numbers" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Thanksgiving Travel by the Numbers, and Which Models Can Predict It",
  image: "https://36dunes.com/blog/thanksgiving-travel-by-the-numbers/thumb.jpg",
  author: { "@type": "Organization", name: "36 Dunes" },
  publisher: { "@type": "Organization", name: "36 Dunes" },
  datePublished: "2026-11-25",
  mainEntityOfPage: "https://36dunes.com/blog/thanksgiving-travel-by-the-numbers",
};

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function ThanksgivingTravelPost() {
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
                <div className="eyebrow">DATA NOTES</div>
                <h1>Thanksgiving Travel by the Numbers, and Which Models Can Predict It</h1>
                <p className="lede">
                  81.5 million travelers, the priciest Thanksgiving airfare
                  in a decade, and the airports most likely to delay you.
                  Plus an engineer&apos;s look at which predictive models
                  actually work for holiday crowds, flight delays, and
                  fares.
                </p>
                <div className="article-meta">
                  <span>November 25, 2026</span>
                  <span>8 min read</span>
                  <span>Predictive models</span>
                </div>
              </div>
              <Image
                className="post-title-image"
                src="/blog/thanksgiving-travel-by-the-numbers/thumb.jpg"
                alt="A gold-line bar chart of the seven days of Thanksgiving week on a dark background, with Thursday the shortest bar and Sunday the tallest, and a dashed flight path arcing over the bars to a small airplane"
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
              Thanksgiving is the most predictable travel event in America.
              Same Thursday, same Wednesday rush, same Sunday scramble home.
              That makes it a good test of a question we get asked a lot in
              other forms: how far can a model really see ahead? The answer
              is different for crowds, for delays, and for prices, and the
              reasons carry over to almost any forecasting problem a
              business has.
            </p>
            <p>
              First the numbers for this year, then the airports, then the
              models.
            </p>

            <h2>This year in numbers</h2>
            <ul>
              <li>
                <strong>81.5 million travelers.</strong> AAA expects that
                many Americans to go 50 miles or more between Tuesday,
                November 24 and Monday, November 30. That is down 0.1% from
                last year and ends a three-year run of record Thanksgivings.
              </li>
              <li>
                <strong>Nearly nine in ten are driving.</strong> 72.9
                million by car, down from 73.1 million. 5.96 million on
                domestic flights, down 0.2%. About 2.6 million by bus,
                train, or cruise, up 4.1%.
              </li>
              <li>
                <strong>17.6 million airport screenings.</strong> That is
                TSA&apos;s forecast for the same seven days, with more than
                3 million on Sunday, November 29 alone.
              </li>
              <li>
                <strong>More than 417,000 flights.</strong> The FAA&apos;s
                nine-day forecast, reported as the busiest Thanksgiving
                stretch in 16 years. Tuesday was the peak for flights, at
                52,345.
              </li>
              <li>
                <strong>Cost is the story.</strong> AAA&apos;s booking data
                puts the average domestic round trip at $800, up 17% from
                last Thanksgiving. Hopper, measuring a different mix of
                tickets, has been reported at about $402, up 31% and the
                highest in ten years. The two averages disagree on the
                dollars and agree on the direction.
              </li>
              <li>
                <strong>Gas is $3.87 a gallon nationally.</strong> The
                previous Thanksgiving Day record was $3.58, set in 2022.
                AAA says gas hit record monthly highs in August, September,
                and October.
              </li>
            </ul>
            <p>
              Notice what happened there. Fewer people are flying, more
              flights are scheduled, and the people who do fly are paying a
              lot more. AAA and TSA also count different things (trips of 50
              miles versus bodies through a checkpoint), which is why AAA
              itself says not to compare the two.
            </p>

            <h2>The airports most likely to delay you</h2>
            <p>
              The cleanest ranking we found uses three Thanksgiving weeks of
              federal on-time data (2023 through 2025) for the 20 busiest
              U.S. airports. The number is the share of departures that left
              15 or more minutes late during Thanksgiving week.
            </p>
            <ol>
              <li><strong>Chicago O&apos;Hare</strong>: 30.3%</li>
              <li><strong>Detroit</strong>: 29.0%</li>
              <li><strong>Dallas/Fort Worth</strong>: 24.6%</li>
              <li><strong>Minneapolis-St. Paul</strong>: 24.6%</li>
              <li><strong>Miami</strong>: 22.5%</li>
              <li><strong>Charlotte</strong>: 22.3%</li>
              <li><strong>Denver</strong>: 21.8%</li>
              <li><strong>Washington Reagan</strong>: 21.4%</li>
              <li><strong>Orlando</strong>: 20.9%</li>
              <li><strong>New York JFK</strong>: 20.7%</li>
            </ol>
            <p>
              Newark (20.6%), Atlanta (19.8%), and Boston Logan (19.2%) sit
              just outside the top ten. The best of the big airports were
              Las Vegas (15.3%) and Los Angeles (15.4%), and Salt Lake City
              was lower still at 14.7%.
            </p>
            <p>
              A second analysis looked only at last year&apos;s holiday
              (November 22 to December 1, 2025) across the 50 busiest
              airports, and counted cancellations and diversions too.
              O&apos;Hare was worst again at 40.9% of departures disrupted,
              with more than one in ten canceled. Dallas-Fort Worth followed
              at 38.3%, then Dallas Love Field (34.3%), St. Louis (34.2%),
              and Chicago Midway (31.7%). Honolulu (12.7%) and Salt Lake
              City (15.4%) were the most reliable.
            </p>
            <p>
              O&apos;Hare leads both lists for a structural reason. It is a
              connecting hub for two large airlines, in a place where late
              November weather is bad. Both of those are things a model can
              know months in advance.
            </p>

            <h3>The day and the hour matter more than the airport</h3>
            <ul>
              <li>
                <strong>Thanksgiving Day is the calmest day to fly.</strong>{" "}
                Only 6.8% of flights left late nationally across those three
                years.
              </li>
              <li>
                <strong>The Sunday after is the worst.</strong> 32.8% late
                nationally. Evening departures that Sunday ran 43.2% late.
                Morning departures ran 20.1%.
              </li>
              <li>
                <strong>Early flights win.</strong> In last year&apos;s
                data, 12.3% of 6 a.m. departures were disrupted, against
                41.4% of 10 p.m. departures.
              </li>
              <li>
                <strong>Most delays are inherited.</strong> A
                late-arriving aircraft was the leading cause of delay at 42
                of the 50 airports. Your plane was late somewhere else
                first.
              </li>
            </ul>
            <p>
              Put together: a 7 a.m. Sunday flight out of O&apos;Hare can be
              a better bet than a 7 p.m. Sunday flight out of almost
              anywhere.
            </p>

            <h3>On the road</h3>
            <p>
              INRIX, the traffic data firm AAA works with, expected the
              worst outbound congestion Tuesday from 2 to 8 p.m. and
              Wednesday from noon to 7 p.m. For the trip home, the windows
              to avoid are Saturday noon to 9 p.m., Sunday noon to 8 p.m.,
              and Monday 2 to 7 p.m. Leaving before 11 a.m. on the weekend
              is the consistent advice. New York, Washington, Los Angeles,
              and Boston were forecast to see more than double their normal
              congestion at peak. For those of us in northern New England:
              I-95 north from Boston toward Portsmouth was flagged for about
              double the usual travel time on Monday afternoon.
            </p>

            <h3>This week&apos;s wildcards</h3>
            <p>
              Forecasters have been tracking storms on both coasts, with
              wind and rain expected in the Northeast around the holiday.
              And on November 13 a telecommunications failure led the FAA to
              stop departures nationwide for close to four hours. Neither
              was in anyone&apos;s forecast a month ago, which is the right
              setup for the next section.
            </p>

            <h2>Which predictive models actually work</h2>
            <p>
              Holiday travel is really three prediction problems. They get
              harder in this order.
            </p>

            <h3>1. How many people will travel: easy, and the simple model wins</h3>
            <p>
              Demand is driven by the calendar. The holiday is the same
              Thursday every year, and what people did last Thanksgiving is
              an excellent guess at what they will do this one. A seasonal
              baseline (last year&apos;s number, adjusted for the economy,
              fuel prices, and airline schedules) is hard to beat. This
              year&apos;s headline change was 0.1%. If your fancy model
              cannot beat &quot;same as last year&quot; by more than that,
              it is not earning its keep.
            </p>
            <p>
              The lesson we take from this: always build the dumb baseline
              first. A surprising share of forecasting projects never beat
              it.
            </p>

            <h3>2. Whether your flight will be late: tree models, with the right inputs</h3>
            <p>
              The published research on delay prediction mostly uses the
              same public federal data as the rankings above, and it mostly
              reaches the same conclusion. Gradient-boosted trees and random
              forests come out on top, trading first place from study to
              study. Reported accuracy runs from about 80% to the low 90s.
            </p>
            <p>Two cautions before anyone gets excited about those numbers.</p>
            <ul>
              <li>
                <strong>Accuracy flatters.</strong> If roughly three in four
                flights leave on time, a model that always says &quot;on
                time&quot; scores about 75% while being useless. One study
                reported 79.7% as its best result. Ask what the model does
                on the flights that were actually late.
              </li>
              <li>
                <strong>The inputs matter more than the algorithm.</strong>{" "}
                The features that carry the signal are hour of day, the
                airport, the airline, the weather, and above all where the
                aircraft was on its previous leg. One study that added
                measures of each airport&apos;s position in the route
                network pushed a random forest to 86.2%. That matches the
                cause data: delays spread through the network.
              </li>
            </ul>
            <p>
              The horizon also sets a hard limit. A month out, the best
              anyone can honestly give you is a base rate: this airport, this
              day, this hour, about 30% late. That is what the rankings
              above are. On the day itself, once the inbound aircraft and
              the weather are known, a model can do much better. No model
              predicts an equipment failure at the FAA.
            </p>

            <h3>3. What the fare will do: hardest, because the other side has a model too</h3>
            <p>
              Fare prediction is a different kind of problem. Airlines set
              prices with their own revenue management systems, which react
              to bookings, competitors, and fuel. So you are not predicting
              nature. You are predicting another model that changes when
              conditions change.
            </p>
            <p>What holds up:</p>
            <ul>
              <li>
                <strong>Predicting &quot;buy or wait,&quot; not the
                price.</strong> The consumer tools that work frame it as a
                yes/no call. Hopper claims 95% accuracy on that call. The
                figure is the company&apos;s own and has not been
                independently verified, so treat it as marketing until shown
                otherwise.
              </li>
              <li>
                <strong>Comparing to history.</strong> Google Flights labels
                a fare low, typical, or high against past prices for similar
                trips. It is a modest claim, and modest claims age well.
                Google&apos;s data puts the usual domestic low point at
                about 39 days before departure. Kayak puts the Thanksgiving
                low at about five weeks out, around October 19 this year.
              </li>
              <li>
                <strong>No algorithm reliably wins.</strong> Across the
                academic papers we read, random forests won one, XGBoost
                another, and recurrent neural networks (LSTM and GRU) two
                more. When the winner changes with every dataset, the
                dataset is doing the work.
              </li>
            </ul>
            <p>
              And then a year like this one arrives. Every fare model is
              trained on past seasons. When fuel costs jump and fares rise
              17% to 31% in a year, &quot;low compared to history&quot;
              stops meaning much, and a model that waits for last
              year&apos;s price waits forever. Models built on history fail
              in the years when history stops being a guide, and those are
              the years the prediction matters most.
            </p>

            <h2>The short version, for travelers</h2>
            <ul>
              <li>
                Flying Thursday morning and coming home Monday or Tuesday is
                the most reliable pattern and among the cheapest. Sunday
                is the priciest and most delayed day to return.
              </li>
              <li>Take the first flight of the day. Delays build as the day goes on.</li>
              <li>
                If you must connect, avoid doing it through O&apos;Hare or
                Detroit on Sunday evening.
              </li>
              <li>Next year, book about five weeks ahead and set a price alert rather than guessing.</li>
              <li>Driving home, leave before 11 a.m.</li>
            </ul>

            <h2>The short version, for anyone building a forecast</h2>
            <ul>
              <li>Build the &quot;same as last time&quot; baseline first and make the model beat it.</li>
              <li>Spend the effort on inputs. The previous-leg feature beats a better algorithm.</li>
              <li>Say how far ahead the forecast is good for, and give a base rate past that point.</li>
              <li>Watch for the year the pattern breaks. Have a person look when the inputs leave their normal range.</li>
            </ul>
            <p>
              Safe travels, and happy Thanksgiving.
            </p>

            <blockquote>
              If the model cannot beat &quot;same as last year,&quot; it is
              not earning its keep.
            </blockquote>

            <h2>Sources</h2>
            <ul>
              <li>
                <Ext href="https://newsroom.acg.aaa.com/sc-aaa-815-million-americans-expected-to-travel-for-thanksgiving/">
                  AAA Thanksgiving 2026 travel forecast
                </Ext>{" "}
                (traveler counts, costs, gas prices, INRIX drive times)
              </li>
              <li>
                <Ext href="https://www.dhs.gov/news/2026/11/24/tsa-ready-thanksgiving-passenger-volumes-urges-travelers-plan-ahead">
                  TSA Thanksgiving passenger forecast
                </Ext>
              </li>
              <li>
                <Ext href="https://indexbox.io/blog/tsa-projects-nearly-18-million-thanksgiving-air-travelers-as-faa-forecasts-busiest-holiday-skies-in-16-years">
                  FAA flight forecast and the November 13 ground stop
                </Ext>{" "}
                (as reported by IndexBox)
              </li>
              <li>
                <Ext href="https://www.delayguard.ai/blog/thanksgiving-2026-airports-to-avoid">
                  DelayGuard analysis of Bureau of Transportation Statistics
                  on-time data, 2023 to 2025
                </Ext>
              </li>
              <li>
                <Ext href="https://www.kotatv.com/2026/11/24/study-ranks-major-airports-most-likely-face-thanksgiving-flight-delays/">
                  Study of last year&apos;s holiday flights at the 50
                  busiest airports
                </Ext>{" "}
                (as reported by KOTA)
              </li>
              <li>
                <Ext href="https://www.forbes.com/sites/jillschildhouse/2026/10/12/holiday-airfare-is-at-a-10-year-high-heres-how-travelers-can-still-save/">
                  Forbes on Hopper&apos;s holiday airfare index
                </Ext>
              </li>
              <li>
                <Ext href="https://blog.google/products-and-platforms/products/search/holiday-travel-trends-2026/">
                  Google Flights holiday travel trends
                </Ext>
              </li>
              <li>
                <Ext href="https://weather.com/2026/11/25/holiday/thanksgiving/thanksgiving-travel-weather-forecast-us-storms">
                  Weather.com Thanksgiving travel forecast
                </Ext>
              </li>
              <li>
                Delay prediction research:{" "}
                <Ext href="https://www.researchgate.net/publication/352288281_Flight_Delay_Prediction_Using_Gradient_Boosting_Machine_Learning_Classifiers">
                  gradient boosting classifiers
                </Ext>
                ,{" "}
                <Ext href="https://doi.org/10.3390/info15090559">
                  network centrality measures
                </Ext>
              </li>
              <li>
                Fare prediction research:{" "}
                <Ext href="https://dl.acm.org/doi/10.1145/3762249.3762264">
                  machine learning model comparison
                </Ext>
                ,{" "}
                <Ext href="https://www.mdpi.com/2076-3417/13/10/6032">
                  GRU fare forecasting
                </Ext>
              </li>
            </ul>
          </div>
        </section>

        <section className="band plain" id="related">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">RELATED</div>
                <h2>Choosing the model is the smaller decision.</h2>
              </div>
            </div>
            <div className="article-callout">
              <p>
                The same trade-off shows up in business forecasting and
                scoring work: a simple, explainable model with the right
                inputs usually beats a sophisticated one without them.
                Here&apos;s how we decide between a custom model and an
                off-the-shelf API.
              </p>
              <Link className="btn btn-ghost" href="/blog/custom-model-vs-api">
                Read: custom model vs. API →
              </Link>
            </div>
          </div>
        </section>

        <PostLeadOffers />

        <section className="band" id="contact">
          <div className="wrap contact-inner">
            <div className="eyebrow">START A PROJECT</div>
            <h2>Have something you wish you could see coming?</h2>
            <p className="lede">
              Demand, delays, churn, who to call next. Tell us what
              you&apos;re trying to predict and what data you have.
              We&apos;ll tell you honestly how far ahead a model can see,
              and whether a simple baseline already gets you there.
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
