import { describe, expect, it } from "vitest";

import {
  ATTACHMENT_LIMITS,
  CONTACT_LIMITS,
  attachmentError,
  isImageFile,
  validateContactFields,
} from "@/lib/contact";

const REASONS = ["Bookings", "Feedback"];

const VALID = {
  name: "Jane Doe",
  email: "Jane@Example.com",
  reason: "Bookings",
  topic: "Moving my appointment",
  details: "Could I move my Friday booking to Saturday morning?",
};

function formWith(fields: Partial<Record<keyof typeof VALID, string>>) {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => formData.set(key, value));
  return formData;
}

/** A file whose first bytes are `header`, padded to `size` bytes. */
function fileWith(header: number[], name: string, type: string, size = 100) {
  const bytes = new Uint8Array(size);
  bytes.set(header);
  return new File([bytes], name, { type });
}

const PNG_HEADER = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const JPEG_HEADER = [0xff, 0xd8, 0xff];
const WEBP_HEADER = [0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50];

describe("validateContactFields", () => {
  it("accepts a complete message and normalises the email", () => {
    const { values, errors } = validateContactFields(formWith(VALID), REASONS);

    expect(errors).toEqual({});
    expect(values).toEqual({ ...VALID, email: "jane@example.com" });
  });

  it("trims surrounding whitespace", () => {
    const { values } = validateContactFields(formWith({ ...VALID, name: "  Jane  " }), REASONS);

    expect(values.name).toBe("Jane");
  });

  it("requires every field", () => {
    const { errors } = validateContactFields(formWith({}), REASONS);

    expect(Object.keys(errors).sort()).toEqual(["details", "email", "name", "reason", "topic"]);
  });

  it("rejects an invalid email address", () => {
    const { errors } = validateContactFields(formWith({ ...VALID, email: "nope" }), REASONS);

    expect(errors.email).toMatch(/valid email/i);
  });

  it("only accepts a listed contact reason", () => {
    const { errors } = validateContactFields(formWith({ ...VALID, reason: "Hacking" }), REASONS);

    expect(errors.reason).toBeDefined();
  });

  it("limits the length of each field", () => {
    const tooLong = (limit: number) => "x".repeat(limit + 1);
    const { errors } = validateContactFields(
      formWith({
        ...VALID,
        name: tooLong(CONTACT_LIMITS.name),
        topic: tooLong(CONTACT_LIMITS.topic),
        details: tooLong(CONTACT_LIMITS.details),
      }),
      REASONS,
    );

    expect(Object.keys(errors).sort()).toEqual(["details", "name", "topic"]);
  });

  it("asks for a little more detail than a few characters", () => {
    const { errors } = validateContactFields(formWith({ ...VALID, details: "Hi" }), REASONS);

    expect(errors.details).toBeDefined();
  });
});

describe("attachmentError", () => {
  const png = (size = 100) => fileWith(PNG_HEADER, "photo.png", "image/png", size);

  it("allows no attachments", () => {
    expect(attachmentError([])).toBeNull();
  });

  it("allows up to the maximum number of images", () => {
    expect(attachmentError(Array.from({ length: ATTACHMENT_LIMITS.maxFiles }, () => png()))).toBe(
      null,
    );
  });

  it("rejects too many files", () => {
    const files = Array.from({ length: ATTACHMENT_LIMITS.maxFiles + 1 }, () => png());

    expect(attachmentError(files)).toMatch(/up to/i);
  });

  it("rejects files that are not JPG, PNG or WebP images", () => {
    expect(attachmentError([new File(["x"], "notes.pdf", { type: "application/pdf" })])).toMatch(
      /JPG, PNG or WebP/,
    );
  });

  it("rejects a total size over the limit", () => {
    const half = ATTACHMENT_LIMITS.maxTotalBytes / 2;

    expect(attachmentError([png(half), png(half + 1)])).toMatch(/MB/);
  });
});

describe("isImageFile", () => {
  it.each([
    ["PNG", fileWith(PNG_HEADER, "a.png", "image/png")],
    ["JPEG", fileWith(JPEG_HEADER, "a.jpg", "image/jpeg")],
    ["WebP", fileWith(WEBP_HEADER, "a.webp", "image/webp")],
  ])("recognises a real %s file", async (_kind, file) => {
    expect(await isImageFile(file)).toBe(true);
  });

  it("rejects a file that only claims to be an image", async () => {
    const disguised = new File(["<script>alert(1)</script>"], "a.png", { type: "image/png" });

    expect(await isImageFile(disguised)).toBe(false);
  });
});
