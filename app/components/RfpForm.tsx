"use client";

import { useState, type FormEvent } from "react";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

type Status = "idle" | "submitting" | "success" | "error";

export default function RfpForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = String(value);
    });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(data),
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rfp-success">
        <div className="eyebrow">REQUEST RECEIVED</div>
        <h3>Thanks — we&apos;ve got it.</h3>
        <p>
          We review every request within two business days and follow up by
          email to schedule a short discovery call.
        </p>
      </div>
    );
  }

  return (
    <form
      name="rfp-request"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="rfp-form"
    >
      <input type="hidden" name="form-name" value="rfp-request" />
      <p className="hp-field" aria-hidden="true">
        <label>
          Leave this field blank
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Your name *</label>
          <input id="name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor="projectType">What kind of project is this? *</label>
          <select id="projectType" name="projectType" required defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option value="Custom AI model">Custom AI model</option>
            <option value="Data strategy consulting">Data strategy consulting</option>
            <option value="AI-powered automation">AI-powered automation</option>
            <option value="Analytics dashboard">Analytics dashboard</option>
            <option value="Web application">Web application</option>
            <option value="iOS / mobile app">iOS / mobile app</option>
            <option value="Cloud & DevOps">Cloud &amp; DevOps</option>
            <option value="Platform modernization">Platform modernization</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>

        <div className="field field-full">
          <label htmlFor="problem">What problem are you trying to solve? *</label>
          <textarea
            id="problem"
            name="problem"
            required
            rows={4}
            placeholder="Describe the problem, not just the solution you have in mind — the more context, the more accurate our scoping."
          />
        </div>

        <div className="field field-full">
          <label htmlFor="currentState">What&apos;s in place today?</label>
          <textarea
            id="currentState"
            name="currentState"
            rows={3}
            placeholder="Existing systems, data sources, prior attempts, or constraints (tech stack, compliance, integrations) worth knowing up front."
          />
        </div>

        <div className="field field-full">
          <label htmlFor="goals">What does success look like?</label>
          <textarea
            id="goals"
            name="goals"
            rows={3}
            placeholder="How you'll know this project worked — a metric, a milestone, a specific outcome."
          />
        </div>

        <div className="field">
          <label htmlFor="timeline">Timeline *</label>
          <select id="timeline" name="timeline" required defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option value="ASAP">ASAP</option>
            <option value="1–3 months">1–3 months</option>
            <option value="3–6 months">3–6 months</option>
            <option value="6+ months / flexible">6+ months / flexible</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="budget">Budget range *</label>
          <select id="budget" name="budget" required defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option value="Under $10k">Under $10k</option>
            <option value="$10k–$25k">$10k–$25k</option>
            <option value="$25k–$50k">$25k–$50k</option>
            <option value="$50k–$100k">$50k–$100k</option>
            <option value="$100k+">$100k+</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>

        <div className="field field-full">
          <label htmlFor="evaluation">
            How will you evaluate proposals, and who else is involved?
          </label>
          <textarea
            id="evaluation"
            name="evaluation"
            rows={2}
            placeholder="Other stakeholders, a decision date, or how this gets approved internally."
          />
        </div>

        <div className="field">
          <label htmlFor="referral">How did you hear about us?</label>
          <input id="referral" name="referral" type="text" />
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Submit request"}
      </button>
      {status === "error" && (
        <p className="form-error">
          Something went wrong on our end — please try again, or email us
          directly at hello@36dunes.com.
        </p>
      )}
    </form>
  );
}
