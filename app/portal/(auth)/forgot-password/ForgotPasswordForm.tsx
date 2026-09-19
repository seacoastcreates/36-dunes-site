"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../lib/firebase/client";

type Status = "idle" | "submitting" | "sent" | "error";

export default function ForgotPasswordForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    try {
      await sendPasswordResetEmail(auth, email);
      setStatus("sent");
    } catch (err: unknown) {
      // Don't reveal whether the email has an account — show the same
      // success state either way so this can't be used to enumerate clients.
      const code = (err as { code?: string })?.code;
      if (code === "auth/user-not-found" || code === "auth/invalid-email") {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    }
  };

  if (status === "sent") {
    return (
      <div className="auth-card">
        <h1>Check your email</h1>
        <p className="auth-note">
          If an account exists for that address, we&apos;ve sent a link to
          reset your password.
        </p>
        <div className="auth-form">
          <Link className="btn btn-ghost" href="/portal/login">
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <h1>Reset your password</h1>
      <p className="auth-note">
        Enter the email address on your account and we&apos;ll send you a
        link to reset your password.
      </p>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send reset link"}
        </button>
      </form>
      {status === "error" && (
        <p className="form-error">Something went wrong — please try again.</p>
      )}
      <div className="auth-divider">or</div>
      <Link className="btn btn-ghost" href="/portal/login">
        Back to sign in
      </Link>
    </div>
  );
}
