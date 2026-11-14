import { z } from "zod";

/** Trim, lower-case, and bound the length (RFC 5321 caps an address at 254 characters). */
export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Please enter your email address.")
  .max(254, "That email address is too long.")
  .pipe(z.email("Please enter a valid email address."));

export function parseEmail(
  value: unknown,
): { ok: true; email: string } | { ok: false; message: string } {
  const result = emailSchema.safeParse(typeof value === "string" ? value : "");
  return result.success
    ? { ok: true, email: result.data }
    : {
        ok: false,
        message: result.error.issues[0]?.message ?? "Please enter a valid email address.",
      };
}
