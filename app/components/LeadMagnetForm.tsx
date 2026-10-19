"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { trackLead } from "../lib/analytics";

const UNLOCK_KEY = "36dunes-checklist-unlocked";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): boolean {
  try {
    return localStorage.getItem(UNLOCK_KEY) === "true";
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadMagnetForm({ children }: { children: React.ReactNode }) {
  const storedUnlocked = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [status, setStatus] = useState<Status>("idle");
  const unlocked = storedUnlocked || status === "success";

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
      trackLead("ai-readiness-checklist");
      try {
        localStorage.setItem(UNLOCK_KEY, "true");
      } catch {
        // ignore storage errors
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <form
      name="ai-readiness-checklist"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="lead-form"
    >
      <input type="hidden" name="form-name" value="ai-readiness-checklist" />
      <p className="hp-field" aria-hidden="true">
        <label>
          Leave this field blank
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="field">
        <label htmlFor="lead-name">Your name</label>
        <input id="lead-name" name="name" type="text" autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="lead-email">Email *</label>
        <input id="lead-email" name="email" type="email" required autoComplete="email" />
      </div>

      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Get the checklist"}
      </button>
      {status === "error" && (
        <p className="form-error">
          Something went wrong on our end — please try again, or email us at
          kirby@36dunes.com.
        </p>
      )}
    </form>
  );
}
