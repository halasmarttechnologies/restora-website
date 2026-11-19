/** Longest valid email address (RFC 5321 path limit). Also caps what the server will process. */
const MAX_EMAIL_LENGTH = 254;

/** Deliberately simple: one "@", no spaces, a dot in the domain. Delivery is the real test. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns the trimmed, lower-cased address, or `null` if the value is not a plausible email. */
export function normalizeEmail(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  return email.length <= MAX_EMAIL_LENGTH && EMAIL_PATTERN.test(email) ? email : null;
}
