"use client";

import { useState, type FormEvent } from "react";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

type Status = "idle" | "submitting" | "success" | "error";

export default function CallListForm() {
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
        <div className="eyebrow">REQUEST RECEIVED</div>
        <h3>Thanks — we&apos;ve got it.</h3>
        <p>
          We&apos;ll reply within two business days with your free 10-lead
          preview, or tell you honestly if there isn&apos;t enough
          researchable data in your market to make one worth building.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="form-promo">
        <span className="form-promo-eyebrow">FREE PREVIEW</span>
        <p>
          <strong>Your first 10 leads are free.</strong> Ten real, ranked
          prospects for your market — researched the same way as the rest of
          the list, no commitment to buy more.
        </p>
      </div>

      <form
        name="call-list-interest"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        className="rfp-form"
      >
        <input type="hidden" name="form-name" value="call-list-interest" />
        <p className="hp-field" aria-hidden="true">
          <label>
            Leave this field blank
            <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        <div className="form-grid">
          <div className="field">
            <label htmlFor="cl-name">Your name *</label>
            <input id="cl-name" name="name" type="text" required autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="cl-email">Work email *</label>
            <input id="cl-email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="cl-company">Company</label>
            <input id="cl-company" name="company" type="text" autoComplete="organization" />
          </div>
          <div className="field">
            <label htmlFor="cl-size">How many new conversations a month would actually move the needle?</label>
            <select id="cl-size" name="volume" defaultValue="">
              <option value="" disabled>
                Select one
              </option>
              <option value="Under 25">Under 25</option>
              <option value="25-100">25–100</option>
              <option value="100-500">100–500</option>
              <option value="500+">500+</option>
            </select>
          </div>
          <div className="field field-full">
            <label htmlFor="cl-who">Who are you trying to reach, and where?</label>
            <textarea
              id="cl-who"
              name="who"
              rows={3}
              placeholder="The industry and region — enough for us to tell you honestly whether it's researchable, not a full brief."
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Request my free 10-lead preview"}
        </button>
        {status === "error" && (
          <p className="form-error">
            Something went wrong on our end — please try again, or email us
            directly at kirby@36dunes.com.
          </p>
        )}
      </form>
    </>
  );
}
