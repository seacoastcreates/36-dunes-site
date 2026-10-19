import "server-only";
import { redirect } from "next/navigation";
import { verifySession, type Session } from "./session";

function isAdminSession(session: Session | null): session is Session {
  const adminEmail = (process.env.ADMIN_EMAIL ?? "").toLowerCase();
  return !!session && session.emailVerified && !!adminEmail && session.email.toLowerCase() === adminEmail;
}

// For Server Components/pages — redirects unauthenticated/non-admin visitors to login.
export async function requireAdmin(): Promise<Session> {
  const session = await verifySession();
  if (!isAdminSession(session)) {
    redirect("/portal/login");
  }
  return session;
}

// For Route Handlers — a redirect would be silently followed by fetch() and
// break response.json() parsing on the client, so this returns null instead
// and callers respond with a proper 401 JSON.
export async function requireAdminApi(): Promise<Session | null> {
  const session = await verifySession();
  return isAdminSession(session) ? session : null;
}
