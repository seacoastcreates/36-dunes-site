"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type EngagementOption = { id: string; title: string };

type Status = "idle" | "submitting" | "error";

export default function NewInvoiceForm({
  clientId,
  engagements,
}: {
  clientId: string;
  engagements: EngagementOption[];
}) {
  const router = useRouter();
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
      engagementId: formData.get("engagementId"),
      description: formData.get("description"),
      amountDue: formData.get("amountDue"),
      dueDate: formData.get("dueDate") || undefined,
    };

    try {
      const response = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Failed to create invoice");
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

  if (engagements.length === 0) {
    return (
      <div className="auth-card">
        <h1>New invoice</h1>
        <p className="auth-note">This client needs an engagement before you can invoice them.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="auth-card">
      <h1>New invoice</h1>
      <div className="form-grid">
        <div className="field field-full">
          <label htmlFor="engagementId">Engagement *</label>
          <select id="engagementId" name="engagementId" required defaultValue="">
            <option value="" disabled>
              Select an engagement
            </option>
            {engagements.map((e) => (
              <option key={e.id} value={e.id}>
                {e.title}
              </option>
            ))}
          </select>
        </div>
        <div className="field field-full">
          <label htmlFor="description">Description *</label>
          <input id="description" name="description" type="text" required />
        </div>
        <div className="field">
          <label htmlFor="amountDue">Amount due (USD) *</label>
          <input id="amountDue" name="amountDue" type="number" min="1" step="0.01" required />
        </div>
        <div className="field">
          <label htmlFor="dueDate">Due date</label>
          <input id="dueDate" name="dueDate" type="date" />
        </div>
      </div>
      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Creating…" : "Create invoice"}
      </button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}
