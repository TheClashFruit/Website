const path = require('path');
const childProcess = require('child_process');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [ path.join(__dirname, 'styles') ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-new.theclashfruit.me',
        port: '',
        pathname: '/**',
      },
    ],
  },
  generateBuildId: async () => {
    return childProcess.execSync('git rev-parse HEAD').toString().trim();
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
