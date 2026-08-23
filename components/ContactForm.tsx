"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

const SPACE_TYPES = ["Residential", "Commercial", "Hospitality", "Not sure yet"];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setGeneralError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      spaceType: formData.get("spaceType") as string,
      message: formData.get("message") as string,
      honeypot: formData.get("company_url") as string, // honeypot field
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setGeneralError(result.message || "Something went wrong. Please try again.");
        }
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setGeneralError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-12 text-center">
        <h3 className="font-serif text-[length:var(--text-h3)] mb-4">
          Thanks — we&apos;ve got it.
        </h3>
        <p className="text-ink-muted">
          {/* content.md — post-submit confirmation */}
          We&apos;ll get back to you within [X business days].
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 max-w-xl">
      {/* Honeypot — hidden from humans, bots fill it */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company_url">Leave this empty</label>
        <input type="text" id="company_url" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-sans text-ink-muted mb-1.5">
          Name <span className="text-clay">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 bg-surface border border-border text-ink text-[length:var(--text-body)] focus:outline-none focus:border-accent transition-colors"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-clay">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-sans text-ink-muted mb-1.5">
          Email <span className="text-clay">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 bg-surface border border-border text-ink text-[length:var(--text-body)] focus:outline-none focus:border-accent transition-colors"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-clay">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-sans text-ink-muted mb-1.5">
          Phone <span className="text-clay">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          className="w-full px-4 py-3 bg-surface border border-border text-ink text-[length:var(--text-body)] focus:outline-none focus:border-accent transition-colors"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-clay">{errors.phone}</p>
        )}
      </div>

      <div>
        <label htmlFor="spaceType" className="block text-sm font-sans text-ink-muted mb-1.5">
          Space type <span className="text-clay">*</span>
        </label>
        <select
          id="spaceType"
          name="spaceType"
          required
          defaultValue=""
          className="w-full px-4 py-3 bg-surface border border-border text-ink text-[length:var(--text-body)] focus:outline-none focus:border-accent transition-colors appearance-none"
          aria-invalid={!!errors.spaceType}
          aria-describedby={errors.spaceType ? "spaceType-error" : undefined}
        >
          <option value="" disabled>Select space type</option>
          {SPACE_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.spaceType && (
          <p id="spaceType-error" className="mt-1 text-sm text-clay">{errors.spaceType}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-sans text-ink-muted mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="A little about the space and what you're hoping to change."
          className="w-full px-4 py-3 bg-surface border border-border text-ink text-[length:var(--text-body)] focus:outline-none focus:border-accent transition-colors resize-y"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-clay">{errors.message}</p>
        )}
      </div>

      {generalError && (
        <p className="text-sm text-clay">{generalError}</p>
      )}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send Enquiry"}
      </Button>

      {/* Privacy note — content.md / techspec.md §5.3 */}
      <p className="text-xs text-ink-muted mt-4">
        Your details are used only to respond to this enquiry — nothing else.
      </p>
    </form>
  );
}
