import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "robertsspaceindustries.com" },
      { protocol: "https", hostname: "media.robertsspaceindustries.com" },
      { protocol: "https", hostname: "*.redd.it" },
      { protocol: "https", hostname: "preview.redd.it" },
      { protocol: "https", hostname: "external-preview.redd.it" },
      { protocol: "https", hostname: "i.redd.it" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "cdn.star-citizen.wiki" },
      { protocol: "https", hostname: "media.star-citizen.wiki" },
    ],
  },
  serverExternalPackages: ["rss-parser"],
};

export default nextConfig;
