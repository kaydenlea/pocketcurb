import {
  checkWaitlistRateLimit,
  readWaitlistRuntimeConfig,
  submitWaitlistSignup,
  WaitlistConfigurationError,
  WaitlistStorageError
} from "../../../src/server/waitlist";

export async function POST(request: Request): Promise<Response> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const rateLimit = checkWaitlistRateLimit({
    email: extractEmailForRateLimit(payload),
    ipAddress
  });

  if (!rateLimit.allowed) {
    return Response.json(
      { error: "rate_limited" },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds)
        }
      }
    );
  }

  try {
    const outcome = await submitWaitlistSignup(
      payload,
      {
        userAgent: request.headers.get("user-agent"),
        ipAddress
      },
      readWaitlistRuntimeConfig()
    );

    return Response.json({ status: outcome.status }, { status: 202 });
  } catch (error) {
    if (isZodValidationError(error)) {
      return Response.json({ error: "invalid_waitlist_signup" }, { status: 400 });
    }

    if (error instanceof WaitlistConfigurationError) {
      return Response.json({ error: "waitlist_not_configured" }, { status: 503 });
    }

    if (error instanceof WaitlistStorageError) {
      return Response.json({ error: "waitlist_unavailable" }, { status: 502 });
    }

    return Response.json({ error: "internal_error" }, { status: 500 });
  }
}

function extractEmailForRateLimit(payload: unknown): string | null {
  if (!payload || typeof payload !== "object" || !("email" in payload)) {
    return null;
  }

  const email = payload.email;

  return typeof email === "string" ? email : null;
}

function isZodValidationError(error: unknown): boolean {
  return Boolean(error && typeof error === "object" && "name" in error && error.name === "ZodError");
}
