/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/help",
        destination:
          "https://typemagic-ai.notion.site/Typemagic-help-2cdd6b97542b4c3aa6018f9b68582905",
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
  webpack: function (config, options) {
    // https://github.com/transitive-bullshit/chatgpt-api/issues/480#issuecomment-1475325283
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    // Add raw-loader for handling .md files
    config.module.rules.push({
      test: /\.md$/,
      include: path.resolve(__dirname, "./src"),
      exclude: /node_modules/,
      use: "raw-loader",
    });

    // turn off static file serving of WASM files
    // we need to let Webpack handle WASM import
    // config.module.rules
    //   .find((i) => "oneOf" in i)
    //   .oneOf.find((i) => i.type === "asset/resource")
    //   .exclude.push(/\.wasm$/);

    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
