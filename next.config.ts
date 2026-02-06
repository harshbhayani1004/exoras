import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-2a5d8e5eaff3498da143b1150b20a7c1.r2.dev",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
