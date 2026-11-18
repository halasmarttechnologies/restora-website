import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { About } from "@/components/about";
import type { AboutProps } from "@/components/about";

const content: AboutProps = {
  hero: {
    heading: "Welcome to the test",
    action: { label: "Come in", href: "/come-in" },
    imageSrc: "/images/hero.webp",
  },
  founderNote: {
    heading: "A note from the test team",
    quote: "We test everything carefully.",
    signOff: "The test team",
  },
  offering: {
    heading: "test treatments",
    body: "Treatments chosen for testing.",
    action: { label: "The menu", href: "/menu" },
    links: [
      { label: "First treatment", href: "/first" },
      { label: "Second treatment", href: "/second" },
    ],
    imageSrc: "/images/offering.webp",
  },
  services: [
    {
      title: "release",
      name: "Test Service",
      description: "Test service description.",
      duration: "60 min",
      href: "/services/test",
      iconSrc: "/images/icon.webp",
      imageSrc: "/images/photo.webp",
    },
  ],
  statement: {
    heading: "CALM, tested, INTENTIONAL.",
    imageSrc: "/images/statement.webp",
  },
  philosophy: {
    heading: "test philosophy",
    body: "Ideas that guide every test.",
    items: [
      { title: "first principle", body: "First principle body." },
      { title: "second principle", body: "Second principle body." },
    ],
    imageSrc: "/images/philosophy.webp",
  },
  techniques: {
    heading: "test techniques",
    body: "Techniques used in testing.",
    techniques: [
      { name: "Warm Oils", description: "Warm oil description.", imageSrc: "/images/oil.webp" },
      { name: "Long Strokes", description: "Stroke description.", imageSrc: "/images/stroke.webp" },
    ],
  },
  team: {
    heading: "meet the test team",
    body: "The people behind the tests.",
    members: [
      {
        name: "Ada Tester",
        role: "Lead therapist",
        bio: "Ada bio.",
        portraitSrc: "/images/ada.webp",
      },
      { name: "Ben Checker", role: "Senior therapist", bio: "Ben bio." },
    ],
  },
  promise: {
    heading: "Our test promise",
    claims: ["certified hands", "plant-based oils"],
    action: { label: "Book now", href: "/book-now" },
    imageSrc: "/images/promise.webp",
  },
};

const imageSrc = (scope: HTMLElement) =>
  decodeURIComponent(scope.querySelector("img")?.getAttribute("src") ?? "");

