"use client";

import { useState, useSyncExternalStore } from "react";
import Script from "next/script";
import { updateAnalyticsConsent } from "../lib/analytics";

const CONSENT_KEY = "36dunes-cookie-consent";
const GA_ID = "G-P0LY70G6B3";

// Google Consent Mode v2: gtag loads for every visitor, but analytics
// cookies stay off until the visitor accepts. Until then GA receives only
// cookieless pings, which it uses to model the traffic it can't see.
// Ad signals are always denied; the site runs no ads.
const GA_BOOTSTRAP = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var accepted = false;
try { accepted = localStorage.getItem(${JSON.stringify(CONSENT_KEY)}) === "accepted"; } catch (e) {}
gtag("consent", "default", {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: accepted ? "granted" : "denied"
});
gtag("js", new Date());
gtag("config", ${JSON.stringify(GA_ID)});
`;

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
    updateAnalyticsConsent(value === "accepted");
    setOverride(value);
  };

  return (
    <>
      <Script id="ga-consent" strategy="afterInteractive">
        {GA_BOOTSTRAP}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      {consent === null && (
        <div className="band cookie-banner" role="dialog" aria-label="Cookie consent">
          <p>
            We use cookies for basic site analytics — to see what pages get
            visited, nothing more. Decline and we only count anonymous,
            cookie-free visits.
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
