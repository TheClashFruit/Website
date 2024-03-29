import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import showdown from 'showdown';
import showdownHighlight from 'showdown-highlight';
import footnotes from 'showdown-footnotes';

import 'showdown-youtube';
import '@/lib/MarkdownExtensions';

import Database from '@/lib/Database';

import styles from '@/styles/Home.module.scss';

export default function Post({ postData }) {
  return (
    <>
      <Meta pageData={{ title: postData.title, type: 'post', post: postData }} />

      <Navbar page="post" />
      <Header title={postData.title} postData={postData} />

      <main>
        <article className={styles.container} dangerouslySetInnerHTML={{ __html: postData.content }} />
      </main>

      <Footer shareData={{ title: postData.title, text: postData.short_readme, url: `https://theclashfruit.me/post/${postData.permalink}` }} />
    </>
  );
}

export async function getServerSideProps(context) {
  const db = new Database();

  const postData = await db.getPost(context.params.permalink);

  if(!postData) {
    return {
      notFound: true
    };
  }

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
      footnotes
    ]
  });

  converter.setFlavor('github');

  postData.content = converter.makeHtml(postData.content);

  return {
    props: {
      postData,
    }
  };
}