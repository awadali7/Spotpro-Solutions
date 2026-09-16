"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { submitContactForm } from "@/app/contact-us/actions";

export function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  async function onSubmit(values: ContactInput) {
    setServerError(null);
    const result = await submitContactForm(values);
    if (result.status === "sent") {
      setSent(true);
      reset();
    } else {
      setServerError(result.message);
    }
  }

  if (sent) {
    return (
      <div
        role="status"
        className="border-highlight/40 bg-highlight/10 rounded-2xl border p-8 text-center"
      >
        <CheckCircle2 className="text-highlight-ink mx-auto size-10" aria-hidden="true" />
        <h2 className="font-heading mt-4 text-xl font-semibold">Message sent</h2>
        <p className="text-muted-foreground mt-2">
          Thanks for reaching out — we&apos;ll get back to you shortly.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="mt-2 h-11"
          {...register("name")}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="text-destructive mt-1.5 text-sm">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="mt-2 h-11"
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-destructive mt-1.5 text-sm">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={6}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="mt-2"
          placeholder="Tell us a little about what you're building or the problem you're trying to solve."
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-destructive mt-1.5 text-sm">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot: visually hidden, not announced, never filled by humans */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave blank)</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      {serverError && (
        <p role="alert" className="border-destructive/40 bg-destructive/10 text-destructive rounded-lg border p-3 text-sm">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-brand-gradient text-primary-foreground h-11 w-full text-sm font-semibold hover:opacity-90 sm:w-auto sm:px-8"
      >
        {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />}
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
