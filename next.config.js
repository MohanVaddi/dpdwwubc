/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        backend: 'http://localhost:4000',
        prod_backend: 'https://arbeit-web-server.herokuapp.com',
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
