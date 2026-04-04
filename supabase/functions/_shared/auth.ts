import { jsonResponse } from "./response.ts";

export function readBearerToken(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) {
    return null;
  }

  return header.slice("Bearer ".length);
}

export function unauthorizedResponse() {
  return jsonResponse({ error: "Unauthorized" }, 401);
}
