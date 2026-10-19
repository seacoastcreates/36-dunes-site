"use client";

import { useState } from "react";

export default function InvoicePaymentButton({ invoiceId }: { invoiceId: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pay() {
    setPending(true);
    setError(null);
    try {
      const response = await fetch(`/api/portal/invoices/${encodeURIComponent(invoiceId)}/checkout`, { method: "POST" });
      const result = await response.json();
      if (!response.ok || !result.url) throw new Error(result.error ?? "Couldn't open checkout.");
      window.location.assign(result.url);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Couldn't open checkout.");
      setPending(false);
    }
  }

  return <div>
    <button className="btn btn-primary" onClick={pay} disabled={pending}>
      {pending ? "Opening secure checkout…" : "Pay securely with Stripe"}
    </button>
    {error && <p className="form-error" role="alert">{error}</p>}
  </div>;
}
