DROP TABLE IF EXISTS suppliers;

CREATE TABLE suppliers (
    `supplier_id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `supplier_name` VARCHAR(100) NOT NULL,
    `contact_name` VARCHAR(100),
    `phone` VARCHAR(20),
    `email` VARCHAR(100),
    `address` TEXT,
    `notes` TEXT,
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
