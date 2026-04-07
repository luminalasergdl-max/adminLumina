DROP TABLE IF EXISTS `appointment`;


CREATE TABLE `appointment` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `customer_id` INT UNSIGNED NULL,
    
    -- Fechas de inicio y fin (separadas)
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    
    -- Horas de inicio y fin (separadas)
    `start_time` TIME NOT NULL,
    `end_time` TIME NOT NULL,
    
    -- Identificadores y Estados
    `google_calendar_event_id` VARCHAR(255) NULL,
    `is_blocked` TINYINT(1) NOT NULL DEFAULT 0,
    `whatsapp_reminder_sent` TINYINT(1) NOT NULL DEFAULT 0,
    
    -- Auditoría
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,

    -- Llave Foránea
    CONSTRAINT `fk_appointments_customer` 
        FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) 
        ON DELETE SET NULL,

    -- Índices de Rendimiento
    INDEX `idx_date_range` (`start_date`, `end_date`),
    INDEX `idx_google_event` (`google_calendar_event_id`),
    INDEX `idx_reminder_status` (`whatsapp_reminder_sent`, `start_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

