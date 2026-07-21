import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  reactStrictMode: true,
  // Cloudflare does not support node: prefix
  serverExternalPackages: [],
};

if (process.env.NODE_ENV === 'development') {
  (async () => {
    await setupDevPlatform();
  })();
}

export default nextConfig;
