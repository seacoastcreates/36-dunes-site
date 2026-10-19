import Link from "next/link";
import { requireClient } from "../../lib/client-guard";
import LogoutButton from "../../components/LogoutButton";
import PortalNavigation from "../components/PortalNavigation";

export const dynamic = "force-dynamic";

export default async function PortalAppLayout({ children }: { children: React.ReactNode }) {
  const { client } = await requireClient();

  return (
    <div className="band portal-shell">
      <header>
        <div className="wrap header-row">
          <Link className="brand" href="/portal">
            36&nbsp;DUNES
          </Link>
          <div className="portal-nav">
            <div className="portal-identity"><strong>{client.displayName}</strong><span>{client.email}</span></div>
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="wrap"><PortalNavigation /></div>
      <main id="dashboard-content" className="wrap portal-main dashboard-main">{children}</main>
    </div>
  );
}
