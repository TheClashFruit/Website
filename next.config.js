const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [ path.join(__dirname, 'styles') ]
  },
  generateBuildId: async () => {
    const commitFetch = await fetch('https://git.theclashfruit.me/api/v1/repos/TheClashFruit/Website/commits?sha=main&limit=1')
    const commitData = await commitFetch.json()

    return commitData[0].sha
  },
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          }
        ]
      }
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [ '@svgr/webpack' ]
    });

    return config;
  }
};

module.exports = nextConfig;
