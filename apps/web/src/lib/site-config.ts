export const siteConfig = {
  name: "PocketCurb",
  title: "PocketCurb | Clarity before cleanup.",
  description:
    "PocketCurb is building a decision-first personal finance product centered on Safe-to-Spend, forward-looking cash flow, shared-spending correctness, and less admin work.",
  origin: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://pocketcurb.com").replace(/\/+$/, ""),
  keywords: [
    "PocketCurb",
    "decision-first personal finance",
    "Safe-to-Spend",
    "forward-looking cash flow",
    "shared spending",
    "reimbursements",
    "privacy-first budgeting"
  ]
} as const;

export const indexableRoutes = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/waitlist", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/privacy", changeFrequency: "monthly" as const, priority: 0.6 }
];

export function buildSiteUrl(path = "/") {
  return new URL(path, `${siteConfig.origin}/`).toString();
}
