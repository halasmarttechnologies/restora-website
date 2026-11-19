import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ServicePage, type ServicePageProps } from "@/components/service-page";
import type { Service } from "@/types/service";

const service = (name: string, slug: string): Service => ({
  code: "T—09",
  name,
  description: `${name} description.`,
  category: "relax",
  href: `/services/${slug}`,
  imageSrc: `/images/${slug}.webp`,
});

const content: ServicePageProps = {
  slug: "test-massage",
  service: service("Test Massage", "test-massage"),
  durations: [60, 90],
  tagline: "Calm, tested, RESTORATIVE.",
  specs: [
    { label: "Duration", value: "60 or 90 minutes" },
    { label: "Pressure", value: "Medium" },
  ],
  outcomes: { heading: "how you'll feel", words: ["looser", "lighter", "calmer"] },
  steps: {
    heading: "your session",
    items: [
      { title: "Consultation", body: "We talk first." },
      { title: "Treatment", body: "Then we begin." },
    ],
  },
  details: {
    heading: "good to know",
    items: [{ title: "what to wear", body: "Anything comfortable." }],
  },
  aftercare: {
    heading: "aftercare",
    items: [{ title: "Drink water", body: "Stay hydrated." }],
  },
  pairings: {
    heading: "pairs well with",
    services: [service("Other Massage", "other-massage")],
  },
  gallery: {
    heading: "felt by you",
    action: { label: "Find us on social", href: "https://www.instagram.com/" },
    items: [{ type: "image", src: "/images/gallery.webp", alt: "A relaxed client" }],
  },
  gift: {
    heading: "give the gift of rest",
    body: "Gift cards for any treatment.",
    action: { label: "Buy a gift card", href: "/gift-cards" },
    imageSrc: "/images/gift.webp",
  },
  reviews: { heading: "reviews", items: [] },
  images: {
    specs: "/images/specs.webp",
    outcomes: "/images/outcomes.webp",
    steps: "/images/steps.webp",
    details: "/images/details.webp",
    aftercare: "/images/aftercare.webp",
    pairings: "/images/pairings.webp",
  },
};

const region = (name: string | RegExp) => screen.getByRole("region", { name });
const imageSrc = (scope: HTMLElement) =>
  decodeURIComponent(scope.querySelector("img")?.getAttribute("src") ?? "");

