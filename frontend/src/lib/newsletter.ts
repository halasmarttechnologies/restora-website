/** Result of a newsletter sign-up, shown under the form. */
export type NewsletterState =
  { readonly status: "idle" } | { readonly status: "success" | "error"; readonly message: string };

export const NEWSLETTER_IDLE: NewsletterState = { status: "idle" };

/** Deliberately simple: one "@", no spaces, a dot in the domain. Delivery is the real test. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns the trimmed, lower-cased address, or `null` if the value is not a plausible email. */
export function normalizeEmail(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  return EMAIL_PATTERN.test(email) ? email : null;
}
