/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'monalec-dev.s3.ap-northeast-2.amazonaws.com'],
  },
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/v1/:path*',
      },
    ];
  },
  webpack: (config) => {
    config.cache = false;
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
