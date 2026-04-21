"use client";

import { useMemo, useState, type FormEvent } from "react";

type SubmissionState = "idle" | "submitting" | "accepted" | "duplicate" | "invalid" | "unavailable" | "error";

type HeroWaitlistFormProps = {
  ctaLabel: string;
};

export function HeroWaitlistForm({ ctaLabel }: HeroWaitlistFormProps) {
  const [state, setState] = useState<SubmissionState>("idle");

  const message = useMemo(() => {
    if (state === "accepted") {
      return "You're on the list. Check your inbox for the confirmation email.";
    }

    if (state === "duplicate") {
      return "That email is already on the list. You're all set.";
    }

    if (state === "invalid") {
      return "Enter a valid email and confirm the waitlist follow-up.";
    }

    if (state === "unavailable") {
      return "The waitlist is temporarily unavailable. Please try again later.";
    }

    if (state === "error") {
      return "Something went wrong before the signup could be submitted.";
    }

    return "Waitlist updates only. No public launch spam.";
  }, [state]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      email: String(formData.get("email") ?? ""),
      referralSource: "landing-page",
      marketingConsent: formData.get("marketingConsent") === "on",
      website: String(formData.get("website") ?? "").trim()
    };

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });

      const body = (await response.json().catch(() => null)) as { status?: string } | null;

      if (response.ok && body?.status === "accepted") {
        setState("accepted");
        form.reset();
        return;
      }

      if (response.ok && body?.status === "duplicate") {
        setState("duplicate");
        form.reset();
        return;
      }

      if (response.status === 400) {
        setState("invalid");
        return;
      }

      if (response.status === 429 || response.status === 502 || response.status === 503) {
        setState("unavailable");
        return;
      }

      setState("error");
    } catch {
      setState("error");
    }
  }

  const isSubmitting = state === "submitting";
  const isSuccess = state === "accepted" || state === "duplicate";

  return (
    <form className="hero-waitlist-form" onSubmit={handleSubmit}>
      <input autoComplete="off" className="hidden" name="website" tabIndex={-1} type="text" />
      <label className="sr-only" htmlFor="hero-email">
        Email address
      </label>
      <div className="hero-email-shell">
        <input
          autoComplete="email"
          className="hero-email-input"
          disabled={isSubmitting}
          id="hero-email"
          maxLength={254}
          name="email"
          placeholder="Enter your email"
          required
          type="email"
        />
        <button className="hero-email-submit" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Joining..." : ctaLabel}
        </button>
      </div>
      <label className="hero-waitlist-consent">
        <input disabled={isSubmitting} name="marketingConsent" required type="checkbox" />
        <span>I agree to receive Gama waitlist updates and related product follow-up.</span>
      </label>
      <p
        className={isSuccess ? "hero-waitlist-message hero-waitlist-message-success" : "hero-waitlist-message"}
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}
