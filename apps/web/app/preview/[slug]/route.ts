import { mockupPreviews, type MockupPreviewSlug } from "../../../src/content/mockup-previews";
import { getMockupPreviewHtml } from "../../../src/lib/mockup-preview-html";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!(slug in mockupPreviews)) {
    return new Response("Not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow, noarchive"
      }
    });
  }

  return new Response(await getMockupPreviewHtml(slug as MockupPreviewSlug), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow, noarchive"
    }
  });
}
