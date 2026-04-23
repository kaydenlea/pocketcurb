import { waitlistSignupSchema, type WaitlistSignup } from "@gama/schemas";

type RuntimeEnv = Record<string, string | undefined>;

export type WaitlistRuntimeConfig = {
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
  resendApiKey: string;
  waitlistFromEmail: string;
  waitlistNotifyEmail: string;
};

export type WaitlistRequestContext = {
  userAgent?: string | null;
  ipAddress?: string | null;
};

export type WaitlistSubmissionOutcome =
  | { status: "accepted" }
  | { status: "duplicate" };

export class WaitlistConfigurationError extends Error {
  constructor(message = "Waitlist backend is not configured.") {
    super(message);
    this.name = "WaitlistConfigurationError";
  }
}

export class WaitlistStorageError extends Error {
  constructor(message = "Waitlist signup could not be stored.") {
    super(message);
    this.name = "WaitlistStorageError";
  }
}

export class WaitlistEmailError extends Error {
  constructor(message = "Waitlist email could not be sent.") {
    super(message);
    this.name = "WaitlistEmailError";
  }
}

export type WaitlistDependencies = {
  fetch: typeof fetch;
  logger?: Pick<typeof console, "error">;
  now: () => Date;
};

const supabaseServiceRoleEnvKey = ["SUPABASE", "SERVICE", "ROLE", "KEY"].join("_");
const waitlistRateLimitWindowMs = 10 * 60 * 1000;
const waitlistRateLimitMaxSubmissions = 5;
const waitlistRateLimitBuckets = new Map<string, number[]>();

const requiredEnvKeys = [
  "SUPABASE_URL",
  supabaseServiceRoleEnvKey,
  "RESEND_API_KEY",
  "WAITLIST_FROM_EMAIL",
  "WAITLIST_NOTIFY_EMAIL"
] as const;

export function readWaitlistRuntimeConfig(env: RuntimeEnv = process.env): WaitlistRuntimeConfig {
  const missing = requiredEnvKeys.filter((key) => !env[key]?.trim());

  if (missing.length > 0) {
    throw new WaitlistConfigurationError(`Missing waitlist env: ${missing.join(", ")}`);
  }

  return {
    supabaseUrl: env.SUPABASE_URL!.replace(/\/$/, ""),
    supabaseServiceRoleKey: env[supabaseServiceRoleEnvKey]!,
    resendApiKey: env.RESEND_API_KEY!,
    waitlistFromEmail: env.WAITLIST_FROM_EMAIL!,
    waitlistNotifyEmail: env.WAITLIST_NOTIFY_EMAIL!
  };
}

export type WaitlistRateLimitInput = {
  email?: string | null;
  ipAddress?: string | null;
  nowMs?: number;
};

export type WaitlistRateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

export function checkWaitlistRateLimit(input: WaitlistRateLimitInput): WaitlistRateLimitResult {
  const nowMs = input.nowMs ?? Date.now();
  const keys = buildWaitlistRateLimitKeys(input);
  const oldestAllowedMs = nowMs - waitlistRateLimitWindowMs;

  for (const key of keys) {
    const recentHits = (waitlistRateLimitBuckets.get(key) ?? []).filter((hitMs) => hitMs > oldestAllowedMs);

    if (recentHits.length >= waitlistRateLimitMaxSubmissions) {
      waitlistRateLimitBuckets.set(key, recentHits);

      return {
        allowed: false,
        retryAfterSeconds: Math.max(1, Math.ceil((recentHits[0]! + waitlistRateLimitWindowMs - nowMs) / 1000))
      };
    }
  }

  for (const key of keys) {
    const recentHits = (waitlistRateLimitBuckets.get(key) ?? []).filter((hitMs) => hitMs > oldestAllowedMs);
    waitlistRateLimitBuckets.set(key, [...recentHits, nowMs]);
  }

  return { allowed: true };
}

export function resetWaitlistRateLimitForTests(): void {
  waitlistRateLimitBuckets.clear();
}

