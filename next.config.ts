import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ysrdptrgpxpdohzgcniy.supabase.co",
      },
      {
        protocol: "https",
        hostname: "ysrdptrgpxpdohzgcniy.storage.supabase.co",
      },
    ],
    unoptimized: true, // Temporarily disable optimization to bypass private IP check
  },
};

export default nextConfig;
