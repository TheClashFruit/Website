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

export default function Blog({ posts, page, totalPages }) {
  return (
    <>
      <Meta pageData={{ title: 'Blog', type: 'page' }} />

      <Navbar page="blog" />
      <Header title="Blog" />

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
              posts.map((post, index) => {
                return (
                  <Card key={index} className={styles.blogCard}>
                    <div className={styles.header}>
                      <Button onClick={() => { navigator.share({ title: post.title, text: post.content.split(' ', 35).join(' '), url: `https://theclashfruit.me/post/${post.permalink}` }); }} icon={Share2} type="icon" />
                    </div>
                    <div className={styles.content}>
                      <div className={styles.title}>
                        <h3>{post.title}</h3>
                        <label>{post.author.display_name}</label>
                      </div>

                      <p>{post.content.split(' ', 35).join(' ')}...</p>
                    </div>
                  </Card>
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
    limit: query.page !== undefined ? Math.floor((query.page - 1) * 10) + 10 : 10
  };

  const posts = await db.getPosts(page.offset, page.limit);
  const totalPosts = await db.getPostCount();

  return {
    props: {
      posts,
      page: query.page !== undefined ? query.page : 1,
      totalPages: Math.ceil(totalPosts / 10)
    },
  };
}