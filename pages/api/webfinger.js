import Database from '../../lib/Database';

export default async function handler(req, res) {
  const db = new Database();

  const query = req.query;

  if (query.resource.startsWith('acct:') && query.resource.endsWith('@theclashfruit.me')) {
    const user = await db.getUserFromUsername(query.resource.split(':')[1].split('@')[0]);

    if (user === null) {
      res.status(404).send();

      return;
    }

    const finger = {
      subject: query.resource,
      aliases: [
        `https://theclashfruit.me/u/${user.username}`
      ],
      links: [
        {
          rel: 'http://webfinger.net/rel/profile-page',
          type: 'text/html',
          href: `https://theclashfruit.me/u/${user.username}`
        },
        {
          rel: 'self',
          type: 'application/activity+json',
          href: `https://theclashfruit.me/api/activitypub/${user.username}/actor`
        },
        {
          rel: 'http://webfinger.net/rel/avatar',
          type: 'image/png',
          href: user.profile_picture
        }
      ]
    };

    res.status(200).json(finger);
  } else {
    res.status(404).send();
  }
}