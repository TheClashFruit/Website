import RSS from 'rss';

import Database from '@/lib/Database';

import showdown from 'showdown';
import showdownHighlight from 'showdown-highlight';
import footnotes from 'showdown-footnotes';

import 'showdown-youtube';

export default function RssFeed() {
  // it's the server's job!
}

export async function getServerSideProps({ res }) {
  const db   = new Database();

  const posts = await db.getPosts();

  const feedOptions = {
    title: 'TheClashFruit\'s Blog',
    description: 'I\'m TheClashFruit and I like to program, explore and craft stuff. I also like to play games. I have 3 Linux servers.. So, as you can see, I like to play around with Linux too.',
    site_url: 'https://theclashfruit.me',
    feed_url: 'https://theclashfruit.me/rss.xml',
    image_url: 'https://theclashfruit.me/icons/logo.svg',
    pubDate: posts[0].created,
    copyright: `Copyright © ${new Date().getFullYear()} TheClashFruit`,
  };

  const feed = new RSS(feedOptions);

  const converter = new showdown.Converter({
    extensions: [
      showdownHighlight({
        pre: true,
        auto_detection: true
      }),
      'youtube',
      footnotes
    ]
  });

  converter.setFlavor('github');

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const html = converter.makeHtml(post.content);

    await fetch(post.image_url)
      .then(res => res.blob())
      .then(blob => {
        feed.item({
          title: post.title,
          author: post.author.display_name,
          date: post.created,
          categories: post.tags,
          description: html,
          url: `https://theclashfruit.me/post/${post.permalink}`,
          guid: post.permalink,
          enclosure: {
            url: post.image_url,
            size: blob.size,
            type: blob.type
          }
        });
      });
  }

  res.setHeader('Content-Type', 'text/xml');
  res.write(feed.xml({ indent: true }));
  res.end();

  return {
    props: {},
  };
}