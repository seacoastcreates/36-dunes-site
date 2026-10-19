import { adminAuth, adminDb } from "../../lib/firebase/admin";
import { getStripe } from "../../lib/stripe";
import { requireAdminApi } from "../../lib/admin-guard";
import { paymentConfiguration } from "../../lib/payment-policy";

export async function GET() {
  if (!await requireAdminApi()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const checks: Record<string, boolean> = {};

  try {
    // A cheap, harmless Admin SDK call that requires valid credentials to succeed.
    await adminAuth.listUsers(1);
    checks.firebaseAdmin = true;
  } catch {
    checks.firebaseAdmin = false;
  }

  try {
    await adminDb.collection("clients").limit(1).get();
    checks.firestore = true;
  } catch {
    checks.firestore = false;
  }

  try {
    const account = await getStripe().accounts.retrieve(null);
    checks.stripeConnected = true;
    checks.stripeAccountReady = !paymentConfiguration(process.env).live || !!(account.charges_enabled && account.details_submitted);
  } catch {
    checks.stripeConnected = false;
  }

  checks.paymentsEnabled = paymentConfiguration(process.env).ready;
  const ok = Object.values(checks).every(Boolean);
  return Response.json({ ok, checks }, { status: ok ? 200 : 503, headers: { "Cache-Control": "no-store" } });
}
