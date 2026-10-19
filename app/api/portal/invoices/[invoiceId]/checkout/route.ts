import { randomUUID } from "node:crypto";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminDb } from "../../../../../lib/firebase/admin";
import { verifySession } from "../../../../../lib/session";
import { getStripe } from "../../../../../lib/stripe";
import { payableInvoice, paymentConfiguration } from "../../../../../lib/payment-policy";

export const runtime = "nodejs";

export async function POST(_request: Request, { params }: { params: Promise<{ invoiceId: string }> }) {
  const session = await verifySession();
  if (!session) return Response.json({ error: "Sign in to pay this invoice." }, { status: 401 });

  const config = paymentConfiguration(process.env);
  if (!config.ready) return Response.json({ error: "Online payments are not available yet." }, { status: 503 });

  const { invoiceId } = await params;
  if (!/^[\w-]{1,128}$/.test(invoiceId)) return Response.json({ error: "Invalid invoice." }, { status: 400 });
  const clientRef = adminDb.collection("clients").doc(session.uid);
  const invoiceRef = clientRef.collection("invoices").doc(invoiceId);

  try {
    // Persist a shared attempt before contacting Stripe. Concurrent clicks and
    // retries reuse the same idempotency key, even if the first response is lost.
    const checkout = await adminDb.runTransaction(async (tx) => {
      const [clientDoc, invoiceDoc] = await Promise.all([tx.get(clientRef), tx.get(invoiceRef)]);
      const client = clientDoc.data();
      if (!client || client.status !== "active") return { error: "Complete your account setup before paying.", status: 403 } as const;
      if (!invoiceDoc.exists) return { error: "Invoice not found.", status: 404 } as const;
      const invoice = invoiceDoc.data()!;
      if (!payableInvoice(invoice)) return { error: "This invoice is not available for payment.", status: 409 } as const;
      const existing = invoice.checkoutAttempt as { id: string; expiresAt: Timestamp } | undefined;
      // Check saved sessions at Stripe before replacing them: the payment
      // might have completed while our webhook was delayed.
      if (existing && (invoice.stripeCheckoutSessionId || existing.expiresAt.toMillis() > Date.now() + 31 * 60 * 1000)) {
        return { client, invoice, attempt: existing };
      }
      const attempt = { id: randomUUID(), expiresAt: Timestamp.fromMillis(Date.now() + 60 * 60 * 1000) };
      tx.update(invoiceRef, { checkoutAttempt: attempt });
      return { client, invoice, attempt };
    });
    if ("error" in checkout) return Response.json({ error: checkout.error }, { status: checkout.status });

    const stripe = getStripe();
    if (config.live) {
      const account = await stripe.accounts.retrieve(null);
      if (!account.charges_enabled || !account.details_submitted) {
        return Response.json({ error: "Online payments are not available yet." }, { status: 503 });
      }
    }
    let customerId: string = checkout.client.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: checkout.client.email,
        name: checkout.client.businessName,
        metadata: { clientId: session.uid },
      }, { idempotencyKey: `client-${session.uid}` });
      customerId = customer.id;
      await clientRef.update({ stripeCustomerId: customerId });
    }

    const returnUrl = `${config.origin}/portal/invoices/${invoiceId}`;
    // Return an existing session rather than creating a second payment path.
    const previousId = checkout.invoice.stripeCheckoutSessionId;
    if (previousId && checkout.invoice.stripeCheckoutAttemptId === checkout.attempt.id) {
      const previous = await stripe.checkout.sessions.retrieve(previousId);
      if (previous.status === "complete") return Response.json({ error: "Payment is processing. Refresh this invoice shortly." }, { status: 409 });
      if (previous.status === "expired") {
        await adminDb.runTransaction(async (tx) => {
          const current = await tx.get(invoiceRef);
          if (current.data()?.checkoutAttempt?.id === checkout.attempt.id && current.data()?.status === "sent") {
            tx.update(invoiceRef, { checkoutAttempt: FieldValue.delete(), stripeCheckoutSessionId: null, stripeCheckoutAttemptId: null });
          }
        });
        return Response.json({ error: "Checkout expired. Please click Pay again to start a new checkout." }, { status: 409 });
      }
      if (previous.url) return Response.json({ url: previous.url });
    }

    const payment = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customerId,
      client_reference_id: session.uid,
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "usd",
          unit_amount: checkout.invoice.amountDue,
          product_data: { name: checkout.invoice.description },
        },
        quantity: 1,
      }],
      metadata: { clientId: session.uid, invoiceId, attemptId: checkout.attempt.id },
      success_url: `${returnUrl}?checkout=success`,
      cancel_url: `${returnUrl}?checkout=canceled`,
      expires_at: Math.floor(checkout.attempt.expiresAt.toMillis() / 1000),
    }, { idempotencyKey: `invoice-${session.uid}-${invoiceId}-${checkout.attempt.id}` });

    await invoiceRef.update({
      stripeCheckoutSessionId: payment.id,
      stripeCheckoutAttemptId: checkout.attempt.id,
      checkoutCreatedAt: FieldValue.serverTimestamp(),
    });
    return Response.json({ url: payment.url });
  } catch (error) {
    console.error("Invoice checkout failed", error instanceof Error ? error.name : "UnknownError");
    return Response.json({ error: "Couldn't open checkout. Please try again." }, { status: 502 });
  }
}
