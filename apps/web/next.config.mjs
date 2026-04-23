import nextConfigHelpers from "./src/lib/next-config-helpers.cjs";

const { buildSecurityHeaders } = nextConfigHelpers;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  poweredByHeader: false,
  trailingSlash: false,
  async headers() {
    const defaultHeaders = buildSecurityHeaders({
      nodeEnv: process.env.NODE_ENV,
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL
    });
    const embeddedPreviewHeaders = buildSecurityHeaders({
      nodeEnv: process.env.NODE_ENV,
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
      allowEmbeddedPreview: true
    });

    return [
      {
        source: "/((?!preview/).*)",
        headers: defaultHeaders
      },
      {
        source: "/preview/:path*",
        headers: embeddedPreviewHeaders
      }
    ];
  }
};

export default nextConfig;
