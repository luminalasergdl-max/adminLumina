DROP TABLE IF EXISTS `gift_card_campaign`;

CREATE TABLE `gift_card_campaign` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `campaign_name` VARCHAR(100),
    `canva_design_url` VARCHAR(100),
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `gift_card`;

CREATE TABLE `gift_card` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `gift_card_campaign_id` INT UNSIGNED NOT NULL,
    `sender` VARCHAR(100),
    `receiver` VARCHAR(100),
    `receiver_phone` VARCHAR(50),
    `treatment_description` VARCHAR(100),
    `price` INT DEFAULT 0,
    `gift_card_message` VARCHAR(255),
    `valid_until` TIMESTAMP NULL,
    `notes` TEXT,
    `redeemed` TINYINT(1) DEFAULT 0,
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `gift_card`
    ADD CONSTRAINT `gift_card_campaign`
    FOREIGN KEY (`gift_card_campaign_id`) REFERENCES `gift_card_campaign` (`id`);
