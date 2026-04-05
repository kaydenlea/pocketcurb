import {
  buildCorsHeaders,
  handleCorsPreflight,
  isAllowedCorsOrigin,
} from "./cors.ts";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function verifyDefaultAllowedOrigin(): void {
  assert(isAllowedCorsOrigin("https://pocketcurb.com"), "Expected production origin to be allowed");
  assert(isAllowedCorsOrigin("https://www.pocketcurb.com"), "Expected www production origin to be allowed");
}

function verifyLoopbackAllowed(): void {
  assert(isAllowedCorsOrigin("http://localhost:54321"), "Expected localhost origin to be allowed");
  assert(isAllowedCorsOrigin("http://127.0.0.1:3000"), "Expected loopback origin to be allowed");
}

function verifyDisallowedOriginRejected(): void {
  assert(!isAllowedCorsOrigin("https://malicious.example"), "Expected unrelated origin to be rejected");
}

function verifyResponseHeadersReflectAllowedOrigin(): void {
  const headers = buildCorsHeaders(
    new Request("https://pocketcurb.test/function", {
      headers: { origin: "https://pocketcurb.com" },
    }),
  );

  assert(
    headers["access-control-allow-origin"] === "https://pocketcurb.com",
    "Expected allowed origin to be reflected in response headers",
  );
}

async function verifyPreflightRejectsDisallowedOrigin(): Promise<void> {
  const response = handleCorsPreflight(
    new Request("https://pocketcurb.test/function", {
      method: "OPTIONS",
      headers: { origin: "https://malicious.example" },
    }),
  );

  assert(response instanceof Response, "Expected preflight helper to return a response");
  assert(response.status === 403, `Expected 403 for disallowed origin, received ${response.status}`);
}

async function main(): Promise<void> {
  verifyDefaultAllowedOrigin();
  verifyLoopbackAllowed();
  verifyDisallowedOriginRejected();
  verifyResponseHeadersReflectAllowedOrigin();
  await verifyPreflightRejectsDisallowedOrigin();
}

if (import.meta.main) {
  await main();
}
