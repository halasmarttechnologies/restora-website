import type { FaqGroup } from "@/components/faq";
import { SITE_NAME } from "@/constants/site";

/** Placeholder answers; keep them consistent with the Terms (cancellations, gift cards). */
export const FAQ_CONTENT: {
  heading: string;
  intro: readonly string[];
  groups: readonly FaqGroup[];
} = {
  heading: "frequently asked questions",
  intro: [
    "Quick answers to the questions we hear most. Can't find what you're looking for? Get in touch and we'll be happy to help.",
  ],
  groups: [
    {
      heading: "Booking",
      items: [
        {
          title: "How do I book a treatment?",
          body: "Choose a treatment from our menu and book online, or send us a message through the contact page and we'll arrange it for you.",
        },
        {
          title: "What is your cancellation policy?",
          body: "Please give us at least 24 hours' notice to cancel or reschedule. Late cancellations and missed appointments may be charged.",
        },
        {
          title: "When should I arrive?",
          body: "Please arrive a few minutes early so there is time for a short consultation and to settle in before your treatment begins.",
        },
      ],
    },
    {
      heading: "Treatments",
      items: [
        {
          title: "Which massage is right for me?",
          body: "Swedish Relaxation suits stress relief and general wellbeing; Deep Tissue and Sports Recovery focus on tension, knots and active bodies. Not sure? Our Signature Restora treatment is tailored to what your body needs on the day.",
        },
        {
          title: "Can I choose the pressure?",
          body: "Always. Your therapist will check in before and during the treatment, and you can ask for lighter or firmer pressure at any time.",
        },
        {
          title: "Can I have a massage while pregnant?",
          body: "Yes. Our Prenatal treatment is designed for expecting mothers, with careful positioning and gentle techniques. Please let us know how far along you are when you book.",
        },
        {
          title: "What if I have a medical condition or injury?",
          body: "Please tell us when booking and before your treatment. Your therapist will adapt the session, and for some conditions we may ask you to check with your doctor first.",
        },
      ],
    },
    {
      heading: "Your visit",
      items: [
        {
          title: "What should I wear?",
          body: "Wear whatever is comfortable. You'll undress to your level of comfort, and you'll be covered with fresh linens throughout, with only the area being treated uncovered.",
        },
        {
          title: "Do you offer fragrance-free treatments?",
          body: "Yes. Just ask, and your therapist will use fragrance-free oils.",
        },
      ],
    },
    {
      heading: "Gift cards",
      items: [
        {
          title: "How do gift cards work?",
          body: `${SITE_NAME} gift cards can be used for any treatment on our menu. They are valid for the period shown on the card and can't be exchanged for cash.`,
        },
      ],
    },
  ],
};
