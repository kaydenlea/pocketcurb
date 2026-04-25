"use client";

import { MetricChip } from "@gama/ui-web";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { siteCopy } from "../content/site-copy";
import { mockupPreviews, type MockupPreviewSlug } from "../content/mockup-previews";

type StoryScene = (typeof siteCopy.shared.storyScenes)[number];
type MockupPreviewCrop = "events" | "eventDetails" | "storiesSignature";
const PREVIEW_BUST = "20260425-11";

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function DeviceShell({
  className,
  crop,
  preview = "overview-screen",
}: {
  className?: string;
  crop?: MockupPreviewCrop;
  preview?: MockupPreviewSlug;
}) {
  return (
    <div className={joinClasses("device-shell device-shell-framed", className)}>
      <div className="device-frame">
        <div
          className="device-screen-wrap"
          style={{ background: mockupPreviews[preview].background }}
        >
          <iframe
            aria-label={`Gama ${preview} preview`}
            className="device-iframe"
            loading="eager"
            sandbox=""
            scrolling="no"
            src={`/preview/${preview}${crop ? `?crop=${crop}&v=${PREVIEW_BUST}` : `?v=${PREVIEW_BUST}`}`}
            title={`Gama ${preview} preview`}
          />
        </div>
      </div>
    </div>
  );
}

export function MockupPreviewPhone({
  className,
  crop,
  preview,
}: {
  className?: string;
  crop?: MockupPreviewCrop;
  preview: MockupPreviewSlug;
}) {
  return <DeviceShell className={className ?? ""} preview={preview} {...(crop ? { crop } : {})} />;
}

export function MockupPreviewSurface({
  className,
  crop,
  preview,
}: {
  className?: string;
  crop?: MockupPreviewCrop;
  preview: MockupPreviewSlug;
}) {
  return (
    <div
      className={joinClasses("mockup-surface", className)}
      style={{ background: mockupPreviews[preview].background }}
    >
      <iframe
        aria-label={`Gama ${preview} surface preview`}
        className="mockup-surface-frame"
        loading="eager"
        sandbox=""
        scrolling="no"
        src={`/preview/${preview}${crop ? `?crop=${crop}&v=${PREVIEW_BUST}` : `?v=${PREVIEW_BUST}`}`}
        title={`Gama ${preview} surface preview`}
      />
    </div>
  );
}

function MiniInsightCard({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="mini-insight-card">
      <span className="mini-insight-eyebrow">{eyebrow}</span>
      <strong>{title}</strong>
      <p>{body}</p>
    </div>
  );
}

function StorySceneFrame({ scene }: { scene: StoryScene }) {
  if (scene.id === "clarity") {
    return (
      <div className="story-visual-card">
        <div className="story-visual-stage">
          <DeviceShell className="story-visual-phone" preview={scene.previewSlug} />
          <div className="story-visual-floating story-visual-floating-left">
            <MiniInsightCard
              eyebrow="Safe-to-Spend"
              title="$86 today"
              body="Bills, shared context, and buffer protection stay visible."
            />
          </div>
          <div className="story-visual-floating story-visual-floating-right">
            <MiniInsightCard
              eyebrow="Forward look"
              title="Rent in 2 days"
              body="$1,240 reserved with no surprise drop this week."
            />
          </div>
        </div>
      </div>
    );
  }

  if (scene.id === "events") {
    return (
      <div className="story-visual-card story-visual-card-events">
        <div className="receipt-preview">
          <div className="receipt-preview-head">
            <span className="mini-insight-eyebrow">Weekend receipt</span>
            <strong>$428 total</strong>
          </div>
          <div className="receipt-preview-list">
            <div>
              <span>Lodging</span>
              <strong>$220</strong>
            </div>
            <div>
              <span>Dinner</span>
              <strong>$96</strong>
            </div>
            <div>
              <span>Coffee stops</span>
              <strong>$44</strong>
            </div>
            <div>
              <span>Shared ride</span>
              <strong>$68</strong>
            </div>
          </div>
          <div className="receipt-preview-foot">Curated before sharing</div>
        </div>
        <DeviceShell className="story-visual-side-phone" preview={scene.previewSlug} />
      </div>
    );
  }

  return (
    <div className="story-visual-card story-visual-card-shared">
      <div className="shared-rail-card">
        <div className="shared-rail-head">
          <div>
            <span className="mini-insight-eyebrow">Shared context</span>
            <strong>On</strong>
          </div>
          <div className="shared-toggle" aria-hidden="true">
            <span />
          </div>
        </div>
        <div className="shared-rail-grid">
          <MiniInsightCard
            eyebrow="Fronted dinner"
            title="$128"
            body="Awaiting reimbursement, not counted like overspend."
          />
          <MiniInsightCard
            eyebrow="Personal spend"
            title="$42"
            body="Private autonomy stays explicit in shared views."
          />
        </div>
      </div>
      <DeviceShell
        className="story-visual-side-phone story-visual-side-phone-raised"
        preview={scene.previewSlug}
      />
    </div>
  );
}

