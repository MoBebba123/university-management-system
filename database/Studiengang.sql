CREATE TABLE `Studiengang` (
  `id` varchar(100) NOT NULL,
  `title` varchar(30) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
)