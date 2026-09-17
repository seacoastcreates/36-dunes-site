import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { verifySession } from "../../../lib/session";
import SetPasswordForm from "./SetPasswordForm";

export const metadata: Metadata = {
  title: "Set your password — 36 Dunes",
  robots: { index: false, follow: false },
};

export default async function SetPasswordPage() {
  const session = await verifySession();
  if (!session) redirect("/portal/login");

  return <SetPasswordForm />;
}
