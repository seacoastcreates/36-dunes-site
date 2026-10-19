import type { Metadata } from "next";
import Link from "next/link";
import { getPortalData } from "../../../lib/portal/data";
import { dashboardTotals, formatMoney, isOutstanding } from "../../../lib/portal/format";
import InvoiceTable from "../../components/InvoiceTable";

export const metadata: Metadata = { title: "Billing — 36 Dunes", robots: { index: false, follow: false } };

export default async function BillingPage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const { invoices, projects } = await getPortalData();
  const { view } = await searchParams;
  const selected = view === "paid" || view === "outstanding" ? view : "all";
  const visible = invoices.filter((invoice) => selected === "paid" ? invoice.status === "paid" : selected === "outstanding" ? isOutstanding(invoice.status) : true);
  const totals = dashboardTotals(projects, invoices);
  return <>
    <div className="dashboard-heading"><div className="eyebrow">BILLING</div><h1>A clear view of your payments.</h1><p>Review invoices, make a payment, and see what’s already paid.</p></div>
    <dl className="dashboard-stats billing-stats"><div><dt>Outstanding balance</dt><dd>{formatMoney(totals.outstanding)}</dd><span>Issued invoices awaiting payment</span></div><div><dt>Total paid</dt><dd>{formatMoney(totals.paid)}</dd><span>Confirmed invoice payments</span></div></dl>
    <section className="dashboard-section" aria-labelledby="invoice-list"><div className="section-head"><h2 id="invoice-list">Invoices</h2></div>
      <nav className="dashboard-filters" aria-label="Filter invoices">{[{ value: "all", label: "All invoices" }, { value: "outstanding", label: "Outstanding" }, { value: "paid", label: "Paid" }].map(({ value, label }) => <Link key={value} href={value === "all" ? "/portal/billing" : `/portal/billing?view=${value}`} aria-current={selected === value ? "page" : undefined}>{label}</Link>)}</nav>
      <div className="dashboard-card"><InvoiceTable invoices={visible} projects={projects} /></div>
    </section>
    <p className="dashboard-footnote">Open an invoice to review its details and available payment options. Questions about a charge? <a href="mailto:kirby@36dunes.com">Contact 36 Dunes</a>.</p>
  </>;
}
