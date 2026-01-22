<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $sqlPath = database_path('sql/gift_card.sql'); // Adjust path as needed
        DB::unprepared(file_get_contents($sqlPath));
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gift_card');
        Schema::dropIfExists('gift_card_campaign');
    }
};
