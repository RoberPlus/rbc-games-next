import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rbc-gaming.s3.us-east-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
