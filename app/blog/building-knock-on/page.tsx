import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import PostLeadOffers from "../../components/PostLeadOffers";
import FlowDiagram from "../../components/FlowDiagram";

export const metadata: Metadata = {
  title: "Building Knock-On: A Puzzle Game My Kids Have to Think Through — 36 Dunes",
  description:
    "My kids were playing mindless games on an old computer of mine, so I built them a chain-reaction physics puzzle inspired by a 1990s classic. Fifty puzzles, a parts drawer, and a Run button.",
  alternates: { canonical: "/blog/building-knock-on" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Building Knock-On: A Puzzle Game My Kids Have to Think Through",
  image: "https://36dunes.com/blog/building-knock-on/thumb.jpg",
  author: { "@type": "Organization", name: "36 Dunes" },
  publisher: { "@type": "Organization", name: "36 Dunes" },
  datePublished: "2026-11-23",
  mainEntityOfPage: "https://36dunes.com/blog/building-knock-on",
};

export default function BuildingKnockOnPost() {
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
                <h1>Building Knock-On: A Puzzle Game My Kids Have to Think Through</h1>
                <p className="lede">
                  My kids were playing mindless games on an old computer of
                  mine, so I built them a chain-reaction physics puzzle
                  inspired by a 1990s classic. Fifty puzzles, a parts drawer,
                  and a Run button.
                </p>
                <div className="article-meta">
                  <span>November 23, 2026</span>
                  <span>5 min read</span>
                  <span>Side project</span>
                </div>
              </div>
              <Image
                className="post-title-image"
                src="/blog/building-knock-on/thumb.jpg"
                alt="A Knock-On puzzle board: a tan pegboard with planks, a copper ball resting on a large grey gear, a light switch, a glass bin, and a carrot on the floor"
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
              My kids found an old computer of mine and started playing games
              on it. That was fine for about a day. Then I noticed what the
              games actually were: tap here, collect that, watch a reward
              animation, repeat. They were having fun, but nobody was
              thinking.
            </p>
            <p>
              It reminded me of a computer game from the early 1990s, The
              Incredible Machine. You got a puzzle, a
              handful of parts like ramps, balls, belts, and fans, and a goal.
              You built a contraption, hit start, and watched it work, or more
              often watched it fail in some ridiculous way. Then you fixed it
              and tried again. It was a game, but it was also basically
              physics and engineering in disguise.
            </p>
            <p>
              I wanted my kids to have something like that. So I built one.
              It’s called{" "}
              <a href="https://knockon.36dunes.com" target="_blank" rel="noopener noreferrer">
                Knock-On
              </a>
              , it runs in any web browser, and it’s free.
            </p>

            <h2>How it plays</h2>
            <p>
              Every puzzle is a pegboard with a copper ball, a bin, and a few
              things already bolted in place. You get a drawer of parts. Pick
              one, tap the board to place it, tilt it if you need to, and press
              Run. If the ball ends up in the bin, you solved it.
            </p>
            <figure>
              <Image
                style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid var(--line)" }}
                src="/blog/building-knock-on/job-one.jpg"
                alt="Knock-On's first puzzle, Downhill: a copper ball on a tilted plank at the top left of a pegboard, a bin at the bottom, and a parts drawer holding one plank"
                width={1248}
                height={720}
                sizes="(max-width: 780px) 100vw, 760px"
              />
              <figcaption>
                Job 1 of 50. One plank, one ball, one bin. It gets harder from
                here.
              </figcaption>
            </figure>
            <p>
              The early puzzles are about the basics: planks, trampolines,
              blowers, conveyor belts, seesaws, dominoes, magnets that only
              pull steel balls, balloons that lift whatever they’re tied to.
              The second half adds cause and effect. A light switch turns on
              the power for the whole board. A lit bulb attracts flies, which
              will tow a ball if you’ve tied them to it. A rabbit on a bike
              pedals toward any carrot it can see and pushes whatever’s in the
              way. A motor turns gears, and gears turn each other. There’s a
              cannon, too, because of course there is.
            </p>
            <p>
              By the last puzzle, The Grand Machine, you’re firing the cannon,
              starting the gears, lighting the bulb, and feeding the rabbit, all
              to drop one ball into one bin.
            </p>
            <figure>
              <Image
                style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid var(--line)" }}
                src="/blog/building-knock-on/grand-machine.jpg"
                alt="Knock-On's final puzzle, The Grand Machine: a busy pegboard with planks, walls, a light switch, a steel ball, a copper ball on a gear, a motor, a felt pad, a bin, and a carrot with flies above it"
                width={1600}
                height={1004}
                sizes="(max-width: 780px) 100vw, 760px"
              />
              <figcaption>
                Job 50, The Grand Machine, before you add anything from the
                drawer.
              </figcaption>
            </figure>
            <p>
              There’s also a Free Build mode with every part and no goal, for
              when someone just wants to make a mess.
            </p>

            <h2>Why this kind of game</h2>
            <p>
              The loop is what I like about it. You look at the board, make a
              guess about what will happen, and then you find out. Usually your
              guess is a little wrong. The ball bounces too far, or the domino
              falls the other way. So you adjust and run it again.
            </p>

            <FlowDiagram
              label="The Knock-On loop"
              caption="Getting it wrong is part of the fun. You can see exactly where it went sideways."
              steps={[
                { label: "Look", detail: "What’s on the board, what’s in the drawer" },
                { label: "Guess", detail: "Where the ball will go" },
                { label: "Run", detail: "Watch the chain reaction" },
                { label: "See where it broke", detail: "Too far, too short, wrong way" },
                { label: "Adjust", detail: "Move one thing and try again" },
              ]}
            />

            <p>
              That’s the same loop as a science experiment, or debugging code,
              or fixing anything. And failing doesn’t feel like losing,
              because you can watch exactly where it went wrong. There are no
              timers, no lives, no ads, and nothing to buy.
            </p>

            <h2>Making 50 puzzles fair</h2>
            <p>
              The hardest part of building it wasn’t the physics. It was
              making the puzzles get harder in a way that feels fair instead of
              frustrating.
            </p>
            <p>
              A few rules came out of that. Every new part gets its own
              puzzle that teaches it before it shows up anywhere else, so
              nobody gets ambushed by a rabbit they’ve never seen. In the second
              half, puzzles get harder by making the chain longer, with more
              things that have to happen in order, not by stuffing the drawer
              with decoy parts. A drawer full of junk you don’t need doesn’t
              make you think harder. It just makes you guess more.
            </p>
            <p>
              Physics games also have a sneaky problem: a small change to how
              something bounces can quietly break a puzzle that used to
              work. So every puzzle has a known solution saved, and an
              automatic check runs all 50 of them to confirm two things: each
              puzzle can still be solved, and none of them solves itself if you
              just press Run.
            </p>
            <p>
              I also wrote a solver that searches for solutions on its own,
              which was humbling. It kept finding shortcuts I hadn’t intended,
              like using a trampoline as a skeleton key for half the
              puzzles. Each time it did, I either fixed the puzzle or took the
              trampoline out of that drawer. Kids are even better at finding
              shortcuts than solvers, so I’m sure there are more.
            </p>

            <h2>Inspired by, not a copy</h2>
            <p>
              Knock-On borrows the idea of The Incredible Machine, not the
              game itself. The parts, puzzles, and look are all its own.
              The pegboard-and-workbench style is meant to feel like tinkering
              in a garage. The physics runs on an open-source engine called
              Matter.js, and there’s no AI in the game at all. It doesn’t need
              any.
            </p>

            <h2>Try it</h2>
            <p>
              It’s at{" "}
              <a href="https://knockon.36dunes.com" target="_blank" rel="noopener noreferrer">
                knockon.36dunes.com
              </a>
              . No sign-up, no download. The first few puzzles take a minute.
              The last few might take an evening. If you’ve got kids who like
              building things, or you remember the original, give it a try.
            </p>
            <p>
              I’d love to hear which puzzle got you stuck, or what part you’d
              want added next.
            </p>

            <blockquote>
              The best part of a chain-reaction puzzle is watching it go wrong,
              because then you know what to fix.
            </blockquote>
          </div>
        </section>

        <section className="band plain" id="related">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">RELATED</div>
                <h2>Another side project, built for fun.</h2>
              </div>
            </div>
            <div className="article-callout">
              <p>
                Rulebook Trader is a paper-trading experiment where fixed rules
                make every call and an AI reviewer can only say no. Same habit
                as Knock-On: build it, run it, watch where it breaks.
              </p>
              <Link className="btn btn-ghost" href="/blog/building-rulebook-trader">
                Read the post →
              </Link>
            </div>
          </div>
        </section>

        <PostLeadOffers />

        <section className="band" id="contact">
          <div className="wrap contact-inner">
            <div className="eyebrow">START A PROJECT</div>
            <h2>Have an idea you want to see working?</h2>
            <p className="lede">
              Games, tools, or something in between. Tell us what you have in
              mind, and we’ll tell you honestly what it would take.
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
