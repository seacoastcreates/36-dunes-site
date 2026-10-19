# 36 Dunes website

Next.js site with an invitation-only Firebase client portal, admin-managed engagements/invoices, and Stripe-hosted invoice checkout. Payments default to disabled. No card data passes through this application.

## Local setup and credentials

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Fill `.env.local` using credentials from your own Firebase and Stripe accounts. Preserve existing local credentials; copy only if that file does not exist. In deployment, configure the same variables in the hosting provider, then rebuild (Firebase `NEXT_PUBLIC_*` values are compiled into the client).

- **Firebase web app:** copy the web configuration from Firebase Project settings into `NEXT_PUBLIC_FIREBASE_*`. This public API key identifies the project; it does not grant Admin SDK access.
- **Firebase Admin:** set the service account project ID, client email, and private key. The private key can contain escaped `\n` characters. Keep all Admin credentials server-only. The client and Admin project IDs must match.
- **Firebase Authentication:** enable Email/Password, Email link, and Google providers; configure the support email and authorize localhost plus your deployed domain. Create the admin Auth user, verify its email, and set `ADMIN_EMAIL` to that exact email. Access to `/admin` requires a verified email and a valid Firebase session.
- **Firestore:** enable the database and deploy `firestore.rules` with `firebase deploy --only firestore:rules`. Client data writes and all billing operations use the server Admin SDK. Do not use permissive test rules.
- **Stripe:** start in a sandbox/test environment with its `sk_test_…` secret key. Use that environment's webhook signing secret (`whsec_…`). Hosted Checkout does not require a publishable Stripe key. Never place Stripe secrets in `NEXT_PUBLIC_*` variables.
- **URLs:** set `SITE_URL` to the site origin, with no path/query (for example `https://36dunes.com`). HTTP is accepted only for localhost in test mode.
- **Optional retainers:** set `STRIPE_STANDARD_PRICE_ID` and `STRIPE_EXTENDED_PRICE_ID` to your own matching Stripe environment's price IDs. Unconfigured plans are omitted. Retainer records do not start recurring Stripe subscriptions; payments here are explicitly issued one-time invoices.

Use separate Firebase projects for sandbox and production so test Stripe customer IDs and invoices never enter the production portal. Keep `.env.local` out of Git. `.env.example` contains names and safe defaults only.

## Accounts before payment

1. Sign in at `/portal/login` as the verified admin, then open `/admin`.
2. Create a client and generate their invite link. Share the link with the intended client through your normal channel.
3. The client signs in with Google using their invited, verified email, or confirms their email invite and sets a password. Either path activates their account. Google clients do not need a separate password. Unknown, disabled, and suspended client accounts cannot establish a portal session; incomplete accounts cannot start checkout.
4. Create an engagement and invoice. The authenticated client can access and pay only invoices within their own account.

Cookies are HttpOnly, use SameSite=Lax, and require HTTPS in production. API mutations require a matching Origin header, except the Stripe webhook, which authenticates using Stripe's signature. Custom API callers must send the site's Origin header and the authenticated session cookie.

## Stripe webhooks and test checkout

The webhook route is **`POST /api/stripe/webhook`**. Register a snapshot event endpoint in Stripe for `checkout.session.completed` and `checkout.session.async_payment_succeeded`. Use the API version matching the SDK integration (`2026-08-26.dahlia`). Its signing secret is specific to the endpoint and environment.

For local testing with the Stripe CLI:

```sh
stripe listen --events checkout.session.completed,checkout.session.async_payment_succeeded --forward-to localhost:3000/api/stripe/webhook
```

Set `STRIPE_WEBHOOK_SECRET` to the listener's secret and `PAYMENTS_ENABLED=true`, then restart the dev server. Leave `STRIPE_LIVE_PAYMENTS_ENABLED=false`. Pay an actual portal invoice using Stripe test card `4242 4242 4242 4242`, a future expiry, and any CVC. A generic `stripe trigger` event has no portal invoice metadata and is intentionally ignored.

Checkout uses the invoice's stored USD amount (at least $0.50), not an amount from the browser. Concurrent/retried requests share a persisted attempt and Stripe idempotency key. A paid invoice cannot create another checkout; a completed session waits for webhook reconciliation. An expired session is cleared so the client can retry. A Checkout success redirect does not mark an invoice paid.

