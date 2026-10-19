// Kept independent of server SDKs so the money and configuration rules can be tested.
export function paymentConfiguration(env: Record<string, string | undefined>) {
  const live = env.STRIPE_SECRET_KEY?.startsWith("sk_live_") ?? false;
  let origin: string | null = null;
  try {
    const url = new URL(env.SITE_URL ?? "");
    if (url.protocol === "https:" || (!live && url.protocol === "http:" && url.hostname === "localhost")) {
      if (!url.username && !url.password && url.pathname === "/" && !url.search && !url.hash) origin = url.origin;
    }
  } catch { /* A missing or malformed URL leaves payments disabled. */ }

  const ready = env.PAYMENTS_ENABLED === "true"
    && /^sk_(test|live)_.+/.test(env.STRIPE_SECRET_KEY ?? "")
    && /^whsec_.+/.test(env.STRIPE_WEBHOOK_SECRET ?? "")
    && !!origin
    && ["NEXT_PUBLIC_FIREBASE_API_KEY", "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
      "NEXT_PUBLIC_FIREBASE_APP_ID", "FIREBASE_ADMIN_PROJECT_ID", "FIREBASE_ADMIN_CLIENT_EMAIL", "FIREBASE_ADMIN_PRIVATE_KEY", "ADMIN_EMAIL"]
      .every((name) => !!env[name]?.trim())
    && env.NEXT_PUBLIC_FIREBASE_PROJECT_ID === env.FIREBASE_ADMIN_PROJECT_ID
    && (!live || env.STRIPE_LIVE_PAYMENTS_ENABLED === "true");
  return { ready, live, origin };
}

export function payableInvoice(invoice: { status?: unknown; amountDue?: unknown; currency?: unknown }) {
  return invoice.status === "sent"
    && typeof invoice.amountDue === "number"
    && Number.isSafeInteger(invoice.amountDue)
    && invoice.amountDue >= 50
    && invoice.amountDue <= 99_999_999
    && invoice.currency === "usd";
}

export function matchesInvoicePayment(
  invoice: { amountDue?: unknown; currency?: unknown },
  payment: { mode: string | null; payment_status: string; amount_total: number | null; currency: string | null },
) {
  return payment.mode === "payment" && payment.payment_status === "paid"
    && payment.amount_total === invoice.amountDue && payment.currency === invoice.currency;
}
