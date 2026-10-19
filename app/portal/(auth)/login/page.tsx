import type { Metadata } from "next";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";
import { verifySession } from "../../../lib/session";
import { requireAdminApi } from "../../../lib/admin-guard";
import { adminDb } from "../../../lib/firebase/admin";

export const metadata: Metadata = {
  title: "Sign in — 36 Dunes",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await requireAdminApi()) redirect("/admin");
  const session = await verifySession();
  if (session) {
    const client = await adminDb.collection("clients").doc(session.uid).get();
    if (client.data()?.status === "active") redirect("/portal");
    if (client.data()?.status === "invited") redirect("/portal/set-password");
  }
  return <LoginForm />;
}
