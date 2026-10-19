"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { projectStatuses, statusLabel } from "../../lib/portal/format";

export default function ProjectUpdateForm({ clientId, projectId, status, summary }: {
  clientId: string; projectId: string; status: string; summary: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPending(true);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/clients/${clientId}/engagements/${projectId}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: data.get("status"), summary: data.get("summary") }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Couldn’t save this project.");
      setMessage("Project updated. The client can now see these changes.");
      router.refresh();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Couldn’t save this project."); }
    finally { setPending(false); }
  }
  return <details className="project-editor"><summary>Update project</summary>
    <form className="auth-form" onSubmit={save}>
      <div className="field"><label htmlFor={`status-${projectId}`}>Project status</label><select id={`status-${projectId}`} name="status" defaultValue={status} required>{projectStatuses.map((value) => <option key={value} value={value}>{statusLabel(value)}</option>)}</select></div>
      <div className="field"><label htmlFor={`summary-${projectId}`}>Client-visible scope / update</label><textarea id={`summary-${projectId}`} name="summary" defaultValue={summary} maxLength={10000} rows={4} /></div>
      <button className="btn btn-ghost" type="submit" disabled={pending}>{pending ? "Saving…" : "Save project"}</button>
      {message && <p role="status">{message}</p>}
    </form>
  </details>;
}
