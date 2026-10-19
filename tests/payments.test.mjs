import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

// Load the real route handlers with in-memory service boundaries. No credentials,
// live payments, or Firebase/Stripe network calls are needed for these checks.
function load(file, dependencies = {}) {
  const source = ts.transpileModule(readFileSync(new URL(`../${file}`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const loaded = { exports: {} };
  vm.runInNewContext(`(function(require, module, exports) { ${source}\n})`, {
    Request, Response, URL, console, process: { env: configured },
  })((name) => {
    assert.ok(name in dependencies, `Unexpected dependency ${name}`);
    return dependencies[name];
  }, loaded, loaded.exports);
  return loaded.exports;
}
const configured = {
  PAYMENTS_ENABLED: "true", STRIPE_SECRET_KEY: "sk_test_example", STRIPE_WEBHOOK_SECRET: "whsec_example",
  SITE_URL: "http://localhost:3000", NEXT_PUBLIC_FIREBASE_API_KEY: "public", NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "test.firebaseapp.com",
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: "test", NEXT_PUBLIC_FIREBASE_APP_ID: "app", FIREBASE_ADMIN_PROJECT_ID: "test",
  FIREBASE_ADMIN_CLIENT_EMAIL: "admin@test", FIREBASE_ADMIN_PRIVATE_KEY: "private", ADMIN_EMAIL: "owner@example.com",
};
const policy = load("app/lib/payment-policy.ts");
const origins = load("app/lib/request-origin.ts");

test("payments fail closed for missing credentials, disabled flags, wrong projects and unsafe origins", () => {
  assert.equal(policy.paymentConfiguration(configured).ready, true);
  for (const key of Object.keys(configured)) {
    assert.equal(policy.paymentConfiguration({ ...configured, [key]: "" }).ready, false, key);
  }
  for (const SITE_URL of ["https://example.com/path", "https://user:pass@example.com", "javascript:alert(1)", "http://example.com"]) {
    assert.equal(policy.paymentConfiguration({ ...configured, SITE_URL }).ready, false);
  }
  assert.equal(policy.paymentConfiguration({ ...configured, FIREBASE_ADMIN_PROJECT_ID: "other" }).ready, false);
  const live = { ...configured, STRIPE_SECRET_KEY: "sk_live_example", SITE_URL: "https://example.com" };
  assert.equal(policy.paymentConfiguration(live).ready, false);
  assert.equal(policy.paymentConfiguration({ ...live, STRIPE_LIVE_PAYMENTS_ENABLED: "true" }).ready, true);
  assert.equal(policy.paymentConfiguration({ ...live, STRIPE_LIVE_PAYMENTS_ENABLED: "true", SITE_URL: "http://localhost:3000" }).ready, false);
});

test("only payable invoices and exact confirmed payment amounts pass", () => {
  const invoice = { status: "sent", amountDue: 5000, currency: "usd" };
  assert.equal(policy.payableInvoice(invoice), true);
  for (const amountDue of [-1, 0, 49, 50.5, NaN, Infinity, "5000", 100_000_000]) {
    assert.equal(policy.payableInvoice({ ...invoice, amountDue }), false);
  }
  assert.equal(policy.payableInvoice({ ...invoice, status: "paid" }), false);
  const payment = { mode: "payment", payment_status: "paid", amount_total: 5000, currency: "usd" };
  assert.equal(policy.matchesInvoicePayment(invoice, payment), true);
  for (const change of [{ amount_total: 4999 }, { payment_status: "unpaid" }, { currency: "eur" }, { mode: "subscription" }]) {
    assert.equal(policy.matchesInvoicePayment(invoice, { ...payment, ...change }), false);
  }
});

test("cookie-authenticated mutations require the same origin", () => {
  const request = (origin) => new Request("https://36dunes.com/api/auth/session", { method: "POST", headers: origin ? { origin } : {} });
  assert.equal(origins.isSameOrigin(request("https://36dunes.com")), true);
  assert.equal(origins.isSameOrigin(request("https://attacker.example")), false);
  assert.equal(origins.isSameOrigin(request()), false);
});

function harness({ session = { uid: "client-a" }, active = true, validSignature = true, paid = true, amount = 5000, previous = null } = {}) {
  const docs = new Map([
    ["clients/client-a", { status: active ? "active" : "invited", email: "client@example.com", stripeCustomerId: "cus_a" }],
    ["clients/client-a/invoices/invoice-a", { status: "sent", amountDue: 5000, currency: "usd", description: "Consulting" }],
  ]);
  let checkoutCalls = 0;
  const field = { serverTimestamp: () => "timestamp", delete: () => null };
  function ref(path) {
    return {
      path, collection: (name) => ({ doc: (id) => ref(`${path}/${name}/${id}`) }),
      update: async (data) => docs.set(path, { ...docs.get(path), ...data }),
    };
  }
  const db = {
    collection: (name) => ({ doc: (id) => ref(`${name}/${id}`) }),
    runTransaction: async (work) => work({
      get: async (r) => ({ exists: docs.has(r.path), data: () => docs.get(r.path) }),
      update: (r, data) => docs.set(r.path, { ...docs.get(r.path), ...data }),
      create: (r, data) => { assert.equal(docs.has(r.path), false); docs.set(r.path, data); },
    }),
  };
  const event = {
    id: "evt_test", livemode: false, type: "checkout.session.completed", data: { object: {
      id: "cs_test", metadata: { clientId: "client-a", invoiceId: "invoice-a", attemptId: "attempt-a" },
      mode: "payment", payment_status: paid ? "paid" : "unpaid", amount_total: amount, currency: "usd",
      customer: "cus_a", client_reference_id: "client-a", payment_intent: "pi_test",
    } },
  };
  const stripe = {
    checkout: { sessions: {
      create: async (params, options) => {
        checkoutCalls++;
        assert.equal(params.line_items[0].price_data.unit_amount, 5000);
        assert.ok(options.idempotencyKey.endsWith("attempt-a"));
        return { id: "cs_test", url: "https://checkout.stripe.com/test" };
      },
      retrieve: async () => previous ?? { status: "open", url: "https://checkout.stripe.com/test" },
    } },
    webhooks: { constructEvent: () => { if (!validSignature) throw Error("Invalid signature"); return event; } },
  };
  const route = load("app/api/portal/invoices/[invoiceId]/checkout/route.ts", {
    "node:crypto": { randomUUID: () => "attempt-a" },
    "firebase-admin/firestore": { FieldValue: field, Timestamp: { fromMillis: (value) => ({ toMillis: () => value }) } },
    "../../../../../lib/firebase/admin": { adminDb: db },
    "../../../../../lib/session": { verifySession: async () => session },
    "../../../../../lib/stripe": { getStripe: () => stripe },
    "../../../../../lib/payment-policy": policy,
  });
  const webhook = load("app/api/stripe/webhook/route.ts", {
    "firebase-admin/firestore": { FieldValue: field },
    "../../../lib/firebase/admin": { adminDb: db },
    "../../../lib/stripe": { getStripe: () => stripe },
    "../../../lib/payment-policy": policy,
  });
  return { docs, event, route, webhook, checkoutCalls: () => checkoutCalls };
}
const checkoutRequest = new Request("http://localhost:3000/api/portal/invoices/invoice-a/checkout", { method: "POST" });
const params = { params: Promise.resolve({ invoiceId: "invoice-a" }) };
const webhookRequest = () => new Request("http://localhost:3000/api/stripe/webhook", { method: "POST", headers: { "stripe-signature": "test" }, body: "{}" });

test("checkout rejects anonymous users, incomplete accounts and another client's invoice", async () => {
  for (const [options, expected] of [[{ session: null }, 401], [{ active: false }, 403], [{ session: { uid: "client-b" } }, 403]]) {
    const h = harness(options);
    assert.equal((await h.route.POST(checkoutRequest, params)).status, expected);
    assert.equal(h.checkoutCalls(), 0);
  }
});

test("checkout uses the stored amount, reuses a session, and never charges a paid invoice again", async () => {
  const h = harness();
  assert.equal((await h.route.POST(checkoutRequest, params)).status, 200);
  assert.equal((await h.route.POST(checkoutRequest, params)).status, 200);
  assert.equal(h.checkoutCalls(), 1);
  h.docs.get("clients/client-a/invoices/invoice-a").status = "paid";
  assert.equal((await h.route.POST(checkoutRequest, params)).status, 409);
  assert.equal(h.checkoutCalls(), 1);
});

test("a completed checkout blocks a new checkout while the webhook is pending", async () => {
  const h = harness({ previous: { status: "complete" } });
  await h.route.POST(checkoutRequest, params);
  assert.equal((await h.route.POST(checkoutRequest, params)).status, 409);
  assert.equal(h.checkoutCalls(), 1);
});

test("expired checkout is cleared before a replacement is created", async () => {
  const h = harness({ previous: { status: "expired" } });
  await h.route.POST(checkoutRequest, params);
  assert.equal((await h.route.POST(checkoutRequest, params)).status, 409);
  assert.equal(h.docs.get("clients/client-a/invoices/invoice-a").stripeCheckoutSessionId, null);
  assert.equal(h.checkoutCalls(), 1);
  assert.equal((await h.route.POST(checkoutRequest, params)).status, 200);
  assert.equal(h.checkoutCalls(), 2);
});

test("an active client cannot check out an invoice in another account", async () => {
  const h = harness({ session: { uid: "client-b" } });
  h.docs.set("clients/client-b", { status: "active" });
  assert.equal((await h.route.POST(checkoutRequest, params)).status, 404);
  assert.equal(h.checkoutCalls(), 0);
});

test("webhook requires a valid signature and exact payment, and deduplicates delivery", async () => {
  assert.equal((await harness({ validSignature: false }).webhook.POST(webhookRequest())).status, 400);
  const h = harness();
  await h.route.POST(checkoutRequest, params);
  h.event.data.object.amount_total = 1;
  assert.equal((await h.webhook.POST(webhookRequest())).status, 500);
  assert.equal(h.docs.get("clients/client-a/invoices/invoice-a").status, "sent");
  h.event.data.object.amount_total = 5000;
  assert.equal((await h.webhook.POST(webhookRequest())).status, 200);
  assert.equal(h.docs.get("clients/client-a/invoices/invoice-a").status, "paid");
  assert.equal((await h.webhook.POST(webhookRequest())).status, 200);
  assert.equal(h.docs.get("stripeEvents/evt_test").invoiceId, "invoice-a");
});

test("unpaid checkout completion cannot mark an invoice paid", async () => {
  const h = harness({ paid: false });
  await h.route.POST(checkoutRequest, params);
  assert.equal((await h.webhook.POST(webhookRequest())).status, 200);
  assert.equal(h.docs.get("clients/client-a/invoices/invoice-a").status, "sent");
});

test("webhook rejects wrong customers, attempts, and Stripe modes", async () => {
  for (const change of [
    (event) => { event.data.object.customer = "cus_other"; },
    (event) => { event.data.object.metadata.attemptId = "other"; },
    (event) => { event.livemode = true; },
  ]) {
    const h = harness();
    await h.route.POST(checkoutRequest, params);
    change(h.event);
    assert.ok((await h.webhook.POST(webhookRequest())).status >= 400);
    assert.equal(h.docs.get("clients/client-a/invoices/invoice-a").status, "sent");
  }
});
