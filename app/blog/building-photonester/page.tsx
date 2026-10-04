import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Building PhotoNester: On-Device Photo Sorting — 36 Dunes",
  description:
    "How PhotoNester sorts an entire camera roll into Travel, Pets, Food, and more, entirely on-device — CLIP converted to Core ML, unsupervised clustering, and the App Store bug that almost shipped broken.",
  alternates: { canonical: "/blog/building-photonester" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Building PhotoNester: Teaching an iPhone to Organize a Million Memories",
  author: { "@type": "Organization", name: "36 Dunes" },
  publisher: { "@type": "Organization", name: "36 Dunes" },
  datePublished: "2026-09-16",
  mainEntityOfPage: "https://36dunes.com/blog/building-photonester",
};

export default function BuildingPhotoNesterPost() {
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
                <h1>Building PhotoNester: Teaching an iPhone to Organize a Million Memories</h1>
                <p className="lede">
                  An app that sorts your entire camera roll into Travel,
                  Pets, Food, and more — without a single photo ever leaving
                  your phone. Here&apos;s how it actually works.
                </p>
                <div className="article-meta">
                  <span>September 16, 2026</span>
                  <span>6 min read</span>
                  <span>On-device ML</span>
                </div>
              </div>
              <Image
                className="post-title-image"
                src="/blog/building-photonester/thumb.jpg"
                alt="Gold photo-frame icons clustering into a smartphone outline on a dark navy background"
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
              Every iPhone user knows the feeling: 20,000 photos, zero
              organization, and a Camera Roll that&apos;s really just a
              landfill sorted by date. That frustration — my own iCloud
              library, completely unsearchable and unsorted — is what
              started PhotoNester.
            </p>
            <p>
              The idea was simple to state and hard to build: an app that
              looks at your photos and organizes them the way a person
              would — travel, pets, food, nature, selfies, documents —
              without you lifting a finger, and without a single photo ever
              leaving your phone.
            </p>

            <h2>The privacy constraint that shaped everything</h2>
            <p>
              The &quot;never leaves your phone&quot; part wasn&apos;t a
              marketing line I added after the fact — it was the design
              constraint from day one, and it&apos;s the reason the whole
              architecture looks the way it does. No server-side processing
              meant no uploading photos to a cloud API for classification,
              no convenient GPU cluster to lean on, and no shortcuts. Every
              bit of intelligence in PhotoNester had to run on-device, in
              real time, on hardware someone&apos;s also trying to use to
              take more photos.
            </p>
            <p>
              That constraint ruled out a lot of the &quot;just call an
              API&quot; playbook and forced a genuinely on-device ML
              pipeline: classification, clustering, and album generation all
              happening locally, on a phone, in your pocket.
            </p>

            <h2>How it actually works: CLIP, shrunk down to fit in your hand</h2>
            <p>
              At the core of PhotoNester is OpenAI&apos;s CLIP model — the
              same family of model that powers a lot of modern image search
              and understanding — but not running in a data center. I
              converted it from PyTorch into Core ML format using{" "}
              <code>coremltools</code>, so it runs as native, on-device
              inference through Apple&apos;s Core ML framework.
            </p>
            <p>Here&apos;s the basic pipeline:</p>
            <ul>
              <li>
                Each photo gets passed through the CLIP model on-device,
                producing an embedding — a compact numerical fingerprint
                that captures what&apos;s actually in the image, not just
                its metadata.
              </li>
              <li>
                Those embeddings get run through a k-means clustering
                algorithm, which groups visually and semantically similar
                photos together — a boat launch and a dock in Maine end up
                near each other; birthday cake photos cluster with other
                birthday cake photos, even from different years and
                different phones.
              </li>
              <li>
                The clusters get turned into named, browsable albums, so
                instead of scrolling a wall of thumbnails, you get
                &quot;Pets,&quot; &quot;Food,&quot; &quot;Travel&quot; —
                already sorted, already there.
              </li>
            </ul>
            <p>
              The whole app is built in Swift with SwiftUI for the
              interface, which kept the UI layer lightweight so I could
              spend the engineering budget on the part that actually
              mattered: making the ML pipeline fast and stable on real
              hardware, not a simulator.
            </p>

            <h2>The unglamorous part: making it not crash or drain your battery</h2>
            <p>
              Running a vision transformer on a phone sounds impressive
              until you remember that phone also needs to make it through
              the day. A few things turned out to matter more than the
              model itself:
            </p>
            <p>
              Processing happens in batches of 100 images at a time rather
              than trying to chew through an entire library in one pass —
              this keeps memory pressure predictable instead of letting it
              spike and get the app killed by iOS. Progress tracking gives
              visual feedback so a multi-thousand-photo library doesn&apos;t
              feel like it&apos;s hung. And the whole operation is
              resumable — if you close the app mid-organization, it picks
              back up instead of starting over, which matters a lot when
              &quot;the whole library&quot; means tens of thousands of
              images.
            </p>
            <p>
              None of that shows up in a marketing screenshot, but it&apos;s
              most of the actual engineering effort.
            </p>

            <h2>The bug that almost shipped a broken app</h2>
            <p>
              Late in development, an App Store review surfaced a crash
              specific to iPadOS 18.5 — the app was failing because the
              MPSGraph backend it expected wasn&apos;t available on that
              configuration. The fix was one line, once I found it:
              explicitly setting <code>MLModelConfiguration().computeUnits = .all</code>,
              so Core ML could fall back gracefully across CPU and GPU
              instead of assuming a specific compute path was always there.
            </p>
            <p>
              It&apos;s a small fix, but it&apos;s a good reminder that
              &quot;runs on my device&quot; and &quot;runs on every device
              Apple has ever shipped&quot; are very different bars, and the
              gap between them is where a lot of the real work lives.
            </p>

            <h2>What&apos;s next</h2>
            <p>
              PhotoNester is live now, and the roadmap from here is about
              giving people more control over the automatic organization it
              already does well: custom categories, time-based filtering,
              smarter tagging, and better album suggestions as the
              clustering approach matures.
            </p>
            <p>
              The bigger takeaway, for me, was less about photos and more
              about what&apos;s possible on-device now. A model like CLIP,
              running entirely offline on a phone, fast enough to feel
              instant — that wasn&apos;t really practical a couple of years
              ago. Building PhotoNester was as much a bet on where
              on-device ML was headed as it was a fix for my own messy
              camera roll.
            </p>
            <p>
              If you&apos;re curious,{" "}
              <a
                href="https://photonester.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                PhotoNester is available now
              </a>
              , and the full technical breakdown of this build — the CLIP
              conversion, choosing k for clustering, the App Store bug and
              its fix — lives in the case study linked below.
            </p>

            <blockquote>
              A model like CLIP, running entirely offline on a phone, fast
              enough to feel instant — that wasn&apos;t really practical a
              couple of years ago.
            </blockquote>
          </div>
        </section>

        <section className="band plain" id="related">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">RELATED</div>
                <h2>The technical deep-dive.</h2>
              </div>
            </div>
            <div className="article-callout">
              <p>
                The full breakdown of the CLIP-to-Core-ML conversion, the
                clustering approach, and the iPadOS compute-unit bug —
                written in enough detail to hand to another engineer.
              </p>
              <Link className="btn btn-ghost" href="/work/photonester">
                Read the case study →
              </Link>
            </div>
          </div>
        </section>

        <section className="band" id="contact">
          <div className="wrap contact-inner">
            <div className="eyebrow">START A PROJECT</div>
            <h2>Have an on-device or privacy-constrained ML problem?</h2>
            <p className="lede">
              Tell us what you&apos;re building. We&apos;ll tell you
              honestly whether on-device is the right constraint for it.
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
