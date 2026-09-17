"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "../../../lib/firebase/client";

type Status = "checking" | "needs-email" | "submitting" | "invalid" | "error";

async function establishSession(idToken: string) {
  const response = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  if (!response.ok) throw new Error("Failed to establish session");
}

export default function InviteForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("checking");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // window.location.href is only available client-side, so this can't be
    // computed during render without a server/client markup mismatch —
    // hence the mount-only effect instead of deriving state in the render body.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus(isSignInWithEmailLink(auth, window.location.href) ? "needs-email" : "invalid");
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = event.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    try {
      const result = await signInWithEmailLink(auth, email, window.location.href);
      const idToken = await result.user.getIdToken();
      await establishSession(idToken);
      router.push("/portal/set-password");
      router.refresh();
    } catch {
      setStatus("error");
      setError("That email doesn't match this invite, or the link has expired.");
    }
  };

  if (status === "checking") return null;

  if (status === "invalid") {
    return (
      <div className="auth-card">
        <h1>Invite link invalid</h1>
        <p className="auth-note">
          This link has already been used or has expired. Ask 36 Dunes to send a new one.
        </p>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <h1>Confirm your email</h1>
      <p className="auth-note">Enter the email address this invite was sent to.</p>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
          {status === "submitting" ? "Confirming…" : "Continue"}
        </button>
      </form>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
