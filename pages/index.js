import Navbar from '@/components/Navbar';
import Meta from '@/components/Meta';
import Button from '@/components/Button';
import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';
import Footer from '@/components/Footer';
import Database from '@/lib/Database';

import {
  SiYoutube,
  SiForgejo,
  SiModrinth,
  SiGithub,
  SiDiscord,
  SiMastodon,
  SiCurseforge,
  SiJavascript,
  SiKotlin,
  SiRust,
  SiHtml5,
  SiCss3,
  SiCsharp,
  SiPython,
  SiFigma,
  SiDavinciresolve
} from '@icons-pack/react-simple-icons';

import {
  ArrowDown,
  Forward,
  Share2
} from 'lucide-react';

import Link from 'next/link';
import Image from 'next/image';

import showdown from 'showdown';

import showdownHighlight from 'showdown-highlight';
import footnotes from 'showdown-footnotes';

import 'showdown-youtube';
import '@/lib/MarkdownExtensions';

import styles from '@/styles/Home.module.scss';

export default function Home({ posts }) {
  return (
    <>
      <Meta pageData={{ title: 'Home', type: 'page' }} />
      <Navbar page="home" />

      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroTop}>
            <h1>TheClashFruit</h1>
            <p>A full-stack web, mobile developer & mod creator.</p>

            <ul className={styles.socialIcons}>
              <li>
                <Button href="https://youtube.com/@TheClashFruit" target="_blank" rel="noopener noreferrer me" icon={SiYoutube} type="icon" title="YouTube"/>
              </li>
              <li>
                <Button href="https://discord.gg/CWEApqJ6rc" target="_blank" rel="noopener noreferrer me" icon={SiDiscord} type="icon" title="Discord"/>
              </li>
              <li>
                <Button href="https://wetdry.world/@TheClashFruit" target="_blank" rel="noopener noreferrer me" icon={SiMastodon} type="icon" title="Mastodon"/>
              </li>
              <li>
                <Button href="https://modrinth.com/user/TheClashFruit" target="_blank" rel="noopener noreferrer me" icon={SiModrinth} type="icon" title="Modrinth"/>
              </li>
              <li>
                <Button href="https://www.curseforge.com/members/theclashfruit" target="_blank" rel="noopener noreferrer me" icon={SiCurseforge} type="icon" title="CurseForge"/>
              </li>
              <li>
                <Button href="https://git.theclashfruit.me/TheClashFruit" target="_blank" rel="noopener noreferrer me" icon={SiForgejo} type="icon" title="Forgejo"/>
              </li>
              <li>
                <Button href="https://github.com/TheClashFruit" target="_blank" rel="noopener noreferrer me" icon={SiGithub} type="icon" title="GitHub" />
              </li>
            </ul>
          </div>

          <Button href="#posts" icon={ArrowDown} type="icon" title="Scroll Down" />
        </div>
      </header>

      <main>
        <div className={styles.container}>
          <div id="posts">
            <h2>Latest Posts</h2>

            <div className={styles.postsGrid}>
              {
                posts.map((post, index) => {
                  return (
                    <Link key={index} href={`/post/${post.permalink}`} className={styles.blogCardWrapperLink}>
                      <Card className={styles.blogCard}>
                        <div className={styles.header}>
                          <Image src={post.image_url} alt={`Banner of "${post.title}".`} width={356} height={216} />

                          <div className={styles.headerOverlay}>
                            <Button onClick={() => { navigator.share({ title: post.title, text: post.content.split(' ', 35).join(' '), url: `https://theclashfruit.me/post/${post.permalink}` }); }} icon={Share2} type="icon" />
                          </div>
                        </div>
                        <div className={styles.content}>
                          <div className={styles.title}>
                            <h3>{post.title}</h3>
                            <label>{post.author.display_name}</label>
                          </div>

                          <p>{post.content.replace(/<[^>]*>?/gm, '').split('', 200).join('')}...</p>
                        </div>
                      </Card>
                    </Link>
                  );
                })
              }
            </div>
          </div>
        </div>
      </main>

      <Footer shareData={{ title: 'TheClashFruit', text: 'Check out TheClashFruit\'s site!', url: 'https://theclashfruit.me' }} />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const db = new Database();

  const posts = await db.getPosts(0, 3);

  const converter = new showdown.Converter({
    extensions: [
      showdownHighlight({
        pre: true,
        auto_detection: true
      }),
      'youtube',
      'header-anchors',
      'improved-tables',
      'custom-emoji',
      'timestamp',
      footnotes
    ]
  });

  converter.setFlavor('github');

  posts.forEach(post => {
    post.content = converter.makeHtml(post.content);
  });

  return {
    props: {
      posts,
    }
  };
}