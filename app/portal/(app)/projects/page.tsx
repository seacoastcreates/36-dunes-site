import type { Metadata } from "next";
import { getPortalData } from "../../../lib/portal/data";
import ProjectCard from "../../components/ProjectCard";

export const metadata: Metadata = { title: "Projects — 36 Dunes", robots: { index: false, follow: false } };

export default async function ProjectsPage() {
  const { projects } = await getPortalData();
  const current = projects.filter((project) => !["completed", "canceled"].includes(project.status));
  const past = projects.filter((project) => ["completed", "canceled"].includes(project.status));
  return <>
    <div className="dashboard-heading"><div className="eyebrow">PROJECTS</div><h1>Your work with 36 Dunes.</h1><p>See what’s underway and revisit previous projects.</p></div>
    <section className="dashboard-section" aria-labelledby="current-projects"><div className="section-head"><h2 id="current-projects">Current projects</h2><span>{current.length} projects</span></div>
      {current.length ? <div className="dashboard-project-grid">{current.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
        : <div className="dashboard-card dashboard-empty"><h3>No current projects.</h3><p>When we start your next project, you’ll find the scope, status, and related invoices here.</p><a href="mailto:kirby@36dunes.com">Talk about your next project →</a></div>}
    </section>
    {past.length > 0 && <section className="dashboard-section" aria-labelledby="past-projects"><div className="section-head"><h2 id="past-projects">Past projects</h2></div><div className="dashboard-project-grid">{past.map((project) => <ProjectCard key={project.id} project={project} />)}</div></section>}
  </>;
}
