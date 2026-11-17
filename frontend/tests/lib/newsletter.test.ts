import { describe, expect, it } from "vitest";

import { normalizeEmail } from "@/lib/newsletter";

describe("normalizeEmail", () => {
  it("trims and lower-cases a valid address", () => {
    expect(normalizeEmail("  Jane.Doe@Example.COM ")).toBe("jane.doe@example.com");
  });

  it.each(["", "   ", "jane", "jane@", "@example.com", "jane@example", "jane doe@example.com"])(
    "rejects %j",
    (value) => {
      expect(normalizeEmail(value)).toBeNull();
    },
  );

  it("rejects missing and non-text values", () => {
    expect(normalizeEmail(null)).toBeNull();
    expect(normalizeEmail(new File([], "email.txt"))).toBeNull();
  });
});
