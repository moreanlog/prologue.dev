const { withContentlayer } = require("next-contentlayer2");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true /** Missing source maps for large first-party JavaScript */,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = withContentlayer(nextConfig);
