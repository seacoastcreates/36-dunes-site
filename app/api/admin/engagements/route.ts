import { requireAdminApi } from "../../../lib/admin-guard";
import { adminDb } from "../../../lib/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";
import { retainerPlans } from "../../../lib/stripe/retainerPlans";

export async function POST(request: Request) {
  const admin = await requireAdminApi();
  if (!admin) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const clientId = String(body.clientId ?? "");
  const title = String(body.title ?? "").trim();
  const summary = String(body.summary ?? "").trim();
  const type = body.type === "retainer" ? "retainer" : "one_time";

  if (!clientId || !title) {
    return Response.json({ error: "clientId and title are required" }, { status: 400 });
  }

  const clientDoc = await adminDb.collection("clients").doc(clientId).get();
  if (!clientDoc.exists) {
    return Response.json({ error: "Client not found" }, { status: 404 });
  }

  const data: Record<string, unknown> = {
    title,
    summary,
    type,
    status: "active",
    currency: "usd",
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    createdBy: admin.email,
  };

  if (type === "one_time") {
    const amountTotal = Math.round(Number(body.amountTotal) * 100);
    if (!Number.isFinite(amountTotal) || amountTotal <= 0) {
      return Response.json({ error: "amountTotal must be a positive number" }, { status: 400 });
    }
    data.amountTotal = amountTotal;
  } else {
    const plan = retainerPlans.find((p) => p.priceId === body.stripePriceId);
    if (!plan) {
      return Response.json({ error: "Unknown retainer plan" }, { status: 400 });
    }
    data.stripePriceId = plan.priceId;
  }

  const engagementRef = await adminDb
    .collection("clients")
    .doc(clientId)
    .collection("engagements")
    .add(data);

  return Response.json({ ok: true, engagementId: engagementRef.id });
}
