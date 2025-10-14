/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "barrel_optimize": false,
    };
    return config;
  },
};
export default nextConfig;