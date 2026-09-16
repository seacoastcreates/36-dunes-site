import type { Metadata } from "next";
import { retainerPlans } from "../../../../../lib/stripe/retainerPlans";
import NewEngagementForm from "./NewEngagementForm";

export const metadata: Metadata = {
  title: "New Engagement — 36 Dunes Admin",
  robots: { index: false, follow: false },
};

export default async function NewEngagementPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  return <NewEngagementForm clientId={clientId} retainerPlans={retainerPlans} />;
}
