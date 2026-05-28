import type { NextConfig } from "next";

const CSP = [
  "default-src 'self'",
  // Next.js requires unsafe-inline for its runtime scripts; use nonces for stricter setups
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  // Images come from several trusted CDNs
  "img-src 'self' data: https://robertsspaceindustries.com https://media.robertsspaceindustries.com https://*.redd.it https://i.ytimg.com https://cdn.star-citizen.wiki https://media.star-citizen.wiki",
  // YouTube + Twitch embeds
  "frame-src https://www.youtube.com https://player.twitch.tv",
  // Outbound fetches from the browser (SWR, etc.)
  "connect-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "robertsspaceindustries.com" },
      { protocol: "https", hostname: "media.robertsspaceindustries.com" },
      // Reddit uses multiple CDN subdomains; wildcard is intentional
      { protocol: "https", hostname: "*.redd.it" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "cdn.star-citizen.wiki" },
      { protocol: "https", hostname: "media.star-citizen.wiki" },
    ],
  },

  serverExternalPackages: ["rss-parser"],

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Only allow framing from same origin
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Don't send full referrer to third-party sites
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Disable browser features the app doesn't need
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // DNS prefetch opt-in
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // Content Security Policy
          { key: "Content-Security-Policy", value: CSP },
        ],
      },
    ];
  },
};

export default nextConfig;
