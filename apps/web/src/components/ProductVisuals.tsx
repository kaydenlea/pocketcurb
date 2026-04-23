import { MetricChip } from "@gama/ui-web";
import { siteCopy } from "../content/site-copy";
import { mockupPreviews, type MockupPreviewSlug } from "../content/mockup-previews";
import { getMockupPreviewHtml } from "../lib/mockup-preview-html";

type StoryScene = (typeof siteCopy.shared.storyScenes)[number];
type MockupPreviewCrop = "events" | "eventDetails";

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

async function DeviceShell({
  className,
  crop,
  priority = false,
  preview = "overview-screen"
}: {
  className?: string;
  crop?: MockupPreviewCrop;
  priority?: boolean;
  preview?: MockupPreviewSlug;
}) {
  const previewHtml = await getMockupPreviewHtml(preview, crop);

  return (
    <div className={joinClasses("device-shell device-shell-framed", className)}>
      <div className="device-frame">
        <div className="device-screen-wrap" style={{ background: mockupPreviews[preview].background }}>
          <iframe
            aria-label={`Gama ${preview} preview`}
            className="device-iframe"
            loading={priority ? "eager" : "lazy"}
            sandbox=""
            scrolling="no"
            srcDoc={previewHtml}
            title={`Gama ${preview} preview`}
          />
        </div>
      </div>
    </div>
  );
}

export async function MockupPreviewPhone({
  className,
  crop,
  preview,
  priority = false
}: {
  className?: string;
  crop?: MockupPreviewCrop;
  preview: MockupPreviewSlug;
  priority?: boolean;
}) {
  return <DeviceShell className={className ?? ""} preview={preview} priority={priority} {...(crop ? { crop } : {})} />;
}

export async function MockupPreviewSurface({
  className,
  preview,
  priority = false
}: {
  className?: string;
  preview: MockupPreviewSlug;
  priority?: boolean;
}) {
  const previewHtml = await getMockupPreviewHtml(preview);

  return (
    <div className={joinClasses("mockup-surface", className)} style={{ background: mockupPreviews[preview].background }}>
      <iframe
        aria-label={`Gama ${preview} surface preview`}
        className="mockup-surface-frame"
        loading={priority ? "eager" : "lazy"}
        sandbox=""
        scrolling="no"
        srcDoc={previewHtml}
        title={`Gama ${preview} surface preview`}
      />
    </div>
  );
}

function MiniInsightCard({
  eyebrow,
  title,
  body
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

async function StorySceneFrame({ scene }: { scene: StoryScene }) {
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
            <div><span>Lodging</span><strong>$220</strong></div>
            <div><span>Dinner</span><strong>$96</strong></div>
            <div><span>Coffee stops</span><strong>$44</strong></div>
            <div><span>Shared ride</span><strong>$68</strong></div>
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
          <MiniInsightCard eyebrow="Fronted dinner" title="$128" body="Awaiting reimbursement, not counted like overspend." />
          <MiniInsightCard eyebrow="Personal spend" title="$42" body="Private autonomy stays explicit in shared views." />
        </div>
      </div>
      <DeviceShell className="story-visual-side-phone story-visual-side-phone-raised" preview={scene.previewSlug} />
    </div>
  );
}

export async function ProductHeroVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={joinClasses("premium-hero-visual", compact && "premium-hero-visual-compact")}>
      <div className="premium-orb premium-orb-left" aria-hidden="true" />
      <div className="premium-orb premium-orb-right" aria-hidden="true" />
      <div className="premium-orb premium-orb-bottom" aria-hidden="true" />
      <div className="premium-ridge premium-ridge-left" aria-hidden="true" />
      <div className="premium-ridge premium-ridge-right" aria-hidden="true" />
      <div className="premium-hero-halo" aria-hidden="true" />
      <div className="premium-hero-ring premium-hero-ring-large" aria-hidden="true" />
      <div className="premium-hero-ring premium-hero-ring-small" aria-hidden="true" />

      <DeviceShell className="premium-hero-device" priority preview="overview-screen" />

      <div className="premium-hero-card premium-hero-card-left">
        <span className="mini-insight-eyebrow">Daily clarity</span>
        <strong>Safe today</strong>
        <p>Clear before cleanup.</p>
      </div>

      <div className="premium-hero-card premium-hero-card-right">
        <span className="mini-insight-eyebrow">Forward view</span>
        <strong>Pressure ahead</strong>
        <p>Cash flow in view.</p>
      </div>
    </div>
  );
}

export async function StorySceneSection({
  scene,
  reverse = false
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
        <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)] md:text-lg">{scene.body}</p>
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
