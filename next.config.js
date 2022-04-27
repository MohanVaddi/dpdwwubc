/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        backend: 'http://localhost:4000',
    },
    reactStrictMode: true,
    // typescript: {
    //     // !! WARN !!
    //     // Dangerously allow production builds to successfully complete even if
    //     // your project has type errors.
    //     // !! WARN !!
    //     ignoreBuildErrors: true,
    // },
};

module.exports = nextConfig;
