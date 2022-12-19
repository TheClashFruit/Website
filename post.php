<?php
  require __DIR__ . '/vendor/autoload.php';
  require __DIR__ . '/config/website.conf.php';

  require __DIR__ . '/vendor/erusev/parsedown/Parsedown.php';

  $md = new Parsedown();

  if(isset($_GET['id'])) {
    $id   = $_GET['id'];
    $post = $MySQL->prepare("SELECT * FROM posts WHERE permalink = ?");

    $post->bind_param('s', $id);
    $post->execute();

    $post = $post->get_result();
    $post = $post->fetch_row();

    if($post == null) {
      http_response_code(404);
      include('404.html');
      die();
    }
  } else {
    http_response_code(404);
    include('404.html');
    die();
  }
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

    <title>TheClashFruit &bull; <?php echo $post[4]; ?></title>

    <link rel="icon" href="/favicon.ico">

    <!-- SEO -->
    <meta name="name" content="TheClashFruit &bull; <?php echo $post[4]; ?>">
    <meta name="description" content="<?php echo str_replace("\n", " ", strip_tags($md->text($post[5]))); ?>">
    <meta name="keywords" content="TheClashFruit, tcf, blokkok, susman, the, clash, fruit, <?php echo $post[2]; ?>">
    <meta name="theme-color" content="#00796B">

    <!-- Open Graph -->
    <meta property="og:site_name" content="TheClashFruit">
    <meta property="og:title" content="<?php echo $post[4]; ?>">
    <meta property="og:type" content="article">
    <meta property="og:locale" content="en_GB">
    <meta property="og:url" content="https://theclashfruit.me/post/<?php echo $post[1]; ?>">
    <meta property="og:image" content="<?php echo $post[3]; ?>">
    <meta property="og:description" content="<?php echo str_replace("\n", " ", strip_tags($md->text($post[5]))); ?>">

    <meta property="article:section" content="Technology">
    <meta property="article:author" content="TheClashFruit">
    <meta property="article:published_time" content="<?php echo Date('c', strtotime($post[6])); ?>">
    <meta property="article:modified_time" content="<?php echo Date('c', strtotime($post[7])); ?>">

    <meta name="twitter:card" content="summary_large_image">
    <meta property="twitter:domain" content="theclashfruit.me">
    <meta property="twitter:url" content="https://theclashfruit.me/post/<?php echo $post[1]; ?>">
    <meta name="twitter:title" content="<?php echo $post[4]; ?>">
    <meta name="twitter:description" content="<?php echo str_replace("\n", " ", strip_tags($md->text($post[5]))); ?>">
    <meta name="twitter:image" content="<?php echo $post[3]; ?>">

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
              <a href="/">Home</a>
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
        <h1><?php echo $post[4]; ?></h1>
      </div>
    </div>

    <main>
      <div class="container">
        <p>
          <?php echo $md->text($post[5]); ?>
        </p>
      </div>
    </main>

    <footer>
      <p>
        Copyright &copy; <?php echo date("Y"); ?> TheClashFruit
      </p>
    </footer>

    <script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/highlight.min.js"></script>
    <script>hljs.highlightAll();</script>
    <script src="/js/main.js"></script>
  </body>
</html>