import { createServicePage } from "./create-service-page";

/** Page content for Deep Tissue (/services/deep-tissue). Placeholder copy. */
export const DEEP_TISSUE_PAGE = createServicePage("deep-tissue", {
  durations: [60, 90],
  tagline: "Slow, focused PRESSURE for tension that HOLDS ON.",
  specs: [
    { label: "Duration", value: "60 or 90 minutes" },
    { label: "Pressure", value: "Firm to deep" },
    { label: "Focus", value: "Back, neck, shoulders and legs" },
    { label: "Best for", value: "Chronic tension, knots, heavy training" },
  ],
  feelings: ["looser", "lighter", "freer"],
  details: [
    {
      title: "will it hurt?",
      body: "Deep work can feel intense in tight areas, but it should never be painful. Tell your therapist and they will adjust straight away.",
    },
    {
      title: "how often should I come?",
      body: "For long-standing tension, every two to four weeks works well. For a one-off reset, a single session helps.",
    },
    {
      title: "will I feel sore afterwards?",
      body: "Some tenderness for a day or two is normal after deep work. Water, warmth and gentle movement help it pass.",
    },
  ],
  pairings: ["sports-recovery", "signature-restora"],
});
