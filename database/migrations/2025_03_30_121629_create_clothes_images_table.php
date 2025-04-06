<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('clothes_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('clothes_id')->constrained()->onDelete('cascade'); // Связь с одеждой
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clothes_images');
    }
};
