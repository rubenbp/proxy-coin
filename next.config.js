/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/proxy/:path*",
        destination: "https://api.coingecko.com/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
