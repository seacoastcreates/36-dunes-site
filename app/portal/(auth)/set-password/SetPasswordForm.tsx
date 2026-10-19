"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { updatePassword } from "firebase/auth";
import { auth } from "../../../lib/firebase/client";
import { establishPortalSession } from "../../../lib/auth-client";

type Status = "idle" | "submitting" | "error";

export default function SetPasswordForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = event.currentTarget;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;

    if (password.length < 8) {
      setStatus("error");
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setStatus("error");
      setError("Passwords don't match.");
      return;
    }

    try {
      await auth.authStateReady();
      const user = auth.currentUser;
      if (!user) throw new Error("Not signed in");
      await updatePassword(user, password);
      // Firebase revokes existing sessions on a password change, including the
      // portal cookie from the invite sign-in. Replace it with one minted from
      // the post-change token before saving.
      await establishPortalSession(await user.getIdToken(true));
      const response = await fetch("/api/portal/set-password", { method: "POST" });
      if (!response.ok) throw new Error("Failed to save");
      router.push("/portal");
      router.refresh();
    } catch {
      setStatus("error");
      setError("Couldn't set your password. Try signing in from your invite link again.");
    }
  };

  return (
    <div className="auth-card">
      <h1>Set your password</h1>
      <p className="auth-note">Choose a password to sign in with from now on.</p>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>
        <div className="field">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
          {status === "submitting" ? "Saving…" : "Save password"}
        </button>
      </form>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
