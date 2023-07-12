/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://home.ambicam.com/ambicamapiv5.asmx/:path*',
      },
    ];
  },

  reactStrictMode: true,
  swcMinify: true,
  images: {
  unoptimized: true
  }

  
  };
  
  module.exports = nextConfig;