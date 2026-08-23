import { ContactFormData } from "./types";

interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateContactForm(data: unknown): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data || typeof data !== "object") {
    return { valid: false, errors: { form: "Invalid form data." } };
  }

  const form = data as Record<string, unknown>;

  // Honeypot check — if filled, it's a bot
  if (form.honeypot && typeof form.honeypot === "string" && form.honeypot.trim() !== "") {
    // Silently reject — don't reveal honeypot to bots
    return { valid: false, errors: { form: "Submission rejected." } };
  }

  // Name
  if (!form.name || typeof form.name !== "string" || form.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  } else if (form.name.trim().length > 100) {
    errors.name = "Name is too long.";
  }

  // Email
  if (!form.email || typeof form.email !== "string") {
    errors.email = "Please enter your email.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      errors.email = "Please enter a valid email address.";
    } else if (form.email.trim().length > 254) {
      errors.email = "Email address is too long.";
    }
  }

  // Phone
  if (!form.phone || typeof form.phone !== "string" || form.phone.trim().length < 6) {
    errors.phone = "Please enter your phone number.";
  } else if (form.phone.trim().length > 20) {
    errors.phone = "Phone number is too long.";
  }

  // Space type
  const validSpaceTypes = ["Residential", "Commercial", "Hospitality", "Not sure yet"];
  if (!form.spaceType || typeof form.spaceType !== "string" || !validSpaceTypes.includes(form.spaceType)) {
    errors.spaceType = "Please select a space type.";
  }

  // Message (optional but if provided, cap length)
  if (form.message && typeof form.message === "string" && form.message.trim().length > 2000) {
    errors.message = "Message is too long (max 2000 characters).";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Sanitize a string for safe storage/display — strip HTML tags.
 */
export function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}
