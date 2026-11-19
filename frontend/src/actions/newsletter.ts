"use server";

import { normalizeEmail } from "@/lib/email";
import type { NewsletterState } from "@/lib/newsletter";

/**
 * Newsletter sign-up (Server Action, used with `useActionState`).
 *
 * Not connected yet: the address is validated but not stored or sent anywhere. Connect it to
 * the chosen email provider at the marked line before launch.
 */
export async function subscribeToNewsletter(
  _previous: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = normalizeEmail(formData.get("email"));
  if (!email) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  // TODO(newsletter): send `email` to the email provider here.

  return { status: "success", message: "Thank you, you're on the list." };
}
