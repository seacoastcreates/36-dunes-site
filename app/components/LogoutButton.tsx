"use client";

import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase/client";

export default function LogoutButton() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    if (pending) return;
    setPending(true);
    setError(null);
    try {
      // The server cookie controls dashboard access. Clear it even if the
      // browser's Firebase session is missing or its local sign-out fails.
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });
      if (!response.ok) throw new Error("Logout failed");
      await signOut(auth).catch(() => undefined);
      // Discard cached authenticated pages and let the server read the
      // cleared cookie, rather than navigating through the App Router cache.
      window.location.replace("/portal/login");
    } catch {
      setPending(false);
      setError("Couldn’t log out. Please try again.");
    }
  };

  return (
    <div className="logout-control">
      <button type="button" className="btn btn-ghost" onClick={handleLogout} disabled={pending}>
        {pending ? "Logging out…" : "Log out"}
      </button>
      {error && <p className="form-error" role="alert">{error}</p>}
    </div>
  );
}
