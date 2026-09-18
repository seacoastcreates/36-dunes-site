"use client";

import { useState, type FormEvent } from "react";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
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
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rfp-success">
        <div className="eyebrow">MESSAGE SENT</div>
        <h3>Thanks — we&apos;ve got it.</h3>
        <p>We read every message and reply by email within two business days.</p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="rfp-form contact-form"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hp-field" aria-hidden="true">
        <label>
          Leave this field blank
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="contact-name">Your name *</label>
          <input id="contact-name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="contact-email">Email *</label>
          <input id="contact-email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="contact-phone">Phone</label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className="field field-full">
          <label htmlFor="contact-message">Message *</label>
          <textarea id="contact-message" name="message" required rows={4} />
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send message"}
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
