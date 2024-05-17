import Database from '../../../../lib/Database';

import showdown from 'showdown';

import '@/lib/MarkdownExtensions';

export default async function handler(req, res) {
  const db = new Database();

  const query = req.query;

  const user = await db.getUserFromUsername(query.username);

  if (user === null) {
    res.status(404).send();

    return;
  }

  const totalPosts = await db.getPostCount();
  const posts      = await db.getPosts(0, totalPosts);

  const converter = new showdown.Converter({
    extensions: [
      'timestamp'
    ]
  });

  converter.setFlavor('github');

  posts.forEach(post => {
    post.content = converter.makeHtml(post.content);
  });

  res.status(200).json({
    '@context': 'https://www.w3.org/ns/activitystreams',
    id: `https://theclashfruit.me/api/activitypub/${user.username}/outbox`,
    type: 'OrderedCollection',
    summary: 'TheClashFruit\'s Posts',
    totalItems: totalPosts,
    orderedItems: posts.map(post => {
      return {
        '@context': 'https://www.w3.org/ns/activitystreams',
        id: `https://theclashfruit.me/api/activitypub/${user.username}/post/${post.id}`,
        type: 'Create',
        actor: `https://theclashfruit.me/api/activitypub/${user.username}/actor`,
        published: new Date(post.created).toISOString(),
        to: [
          'https://www.w3.org/ns/activitystreams#Public'
        ],
        cc: [],
        object: {
          id: `https://theclashfruit.me/api/activitypub/${user.username}/post/${post.id}`,
          type: 'Note',
          url: `https://theclashfruit.me/post/${post.permalink}`,
          attributedTo: `https://theclashfruit.me/api/activitypub/${user.username}/actor`,
          content: `<p>${post.content.replace(/<[^>]*>?/gm, '').split('', 255).join('').trim().split('\n').join('</p><p>')}...</p><p>Read more on: <a href="https://theclashfruit.me/post/${post.permalink}">theclashfruit.me/post/${post.permalink}</a>.</p>`,
          published: new Date(post.created).toISOString(),
          to: [
            'https://www.w3.org/ns/activitystreams#Public'
          ],
          cc: [],
          sensitive: false,
          attachment: [],
          tag: [],
          replies: {
            id: `https://theclashfruit.me/api/activitypub/${user.username}/post/${post.id}/replies`,
            type: 'Collection',
            totalItems: 0,
            first: {
              type: 'CollectionPage',
              next: `https://theclashfruit.me/api/activitypub/${user.username}/post/${post.id}/replies?page=true`,
              partOf: `https://theclashfruit.me/api/activitypub/${user.username}/post/${post.id}/replies`,
              items: []
            }
          }
        }
      };
    })
  });
}