<?php

use Illuminate\Support\Facades\DB;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $sqlPath = database_path('sql/package.sql');
        DB::unprepared(file_get_contents($sqlPath));
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('ALTER TABLE `laser_session` DROP FOREIGN KEY `laser_session_package`;');
        DB::statement('ALTER TABLE `laser_session` DROP COLUMN `package_id`;');

        Schema::dropIfExists('package');

    }
};
