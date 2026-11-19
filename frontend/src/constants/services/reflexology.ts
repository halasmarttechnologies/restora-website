import { createServicePage } from "./create-service-page";

/** Page content for Reflexology (/services/reflexology). Placeholder copy. */
export const REFLEXOLOGY_PAGE = createServicePage("reflexology", {
  durations: [45, 60],
  tagline: "Pressure-point WORK to restore BALANCE.",
  specs: [
    { label: "Duration", value: "45 or 60 minutes" },
    { label: "Pressure", value: "Gentle to firm" },
    { label: "Focus", value: "Feet, hands and ears" },
    { label: "Best for", value: "Deep relaxation and tension held elsewhere" },
  ],
  feelings: ["grounded", "balanced", "calm"],
  details: [
    {
      title: "do I need to undress?",
      body: "No. You stay fully clothed and simply remove your shoes and socks.",
    },
    {
      title: "what does it feel like?",
      body: "Firm, focused pressure on small points of the feet and hands. Most guests find it deeply relaxing.",
    },
    {
      title: "can I combine it with a massage?",
      body: "Yes. It pairs well with Swedish Relaxation or Prenatal for a longer, fuller visit.",
    },
  ],
  pairings: ["swedish-relaxation", "prenatal"],
});
