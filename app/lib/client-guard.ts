import "server-only";
import { redirect } from "next/navigation";
import { verifySession, type Session } from "./session";
import { adminDb } from "./firebase/admin";

export type ClientRecord = {
  id: string;
  businessName: string;
  contactName: string;
  displayName: string;
  email: string;
  status: string;
  passwordSet: boolean;
};

// For Server Components/pages under the authenticated /portal area — redirects
// to login if there's no session or the client's Firestore record is gone.
export async function requireClient(): Promise<{ session: Session; client: ClientRecord }> {
  const session = await verifySession();
  if (!session) redirect("/portal/login");

  const doc = await adminDb.collection("clients").doc(session.uid).get();
  if (!doc.exists) redirect("/portal/login");

  const data = doc.data()!;
  if (data.status === "disabled" || data.status === "suspended") redirect("/portal/login");
  if (data.status !== "active") redirect("/portal/set-password");
  return {
    session,
    client: {
      id: doc.id,
      businessName: data.businessName ?? "",
      contactName: data.contactName ?? "",
      displayName: data.displayName || data.contactName || session.email.split("@")[0],
      email: data.email ?? "",
      status: data.status ?? "invited",
      passwordSet: !!data.passwordSet,
    },
  };
}
