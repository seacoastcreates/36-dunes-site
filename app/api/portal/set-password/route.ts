import { verifySession } from "../../../lib/session";
import { adminDb } from "../../../lib/firebase/admin";

export async function POST() {
  const session = await verifySession();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await adminDb.collection("clients").doc(session.uid).update({ passwordSet: true });
  return Response.json({ ok: true });
}
