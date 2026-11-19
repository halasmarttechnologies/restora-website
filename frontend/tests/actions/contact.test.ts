import { describe, expect, it } from "vitest";

import { sendContactMessage } from "@/actions/contact";
import { CONTACT_REASONS } from "@/constants/contact";
import { CONTACT_IDLE } from "@/lib/contact";

const VALID = {
  name: "Jane Doe",
  email: "jane@example.com",
  reason: CONTACT_REASONS[0]!,
  topic: "Moving my appointment",
  details: "Could I move my Friday booking to Saturday morning?",
};

function formWith(fields: Record<string, string>, files: File[] = []) {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => formData.set(key, value));
  files.forEach((file) => formData.append("attachments", file));
  return formData;
}

const realPng = () =>
  new File([new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0])], "a.png", {
    type: "image/png",
  });

describe("sendContactMessage", () => {
  it("accepts a valid message", async () => {
    const state = await sendContactMessage(CONTACT_IDLE, formWith(VALID));

    expect(state.status).toBe("success");
  });

  it("accepts a valid message with a real image attached", async () => {
    const state = await sendContactMessage(CONTACT_IDLE, formWith(VALID, [realPng()]));

    expect(state.status).toBe("success");
  });

  it("returns field errors and the entered values when something is wrong", async () => {
    const state = await sendContactMessage(
      CONTACT_IDLE,
      formWith({ ...VALID, email: "not-an-email" }),
    );

    expect(state).toMatchObject({
      status: "error",
      errors: { email: expect.any(String) },
      values: { name: VALID.name, email: "not-an-email" },
    });
  });

  it("rejects an attachment that only claims to be an image", async () => {
    const fake = new File(["MZ executable"], "photo.png", { type: "image/png" });
    const state = await sendContactMessage(CONTACT_IDLE, formWith(VALID, [fake]));

    expect(state).toMatchObject({ status: "error", errors: { attachments: expect.any(String) } });
  });

  it("quietly drops submissions that fill the hidden anti-spam field", async () => {
    const state = await sendContactMessage(
      CONTACT_IDLE,
      formWith({ ...VALID, email: "bot", website: "https://spam.example" }),
    );

    // Bots get the normal success message, so they learn nothing about the trap.
    expect(state.status).toBe("success");
  });
});
