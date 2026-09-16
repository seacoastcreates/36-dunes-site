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
  try {
    const userRecord = await adminAuth.createUser({ email, emailVerified: false });
    uid = userRecord.uid;
  } catch (err: unknown) {
    const code = (err as { code?: string }).code;
    if (code === "auth/email-already-exists") {
      return Response.json({ error: "A client with this email already exists" }, { status: 409 });
    }
    return Response.json({ error: "Failed to create user" }, { status: 500 });
  }

  await adminDb
    .collection("clients")
    .doc(uid)
    .set({
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
      invitedAt: FieldValue.serverTimestamp(),
      lastLoginAt: null,
    });

  const inviteLink = await adminAuth.generateSignInWithEmailLink(email, {
    url: `${new URL(request.url).origin}/portal/invite`,
    handleCodeInApp: true,
  });

  return Response.json({ ok: true, clientId: uid, inviteLink });
}