describe("About", () => {
  it("opens with the page heading, a call to action and a decorative photo", () => {
    render(<About {...content} />);

    const hero = screen.getByRole("region", { name: content.hero.heading });
    expect(within(hero).getByRole("heading", { level: 1 })).toHaveTextContent(content.hero.heading);
    expect(within(hero).getByRole("link", { name: "Come in" })).toHaveAttribute("href", "/come-in");
    expect(hero.querySelector("img")).toHaveAttribute("alt", "");
    expect(imageSrc(hero)).toContain(content.hero.imageSrc);
  });

  it("renders the founder note as a quotation with its sign-off", () => {
    render(<About {...content} />);

    const note = screen.getByRole("region", { name: content.founderNote.heading });
    expect(within(note).getByText(content.founderNote.quote).closest("blockquote")).not.toBeNull();
    expect(within(note).getByText(content.founderNote.signOff)).toBeInTheDocument();
  });

  it("renders the offering panel with its links and photo", () => {
    render(<About {...content} />);

    const offering = screen.getByRole("region", { name: content.offering.heading });
    expect(within(offering).getByText(content.offering.body)).toBeInTheDocument();
    [content.offering.action, ...content.offering.links].forEach(({ label, href }) =>
      expect(within(offering).getByRole("link", { name: label })).toHaveAttribute("href", href),
    );
    expect(imageSrc(offering)).toContain(content.offering.imageSrc);
  });

  it("reuses the featured service cards", () => {
    render(<About {...content} />);

    const services = screen.getByRole("region", { name: "Featured services" });
    expect(within(services).getByRole("link", { name: "Test Service" })).toHaveAttribute(
      "href",
      "/services/test",
    );
  });

  it("closes with the statement banner", () => {
    render(<About {...content} />);

    const statement = screen.getByRole("region", { name: content.statement.heading });
    expect(statement.querySelector("img")).toHaveAttribute("alt", "");
    expect(imageSrc(statement)).toContain(content.statement.imageSrc);
  });

  it("renders the philosophy panel with expandable principles beside a photo", () => {
    render(<About {...content} />);

    const philosophy = screen.getByRole("region", { name: content.philosophy.heading });
    expect(within(philosophy).getByText(content.philosophy.body)).toBeInTheDocument();
    content.philosophy.items.forEach(({ title, body }) =>
      expect(within(philosophy).getByText(title).closest("details")).toContainElement(
        within(philosophy).getByText(body),
      ),
    );
    expect(imageSrc(philosophy)).toContain(content.philosophy.imageSrc);
  });

  it("lists each technique with its name, description and a decorative photo", () => {
    render(<About {...content} />);

    const techniques = screen.getByRole("region", { name: content.techniques.heading });
    expect(within(techniques).getByText(content.techniques.body)).toBeInTheDocument();
    const cards = within(techniques).getAllByRole("listitem");
    expect(cards).toHaveLength(content.techniques.techniques.length);
    content.techniques.techniques.forEach(({ name, description, imageSrc: src }, index) => {
      const card = cards[index]!;
      expect(within(card).getByRole("heading", { level: 3, name })).toBeInTheDocument();
      expect(within(card).getByText(description)).toBeInTheDocument();
      expect(card.querySelector("img")).toHaveAttribute("alt", "");
      expect(imageSrc(card)).toContain(src);
    });
  });

  it("introduces each team member with their role and bio", () => {
    render(<About {...content} />);

    const team = screen.getByRole("region", { name: content.team.heading });
    expect(within(team).getByText(content.team.body)).toBeInTheDocument();
    content.team.members.forEach(({ name, role, bio }) => {
      expect(within(team).getByRole("heading", { level: 3, name })).toBeInTheDocument();
      expect(within(team).getByText(role)).toBeInTheDocument();
      expect(within(team).getByText(bio)).toBeInTheDocument();
    });
  });

  it("shows a portrait when supplied and decorative initials otherwise", () => {
    render(<About {...content} />);

    const team = screen.getByRole("region", { name: content.team.heading });
    const portrait = within(team).getByRole("img", { name: "Ada Tester" });
    expect(decodeURIComponent(portrait.getAttribute("src") ?? "")).toContain("/images/ada.webp");

    const initials = within(team).getByText("BC");
    expect(initials).toHaveAttribute("aria-hidden", "true");
  });

  it("ends with the promise banner: claims, call to action and photo", () => {
    render(<About {...content} />);

    const promise = screen.getByRole("region", { name: content.promise.heading });
    expect(
      within(promise)
        .getAllByRole("listitem")
        .map(({ textContent }) => textContent),
    ).toEqual(content.promise.claims);
    expect(within(promise).getByRole("link", { name: "Book now" })).toHaveAttribute(
      "href",
      "/book-now",
    );
    expect(promise.querySelector("img")).toHaveAttribute("alt", "");
    expect(imageSrc(promise)).toContain(content.promise.imageSrc);
  });

  it("orders the sections like the page design", () => {
    render(<About {...content} />);

    const order = [
      content.hero.heading,
      content.founderNote.heading,
      content.offering.heading,
      "Featured services",
      content.statement.heading,
      content.philosophy.heading,
      content.techniques.heading,
      content.team.heading,
      content.promise.heading,
    ];
    const regions = screen
      .getAllByRole("region")
      .map((region) => region.getAttribute("aria-label") ?? labelOf(region));
    expect(regions.filter((name) => order.includes(name))).toEqual(order);
  });
});

/** Text of the element referenced by a region's `aria-labelledby`. */
function labelOf(region: HTMLElement) {
  const id = region.getAttribute("aria-labelledby");
  return (id && document.getElementById(id)?.textContent) || "";
}
