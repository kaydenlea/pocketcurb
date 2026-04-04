import { MetricChip, SiteSection } from "@pocketcurb/ui-web";
import { siteCopy } from "../content/site-copy";

export function LandingHero() {
  return (
    <SiteSection eyebrow="Decision layer" title={siteCopy.heroTitle}>
      <p className="max-w-2xl text-base leading-7 text-slate-700">{siteCopy.heroBody}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <MetricChip label="Safe-to-Spend" value="Daily guidance" />
        <MetricChip label="Shared autonomy" value="Private and shared context" />
        <MetricChip label="Forward-looking" value="Week and month cash flow" />
      </div>

      <ul className="mt-8 grid gap-3 pl-5 text-slate-700">
        {siteCopy.proofPoints.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </SiteSection>
  );
}
