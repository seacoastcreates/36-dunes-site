import type { Metadata } from "next";
import Link from "next/link";
import { adminDb } from "../lib/firebase/admin";

export const metadata: Metadata = {
  title: "Clients — 36 Dunes Admin",
  robots: { index: false, follow: false },
};

type ClientRow = {
  id: string;
  businessName: string;
  email: string;
  status: string;
  activeEngagements: number;
  unpaidInvoices: number;
};

async function getClients(): Promise<ClientRow[]> {
  const snapshot = await adminDb.collection("clients").orderBy("createdAt", "desc").get();

  return Promise.all(
    snapshot.docs.map(async (doc) => {
      const data = doc.data();
      const [engagementsSnap, invoicesSnap] = await Promise.all([
        adminDb
          .collection("clients")
          .doc(doc.id)
          .collection("engagements")
          .where("status", "==", "active")
          .count()
          .get(),
        adminDb
          .collection("clients")
          .doc(doc.id)
          .collection("invoices")
          .where("status", "==", "sent")
          .count()
          .get(),
      ]);

      return {
        id: doc.id,
        businessName: data.businessName ?? "(unnamed)",
        email: data.email ?? "",
        status: data.status ?? "invited",
        activeEngagements: engagementsSnap.data().count,
        unpaidInvoices: invoicesSnap.data().count,
      };
    })
  );
}

export default async function AdminClientsPage() {
  const clients = await getClients();

  return (
    <>
      <div className="section-head">
        <div>
          <div className="eyebrow">ADMIN</div>
          <h1>Clients</h1>
        </div>
        <Link className="btn btn-primary" href="/admin/clients/new">
          New client
        </Link>
      </div>

      {clients.length === 0 ? (
        <p className="empty-state">No clients yet.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Business</th>
              <th>Email</th>
              <th>Status</th>
              <th>Active engagements</th>
              <th>Unpaid invoices</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>
                  <Link href={`/admin/clients/${client.id}`}>{client.businessName}</Link>
                </td>
                <td>{client.email}</td>
                <td>
                  <span className={`status-pill is-${client.status}`}>{client.status}</span>
                </td>
                <td>{client.activeEngagements}</td>
                <td>{client.unpaidInvoices}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
