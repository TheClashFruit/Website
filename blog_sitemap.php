<?php
  header('Content-Type: application/xml');

  require __DIR__ . '/vendor/autoload.php';
  require __DIR__ . '/config/website.conf.php';

  $allPosts = $MySQL->query('SELECT * FROM posts ORDER BY id DESC');

  echo '<?xml version="1.0" encoding="UTF-8"?>';
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <?php
    while ($post = $allPosts->fetch_assoc()) {
      $postDate = Date('c', strtotime($post['created']));

      echo "
        <url>
          <loc>https://theclashfruit.me/post/{$post['permalink']}</loc>
          <lastmod>{$postDate}</lastmod>
          <priority>0.80</priority>
        </url>
      ";
    }
  ?>
</urlset>