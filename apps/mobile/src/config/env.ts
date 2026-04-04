type RequiredPublicEnv = "EXPO_PUBLIC_SUPABASE_URL" | "EXPO_PUBLIC_SUPABASE_ANON_KEY";

declare const process:
  | {
      env?: Record<string, string | undefined>;
    }
  | undefined;

function getEnv(name: string) {
  return process?.env?.[name];
}

function readRequiredEnv(name: RequiredPublicEnv) {
  const value = getEnv(name);
  if (!value) {
    throw new Error(`Missing required public env: ${name}`);
  }
  return value;
}

export const mobileEnv = {
  supabaseUrl: getEnv("EXPO_PUBLIC_SUPABASE_URL") ?? null,
  supabaseAnonKey: getEnv("EXPO_PUBLIC_SUPABASE_ANON_KEY") ?? null,
  sentryDsn: getEnv("EXPO_PUBLIC_SENTRY_DSN") ?? null,
  posthogKey: getEnv("EXPO_PUBLIC_POSTHOG_KEY") ?? null,
  revenueCatAppleApiKey: getEnv("EXPO_PUBLIC_REVENUECAT_APPLE_API_KEY") ?? null,
  revenueCatGoogleApiKey: getEnv("EXPO_PUBLIC_REVENUECAT_GOOGLE_API_KEY") ?? null
};

export function readConfiguredSupabaseEnv() {
  return {
    supabaseUrl: readRequiredEnv("EXPO_PUBLIC_SUPABASE_URL"),
    supabaseAnonKey: readRequiredEnv("EXPO_PUBLIC_SUPABASE_ANON_KEY")
  };
}
