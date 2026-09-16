"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import InviteLinkButton from "../../components/InviteLinkButton";

type Status = "idle" | "submitting" | "error";

export default function NewClientForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = {
      businessName: formData.get("businessName"),
      contactName: formData.get("contactName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    try {
      const response = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Failed to create client");
        setStatus("error");
        return;
      }
      setClientId(data.clientId);
      setStatus("idle");
    } catch {
      setError("Something went wrong.");
      setStatus("error");
    }
  };

  if (clientId) {
    return (
      <div className="auth-card">
        <h1>Client created</h1>
        <p className="auth-note">
          Send this invite link to your client — it signs them in and takes them straight to
          setting a password. It only works once.
        </p>
        <InviteLinkButton clientId={clientId} autoGenerate />
        <div className="auth-form">
          <Link className="btn btn-ghost" href={`/admin/clients/${clientId}`}>
            Go to client →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="auth-card">
      <h1>New client</h1>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="businessName">Business name *</label>
          <input id="businessName" name="businessName" type="text" required />
        </div>
        <div className="field">
          <label htmlFor="contactName">Contact name *</label>
          <input id="contactName" name="contactName" type="text" required />
        </div>
        <div className="field field-full">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="field field-full">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" />
        </div>
      </div>
      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Creating…" : "Create client"}
      </button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}
