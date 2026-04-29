import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    'draco3d',
    'sharp',
    '@gltf-transform/core',
    '@gltf-transform/functions',
    '@gltf-transform/extensions',
  ],
};

export default nextConfig;
