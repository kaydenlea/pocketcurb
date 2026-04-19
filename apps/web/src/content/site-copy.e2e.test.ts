import { siteCopy } from "./site-copy";

describe("siteCopy", () => {
  it("keeps the core site aligned with the product thesis", () => {
    expect(siteCopy.home.hero.body).toContain("Safe-to-Spend");
    expect(siteCopy.home.connectMarquee.institutions).toHaveLength(5);
    expect(siteCopy.home.signatureFeatures.cards).toHaveLength(4);
    expect(siteCopy.home.signatureFeatures.cards.map((card) => card.previewSlug)).toContain("marker-popup");
    expect(siteCopy.home.signatureFeatures.cards.map((card) => card.previewSlug)).toContain("receipt");
    expect(siteCopy.home.walkthrough.steps).toHaveLength(5);
    expect(siteCopy.home.walkthrough.steps.map((step) => step.previewSlug)).toContain("event-details-share");
    expect(siteCopy.home.trustBridge.slides).toHaveLength(3);
    expect(siteCopy.home.screenGallery.cards.map((card) => card.previewSlug)).toContain("stories");
    expect(siteCopy.waitlist.hero.body).toContain("decision-first");
    expect(siteCopy.shared.storyScenes.map((scene) => scene.body).join(" ")).toContain("shared-spend");
    expect(siteCopy.waitlist.earlyAccess.notLiveBody).toContain("deferred");
    expect(siteCopy.privacy.hero.title).toContain("Privacy-first");
  });
});
