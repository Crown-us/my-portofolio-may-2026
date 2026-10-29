import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/id", permanent: true },
      ...[
        "about",
        "resume",
        "services",
        "contact",
        "projects",
        "blog",
        "store",
        "works",
      ].map((route) => ({
        source: `/${route}/:path*`,
        destination: `/id/${route}/:path*`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
