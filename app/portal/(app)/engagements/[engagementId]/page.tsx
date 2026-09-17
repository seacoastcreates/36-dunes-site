import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireClient } from "../../../../lib/client-guard";
import { adminDb } from "../../../../lib/firebase/admin";
import { retainerPlans } from "../../../../lib/stripe/retainerPlans";

export const metadata: Metadata = {
  title: "Engagement — 36 Dunes",
  robots: { index: false, follow: false },
};

function formatCents(cents: number) {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

type InvoiceRow = {
  id: string;
  description: string;
  amountDue: number;
  status: string;
};

export default async function PortalEngagementDetailPage({
  params,
}: {
  params: Promise<{ engagementId: string }>;
}) {
  const { client } = await requireClient();
  const { engagementId } = await params;

  const engagementDoc = await adminDb
    .collection("clients")
    .doc(client.id)
    .collection("engagements")
    .doc(engagementId)
    .get();
  if (!engagementDoc.exists) notFound();
  const engagement = engagementDoc.data()!;

  const invoicesSnap = await adminDb
    .collection("clients")
    .doc(client.id)
    .collection("invoices")
    .where("engagementId", "==", engagementId)
    .orderBy("createdAt", "desc")
    .get();
  const invoices = invoicesSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as InvoiceRow);

  const plan =
    engagement.type === "retainer"
      ? retainerPlans.find((p) => p.priceId === engagement.stripePriceId)
      : null;

  return (
    <>
      <Link className="back-link" href="/portal">
        ← Dashboard
      </Link>

      <div className="section-head">
        <div>
          <div className="eyebrow">{engagement.type === "retainer" ? "RETAINER" : "ONE-TIME"}</div>
          <h1>{engagement.title}</h1>
        </div>
        <p>
          <span className={`status-pill is-${engagement.status}`}>{engagement.status}</span>
          {"  "}
          {engagement.type === "one_time" && engagement.amountTotal
            ? formatCents(engagement.amountTotal)
            : plan?.label}
        </p>
      </div>

      {engagement.summary && <p>{engagement.summary}</p>}

      <div className="section-head">
        <h2>Invoices</h2>
      </div>
      {invoices.length === 0 ? (
        <p className="empty-state">No invoices yet for this engagement.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td>
                  <Link href={`/portal/invoices/${inv.id}`}>{inv.description}</Link>
                </td>
                <td>{formatCents(inv.amountDue)}</td>
                <td>
                  <span className={`status-pill is-${inv.status}`}>{inv.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
