 CREATE TABLE `Anmeldelisten` (
  `id` varchar(100) NOT NULL,
  `studentId` varchar(100) DEFAULT NULL,
  `pruefungsId` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `anmeldedatum` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `anmeldelisten_ibfk_2` (`pruefungsId`),
  CONSTRAINT `anmeldelisten_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `Studenten` (`id`) ON DELETE CASCADE,
  CONSTRAINT `anmeldelisten_ibfk_2` FOREIGN KEY (`pruefungsId`) REFERENCES `Pruefungen` (`id`) ON DELETE CASCADE
)