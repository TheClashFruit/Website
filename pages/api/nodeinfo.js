import Database from '../../lib/Database';

export default async function handler(req, res) {
  const db = new Database();

  res.status(200).json({
    version: '2.0.0',
    software: {
      name: 'tcf',
      version: '2.0.0',
      repository: 'https://git.theclashfruit.me/TheClashFruit/Website.git',
      homepage: 'https://theclashfruit.me/'
    },
    protocols: [
      'activitypub'
    ],
    services: {
      inbound: [],
      outbound: [
        'rss2.0'
      ]
    },
    openRegistrations: false,
    usage: {
      users: {
        total: 1,
        activeHalfyear: 1,
        activeMonth: 1
      },
      localPosts: await db.getPostCount(),
      localComments: 0
    },
    metadata: {}
  });
}