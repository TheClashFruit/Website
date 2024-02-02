import Head from 'next/head';

import { useRouter } from 'next/router';

export default function Meta({ pageData }) {
  const router = useRouter();

  return (
    <Head>
      <title>TheClashFruit &bull; {pageData.title}</title>

      <link rel="icon" href="/favicon_light.ico" type="image/x-icon" media="(prefers-color-scheme: light)" />
      <link rel="icon" href="/favicon_dark.ico"  type="image/x-icon" media="(prefers-color-scheme: dark)" />

      <meta property="tcf:page_data" content={JSON.stringify(pageData)}/>

      {pageData.type === 'page' && (
        <>
          <meta name="name" content={`TheClashFruit &bull; ${pageData.title}`}/>
          <meta name="description" content="I'm TheClashFruit and I like to program, explore and craft stuff. I also like to play games. I have 3 Linux servers.. So, as you can see, I like to play around with Linux too. I'm currently learning how to write proper blog posts on my blog."/>
          <meta name="keywords" content={`theclashfruit, tcf, blokkok, the, clash, fruit, ${pageData.title.trim().split(' ').join(', ').toLowerCase()}`}/>
          <meta name="theme-color" content="#00796B"/>

          <meta property="og:site_name" content="TheClashFruit"/>
          <meta property="og:title" content={pageData.title}/>
          <meta property="og:type" content="website"/>
          <meta property="og:locale" content="en_GB"/>
          <meta property="og:url" content="https://theclashfruit.me"/>
          <meta property="og:image" content="https://www.theclashfruit.me/img/logo.png"/>
          <meta property="og:description" content="I'm TheClashFruit and I like to program, explore and craft stuff. I also like to play games. I have 3 Linux servers.. So, as you can see, I like to play around with Linux too. I'm currently learning how to write proper blog posts on my blog."/>
        </>
      )}

      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1510964912637528" crossOrigin="anonymous"/>
    </Head>
  );
}