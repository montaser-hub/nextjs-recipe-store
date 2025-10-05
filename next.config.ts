import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "forkify-api.herokuapp.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
