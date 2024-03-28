import Meta from '@/components/Meta';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import showdown from 'showdown';
import showdownHighlight from 'showdown-highlight';
import footnotes from 'showdown-footnotes';

import 'showdown-youtube';

import Database from '@/lib/Database';

import styles from '@/styles/Home.module.scss';
import {useEffect} from 'react';

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

  showdown.extension('header-anchors', function() {
    let ancTpl = '$1<div class="sectionLink" aria-hidden="true"><a href="#$3">#</a></div>$4';

    return [{
      type: 'html',
      regex: /(<h([1-3]) id="([^"]+?)">)(.*<\/h\2>)/g,
      replace: ancTpl
    }];
  });

  const converter = new showdown.Converter({
    extensions: [
      showdownHighlight({
        pre: true,
        auto_detection: true
      }),
      'youtube',
      'header-anchors',
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