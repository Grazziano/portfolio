import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/Grazziano/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/portfolio-dca50.appspot.com/**',
      },
      {
        protocol: 'https',
        hostname: 'bytebucket.org',
        port: '',
        pathname: '/grazziano/**', // Permite imagens deste usuário específico
      },
    ],
  },
};

export default nextConfig;
