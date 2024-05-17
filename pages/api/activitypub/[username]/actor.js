import Database from '../../../../lib/Database';

export default async function handler(req, res) {
  const db = new Database();

  const query = req.query;

  const user = await db.getUserFromUsername(query.username);

  if (user === null) {
    res.status(404).send();

    return;
  }

  const actor = {
    '@context': [
      'https://www.w3.org/ns/activitystreams',
      'https://w3id.org/security/v1'
    ],
    id: `https://theclashfruit.me/api/activitypub/${query.username}/actor`,
    type: 'Person',
    preferredUsername: user.display_name,
    inbox: `https://theclashfruit.me/api/activitypub/${query.username}/inbox`,
    publicKey: {
      id: `https://theclashfruit.me/api/activitypub/${query.username}/actor#main-key`,
      owner: `https://theclashfruit.me/api/activitypub/${query.username}/actor`,
      publicKeyPem: user.public_key
    }
  };

  res.status(200).json(actor);
}