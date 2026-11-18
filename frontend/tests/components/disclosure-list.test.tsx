import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DisclosureList } from "@/components/disclosure-list";

const items = [
  { title: "first item", body: "First body copy." },
  { title: "second item", body: "Second body copy." },
];

describe("DisclosureList", () => {
  it("renders one list item per entry", () => {
    render(<DisclosureList items={items} />);

    expect(within(screen.getByRole("list")).getAllByRole("listitem")).toHaveLength(items.length);
  });

  it.each(items)("puts the $title body inside a closed <details>", ({ title, body }) => {
    render(<DisclosureList items={items} />);

    const details = screen.getByText(title).closest("details");
    expect(details).toContainElement(screen.getByText(body));
    expect(details).not.toHaveAttribute("open");
  });
});
