import type { NextConfig } from "next";

const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : '';

const nextConfig: NextConfig = {
  serverExternalPackages: [
    'draco3d',
    'sharp',
    '@gltf-transform/core',
    '@gltf-transform/functions',
    '@gltf-transform/extensions',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: supabaseHostname, 
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
