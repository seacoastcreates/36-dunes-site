"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  linkWithCredential,
  type AuthCredential,
} from "firebase/auth";
import { auth, googleProvider } from "../../../lib/firebase/client";

type Status = "idle" | "submitting" | "error";

async function establishSession(idToken: string) {
  const response = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  if (!response.ok) throw new Error("Failed to establish session");
}

export default function LoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  // Holds a pending Google credential while we ask for the existing
  // password to link the two sign-in methods onto one account.
  const [pendingGoogleCredential, setPendingGoogleCredential] = useState<AuthCredential | null>(
    null
  );
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  const handlePasswordLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = event.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      if (pendingGoogleCredential) {
        // Resolving an account-exists-with-different-credential case: sign
        // in with the password first, then link the Google credential onto
        // the same account so both methods work from now on.
        const result = await signInWithEmailAndPassword(auth, email, password);
        await linkWithCredential(result.user, pendingGoogleCredential);
        const idToken = await result.user.getIdToken();
        await establishSession(idToken);
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await result.user.getIdToken();
        await establishSession(idToken);
      }
      router.push("/portal");
      router.refresh();
    } catch {
      setStatus("error");
      setError("Incorrect email or password.");
    }
  };

  const handleGoogleLogin = async () => {
    setStatus("submitting");
    setError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      await establishSession(idToken);
      router.push("/portal");
      router.refresh();
    } catch (err: unknown) {
      const authError = err as { code?: string; customData?: { email?: string } };
      if (authError.code === "auth/account-exists-with-different-credential") {
        const credential = GoogleAuthProvider.credentialFromError(
          err as Parameters<typeof GoogleAuthProvider.credentialFromError>[0]
        );
        setPendingGoogleCredential(credential);
        setPendingEmail(authError.customData?.email ?? null);
        setStatus("idle");
        setError(
          "An account already exists with this email. Sign in with your password below to link Google to it."
        );
      } else {
        setStatus("error");
        setError("Google sign-in failed.");
      }
    }
  };

  return (
    <div className="auth-card">
      <h1>Sign in</h1>

      {pendingGoogleCredential ? (
        <p className="auth-note">
          Sign in with your password for {pendingEmail} to link Google to this account.
        </p>
      ) : null}

      <form onSubmit={handlePasswordLogin} className="auth-form">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
          {status === "submitting" ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="auth-links">
        <Link className="back-link" href="/portal/forgot-password">
          Forgot password?
        </Link>
      </p>

      {!pendingGoogleCredential && (
        <>
          <div className="auth-divider">or</div>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleGoogleLogin}
            disabled={status === "submitting"}
          >
            Continue with Google
          </button>
        </>
      )}

      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
