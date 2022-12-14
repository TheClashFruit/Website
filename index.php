<?php
  require __DIR__ . '/vendor/autoload.php';
  require __DIR__ . '/config/website.conf.php';

  require __DIR__ . '/vendor/erusev/parsedown/Parsedown.php';

  $md = new Parsedown();

  $allPosts = $MySQL->query('SELECT * FROM posts ORDER BY id DESC');
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

    <title>TheClashFruit &bull; Home</title>

    <link rel="icon" href="/favicon.ico">

    <!-- SEO -->
    <meta name="name" content="TheClashFruit &bull; Home">
    <meta name="description" content="I'm a software developer in my free time and student living in Hungary, I like to make android apps, websites, discord bots. I'm good in Kotlin, Java, JavaScript, HTML and CSS but I know some Rust, Python and I can write hello world in C++;">
    <meta name="keywords" content="TheClashFruit, tcf, blokkok, susman, the, clash, fruit, Home">
    <meta name="theme-color" content="#00796B">

    <!-- Open Graph -->
    <meta property="og:site_name" content="TheClashFruit">
    <meta property="og:title" content="Home">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en_GB">
    <meta property="og:url" content="https://theclashfruit.me">
    <meta property="og:image" content="https://www.theclashfruit.me/img/logo.png">
    <meta property="og:description" content="I'm a software developer in my free time and student living in Hungary, I like to make android apps, websites, discord bots. I'm good in Kotlin, Java, JavaScript, HTML and CSS but I know some Rust, Python and I can write hello world in C++;">

    <!-- <link type="application/json+oembed" href="https://theclashfruit.me/api/v1/oembed?url=${url}" /> -->

    <!-- Matomo -->
    <script>
      var _paq = window._paq = window._paq || [];
      /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
      (function() {
        var u="//matomo.theclashfruit.me/";
        _paq.push(['setTrackerUrl', u+'matomo.php']);
        _paq.push(['setSiteId', '1']);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
      })();
    </script>
    <noscript><p><img src="//matomo.theclashfruit.me/matomo.php?idsite=1&amp;rec=1" style="border:0;" alt="" /></p></noscript>
    <!-- End Matomo Code -->

    <link rel="stylesheet" href="/css/style.css">
  </head>
  <body>
    <nav class="navBar">
      <div class="container">
        <div class="navBarBase">
          <img class="navBarBrand" src="/img/logo_white.png">
          <a href="javascript:void(0);" class="navBarToggle" onclick="toggleNavBar()">
            <span class="material-symbols-rounded">
              menu
            </span>
          </a>
        </div>

        <div class="navCollapse">
          <ul>
            <li>
              <a href="#" class="active">Home</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/projects">Projects</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="pageHero">
      <div class="container">
        <h1>Home</h1>
      </div>
    </div>

    <main>
      <div class="container">
        <h2>About</h2>

        <p>
          Hello there 👋! I'm TheClashFruit, a young software developer living in Hungary. I know how to code in JavaScript, TypeScript, Kotlin, Java, Rust, PHP, C#.
        </p>

        <h2>Latest Posts</h2>

        <div class="listGrid">
          <?php
            while ($post = $allPosts->fetch_assoc()) {
              $contentShort = strip_tags($md->text($post['content']));
              $contentShort = substr($contentShort, 0, 150) . '...';

              echo "
                <div class='listItem'>
                  <img src='{$post['picture']}' class='listItemImg'>
                  <div class='titleRow'>
                    <h2><a href='/post/{$post['permalink']}'>{$post['title']}</a></h2>
                    
                    <div class='actionIcons'>
                      <a href='javascript:void(0);' onclick='sharePost(\"https://theclashfruit.me/post/{$post['permalink']}\", \"{$post['title']}\", \"{$contentShort}\")'>
                        <span class='material-symbols-rounded'>
                        share
                        </span>
                      </a>
                    </div>
                  </div>
                  <p class='blogPostDate'>{$post['created']}</p>
                  <p class='blogPostDescription'>{$contentShort}</p>
                </div>
              ";
            }
          ?>
        </div>
      </div>
    </main>

    <script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/highlight.min.js"></script>
    <script>hljs.highlightAll();</script>
    <script src="/js/main.js"></script>
  </body>
</html>