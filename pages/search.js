import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Database from '@/lib/Database';
import Paginator from '@/components/Paginator';
import Card from '@/components/Card';
import Button from '@/components/Button';
import AdBanner from '@/components/AdBanner';

import {
  Share2
} from 'lucide-react';

import styles from '@/styles/Blog.module.scss';

import Link from 'next/link';
import Image from 'next/image';

export default function Search({ q, everything, page, totalPages }) {
  return (
    <>
      <Meta pageData={{ title: `Search: ${q}`, type: 'page' }} />

      <Navbar page="search" />
      <Header title={`Search: ${q}`} />

      <main>
        <div className={styles.container}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '90px' }}>
            <AdBanner
              style={{ display: 'inline-block' }}
              data-ad-client="ca-pub-1510964912637528"
              data-ad-slot="3830865920"
            />
          </div>

          <div className={styles.postsGrid}>
            {
              everything.map((e, index) => {
                return (
                  <>
                    { e.type === 'post' &&
                      <Link key={index} href={`/post/${e.permalink}`} className={styles.blogCardWrapperLink}>
                        <Card className={styles.blogCard}>
                          <div className={styles.header}>
                            <Image src={e.image_url} alt={`Banner of "${e.title}".`} width={356} height={216} />

                            <div className={styles.headerOverlay}>
                              <Button onClick={() => { navigator.share({ title: e.title, text: e.content.split(' ', 35).join(' '), url: `https://theclashfruit.me/post/${e.permalink}` }); }} icon={Share2} type="icon" />
                            </div>
                          </div>
                          <div className={styles.content}>
                            <div className={styles.title}>
                              <h3>{e.title}</h3>
                              <label>{e.author.display_name}</label>
                            </div>

                            <p>{e.content.split(' ', 35).join(' ')}...</p>
                          </div>
                        </Card>
                      </Link>
                    }

                    { e.type === 'project' &&
                      <Link key={index} href={`/project/${e.permalink}`} className={styles.blogCardWrapperLink}>
                        <Card className={styles.blogCard}>
                          <div className={styles.header}>
                            <Image src={e.icon} alt={`Banner of "${e.title}".`} width={356} height={216} />

                            <div className={styles.headerOverlay}>
                              <Button onClick={() => { navigator.share({ title: e.title, text: e.content.split(' ', 35).join(' '), url: `https://theclashfruit.me/post/${e.permalink}` }); }} icon={Share2} type="icon" />
                            </div>
                          </div>
                          <div className={styles.content}>
                            <div className={styles.title}>
                              <h3>{e.title}</h3>
                            </div>

                            <p>{e.short_readme}</p>
                          </div>
                        </Card>
                      </Link>
                    }
                  </>
                );
              })
            }
          </div>

          <Paginator page={Number.parseInt(page)} totalPages={Number.parseInt(totalPages)} />
        </div>
      </main>

      <Footer shareData={{ title: 'Blog', text: 'Check out TheClashFruit\'s blog!', url: 'https://theclashfruit.me/blog' }} />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const db = new Database();

  const page = {
    offset: query.page !== undefined ? Math.floor((query.page - 1) * 10) : 0,
    limit: query.page !== undefined ? Math.floor((query.page - 1) * 10) + 10 : 10,

    type: query.type !== undefined ? query.type : 'all'
  };

  const posts = await db.getPosts(page.offset, page.limit, query.q);
  const totalPosts = await db.getPostCount(query.q);

  const projects = await db.getProjects(page.offset, page.limit, query.q);
  const totalProjects = await db.getProjectCount(query.q);

  posts.map((e) => {
    e.type = 'post';
  });

  projects.map((e) => {
    e.type = 'project';
  });

  const everything = posts.concat(projects);

  everything.sort((a, b) => {
    return a.title.localeCompare(b.title, 'en', { sensitivity: 'base' });
  });

  everything.map((e, index) => {
    e.id = index;
  });

  const totalCount = totalPosts + totalProjects;

  return {
    props: {
      q: query.q,
      everything: page.type === 'all' ? everything : everything.filter(e => e.type === page.type),
      page: query.page !== undefined ? query.page : 1,
      totalPages: Math.ceil(totalCount / 10)
    },
  };
}