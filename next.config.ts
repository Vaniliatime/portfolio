import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Do not build while the dev server is running. A build breaks it either
  // way: pointing distDir elsewhere through NEXT_DIST_DIR was tried and the
  // dev server still fell over, so the separation is not worth relying on.
  // Use `npm run typecheck` for day to day checking, and build when you are
  // actually shipping.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Pin the workspace root — a stray lockfile in the home directory otherwise
  // makes Next infer the wrong one.
  outputFileTracingRoot: path.resolve(__dirname),
  // SEOHOST serves plain files — everything has to be pre-rendered.
  output: "export",
  // Static hosting resolves /work/ to /work/index.html, so emit directories.
  trailingSlash: true,
  images: {
    // No Next image server in an export build.
    unoptimized: true,
  },
};

export default nextConfig;
