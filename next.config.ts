import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // This line disables ESLint errors during builds (e.g., on Vercel)
    ignoreDuringBuilds: true,
  },
  // ...you can keep any other configs here
};

export default nextConfig;
