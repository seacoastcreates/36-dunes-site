import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortalData } from "../../../../lib/portal/data";
import { dashboardTotals, formatDate, formatMoney, statusLabel } from "../../../../lib/portal/format";
import { retainerPlans } from "../../../../lib/stripe/retainerPlans";
import InvoiceTable from "../../../components/InvoiceTable";

export const metadata: Metadata = { title: "Project — 36 Dunes", robots: { index: false, follow: false } };

export default async function PortalProjectDetailPage({ params }: { params: Promise<{ engagementId: string }> }) {
  const { projects, invoices } = await getPortalData();
  const { engagementId } = await params;
  const project = projects.find((project) => project.id === engagementId);
  if (!project) notFound();
  const relatedInvoices = invoices.filter((invoice) => invoice.engagementId === engagementId);
  const totals = dashboardTotals([project], relatedInvoices);
  const plan = retainerPlans.find((plan) => plan.priceId === project.stripePriceId);
  return <>
    <Link className="back-link" href="/portal/projects">← Projects</Link>
    <div className="dashboard-heading project-heading"><div className="eyebrow">{project.type === "retainer" ? "RETAINER" : "PROJECT"}</div><h1>{project.title}</h1><div className="project-heading-meta"><span className={`status-pill is-${project.status}`}>{statusLabel(project.status)}</span><span>Updated {formatDate(project.updatedAt)}</span></div></div>
    <section className="dashboard-card project-scope" aria-labelledby="project-scope"><h2 id="project-scope">Project scope &amp; update</h2><p>{project.summary || "Your project scope and updates will appear here as work gets underway."}</p></section>
    <dl className="dashboard-stats">
      <div><dt>{project.type === "retainer" ? "Retainer plan" : "Project total"}</dt><dd className={project.type === "retainer" ? "retainer-amount" : undefined}>{project.type === "retainer" ? plan?.label ?? "Retainer" : project.amountTotal !== null ? formatMoney(project.amountTotal) : "—"}</dd></div>
      <div><dt>Outstanding invoices</dt><dd>{formatMoney(totals.outstanding)}</dd></div>
      <div><dt>Paid to date</dt><dd>{formatMoney(totals.paid)}</dd></div>
    </dl>
    <section className="dashboard-section" aria-labelledby="project-invoices"><div className="section-head"><h2 id="project-invoices">Project invoices</h2><Link className="dashboard-text-link" href="/portal/billing">All billing →</Link></div><div className="dashboard-card"><InvoiceTable invoices={relatedInvoices} projects={projects} /></div></section>
    <p className="dashboard-footnote">Questions about this project? <a href={`mailto:kirby@36dunes.com?subject=${encodeURIComponent(project.title)}`}>Contact 36 Dunes</a>.</p>
  </>;
}
