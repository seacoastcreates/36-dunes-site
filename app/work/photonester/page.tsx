import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "PhotoNester Case Study — On-Device ML App Development | 36 Dunes",
  description:
    "How PhotoNester sorts a million photos entirely on-device: CLIP embeddings converted to Core ML, unsupervised k-means clustering, and the Core ML consulting lessons from an App Store rejection.",
  alternates: { canonical: "/work/photonester" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "PhotoNester: sorting a million photos without a single upload",
  description:
    "An on-device ML app development case study covering CLIP-to-Core-ML conversion, unsupervised clustering, and production debugging.",
  author: { "@type": "Organization", name: "36 Dunes" },
  publisher: { "@type": "Organization", name: "36 Dunes" },
  datePublished: "2026-06-01",
  mainEntityOfPage: "https://36dunes.com/work/photonester",
};

export default function PhotoNesterCaseStudy() {
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
            <Link className="back-link" href="/">
              ← Back to home
            </Link>
            <div className="eyebrow">CASE STUDY — ON-DEVICE ML APP DEVELOPMENT</div>
            <h1>PhotoNester: sorting a million photos without a single upload.</h1>
            <p className="lede">
              A camera roll with years of unsorted photos is a search
              problem, not a storage problem. Here&apos;s how we built
              PhotoNester to solve it entirely on-device — detailed enough
              to hand to another engineer, not dressed up for a pitch.
            </p>
            <div className="article-meta">
              <span>iOS · Swift + SwiftUI</span>
              <span>OpenAI CLIP → Core ML</span>
              <span>Unsupervised k-means</span>
              <span>100% on-device</span>
            </div>
          </div>
        </section>

        <section className="plain" id="content">
          <div className="wrap prose">
            <h2>The problem</h2>
            <p>
              Most people don&apos;t have a photo-organization problem — they
              have a search problem wearing a storage costume. Years of
              photos pile up with no folders, no tags, and no realistic way
              to go back and label them by hand. Cloud photo services solve
              this by uploading everything and running search server-side,
              which works fine until you care about where a decade of
              personal photos actually lives. PhotoNester&apos;s constraint
              was non-negotiable from day one: sort the library into
              meaningful albums — Travel, Pets, Food, Documents — without a
              single image ever leaving the phone.
            </p>

            <h2>Why on-device, specifically</h2>
            <p>
              &quot;On-device&quot; sounds like a privacy feature, and it is
              one, but it&apos;s also an architecture decision with real
              consequences. There&apos;s no server to fall back on if
              inference is slow, no elastic compute to throw at a stuck job,
              and no way to patch a bad model without shipping an app
              update. Every performance and reliability problem has to be
              solved on hardware you don&apos;t control, in an OS environment
              (iOS) that actively fights background CPU and GPU usage to
              protect battery life. That constraint shaped almost every
              decision below.
            </p>

            <h2>Turning CLIP into a Core ML model</h2>
            <p>
              The classification approach uses OpenAI&apos;s CLIP model to
              generate image embeddings — vector representations that place
              visually and semantically similar photos near each other in
              embedding space, without needing category labels. CLIP wasn&apos;t
              built for mobile, though, so getting it running efficiently on
              an iPhone meant converting it to Core ML with{" "}
              <code>coremltools</code>, then working through the usual list
              of conversion headaches: unsupported PyTorch ops that needed
              manual substitution, verifying the traced graph didn&apos;t
              silently drop the vision encoder&apos;s attention layers, and
              testing float16 precision against the original float32 output
              to confirm the accuracy loss was negligible for clustering
              purposes even though it wouldn&apos;t be for something like
              exact retrieval.
            </p>
            <p>
              The output is a fixed-length embedding vector per photo. That
              vector, not the image itself, is what gets stored and
              clustered — which is also why the privacy claim holds up: even
              if the embeddings were somehow extracted, they&apos;re not
              photos, they&apos;re coordinates in a 512-dimensional space.
            </p>

            <h2>Clustering without labels</h2>
            <p>
              With embeddings in hand, the question becomes how to group
              them into albums without predefining categories — the whole
              point was avoiding a hardcoded label set that breaks the
              moment someone&apos;s library doesn&apos;t match it.
              Unsupervised k-means clustering on the embedding vectors
              handles this: photos that are close together in embedding
              space end up in the same cluster, and the cluster boundaries
              emerge from the actual content of a given library instead of
              a fixed taxonomy.
            </p>
            <p>
              The harder problem was choosing k — the number of clusters —
              without a human in the loop. Too few clusters and &quot;Travel&quot;
              and &quot;Food&quot; collapse into one blob; too many and you
              get a dozen near-duplicate micro-albums. The approach that
              worked was running k-means across a small range of k values,
              scoring each with silhouette score to measure cluster
              separation, and picking the value that maximized it — cheap
              enough to run on-device against a downsampled embedding set
              without noticeable delay.
            </p>

            <h2>Making it fast enough to trust</h2>
            <p>
              None of this matters if it drains someone&apos;s battery to
              sort their camera roll. CLIP inference on a few thousand
              images, run naively, will absolutely do that — and iOS will
              throttle or kill a background task that tries. Two things
              made it viable:
            </p>
            <ul>
              <li>
                <strong>Batched inference.</strong> Images are processed in
                small batches with explicit yields between them, so the app
                stays responsive and the system has room to manage thermal
                and power state instead of getting one long blocking call.
              </li>
              <li>
                <strong>Persisted progress.</strong> Scan state is
                checkpointed to disk as it goes, so if the app is
                backgrounded, killed by the system, or the phone just goes
                to sleep mid-scan, it resumes from where it left off instead
                of starting a multi-thousand-photo library over from zero.
              </li>
            </ul>
            <p>
              The result: a full library sorts in minutes, not the kind of
              multi-hour background job that would quietly get killed
              before finishing.
            </p>

            <h2>The App Store rejection</h2>
            <p>
              This is the part that doesn&apos;t make it into most case
              studies. Core ML lets you specify which compute units a model
              is allowed to run on —{" "}
              <code>.cpuOnly</code>, <code>.cpuAndGPU</code>, or{" "}
              <code>.all</code> (which includes the Neural Engine). On
              current hardware, <code>.all</code> is almost always the right
              call. On some older iPadOS devices, though, the Neural Engine
              path for this particular model graph triggered a fallback
              that behaved inconsistently — occasionally hanging during
              Apple&apos;s automated review rather than crashing outright,
              which made it far harder to trace than a clean failure would
              have been.
            </p>
            <p>
              The fix was a compute-unit fallback strategy: detect device
              class at launch, and on the specific older iPadOS
              configurations that showed the problem, force{" "}
              <code>.cpuAndGPU</code> instead of <code>.all</code>. Slower
              inference on those devices, but correct and stable — which is
              the actual lesson: Core ML&apos;s compute unit selection is
              not uniform across the device matrix, and testing on current
              hardware alone won&apos;t catch it. It&apos;s a specific kind
              of problem that Core ML consulting exists for, because it
              rarely shows up until you&apos;re already in front of App
              Review.
            </p>

            <h2>Where it landed</h2>
            <p>
              A camera roll with years of unsorted photos now sorts into
              coherent albums in minutes, entirely on-device, with nothing
              ever uploaded. The architecture — CLIP embeddings, Core ML
              conversion, unsupervised clustering, and the reliability
              engineering to make it trustworthy on real hardware — is the
              same shape of problem we bring to most on-device or
              privacy-constrained ML work: the model is maybe a third of
              the job, and the rest is making it actually survive contact
              with someone&apos;s phone.
            </p>

            <blockquote>
              The model is maybe a third of the job. The rest is making it
              survive contact with someone&apos;s actual phone.
            </blockquote>
          </div>
        </section>

        <section className="band plain" id="related">
          <div className="wrap">
            <div className="section-head">
              <div>
                <div className="eyebrow">RELATED SERVICES</div>
                <h2>If this is the kind of problem you have.</h2>
              </div>
            </div>
            <div className="service-grid">
              <Link className="service-card" href="/services/custom-ai-development">
                <div className="eyebrow">BUILD</div>
                <h3>Custom AI Development</h3>
                <p>Task-specific models built for your data, shipped in a real product.</p>
                <span className="service-link">Learn more →</span>
              </Link>
              <Link className="service-card" href="/services/mlops-consulting">
                <div className="eyebrow">OPERATE</div>
                <h3>MLOps Consulting</h3>
                <p>The infrastructure that keeps a model reliable after it ships.</p>
                <span className="service-link">Learn more →</span>
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
              <a
                className="btn btn-ghost"
                href="https://photonester.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Try PhotoNester →
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
