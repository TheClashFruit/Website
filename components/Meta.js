import Head from 'next/head';

import { useRouter } from 'next/router';

export default function Meta({ pageData }) {
  const router = useRouter();

  const robots = pageData.allowIndex === undefined || pageData.allowIndex ? 'index follow' : 'noindex nofollow';

  return (
    <Head>
      <title>TheClashFruit &bull; {pageData.title}</title>

      <link rel="icon" href="/favicon_light.ico" type="image/x-icon" media="(prefers-color-scheme: light)"/>
      <link rel="icon" href="/favicon_dark.ico" type="image/x-icon" media="(prefers-color-scheme: dark)"/>

      <meta property="tcf:page_data" content={JSON.stringify(pageData)}/>
      <meta name="robots" content={robots}/>

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
          <meta property="og:image" content={pageData.post.image_url}/>
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

      {pageData.type === 'video' && (
        <>
          <meta name="name" content={`TheClashFruit &bull; ${pageData.title}`}/>
          <meta name="description" content="dj contruction worker"/>
          <meta name="keywords" content={`theclashfruit, tcf, blokkok, the, clash, fruit, ${pageData.title.trim().split(' ').join(', ').toLowerCase()}`}/>
          <meta name="theme-color" content="#00796B"/>

          <meta property="og:site_name" content="TheClashFruit"/>
          <meta property="og:title" content={pageData.title}/>
          <meta property="og:type" content="video.other"/>
          <meta property="og:locale" content="en_GB"/>
          <meta property="og:url" content="https://theclashfruit.me"/>

          <meta property="og:video" content={pageData.url}/>
          <meta property="og:video:secure_url" content={pageData.url}/>
          <meta property="og:video:type" content="video/mp4"/>
          <meta property="og:video:width" content="1280"/>
          <meta property="og:video:height" content="720"/>
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
                  "urlTemplate": "https://theclashfruit.me/search?q={q}&type=all"
                }
              }
            ]
          }
        `}
      </script>

      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1510964912637528"
              crossOrigin="anonymous"/>
    </Head>
  );
}