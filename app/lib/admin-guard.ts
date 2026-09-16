import "server-only";
import { redirect } from "next/navigation";
import { verifySession, type Session } from "./session";

export async function requireAdmin(): Promise<Session> {
  const session = await verifySession();
  const adminEmail = (process.env.ADMIN_EMAIL ?? "").toLowerCase();

  if (!session || !adminEmail || session.email.toLowerCase() !== adminEmail) {
    redirect("/portal/login");
  }

  return session;
}
