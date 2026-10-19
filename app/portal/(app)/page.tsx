import type { Metadata } from "next";
import Link from "next/link";
import { getPortalData } from "../../lib/portal/data";
import { dashboardTotals, formatMoney, isOutstanding } from "../../lib/portal/format";
import ProjectCard from "../components/ProjectCard";
import InvoiceTable from "../components/InvoiceTable";

export const metadata: Metadata = {
  title: "Client dashboard — 36 Dunes",
  robots: { index: false, follow: false },
};

export default async function PortalDashboardPage() {
  const { client, projects, invoices } = await getPortalData();
  const totals = dashboardTotals(projects, invoices);
  const currentProjects = projects.filter((project) => ["active", "planned", "on_hold"].includes(project.status));
  const outstanding = invoices.filter((invoice) => isOutstanding(invoice.status));

  return <>
    <div className="dashboard-heading">
      <div className="eyebrow">YOUR CLIENT SPACE</div>
      <h1>Welcome, {client.displayName}.</h1>
      <p>{client.businessName ? `${client.businessName} · ` : ""}Your projects and payments, all in one place.</p>
    </div>
    <dl className="dashboard-stats">
      <div><dt>Active projects</dt><dd>{totals.activeProjects}</dd><Link href="/portal/projects">Explore projects <span aria-hidden="true">↗</span></Link></div>
      <div><dt>Outstanding balance</dt><dd>{formatMoney(totals.outstanding)}</dd><Link href="/portal/billing">{outstanding.length} {outstanding.length === 1 ? "invoice" : "invoices"} to review <span aria-hidden="true">↗</span></Link></div>
      <div><dt>Total paid</dt><dd>{formatMoney(totals.paid)}</dd><Link href="/portal/billing?view=paid">Payment history <span aria-hidden="true">↗</span></Link></div>
    </dl>
    {totals.overdueCount > 0 && <div className="dashboard-notice"><strong>{totals.overdueCount} {totals.overdueCount === 1 ? "invoice needs" : "invoices need"} your attention.</strong> Review your outstanding invoices in <Link href="/portal/billing">Billing</Link>.</div>}
    <section className="dashboard-section" aria-labelledby="current-projects">
      <div className="section-head"><h2 id="current-projects">Current projects</h2><Link className="dashboard-text-link" href="/portal/projects">All projects <span aria-hidden="true">→</span></Link></div>
      {currentProjects.length ? <div className="dashboard-project-grid">{currentProjects.slice(0, 4).map((project) => <ProjectCard key={project.id} project={project} />)}</div>
        : <div className="dashboard-card dashboard-empty"><h3>You’re all set.</h3><p>New projects will appear here when they’re ready. You can find previous work in Projects.</p><Link href="/portal/projects">View projects →</Link></div>}
    </section>
    <section className="dashboard-section" aria-labelledby="outstanding-invoices">
      <div className="section-head"><h2 id="outstanding-invoices">Outstanding invoices</h2><Link className="dashboard-text-link" href="/portal/billing">All billing <span aria-hidden="true">→</span></Link></div>
      <div className="dashboard-card">{outstanding.length ? <InvoiceTable invoices={outstanding.slice(0, 5)} projects={projects} /> : <p className="empty-state">No outstanding invoices. You’re up to date.</p>}</div>
    </section>
    <aside className="dashboard-support"><div><h2>Let’s keep things moving.</h2><p>Have a question about a project or an invoice?</p></div><a className="btn btn-ghost" href="mailto:kirby@36dunes.com">Contact 36 Dunes</a></aside>
  </>;
}
