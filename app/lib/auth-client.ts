const destinations = new Set(["/portal", "/portal/set-password", "/admin"]);

export async function establishPortalSession(idToken: string): Promise<string> {
  const response = await fetch("/api/auth/session", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(result?.error ?? "We couldn’t start your client session. Please try again.");
  }
  if (!destinations.has(result?.redirectTo)) {
    throw new Error("We couldn’t open your dashboard. Please try signing in again.");
  }
  return result.redirectTo;
}

export function signInErrorMessage(error: unknown) {
  const code = (error as { code?: string })?.code;
  switch (code) {
    case "auth/popup-blocked": return "Your browser blocked the Google sign-in window. Allow pop-ups for this site, then try again.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request": return "Google sign-in was canceled. Choose Continue with Google to try again.";
    case "auth/unauthorized-domain": return "Google sign-in is not configured for this website address yet. Contact 36 Dunes for help.";
    case "auth/operation-not-allowed": return "Google sign-in is not enabled yet. Sign in with your email and password, or contact 36 Dunes.";
    case "auth/network-request-failed": return "Couldn’t reach the sign-in service. Check your connection and try again.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
    case "auth/invalid-email": return "Incorrect email or password. Please try again.";
    case "auth/too-many-requests": return "Too many sign-in attempts. Please wait a moment and try again.";
    case "auth/user-disabled": return "Your account is unavailable. Contact 36 Dunes for help.";
    default: return !code && error instanceof Error ? error.message : "Couldn’t sign in. Please try again or contact 36 Dunes.";
  }
}
