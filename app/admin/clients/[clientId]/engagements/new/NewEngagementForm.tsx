"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { RetainerPlan } from "../../../../../lib/stripe/retainerPlans";

type Status = "idle" | "submitting" | "error";

export default function NewEngagementForm({
  clientId,
  retainerPlans,
}: {
  clientId: string;
  retainerPlans: RetainerPlan[];
}) {
  const router = useRouter();
  const [type, setType] = useState<"one_time" | "retainer">("one_time");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = {
      clientId,
      title: formData.get("title"),
      summary: formData.get("summary"),
      type,
      amountTotal: type === "one_time" ? formData.get("amountTotal") : undefined,
      stripePriceId: type === "retainer" ? formData.get("stripePriceId") : undefined,
    };

    try {
      const response = await fetch("/api/admin/engagements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Failed to create engagement");
        setStatus("error");
        return;
      }
      router.push(`/admin/clients/${clientId}`);
      router.refresh();
    } catch {
      setError("Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-card">
      <h1>New engagement</h1>
      <div className="form-grid">
        <div className="field field-full">
          <label htmlFor="title">Title *</label>
          <input id="title" name="title" type="text" required />
        </div>
        <div className="field field-full">
          <label htmlFor="summary">Summary</label>
          <textarea id="summary" name="summary" rows={3} />
        </div>
        <div className="field field-full">
          <label htmlFor="type">Type *</label>
          <select
            id="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value as "one_time" | "retainer")}
          >
            <option value="one_time">One-time project</option>
            <option value="retainer">Recurring retainer</option>
          </select>
        </div>
        {type === "one_time" ? (
          <div className="field field-full">
            <label htmlFor="amountTotal">Total amount (USD) *</label>
            <input id="amountTotal" name="amountTotal" type="number" min="1" step="0.01" required />
          </div>
        ) : (
          <div className="field field-full">
            <label htmlFor="stripePriceId">Retainer plan *</label>
            <select id="stripePriceId" name="stripePriceId" required defaultValue="">
              <option value="" disabled>
                Select a plan
              </option>
              {retainerPlans.map((plan) => (
                <option key={plan.priceId} value={plan.priceId}>
                  {plan.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Creating…" : "Create engagement"}
      </button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}
