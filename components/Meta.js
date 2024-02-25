import Head from 'next/head';

import { useRouter } from 'next/router';

export default function Meta({ pageData }) {
  const router = useRouter();

  return (
    <Head>
      <title>TheClashFruit &bull; {pageData.title}</title>

      <link rel="icon" href="/favicon_light.ico" type="image/x-icon" media="(prefers-color-scheme: light)"/>
      <link rel="icon" href="/favicon_dark.ico" type="image/x-icon" media="(prefers-color-scheme: dark)"/>

      <meta property="tcf:page_data" content={JSON.stringify(pageData)}/>
      <meta name="robots" content="index, follow"/>

      {pageData.type === 'page' && (
        <>
          <meta name="name" content={`TheClashFruit &bull; ${pageData.title}`}/>
          <meta name="description" content="A full-stack web, mobile developer & mod creator."/>
          <meta name="keywords" content={`theclashfruit, tcf, blokkok, the, clash, fruit, ${pageData.title.trim().split(' ').join(', ').toLowerCase()}`}/>
          <meta name="theme-color" content="#00796B"/>

          <meta property="og:site_name" content="TheClashFruit"/>
          <meta property="og:title" content={pageData.title}/>
          <meta property="og:type" content="website"/>
          <meta property="og:locale" content="en_GB"/>
          <meta property="og:url" content="https://theclashfruit.me"/>
          <meta property="og:image" content="https://www.theclashfruit.me/img/logo.png"/>
          <meta property="og:description" content="A full-stack web, mobile developer & mod creator."/>
        </>
      )}

      {pageData.type === 'post' && (
        <>
          <meta name="name" content={`TheClashFruit &bull; ${pageData.title}`}/>
          <meta name="description" content={pageData.post.content.split(' ', 35).join(' ')}/>
          <meta name="keywords" content={`theclashfruit, tcf, blokkok, the, clash, fruit, ${pageData.title.trim().split(' ').join(', ').toLowerCase()}, ${pageData.post.tags.join(', ').toLowerCase()}`}/>
          <meta name="theme-color" content="#00796B"/>

          <meta property="og:site_name" content="TheClashFruit"/>
          <meta property="og:title" content={pageData.title}/>
          <meta property="og:type" content="article"/>
          <meta property="og:locale" content="en_GB"/>
          <meta property="og:url" content="https://theclashfruit.me"/>
          <meta property="og:image" content="https://www.theclashfruit.me/img/logo.png"/>
          <meta property="og:description" content={pageData.post.content.split(' ', 35).join(' ')}/>

          <meta property="article:published_time" content={new Date(pageData.post.created).toISOString()}/>
          <meta property="article:modified_time" content={new Date(pageData.post.updated).toISOString()}/>
          <meta property="article:author" content={pageData.post.author.display_name}/>
          <meta property="article:section" content={pageData.post.tags[0]}/>

          {
            pageData.post.tags.map((tag, index) => {
              return (
                <meta key={index} property="article:tag" content={tag}/>
              );
            })
          }
        </>
      )}

      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://theclashfruit.me/",
            "potentialAction": [
              {
                "@type": "SearchAction",
                "query-input": "required name=q"
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://theclashfruit.me/blog?q={q}"
                }
              }
            ]
          }
        `}
      </script>

      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1510964912637528" crossOrigin="anonymous"/>
    </Head>
  );
}