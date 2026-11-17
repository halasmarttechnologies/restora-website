import type { FooterContent } from "@/components/footer";
import { SITE_NAME } from "@/constants/site";

/**
 * Placeholder copy and links: social URLs point to each network's home page until the brand
 * handles exist, and most internal pages are not built yet. The year is fixed (rather than
 * computed) so the footer stays statically prerendered; update it each January.
 */
export const FOOTER_CONTENT: FooterContent = {
  newsletter: {
    intro: `Join the ${SITE_NAME} list for a little more calm.`,
    description:
      "Seasonal rituals, wellness notes and first access to new treatments, straight to your inbox.",
  },
  linkGroups: [
    {
      title: "Navigate",
      items: [
        { label: "Services", href: "/services" },
        { label: "Our story", href: "/about" },
        { label: "Gift cards", href: "/gift-cards" },
        { label: "Journal", href: "/journal" },
        { label: "Book a treatment", href: "/book" },
      ],
    },
    {
      title: "Social",
      items: [
        { label: "Instagram", href: "https://www.instagram.com/" },
        { label: "TikTok", href: "https://www.tiktok.com/" },
        { label: "Pinterest", href: "https://www.pinterest.com/" },
        { label: "YouTube", href: "https://www.youtube.com/" },
      ],
    },
    {
      title: "Official",
      items: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Accessibility", href: "/accessibility" },
        { label: "FAQ", href: "/faq" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Support",
      items: [
        "We're here every day, 9am to 9pm.",
        "Drop us a note anytime.",
        { label: "Get in touch", href: "/contact" },
      ],
    },
  ],
  copyright: `© 2026 ${SITE_NAME}. All rights reserved.`,
};
