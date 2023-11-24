/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    transpilePackages: ["tic-tac-shared"],
    transpilePackages: ["@piwikpro/next-piwik-pro"],
};

module.exports = nextConfig;
