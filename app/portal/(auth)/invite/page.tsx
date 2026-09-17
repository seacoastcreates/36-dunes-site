import type { Metadata } from "next";
import InviteForm from "./InviteForm";

export const metadata: Metadata = {
  title: "Accept invite — 36 Dunes",
  robots: { index: false, follow: false },
};

export default function InvitePage() {
  return <InviteForm />;
}
