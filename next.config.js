/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fra1.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "gvre-images.fra1.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "prod-gvre-new-bucket.fra1.digitaloceanspaces.com",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;
