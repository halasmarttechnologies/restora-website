"use client";

import { useActionState, type ClipboardEvent } from "react";

import { sendContactMessage } from "@/actions/contact";
import { CONTACT_IDLE, CONTACT_LIMITS } from "@/lib/contact";
import { TextLink } from "@/components/text-link";

import { AttachmentField } from "./attachment-field";
import type { ContactFormProps } from "./contact.types";
import { SelectField, TextAreaField, TextField } from "./form-field";
import { useAttachments } from "./use-attachments";

/**
 * Contact form. Fields are validated by the browser (`required`, `type="email"`, `maxLength`)
 * and again on the server by `sendContactMessage`. After a failed submission each error sits
 * under its field and the typed values are kept; after success the form is replaced by a
 * confirmation.
 */
export function ContactForm({ reasons }: ContactFormProps) {
  const [state, dispatch, isPending] = useActionState(sendContactMessage, CONTACT_IDLE);
  const attachments = useAttachments();

  // Images live in state (they can come from drag-and-drop or paste), so add them on submit.
  const submit = (formData: FormData) => {
    attachments.files.forEach((file) => formData.append("attachments", file));
    dispatch(formData);
  };

  const onPaste = (event: ClipboardEvent<HTMLFormElement>) => {
    const pasted = [...event.clipboardData.files];
    if (pasted.length === 0) return; // Plain text pastes into fields as usual.
    event.preventDefault();
    attachments.add(pasted);
  };

  const errors = state.status === "error" ? state.errors : {};
  const values = state.status === "error" ? state.values : undefined;

  return (
    // Persistent live region, so the confirmation that replaces the form is announced.
    <div aria-live="polite" className="mt-6">
      {state.status === "success" ? (
        <p className="rounded-md bg-brand-white px-4 py-6 text-center text-sm">{state.message}</p>
      ) : (
        <form
          action={submit}
          onPaste={onPaste}
          aria-label="Contact us"
          className="flex flex-col gap-3"
        >
          <p className="mb-1 text-xs text-brand-black/70">* indicates a required field</p>

          <TextField
            name="name"
            label="First and last name"
            autoComplete="name"
            maxLength={CONTACT_LIMITS.name}
            defaultValue={values?.name}
            error={errors.name}
            required
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            defaultValue={values?.email}
            error={errors.email}
            required
          />
          <SelectField
            // A <select> ignores later `defaultValue` changes, so React's post-submit form
            // reset would clear it. Remounting with the returned value keeps the choice.
            key={values?.reason ?? ""}
            name="reason"
            label="Contact reason"
            options={reasons}
            defaultValue={values?.reason ?? ""}
            error={errors.reason}
            required
          />
          <TextField
            name="topic"
            label="Topic"
            maxLength={CONTACT_LIMITS.topic}
            defaultValue={values?.topic}
            error={errors.topic}
            required
          />
          <TextAreaField
            name="details"
            label="Tell us the details"
            minLength={CONTACT_LIMITS.detailsMin}
            maxLength={CONTACT_LIMITS.details}
            defaultValue={values?.details}
            error={errors.details}
            required
          />

          {/* Honeypot: hidden from people and assistive technology; bots tend to fill it. */}
          <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
            <label>
              Website
              <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div className="mt-5">
            <AttachmentField
              files={attachments.files}
              error={attachments.error ?? errors.attachments}
              onAdd={attachments.add}
              onRemove={attachments.remove}
            />
          </div>

          {state.status === "error" && (
            <p role="alert" className="text-sm">
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-3 h-[38px] w-full cursor-pointer rounded-full border-[1.5px] border-brand-black text-sm uppercase transition-colors hover:bg-brand-black hover:text-brand-white disabled:cursor-default disabled:opacity-50"
          >
            {isPending ? "Sending…" : "Submit"}
          </button>
          <p className="text-center text-xs text-brand-black/60">
            By submitting this form, you agree to our{" "}
            <TextLink href="/privacy">Privacy Policy</TextLink>.
          </p>
        </form>
      )}
    </div>
  );
}
