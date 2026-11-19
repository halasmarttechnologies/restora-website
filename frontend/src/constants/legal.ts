import type { ContentPage } from "@/components/content-sections";
import { SITE_NAME } from "@/constants/site";

/**
 * PLACEHOLDER legal copy, written to describe what the site actually does today. It is not
 * legal advice: have both documents reviewed by a qualified lawyer for the jurisdictions you
 * operate in, and update them whenever data handling changes (e.g. once the contact form and
 * newsletter are connected to an email provider).
 */
const LEGAL_UPDATED = "Last updated: 20 November 2026.";

const CONTACT_LINK = { label: "Contact us", href: "/contact" } as const;

export const PRIVACY_POLICY: ContentPage = {
  heading: "privacy policy",
  intro: [
    `This policy explains what personal information ${SITE_NAME} collects through this website, why we collect it and the choices you have.`,
    LEGAL_UPDATED,
  ],
  sections: [
    {
      heading: "Information we collect",
      paragraphs: ["We only collect information you choose to give us, plus basic technical data:"],
      list: [
        "Contact form: your name, email address, contact reason, topic, message and any images you attach.",
        "Newsletter: your email address.",
        "Technical data: our hosting provider records standard server logs (such as IP address, browser type and the pages requested) to keep the site secure and running.",
      ],
    },
    {
      heading: "How we use it",
      paragraphs: [
        "We use your information to reply to your messages, manage bookings and send the newsletter you signed up for. Technical data is used only to operate, secure and improve the site.",
        "We do not sell your personal information or use it for advertising.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "This website does not use advertising or analytics cookies. If that changes, we will update this policy and ask for your consent where required.",
      ],
    },
    {
      heading: "Sharing",
      paragraphs: [
        "We share information only with service providers who help us run the site and our services (such as hosting and email delivery), under agreements that protect it, or when the law requires us to.",
      ],
    },
    {
      heading: "Keeping your information",
      paragraphs: [
        "We keep messages only as long as needed to help you and meet legal obligations, and newsletter details until you unsubscribe. Every newsletter includes an unsubscribe link.",
      ],
    },
    {
      heading: "Security",
      paragraphs: [
        "The site is served over HTTPS, and form submissions are checked on our server before they are accepted. No method of transmission is completely secure, but we work to protect your information.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "You can ask to see, correct or delete the personal information we hold about you, or object to how we use it. Get in touch and we will respond within a reasonable time.",
      ],
      link: CONTACT_LINK,
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "We may update this policy from time to time. The date at the top shows when it last changed.",
      ],
    },
  ],
};

export const TERMS_OF_SERVICE: ContentPage = {
  heading: "terms of service",
  intro: [
    `These terms apply to your use of the ${SITE_NAME} website and to treatments booked with us. By using the site or booking a treatment, you agree to them.`,
    LEGAL_UPDATED,
  ],
  sections: [
    {
      heading: "Bookings and cancellations",
      paragraphs: [
        "Please arrive a few minutes before your appointment. Late arrivals may have a shorter treatment so the next guest is not delayed.",
        "If you need to cancel or reschedule, please let us know at least 24 hours in advance. Late cancellations and missed appointments may be charged.",
      ],
    },
    {
      heading: "Your health",
      paragraphs: [
        "Before your treatment, please tell your therapist about any medical conditions, injuries, allergies or pregnancy. Our treatments support wellbeing; they are not a substitute for medical advice or treatment.",
        "Your therapist may adapt or decline a treatment if it would not be safe for you.",
      ],
    },
    {
      heading: "Gift cards",
      paragraphs: [
        "Gift cards can be used for any treatment on our menu, are valid for the period shown on the card and cannot be exchanged for cash.",
      ],
    },
    {
      heading: "Using this website",
      paragraphs: [
        "Please use the site lawfully and do not attempt to disrupt it or access it in unauthorised ways. Content on the site, including text, photography and the brand name, belongs to us or our licensors and may not be reused without permission.",
      ],
    },
    {
      heading: "Liability",
      paragraphs: [
        "We work to keep the site accurate and available, but it is provided as it is. To the extent the law allows, we are not liable for indirect losses arising from its use. Nothing in these terms limits rights you have under consumer law.",
      ],
    },
    {
      heading: "Changes and questions",
      paragraphs: [
        "We may update these terms from time to time; the date at the top shows when they last changed. If you have any questions, please get in touch.",
      ],
      link: CONTACT_LINK,
    },
  ],
};
