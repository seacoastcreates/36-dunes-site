import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Building MoodLens: a Private AI Mood Journal — 36 Dunes",
  description:
    "How I built an iPhone app that reads the emotion in what you write or say, keeps your data private, and costs almost nothing to run.",
  alternates: { canonical: "/blog/building-moodlens" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Building MoodLens: a mood journal that reads between the lines",
  author: { "@type": "Organization", name: "36 Dunes" },
  publisher: { "@type": "Organization", name: "36 Dunes" },
  datePublished: "2026-09-26",
  mainEntityOfPage: "https://36dunes.com/blog/building-moodlens",
};

export default function BuildingMoodLensPost() {
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
            <h1>Building MoodLens: a mood journal that reads between the lines</h1>
            <p className="lede">
              How I built an iPhone app that reads the emotion in what you
              write or say, keeps your data private, and costs almost nothing
              to run.
            </p>
            <div className="article-meta">
              <span>September 26, 2026</span>
              <span>5 min read</span>
              <span>Privacy</span>
            </div>
          </div>
        </section>

        <section className="plain" id="content">
          <div className="wrap prose">
            <p>
              Most journaling apps ask you to rate your mood on a scale of
              one to five. I wanted one that could read the mood for you. You
              write a few honest lines, or say them out loud, and it tells
              you what it hears underneath. Over weeks, it shows you patterns
              you would never spot on your own.
            </p>
            <p>
              That app is MoodLens. It&apos;s now in App Store review, and
              this is how I built it: what it does, how the AI works, and the
              privacy and cost decisions that shaped it.
            </p>

            <h2>What MoodLens does</h2>
            <p>
              The core loop takes about thirty seconds. Open the app, type
              how your day went, or switch to voice and talk for a few
              seconds. Tap <strong>Reveal My Mood</strong>, and you get a
              reading: the strongest emotion in the entry, plus the others
              underneath it.
            </p>
            <p>
              Those readings add up. The home screen shows a{" "}
              <strong>Daily Reading</strong> that summarizes where you&apos;ve
              been lately. It also surfaces patterns in your own history:
              maybe Mondays tend to run heavy, or a certain month is usually
              brighter. The app has a midnight-and-gold, tarot-inspired look,
              so it even tracks moon phases. It says plainly that there&apos;s
              no scientific link between the moon and mood, but it&apos;s a
              fun lens that fits the app&apos;s personality.
            </p>
            <p>
              When several entries in a row lean heavy, MoodLens offers a
              gentle check-in instead of an alarm. It suggests a few things
              that might help, like a walk, a call to a friend, or a reset
              ritual. No streaks, no points, no guilt.
            </p>

            <h2>How it reads emotion</h2>
            <p>
              MoodLens uses two open-source machine-learning models, both
              running on my own server:
            </p>
            <ul>
              <li>
                <strong>For writing:</strong> a language model trained on
                GoEmotions, a dataset of 58,000 Reddit comments hand-labeled
                with 27 emotions plus neutral. It picks up nuance that a
                simple positive-or-negative score misses: gratitude,
                nervousness, amusement, relief, remorse.
              </li>
              <li>
                <strong>For voice:</strong> a speech model trained to
                recognize emotion in the <em>sound</em> of a voice, not the
                words. The app trims out silence, normalizes the volume, and
                reads the clip in short overlapping windows before averaging
                them into one reading.
              </li>
            </ul>
            <p>
              One detail I love: the text model scores each emotion
              independently, so the scores don&apos;t have to add up to 100%.
              When I tested it on &quot;Finished a book I loved. Sad
              it&apos;s over, but so glad I read it,&quot; it came back 60%
              sadness and 52% love at the same time. That&apos;s exactly what
              that feeling is.
            </p>
            <p>
              The models aren&apos;t perfect. Short entries and mumbled audio
              can throw them off, and the app says so: it flags
              low-confidence voice readings and asks for a clearer clip.
              I&apos;d rather be honest about the limits than oversell the
              magic.
            </p>

            <h2>Privacy wasn&apos;t a feature. It was the design.</h2>
            <p>
              A mood journal holds tender things. So the privacy rules came
              first, and the architecture followed:
            </p>
            <ul>
              <li>
                <strong>No accounts.</strong> There&apos;s no sign-up, email,
                or name. Your history is tied to a random ID stored in your
                phone&apos;s secure keychain, and that ID is cryptographically
                signed, so no one can read someone else&apos;s entries by
                guessing IDs.
              </li>
              <li>
                <strong>Voice clips are thrown away.</strong> Recordings are
                analyzed in memory and discarded. Only the emotion reading is
                saved.
              </li>
              <li>
                <strong>No third-party AI.</strong> Your words go to my server
                and nowhere else. They aren&apos;t sent to a big AI company,
                and they aren&apos;t used to train anything.
              </li>
              <li>
                <strong>Delete means delete.</strong> One tap removes every
                entry, from your phone <em>and</em> from the server, and
                resets your anonymous ID.
              </li>
              <li>
                <strong>No ads, no analytics, no tracking.</strong>
              </li>
            </ul>
            <p>
              There&apos;s a second kind of care, too. An app that notices
              when you&apos;re having a hard stretch has a responsibility to
              handle that well. MoodLens is clear that it&apos;s a reflection
              tool, not a medical device, and it never diagnoses anything.
              Wherever it mentions a heavy mood, it also shows a tap-to-call
              link to <strong>988</strong>, the US Suicide &amp; Crisis
              Lifeline. I rewrote early wording like &quot;possible burnout
              cycle&quot; into something gentler, because an app shouldn&apos;t
              sound like it&apos;s handing out diagnoses.
            </p>

            <h2>Running real AI for almost nothing</h2>
            <p>
              Running your own models sounds expensive. The two MoodLens
              models need about 3 GB of memory, and keeping a server like that
              on around the clock costs roughly $60 to $120 a month. For an
              app that doesn&apos;t have users yet, that&apos;s hard to
              justify.
            </p>
            <p>
              So MoodLens runs on Google Cloud Run, set to{" "}
              <strong>scale to zero</strong>. When nobody is using it, no
              server is running and nothing is billed. When a request comes
              in, Cloud Run starts one up. At launch-level traffic, that
              should fit inside Cloud Run&apos;s free monthly allowance. The
              database is a free-tier Postgres on Neon.
            </p>
            <p>
              The tradeoff is the cold start. Booting the server and loading
              both models takes about a minute, which is longer than an iPhone
              will wait for a response. I handled that in three layers:
            </p>
            <ol>
              <li>
                <strong>The models are built into the server image,</strong>{" "}
                and the server runs one practice reading before accepting
                traffic, so the first real request doesn&apos;t pay the
                loading cost.
              </li>
              <li>
                <strong>The app wakes the server the moment you open it.</strong>{" "}
                By the time you&apos;ve written an entry, the server is
                usually ready. If it isn&apos;t, the app shows a
                &quot;waking up&quot; message and retries instead of failing.
              </li>
              <li>
                <strong>A scheduled ping every 10 minutes</strong> keeps a
                warm server around most of the time, and idle time
                isn&apos;t billed.
              </li>
            </ol>
            <p>
              The result is real, self-hosted AI with a hosting bill that
              rounds to zero until people actually use it. When they do,
              it&apos;s one setting to keep a server always warm.
            </p>

            <h2>Why this matters beyond a journal</h2>
            <p>
              MoodLens is a personal app, but the pieces behind it are the
              same ones I use with businesses at 36 Dunes:
            </p>
            <ul>
              <li>
                <strong>Reading emotion in text at scale.</strong> The model
                that reads a journal entry can just as easily read hundreds
                of customer reviews, survey answers, or support emails, and
                tell you what people <em>feel</em>, not just whether they gave
                you four stars.
              </li>
              <li>
                <strong>Keeping sensitive data in-house.</strong> Open-source
                models on your own server mean customer data never goes to a
                third-party AI company.
              </li>
              <li>
                <strong>Paying for AI only when you use it.</strong>{" "}
                Scale-to-zero hosting makes custom AI realistic for a small
                business, not just for companies with an engineering team.
              </li>
            </ul>
            <p>
              If you&apos;re curious what that could look like for your
              business, I&apos;d love to talk.
            </p>

            <h2>See it for yourself</h2>
            <p>
              MoodLens is coming soon to the iPhone App Store. You can try
              sample readings from the real model, and see the app, at{" "}
              <strong>
                <a href="https://moodlens.36dunes.com">moodlens.36dunes.com</a>
              </strong>
              . The download button will switch on by itself the day it goes
              live.
            </p>
          </div>
        </section>

        <section className="band" id="contact">
          <div className="wrap contact-inner">
            <div className="eyebrow">START A PROJECT</div>
            <h2>Want AI that reads your customers&apos; words without sending them elsewhere?</h2>
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
