// Thin wrappers around gtag, which CookieConsent loads on every page with
// Consent Mode defaults. Calls are no-ops if the script hasn't loaded or is
// blocked, so forms never depend on analytics succeeding.

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export function updateAnalyticsConsent(granted: boolean) {
  window.gtag?.("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  });
}

// GA4's recommended lead event. Mark generate_lead as a key event in GA, and
// register form_name as an event-scoped custom dimension to split by form.
export function trackLead(formName: string) {
  window.gtag?.("event", "generate_lead", { form_name: formName });
}
