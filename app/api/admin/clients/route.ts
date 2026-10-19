import { requireAdminApi } from "../../../lib/admin-guard";
import { adminAuth, adminDb } from "../../../lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(request: Request) {
  const admin = await requireAdminApi();
  if (!admin) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const businessName = String(body.businessName ?? "").trim();
  const contactName = String(body.contactName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = body.phone ? String(body.phone).trim() : null;

  if (!businessName || !contactName || !email) {
    return Response.json(
      { error: "businessName, contactName, and email are required" },
      { status: 400 }
    );
  }

  let uid: string;
  let createdAuthUser = false;
  try {
    const userRecord = await adminAuth.createUser({ email, emailVerified: false });
    uid = userRecord.uid;
    createdAuthUser = true;
  } catch (err: unknown) {
    const code = (err as { code?: string }).code;
    if (code === "auth/email-already-exists") {
      // Google sign-in can create an Auth identity before the admin invitation.
      // Reuse that UID so its future sign-ins resolve to this client's data.
      try {
        const existingUser = await adminAuth.getUserByEmail(email);
        if (existingUser.disabled) return Response.json({ error: "This user account is disabled" }, { status: 409 });
        uid = existingUser.uid;
      } catch {
        return Response.json({ error: "Failed to find the existing user" }, { status: 500 });
      }
    } else {
      return Response.json({ error: "Failed to create user" }, { status: 500 });
    }
  }

  try {
    await adminDb
      .collection("clients")
      .doc(uid)
      .create({
        businessName,
        contactName,
        email,
        phone,
        status: "invited",
        stripeCustomerId: null,
        passwordSet: false,
        notes: "",
        createdAt: FieldValue.serverTimestamp(),
        createdBy: admin.email,
        invitedAt: null,
        lastLoginAt: null,
      });
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 6) {
      return Response.json({ error: "A client with this email already exists" }, { status: 409 });
    }
    // Never delete a reused Google identity or an account whose Firestore
    // write may have succeeded despite a timeout response.
    if (createdAuthUser) {
      const record = await adminDb.collection("clients").doc(uid).get().catch(() => null);
      if (record && !record.exists) await adminAuth.deleteUser(uid).catch(() => undefined);
    }
    return Response.json(
      { error: "Firestore write failed", detail: String((err as Error)?.message ?? err) },
      { status: 500 }
    );
  }

  return Response.json({ ok: true, clientId: uid });
}
