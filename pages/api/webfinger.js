import Database from '@/lib/Database';

export default async function handler(req, res) {
  const db = new Database();

  const query = req.query;

  const finger = {
    subject: 'acct:me@theclashfruit.me',
    links: [
      {
        rel: 'https://webfinger.net/rel/profile-page',
        type: 'text/html',
        href: 'https://theclashfruit.me'
      },
      {
        rel: 'https://packetizer.com/rel/blog',
        href: 'https://theclashfruit.me/blog'
      }
    ]
  };

  if (query.resource === 'acct:me@theclashfruit.me') {
    res.status(200).json(finger);
  } else {
    res.status(404).send();
  }
}