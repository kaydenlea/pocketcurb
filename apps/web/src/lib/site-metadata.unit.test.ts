import { sitePages, resolveSiteEnvironment } from "./site-config";
import { createPageMetadata, createRootMetadata } from "./site-metadata";

describe("site-metadata", () => {
  const productionEnvironment = resolveSiteEnvironment({
    rawOrigin: "https://gama.money",
    nodeEnv: "production"
  });

  const nonProductionEnvironment = resolveSiteEnvironment({
    rawOrigin: "https://preview.example.test",
    nodeEnv: "production"
  });

  it("builds production page metadata with canonical URLs and indexable robots", () => {
    const metadata = createPageMetadata(sitePages.home, productionEnvironment);

    expect(metadata.alternates?.canonical).toBe("https://gama.money/");
    expect(metadata.robots).toMatchObject({
      index: true,
      follow: true
    });
    expect(metadata.openGraph).toMatchObject({
      url: "https://gama.money/",
      title: "Gama | Decision-first money clarity."
    });
    expect(metadata).not.toHaveProperty("keywords");
  });

  it("marks hidden secondary pages as noindex in production", () => {
    const metadata = createPageMetadata(sitePages.waitlist, productionEnvironment);

    expect(metadata.alternates?.canonical).toBe("https://gama.money/waitlist");
    expect(metadata.robots).toMatchObject({
      index: false,
      follow: false
    });
  });

  it("builds non-production root metadata with noindex robots", () => {
    const metadata = createRootMetadata(nonProductionEnvironment);

    expect(metadata.robots).toMatchObject({
      index: false,
      follow: false
    });
    expect(metadata.manifest).toBe("/manifest.webmanifest");
    expect(metadata.icons).toMatchObject({
      icon: [{ url: "/icon.png", type: "image/png" }]
    });
  });

  it("uses a root title template that leads with the Gama brand", () => {
    const metadata = createRootMetadata(productionEnvironment);

    expect(metadata.title).toMatchObject({
      default: "Gama | Decision-first money clarity.",
      template: "Gama | %s"
    });
  });
});
