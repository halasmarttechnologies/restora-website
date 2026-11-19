import { normalizeEmail } from "@/lib/email";

/** Maximum characters accepted per field (also enforced in the browser with `maxLength`). */
export const CONTACT_LIMITS = { name: 100, topic: 150, details: 5000, detailsMin: 10 } as const;

/**
 * Optional image attachments. The total stays under Vercel's 4.5 MB request limit (see
 * `serverActions.bodySizeLimit` in next.config.ts).
 */
export const ATTACHMENT_LIMITS = {
  maxFiles: 3,
  maxTotalBytes: 4 * 1024 * 1024,
  types: ["image/jpeg", "image/png", "image/webp"],
} as const;

export type ContactField = "name" | "email" | "reason" | "topic" | "details";
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField | "attachments", string>>;

/** Result of a submission, shown by the contact form. */
export type ContactState =
  | { readonly status: "idle" }
  | { readonly status: "success"; readonly message: string }
  | {
      readonly status: "error";
      readonly message: string;
      readonly errors: ContactErrors;
      /** What the visitor typed, so the form can keep it after a failed submission. */
      readonly values: ContactValues;
    };

export const CONTACT_IDLE: ContactState = { status: "idle" };

const text = (formData: FormData, field: ContactField) => {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
};

/** Checks the text fields. `reasons` is the list offered in the form's select. */
export function validateContactFields(
  formData: FormData,
  reasons: readonly string[],
): { values: ContactValues; errors: ContactErrors } {
  const values: ContactValues = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    reason: text(formData, "reason"),
    topic: text(formData, "topic"),
    details: text(formData, "details"),
  };
  const errors: ContactErrors = {};

  if (!values.name) errors.name = "Please enter your name.";
  else if (values.name.length > CONTACT_LIMITS.name) errors.name = "Please shorten your name.";

  const email = normalizeEmail(values.email);
  if (email) values.email = email;
  else errors.email = "Please enter a valid email address.";

  if (!reasons.includes(values.reason)) errors.reason = "Please choose a contact reason.";

  if (!values.topic) errors.topic = "Please add a topic.";
  else if (values.topic.length > CONTACT_LIMITS.topic) errors.topic = "Please shorten the topic.";

  if (values.details.length < CONTACT_LIMITS.detailsMin) {
    errors.details = "Please tell us a little more.";
  } else if (values.details.length > CONTACT_LIMITS.details) {
    errors.details = `Please keep your message under ${CONTACT_LIMITS.details} characters.`;
  }

  return { values, errors };
}

const MEGABYTE = 1024 * 1024;

/** Checks count, type and total size of attachments; `null` when they are fine. */
export function attachmentError(files: readonly File[]): string | null {
  const { maxFiles, maxTotalBytes, types } = ATTACHMENT_LIMITS;

  if (files.length > maxFiles) return `You can attach up to ${maxFiles} images.`;
  if (files.some(({ type }) => !(types as readonly string[]).includes(type))) {
    return "Attachments must be JPG, PNG or WebP images.";
  }
  const total = files.reduce((sum, { size }) => sum + size, 0);
  if (total > maxTotalBytes) return `Attachments must total under ${maxTotalBytes / MEGABYTE} MB.`;
  return null;
}

/** Leading bytes ("magic numbers") of each accepted image format. `null` matches any byte. */
const IMAGE_SIGNATURES: readonly (readonly (number | null)[])[] = [
  [0xff, 0xd8, 0xff], // JPEG
  [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], // PNG
  [0x52, 0x49, 0x46, 0x46, null, null, null, null, 0x57, 0x45, 0x42, 0x50], // WebP: RIFF....WEBP
];

/**
 * Checks the file's actual contents, not just the type the browser reported, so a renamed
 * script or executable is rejected on the server.
 */
export async function isImageFile(file: File): Promise<boolean> {
  const header = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  return IMAGE_SIGNATURES.some((signature) =>
    signature.every((byte, index) => byte === null || header[index] === byte),
  );
}
