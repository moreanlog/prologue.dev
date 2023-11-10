const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true /** Missing source maps for large first-party JavaScript */,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  swcMinify: true,
};

module.exports = withContentlayer(nextConfig);
