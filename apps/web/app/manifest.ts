import type { MetadataRoute } from "next";
import { buildCanonicalUrl, siteConfig } from "../src/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: buildCanonicalUrl("/"),
    scope: buildCanonicalUrl("/"),
    display: "standalone",
    background_color: "#faf7f0",
    theme_color: siteConfig.themeColor,
    categories: ["finance", "productivity"],
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      }
    ]
  };
}
