import type { AboutProps } from "@/components/about";
import { FEATURED_SERVICES } from "@/constants/services";
import { SITE_NAME } from "@/constants/site";

/** Placeholder copy; photos reuse existing site images. */
export const ABOUT_CONTENT: AboutProps = {
  hero: {
    heading: `Welcome to the WORLD of ${SITE_NAME.toLowerCase()}.`,
    action: { label: "Come in", href: "/book" },
    imageSrc: "/images/banners/signature-ritual.webp",
  },
  founderNote: {
    heading: "A note from our founders",
    quote: `At ${SITE_NAME}, our philosophy is simple: make time for the body you live in. Every treatment is built around careful listening, skilled hands and quiet rooms, so you can step out of a busy day and leave feeling lighter, looser and more like yourself.`,
    signOff: `The ${SITE_NAME} team`,
  },
  offering: {
    heading: "curated treatments",
    body: "Our menu is short on purpose: a handful of massages we do exceptionally well, each one adapted to how your body feels on the day.",
    action: { label: "The menu", href: "/services" },
    // Same services as the cards below, so names and links stay in sync.
    links: FEATURED_SERVICES.map(({ name, href }) => ({ label: name, href })),
    imageSrc: "/images/services/photos/swedish-relaxation.webp",
  },
  services: FEATURED_SERVICES,
  statement: {
    heading: "CALM, considered, RESTORATIVE.",
    imageSrc: "/images/services/photos/post-recovery.webp",
  },
  philosophy: {
    heading: "our philosophy",
    body: "Three ideas shape every visit, from the first conversation to the last quiet minute on the table.",
    items: [
      {
        title: "care that listens",
        body: "Each session starts with a short consultation, so pressure, pace and focus follow how you feel today.",
      },
      {
        title: "skilled, practised hands",
        body: "Our therapists train in established techniques and refresh them together, so every treatment meets one standard.",
      },
      {
        title: "a lighter footprint",
        body: "Plant-based oils, refillable bottles and linens laundered at low temperatures: gentle on skin and on the planet.",
      },
    ],
    imageSrc: "/images/brand-story/milestone.webp",
  },
  techniques: {
    heading: "time-honoured techniques",
    body: "Proven methods, combined with care and adapted to you. These are the foundations of every treatment on our menu.",
    techniques: [
      {
        name: "Warm oils",
        description: "Gently heated plant oils that help muscles soften and skin stay nourished.",
        imageSrc: "/images/services/photos/deep-tissue.webp",
      },
      {
        name: "Long strokes",
        description: "Flowing, rhythmic movements that ease tension and calm the nervous system.",
        imageSrc: "/images/services/photos/post-recovery.webp",
      },
      {
        name: "Pressure points",
        description:
          "Slow, focused pressure on knots and trigger points to release deep tightness.",
        imageSrc: "/images/services/photos/swedish-relaxation.webp",
      },
      {
        name: "Mindful rest",
        description:
          "Unhurried time to breathe and settle, so the benefits last beyond the session.",
        imageSrc: "/images/banners/signature-ritual.webp",
      },
    ],
  },
  // Placeholder names and bios: replace with the real team. Add `portraitSrc` once headshots
  // are supplied; until then each card shows the member's initials.
  team: {
    heading: "meet our lead therapists",
    body: `The ${SITE_NAME} team brings years of hands-on experience in therapeutic and relaxation massage, and a shared belief that the details make the difference.`,
    members: [
      {
        name: "Layla Hassan",
        role: "Lead therapist",
        bio: "Layla specialises in deep tissue and sports recovery work. She leads our therapist training, keeping technique and care consistent across every treatment.",
      },
      {
        name: "Daniel Reyes",
        role: "Senior therapist",
        bio: "Daniel focuses on Swedish and relaxation massage. He designed our signature ritual around slow, flowing strokes and plenty of time to rest.",
      },
    ],
  },
  promise: {
    heading: "Our promise",
    claims: [
      "trained therapists",
      "plant-based oils",
      "private treatment rooms",
      "fresh linens every visit",
      "fragrance-free on request",
    ],
    action: { label: "Book now", href: "/book" },
    imageSrc: "/images/brand-story/values.webp",
  },
};
