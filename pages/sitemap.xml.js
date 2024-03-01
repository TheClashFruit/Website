import Database from '@/lib/Database';

import getConfig from 'next/config';

export default function SiteMap() {
  // it's the server's job!
}

export async function getServerSideProps({ res }) {
  const { publicRuntimeConfig } = getConfig();

  const isoString = new Date(publicRuntimeConfig.modifiedDate).toISOString();

  const pages = [
    {
      loc: 'https://theclashfruit.me',
      lastmod: isoString,
      priority: 1.00
    },
    {
      loc: 'https://theclashfruit.me/projects',
      lastmod: isoString,
      priority: 1
    },
    {
      loc: 'https://theclashfruit.me/gallery',
      lastmod: isoString,
      priority: 1
    },
    {
      loc: 'https://theclashfruit.me/blog',
      lastmod: isoString,
      priority: 1
    }
  ];

  const db = new Database();

  const projects = await db.getProjects(0, 1000);
  const posts = await db.getPosts(0, 1000);

  projects.forEach(project => {
    pages.push({
      loc: `https://theclashfruit.me/projects/${project.id}`,
      lastmod: new Date(project.updated).toISOString(),
      priority: 0.9
    });
  });

  posts.forEach(post => {
    pages.push({
      loc: `https://theclashfruit.me/post/${post.permalink}`,
      lastmod: new Date(post.updated).toISOString(),
      priority: 0.9
    });
  });

  let tmp = '';

  pages.forEach(page => {
    tmp += `\n  <url>\n    <loc>${page.loc}</loc>\n    <lastmod>${page.lastmod}</lastmod>\n    <priority>${page.priority}</priority>\n  </url>`;
  });

  const siteMap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">${tmp}\n</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(siteMap);
  res.end();

  return {
    props: {},
  };
}