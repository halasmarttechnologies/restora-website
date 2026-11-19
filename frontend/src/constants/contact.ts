/** Options in the contact form's "Contact reason" select. The server accepts only these. */
export const CONTACT_REASONS = [
  "Bookings and appointments",
  "Treatments and services",
  "Gift cards",
  "Feedback",
  "Partnerships and press",
  "Something else",
] as const;

/** Placeholder copy; the hours match the footer's support note. */
export const CONTACT_CONTENT = {
  heading: "contact us",
  intro: [
    "Get in touch any time. We're happy to help with bookings, treatments, gift cards or any feedback you have.",
    "Our team replies every day, 9am to 9pm. We aim to get back to you within one business day.",
  ],
} as const;
