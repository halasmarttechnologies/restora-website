import { createServicePage } from "./create-service-page";

/** Page content for Signature Restora (/services/signature-restora). Placeholder copy. */
export const SIGNATURE_RESTORA_PAGE = createServicePage("signature-restora", {
  durations: [90, 120],
  tagline: "Our full EXPERIENCE, tailored to you ON THE DAY.",
  specs: [
    { label: "Duration", value: "90 or 120 minutes" },
    { label: "Pressure", value: "Tailored, light to deep" },
    { label: "Focus", value: "Full body, with extra time where you need it" },
    { label: "Best for", value: "A complete reset, or when you can't decide" },
  ],
  feelings: ["restored", "lighter", "yourself"],
  details: [
    {
      title: "what is included?",
      body: "A longer consultation, warm oils, a blend of deep tissue and relaxation techniques, and extended rest time at the end.",
    },
    {
      title: "who is it for?",
      body: "Anyone who wants our most complete treatment, or who isn't sure which massage to choose.",
    },
    {
      title: "90 or 120 minutes?",
      body: "Ninety minutes is a full treatment; two hours adds more focused work and a slower finish.",
    },
  ],
  pairings: ["deep-tissue", "swedish-relaxation"],
});
