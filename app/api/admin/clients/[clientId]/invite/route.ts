import { requireAdminApi } from "../../../../../lib/admin-guard";
import { adminAuth, adminDb } from "../../../../../lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";

// Separate from client creation deliberately: generateSignInWithEmailLink has
// shown intermittent "Domain not allowlisted" failures specifically when
// called from Netlify's function environment (never reproduced locally,
// same credentials, same domain — see commit history for the investigation).
// Automatic in-request retries didn't help since the failure is consistent
// per-container, not per-call. Keeping this callable independently means a
// flaky call never blocks the (always-reliable) user/Firestore creation, and
// gives the admin a plain "try again" button instead of guessing server-side.
export async function POST(request: Request, { params }: { params: Promise<{ clientId: string }> }) {
  const admin = await requireAdminApi();
  if (!admin) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { clientId } = await params;
  const clientDoc = await adminDb.collection("clients").doc(clientId).get();
  if (!clientDoc.exists) {
    return Response.json({ error: "Client not found" }, { status: 404 });
  }
  const email = clientDoc.data()?.email;
  if (!email) {
    return Response.json({ error: "Client has no email on file" }, { status: 400 });
  }

  try {
    const inviteLink = await adminAuth.generateSignInWithEmailLink(email, {
      url: `${new URL(request.url).origin}/portal/invite`,
      handleCodeInApp: true,
    });
    await clientDoc.ref.update({ invitedAt: FieldValue.serverTimestamp() });
    return Response.json({ ok: true, inviteLink });
  } catch (err: unknown) {
    return Response.json(
      { error: "Failed to generate invite link", detail: String((err as Error)?.message ?? err) },
      { status: 500 }
    );
  }
}
