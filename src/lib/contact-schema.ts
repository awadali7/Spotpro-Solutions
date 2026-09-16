import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  message: z
    .string()
    .trim()
    .min(10, "Please give us a little more detail (at least 10 characters).")
    .max(4000),
  /** Honeypot — checked server-side, never validated, so autofill can't trap a real user */
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
