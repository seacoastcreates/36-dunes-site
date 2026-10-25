"use client";

import { useState, type FormEvent } from "react";
import { trackLead } from "../lib/analytics";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

type Status = "idle" | "submitting" | "success" | "error";

// A short version of the contact form for the hero. It posts to the same
// Netlify "contact" form so leads land in one place; GA tells them apart.
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
      trackLead("hero-contact");
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
          <div className="eyebrow">MESSAGE SENT</div>
          <h3>Thanks — we&apos;ve got it.</h3>
          <p>We read every message and reply by email within two business days.</p>
        </div>
      ) : (
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="hero-form"
        >
          <div className="eyebrow">START A PROJECT</div>
          <h3>Tell us what you&apos;re trying to fix.</h3>

          <input type="hidden" name="form-name" value="contact" />
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
            <label htmlFor="hero-email">Email *</label>
            <input id="hero-email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="hero-message">What do you need? *</label>
            <textarea
              id="hero-message"
              name="message"
              required
              rows={3}
              placeholder="A slow process, a messy spreadsheet, an idea…"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Send message"}
          </button>
          <p className="hero-form-note">We reply by email within two business days.</p>
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
