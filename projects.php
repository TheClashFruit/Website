<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

    <title>TheClashFruit &bull; Projects</title>

    <link rel="icon" href="/favicon.ico">

    <!-- SEO -->
    <meta name="name" content="TheClashFruit &bull; Projects">
    <meta name="description" content="I'm a software developer in my free time and student living in Hungary, I like to make android apps, websites, discord bots. I'm good in Kotlin, Java, JavaScript, HTML and CSS but I know some Rust, Python and I can write hello world in C++;">
    <meta name="keywords" content="TheClashFruit, tcf, blokkok, susman, the, clash, fruit, Home">
    <meta name="theme-color" content="#00796B">

    <!-- Open Graph -->
    <meta property="og:site_name" content="TheClashFruit">
    <meta property="og:title" content="Projects">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en_GB">
    <meta property="og:url" content="https://theclashfruit.me/projects">
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
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="#" class="active">Projects</a>
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
        <h1>Projects</h1>
      </div>
    </div>

    <main>
      <div class="container listGrid">
        <div class="listItem">
          <img src='https://cdn.theclashfruit.me/images/rithle-6Hsd9df7.png' class='listItemImg'>
          <div class="titleRow">
            <h2>Rithle</h2>

            <div class="actionIcons">
              <a href="https://github.com/TheClashFruit/Rithle">
                <span class="material-symbols-rounded">
                  code
                </span>
              </a>
              <a href="https://github.com/TheClashFruit/Rithle/releases">
                <span class="material-symbols-rounded">
                  download
                </span>
              </a>
            </div>
          </div>
          <p>
            An open-source Android client for Modrinth written in Kotlin.
          </p>
        </div>
        <div class="listItem">
          <img src='https://api.mcbanners.com/banner/saved/FqrWTNFGAKcUUD.png' class='listItemImg'>
          <div class="titleRow">
            <h2>Stuff+</h2>

            <div class="actionIcons">
              <a href="https://github.com/TheClashFruit/StuffPlus">
                <span class="material-symbols-rounded">
                  code
                </span>
              </a>
              <a href="https://modrinth.com/mod/stuff-plus">
                <span class="material-symbols-rounded">
                  download
                </span>
              </a>
            </div>
          </div>
          <p>
            Additional items and block that I think are missing from Minecraft.
          </p>
        </div>
        <div class="listItem">
          <img src='' class='listItemImg'>
          <div class="titleRow">
            <h2>Hibernitt</h2>

            <div class="actionIcons">
              <a href="https://github.com/TheClashFruit/Hibernitt">
                <span class="material-symbols-rounded">
                  code
                </span>
              </a>
              <a href="https://modrinth.com/plugin/hibernitt">
                <span class="material-symbols-rounded">
                  download
                </span>
              </a>
            </div>
          </div>
          <p>
            Hibernate your minecraft server when no-one is online.
          </p>
        </div>
      </div>
    </main>

    <footer>
      <p>
        Copyright &copy; <?php echo date("Y"); ?> TheClashFruit
      </p>
    </footer>

    <script src="/js/main.js"></script>
  </body>
</html>