import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Cloudflare Pages hosts the generated documentation as static assets.
  output: 'export',
  distDir: 'dist',
  trailingSlash: true,
};

const withMDX = createMDX();

export default withMDX(config);
