DROP TABLE IF EXISTS `package`;

CREATE TABLE `package` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `laser_treatment_id` INT UNSIGNED NOT NULL,
    `package_name` VARCHAR(100),
    `package_price` INT DEFAULT 0,
    `package_sessions_total` INT DEFAULT 0,
    `package_sessions_used` INT DEFAULT 0,
    `notes` TEXT,
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `package` ADD CONSTRAINT `package_laser_treatment` FOREIGN KEY (`laser_treatment_id`) REFERENCES `laser_treatment` (`id`);  

ALTER TABLE `laser_session` ADD COLUMN `package_id` INT UNSIGNED NULL AFTER `id`;

ALTER TABLE `laser_session` ADD CONSTRAINT `laser_session_package` FOREIGN KEY (`package_id`) REFERENCES `package` (`id`);

