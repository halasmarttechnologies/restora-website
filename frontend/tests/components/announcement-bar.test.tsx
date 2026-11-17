import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AnnouncementBar } from "@/components/announcement-bar";

describe("AnnouncementBar", () => {
  it("renders the message inside a labelled complementary landmark", () => {
    render(<AnnouncementBar message="Test announcement" />);

    expect(screen.getByRole("complementary", { name: "Announcement" })).toHaveTextContent(
      "Test announcement",
    );
  });
});
