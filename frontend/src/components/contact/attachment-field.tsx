"use client";

import type { ChangeEvent, DragEvent } from "react";

import { ATTACHMENT_LIMITS } from "@/lib/contact";

import type { AttachmentFieldProps } from "./contact.types";

const INPUT_ID = "contact-attachments";
const HINT_ID = "contact-attachments-hint";
const ERROR_ID = "contact-attachments-error";
const MAX_MB = ATTACHMENT_LIMITS.maxTotalBytes / (1024 * 1024);

/**
 * Optional images: drop them on the field, paste them anywhere in the form (handled by the
 * form), or pick them with the Upload button. Picked files are listed with a remove button.
 */
export function AttachmentField({ files, error, onAdd, onRemove }: AttachmentFieldProps) {
  const onPick = (event: ChangeEvent<HTMLInputElement>) => {
    onAdd([...(event.target.files ?? [])]);
    // Clear the input so picking the same file again still fires `change`.
    event.target.value = "";
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    onAdd([...event.dataTransfer.files]);
  };

  return (
    <div>
      <p id={HINT_ID} className="text-xs text-brand-black/70">
        (Optional) Up to {ATTACHMENT_LIMITS.maxFiles} images (JPG, PNG or WebP), {MAX_MB} MB in
        total.
      </p>

      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDrop}
        className="mt-2 flex items-center justify-between gap-4 rounded-md bg-brand-white px-4 py-3 text-sm"
      >
        <span className="flex items-center gap-2 text-brand-black/70">
          <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
            <rect
              x="1.5"
              y="2.5"
              width="13"
              height="11"
              rx="1.5"
              fill="none"
              stroke="currentColor"
            />
            <path d="M3.5 11.5l3-3.5 2.5 2.5 1.5-1.5 2 2.5" fill="none" stroke="currentColor" />
          </svg>
          Drag or paste images here.
        </span>
        <input
          id={INPUT_ID}
          type="file"
          multiple
          accept={ATTACHMENT_LIMITS.types.join(",")}
          onChange={onPick}
          aria-describedby={error ? `${HINT_ID} ${ERROR_ID}` : HINT_ID}
          className="peer sr-only"
        />
        <label
          htmlFor={INPUT_ID}
          className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-sm transition-opacity peer-focus-visible:ring-2 peer-focus-visible:ring-brand-black/40 hover:opacity-70"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
            <path
              d="M8 11V3M4.5 6.5L8 3l3.5 3.5M2.5 11v2.5h11V11"
              fill="none"
              stroke="currentColor"
            />
          </svg>
          Upload<span className="sr-only"> images</span>
        </label>
      </div>

      {error && (
        <p id={ERROR_ID} role="alert" className="mt-1.5 text-xs text-brand-black">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <ul aria-label="Attached images" className="mt-2 flex flex-col gap-1.5 text-sm">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.lastModified}-${index}`}
              className="flex items-center justify-between gap-4 rounded-md bg-brand-white px-4 py-2"
            >
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                onClick={() => onRemove(index)}
                className="shrink-0 cursor-pointer text-lg leading-none transition-opacity hover:opacity-60"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
