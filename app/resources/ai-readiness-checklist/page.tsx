import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import LeadMagnetForm from "../../components/LeadMagnetForm";

export const metadata: Metadata = {
  title: "AI Readiness Checklist — 36 Dunes",
  description:
    "Free checklist: eight questions that determine whether your data is actually ready for a custom AI model, before you commit budget to building one.",
  alternates: { canonical: "/resources/ai-readiness-checklist" },
};

export default function AiReadinessChecklistPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="plain page-intro">
          <div className="wrap">
            <div className="eyebrow">FREE CHECKLIST</div>
            <h1>Is your data actually ready for a custom model?</h1>
            <p className="lede">
              Eight questions we ask before we&apos;ll recommend building
              anything custom. Answer them honestly before you spend budget
              finding out the hard way.
            </p>
          </div>
        </section>

        <section className="band" id="checklist">
          <div className="wrap contact-inner">
            <LeadMagnetForm>
              <div className="lead-checklist">
                <div className="eyebrow">THE CHECKLIST</div>
                <h2 className="lead-checklist-title">AI Readiness Checklist</h2>
                <ol>
                  <li>
                    <strong>1. Volume</strong>
                    <span>
                      Do you have enough historical examples of the outcome
                      you&apos;re trying to predict? Hundreds to thousands
                      of labeled examples per category is a realistic
                      starting point — dozens usually isn&apos;t.
                    </span>
                  </li>
                  <li>
                    <strong>2. Label quality</strong>
                    <span>
                      Are outcomes recorded consistently, or does
                      &quot;success&quot; mean something different
                      depending on who entered the data? Inconsistent
                      labels cap your accuracy before training even starts.
                    </span>
                  </li>
                  <li>
                    <strong>3. Accessibility</strong>
                    <span>
                      Is the data queryable in one place, or scattered
                      across five systems that don&apos;t talk to each
                      other? Data engineering is usually the real cost, not
                      the model.
                    </span>
                  </li>
                  <li>
                    <strong>4. A single success metric</strong>
                    <span>
                      Can you state, in one sentence, what &quot;the model
                      is working&quot; means — a precision target, a dollar
                      impact, hours saved? If not, no one will agree it
                      worked even if it does.
                    </span>
                  </li>
                  <li>
                    <strong>5. A human baseline</strong>
                    <span>
                      Do you know how well your current manual process
                      performs? Without a baseline, there&apos;s nothing
                      for the model to beat.
                    </span>
                  </li>
                  <li>
                    <strong>6. Documented edge cases</strong>
                    <span>
                      Do you know the weird cases that already break your
                      current process? A model will hit them too — better
                      to know them going in.
                    </span>
                  </li>
                  <li>
                    <strong>7. Stakeholder buy-in on the decision</strong>
                    <span>
                      Will the model&apos;s output actually change what
                      someone does — or will it get ignored the way the
                      last dashboard did?
                    </span>
                  </li>
                  <li>
                    <strong>8. Budget for the boring part</strong>
                    <span>
                      Have you budgeted for monitoring and retraining, not
                      just the initial build? A model with no maintenance
                      plan degrades — usually silently.
                    </span>
                  </li>
                </ol>
                <p className="lead-checklist-next">
                  Six or more &quot;yes&quot; answers, honestly — you&apos;re
                  in good shape to start scoping.{" "}
                  <Link href="/rfp">Request a proposal →</Link>
                </p>
              </div>
            </LeadMagnetForm>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
