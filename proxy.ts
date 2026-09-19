import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Deliberately Node-free: this only checks whether the session cookie is
// present so we can redirect early. Real verification (signature, expiry,
// admin-email match) always happens again via verifySession()/requireAdmin()
// in the Server Component / Route Handler layer, which can safely use the
// Admin SDK. Keeping firebase-admin out of this file avoids relying on how
// Netlify's runtime happens to deploy it.
const PUBLIC_PORTAL_PATHS = [
  "/portal/login",
  "/portal/invite",
  "/portal/set-password",
  "/portal/forgot-password",
];

export function proxy(request: NextRequest) {
  const isPublicPath = PUBLIC_PORTAL_PATHS.includes(request.nextUrl.pathname);
  const hasSession = request.cookies.has("portal_session");

  if (!isPublicPath && !hasSession) {
    return NextResponse.redirect(new URL("/portal/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};
