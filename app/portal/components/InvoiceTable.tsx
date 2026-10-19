import Link from "next/link";
import type { Invoice, Project } from "../../lib/portal/data";
import { formatDate, formatMoney, isInvoiceOverdue, statusLabel } from "../../lib/portal/format";

export default function InvoiceTable({ invoices, projects }: { invoices: Invoice[]; projects: Project[] }) {
  if (!invoices.length) return <p className="empty-state">No invoices to show. Invoices will appear here when they’re issued.</p>;
  const projectNames = new Map(projects.map((project) => [project.id, project.title]));
  return <div className="dashboard-table-scroll" tabIndex={0} role="region" aria-label="Invoices">
    <table className="data-table dashboard-invoices">
      <thead><tr><th scope="col">Invoice / project</th><th scope="col">Due</th><th scope="col">Amount</th><th scope="col">Status</th><th scope="col"><span className="sr-only">Action</span></th></tr></thead>
      <tbody>{invoices.map((invoice) => <tr key={invoice.id}>
        <td><Link href={`/portal/invoices/${invoice.id}`}>{invoice.description}</Link><small>{projectNames.get(invoice.engagementId) ?? "36 Dunes"}</small></td>
        <td>{formatDate(invoice.dueAt, true)}</td>
        <td>{formatMoney(invoice.amountDue)}</td>
        <td><span className={`status-pill is-${isInvoiceOverdue(invoice) ? "overdue" : invoice.status}`}>{isInvoiceOverdue(invoice) ? "overdue" : statusLabel(invoice.status)}</span></td>
        <td><Link href={`/portal/invoices/${invoice.id}`} aria-label={`View invoice: ${invoice.description}`}>View <span aria-hidden="true">↗</span></Link></td>
      </tr>)}</tbody>
    </table>
  </div>;
}
