import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(file, dependencies = {}) {
  const source = ts.transpileModule(readFileSync(new URL(`../${file}`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const loaded = { exports: {} };
  vm.runInNewContext(`(function(require, module, exports) { ${source}\n})`, { Response, console })((name) => {
    assert.ok(name in dependencies, `Unexpected dependency ${name}`);
    return dependencies[name];
  }, loaded, loaded.exports);
  return loaded.exports;
}
const format = load("app/lib/portal/format.ts");

test("dashboard balance excludes paid, draft and canceled invoices", () => {
  const totals = format.dashboardTotals([{ status: "active" }, { status: "completed" }, { status: "on_hold" }], [
    { status: "sent", amountDue: 5000, dueAt: null },
    { status: "overdue", amountDue: 7000, dueAt: null },
    { status: "paid", amountDue: 3000, dueAt: null },
    { status: "draft", amountDue: 10000, dueAt: null },
    { status: "canceled", amountDue: 20000, dueAt: null },
  ]);
  assert.equal(totals.activeProjects, 1);
  assert.equal(totals.outstanding, 12000);
  assert.equal(totals.paid, 3000);
  assert.equal(totals.overdueCount, 1);
});

test("due dates keep their intended calendar day and become overdue after the business day", () => {
  const invoice = { status: "sent", dueAt: Date.parse("2026-10-16T00:00:00Z") };
  assert.equal(format.formatDate(invoice.dueAt, true), "Oct 16, 2026");
  assert.equal(format.isInvoiceOverdue(invoice, Date.parse("2026-10-17T03:59:59Z")), false);
  assert.equal(format.isInvoiceOverdue(invoice, Date.parse("2026-10-17T04:00:00Z")), true);
  assert.equal(format.isInvoiceOverdue({ ...invoice, status: "paid" }, Date.parse("2026-11-01T00:00:00Z")), false);
});

test("portal queries are scoped to the verified client and omit draft invoices", async () => {
  const paths = [];
  function ref(path) {
    return {
      doc: (id) => ref(`${path}/${id}`), collection: (name) => ref(`${path}/${name}`),
      orderBy: () => ref(path), get: async () => {
        paths.push(path);
        const rows = path.endsWith("invoices")
          ? [{ id: "issued", status: "sent", amountDue: 5000 }, { id: "draft", status: "draft", amountDue: 2000 }]
          : [{ id: "project-a", title: "Client A project", status: "active" }];
        return { docs: rows.map((row) => ({ id: row.id, data: () => ({ ...row, id: "untrusted-stored-id" }) })) };
      },
    };
  }
  const data = load("app/lib/portal/data.ts", {
    "server-only": {}, react: { cache: (fn) => fn },
    "../firebase/admin": { adminDb: { collection: (name) => ref(name) } },
    "../client-guard": { requireClient: async () => ({ client: { id: "verified-client-a" } }) },
    "./format": format,
  });
  const result = await data.getPortalData();
  assert.deepEqual(paths.sort(), ["clients/verified-client-a/engagements", "clients/verified-client-a/invoices"]);
  assert.equal(result.invoices.length, 1);
  assert.equal(result.invoices[0].id, "issued");
  assert.equal(result.projects[0].id, "project-a");
});

function projectRoute({ admin = true, exists = true } = {}) {
  let saved = null;
  const ref = { collection: () => ref, doc: () => ref };
  const route = load("app/api/admin/clients/[clientId]/engagements/[engagementId]/route.ts", {
    "firebase-admin/firestore": { FieldValue: { serverTimestamp: () => "now" } },
    "../../../../../../lib/admin-guard": { requireAdminApi: async () => admin ? { email: "admin@example.com" } : null },
    "../../../../../../lib/firebase/admin": { adminDb: {
      collection: () => ref,
      runTransaction: async (work) => work({ get: async () => ({ exists }), update: (_ref, data) => { saved = data; } }),
    } },
    "../../../../../../lib/portal/format": format,
  });
  return { route, saved: () => saved };
}
const params = { params: Promise.resolve({ clientId: "client-a", engagementId: "project-a" }) };
const request = (body) => new Request("https://36dunes.com/api/admin/clients/client-a/engagements/project-a", { method: "PATCH", body: JSON.stringify(body) });

test("project updates require admin access and validate status", async () => {
  const nonAdmin = projectRoute({ admin: false });
  assert.equal((await nonAdmin.route.PATCH(request({ status: "completed", summary: "Done" }), params)).status, 401);
  assert.equal(nonAdmin.saved(), null);
  const h = projectRoute();
  assert.equal((await h.route.PATCH(request({ status: "paid", summary: "Not a project status" }), params)).status, 400);
  assert.equal(h.saved(), null);
  assert.equal((await h.route.PATCH(request({ status: "completed", summary: "  Delivered  ", amountTotal: 1 }), params)).status, 200);
  assert.equal(h.saved().summary, "Delivered");
  assert.equal(h.saved().status, "completed");
  assert.equal(h.saved().amountTotal, undefined);
  assert.equal(h.saved().updatedBy, "admin@example.com");
  assert.equal((await projectRoute({ exists: false }).route.PATCH(request({ status: "active", summary: "" }), params)).status, 404);
});
