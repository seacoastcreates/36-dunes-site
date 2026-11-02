"use client";

import { useState, type FormEvent } from "react";
import { trackLead } from "../lib/analytics";
import BookCallButton from "./BookCallButton";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

type Status = "idle" | "submitting" | "success" | "error";

// The hero's free-sample request. It posts to the same Netlify
// "call-list-interest" form as the Call List page so sample requests land in
// one place; the hidden "source" field and GA's form_name tell them apart.
export default function HeroContactForm() {
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
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(data),
      });
      if (!response.ok) throw new Error("Submission failed");
      trackLead("call-list-interest", "homepage-hero");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="hero-card">
      {status === "success" ? (
        <div className="hero-form-success">
          <div className="eyebrow">REQUEST RECEIVED</div>
          <h3>Thanks — we&apos;re on it.</h3>
          <p>
            You&apos;ll hear back the same business day: either when to expect
            your 10 free leads, or an honest note if your market doesn&apos;t
            have enough public data to research well.
          </p>
          <BookCallButton source="hero-success" label="Want to talk it through? Book 15 min" />
        </div>
      ) : (
        <form
          name="call-list-interest"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="hero-form"
        >
          <div className="eyebrow">FREE · NO COMMITMENT</div>
          <h3>Get 10 free leads for your territory.</h3>
          <input type="hidden" name="form-name" value="call-list-interest" />
          <input type="hidden" name="source" value="homepage-hero" />
          <p className="hp-field" aria-hidden="true">
            <label>
              Leave this field blank
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <div className="field">
            <label htmlFor="hero-name">Your name *</label>
            <input id="hero-name" name="name" type="text" required autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="hero-email">Work email *</label>
            <input id="hero-email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="hero-who">Who do you sell to, and where? *</label>
            <textarea
              id="hero-who"
              name="who"
              required
              rows={3}
              placeholder="e.g. Marinas and dock owners on NH lakes"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Send me 10 free leads"}
          </button>
          <p className="hero-form-note">
            Ranked, researched, with a reason to call each one. We reply the same
            business day.
          </p>
          {status === "error" && (
            <p className="form-error">
              Something went wrong on our end — please try again, or email us
              directly at kirby@36dunes.com.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
