import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "@/components/footer";
import { FOOTER_CONTENT } from "@/constants/footer";

const linkItems = FOOTER_CONTENT.linkGroups.flatMap(({ items }) =>
  items.filter((item) => typeof item !== "string"),
);

function renderFooter() {
  render(<Footer />);
  return screen.getByRole("contentinfo");
}

describe("Footer", () => {
  it("renders a contentinfo landmark with the copyright line", () => {
    const footer = renderFooter();

    expect(within(footer).getByText(FOOTER_CONTENT.copyright)).toBeInTheDocument();
  });

  it.each(FOOTER_CONTENT.linkGroups)("renders the $title column", ({ title }) => {
    const footer = renderFooter();

    expect(within(footer).getByRole("heading", { level: 2, name: title })).toBeInTheDocument();
  });

  it.each(linkItems)("links $label to $href", ({ label, href }) => {
    const footer = renderFooter();

    expect(within(footer).getByRole("link", { name: label })).toHaveAttribute("href", href);
  });

  it("opens external links in a new tab safely", () => {
    const footer = renderFooter();

    const external = within(footer)
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("http"));
    expect(external.length).toBeGreaterThan(0);
    external.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("newsletter", () => {
    it("has a labelled email field, a subscribe button and a privacy link", () => {
      const footer = renderFooter();

      expect(within(footer).getByRole("textbox", { name: "Email address" })).toHaveAttribute(
        "type",
        "email",
      );
      expect(within(footer).getByRole("button", { name: "Subscribe" })).toBeInTheDocument();
      expect(within(footer).getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
        "href",
        "/privacy",
      );
    });

    it("confirms a valid sign-up", async () => {
      const footer = renderFooter();

      submit(footer, "jane@example.com");

      expect(await within(footer).findByRole("status")).toHaveTextContent(/on the list/i);
    });

    it("explains an invalid email address", async () => {
      const footer = renderFooter();

      submit(footer, "not-an-email");

      expect(await within(footer).findByRole("status")).toHaveTextContent(/valid email/i);
    });
  });
});

function submit(footer: HTMLElement, email: string) {
  const input = within(footer).getByRole("textbox", { name: "Email address" });
  fireEvent.change(input, { target: { value: email } });
  // Submit the form directly: jsdom would otherwise block it on native `type="email"` checks.
  fireEvent.submit(input.closest("form") as HTMLFormElement);
}
