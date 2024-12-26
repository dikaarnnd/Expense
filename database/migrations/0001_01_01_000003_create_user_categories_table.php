<?php

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
        Schema::create('user_categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Kolom foreign key untuk id user
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); // Foreign key constraint
            $table->unsignedBigInteger('category_id'); // Kolom foreign key untuk id kategori
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade'); // Foreign key constraint
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_categories');
    }
};
