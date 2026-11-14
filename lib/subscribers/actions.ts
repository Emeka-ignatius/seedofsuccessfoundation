"use server";

import { headers } from "next/headers";
import { db } from "@/lib/db";
import { getEnv } from "@/lib/security/env";
import { checkRateLimit, clientAddress } from "@/lib/security/rate-limit";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { CONSENT_TEXT } from "./consent";
import { parseEmail } from "./validation";

export interface SubscribeState {
  status: "idle" | "success" | "error";
  message: string;
  /** Echoed back so a failed attempt does not make the person retype their address. */
  email: string;
}

const GENERIC_ERROR = "Something went wrong on our side. Please try again in a moment.";

/**
 * Holding-page sign-up. Order matters: cheap checks first, the database last.
 *   honeypot -> rate limit -> Turnstile -> validation -> upsert
 * Never logs the email address, the client address or the token. Duplicate addresses succeed quietly, so the
 * form cannot be used to discover who has already subscribed.
 */
export async function subscribe(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const rawEmail = formData.get("email");
  const echo = typeof rawEmail === "string" ? rawEmail.slice(0, 254) : "";
  const fail = (message: string): SubscribeState => ({ status: "error", message, email: echo });

  // 1. Honeypot. A human never sees this field. Pretend success so a bot learns nothing.
  const trap = formData.get("website");
  if (typeof trap === "string" && trap.trim() !== "") {
    return { status: "success", message: "Thank you. We'll be in touch.", email: "" };
  }

  const env = getEnv();
  if (!env.TURNSTILE_SECRET_KEY || !env.RATE_LIMIT_SECRET || !env.DATABASE_URL) {
    console.error("[subscribe] disabled: missing configuration");
    return fail("Sign-up is temporarily unavailable. Please check back soon.");
  }

  const address = clientAddress(await headers());

  try {
    // 2. Rate limit: per address, then a global ceiling so a distributed flood cannot fill the table.
    const perAddress = await checkRateLimit({
      action: "subscribe",
      subject: address,
      limit: 5,
      windowSeconds: 60 * 60,
    });
    const global = await checkRateLimit({
      action: "subscribe-global",
      subject: "all",
      limit: 300,
      windowSeconds: 60 * 60,
    });
    if (!perAddress.ok || !global.ok) {
      return fail("Too many attempts. Please try again later.");
    }

    // 3. Bot check. Fails closed: if Cloudflare cannot be reached, nobody is let through unverified.
    const token = formData.get("cf-turnstile-response");
    const verdict = await verifyTurnstile(typeof token === "string" ? token : "", address);
    if (verdict === "unavailable") return fail(GENERIC_ERROR);
    if (verdict === "rejected") return fail("We couldn't confirm you're human. Please try again.");

    // 4. Validate.
    const parsed = parseEmail(rawEmail);
    if (!parsed.ok) return fail(parsed.message);

    // 5. Store. An existing address is a quiet no-op (empty update), identical response either way.
    await db.subscriber.upsert({
      where: { email: parsed.email },
      update: {},
      create: { email: parsed.email, consentText: CONSENT_TEXT, source: "holding-page" },
    });

    return { status: "success", message: "Thank you. We'll be in touch.", email: "" };
  } catch (error) {
    // Name only. Error messages from the database can contain the values that were being written.
    console.error("[subscribe] failed:", error instanceof Error ? error.name : "unknown");
    return fail(GENERIC_ERROR);
  }
}
