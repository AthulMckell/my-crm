import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* confeslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
   
  }ig options here */
  ignoreDuringBuilds: true,
};

export default nextConfig;
