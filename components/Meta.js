import Head from 'next/head';

import { useRouter } from 'next/router';

export default function Meta({ pageData }) {
  const router = useRouter();

  const robots = pageData.allowIndex === undefined || pageData.allowIndex ? 'index follow' : 'noindex nofollow';

  let structuredData = {};

  if (pageData.type === 'page') {
    structuredData.page = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: 'https://theclashfruit.me/',
      potentialAction: [
        {
          '@type': 'SearchAction',
          'query-input': 'required name=q',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://theclashfruit.me/search?q={q}&type=all'
          }
        }
      ]
    };
  }

  if (pageData.type === 'post') {
    structuredData.post = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: pageData.title,
      image: [
        pageData.post.image_url
      ],
      datePublished: new Date(pageData.post.created).toISOString(),
      dateModified: new Date(pageData.post.updated).toISOString(),
      author: [
        {
          '@type': 'Person',
          name: pageData.post.author.display_name,
          url: 'https://theclashfruit.me/user/' + pageData.post.author.username
        }
      ]
    };
  }
  
  if (pageData.type === 'video') {
    structuredData.video = {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      'name': pageData.title,
      'description': pageData.video.description,
      'thumbnailUrl': pageData.video.thumbnail,
      'uploadDate': pageData.video.date.toISOString(),
      'duration': pageData.video.duration,
      'contentUrl': pageData.video.url,
      'embedUrl': pageData.video.embed,
      'interactionStatistic': {
        '@type': 'InteractionCounter',
        'interactionType': { '@type': 'WatchAction' },
        'userInteractionCount': 5647018
      }
    }
    ;
  }

  return (
    <Head>
      <title>TheClashFruit &bull; {pageData.title}</title>

      <link rel="icon" href="/favicon.ico" type="image/x-icon" />

      <link rel="icon" href="/favicon_light.ico" type="image/x-icon" media="(prefers-color-scheme: light)"/>
      <link rel="icon" href="/favicon_dark.ico" type="image/x-icon" media="(prefers-color-scheme: dark)"/>

      <meta property="tcf:page_data" content={JSON.stringify(pageData)}/>
      <meta name="robots" content={robots}/>

      <link rel="alternate" type="application/rss+xml" href="https://theclashfruit.me/rss.xml"/>

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

          <script type="application/ld+json">
            {JSON.stringify(structuredData.page, null, 2)}
          </script>
        </>
      )}

      {pageData.type === 'post' && (
        <>
          <meta name="name" content={`TheClashFruit &bull; ${pageData.title}`}/>
          <meta name="description" content={pageData.post.content.replace(/<[^>]*>?/gm, '').split('', 200).join('')}/>
          <meta name="keywords" content={`theclashfruit, tcf, blokkok, the, clash, fruit, ${pageData.title.trim().split(' ').join(', ').toLowerCase()}, ${pageData.post.tags.join(', ').toLowerCase()}`}/>
          <meta name="theme-color" content="#00796B"/>

          <meta property="og:site_name" content="TheClashFruit"/>
          <meta property="og:title" content={pageData.title}/>
          <meta property="og:type" content="article"/>
          <meta property="og:locale" content="en_GB"/>
          <meta property="og:url" content="https://theclashfruit.me"/>
          <meta property="og:image" content={pageData.post.image_url}/>
          <meta property="og:description" content={pageData.post.content.replace(/<[^>]*>?/gm, '').split('', 200).join('')}/>

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

          <script type="application/ld+json">
            {JSON.stringify(structuredData.post, null, 2)}
          </script>
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

          <meta property="og:video" content={pageData.video.url}/>
          <meta property="og:video:secure_url" content={pageData.video.url}/>
          <meta property="og:video:type" content="video/mp4"/>
          <meta property="og:video:width" content={pageData.video.size.w}/>
          <meta property="og:video:height" content={pageData.video.size.h}/>

          <script type="application/ld+json">
            {JSON.stringify(structuredData.video, null, 2)}
          </script>
        </>
      )}

      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1510964912637528" crossOrigin="anonymous"/>
    </Head>
  );
}