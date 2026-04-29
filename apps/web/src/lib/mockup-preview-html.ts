import { readFileSync, readdirSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import vm from "node:vm";
import { compile } from "tailwindcss";
import { mockupPreviews, type MockupPreviewSlug } from "../content/mockup-previews";

const MOCKUP_DIR = join(process.cwd(), "src", "content", "mockups");
const TAILWIND_ENTRY = resolve(process.cwd(), "node_modules", "tailwindcss", "index.css");
const MATERIAL_SYMBOLS_FONT = join(MOCKUP_DIR, "material-symbols-outlined.woff2");
const MATERIAL_SYMBOLS_BASE64 = readFileSync(MATERIAL_SYMBOLS_FONT).toString("base64");

function buildManropeFontFaces(): string {
  try {
    const mediaDir = join(process.cwd(), ".next", "static", "media");
    const files = readdirSync(mediaDir).filter((f) => f.endsWith(".woff2"));
    if (files.length === 0) return "";
    return files
      .map(
        (f) =>
          `@font-face { font-family: "Manrope"; font-style: normal; font-weight: 200 800; font-display: block; src: url("/_next/static/media/${f}") format("woff2"); }`
      )
      .join("\n");
  } catch {
    return `@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap");`;
  }
}

const MANROPE_FONT_CSS = buildManropeFontFaces();
const PREVIEW_CANVAS_WIDTH = 393;
const PREVIEW_CANVAS_HEIGHT = 852;
const STABLE_VIEWPORT = "width=393, initial-scale=1, maximum-scale=1, viewport-fit=cover";
const isDevelopment = process.env.NODE_ENV !== "production";

const previewHtmlCache = new Map<MockupPreviewSlug, Promise<string>>();
export type PreviewCrop = "events" | "eventDetails" | "storiesSignature";

type TailwindConfig = Record<string, unknown>;

const materialSymbolCodepoints: Record<string, string> = {
  account_balance_wallet: "e850",
  add: "e145",
  add_circle: "e3ba",
  analytics: "ef3e",
  arrow_back: "e5c4",
  arrow_forward: "e5c8",
  bolt: "ea0b",
  calendar_today: "e935",
  call_split: "e0b6",
  celebration: "ea65",
  check: "e5ca",
  check_circle: "f0be",
  chevron_left: "e5cb",
  chevron_right: "e5cc",
  close: "e5cd",
  double_arrow: "ea50",
  download: "f090",
  edit: "f097",
  edit_note: "e745",
  expand_less: "e5ce",
  expand_more: "e5cf",
  favorite: "e87e",
  grid_view: "e9b0",
  group: "ea21",
  home_app_logo: "e295",
  insights: "f092",
  ios_share: "e6b8",
  keyboard_arrow_down: "e313",
  keyboard_arrow_up: "e316",
  keyboard_double_arrow_right: "eac9",
  layers: "e53b",
  more_horiz: "e5d3",
  my_location: "e55c",
  open_in_full: "f1ce",
  payments: "ef63",
  person: "f0d3",
  photo_camera: "e412",
  receipt_long: "ef6e",
  search: "e8b6",
  settings: "e8b8",
  share: "e80d",
  timeline: "e922",
  trending_up: "e8e5",
  tune: "e429",
};

function extractTailwindConfig(source: string): TailwindConfig {
  const match = source.match(/<script id="tailwind-config">([\s\S]*?)<\/script>/i);

  if (!match) {
    return {};
  }

  const context = { tailwind: {} as { config?: TailwindConfig } };
  vm.runInNewContext(match[1] ?? "", context, { timeout: 100 });

  return context.tailwind.config ?? {};
}

function normalizeTailwindConfig(config: TailwindConfig): TailwindConfig {
  const clone = structuredClone(config);
  const theme = (clone.theme ?? {}) as Record<string, unknown>;
  const extend = (theme.extend ?? {}) as Record<string, unknown>;
  const fontFamily = (extend.fontFamily ?? {}) as Record<string, unknown>;
  const stableSans = [
    "Manrope",
    '"Segoe UI Variable Display"',
    '"SF Pro Display"',
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
  ];
  const stableMono = [
    '"JetBrains Mono"',
    '"SFMono-Regular"',
    "Menlo",
    "Monaco",
    "Consolas",
    '"Liberation Mono"',
    '"Courier New"',
    "monospace",
  ];

  for (const [key, value] of Object.entries(fontFamily)) {
    if (!Array.isArray(value)) {
      continue;
    }

    fontFamily[key] = value.includes("JetBrains Mono") ? stableMono : stableSans;
  }

  extend.fontFamily = fontFamily;
  theme.extend = extend;
  clone.theme = theme;

  return clone;
}

function extractTailwindCandidates(source: string) {
  const candidates = new Set<string>();
  const classPattern = /class(?:Name)?\s*=\s*(?:"([^"]+)"|'([^']+)')/g;

  for (const match of source.matchAll(classPattern)) {
    const classValue = match[1] ?? match[2] ?? "";

    for (const candidate of classValue.split(/\s+/)) {
      if (candidate.trim()) {
        candidates.add(candidate.trim());
      }
    }
  }

  return Array.from(candidates);
}