export function ProductHeroVisual({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNarrowStacked, setIsNarrowStacked] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    let frame = 0;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const absoluteTop = window.scrollY + rect.top;
      const start = Math.max(absoluteTop - viewportHeight * 0.28, 0);
      const end = absoluteTop + rect.height * 0.34;
      const distance = Math.max(end - start, 1);
      const progress = Math.min(Math.max(((window.scrollY - start) / distance) * 1.32, 0), 1);

      setIsNarrowStacked(window.innerWidth <= 1119);
      setScrollProgress(progress);
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const easedProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);

  return (
    <div
      ref={ref}
      className={joinClasses("premium-hero-visual", compact && "premium-hero-visual-compact")}
    >
      <div className="premium-hero-halo" aria-hidden="true" />
      <HeroContextChip
        accentClassName="premium-context-chip-icon-safe"
        chipClassName="premium-context-chip-safe"
        detail="SAFE"
        icon="🛡"
        isNarrowStacked={isNarrowStacked}
        progress={easedProgress}
        title="$86 today"
      />
      <HeroContextChip
        accentClassName="premium-context-chip-icon-rent"
        chipClassName="premium-context-chip-rent"
        detail="RESERVED"
        icon="🏠"
        isNarrowStacked={isNarrowStacked}
        progress={easedProgress}
        title="Rent Fri"
      />
      <HeroContextChip
        accentClassName="premium-context-chip-icon-date"
        chipClassName="premium-context-chip-date"
        detail="COVERED"
        icon="🍜"
        isNarrowStacked={isNarrowStacked}
        progress={easedProgress}
        title="Date night"
      />
      <HeroContextChip
        accentClassName="premium-context-chip-icon-sync"
        chipClassName="premium-context-chip-sync"
        detail="SYNCED"
        icon="🔗"
        isNarrowStacked={isNarrowStacked}
        progress={easedProgress}
        title="3 accounts"
      />
      <HeroContextChip
        accentClassName="premium-context-chip-icon-trip"
        chipClassName="premium-context-chip-trip"
        detail="Forward view"
        icon="\u2708\uFE0F"
        isNarrowStacked={isNarrowStacked}
        progress={easedProgress}
        title="Trip week"
      />
      <HeroContextChip
        accentClassName="premium-context-chip-icon-bills"
        chipClassName="premium-context-chip-bills"
        detail="Bills ready"
        icon="\uD83D\uDCC5"
        isNarrowStacked={isNarrowStacked}
        progress={easedProgress}
        title="Loaded"
      />

      <DeviceShell className="premium-hero-device" preview="overview-screen" />
    </div>
  );
}

