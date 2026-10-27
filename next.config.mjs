/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.CF_STATIC_EXPORT === '1' ? { images: { unoptimized: true } } : {}),
  // Only the Cloudflare backup build uses static export.
  ...(process.env.CF_STATIC_EXPORT === '1' ? { output: 'export' } : {}),
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};
export default nextConfig;
