import "server-only";
import { cache } from "react";
import { adminDb } from "../firebase/admin";
import { requireClient } from "../client-guard";
import { dateMillis } from "./format";

export type Project = {
  id: string;
  title: string;
  summary: string;
  type: string;
  status: string;
  amountTotal: number | null;
  stripePriceId: string | null;
  updatedAt: number | null;
};

export type Invoice = {
  id: string;
  engagementId: string;
  description: string;
  amountDue: number;
  status: string;
  dueAt: number | null;
  paidAt: number | null;
};

// React cache lasts for this server render, not across client accounts.
// Every read is rooted at the verified client's ID; no client ID comes from a URL.
export const getPortalData = cache(async () => {
  const { client } = await requireClient();
  const ref = adminDb.collection("clients").doc(client.id);
  const [projectsSnap, invoicesSnap] = await Promise.all([
    ref.collection("engagements").orderBy("createdAt", "desc").get(),
    ref.collection("invoices").orderBy("createdAt", "desc").get(),
  ]);
  const projects: Project[] = projectsSnap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id, title: data.title ?? "Untitled project", summary: data.summary ?? "",
      type: data.type ?? "one_time", status: data.status ?? "planned",
      amountTotal: data.amountTotal ?? null, stripePriceId: data.stripePriceId ?? null,
      updatedAt: dateMillis(data.updatedAt ?? data.createdAt),
    };
  });
  const invoices: Invoice[] = invoicesSnap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id, engagementId: data.engagementId ?? "", description: data.description ?? "Invoice",
      amountDue: data.amountDue ?? 0, status: data.status ?? "draft",
      dueAt: dateMillis(data.dueDate), paidAt: dateMillis(data.paidAt),
    };
  });
  // Draft invoices belong to the admin workflow and are not client-facing.
  return { client, projects, invoices: invoices.filter((invoice) => invoice.status !== "draft") };
});
