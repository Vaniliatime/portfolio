import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // NOTE: `next build` and `next dev` share .next, so building while the dev
  // server is running deletes the manifests it is serving from and every route
  // starts returning 500. Stop the dev server before building.
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
