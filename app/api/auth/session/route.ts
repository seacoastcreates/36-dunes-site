import { FieldValue } from "firebase-admin/firestore";
import type { DecodedIdToken } from "firebase-admin/auth";
import { adminAuth, adminDb } from "../../../lib/firebase/admin";
import { createSessionCookie } from "../../../lib/session";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const idToken = body?.idToken;
  if (typeof idToken !== "string" || !idToken) {
    return Response.json({ error: "Missing sign-in token." }, { status: 400 });
  }

  let token: DecodedIdToken;
  try {
    token = await adminAuth.verifyIdToken(idToken, true);
  } catch {
    return Response.json({ error: "Your sign-in has expired. Please sign in again." }, { status: 401 });
  }
  if (!token.email || Date.now() / 1000 - token.auth_time > 5 * 60) {
    return Response.json({ error: "Please sign in again." }, { status: 401 });
  }

  try {
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const isAdmin = !!token.email_verified && !!adminEmail && token.email.toLowerCase() === adminEmail;
    let redirectTo = "/admin";
    if (!isAdmin) {
      const ref = adminDb.collection("clients").doc(token.uid);
      const result = await adminDb.runTransaction(async (tx) => {
        const client = await tx.get(ref);
        const data = client.data();
        if (!data) return { error: "This Google account or email has not been invited yet. Use the email on your invitation, or contact 36 Dunes.", status: 403 };
        if (!["active", "invited"].includes(data.status)) {
          return { error: "Your client account is unavailable. Contact 36 Dunes for help.", status: 403 };
        }
        if (typeof data.email !== "string" || data.email.toLowerCase() !== token.email!.toLowerCase()) {
          return { error: "Your sign-in email doesn’t match your client account. Contact 36 Dunes for help.", status: 403 };
        }
        // A verified Google identity already proves ownership of the invited
        // address. These clients do not need to create a separate password.
        const googleVerified = !!token.email_verified && (
          token.firebase.sign_in_provider === "google.com" || !!token.firebase.identities["google.com"]?.length
        );
        const active = data.status === "active" || googleVerified || data.passwordSet === true;
        const update: Record<string, unknown> = { lastLoginAt: FieldValue.serverTimestamp() };
        if (active) update.status = "active";
        if (googleVerified && typeof token.name === "string" && token.name.trim()) {
          update.displayName = token.name.trim().slice(0, 200);
        }
        tx.update(ref, update);
        return { redirectTo: active ? "/portal" : "/portal/set-password" };
      });
      if ("error" in result) return Response.json({ error: result.error }, { status: result.status });
      redirectTo = result.redirectTo;
    }
    await createSessionCookie(idToken);
    return Response.json({ ok: true, redirectTo }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "We couldn’t start your client session. Please try again in a moment." }, { status: 503 });
  }
}
