DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(255),
  `gender` VARCHAR(50),
  `birthdate` DATE,
  `contact_phone_1` VARCHAR(50),
  `contact_phone_2` VARCHAR(50),
  `email` VARCHAR(255),
  `emergency_contact_name` VARCHAR(255),
  `emergency_contact_phone` VARCHAR(50),
  `zip_code` VARCHAR(20),
  `instagram` TINYINT(1) DEFAULT 0,
  `maps` TINYINT(1) DEFAULT 0,
  `mouth_mouth` TINYINT(1) DEFAULT 0,
  `other_hear_about_us` VARCHAR(255),
  `diabetes` TINYINT(1) DEFAULT 0,
  `hipertension` TINYINT(1) DEFAULT 0,
  `epilepsia` TINYINT(1) DEFAULT 0,
  `enfermedades_autoinmunes` TINYINT(1) DEFAULT 0,
  `cancer_melanoma` TINYINT(1) DEFAULT 0,
  `transtornos_coagulacion` TINYINT(1) DEFAULT 0,
  `enfermedades_cardiacas` TINYINT(1) DEFAULT 0,
  `infecciones_herpes_bacterianas_micoticas` TINYINT(1) DEFAULT 0,
  `vih_inmunosupresion` TINYINT(1) DEFAULT 0,
  `problemas_cicatrizacion` TINYINT(1) DEFAULT 0,
  `enfermedades_piel` TINYINT(1) DEFAULT 0,
  `retinoides_sistemicos` TINYINT(1) DEFAULT 0,
  `photosensitizer` TINYINT(1) DEFAULT 0,
  `alergias` VARCHAR(255),
  `embarazo` TINYINT(1) DEFAULT 0,
  `lactancia` TINYINT(1) DEFAULT 0,
  `exposicion_solar_reciente` TINYINT(1) DEFAULT 0,
  `camas_solares` TINYINT(1) DEFAULT 0,
  `smokes` TINYINT(1) DEFAULT 0,
  `drinks` TINYINT(1) DEFAULT 0,
  `frequent_solar_exposure` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `laser_category`;

CREATE TABLE `laser_category` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50)
);

INSERT INTO laser_category (`name`) 
VALUES 
  ('Tatuajes'),
  ('Microblading'),
  ('Cicatrices'),
  ('Hollywood Peel');


DROP TABLE IF EXISTS `laser_treatment`;

CREATE TABLE `laser_treatment` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `customer_id` INT UNSIGNED NOT NULL,
  `laser_category_id` INT UNSIGNED NOT NULL,
  `brief_description` VARCHAR(100),
  `anatomic_place` VARCHAR(255),
  `size` VARCHAR(100),
  `years` SMALLINT UNSIGNED,
  `retouching` SMALLINT UNSIGNED,
  `laser` TINYINT(1) DEFAULT 0,
  `surgery` TINYINT(1) DEFAULT 0,
  `acid` TINYINT(1) DEFAULT 0,
  `other` VARCHAR(255),
  `notes` TEXT,
  `photo_0` VARCHAR(100),
  `photo_1` VARCHAR(100),
  `photo_2` VARCHAR(100),
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `laser_treatment` ADD CONSTRAINT `laser_category_laser_treatments` FOREIGN KEY (`laser_category_id`) REFERENCES `laser_category` (`id`);
ALTER TABLE `laser_treatment` ADD CONSTRAINT `customer_laser_treatments` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE;

DROP TABLE IF EXISTS `laser_session`;

CREATE TABLE `laser_session` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `laser_treatment_id` INT UNSIGNED NOT NULL,
  `power` VARCHAR(100),
  `header` VARCHAR(100),
  `passes` SMALLINT UNSIGNED,
  `price` INT,
  `notes` TEXT,
  `date_hour` TIMESTAMP,
  `photo_0` VARCHAR(100),
  `photo_1` VARCHAR(100),
  `photo_2` VARCHAR(100),
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `laser_session` ADD CONSTRAINT `laser_treatment_laser_sessions` FOREIGN KEY (`laser_treatment_id`) REFERENCES `laser_treatment` (`id`) ON DELETE CASCADE;
