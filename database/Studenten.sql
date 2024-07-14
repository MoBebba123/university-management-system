 CREATE TABLE `Studenten` (
  `id` varchar(100) NOT NULL,
  `username` varchar(30) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `matrikelnummer` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `studiengangId` varchar(100) DEFAULT NULL,
  `total_cp` int DEFAULT 0,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `matrikelnummer` (`matrikelnummer`),
  UNIQUE KEY `email` (`email`),
  KEY `studiengangId` (`studiengangId`),
  CONSTRAINT `studenten_ibfk_1` FOREIGN KEY (`studiengangId`) REFERENCES `Studiengang` (`id`) ON DELETE SET NULL
)