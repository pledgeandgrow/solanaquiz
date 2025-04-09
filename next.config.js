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
    };
    return config;
  },
};

module.exports = nextConfig;
