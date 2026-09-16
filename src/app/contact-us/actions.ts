"use server";

import { contactSchema, type ContactInput } from "@/lib/contact-schema";

export type ContactResult =
  | { status: "sent" }
  | { status: "error"; message: string };

export async function submitContactForm(input: ContactInput): Promise<ContactResult> {
  // Honeypot filled means a bot — accept silently without delivering.
  if (input.company?.trim()) {
    return { status: "sent" };
  }

  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    return { status: "error", message: "Please check the form and try again." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.warn(
      "[contact] Email delivery is not configured (RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL). Submission received:",
      { name: parsed.data.name, email: parsed.data.email },
    );
    return {
      status: "error",
      message:
        "Our contact form isn't connected to email yet. Please call us on +91 8921938495 and we'll pick it up straight away.",
    };
  }

  const { name, email, message } = parsed.data;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `New enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    console.error("[contact] Delivery failed", response.status, await response.text());
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please try again, or call us on +91 8921938495.",
    };
  }

  return { status: "sent" };
}
