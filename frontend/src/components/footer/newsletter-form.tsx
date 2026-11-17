"use client";

import Link from "next/link";
import { useActionState } from "react";

import { subscribeToNewsletter } from "@/actions/newsletter";
import { NEWSLETTER_IDLE } from "@/lib/newsletter";

/** Email sign-up joined into one pill-shaped field, with the result announced below it. */
export function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, NEWSLETTER_IDLE);

  return (
    <form action={formAction} className="mt-5">
      <div className="flex rounded-md bg-brand-white ring-brand-black/40 focus-within:ring-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          className="min-w-0 flex-1 rounded-l-md bg-transparent px-4 py-3 text-sm placeholder:text-brand-black/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isPending}
          className="shrink-0 border-l border-brand-black/10 px-5 text-xs tracking-[0.04em] uppercase transition-colors hover:bg-brand-black hover:text-brand-white disabled:opacity-50"
        >
          {isPending ? "Subscribing…" : "Subscribe"}
        </button>
      </div>

      <p role="status" className="mt-3 min-h-5 text-sm">
        {state.status === "idle" ? "" : state.message}
      </p>
      <p className="mt-1 text-xs text-brand-black/60">
        By signing up, you agree to our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-brand-black">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
