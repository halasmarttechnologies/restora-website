import { describe, expect, it } from "vitest";

import { subscribeToNewsletter } from "@/actions/newsletter";
import { NEWSLETTER_IDLE } from "@/lib/newsletter";

function formWith(email: string) {
  const formData = new FormData();
  formData.set("email", email);
  return formData;
}

describe("subscribeToNewsletter", () => {
  it("accepts a valid email address", async () => {
    const state = await subscribeToNewsletter(NEWSLETTER_IDLE, formWith("jane@example.com"));

    expect(state.status).toBe("success");
  });

  it("rejects an invalid email address with a message", async () => {
    const state = await subscribeToNewsletter(NEWSLETTER_IDLE, formWith("not-an-email"));

    expect(state).toEqual({ status: "error", message: expect.any(String) });
  });
});
