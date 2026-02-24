import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.memurjargonu.com" }],
        destination: "https://memurjargonu.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
