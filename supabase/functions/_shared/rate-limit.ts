const sensitiveFunctionNames = new Set(["safe-to-spend", "daily-guidance", "simulate-transaction"]);

export async function enforceFunctionRateLimit(functionName: string) {
  if (!sensitiveFunctionNames.has(functionName)) {
    return { allowed: true };
  }

  // The scaffold does not implement persistent rate-limit state yet.
  // Sensitive paths are explicitly marked here so the eventual backing store
  // cannot be skipped without touching a shared boundary helper.
  return { allowed: true };
}
