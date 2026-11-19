import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { sendContactMessage } from "@/actions/contact";
import { ContactForm } from "@/components/contact";
import { ATTACHMENT_LIMITS } from "@/lib/contact";

vi.mock("@/actions/contact", () => ({ sendContactMessage: vi.fn() }));
const action = vi.mocked(sendContactMessage);

const REASONS = ["Bookings", "Feedback"];

const image = (name: string, size = 100) =>
  new File([new Uint8Array(size)], name, { type: "image/png" });

function renderForm() {
  render(<ContactForm reasons={REASONS} />);
  return screen.getByRole("form", { name: "Contact us" });
}

const uploadInput = () => screen.getByLabelText("Upload images", { selector: "input" });
const attachmentNames = () =>
  within(screen.queryByRole("list", { name: "Attached images" }) ?? document.createElement("ul"))
    .queryAllByRole("listitem")
    .map((item) => item.firstChild?.textContent);

describe("ContactForm", () => {
  beforeEach(() => action.mockReset());

  it("labels every field and marks the required ones", () => {
    renderForm();

    ["First and last name", "Email", "Contact reason", "Topic", "Tell us the details"].forEach(
      (label) => expect(screen.getByLabelText(new RegExp(label))).toBeRequired(),
    );
    expect(screen.getByText(/indicates a required field/i)).toBeInTheDocument();
  });

  it("offers each contact reason", () => {
    renderForm();

    const select = screen.getByRole("combobox", { name: /Contact reason/ });
    expect(
      within(select)
        .getAllByRole("option")
        .map(({ textContent }) => textContent),
    ).toEqual(["Contact reason*", ...REASONS]);
  });

  it("hides the anti-spam field from people and assistive technology", () => {
    renderForm();

    const trap = document.querySelector('input[name="website"]');
    expect(trap).not.toBeNull();
    expect(trap).toHaveAttribute("tabindex", "-1");
    expect(trap?.closest("[aria-hidden='true']")).not.toBeNull();
  });

  it("lists picked images and lets each be removed", () => {
    renderForm();

    fireEvent.change(uploadInput(), { target: { files: [image("one.png"), image("two.png")] } });
    expect(attachmentNames()).toEqual(["one.png", "two.png"]);

    fireEvent.click(screen.getByRole("button", { name: "Remove one.png" }));
    expect(attachmentNames()).toEqual(["two.png"]);
  });

  it("accepts images dropped onto the upload area", () => {
    renderForm();

    fireEvent.drop(screen.getByText(/Drag or paste images here/), {
      dataTransfer: { files: [image("dropped.png")] },
    });

    expect(attachmentNames()).toEqual(["dropped.png"]);
  });

  it("accepts images pasted anywhere in the form", () => {
    const form = renderForm();

    fireEvent.paste(form, { clipboardData: { files: [image("pasted.png")] } });

    expect(attachmentNames()).toEqual(["pasted.png"]);
  });

  it("refuses more images than allowed and explains why", () => {
    renderForm();
    const files = Array.from({ length: ATTACHMENT_LIMITS.maxFiles + 1 }, (_, i) =>
      image(`${i}.png`),
    );

    fireEvent.change(uploadInput(), { target: { files } });

    expect(attachmentNames()).toEqual([]);
    expect(screen.getByRole("alert")).toHaveTextContent(/up to/i);
  });

  it("sends the attached images with the message", async () => {
    action.mockResolvedValue({ status: "success", message: "Thank you." });
    const form = renderForm();

    fireEvent.change(uploadInput(), { target: { files: [image("one.png")] } });
    fireEvent.submit(form);

    await waitFor(() => expect(action).toHaveBeenCalled());
    const formData = action.mock.calls[0]![1];
    expect((formData.getAll("attachments") as File[]).map(({ name }) => name)).toEqual(["one.png"]);
  });

  it("shows each field error next to its field and keeps what was typed", async () => {
    action.mockResolvedValue({
      status: "error",
      message: "Please check the highlighted fields.",
      errors: { email: "Please enter a valid email address." },
      values: { name: "Jane", email: "nope", reason: "Feedback", topic: "Hi", details: "Text" },
    });
    const form = renderForm();

    fireEvent.submit(form);

    const email = await screen.findByLabelText(/Email/);
    await waitFor(() => expect(email).toHaveAttribute("aria-invalid", "true"));
    expect(email).toHaveAccessibleDescription("Please enter a valid email address.");
    expect(screen.getByLabelText(/First and last name/)).toHaveValue("Jane");
    expect(screen.getByRole("combobox", { name: /Contact reason/ })).toHaveValue("Feedback");
    expect(screen.getByRole("alert")).toHaveTextContent(/check the highlighted fields/i);
  });

  it("replaces the form with a confirmation once the message is sent", async () => {
    action.mockResolvedValue({ status: "success", message: "Thank you, we'll be in touch." });
    const form = renderForm();

    fireEvent.submit(form);

    expect(await screen.findByText("Thank you, we'll be in touch.")).toBeInTheDocument();
    expect(screen.queryByRole("form", { name: "Contact us" })).toBeNull();
  });
});
