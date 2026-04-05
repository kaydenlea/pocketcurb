const defaultAllowedOrigins = ["https://pocketcurb.com", "https://www.pocketcurb.com"] as const;

const baseCorsHeaders = {
  "content-type": "application/json",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "authorization, x-client-info, apikey, content-type",
  vary: "Origin"
} as const;

function normalizeOrigin(candidate: string): string | null {
  const trimmed = candidate.trim();
  if (!trimmed) {
    return null;
  }

  try {
    const url = new URL(trimmed);
    if (!/^https?:$/iu.test(url.protocol)) {
      return null;
    }

    return url.origin;
  } catch {
    return null;
  }
}

function isLoopbackOrigin(origin: string): boolean {
  try {
    const url = new URL(origin);
    return /^(localhost|127(?:\.\d{1,3}){3}|::1)$/iu.test(url.hostname);
  } catch {
    return false;
  }
}

function readRequestOrigin(request: Request): string | null {
  const origin = request.headers.get("origin");
  return origin ? normalizeOrigin(origin) : null;
}

function readAllowedOrigins(): Set<string> {
  let configuredOrigins: string[] = [];

  try {
    configuredOrigins = Deno.env
      .get("ALLOWED_ORIGINS")
      ?.split(",")
      .map((origin) => normalizeOrigin(origin))
      .filter((origin): origin is string => Boolean(origin)) ?? [];
  } catch {
    configuredOrigins = [];
  }

  return new Set([...defaultAllowedOrigins, ...configuredOrigins]);
}

export function isAllowedCorsOrigin(origin: string): boolean {
  return isLoopbackOrigin(origin) || readAllowedOrigins().has(origin);
}

export function buildCorsHeaders(request?: Request): Record<string, string> {
  if (!request) {
    return { ...baseCorsHeaders };
  }

  const origin = readRequestOrigin(request);
  if (!origin || !isAllowedCorsOrigin(origin)) {
    return { ...baseCorsHeaders };
  }

  return {
    ...baseCorsHeaders,
    "access-control-allow-origin": origin
  };
}

export function handleCorsPreflight(request: Request) {
  if (request.method !== "OPTIONS") {
    return null;
  }

  const origin = readRequestOrigin(request);
  if (!origin || !isAllowedCorsOrigin(origin)) {
    return new Response(JSON.stringify({ error: "CORS origin not allowed" }), {
      status: 403,
      headers: {
        ...baseCorsHeaders,
        "cache-control": "no-store"
      }
    });
  }

  return new Response("ok", {
    headers: buildCorsHeaders(request)
  });
}
