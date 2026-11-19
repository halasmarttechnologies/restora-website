import { createServicePage } from "./create-service-page";

/** Page content for Swedish Relaxation (/services/swedish-relaxation). Placeholder copy. */
export const SWEDISH_RELAXATION_PAGE = createServicePage("swedish-relaxation", {
  durations: [60, 90],
  tagline: "Long, flowing STROKES to settle BODY and MIND.",
  specs: [
    { label: "Duration", value: "60 or 90 minutes" },
    { label: "Pressure", value: "Light to medium" },
    { label: "Focus", value: "Full body" },
    { label: "Best for", value: "Stress relief and general wellbeing" },
  ],
  feelings: ["calmer", "softer", "rested"],
  details: [
    {
      title: "is this my first massage?",
      body: "Swedish Relaxation is the perfect first treatment: gentle, rhythmic and easy to enjoy.",
    },
    {
      title: "can I fall asleep?",
      body: "Many guests do, and that is a sign the treatment is working. Your therapist will wake you gently at the end.",
    },
    {
      title: "60 or 90 minutes?",
      body: "Sixty minutes covers the full body; ninety leaves extra time for the areas that need it most.",
    },
  ],
  pairings: ["signature-restora", "reflexology"],
});
