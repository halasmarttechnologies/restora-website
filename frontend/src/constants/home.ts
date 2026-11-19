import type { BrandStoryProps } from "@/components/brand-story";
import type { EditorialProps } from "@/components/editorial";
import type { FeatureBannerProps } from "@/components/feature-banner";
import type { HeroProps } from "@/components/hero";
import { SITE_NAME } from "@/constants/site";

// Placeholder copy — to be replaced with approved brand copy.
export const HOME_HERO: HeroProps = {
  eyebrow: "Massage & Wellness",
  heading: "Considered treatments for body and mind, delivered with quiet precision.",
  action: { label: "Discover services", href: "/services" },
  video: { src: "/videos/hero/hero-loop.mp4" },
};

export const HOME_FEATURE_BANNER: FeatureBannerProps = {
  heading: "the signature ritual",
  body: "Ninety unhurried minutes of warm oil, long flowing strokes and focused pressure, shaped around how you feel on the day and finished with quiet time to rest.",
  action: { label: "Book the ritual", href: "/book" },
  imageSrc: "/images/banners/signature-ritual.webp",
};

/** Photos reuse existing site images until dedicated shots are supplied. */
export const HOME_EDITORIAL: EditorialProps = {
  carousel: {
    heading: "Treatment add-ons",
    imageSrc: "/images/services/photos/deep-tissue.webp",
    slides: [
      {
        name: "Hot Stone",
        description: "Warm basalt stones to melt deep tension",
        imageSrc: "/images/services/icons/swedish-relaxation.webp",
        action: { label: "Add to booking", href: "/book" },
      },
      {
        name: "Back Focus",
        description: "Extra time for back, neck and shoulders",
        imageSrc: "/images/services/icons/deep-tissue.webp",
        action: { label: "Add to booking", href: "/book" },
      },
      {
        name: "Recovery Stretch",
        description: "Assisted stretching to close your session",
        imageSrc: "/images/services/icons/post-recovery.webp",
        action: { label: "Add to booking", href: "/book" },
      },
    ],
  },
  stories: [
    {
      heading: "the gift of rest",
      body: `Give someone an hour that is entirely their own. ${SITE_NAME} gift cards cover any treatment and arrive beautifully presented, ready to give or to send.`,
      imageSrc: "/images/services/photos/swedish-relaxation.webp",
      action: { label: "Buy a gift card", href: "/gift-cards" },
    },
    {
      heading: "your first visit",
      body: "Every first appointment begins with a short consultation, so your therapist can tailor pressure, focus and pace to you. Arrive a little early and leave the rest to us.",
      imageSrc: "/images/services/photos/post-recovery.webp",
      action: { label: "Learn more", href: "/about" },
    },
  ],
};

/** Gallery photos reuse existing site images until dedicated shots are supplied. */
export const HOME_BRAND_STORY: BrandStoryProps = {
  gallery: {
    heading: `you + ${SITE_NAME}`,
    action: { label: "Find us on social", href: "https://www.instagram.com/" },
    // Order: the men's video first, then the photos, then the women's video.
    items: [
      {
        type: "video",
        src: "/videos/gallery/men.mp4",
        alt: "A man relaxing during a back massage",
      },
      {
        type: "image",
        src: "/images/banners/signature-ritual.webp",
        alt: "Client relaxing during a back massage",
      },
      {
        type: "image",
        src: "/images/services/photos/deep-tissue.webp",
        alt: "Massage oil poured into an open palm",
      },
      {
        type: "image",
        src: "/images/services/photos/swedish-relaxation.webp",
        alt: "Therapist massaging a client's hand and wrist",
      },
      {
        type: "image",
        src: "/images/services/photos/post-recovery.webp",
        alt: "Therapist massaging a client's forearm",
      },
      {
        type: "image",
        src: "/images/brand-story/values.webp",
        alt: "Body care products beside a rolled towel and flowers",
      },
      {
        type: "video",
        src: "/videos/gallery/woman.mp4",
        alt: "A woman relaxing during a back massage",
      },
    ],
  },
  values: {
    heading: "Our values",
    statement:
      "To RESTORE, RELAX, and RENEW the body you live in every day, with care that keeps working long after you leave.",
    action: { label: "Our values", href: "/about" },
    items: [
      {
        title: "our approach",
        body: "Every treatment starts with listening. Pressure, pace and focus are shaped around you, never a script.",
      },
      {
        title: "our therapists",
        body: "Experienced therapists, trained to one consistent standard of care across every treatment.",
      },
      {
        title: "sustainability",
        body: "Plant-based oils, refillable bottles and freshly laundered linens, chosen to be gentle on skin and on the planet.",
      },
    ],
    imageSrc: "/images/brand-story/values.webp",
  },
  milestone: {
    heading: "make time for you",
    action: { label: "Plan your visit", href: "/book" },
    imageSrc: "/images/brand-story/milestone.webp",
  },
};
