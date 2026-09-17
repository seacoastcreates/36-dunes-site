import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireClient } from "../../../../lib/client-guard";
import { adminDb } from "../../../../lib/firebase/admin";

export const metadata: Metadata = {
  title: "Invoice — 36 Dunes",
  robots: { index: false, follow: false },
};

function formatCents(cents: number) {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function formatDate(value: unknown) {
  if (!value || typeof value !== "object" || !("toDate" in value)) return null;
  return (value as { toDate: () => Date }).toDate().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PortalInvoiceDetailPage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { client } = await requireClient();
  const { invoiceId } = await params;

  const invoiceDoc = await adminDb
    .collection("clients")
    .doc(client.id)
    .collection("invoices")
    .doc(invoiceId)
    .get();
  if (!invoiceDoc.exists) notFound();
  const invoice = invoiceDoc.data()!;

  const dueDate = formatDate(invoice.dueDate);
  const sentDate = formatDate(invoice.sentAt);
  const paidDate = formatDate(invoice.paidAt);

  return (
    <>
      <Link className="back-link" href={`/portal/engagements/${invoice.engagementId}`}>
        ← Engagement
      </Link>

      <div className="section-head">
        <div>
          <div className="eyebrow">INVOICE</div>
          <h1>{invoice.description}</h1>
        </div>
        <p>
          <span className={`status-pill is-${invoice.status}`}>{invoice.status}</span>
          {"  "}
          {formatCents(invoice.amountDue)}
        </p>
      </div>

      <table className="data-table">
        <tbody>
          <tr>
            <th>Sent</th>
            <td>{sentDate ?? "—"}</td>
          </tr>
          <tr>
            <th>Due</th>
            <td>{dueDate ?? "—"}</td>
          </tr>
          <tr>
            <th>Paid</th>
            <td>{paidDate ?? "—"}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
