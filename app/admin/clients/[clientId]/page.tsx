import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { adminDb } from "../../../lib/firebase/admin";

export const metadata: Metadata = {
  title: "Client — 36 Dunes Admin",
  robots: { index: false, follow: false },
};

function formatCents(cents: number) {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

type EngagementRow = {
  id: string;
  title: string;
  type: "one_time" | "retainer";
  status: string;
  amountTotal?: number;
};

type InvoiceRow = {
  id: string;
  description: string;
  amountDue: number;
  status: string;
};

export default async function AdminClientDetailPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;

  const clientDoc = await adminDb.collection("clients").doc(clientId).get();
  if (!clientDoc.exists) notFound();
  const client = clientDoc.data()!;

  const [engagementsSnap, invoicesSnap] = await Promise.all([
    adminDb
      .collection("clients")
      .doc(clientId)
      .collection("engagements")
      .orderBy("createdAt", "desc")
      .get(),
    adminDb
      .collection("clients")
      .doc(clientId)
      .collection("invoices")
      .orderBy("createdAt", "desc")
      .get(),
  ]);

  const engagements = engagementsSnap.docs.map(
    (d) => ({ id: d.id, ...d.data() }) as EngagementRow
  );
  const invoices = invoicesSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as InvoiceRow);

  return (
    <>
      <Link className="back-link" href="/admin">
        ← All clients
      </Link>

      <div className="section-head">
        <div>
          <div className="eyebrow">{client.status?.toUpperCase()}</div>
          <h1>{client.businessName}</h1>
        </div>
        <p>
          {client.contactName} · {client.email}
        </p>
      </div>

      <div className="section-head">
        <h2>Engagements</h2>
        <Link className="btn btn-ghost" href={`/admin/clients/${clientId}/engagements/new`}>
          New engagement
        </Link>
      </div>
      {engagements.length === 0 ? (
        <p className="empty-state">No engagements yet.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {engagements.map((e) => (
              <tr key={e.id}>
                <td>{e.title}</td>
                <td>{e.type === "retainer" ? "Retainer" : "One-time"}</td>
                <td>
                  <span className={`status-pill is-${e.status}`}>{e.status}</span>
                </td>
                <td>{e.type === "one_time" && e.amountTotal ? formatCents(e.amountTotal) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="section-head">
        <h2>Invoices</h2>
        <Link className="btn btn-ghost" href={`/admin/clients/${clientId}/invoices/new`}>
          New invoice
        </Link>
      </div>
      {invoices.length === 0 ? (
        <p className="empty-state">No invoices yet.</p>
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
                <td>{inv.description}</td>
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
