import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "./rateLimit";

const IS_DEV = process.env.NODE_ENV === "development";

/** Redact internal error details in production. */
export function safeErrorMessage(error: unknown): string {
  if (IS_DEV && error instanceof Error) return error.message;
  return "Interner Fehler beim Laden der Daten.";
}

/** Returns a 429 response if rate limit is exceeded, otherwise null. */
export function checkRateLimit(request: NextRequest): NextResponse | null {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "anonymous";

  const { allowed } = rateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte kurz warten." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }
  return null;
}
