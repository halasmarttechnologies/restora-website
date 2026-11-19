import { createServicePage } from "./create-service-page";

/** Page content for Prenatal (/services/prenatal). Placeholder copy. */
export const PRENATAL_PAGE = createServicePage("prenatal", {
  durations: [60],
  tagline: "Gentle CARE, carefully POSITIONED for you and your bump.",
  specs: [
    { label: "Duration", value: "60 minutes" },
    { label: "Pressure", value: "Light to medium" },
    { label: "Position", value: "Side-lying, fully supported" },
    { label: "Best for", value: "Back, hip and leg discomfort in pregnancy" },
  ],
  feelings: ["supported", "lighter", "calm"],
  details: [
    {
      title: "when can I book?",
      body: "From the second trimester onwards. Please let us know how far along you are when you book.",
    },
    {
      title: "is it safe?",
      body: "Our prenatal treatment avoids deep pressure and uses supportive positioning. If your pregnancy is high-risk, please check with your doctor first.",
    },
    {
      title: "what makes it different?",
      body: "You lie on your side with cushions supporting your bump and back, and the techniques are adapted for pregnancy.",
    },
  ],
  pairings: ["swedish-relaxation", "reflexology"],
});
