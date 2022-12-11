<?php
  require '../../vendor/autoload.php';
  require '../../config/website.conf.php';

  header('Content-Type: application/json');

  $allPosts = $MySQL->query('SELECT * FROM posts ORDER BY id DESC');

  $allPostsArray = Array();

  while ($post = $allPosts->fetch_assoc()) {
    $allPostsArray[] = Array(
      'title' => $post['title'],
      'author' => 'TheClashFruit',
      'permalink' => $post['permalink'],
      'created' => strtotime($post['created']),
      'content' => $post['content']
    );
  }

  echo json_encode($allPostsArray);