describe("ServicePage", () => {
  describe("hero", () => {
    it("names the service in the page heading with its code and description", () => {
      render(<ServicePage {...content} />);

      const hero = region("Test Massage");
      expect(within(hero).getByRole("heading", { level: 1 })).toHaveTextContent("Test Massage");
      expect(within(hero).getByText("T—09")).toBeInTheDocument();
      expect(within(hero).getByText("Test Massage description.")).toBeInTheDocument();
      expect(imageSrc(hero)).toContain("/images/test-massage.webp");
    });

    it("tells the navbar the page starts on a light panel", () => {
      render(<ServicePage {...content} />);

      expect(region("Test Massage")).toHaveAttribute("data-light-page");
    });

    it("books the chosen duration through a plain GET form", () => {
      render(<ServicePage {...content} />);

      const form = screen.getByRole("form", { name: "Book Test Massage" });
      expect(form).toHaveAttribute("action", "/book");
      expect(form).toHaveAttribute("method", "get");
      expect(form.querySelector('input[type="hidden"][name="service"]')).toHaveValue(
        "test-massage",
      );

      const group = within(form).getByRole("group", { name: "Duration" });
      const [sixty, ninety] = within(group).getAllByRole("radio");
      expect(sixty).toHaveAccessibleName("60 min");
      expect(sixty).toBeChecked();
      fireEvent.click(ninety!);
      expect(ninety).toBeChecked();
      expect(within(form).getByRole("button", { name: "Book now" })).toHaveAttribute(
        "type",
        "submit",
      );
    });
  });

  it("shows the photo strip", () => {
    render(<ServicePage {...content} />);

    expect(
      within(region("felt by you")).getByRole("img", { name: "A relaxed client" }),
    ).toBeTruthy();
  });

  it("lists the service specs beside the tagline", () => {
    render(<ServicePage {...content} />);

    const specs = region(content.tagline);
    content.specs.forEach(({ label, value }) => {
      expect(within(specs).getByText(label).tagName).toBe("DT");
      expect(within(specs).getByText(value).tagName).toBe("DD");
    });
    expect(imageSrc(specs)).toContain(content.images.specs);
  });

  it("shows how the session should feel", () => {
    render(<ServicePage {...content} />);

    const outcomes = region("how you'll feel");
    content.outcomes.words.forEach((word) =>
      expect(within(outcomes).getByText(word)).toBeInTheDocument(),
    );
  });

  it("walks through the session one step at a time", () => {
    render(<ServicePage {...content} />);

    const steps = region("your session");
    expect(within(steps).getByText("Consultation")).toBeInTheDocument();
    expect(within(steps).getByText("1 of 2")).toBeInTheDocument();
    expect(within(steps).getByRole("button", { name: "Previous step" })).toBeDisabled();

    fireEvent.click(within(steps).getByRole("button", { name: "Next step" }));

    expect(within(steps).getByText("Treatment")).toBeInTheDocument();
    expect(within(steps).getByText("2 of 2")).toBeInTheDocument();
    expect(within(steps).getByRole("button", { name: "Next step" })).toBeDisabled();
  });

  it("answers practical questions in expandable items", () => {
    render(<ServicePage {...content} />);

    const details = region("good to know");
    expect(within(details).getByText("what to wear").closest("details")).toContainElement(
      within(details).getByText("Anything comfortable."),
    );
  });

  it("numbers the aftercare tips", () => {
    render(<ServicePage {...content} />);

    const aftercare = region("aftercare");
    expect(within(aftercare).getByRole("list").tagName).toBe("OL");
    expect(within(aftercare).getByText("Drink water")).toBeInTheDocument();
  });

  it("links to the services it pairs well with", () => {
    render(<ServicePage {...content} />);

    expect(
      within(region("pairs well with")).getByRole("link", { name: "Other Massage" }),
    ).toHaveAttribute("href", "/services/other-massage");
  });

  it("offers the service as a gift", () => {
    render(<ServicePage {...content} />);

    expect(
      within(region("give the gift of rest")).getByRole("link", { name: "Buy a gift card" }),
    ).toHaveAttribute("href", "/gift-cards");
  });

  describe("reviews", () => {
    it("invites the first review when there are none", () => {
      render(<ServicePage {...content} />);

      const reviews = region("reviews");
      expect(within(reviews).getByText(/no reviews yet/i)).toBeInTheDocument();
      expect(within(reviews).getByRole("link", { name: /share your experience/i })).toHaveAttribute(
        "href",
        "/contact",
      );
    });

    it("shows the average rating and each review", () => {
      render(
        <ServicePage
          {...content}
          reviews={{
            heading: "reviews",
            items: [
              { author: "Sam", rating: 5, date: "2026-10-01", title: "Wonderful", body: "Great." },
              { author: "Ali", rating: 4, date: "2026-10-05", title: "Lovely", body: "Good." },
            ],
          }}
        />,
      );

      const reviews = region("reviews");
      expect(within(reviews).getByText("4.5 out of 5 · 2 reviews")).toBeInTheDocument();
      const items = within(reviews).getAllByRole("article");
      expect(items).toHaveLength(2);
      expect(within(items[0]!).getByRole("img", { name: "Rated 5 out of 5" })).toBeTruthy();
      expect(within(items[0]!).getByRole("heading", { name: "Wonderful" })).toBeTruthy();
      expect(within(items[0]!).getByText("Sam")).toBeInTheDocument();
    });
  });
});
