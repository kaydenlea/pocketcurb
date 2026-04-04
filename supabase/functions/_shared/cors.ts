export const corsHeaders = {
  "content-type": "application/json",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "authorization, x-client-info, apikey, content-type"
};

export function handleCorsPreflight(request: Request) {
  if (request.method !== "OPTIONS") {
    return null;
  }

  return new Response("ok", {
    headers: corsHeaders
  });
}
