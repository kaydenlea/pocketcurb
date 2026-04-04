import { handleCorsPreflight } from "../_shared/cors.ts";
import { readBearerToken, unauthorizedResponse } from "../_shared/auth.ts";
import {
  jsonResponse,
  methodNotAllowedResponse,
  tooManyRequestsResponse,
  userSafeServerErrorResponse
} from "../_shared/response.ts";
import { enforceFunctionRateLimit } from "../_shared/rate-limit.ts";

Deno.serve(async (request) => {
  try {
    const preflight = handleCorsPreflight(request);
    if (preflight) {
      return preflight;
    }

    if (request.method !== "POST") {
      return methodNotAllowedResponse();
    }

    const token = readBearerToken(request);
    if (!token) {
      return unauthorizedResponse();
    }

    const rateLimit = await enforceFunctionRateLimit("safe-to-spend");
    if (!rateLimit.allowed) {
      return tooManyRequestsResponse();
    }

    return jsonResponse({
      message:
        "Safe-to-Spend Edge Function scaffold ready. Replace this with server-authoritative decision logic once the real schema exists."
    });
  } catch {
    return userSafeServerErrorResponse();
  }
});
