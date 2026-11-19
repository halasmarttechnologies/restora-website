"use server";

import { CONTACT_REASONS } from "@/constants/contact";
import {
  attachmentError,
  isImageFile,
  validateContactFields,
  type ContactState,
} from "@/lib/contact";

const SUCCESS: ContactState = {
  status: "success",
  message: "Thank you, your message is on its way. We'll be in touch soon.",
};

/**
 * Contact form submission (Server Action, used with `useActionState`). Every field is checked
 * again here, because anything sent from the browser can be forged.
 *
 * Not connected yet: the message is validated but not stored or sent anywhere. Connect it to
 * the chosen email provider at the marked line before launch.
 */
export async function sendContactMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: a field people never see. Bots that fill it get a normal-looking success.
  if (formData.get("website")) return SUCCESS;

  const { values, errors } = validateContactFields(formData, CONTACT_REASONS);

  const files = formData
    .getAll("attachments")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const fileError = attachmentError(files);
  if (fileError) {
    errors.attachments = fileError;
  } else if (!(await Promise.all(files.map(isImageFile))).every(Boolean)) {
    errors.attachments = "One of the attachments is not a valid image.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
      values,
    };
  }

  // TODO(contact): send `values` and `files` to the email provider here.

  return SUCCESS;
}
