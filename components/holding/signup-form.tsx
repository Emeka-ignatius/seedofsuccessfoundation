"use client";

import Link from "next/link";
import Script from "next/script";
import { useActionState, useEffect } from "react";
import { subscribe, type SubscribeState } from "@/lib/subscribers/actions";

const initialState: SubscribeState = { status: "idle", message: "", email: "" };

declare global {
  interface Window {
    turnstile?: { reset: (widget?: string | HTMLElement) => void };
  }
}

interface Props {
  /** Public by design. Passed from the server so it is runtime configuration, not baked into the build. */
  turnstileSiteKey: string | undefined;
  /** The exact wording shown beside the button. The server stores the same constant, not what is posted. */
  consentText: string;
}

export function SignupForm({ turnstileSiteKey, consentText }: Props) {
  const [state, formAction, pending] = useActionState(subscribe, initialState);

  // A Turnstile token is single use. After every attempt, ask for a fresh one.
  useEffect(() => {
    if (state.status !== "idle") window.turnstile?.reset();
  }, [state]);

  const failed = state.status === "error";
  const succeeded = state.status === "success";

  return (
    <form action={formAction} className="signup" noValidate aria-describedby="signup-consent">
      <label htmlFor="signup-email" className="signup-label">
        Be the first to know when we launch
      </label>

      <div className="signup-row">
        <input
          id="signup-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={254}
          defaultValue={state.email}
          placeholder="Your email address"
          aria-invalid={failed || undefined}
          aria-describedby={failed ? "signup-feedback signup-consent" : "signup-consent"}
          className="signup-input"
          disabled={!turnstileSiteKey}
        />
        <button type="submit" className="signup-button" disabled={pending || !turnstileSiteKey}>
          {pending ? "Sending…" : "Keep me updated"}
        </button>
      </div>

      {/* Honeypot: invisible to people and assistive technology, tempting to bots. */}
      <div className="signup-trap" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {turnstileSiteKey ? (
        <>
          <div
            className="cf-turnstile"
            data-sitekey={turnstileSiteKey}
            data-theme="dark"
            data-appearance="interaction-only"
            data-response-field-name="cf-turnstile-response"
          />
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />
        </>
      ) : null}

      {/* Always in the DOM so screen readers announce changes. Never signalled by colour alone. */}
      <p
        id="signup-feedback"
        role="status"
        aria-live="polite"
        className={failed ? "signup-feedback signup-error" : "signup-feedback signup-ok"}
      >
        {failed ? (
          <span aria-hidden="true">⚠ </span>
        ) : succeeded ? (
          <span aria-hidden="true">✓ </span>
        ) : null}
        {state.message}
      </p>

      <p id="signup-consent" className="signup-consent">
        {consentText}{" "}
        <Link href="/privacy" className="text-link">
          Read our privacy notice
        </Link>
        .
      </p>

      <noscript>
        <p className="signup-consent">
          Sign-up uses a spam check that needs JavaScript. Please turn it on, or check back soon.
        </p>
      </noscript>
    </form>
  );
}
