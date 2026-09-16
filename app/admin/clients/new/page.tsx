import type { Metadata } from "next";
import NewClientForm from "./NewClientForm";

export const metadata: Metadata = {
  title: "New Client — 36 Dunes Admin",
  robots: { index: false, follow: false },
};

export default function NewClientPage() {
  return <NewClientForm />;
}
