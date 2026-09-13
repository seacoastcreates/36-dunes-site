"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const CONSENT_KEY = "36dunes-cookie-consent";
const GA_ID = "G-P0LY70G6B3";

type Consent = "accepted" | "declined" | null;

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stored: Consent = null;
    try {
      stored = localStorage.getItem(CONSENT_KEY) as Consent;
    } catch {
      stored = null;
    }
    setConsent(stored);
    setReady(true);
  }, []);

  const choose = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // ignore storage errors (private browsing, etc.)
    }
    setConsent(value);
  };

  return (
    <>
      {consent === "accepted" && <GoogleAnalytics gaId={GA_ID} />}
      {ready && consent === null && (
        <div className="band cookie-banner" role="dialog" aria-label="Cookie consent">
          <p>
            We use cookies for basic site analytics — to see what pages get
            visited, nothing more.
          </p>
          <div className="cookie-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => choose("declined")}
            >
              Decline
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => choose("accepted")}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}
