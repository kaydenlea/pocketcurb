import { mockupPreviews, type MockupPreviewSlug } from "../../../src/content/mockup-previews";
import { getMockupPreviewHtml, type PreviewCrop } from "../../../src/lib/mockup-preview-html";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const cropParam = new URL(request.url).searchParams.get("crop");
  const crop = cropParam === "events" || cropParam === "eventDetails" ? cropParam : undefined;

  if (!(slug in mockupPreviews)) {
    return new Response("Not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow, noarchive"
      }
    });
  }

  return new Response(await getMockupPreviewHtml(slug as MockupPreviewSlug, crop as PreviewCrop | undefined), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
      "X-Robots-Tag": "noindex, nofollow, noarchive"
    }
  });
}
