/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/account",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
