/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    transpilePackages: ["tic-tac-shared"],
};

module.exports = nextConfig;
