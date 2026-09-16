import type { Metadata } from "next";
import { adminDb } from "../../../../../lib/firebase/admin";
import NewInvoiceForm from "./NewInvoiceForm";

export const metadata: Metadata = {
  title: "New Invoice — 36 Dunes Admin",
  robots: { index: false, follow: false },
};

export default async function NewInvoicePage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;

  const engagementsSnap = await adminDb
    .collection("clients")
    .doc(clientId)
    .collection("engagements")
    .orderBy("createdAt", "desc")
    .get();

  const engagements = engagementsSnap.docs.map((d) => ({
    id: d.id,
    title: (d.data().title as string) ?? "(untitled)",
  }));

  return <NewInvoiceForm clientId={clientId} engagements={engagements} />;
}
