/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
        {
            source: "/stat/:region",
            destination: "https://:region.google-analytics.com/g/collect",
        },
    ]
  },
}

module.exports = nextConfig
