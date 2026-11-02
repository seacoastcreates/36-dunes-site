import Link from "next/link";

// Shown at the end of every blog post, before the contact band: the two
// no-call-required next steps (free leads sample, AI readiness checklist).
export default function PostLeadOffers() {
  return (
    <section className="plain post-lead-offers">
      <div className="wrap post-lead-offers-grid">
        <div className="article-callout">
          <div className="eyebrow">FREE · NO COMMITMENT</div>
          <h3>Get 10 free leads for your territory.</h3>
          <p>
            Ranked, researched prospects with a direct contact and a reason to
            call each one.
          </p>
          <Link className="btn btn-primary" href="/work/call-list#get-a-list">
            Send me 10 free leads
          </Link>
        </div>
        <div className="article-callout">
          <div className="eyebrow">FREE CHECKLIST</div>
          <h3>Is your data ready for a custom model?</h3>
          <p>
            Eight questions to answer before you put budget into building
            anything custom.
          </p>
          <Link className="btn btn-ghost" href="/resources/ai-readiness-checklist">
            Get the checklist →
          </Link>
        </div>
      </div>
    </section>
  );
}