function stripRuntimeDependencies(source: string) {
  return source
    .replace(/<script src="https:\/\/cdn\.tailwindcss\.com[^"]*"><\/script>\s*/gi, "")
    .replace(/<script id="tailwind-config">[\s\S]*?<\/script>\s*/gi, "")
    .replace(
      /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Material\+Symbols\+Outlined[^"]*" rel="stylesheet"\/>\s*/gi,
      "",
    );
}

function stabilizeViewport(source: string) {
  if (/<meta[^>]+name=["']viewport["']/i.test(source)) {
    return source.replace(
      /<meta([^>]+name=["']viewport["'][^>]+content=["'])[^"']*(["'][^>]*?)>/i,
      `<meta$1${STABLE_VIEWPORT}$2>`,
    );
  }

  return source.replace("</head>", `<meta content="${STABLE_VIEWPORT}" name="viewport"/></head>`);
}

function replaceMaterialSymbolLigatures(source: string) {
  return source.replace(
    /(<span\b[^>]*class="[^"]*material-symbols-outlined[^"]*"[^>]*>)([^<]+)(<\/span>)/gi,
    (_match, openTag: string, iconNameRaw: string, closeTag: string) => {
      const iconName = iconNameRaw.trim();
      const codepoint = materialSymbolCodepoints[iconName];

      if (!codepoint) {
        return `${openTag}${iconNameRaw}${closeTag}`;
      }

      return `${openTag}&#x${codepoint};${closeTag}`;
    },
  );
}

async function compileTailwindCss(source: string) {
  const candidates = extractTailwindCandidates(source);
  const compiler = await compile('@config "./mockup-preview.config.js"; @import "tailwindcss";', {
    base: MOCKUP_DIR,
    loadModule: async (id, base) => {
      const config = normalizeTailwindConfig(extractTailwindConfig(source));
      const path = resolve(base, id);

      return {
        path,
        base: dirname(path),
        module: config,
      };
    },
    loadStylesheet: async (id, base) => {
      if (id === "tailwindcss") {
        return {
          path: TAILWIND_ENTRY,
          base: dirname(TAILWIND_ENTRY),
          content: await readFile(TAILWIND_ENTRY, "utf8"),
        };
      }

      const path = resolve(base, id);
      return {
        path,
        base: dirname(path),
        content: await readFile(path, "utf8"),
      };
    },
  });

  return compiler.build(candidates);
}

function buildSharedStyle(slug: MockupPreviewSlug, crop?: PreviewCrop) {
  const preview = mockupPreviews[slug];
  const normalizeTypography = slug !== "overview-screen";
  const previewRootBackground = preview.mode === "page" ? "transparent" : preview.background;
  const cropOffsetY = crop === "events" ? -815 : crop === "eventDetails" ? -180 : 0;
  const cropStyle =
    cropOffsetY !== 0
      ? `
        body > :not(script):not(style) {
          transform: translateY(${cropOffsetY}px) !important;
        }
      `
      : "";
  const viewportStyle =
    preview.mode === "viewport"
      ? `
        .mobile-viewport,
        .mobile-container {
          width: 100% !important;
          max-width: none !important;
          min-height: 100vh !important;
          margin: 0 !important;
          box-shadow: none !important;
        }
      `
      : "";
  const fixedNavStyle = preview.hideFixedNav
    ? `
        nav.fixed,
        .fixed.left-0.w-full.z-50 {
          display: none !important;
        }
      `
    : "";
  const previewVariantStyle =
    slug === "accounts-trust"
      ? `
        .preview-scale-root .mobile-container > main {
          padding-top: 2rem !important;
        }

        .preview-scale-root .mobile-container > main > div.absolute {
          display: none !important;
        }
      `
      : slug === "transactions-categorized" ||
          slug === "review-transaction-trust" ||
          slug === "add-transaction-trust"
        ? `
        .preview-scale-root {
          font-size: 0.92rem !important;
        }
      `
        : "";
  const storySignatureStyle =
    crop === "storiesSignature"
      ? `
        .preview-scale-root > header,
        .preview-scale-root > footer,
        .preview-scale-root > footer * {
          display: none !important;
        }

        .preview-scale-root > main {
          min-height: 100% !important;
          height: 100% !important;
          padding-top: 1.25rem !important;
          padding-left: 1rem !important;
          padding-right: 1rem !important;
          padding-bottom: 1.2rem !important;
          align-items: stretch !important;
        }

        .preview-scale-root > main > .absolute.left-3.top-64.bottom-60 {
          top: 5.8rem !important;
          bottom: 1.4rem !important;
        }

        .preview-scale-root h1.text-\\[72px\\] {
          font-size: 3.6rem !important;
          line-height: 0.92 !important;
        }

        .preview-scale-root p.text-white\\/90.text-\\[18px\\] {
          max-width: 16rem !important;
          font-size: 0.92rem !important;
          line-height: 1.42 !important;
        }

        .preview-scale-root .glass-ios {
          width: min(100%, 19.5rem) !important;
          max-width: none !important;
          padding: 1.25rem !important;
          margin-bottom: 1rem !important;
        }
      `
      : "";
  const typographyNormalizationStyle = normalizeTypography
    ? `
    .preview-scale-root .tabular-nums,
    .preview-scale-root .showcase-soft-number,
    .preview-scale-root .showcase-soft-total,
    .preview-scale-root .glass-popup .text-sm.font-black,
    .preview-scale-root .transaction-card p.text-\\[13px\\].font-black,
    .preview-scale-root .inbox-item .text-\\[13px\\].font-black,
    .preview-scale-root .category-item .text-\\[12px\\].font-black {
      font-weight: 800 !important;
      letter-spacing: -0.03em !important;
      font-variant-numeric: tabular-nums lining-nums !important;
      font-feature-settings: "tnum" 1, "lnum" 1 !important;
    }
    .preview-scale-root .glass-popup .text-sm.font-black,
    .preview-scale-root .transaction-card p.text-\\[13px\\].font-black,
    .preview-scale-root .inbox-item .text-\\[13px\\].font-black,
    .preview-scale-root .category-item .text-\\[12px\\].font-black {
      letter-spacing: -0.025em !important;
    }
    .preview-scale-root [class*="tracking-widest"] {
      letter-spacing: 0.07em !important;
    }
    .preview-scale-root [class*="tracking-wider"] {
      letter-spacing: 0.035em !important;
    }
    .preview-scale-root [class*="tracking-wide"] {
      letter-spacing: 0.02em !important;
    }
    `
    : "";
  const topNavConsistencyStyle = `
    .preview-scale-root .immersive-dark-top > header > div.glass-island-dark:not(.w-10):not(.h-10) {
      min-width: 0 !important;
      flex: 0 0 auto !important;
      width: fit-content !important;
      max-width: none !important;
      padding: 0.42rem 0.96rem !important;
      border-color: rgba(255, 255, 255, 0.12) !important;
      border-radius: 9999px !important;
    }
    .preview-scale-root .immersive-dark-top > header > div.glass-island-dark:not(.w-10):not(.h-10) h1 {
      margin: 0 !important;
      font-size: 0.66rem !important;
      line-height: 1 !important;
      letter-spacing: 0.22em !important;
      text-transform: uppercase !important;
      white-space: nowrap !important;
    }
  `;

  return `
    ${MANROPE_FONT_CSS}

    @font-face {
      font-family: "Material Symbols Outlined";
      font-style: normal;
      font-weight: 400;
      font-display: block;
      src: url("data:font/woff2;base64,${MATERIAL_SYMBOLS_BASE64}") format("woff2");
    }
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      min-height: 100% !important;
      width: 100% !important;
      overflow-x: hidden !important;
      background: ${previewRootBackground} !important;
    }
    body {
      min-height: 100vh !important;
      isolation: isolate;
    }
    html[data-preview-scale="managed"],
    html[data-preview-scale="managed"] body {
      width: 100% !important;
      height: 100% !important;
      min-width: 100% !important;
      min-height: 100% !important;
      overflow: hidden !important;
    }
    html[data-preview-scale="managed"] body {
      position: relative !important;
      margin: 0 !important;
      background: ${previewRootBackground} !important;
    }
    .preview-scale-root {
      --mockup-font-sans: "Manrope", "Segoe UI Variable Display", "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
      position: absolute !important;
      left: 0 !important;
      top: 0 !important;
      width: ${PREVIEW_CANVAS_WIDTH}px !important;
      min-width: ${PREVIEW_CANVAS_WIDTH}px !important;
      max-width: ${PREVIEW_CANVAS_WIDTH}px !important;
      height: ${PREVIEW_CANVAS_HEIGHT}px !important;
      min-height: ${PREVIEW_CANVAS_HEIGHT}px !important;
      max-height: ${PREVIEW_CANVAS_HEIGHT}px !important;
      overflow: hidden !important;
      background: ${preview.background} !important;
      transform-origin: top left !important;
      will-change: transform !important;
      backface-visibility: hidden !important;
      font-family: var(--mockup-font-sans) !important;
      font-synthesis: none !important;
      font-kerning: normal !important;
      -webkit-font-smoothing: antialiased !important;
      text-rendering: optimizeLegibility !important;
    }
    * {
      box-sizing: border-box;
    }
    .preview-scale-root,
    .preview-scale-root *:not(.material-symbols-outlined):not(.material-symbol-icon) {
      font-family: var(--mockup-font-sans) !important;
    }
    ${typographyNormalizationStyle}
    ${topNavConsistencyStyle}
    .material-symbols-outlined {
      font-family: "Material Symbols Outlined" !important;
      font-weight: normal !important;
      font-style: normal !important;
      line-height: 1 !important;
      letter-spacing: normal !important;
      text-transform: none !important;
      display: inline-block !important;
      white-space: nowrap !important;
      word-wrap: normal !important;
      direction: ltr !important;
      -webkit-font-feature-settings: "liga";
      font-feature-settings: "liga";
      -webkit-font-smoothing: antialiased;
    }
    .material-symbol-icon {
      display: inline-block !important;
      width: 1em !important;
      height: 1em !important;
      vertical-align: middle !important;
      flex-shrink: 0 !important;
    }
    ${viewportStyle}
    ${fixedNavStyle}
    ${previewVariantStyle}
    ${storySignatureStyle}
    ${cropStyle}
  `;
}

function buildScalingScriptForCrop(slug: MockupPreviewSlug, crop?: PreviewCrop) {
  const mode = crop === "storiesSignature" ? "cover-top" : "fit";
  const normalizeLetterSpacing = slug !== "overview-screen";

  return `
    <script>
      (() => {
        const canvasWidth = ${PREVIEW_CANVAS_WIDTH};
        const canvasHeight = ${PREVIEW_CANVAS_HEIGHT};
        const mode = "${mode}";
        const shouldNormalizeLetterSpacing = ${normalizeLetterSpacing};
        const normalizeLetterSpacing = () => {
          const root = document.querySelector(".preview-scale-root");

          if (!root) {
            return;
          }

          const namedWideSelectors = [
            '[class*="tracking-widest"]',
            '[class*="tracking-wider"]',
            '[class*="tracking-wide"]'
          ];
          const arbitraryTrackingSelector = '[class*="tracking-["]';

          root.querySelectorAll(namedWideSelectors.join(",")).forEach((node) => {
            if (!(node instanceof HTMLElement)) {
              return;
            }

            if (node.className.includes("tracking-widest")) {
              node.style.setProperty("letter-spacing", "0.07em", "important");
              return;
            }

            if (node.className.includes("tracking-wider")) {
              node.style.setProperty("letter-spacing", "0.035em", "important");
              return;
            }

            if (node.className.includes("tracking-wide")) {
              node.style.setProperty("letter-spacing", "0.02em", "important");
            }
          });

          root.querySelectorAll(arbitraryTrackingSelector).forEach((node) => {
            if (node instanceof HTMLElement) {
              const trackingClass = node.className
                .split(" ")
                .find((token) => token.startsWith("tracking-[") && token.endsWith("]"));

              if (!trackingClass) {
                return;
              }

              const numericPortion = trackingClass.slice("tracking-[".length, -"]".length);

              if (!numericPortion.endsWith("em")) {
                return;
              }

              const value = Number.parseFloat(numericPortion.slice(0, -"em".length));

              if (Number.isFinite(value) && value > 0.08) {
                const softened = Math.max(0.02, Math.round(value * 0.7 * 1000) / 1000);
                node.style.setProperty("letter-spacing", softened + "em", "important");
              }
            }
          });
        };

        const ensureRoot = () => {
          const existing = document.querySelector(".preview-scale-root");

          if (existing) {
            return existing;
          }

          const root = document.createElement("div");
          root.className = "preview-scale-root";

          while (document.body.firstChild) {
            root.appendChild(document.body.firstChild);
          }

          document.body.appendChild(root);
          return root;
        };

        const applyScale = () => {
          const widthScale = window.innerWidth / canvasWidth;
          const heightScale = window.innerHeight / canvasHeight;
          const nextScale = mode === "cover-top" ? Math.max(widthScale, heightScale) : Math.min(widthScale, heightScale);
          const overscanScale = nextScale;
          const root = ensureRoot();
          const offsetX =
            mode === "cover-top"
              ? (window.innerWidth - canvasWidth * overscanScale) / 2
              : Math.max((window.innerWidth - canvasWidth * overscanScale) / 2, 0);
          const offsetY =
            mode === "cover-top"
              ? Math.min((window.innerHeight - canvasHeight * overscanScale) * 0.22, 0)
              : Math.max((window.innerHeight - canvasHeight * overscanScale) / 2, 0);

          document.documentElement.dataset.previewScale = "managed";
          document.body.style.width = "100%";
          document.body.style.height = "100%";
          root.style.zoom = "";
          root.style.transform = "translate(" + offsetX + "px, " + offsetY + "px) scale(" + overscanScale + ")";
          if (shouldNormalizeLetterSpacing) {
            normalizeLetterSpacing();
          }
        };

        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", applyScale, { once: true });
        } else {
          applyScale();
        }

        window.addEventListener("resize", applyScale, { passive: true });
      })();
    </script>
  `;
}

async function buildPreviewHtmlInternal(slug: MockupPreviewSlug, crop?: PreviewCrop) {
  const source = readFileSync(join(MOCKUP_DIR, mockupPreviews[slug].file), "utf8");
  const tailwindCss = await compileTailwindCss(source);
  const sharedStyle = buildSharedStyle(slug, crop);
  const previewSource = replaceMaterialSymbolLigatures(
    stabilizeViewport(stripRuntimeDependencies(source)),
  );
  const scalingScript = buildScalingScriptForCrop(slug, crop);

  return previewSource
    .replace("</head>", `<style>${tailwindCss}\n${sharedStyle}</style></head>`)
    .replace("</body>", `${scalingScript}</body>`);
}

export function getMockupPreviewHtml(slug: MockupPreviewSlug, crop?: PreviewCrop) {
  if (isDevelopment) {
    return buildPreviewHtmlInternal(slug, crop);
  }

  if (slug === "overview-screen") {
    return buildPreviewHtmlInternal(slug, crop);
  }

  if (crop) {
    return buildPreviewHtmlInternal(slug, crop);
  }

  const cached = previewHtmlCache.get(slug);

  if (cached) {
    return cached;
  }

  const previewPromise = buildPreviewHtmlInternal(slug).catch((error) => {
    previewHtmlCache.delete(slug);
    throw error;
  });
  previewHtmlCache.set(slug, previewPromise);

  return previewPromise;
}
