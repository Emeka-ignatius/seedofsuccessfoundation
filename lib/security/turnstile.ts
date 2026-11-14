import "server-only";
import { getEnv } from "./env";

// Server-side verification of a Cloudflare Turnstile token. A token proves a person (or at least a real
// browser) completed the challenge; it is single-use and short-lived, so it must be checked on the server for
// every protected submission. FAIL CLOSED: a missing secret, a network error or a timeout all mean "not verified".

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type TurnstileResult = "verified" | "rejected" | "unavailable";

export async function verifyTurnstile(token: string, remoteIp?: string): Promise<TurnstileResult> {
  const secret = getEnv().TURNSTILE_SECRET_KEY;
  if (!secret) return "unavailable";
  if (!token) return "rejected";

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!res.ok) return "unavailable";
    const data = (await res.json()) as { success?: boolean };
    return data.success === true ? "verified" : "rejected";
  } catch {
    return "unavailable";
  }
}
