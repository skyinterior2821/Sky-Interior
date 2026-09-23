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
  if (typeof input !== "string") return "";
  return input.replace(/<[^>]*>/g, "").trim();
}

export function validateConsultationForm(data: unknown): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data || typeof data !== "object") {
    return { valid: false, errors: { form: "Invalid form data." } };
  }

  const form = data as Record<string, unknown>;

  // Honeypot check
  if (form.honeypot && typeof form.honeypot === "string" && form.honeypot.trim() !== "") {
    return { valid: false, errors: { form: "Submission rejected." } };
  }

  // Basic required string fields
  const requiredFields = ["name", "email", "phone", "city", "property_type", "area", "style", "budget", "design_type"];
  
  for (const field of requiredFields) {
    if (!form[field] || typeof form[field] !== "string" || (form[field] as string).trim().length === 0) {
      errors[field] = `Please provide a valid ${field.replace('_', ' ')}.`;
    } else if ((form[field] as string).trim().length > 100) {
      errors[field] = `${field.replace('_', ' ')} is too long.`;
    }
  }

  // Email format
  if (!errors.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test((form.email as string).trim())) {
      errors.email = "Please enter a valid email address.";
    }
  }

  // Optional details length
  if (form.details && typeof form.details === "string" && form.details.trim().length > 2000) {
    errors.details = "Details are too long (max 2000 characters).";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
