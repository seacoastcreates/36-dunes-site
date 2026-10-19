export function formatMoney(cents: number) {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function dateMillis(value: unknown): number | null {
  if (!value || typeof value !== "object" || !("toMillis" in value)) return null;
  const millis = (value as { toMillis: () => number }).toMillis();
  return Number.isFinite(millis) ? millis : null;
}

export function formatDate(millis: number | null, dateOnly = false) {
  return millis === null ? "—" : new Date(millis).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: dateOnly ? "UTC" : "America/New_York",
  });
}

export function statusLabel(status: string) {
  return status.replaceAll("_", " ");
}

export const projectStatuses = ["planned", "active", "on_hold", "completed", "canceled"] as const;

export function isOutstanding(status: string) {
  return ["sent", "overdue", "past_due"].includes(status);
}

export function isInvoiceOverdue(invoice: { status: string; dueAt: number | null }, now = Date.now()) {
  if (!isOutstanding(invoice.status)) return false;
  if (["overdue", "past_due"].includes(invoice.status)) return true;
  if (invoice.dueAt === null) return false;
  // Invoice due dates are stored as YYYY-MM-DD at midnight UTC. Compare their
  // calendar date to today's business date so they aren't overdue a day early.
  const parts = new Intl.DateTimeFormat("en-US", {
    year: "numeric", month: "2-digit", day: "2-digit", timeZone: "America/New_York",
  }).formatToParts(now);
  const value = (type: string) => parts.find((part) => part.type === type)?.value;
  const today = `${value("year")}-${value("month")}-${value("day")}`;
  return new Date(invoice.dueAt).toISOString().slice(0, 10) < today;
}

export function dashboardTotals(
  projects: { status: string }[],
  invoices: { status: string; amountDue: number; dueAt: number | null }[],
  now = Date.now(),
) {
  return {
    activeProjects: projects.filter((project) => project.status === "active").length,
    outstanding: invoices.filter((invoice) => isOutstanding(invoice.status)).reduce((sum, invoice) => sum + invoice.amountDue, 0),
    paid: invoices.filter((invoice) => invoice.status === "paid").reduce((sum, invoice) => sum + invoice.amountDue, 0),
    overdueCount: invoices.filter((invoice) => isInvoiceOverdue(invoice, now)).length,
  };
}