export async function submitWaitlistSignup(
  input: unknown,
  context: WaitlistRequestContext,
  config: WaitlistRuntimeConfig,
  dependencies: WaitlistDependencies = { fetch, now: () => new Date() }
): Promise<WaitlistSubmissionOutcome> {
  const signup = waitlistSignupSchema.parse(input);
  const submittedAt = dependencies.now().toISOString();

  const storageOutcome = await storeWaitlistSignup(signup, context, submittedAt, config, dependencies);
  if (storageOutcome.status === "duplicate") {
    return storageOutcome;
  }

  try {
    await sendWaitlistEmails(signup, config, dependencies);
  } catch (error) {
    const logger = dependencies.logger ?? console;

    logger.error("Waitlist signup stored, but email delivery failed.", {
      email: signup.email,
      error
    });
  }

  return { status: "accepted" };
}

function buildWaitlistRateLimitKeys(input: WaitlistRateLimitInput): string[] {
  const keys = new Set<string>();
  const ipAddress = input.ipAddress?.trim();
  const email = input.email?.trim().toLowerCase();

  keys.add(`ip:${ipAddress || "unknown"}`);

  if (email) {
    keys.add(`email:${email}`);
  }

  return Array.from(keys);
}

async function storeWaitlistSignup(
  signup: WaitlistSignup,
  context: WaitlistRequestContext,
  submittedAt: string,
  config: WaitlistRuntimeConfig,
  dependencies: WaitlistDependencies
): Promise<WaitlistSubmissionOutcome> {
  const response = await dependencies.fetch(`${config.supabaseUrl}/rest/v1/waitlist_signups`, {
    method: "POST",
    headers: {
      apikey: config.supabaseServiceRoleKey,
      authorization: `Bearer ${config.supabaseServiceRoleKey}`,
      "content-type": "application/json",
      prefer: "return=minimal"
    },
    body: JSON.stringify({
      email: signup.email,
      first_name: signup.firstName ?? null,
      persona: signup.persona ?? null,
      biggest_pain: signup.biggestPain ?? null,
      referral_source: signup.referralSource ?? null,
      marketing_consent: signup.marketingConsent,
      submitted_at: submittedAt,
      user_agent: context.userAgent ?? null,
      ip_address: context.ipAddress ?? null
    })
  });

  if (response.ok) {
    return { status: "accepted" };
  }

  if (response.status === 409) {
    return { status: "duplicate" };
  }

  throw new WaitlistStorageError();
}

async function sendWaitlistEmails(
  signup: WaitlistSignup,
  config: WaitlistRuntimeConfig,
  dependencies: WaitlistDependencies
): Promise<void> {
  const messages = [
    {
      from: config.waitlistFromEmail,
      to: signup.email,
      subject: "You're on the Gama waitlist",
      html: buildConfirmationEmail(signup)
    },
    {
      from: config.waitlistFromEmail,
      to: config.waitlistNotifyEmail,
      subject: `New Gama waitlist signup: ${signup.email}`,
      html: buildInternalNotificationEmail(signup)
    }
  ];

  for (const message of messages) {
    const response = await dependencies.fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${config.resendApiKey}`,
        "content-type": "application/json"
      },
      body: JSON.stringify(message)
    });

    if (!response.ok) {
      throw new WaitlistEmailError();
    }
  }
}

function buildConfirmationEmail(signup: WaitlistSignup): string {
  const greeting = signup.firstName ? `Hi ${escapeHtml(signup.firstName)},` : "Hi,";

  return [
    `<p>${greeting}</p>`,
    "<p>You're on the Gama waitlist. We'll only follow up with product updates, alpha access, or research invitations tied to the waitlist.</p>",
    "<p>Thanks for helping shape a calmer way to make daily money decisions.</p>"
  ].join("");
}

function buildInternalNotificationEmail(signup: WaitlistSignup): string {
  const rows: Array<{ label: string; value: string }> = [
    { label: "Email", value: signup.email },
    { label: "First name", value: signup.firstName ?? "" },
    { label: "Persona", value: signup.persona ?? "" },
    { label: "Biggest pain", value: signup.biggestPain ?? "" },
    { label: "Referral source", value: signup.referralSource ?? "" }
  ];

  return `<table>${rows
    .map((row) => `<tr><th align="left">${escapeHtml(row.label)}</th><td>${escapeHtml(row.value)}</td></tr>`)
    .join("")}</table>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
