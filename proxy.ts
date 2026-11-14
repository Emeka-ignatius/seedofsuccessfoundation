import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decideGate } from "@/lib/security/gate";
import { getSiteMode } from "@/lib/security/site-mode";

// Runs before every request that matches `config.matcher`. Its only job in Phase 0 is the holding gate.
// STRICT: see lib/security/CLAUDE.md. Proxy is an optimistic layer; it must never be the only check on anything.
export function proxy(request: NextRequest) {
  const decision = decideGate(getSiteMode(), request.method, request.nextUrl.pathname);

  if (decision === "redirect-home") {
    return NextResponse.redirect(new URL("/", request.url), 307);
  }
  if (decision === "not-found") {
    return new NextResponse("Not found", { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  // Next's own build output is served separately and is not an entry point. Everything else goes through the gate,
  // including files in /public, so an asset is reachable in holding mode only if gate.ts lists it.
  matcher: ["/((?!_next/static|_next/image).*)"],
};
