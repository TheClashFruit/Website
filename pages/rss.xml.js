import RSS from 'rss';

export default function RssFeed() {
  // it's the server's job!
}

export async function getServerSideProps({ res }) {
  const feedOptions = {
    title: 'TheClashFruit\'s Blog',
    description: 'I\'m TheClashFruit and I like to program, explore and craft stuff. I also like to play games. I have 3 Linux servers.. So, as you can see, I like to play around with Linux too.',
    site_url: 'https://theclashfruit.me',
    feed_url: 'https://theclashfruit.me/rss.xml',
    image_url: 'https://theclashfruit.me/icons/logo.svg',
    pubDate: new Date(1706363565 * 1000).getTime(),
    copyright: `Copyright © ${new Date().getFullYear()} TheClashFruit`,
  };

  const feed = new RSS(feedOptions);

  // items tba

  res.setHeader('Content-Type', 'text/xml');
  res.write(feed.xml({ indent: true }));
  res.end();

  return {
    props: {},
  };
}