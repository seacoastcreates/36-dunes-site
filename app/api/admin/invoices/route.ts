import { requireAdminApi } from "../../../lib/admin-guard";
import { adminDb } from "../../../lib/firebase/admin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

export async function POST(request: Request) {
  const admin = await requireAdminApi();
  if (!admin) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const clientId = String(body.clientId ?? "");
  const engagementId = String(body.engagementId ?? "");
  const description = String(body.description ?? "").trim();
  const amountDue = Math.round(Number(body.amountDue) * 100);
  const dueDate = body.dueDate ? String(body.dueDate) : null;

  if (!clientId || !engagementId || !description) {
    return Response.json(
      { error: "clientId, engagementId, and description are required" },
      { status: 400 }
    );
  }
  if (!Number.isSafeInteger(amountDue) || amountDue < 50 || amountDue > 99_999_999) {
    return Response.json({ error: "amountDue must be between $0.50 and $999,999.99" }, { status: 400 });
  }

  const engagementDoc = await adminDb
    .collection("clients")
    .doc(clientId)
    .collection("engagements")
    .doc(engagementId)
    .get();
  if (!engagementDoc.exists) {
    return Response.json({ error: "Engagement not found" }, { status: 404 });
  }

  const invoiceRef = await adminDb
    .collection("clients")
    .doc(clientId)
    .collection("invoices")
    .add({
      engagementId,
      description,
      amountDue,
      currency: "usd",
      status: "sent",
      stripeCheckoutSessionId: null,
      stripePaymentIntentId: null,
      dueDate: dueDate ? Timestamp.fromDate(new Date(dueDate)) : null,
      createdAt: FieldValue.serverTimestamp(),
      sentAt: FieldValue.serverTimestamp(),
      paidAt: null,
    });

  return Response.json({ ok: true, invoiceId: invoiceRef.id });
}
