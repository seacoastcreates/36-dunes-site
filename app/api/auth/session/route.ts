import { adminAuth } from "../../../lib/firebase/admin";
import { createSessionCookie } from "../../../lib/session";

export async function POST(request: Request) {
  const { idToken } = await request.json();

  if (typeof idToken !== "string" || !idToken) {
    return Response.json({ error: "Missing idToken" }, { status: 400 });
  }

  try {
    // Verifies the token is genuinely signed by our Firebase project before
    // trusting it enough to mint a session cookie from it.
    await adminAuth.verifyIdToken(idToken);
  } catch {
    return Response.json({ error: "Invalid idToken" }, { status: 401 });
  }

  await createSessionCookie(idToken);
  return Response.json({ ok: true });
}
