import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  webpack: (config, { isServer, dev }) => {
    config.module.rules.push({
      test: /demo_raw\/.+$/,
      use: "raw-loader",
    });

    if (!isServer && !dev) {
      config.optimization.splitChunks = false;
      config.output.chunkFilename = (pathData: {
        chunk?: { name?: string };
      }) => {
        return isServer
          ? "[name].js"
          : `static/chunks/${
              ["worker", "threadWorker", "serviceWorker"].includes(
                pathData.chunk?.name || "",
              )
                ? "[name]"
                : "[name].[contenthash]"
            }.js`;
      };
    }

    return config;
  },
};

export default nextConfig;
