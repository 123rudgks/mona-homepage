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
        destination: `${process.env.SERVER_URL}/v1/:path*`,
      },
      {
        source: '/server/:path*',
        destination: `https://:path*`,
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
