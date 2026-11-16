import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import PostLeadOffers from "../../components/PostLeadOffers";
import FlowDiagram from "../../components/FlowDiagram";

export const metadata: Metadata = {
  title: "Selling the Work and Doing the Work: Notes From a One-Person Shop — 36 Dunes",
  description:
    "When you’re the one who sells and the one who delivers, the two jobs fight each other. Why selling keeps losing, and the small habits that keep it from slipping.",
  alternates: { canonical: "/blog/selling-and-doing-the-work" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Selling the Work and Doing the Work: Notes From a One-Person Shop",
  image: "https://36dunes.com/blog/selling-and-doing-the-work/thumb.jpg",
  author: { "@type": "Organization", name: "36 Dunes" },
  publisher: { "@type": "Organization", name: "36 Dunes" },
  datePublished: "2026-11-16",
  mainEntityOfPage: "https://36dunes.com/blog/selling-and-doing-the-work",
};

export default function SellingAndDoingTheWorkPost() {
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
                <div className="eyebrow">FIELD NOTES</div>
                <h1>Selling the Work and Doing the Work: Notes From a One-Person Shop</h1>
                <p className="lede">
                  When you’re the one who sells and the one who delivers, the
                  two jobs fight each other. Why selling keeps losing, and the
                  small habits that keep it from slipping.
                </p>
                <div className="article-meta">
                  <span>November 16, 2026</span>
                  <span>6 min read</span>
                  <span>Small business</span>
                </div>
              </div>
              <Image
                className="post-title-image"
                src="/blog/selling-and-doing-the-work/thumb.jpg"
                alt="A gold balance scale holding a wrench on one pan and a paper airplane on the other, with a calendar page behind it, on a deep rust-brown background"
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
              I like building things. Give me a messy pile of public data and
              a question, and I’ll happily disappear for a week. What I don’t
              naturally like is the other half of running a business: finding
              the people who need the thing, reaching out, following up, and
              talking about money.
            </p>
            <p>
              If you run a small business where you’re both the one who does
              the work and the one who sells it, you probably know the feeling.
              Contractors, shop owners, designers, dock builders, consultants.
              The work is the part you’re good at. The selling is the part that
              decides whether there’s any work next month.
            </p>
            <p>
              This isn’t a post from someone who has it figured out. It’s what
              I’ve noticed about why the two jobs fight, and the few habits
              that actually help.
            </p>

            <h2>Building feels like progress. Selling feels like waiting.</h2>
            <p>
              Here’s my confession. I’ve built more pitches than I’ve sent. I
              have finished prospect lists for companies I’d genuinely like to
              work with, with the research done and a preview page live, sitting
              there waiting on an email I hadn’t written yet.
            </p>
            <p>
              That isn’t laziness. Building is under my control. I can make the
              list better today and see that it’s better. Sending the email puts
              the outcome in someone else’s hands, and the answer might be
              silence. So there’s always one more thing to polish first.
            </p>
            <p>
              I suspect a lot of owners do a version of this. The estimate gets
              redone, the website gets one more pass, the brochure gets
              reprinted, and the phone calls wait.
            </p>

            <h2>Why the two jobs fight</h2>
            <p>
              <strong>They need different brains.</strong> The work wants long,
              uninterrupted stretches. Selling is short and scattered: a call
              here, a follow-up there, a reply that comes in while you’re in
              the middle of something. Switching between the two costs more
              than either one.
            </p>
            <p>
              <strong>The feedback runs on different clocks.</strong> Work pays
              you back the same day. You fix the thing and it’s fixed. Selling
              pays you back in weeks, if it does at all. Our brains pick the
              thing with the faster reward every time.
            </p>
            <p>
              <strong>Busy kills the pipeline.</strong> This is the one that
              hurts. When the work is flowing, selling feels unnecessary, so it
              stops. Then the project ends, and there’s nothing lined up behind
              it. Now you’re selling from a place of need, which is the worst
              place to sell from. Feast, then famine, then repeat.
            </p>

            <h2>What actually helps</h2>

            <h3>1. Pick prospects your work actually helps.</h3>
            <p>
              The fastest way to waste selling time is pitching someone whose
              problem you don’t solve. I learned this researching a small
              manufacturer I really liked. Great product, clear growth story.
              Then it turned out their production was already maxed out. More
              leads wouldn’t have helped them at all; they couldn’t build any
              more units. So now I ask one question before anything else:
              does what I do directly fix the problem they say they have? If
              not, I move on, no matter how much I like them.
            </p>

            <h3>2. Put selling on the calendar like a job.</h3>
            <p>
              Not “when I get a minute.” A fixed, small block, like the first
              hour on Tuesday and Thursday mornings, before any project work.
              And measure it by what went out, not by what came back. “Sent
              three emails and made one follow-up call” is a good day, even if
              nobody answered yet. You control the sending. You don’t control
              the replies.
            </p>

            <h3>3. Decide when the pitch is done before you start it.</h3>
            <p>
              Since building is my comfort zone, I have to cap it. My rule now:
              the sample is done when the prospect can check it against
              something they already know. For one pitch I first set up a free
              preview of leads along a stretch of coast far from the company’s
              home base. Then I realized they’d have no way to judge it. I
              switched the preview to their own backyard, the shops within a
              few miles of their office. They can look at it and say “yep, I
              know that guy” in thirty seconds. That’s a better pitch, and it
              was less work.
            </p>

            <h3>4. Lead with something they can hold.</h3>
            <p>
              A slide deck asks someone to imagine the value. A sample hands it
              to them. I recently sent a local dock builder ten free leads:
              recent waterfront buyers in their area, each with a reason to
              reach out now. Whatever they do with them, it’s a far easier
              conversation than “I do data work, want to talk?” This works for
              almost anyone. A landscaper can send a quick sketch. A bookkeeper
              can point out one thing in last month’s numbers.
            </p>

            <h3>5. Follow up once, kindly, and specifically.</h3>
            <p>
              Silence usually means busy, not no. A good follow-up is short,
              points at one specific thing worth their time, and makes replying
              easy. Mine to the dock builder pointed them to the five hottest
              leads and said I’d like to hear how it goes, good or bad. Even
              “I emailed three and one replied” is useful. People answer
              honest questions more than they answer “just checking in.”
            </p>

            <h3>6. Talk about money, even if it’s awkward.</h3>
            <p>
              This is the hardest one for me, and I don’t think I’m alone. I’d
              rather keep improving the product than name a price. What helps
              is having a rough number figured out before the conversation, so
              I’m not inventing it on the spot, and having that part of the
              conversation in person or on a call rather than buried in an
              email. Money talk goes better when it’s two people talking about
              whether something is worth it.
            </p>

            <h3>7. Never let selling drop to zero.</h3>
            <p>
              When you’re slammed, shrink it, but don’t stop. One outreach a
              week while a big job is underway keeps something in the pipeline
              for when it ends. That one habit is the difference between a
              steady business and a feast-and-famine one.
            </p>

            <FlowDiagram
              label="A weekly selling loop for a one-person shop"
              caption="Small and boring on purpose. The goal is that it never stops, not that it’s impressive."
              steps={[
                { label: "Pick", detail: "Prospects whose problem you actually fix" },
                { label: "Sample", detail: "Something small they can check" },
                { label: "Send", detail: "On the calendar, counted by sends" },
                { label: "Follow up", detail: "Once, short, and specific" },
                { label: "Talk", detail: "Value and price, in person" },
              ]}
            />

            <h2>Where AI fits, and where it doesn’t</h2>
            <p>
              Since this is an AI consulting blog, the obvious question: can AI
              do the selling for you? Parts of it, yes. The research is the part
              it’s genuinely good at: finding the businesses that fit, reading
              their websites and reviews, and writing a short note on why each
              one might need you. That used to be days of work before the first
              call, and it’s a big reason pitches stalled before they started.
            </p>
            <p>
              What it can’t do is the part that actually closes work: the phone
              call, the honest conversation about whether you’re a fit, the
              handshake. I don’t want it to. People buy from people, especially
              from small businesses. The useful job for AI is clearing the
              runway so you spend your selling hour talking to the right
              people, instead of figuring out who they are.
            </p>

            <blockquote>
              The pitch you don’t send doesn’t count, no matter how good it
              is.
            </blockquote>
          </div>
        </section>

        <section className="band plain" id="related">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">RELATED</div>
                <h2>Spend the selling hour on the right people.</h2>
              </div>
            </div>
            <div className="article-callout">
              <p>
                Call List is the research half of this, done for you: a ranked
                list of prospects in your territory, with a direct contact and
                a reason to call attached to every row.
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
            <h2>Good at the work, short on time to find it?</h2>
            <p className="lede">
              Tell us who you sell to and where. We’ll tell you honestly
              whether a researched prospect list would help.
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
