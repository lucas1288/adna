import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Commented out output: "export" for Sanity Studio compatibility
  // Vercel supports dynamic routes and optimized images
  // output: "export",
  // images: {
  //   unoptimized: true,
  // },
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default nextConfig;
