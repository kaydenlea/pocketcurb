import type { Metadata } from "next";
import { PrivacyPage } from "../../src/components/PrivacyPage";
import { StructuredData } from "../../src/components/StructuredData";
import { sitePages } from "../../src/lib/site-config";
import { createPageMetadata } from "../../src/lib/site-metadata";
import { buildPageSchemas } from "../../src/lib/site-schema";

export const metadata: Metadata = createPageMetadata(sitePages.privacy);

export default function PrivacyRoute() {
  return (
    <>
      <StructuredData data={buildPageSchemas(sitePages.privacy)} id="privacy-schema" />
      <PrivacyPage />
    </>
  );
}
