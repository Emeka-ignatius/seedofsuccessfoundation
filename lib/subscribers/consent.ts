// The consent wording shown beside the sign-up field. It is stored verbatim with each subscriber (like a Gift Aid
// declaration), and it is read from here on the server, never from the submitted form, so the record always
// matches what the page actually displayed.
//
// DRAFT wording, pending the charity's approval. If it changes, bump CONSENT_VERSION so old records stay traceable.
export const CONSENT_VERSION = "holding-2026-11-14";

export const CONSENT_TEXT =
  "By subscribing you agree to receive occasional emails about St Perpetua Hospital and the launch of this website. You can unsubscribe at any time.";
