import { NextRequest, NextResponse } from "next/server";
import { validateContactForm, sanitize } from "@/lib/validation";

// Basic in-memory rate limiting — per techspec.md §5.1
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // Server-side validation
    const result = validateContactForm(body);

    if (!result.valid) {
      return NextResponse.json(
        { message: "Validation failed.", errors: result.errors },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitize(body.name),
      email: sanitize(body.email),
      phone: sanitize(body.phone),
      spaceType: sanitize(body.spaceType),
      message: body.message ? sanitize(body.message) : "",
    };

    // TODO: Send email via Resend/SendGrid/etc.
    // For now, log the submission server-side only.
    // An email service API key will need to be provided by Priyanshu
    // and stored in .env.local (never committed to git).
    console.log("Contact form submission:", sanitizedData);

    return NextResponse.json(
      { message: "Enquiry received. We'll be in touch." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid request." },
      { status: 400 }
    );
  }
}
