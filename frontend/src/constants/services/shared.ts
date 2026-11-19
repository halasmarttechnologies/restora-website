import type { ServicePageProps } from "@/components/service-page";
import { HOME_BRAND_STORY } from "@/constants/home";

/**
 * Content that is the same on every service page. Change it here once and all six pages
 * update. Per-service content lives in each service's own file (e.g. `deep-tissue.ts`).
 *
 * Placeholder copy; photos reuse existing site images until dedicated shots are supplied.
 */
export const SERVICE_PAGE_SHARED = {
  /** Section headings. */
  headings: {
    outcomes: "how you'll feel",
    details: "good to know",
    pairings: "pairs well with",
    reviews: "reviews",
  },
  gallery: { ...HOME_BRAND_STORY.gallery, heading: "felt by you" },
  steps: {
    heading: "your session",
    items: [
      {
        title: "Consultation",
        body: "A few minutes to talk through how you feel, any areas to focus on and the pressure you like.",
      },
      {
        title: "Settle in",
        body: "Warm linens, soft lighting and quiet. Your therapist leaves the room while you get comfortable.",
      },
      {
        title: "Your treatment",
        body: "Unhurried, focused work shaped around you. Ask for lighter or firmer pressure at any time.",
      },
      {
        title: "Time to rest",
        body: "A few quiet minutes before you get up, with water or tea, so you leave feeling grounded.",
      },
    ],
  },
  aftercare: {
    heading: "aftercare",
    items: [
      {
        title: "Drink water",
        body: "Keep sipping water through the rest of the day to help your muscles recover.",
      },
      {
        title: "Take it slow",
        body: "Give yourself a quiet evening if you can, and leave strenuous exercise until tomorrow.",
      },
      {
        title: "Stay warm",
        body: "A warm shower or bath helps relaxed muscles stay loose for longer.",
      },
    ],
  },
  gift: {
    heading: "give the gift of rest",
    body: "Gift cards cover any treatment on our menu and arrive beautifully presented, ready to give or to send.",
    action: { label: "Buy a gift card", href: "/gift-cards" },
    imageSrc: "/images/brand-story/values.webp",
  },
  /**
   * Photos for the split rows, used in this order. Each page skips its own hero photo, so the
   * same picture never appears twice in a row (see `createServicePage`).
   */
  photos: [
    "/images/services/photos/deep-tissue.webp",
    "/images/services/photos/swedish-relaxation.webp",
    "/images/banners/signature-ritual.webp",
    "/images/brand-story/milestone.webp",
    "/images/services/photos/post-recovery.webp",
    "/images/brand-story/values.webp",
  ],
} as const satisfies Pick<ServicePageProps, "gallery" | "steps" | "aftercare" | "gift"> & {
  headings: Record<string, string>;
  photos: readonly string[];
};
