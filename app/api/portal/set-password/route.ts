import { verifySession } from "../../../lib/session";
import { adminAuth, adminDb } from "../../../lib/firebase/admin";

export async function POST() {
  const session = await verifySession();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await adminAuth.getUser(session.uid);
  if (!user.providerData.some((provider) => provider.providerId === "password")) {
    return Response.json({ error: "Set a password before continuing." }, { status: 400 });
  }
  const activated = await adminDb.runTransaction(async (tx) => {
    const ref = adminDb.collection("clients").doc(session.uid);
    const client = await tx.get(ref);
    if (!client.exists || !["invited", "active"].includes(client.data()?.status)) return false;
    tx.update(ref, { passwordSet: true, status: "active" });
    return true;
  });
  if (!activated) return Response.json({ error: "Account unavailable." }, { status: 403 });
  return Response.json({ ok: true });
}
