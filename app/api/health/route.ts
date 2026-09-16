import { adminAuth } from "../../lib/firebase/admin";
import { getStripe } from "../../lib/stripe";

export async function GET() {
  const checks: Record<string, boolean> = {};

  try {
    // A cheap, harmless Admin SDK call that requires valid credentials to succeed.
    await adminAuth.listUsers(1);
    checks.firebaseAdmin = true;
  } catch {
    checks.firebaseAdmin = false;
  }

  try {
    getStripe(); // confirms the Stripe SDK imports/bundles cleanly and a key is configured
    checks.stripeConfigured = true;
  } catch {
    checks.stripeConfigured = false;
  }

  return Response.json({ ok: Object.values(checks).every(Boolean), checks });
}