function HeroContextChip({
  accentClassName,
  chipClassName,
  detail,
  isNarrowStacked,
  progress,
  icon,
  title,
}: {
  accentClassName: string;
  chipClassName: string;
  detail: string;
  isNarrowStacked: boolean;
  progress: number;
  icon: string;
  title: string;
}) {
  const fallbackIconByChip: Record<string, string> = {
    "premium-context-chip-safe": "\uD83D\uDEE1",
    "premium-context-chip-rent": "\uD83C\uDFE0",
    "premium-context-chip-date": "\uD83C\uDF5C",
    "premium-context-chip-sync": "\uD83D\uDD17",
    "premium-context-chip-trip": "\u2708\uFE0F",
    "premium-context-chip-bills": "\uD83D\uDCC5",
  };
  const resolvedIcon = fallbackIconByChip[chipClassName] ?? icon;
  const motionByChip: Record<
    string,
    {
      endAngle: number;
      fadeStart: number;
      fromX: number;
      fromY: number;
      startAngle: number;
      startScale: number;
    }
  > = {
    "premium-context-chip-safe": {
      endAngle: -14,
      fadeStart: 0,
      fromX: 4.4,
      fromY: 3.3,
      startAngle: 30,
      startScale: 0.72,
    },
    "premium-context-chip-rent": {
      endAngle: 15,
      fadeStart: 0,
      fromX: -4.4,
      fromY: 3,
      startAngle: -30,
      startScale: 0.74,
    },
    "premium-context-chip-trip": {
      endAngle: 9,
      fadeStart: 0.02,
      fromX: -3.6,
      fromY: 2.1,
      startAngle: -22,
      startScale: 0.76,
    },
    "premium-context-chip-date": {
      endAngle: -11,
      fadeStart: 0.015,
      fromX: 3.9,
      fromY: -3.1,
      startAngle: 22,
      startScale: 0.76,
    },
    "premium-context-chip-bills": {
      endAngle: -7,
      fadeStart: 0.03,
      fromX: 3.5,
      fromY: -2.6,
      startAngle: 18,
      startScale: 0.78,
    },
    "premium-context-chip-sync": {
      endAngle: 12,
      fadeStart: 0.025,
      fromX: -3.7,
      fromY: -3,
      startAngle: -24,
      startScale: 0.78,
    },
  };
  const motion = motionByChip[chipClassName] ?? {
    endAngle: 0,
    fadeStart: 0,
    fromX: 0,
    fromY: 0,
    startAngle: 0,
    startScale: 1,
  };
  const revealFloor = isNarrowStacked ? 0.52 : 0.34;
  const reveal =
    progress <= motion.fadeStart
      ? revealFloor
      : Math.min(
          1,
          revealFloor +
            ((progress - motion.fadeStart) / (1 - motion.fadeStart)) * (1 - revealFloor),
        );
  const angle = motion.endAngle + (motion.startAngle - motion.endAngle) * (1 - reveal);
  const style = {
    opacity: reveal,
    transform: `translate3d(${(1 - reveal) * motion.fromX}rem, ${(1 - reveal) * motion.fromY}rem, 0) rotate(${angle}deg) scale(${motion.startScale + (1 - motion.startScale) * reveal})`,
    filter: `blur(${(1 - reveal) * (isNarrowStacked ? 1.6 : 2.5)}px)`,
  } as CSSProperties;

  return (
    <div className={joinClasses("premium-context-chip", chipClassName)} style={style}>
      <span
        className={joinClasses("premium-context-chip-icon", accentClassName)}
        aria-hidden="true"
      >
        {resolvedIcon}
      </span>
      <span className="premium-context-chip-copy">
        <strong>{title}</strong>
        <span>{detail}</span>
      </span>
    </div>
  );
}

export function StorySceneSection({
  scene,
  reverse = false,
}: {
  scene: StoryScene;
  reverse?: boolean;
}) {
  return (
    <section className={joinClasses("story-scene-grid", reverse && "story-scene-grid-reverse")}>
      <div className="story-copy">
        <p className="site-kicker">{scene.eyebrow}</p>
        <h3 className="mt-5 max-w-[14ch] text-4xl font-semibold leading-[0.95] text-[var(--color-ink)] md:text-5xl">
          {scene.title}
        </h3>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)] md:text-lg">
          {scene.body}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {scene.metrics.map((metric) => (
            <MetricChip key={metric.label} label={metric.label} value={metric.value} />
          ))}
        </div>
      </div>
      <div className="story-visual-wrap">
        <StorySceneFrame scene={scene} />
      </div>
    </section>
  );
}

export function ProofStrip({ items }: { items: readonly { label: string; value: string }[] }) {
  return (
    <div className="proof-strip" role="list" aria-label="Core product proof points">
      {items.map((item) => (
        <div key={item.label} className="proof-strip-item" role="listitem">
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}
