import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export interface ContactFormProps {
  /** Options for the "Contact reason" select. */
  readonly reasons: readonly string[];
}

/** Shared by every field: the accessible label (also shown as placeholder) and any error. */
interface FieldBaseProps {
  readonly name: string;
  readonly label: string;
  readonly error?: string | undefined;
}

export type TextFieldProps = FieldBaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "placeholder">;

export type TextAreaFieldProps = FieldBaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "placeholder">;

export type SelectFieldProps = FieldBaseProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "name"> & {
    readonly options: readonly string[];
  };

export interface AttachmentFieldProps {
  readonly files: readonly File[];
  readonly error?: string | undefined;
  readonly onAdd: (files: readonly File[]) => void;
  readonly onRemove: (index: number) => void;
}
