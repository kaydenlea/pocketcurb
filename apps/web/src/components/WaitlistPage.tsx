import Link from "next/link";
import { MetricChip } from "@gama/ui-web";
import { siteCopy } from "../content/site-copy";
import { sitePages } from "../lib/site-config";
import { Breadcrumbs } from "./Breadcrumbs";
import { ProductHeroVisual, ProofStrip, StorySceneSection } from "./ProductVisuals";
import { Reveal } from "./Reveal";
import { WaitlistSignupForm } from "./WaitlistSignupForm";

export function WaitlistPage() {
  return (
    <main id="main-content" className="site-shell flex flex-col gap-10 pb-10 pt-5 md:gap-14 md:pb-14 md:pt-8">
      <Breadcrumbs page={sitePages.waitlist} />

      <Reveal>
        <section className="hero-freeform hero-freeform-expanded">
        <div className="hero-freeform-grid hero-freeform-grid-expanded">
          <div className="relative z-[1] grid gap-6">
            <div className="eyebrow-stack">
              <span className="site-kicker">{siteCopy.waitlist.hero.eyebrow}</span>
              <p className="max-w-[32rem] text-sm uppercase tracking-[0.24em] text-[var(--color-muted)]">
                {siteCopy.shared.announcement}
              </p>
            </div>

            <div className="grid gap-5">
              <h1 className="max-w-[11ch] text-5xl leading-[0.94] text-[var(--color-ink)] md:text-7xl">
                {siteCopy.waitlist.hero.title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
                {siteCopy.waitlist.hero.body}
              </p>
            </div>

            <div className="cta-stack">
              <Link className="site-link" href={siteCopy.waitlist.hero.primaryCta.href}>
                {siteCopy.waitlist.hero.primaryCta.label}
              </Link>
              <Link className="site-link-secondary" href={siteCopy.waitlist.hero.secondaryCta.href}>
                {siteCopy.waitlist.hero.secondaryCta.label}
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              {siteCopy.waitlist.hero.supporting.map((item) => (
                <MetricChip key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          <div className="relative z-[1] hero-visual-column">
            <ProductHeroVisual />
          </div>
        </div>
        </section>
      </Reveal>

      <Reveal delayMs={70}>
        <ProofStrip items={siteCopy.shared.proofStrip} />
      </Reveal>

      <Reveal delayMs={100}>
        <section className="fluid-band">
        <div className="fluid-band-grid fluid-band-grid-wide">
          <div className="fluid-copy-block">
            <span className="site-kicker">{siteCopy.waitlist.positioning.eyebrow}</span>
            <h2 className="mt-5 max-w-[11ch] text-4xl font-semibold leading-[0.95] text-[var(--color-ink)] md:text-6xl">
              {siteCopy.waitlist.positioning.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
              {siteCopy.waitlist.positioning.body}
            </p>

            <div className="fluid-feature-grid mt-8 md:grid-cols-2">
              {siteCopy.waitlist.differentiators.map((card) => (
                <div key={card.title} className="fluid-feature-card">
                  <h3 className="text-2xl text-[var(--color-ink)]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)] md:text-base">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        </section>
      </Reveal>

      <Reveal delayMs={120}>
        <section className="story-flow-section">
        <div className="story-flow-heading">
          <span className="site-kicker">{siteCopy.waitlist.story.eyebrow}</span>
          <h2 className="mt-5 max-w-[11ch] text-4xl font-semibold leading-[0.95] text-[var(--color-ink)] md:text-6xl">
            {siteCopy.waitlist.story.title}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
            {siteCopy.waitlist.story.body}
          </p>
        </div>
        <div className="mt-3 flex flex-col gap-6">
          {siteCopy.shared.storyScenes.map((scene, index) => (
            <div key={scene.id} className="story-flow-card">
              <StorySceneSection reverse={index % 2 === 1} scene={scene} />
            </div>
          ))}
        </div>
        </section>
      </Reveal>

      <Reveal delayMs={140}>
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <section className="free-text-section">
        <div>
          <p className="site-kicker">{siteCopy.waitlist.scenariosIntro.eyebrow}</p>
          <h2 className="mt-5 max-w-[11ch] text-4xl font-semibold leading-[0.95] text-[var(--color-ink)] md:text-6xl">
            {siteCopy.waitlist.scenariosIntro.title}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
            {siteCopy.waitlist.scenariosIntro.body}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {siteCopy.shared.scenarios.map((scenario) => (
              <div key={scenario.title} className="fluid-feature-card h-full">
                <h3 className="text-2xl text-[var(--color-ink)]">{scenario.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)] md:text-base">{scenario.body}</p>
              </div>
            ))}
          </div>
        </div>
        </section>

        <div className="glimpse-float-card h-full">
          <p className="site-kicker">{siteCopy.waitlist.trust.eyebrow}</p>
          <h2 className="mt-5 max-w-[13ch] text-4xl font-semibold leading-[0.96] text-[var(--color-ink)]">
            {siteCopy.waitlist.trust.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] md:text-base">{siteCopy.waitlist.trust.body}</p>
          <div className="mt-6 grid gap-4">
            {siteCopy.waitlist.trustCards.map((card) => (
              <div key={card.title} className="glass-note-card">
                <p className="text-lg font-semibold text-[var(--color-ink)]">{card.title}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </Reveal>

      <Reveal delayMs={160}>
        <section id="early-access" className="anchor-offset early-access-freeform">
        <div className="early-access-grid">
          <div className="early-access-copy">
            <p className="site-kicker">{siteCopy.waitlist.earlyAccess.eyebrow}</p>
            <h2 className="early-access-title">
              {siteCopy.waitlist.earlyAccess.title}
            </h2>
            <p className="early-access-body">
              {siteCopy.waitlist.earlyAccess.body}
            </p>

            <div className="early-access-points">
              {siteCopy.waitlist.earlyAccess.intakeFields.map((field) => (
                <div key={field.title} className="early-access-point">
                  <span aria-hidden="true" className="early-access-point-dot" />
                  <p>
                    <strong>{field.title}</strong>
                    <span>{field.body}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <WaitlistSignupForm expectations={siteCopy.waitlist.earlyAccess.expectations} />
        </div>
        </section>
      </Reveal>

      <Reveal delayMs={180}>
        <section className="ambient-trust-section">
        <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr] lg:items-end">
          <div>
            <p className="site-kicker">{siteCopy.waitlist.closing.eyebrow}</p>
            <h2 className="mt-5 max-w-[12ch] text-4xl font-semibold leading-[0.95] text-[var(--color-ink)] md:text-6xl">
              {siteCopy.waitlist.closing.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
              {siteCopy.waitlist.closing.body}
            </p>
          </div>
          <div className="cta-stack lg:justify-end">
            <Link className="site-link" href="#early-access">
              {siteCopy.waitlist.earlyAccess.primaryCta.label}
            </Link>
            <Link className="site-link-secondary" href="/privacy">
              Review the trust stance
            </Link>
          </div>
        </div>
        </section>
      </Reveal>
    </main>
  );
}
