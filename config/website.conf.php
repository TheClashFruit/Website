<?php
  error_reporting(E_ALL);
  ini_set('display_errors', 0);

  $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
  $dotenv->load();

  $MySQL = new mysqli(
    'localhost',
    $_ENV['DB_USER'],
    $_ENV['DB_PASS'],
    $_ENV['DB_NAME']
  );

  $MySQL->set_charset('utf8mb4');