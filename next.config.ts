import type { NextConfig } from "next";

// Built as a static site for GitHub Pages: every category and recipe page is
// pre-rendered from the Forkify API at build time. Set BASE_PATH to the repo
// path when deploying (e.g. /nextjs-recipe-store); leave it empty locally.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // No image server on a static host; Forkify already serves sized images.
    unoptimized: true,
  },
};

export default nextConfig;
