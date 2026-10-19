import type Stripe from "stripe";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "../../../lib/firebase/admin";
import { getStripe } from "../../../lib/stripe";
import { matchesInvoicePayment, paymentConfiguration } from "../../../lib/payment-policy";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !process.env.STRIPE_SECRET_KEY) return Response.json({ error: "Webhook not configured." }, { status: 503 });
  const signature = request.headers.get("stripe-signature");
  if (!signature) return Response.json({ error: "Missing signature." }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, secret);
  } catch {
    return Response.json({ error: "Invalid signature." }, { status: 400 });
  }
  // Continue reconciling accepted payments even when new checkouts are disabled.
  if (event.livemode !== paymentConfiguration(process.env).live) {
    return Response.json({ error: "Stripe mode mismatch." }, { status: 400 });
  }
  if (event.type !== "checkout.session.completed" && event.type !== "checkout.session.async_payment_succeeded") {
    return Response.json({ received: true });
  }
  const payment = event.data.object as Stripe.Checkout.Session;
  const { clientId, invoiceId, attemptId } = payment.metadata ?? {};
  // Ignore other Checkout integrations in the same Stripe account.
  if (!clientId || !invoiceId || !attemptId || payment.payment_status !== "paid") return Response.json({ received: true });
  if (![clientId, invoiceId].every((id) => /^[\w-]{1,128}$/.test(id))) return Response.json({ error: "Invalid reference." }, { status: 400 });

  try {
    await adminDb.runTransaction(async (tx) => {
      const eventRef = adminDb.collection("stripeEvents").doc(event.id);
      const clientRef = adminDb.collection("clients").doc(clientId);
      const invoiceRef = clientRef.collection("invoices").doc(invoiceId);
      const [seen, client, invoiceDoc] = await Promise.all([tx.get(eventRef), tx.get(clientRef), tx.get(invoiceRef)]);
      if (seen.exists) return;
      const invoice = invoiceDoc.data();
      if (!invoice || !matchesInvoicePayment(invoice, payment)
        || payment.client_reference_id !== clientId
        || payment.customer !== client.data()?.stripeCustomerId
        || invoice.checkoutAttempt?.id !== attemptId) {
        throw new Error("Payment does not match invoice");
      }
      if (invoice.status !== "paid") {
        tx.update(invoiceRef, {
          status: "paid",
          paidAt: FieldValue.serverTimestamp(),
          stripePaymentIntentId: typeof payment.payment_intent === "string" ? payment.payment_intent : payment.payment_intent?.id ?? null,
          stripeCheckoutSessionId: payment.id,
        });
      }
      tx.create(eventRef, { type: event.type, clientId, invoiceId, processedAt: FieldValue.serverTimestamp() });
    });
    return Response.json({ received: true });
  } catch (error) {
    console.error("Stripe reconciliation failed", event.id, error instanceof Error ? error.name : "UnknownError");
    return Response.json({ error: "Payment reconciliation failed." }, { status: 500 });
  }
}
