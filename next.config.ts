import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.tailwindcss.com', // Just in case, though we shouldn't use CDN
      }
    ],
  },
};

export default nextConfig;
