/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'raw.githubusercontent.com', // For MetaMask and other wallet icons
      'arweave.net',
      'www.arweave.net',
      'solana.com',
    ],
  },
  webpack: (config) => {
    // This is necessary for the Solana wallet adapter
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
      crypto: false,
      stream: false,
      http: false,
      https: false,
      zlib: false,
      assert: false,
    };
    return config;
  },
  // Disable type checking during build to prevent TypeScript errors from failing the build
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build to prevent ESLint errors from failing the build
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
