import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The root layout lives in app/[locale]/layout.tsx, so unmatched paths have
  // no layout to inherit. This renders app/global-not-found.tsx instead of the
  // unbranded default 404.
  experimental: { globalNotFound: true },
  async redirects() {
    return [
      { source: "/en/blog/:slug", destination: "/id/blog/:slug", permanent: true },
      { source: "/", destination: "/id", permanent: true },
      ...[
        "about",
        "resume",
        "services",
        "contact",
        "projects",
        "blog",
        "store",
      ].flatMap((route) => [
        { source: `/${route}`, destination: `/id/${route}`, permanent: true },
        {
          source: `/${route}/:path*`,
          destination: `/id/${route}/:path*`,
          permanent: true,
        },
      ]),
      // /works was the old project detail path. Send it straight to the case
      // study so an old link resolves in one hop instead of two.
      { source: "/works", destination: "/id/projects", permanent: true },
      {
        source: "/works/:slug",
        destination: "/id/projects/:slug",
        permanent: true,
      },
      {
        source: "/:locale(id|en)/works",
        destination: "/:locale/projects",
        permanent: true,
      },
      {
        source: "/:locale(id|en)/works/:slug",
        destination: "/:locale/projects/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
