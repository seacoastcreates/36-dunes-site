import Link from "next/link";
import { requireClient } from "../../lib/client-guard";
import LogoutButton from "../../components/LogoutButton";

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
          <nav className="portal-nav">
            <span>{client.businessName}</span>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="wrap portal-main">{children}</main>
    </div>
  );
}
