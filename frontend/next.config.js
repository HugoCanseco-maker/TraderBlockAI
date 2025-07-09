/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:10000'
  },
  images: {
    domains: [], // Add backend image domains if needed
  },
}

module.exports = nextConfig;
