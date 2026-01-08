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
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /demo_raw\/.+$/,
      use: "raw-loader",
    });

    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: false,
      };

      config.output.filename = (pathData: { chunk?: { name?: string } }) => {
        const chunkName = pathData.chunk?.name || "";
        if (
          chunkName === "worker" ||
          chunkName === "threadWorker" ||
          chunkName === "serviceWorker"
        ) {
          return "static/chunks/[name].js";
        }
        return "static/chunks/[name]-[contenthash].js";
      };
    }

    return config;
  },
};

export default nextConfig;
