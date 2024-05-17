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
    name: user.username,
    inbox: `https://theclashfruit.me/api/activitypub/${query.username}/inbox`,
    outbox: `https://theclashfruit.me/api/activitypub/${query.username}/outbox`,
    following: `https://theclashfruit.me/api/activitypub/${query.username}/following`,
    followers: `https://theclashfruit.me/api/activitypub/${query.username}/followers`,
    published: '2023-07-21T11:48:35Z',
    discoverable: true,
    indexable: true,
    memorial: false,
    publicKey: {
      id: `https://theclashfruit.me/api/activitypub/${query.username}/actor#main-key`,
      owner: `https://theclashfruit.me/api/activitypub/${query.username}/actor`,
      publicKeyPem: user.public_key
    },
    attachment: [
      {
        type: 'PropertyValue',
        name: 'Website',
        value: '<a href="https://theclashfruit.me" target="_blank" rel="nofollow noopener noreferrer me" translate="no"><span class="invisible">https://</span><span class="">theclashfruit.me</span><span class="invisible"></span></a>'
      },
      {
        type: 'PropertyValue',
        name: 'Main Mastodon Account',
        value: '<a href="https://wetdry.world@TheClashFruit" target="_blank" rel="nofollow noopener noreferrer me" translate="no"><span class="invisible">https://</span><span class="">wetdry.world/@TheClashFruit</span><span class="invisible"></span></a>'
      }
    ],
    icon: {
      type: 'Image',
      mediaType: 'image/png',
      url: user.profile_picture
    },
    image: {
      type: 'Image',
      mediaType: 'image/png',
      url: user.profile_picture
    }
  };

  res.status(200).json(actor);
}