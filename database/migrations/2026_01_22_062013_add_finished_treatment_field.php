<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement('ALTER TABLE `laser_treatment` ADD COLUMN `finished` TINYINT(1) DEFAULT 0;');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('ALTER TABLE `laser_treatment` DROP COLUMN `finished`;');
    }
};
