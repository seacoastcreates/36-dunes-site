import Link from "next/link";
import type { Project } from "../../lib/portal/data";
import { formatDate, formatMoney, statusLabel } from "../../lib/portal/format";
import { retainerPlans } from "../../lib/stripe/retainerPlans";

export default function ProjectCard({ project }: { project: Project }) {
  const plan = retainerPlans.find((plan) => plan.priceId === project.stripePriceId);
  return <article className="dashboard-card project-card">
    <div className="dashboard-card-top">
      <span className="dashboard-kicker">{project.type === "retainer" ? "Retainer" : "Project"}</span>
      <span className={`status-pill is-${project.status}`}>{statusLabel(project.status)}</span>
    </div>
    <h3><Link href={`/portal/engagements/${project.id}`}>{project.title}</Link></h3>
    <p className="project-summary">{project.summary || "Your project details will appear here as work gets underway."}</p>
    <div className="project-card-meta">
      <span>{project.type === "retainer" ? plan?.label ?? "Retainer" : project.amountTotal !== null ? formatMoney(project.amountTotal) : "Scope being confirmed"}</span>
      <span>Updated {formatDate(project.updatedAt)}</span>
    </div>
    <Link className="dashboard-text-link" href={`/portal/engagements/${project.id}`}>View project <span aria-hidden="true">↗</span></Link>
  </article>;
}
