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
        hostname: supabaseHostname, // <-- Injected dynamically here
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
