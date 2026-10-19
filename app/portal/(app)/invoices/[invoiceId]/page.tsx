import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireClient } from "../../../../lib/client-guard";
import { adminDb } from "../../../../lib/firebase/admin";
import InvoicePaymentButton from "../../../../components/InvoicePaymentButton";
import { payableInvoice, paymentConfiguration } from "../../../../lib/payment-policy";
import { dateMillis, formatDate, formatMoney } from "../../../../lib/portal/format";

export const metadata: Metadata = {
  title: "Invoice — 36 Dunes",
  robots: { index: false, follow: false },
};

export default async function PortalInvoiceDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ invoiceId: string }>;
  searchParams: Promise<{ checkout?: string }>;
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

  const dueDate = formatDate(dateMillis(invoice.dueDate), true);
  const sentDate = formatDate(dateMillis(invoice.sentAt));
  const paidDate = formatDate(dateMillis(invoice.paidAt));
  const { checkout } = await searchParams;
  const payments = paymentConfiguration(process.env);

  return (
    <>
      <Link className="back-link" href="/portal/billing">
        ← Billing
      </Link>

      <div className="section-head">
        <div>
          <div className="eyebrow">INVOICE</div>
          <h1>{invoice.description}</h1>
        </div>
        <p>
          <span className={`status-pill is-${invoice.status}`}>{invoice.status}</span>
          {"  "}
          {formatMoney(invoice.amountDue)}
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
      {invoice.status !== "paid" && checkout === "success" && (
        <p role="status">Your checkout was submitted. Payment confirmation may take a moment. Refresh this page to check its status.</p>
      )}
      {invoice.status !== "paid" && checkout === "canceled" && <p role="status">Checkout was canceled. You can try again when you’re ready.</p>}
      {payableInvoice(invoice) && (payments.ready ? (
        <InvoicePaymentButton invoiceId={invoiceId} />
      ) : <p>Online payments are not available yet. Contact 36 Dunes with any billing questions.</p>)}
    </>
  );
}
