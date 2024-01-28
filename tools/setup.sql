CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `display_name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(320) NOT NULL,
  `password` varchar(72) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_login` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY(`id`)
);
###
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permalink` varchar(255) NOT NULL,
  `tags` varchar(255) NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY(`id`),
  INDEX(`user_id`)
);
###
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permalink` varchar(255) NOT NULL,
  `tags` varchar(255) NOT NULL,
  `title` varchar(50) NOT NULL,
  `readme` LONGTEXT NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY(`id`)
);
###
CREATE TABLE `gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `license_id` int(11) NOT NULL,
  `tags` varchar(255) NOT NULL,
  `title` varchar(50) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY(`id`),
  INDEX(`license_id`)
);
###
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `comment` varchar(512) NOT NULL,
  PRIMARY KEY(`id`),
  INDEX(`post_id`)
);
###
CREATE TABLE `downloads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `download_type` varchar(50) NOT NULL,
  `url` varchar(2048) NOT NULL,
  `uses` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY(`id`),
  INDEX(`project_id`)
);
###
CREATE TABLE `licenses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `short_name` varchar(50) NOT NULL,
  `long_name` varchar(100) NOT NULL,
  `url` varchar(2048) NOT NULL,
  `text` LONGTEXT NOT NULL,
  PRIMARY KEY(`id`)
);
###
ALTER TABLE `comments` ADD FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
###
ALTER TABLE `downloads` ADD FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
###
ALTER TABLE `posts` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
###
ALTER TABLE `gallery` ADD FOREIGN KEY (`license_id`) REFERENCES `licenses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;