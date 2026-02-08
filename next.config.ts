import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "itdorservices.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
