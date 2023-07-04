/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    instrumentationHook: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
