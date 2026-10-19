import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(file, dependencies = {}, globals = {}) {
  const source = ts.transpileModule(readFileSync(new URL(`../${file}`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const loaded = { exports: {} };
  vm.runInNewContext(`(function(require, module, exports) { ${source}\n})`, {
    Response, Request, Error, console, process: { env: { ADMIN_EMAIL: "owner@example.com" } }, ...globals,
  })((name) => {
    assert.ok(name in dependencies, `Unexpected dependency ${name}`);
    return dependencies[name];
  }, loaded, loaded.exports);
  return loaded.exports;
}

function sessionHarness({ client = { status: "invited", email: "alex@example.com", passwordSet: false }, token: overrides = {}, backendFailure = false } = {}) {
  const token = {
    uid: "alex-uid", email: "alex@example.com", email_verified: true, name: "Alex Rivera",
    auth_time: Date.now() / 1000, firebase: { sign_in_provider: "google.com", identities: { "google.com": ["google-id"] } },
    ...overrides,
  };
  let cookieCreated = false;
  let update = null;
  const route = load("app/api/auth/session/route.ts", {
    "firebase-admin/firestore": { FieldValue: { serverTimestamp: () => "now" } },
    "../../../lib/firebase/admin": {
      adminAuth: { verifyIdToken: async (_token, checkRevoked) => { assert.equal(checkRevoked, true); return token; } },
      adminDb: {
        collection: (name) => ({ doc: (uid) => { assert.equal(name, "clients"); assert.equal(uid, token.uid); return { uid }; } }),
        runTransaction: async (work) => {
          if (backendFailure) throw Error("Database unavailable");
          return work({ get: async () => ({ data: () => client }), update: (_ref, value) => { update = value; } });
        },
      },
    },
    "../../../lib/session": { createSessionCookie: async () => { cookieCreated = true; } },
  });
  return { route, token, cookieCreated: () => cookieCreated, update: () => update };
}
const request = () => new Request("https://36dunes.com/api/auth/session", { method: "POST", body: JSON.stringify({ idToken: "verified-token" }) });

test("verified invited Google user activates their own account and opens dashboard without a password", async () => {
  const h = sessionHarness();
  const response = await h.route.POST(request());
  assert.equal(response.status, 200);
  assert.equal((await response.json()).redirectTo, "/portal");
  assert.equal(h.cookieCreated(), true);
  assert.equal(h.update().status, "active");
  assert.equal(h.update().displayName, "Alex Rivera");
  assert.equal(h.update().passwordSet, undefined);
});

test("email-link onboarding still goes to password setup and active password clients go to dashboard", async () => {
  const token = { firebase: { sign_in_provider: "password", identities: {} } };
  const invited = sessionHarness({ token });
  assert.equal((await (await invited.route.POST(request())).json()).redirectTo, "/portal/set-password");
  assert.equal(invited.update().status, undefined);
  const active = sessionHarness({ token, client: { status: "active", email: "alex@example.com" } });
  assert.equal((await (await active.route.POST(request())).json()).redirectTo, "/portal");
});

test("admin sign-in goes directly to admin and legacy password clients can finish activation", async () => {
  const admin = sessionHarness({ client: null, token: { email: "owner@example.com" } });
  assert.equal((await (await admin.route.POST(request())).json()).redirectTo, "/admin");
  const legacy = sessionHarness({ client: { status: "invited", passwordSet: true, email: "alex@example.com" }, token: { firebase: { sign_in_provider: "password", identities: {} } } });
  assert.equal((await (await legacy.route.POST(request())).json()).redirectTo, "/portal");
  assert.equal(legacy.update().status, "active");
});

test("unknown, disabled, mismatched and stale accounts never receive a session cookie", async () => {
  for (const options of [
    { client: null },
    { client: { status: "disabled", email: "alex@example.com" } },
    { client: { status: "suspended", email: "alex@example.com" } },
    { client: { status: "active", email: "another@example.com" } },
    { token: { auth_time: Date.now() / 1000 - 600 } },
  ]) {
    const h = sessionHarness(options);
    assert.ok((await h.route.POST(request())).status >= 400);
    assert.equal(h.cookieCreated(), false);
  }
  const unverified = sessionHarness({ token: { email_verified: false } });
  assert.equal((await (await unverified.route.POST(request())).json()).redirectTo, "/portal/set-password");
  assert.equal(unverified.update().status, undefined);
});

test("backend failures are distinct from rejected authentication", async () => {
  const h = sessionHarness({ backendFailure: true });
  assert.equal((await h.route.POST(request())).status, 503);
  assert.equal(h.cookieCreated(), false);
});

function loginHarness({ destination = "/portal", error = null, sessionError = null } = {}) {
  const navigations = [];
  const stateChanges = [];
  const calls = [];
  const authClient = load("app/lib/auth-client.ts", {}, { fetch: async (_url, options) => {
    calls.push("session");
    assert.equal(JSON.parse(options.body).idToken, "id-token");
    return Response.json(sessionError ? { error: sessionError } : { redirectTo: destination }, { status: sessionError ? 403 : 200 });
  } });
  let stateIndex = 0;
  const LoginForm = load("app/portal/(auth)/login/LoginForm.tsx", {
    react: { useState: (value) => { const index = stateIndex++; return [value, (next) => stateChanges.push({ index, next })]; } },
    "react/jsx-runtime": { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) },
    "next/link": () => null,
    "firebase/auth": {
      signInWithPopup: async () => { calls.push("google"); if (error) throw error; return { user: { getIdToken: async () => "id-token" } }; },
      GoogleAuthProvider: {},
    },
    "../../../lib/firebase/client": { auth: {}, googleProvider: {} },
    "../../../lib/auth-client": authClient,
  }, { window: { location: { replace: (url) => { calls.push("navigation"); navigations.push(url); } } } }).default;
  function findButton(node) {
    if (!node || typeof node !== "object") return null;
    if (node.type === "button" && node.props.onClick) return node;
    for (const child of [node.props?.children].flat(Infinity)) { const match = findButton(child); if (match) return match; }
    return null;
  }
  return { button: findButton(LoginForm()), navigations, stateChanges, calls };
}

test("Google button establishes server cookie before a full navigation to the server-selected destination", async () => {
  for (const destination of ["/portal", "/admin"]) {
    const h = loginHarness({ destination });
    await h.button.props.onClick();
    assert.deepEqual(h.calls, ["google", "session", "navigation"]);
    assert.deepEqual(h.navigations, [destination]);
  }
});

test("Google button displays session rejection and blocked-popup errors instead of silently staying put", async () => {
  for (const [options, expected] of [
    [{ sessionError: "This account has not been invited." }, /not been invited/],
    [{ error: { code: "auth/popup-blocked" } }, /Allow pop-ups/],
    [{ error: { code: "auth/unauthorized-domain" } }, /not configured/],
  ]) {
    const h = loginHarness(options);
    await h.button.props.onClick();
    assert.equal(h.navigations.length, 0);
    assert.ok(h.stateChanges.some(({ index, next }) => index === 1 && expected.test(next)));
  }
});

test("individual profile name and data come from the verified UID, with a separate profile for every account", async () => {
  let uid = "alex";
  const profiles = {
    alex: { status: "active", contactName: "Client contact", displayName: "Alex Rivera", email: "alex@example.com", businessName: "Alex Co" },
    sam: { status: "active", contactName: "Sam Chen", email: "sam@example.com", businessName: "Sam Co" },
  };
  const guard = load("app/lib/client-guard.ts", {
    "server-only": {}, "next/navigation": { redirect: () => { throw Error("Unexpected redirect"); } },
    "./session": { verifySession: async () => ({ uid, email: profiles[uid].email }) },
    "./firebase/admin": { adminDb: { collection: () => ({ doc: (id) => ({ get: async () => ({ exists: true, id, data: () => profiles[id] }) }) }) } },
  });
  assert.equal((await guard.requireClient()).client.displayName, "Alex Rivera");
  uid = "sam";
  const sam = (await guard.requireClient()).client;
  assert.equal(sam.displayName, "Sam Chen");
  assert.equal(sam.email, "sam@example.com");
  assert.equal(sam.id, "sam");
});

function invitationHarness({ exists = false, failWrite = false } = {}) {
  let created = null;
  const deleted = [];
  const ref = {
    create: async (data) => {
      if (exists) throw Object.assign(Error("Already exists"), { code: 6 });
      if (failWrite) throw Error("Write failed");
      created = data;
    },
    get: async () => ({ exists }),
  };
  const route = load("app/api/admin/clients/route.ts", {
    "../../../lib/admin-guard": { requireAdminApi: async () => ({ email: "owner@example.com" }) },
    "firebase-admin/firestore": { FieldValue: { serverTimestamp: () => "now" } },
    "../../../lib/firebase/admin": {
      adminAuth: {
        createUser: async () => { throw { code: "auth/email-already-exists" }; },
        getUserByEmail: async () => ({ uid: "existing-google-uid", disabled: false }),
        deleteUser: async (uid) => deleted.push(uid),
      },
      adminDb: { collection: () => ({ doc: (uid) => { assert.equal(uid, "existing-google-uid"); return ref; } }) },
    },
  });
  return { route, created: () => created, deleted };
}

test("admin can invite an existing Google identity without replacing another client's record or deleting its Auth account", async () => {
  const invite = () => new Request("https://36dunes.com/api/admin/clients", { method: "POST", body: JSON.stringify({ businessName: "Alex Co", contactName: "Alex", email: "alex@example.com" }) });
  const h = invitationHarness();
  const response = await h.route.POST(invite());
  assert.equal(response.status, 200);
  assert.equal((await response.json()).clientId, "existing-google-uid");
  assert.equal(h.created().status, "invited");
  const duplicate = invitationHarness({ exists: true });
  assert.equal((await duplicate.route.POST(invite())).status, 409);
  assert.equal(duplicate.created(), null);
  assert.equal(duplicate.deleted.length, 0);
  const failure = invitationHarness({ failWrite: true });
  assert.equal((await failure.route.POST(invite())).status, 500);
  assert.equal(failure.deleted.length, 0);
});

function logoutHarness({ serverStatus = 200, clientFailure = false, networkFailure = false } = {}) {
  const calls = [];
  const messages = [];
  const Component = load("app/components/LogoutButton.tsx", {
    react: { useState: (initial) => [initial, (value) => { if (typeof value === "string") messages.push(value); }] },
    "react/jsx-runtime": { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) },
    "firebase/auth": { signOut: async () => { calls.push("firebase"); if (clientFailure) throw Error("Client SDK failed"); } },
    "../lib/firebase/client": { auth: {} },
  }, {
    fetch: async (url, options) => {
      assert.equal(url, "/api/auth/logout");
      assert.equal(options.method, "POST");
      assert.equal(options.credentials, "same-origin");
      calls.push("server");
      if (networkFailure) throw Error("Offline");
      return new Response(null, { status: serverStatus });
    },
    window: { location: { replace: (url) => calls.push(url) } },
  }).default;
  return { click: () => Component().props.children[0].props.onClick(), calls, messages };
}

test("logout clears the server session before Firebase sign-out and full navigation", async () => {
  const h = logoutHarness();
  await h.click();
  assert.deepEqual(h.calls, ["server", "firebase", "/portal/login"]);
});

test("Firebase client sign-out failure cannot prevent server logout or navigation", async () => {
  const h = logoutHarness({ clientFailure: true });
  await h.click();
  assert.deepEqual(h.calls, ["server", "firebase", "/portal/login"]);
  assert.equal(h.messages.length, 0);
});

test("failed server logout offers a retry instead of claiming the user is logged out", async () => {
  for (const options of [{ serverStatus: 500 }, { networkFailure: true }]) {
    const h = logoutHarness(options);
    await h.click();
    assert.deepEqual(h.calls, ["server"]);
    assert.match(h.messages[0], /Couldn’t log out/);
  }
});

test("logout endpoint clears the session and disables response caching", async () => {
  let cleared = false;
  const route = load("app/api/auth/logout/route.ts", {
    "../../../lib/session": { clearSession: async () => { cleared = true; } },
  });
  const response = await route.POST();
  assert.equal(cleared, true);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
});
