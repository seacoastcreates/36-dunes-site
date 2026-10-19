import { FieldValue } from "firebase-admin/firestore";
import { requireAdminApi } from "../../../../../../lib/admin-guard";
import { adminDb } from "../../../../../../lib/firebase/admin";
import { projectStatuses } from "../../../../../../lib/portal/format";

export async function PATCH(request: Request, { params }: { params: Promise<{ clientId: string; engagementId: string }> }) {
  const admin = await requireAdminApi();
  if (!admin) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { clientId, engagementId } = await params;
  if (![clientId, engagementId].every((id) => /^[\w-]{1,128}$/.test(id))) {
    return Response.json({ error: "Invalid project reference." }, { status: 400 });
  }
  const body = await request.json().catch(() => null);
  if (!body || !projectStatuses.includes(body.status) || typeof body.summary !== "string" || body.summary.length > 10000) {
    return Response.json({ error: "Choose a project status and a summary of at most 10,000 characters." }, { status: 400 });
  }
  const ref = adminDb.collection("clients").doc(clientId).collection("engagements").doc(engagementId);
  const updated = await adminDb.runTransaction(async (tx) => {
    const project = await tx.get(ref);
    if (!project.exists) return false;
    tx.update(ref, { status: body.status, summary: body.summary.trim(), updatedAt: FieldValue.serverTimestamp(), updatedBy: admin.email });
    return true;
  });
  return updated ? Response.json({ ok: true }) : Response.json({ error: "Project not found." }, { status: 404 });
}
