import type { ReactNode } from "react";

import type { SelectFieldProps, TextAreaFieldProps, TextFieldProps } from "./contact.types";

/**
 * White rounded control; a dark ring marks focus and errors. Text is 16px on phones: iOS Safari
 * and in-app browsers (Instagram, Facebook, …) zoom the page when a smaller field is focused.
 */
const CONTROL_CLASS =
  "w-full rounded-md bg-brand-white px-4 py-3 text-base sm:text-sm placeholder:text-brand-black/50 focus:ring-2 focus:ring-brand-black/40 focus:outline-none aria-invalid:ring-2 aria-invalid:ring-brand-black";

/** Ids and ARIA attributes linking a control to its label and error message. */
function fieldA11y(name: string, error: string | undefined) {
  const errorId = `${name}-error`;
  return {
    id: `contact-${name}`,
    errorId,
    control: {
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? errorId : undefined,
    },
  };
}

/**
 * Visually the design shows the label as a placeholder ("Email*"); the real `<label>` stays
 * available to screen readers, and the error is announced as the control's description.
 */
function FieldShell(props: {
  id: string;
  label: string;
  errorId: string;
  error: string | undefined;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={props.id} className="sr-only">
        {props.label}
      </label>
      {props.children}
      {props.error && (
        <p id={props.errorId} className="mt-1.5 text-xs text-brand-black">
          {props.error}
        </p>
      )}
    </div>
  );
}

export function TextField({ name, label, error, required, ...input }: TextFieldProps) {
  const { id, errorId, control } = fieldA11y(name, error);
  return (
    <FieldShell id={id} label={label} errorId={errorId} error={error}>
      <input
        {...input}
        {...control}
        id={id}
        name={name}
        required={required}
        placeholder={required ? `${label}*` : label}
        className={CONTROL_CLASS}
      />
    </FieldShell>
  );
}

export function TextAreaField({ name, label, error, required, ...textarea }: TextAreaFieldProps) {
  const { id, errorId, control } = fieldA11y(name, error);
  return (
    <FieldShell id={id} label={label} errorId={errorId} error={error}>
      <textarea
        {...textarea}
        {...control}
        id={id}
        name={name}
        required={required}
        placeholder={required ? `${label}*` : label}
        className={`${CONTROL_CLASS} min-h-40 resize-y`}
      />
    </FieldShell>
  );
}

/** Native `<select>` with a custom chevron; the empty first option acts as the placeholder. */
export function SelectField({
  name,
  label,
  error,
  required,
  options,
  ...select
}: SelectFieldProps) {
  const { id, errorId, control } = fieldA11y(name, error);
  return (
    <FieldShell id={id} label={label} errorId={errorId} error={error}>
      <div className="relative">
        <select
          {...select}
          {...control}
          id={id}
          name={name}
          required={required}
          className={`${CONTROL_CLASS} appearance-none pr-10 invalid:text-brand-black/50`}
        >
          <option value="">{required ? `${label}*` : label}</option>
          {options.map((option) => (
            <option key={option} value={option} className="text-brand-black">
              {option}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 size-3 -translate-y-1/2"
        >
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </FieldShell>
  );
}
