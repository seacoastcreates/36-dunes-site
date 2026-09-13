"use client";

import { useState, useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const CONSENT_KEY = "36dunes-cookie-consent";
const GA_ID = "G-P0LY70G6B3";

type Consent = "accepted" | "declined" | null;

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): Consent {
  try {
    return localStorage.getItem(CONSENT_KEY) as Consent;
  } catch {
    return null;
  }
}

function getServerSnapshot(): Consent {
  return null;
}

export default function CookieConsent() {
  const storedConsent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [override, setOverride] = useState<Consent>(null);
  const consent = override ?? storedConsent;

  const choose = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // ignore storage errors (private browsing, etc.)
    }
    setOverride(value);
  };

  return (
    <>
      {consent === "accepted" && <GoogleAnalytics gaId={GA_ID} />}
      {consent === null && (
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
