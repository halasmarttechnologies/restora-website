"use client";

import { useState } from "react";

import { attachmentError } from "@/lib/contact";

/**
 * Images picked, dropped or pasted into the contact form. New files are only accepted when the
 * whole set still passes the attachment rules; otherwise the reason is returned as `error`.
 */
export function useAttachments() {
  const [files, setFiles] = useState<readonly File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const add = (added: readonly File[]) => {
    if (added.length === 0) return;
    const next = [...files, ...added];
    const problem = attachmentError(next);
    setError(problem);
    if (!problem) setFiles(next);
  };

  const remove = (index: number) => {
    setError(null);
    setFiles(files.filter((_, position) => position !== index));
  };

  return { files, error, add, remove };
}
