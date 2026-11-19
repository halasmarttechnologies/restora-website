import { createServicePage } from "./create-service-page";

/** Page content for Sports Recovery (/services/sports-recovery). Placeholder copy. */
export const SPORTS_RECOVERY_PAGE = createServicePage("sports-recovery", {
  durations: [60, 90],
  tagline: "Targeted WORK for active BODIES between sessions.",
  specs: [
    { label: "Duration", value: "60 or 90 minutes" },
    { label: "Pressure", value: "Medium to firm" },
    { label: "Focus", value: "The muscles you train hardest" },
    { label: "Best for", value: "Mobility, recovery, injury prevention" },
  ],
  feelings: ["mobile", "recovered", "ready"],
  details: [
    {
      title: "when should I book?",
      body: "A day or two after a hard session or event is ideal. Before an event, choose a lighter treatment a few days ahead.",
    },
    {
      title: "what should I wear?",
      body: "Whatever is comfortable. Some stretching may be included, so loose clothing for afterwards helps.",
    },
    {
      title: "can it help with an injury?",
      body: "It can support recovery from everyday strains. For a recent or serious injury, please check with your doctor first.",
    },
  ],
  pairings: ["deep-tissue", "reflexology"],
});
