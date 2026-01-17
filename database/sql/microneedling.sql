DROP TABLE IF EXISTS `microneedling_treatment`;

CREATE TABLE `microneedling_treatment` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `customer_id` INT UNSIGNED NOT NULL,
  `objective` VARCHAR(100),
  `anatomic_place` VARCHAR(255),
  `previous_sessions` SMALLINT UNSIGNED,
  `laser` TINYINT(1) DEFAULT 0,
  `surgery` TINYINT(1) DEFAULT 0,
  `acid` TINYINT(1) DEFAULT 0,
  `other` VARCHAR(255),
  `activo` VARCHAR(100),
  `notes` TEXT,
  `photo_0` VARCHAR(100),
  `photo_1` VARCHAR(100),
  `photo_2` VARCHAR(100),
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `microneedling_session`;

CREATE TABLE `microneedling_session` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `microneedling_treatment_id` INT UNSIGNED NOT NULL,
  `activo` VARCHAR(100),
  `agujas` VARCHAR(100),
  `price` INT,
  `notes` TEXT,
  `date_hour` TIMESTAMP,
  `photo_0` VARCHAR(100),
  `photo_1` VARCHAR(100),
  `photo_2` VARCHAR(100),
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `microneedling_session` ADD CONSTRAINT `microneedling_treatment_microneedling_session` FOREIGN KEY (`microneedling_treatment_id`) REFERENCES `microneedling_treatment` (`id`) ON DELETE CASCADE;
