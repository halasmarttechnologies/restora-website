/** Result of a newsletter sign-up, shown under the form. */
export type NewsletterState =
  { readonly status: "idle" } | { readonly status: "success" | "error"; readonly message: string };

export const NEWSLETTER_IDLE: NewsletterState = { status: "idle" };
