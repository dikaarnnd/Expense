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
        Schema::create('balances', function (Blueprint $table) {
            $table->id('balance_id'); // Kolom ID primary key
            $table->bigInteger('setBalance'); // Kolom setBalance
            $table->enum('plan_date', ['monthly', 'custom']); // Kolom plan_date sebagai enum
            $table->date('start_date'); // Kolom start_date
            $table->date('end_date'); // Kolom end_date
            $table->integer('user_id'); // Kolom foreign key untuk id user
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); // Foreign key constraint
            $table->timestamps(); // Kolom created_at dan updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('balances');
    }
};