The webhook checks the raw-body signature, test/live mode, invoice/customer references, attempt, amount, currency, and confirmed paid status. It atomically marks the invoice paid and records the Stripe event ID to handle repeated deliveries safely. Failed reconciliation returns an error so Stripe can retry. Webhooks continue working when new payments are disabled. This flow currently accepts card payments only; refund/dispute management remains in Stripe Dashboard.

## Before enabling real payments

1. Complete the account/invite/checkout flow in Stripe test mode. Confirm the webhook marks the invoice paid. Test cancellation, repeated clicks, duplicate webhook delivery, expired checkout, and access from another client account.
2. Activate the production Stripe account, completing business and payout details. Configure the live secret, a live webhook endpoint/signing secret, the production Firebase project, and HTTPS `SITE_URL` in the host.
3. Sign in as admin and use `/api/health` to check Firebase credentials and the Stripe connection. It returns 503 while payments are disabled; check individual booleans during setup. This endpoint never returns secret values and does not prove webhook delivery—verify that in Stripe's delivery log.
4. After validating the deployment and webhook delivery, explicitly set **both** `PAYMENTS_ENABLED=true` and `STRIPE_LIVE_PAYMENTS_ENABLED=true`, then redeploy. Live checkout also requires Stripe to report an activated account with charges enabled.

Set `PAYMENTS_ENABLED=false` to stop new checkouts. Already-created Stripe Checkout sessions remain usable until their expiration (one hour); expire them in Stripe if an immediate stop is required. Do not remove the webhook while payments are in flight.

## Checks

For production, use Netlify's complete adapter workflow: `npx netlify-cli deploy --prod --context production`.
This publishes Next.js assets and server/edge functions together. Verify live
JavaScript asset URLs as well as the login page and authenticated-route redirects.

```sh
npm test
npm run lint
npx tsc --noEmit
npm run build
```

Automated tests use in-memory Stripe/Firebase boundaries; they never charge cards or access real customer data. Live credential validity and end-to-end webhook delivery require the sandbox checklist above.

Stripe references: [Checkout fulfillment](https://docs.stripe.com/checkout/fulfillment), [webhook signature verification](https://docs.stripe.com/webhooks), and [idempotent requests](https://docs.stripe.com/api/idempotent_requests).

## Client dashboard and project management

The Clients link opens `/portal/login`; after sign-in the client lands at `/portal`. Existing signed-in clients go straight to their dashboard. The dashboard stays within this application and deployment:

The session endpoint chooses the destination: active clients go to `/portal`, email-link clients who still need a password go to `/portal/set-password`, and verified admins go to `/admin`. Sign-in uses a full navigation after the server sets its HttpOnly cookie. Google sign-in shows the account chooser; errors distinguish blocked/canceled popups, an unauthorized domain, and missing invitations. An admin can invite an email that already signed into Google: the existing Firebase UID is reused without overwriting an existing client record. The dashboard greets the individual's Google name (or their saved contact name), shows their account email, and reads projects and invoices only under their verified UID.

- `/portal`: overview with active projects, outstanding invoices, confirmed payments, and links to take action.
- `/portal/projects`: current and past projects, including retainers.
- `/portal/engagements/[id]`: project scope/status, last update, totals, and related invoices. Existing engagement links remain valid.
- `/portal/billing`: all issued invoices with Outstanding/Paid filters and links to invoice details and Stripe checkout.

From `/admin/clients/[id]`, expand **Update project** to change its status and client-visible scope/update. Statuses are Planned, Active, On hold, Completed, and Canceled. This does not change invoice amounts or payment status. Draft invoices are hidden from the dashboard. All dashboard data is read server-side under the authenticated client's ID; project edits require admin access.

### When to split hosting

Keep `/portal` in the current app until there is a practical reason to move it. Revisit the decision when adding major dashboard features or changing hosting:

- **Add `dashboard.36dunes.com`** when the portal needs a distinct product identity or its own domain-level session and analytics configuration. This can still use the same application/deployment with hostname routing.
- **Use a separate deployment** when the portal needs independent releases, different infrastructure or dependencies, separate operational credentials, or a separate team. Frequent interference between marketing-site and dashboard changes is a concrete signal.
- **Use separate repositories only if needed** for ownership or access control. Two independently deployed apps can share one repository and shared components/types.

A move must include dashboard-host login and host-only cookies, Firebase authorized domains/invite URLs, Stripe webhook and return URLs, redirects for existing `/portal` links, and a fresh account/checkout regression check. No subdomain or separate install is configured by this change.
