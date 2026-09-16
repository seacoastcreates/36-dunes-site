import Link from "next/link";
import { requireAdmin } from "../lib/admin-guard";
import LogoutButton from "../components/LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="band portal-shell">
      <header>
        <div className="wrap header-row">
          <Link className="brand" href="/admin">
            36&nbsp;DUNES ADMIN
          </Link>
          <nav className="portal-nav">
            <Link href="/admin">Clients</Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="wrap portal-main">{children}</main>
    </div>
  );
}
