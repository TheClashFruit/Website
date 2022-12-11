<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

    <title>TheClashFruit &bull; Contact</title>

    <link rel="icon" href="/favicon.ico">

    <!-- SEO -->
    <meta name="name" content="TheClashFruit &bull; Contact">
    <meta name="description" content="I'm a software developer in my free time and student living in Hungary, I like to make android apps, websites, discord bots. I'm good in Kotlin, Java, JavaScript, HTML and CSS but I know some Rust, Python and I can write hello world in C++;">
    <meta name="keywords" content="TheClashFruit, tcf, blokkok, susman, the, clash, fruit, Home">
    <meta name="theme-color" content="#00796B">

    <!-- Open Graph -->
    <meta property="og:site_name" content="TheClashFruit">
    <meta property="og:title" content="Contact">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en_GB">
    <meta property="og:url" content="https://theclashfruit.me/contact">
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
              <a href="/projects">Projects</a>
            </li>
            <li>
              <a href="#" class="active">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="pageHero">
      <div class="container">
        <h1>Contact</h1>
      </div>
    </div>

    <main>
      <div class="container">
        <?php
          if(isset($_POST['name'])) {
          $subject = '[Contact Form] From ' . htmlspecialchars($_POST['name']);
          $message = $_POST['message'];
          $headers = 'From: ' . htmlspecialchars($_POST['name']) .' <no-reply@theclashfruit.me>' . "\r\n" .
            'Reply-To: ' . htmlspecialchars($_POST['email']) . "\r\n" .
            'Content-Type: text/html; charset="UTF-8"' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

          mail("admin@theclashfruit.me", $subject, $message, $headers);

          echo "<p><strong>Thank you for your message!</strong></p>";
        } else {
        ?>
        <form method="post">
          <input type="text" id="name" name="name"    placeholder="Name" required />
          <input type="email" id="email" name="email" placeholder="E-Mail" required />
          <textarea id="message" name="message"       placeholder="Message..." required></textarea>

          <button type="submit">Send</button>
        </form>
        <?php } ?>
      </div>
    </main>

    <script src="/js/main.js"></script>
  </body>
</html>