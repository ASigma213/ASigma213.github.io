/** @type {import('next').NextConfig} */
const basePath = process.env.GITHUB_PAGES_BASE_PATH || '';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  output: 'export',
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: { unoptimized: true },
};

module.exports = nextConfig;
