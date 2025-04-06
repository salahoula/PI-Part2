import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ne bloque pas la build à cause des erreurs ESLint
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*", 
        destination: "http://localhost:3000/api/:path*", 
      },
    ];
  },
};

export default nextConfig;
