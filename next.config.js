const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'hu', 'fr', 'de'],
    defaultLocale: 'en'
  },
  sassOptions: {
    includePaths: [ path.join(__dirname, 'styles') ],
  },
  generateBuildId: async () => {
    const commitFetch = await fetch('https://git.theclashfruit.me/api/v1/repos/TheClashFruit/Website/commits?sha=main&limit=1')
    const commitData = await commitFetch.json()

    return commitData[0].sha
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
