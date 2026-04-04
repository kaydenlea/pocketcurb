import { corsHeaders } from "./cors.ts";

export function jsonResponse(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders,
      "cache-control": "no-store"
    }
  });
}

export function methodNotAllowedResponse() {
  return jsonResponse({ error: "Method not allowed" }, 405);
}

export function tooManyRequestsResponse() {
  return jsonResponse({ error: "Rate limited" }, 429);
}

export function userSafeServerErrorResponse() {
  return jsonResponse({ error: "Request could not be completed" }, 500);
}
