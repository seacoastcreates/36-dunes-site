"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/portal", label: "Overview" },
  { href: "/portal/projects", label: "Projects" },
  { href: "/portal/billing", label: "Billing" },
];

export default function PortalNavigation() {
  const pathname = usePathname();
  return <nav className="dashboard-tabs" aria-label="Client dashboard">
    {items.map(({ href, label }) => {
      const active = pathname === href || (label === "Projects" && pathname.startsWith("/portal/engagements/"))
        || (label === "Billing" && pathname.startsWith("/portal/invoices/"));
      return <Link key={href} href={href} aria-current={active ? "page" : undefined}>{label}</Link>;
    })}
  </nav>;
}
