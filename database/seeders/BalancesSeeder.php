<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BalancesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('balances')->insert([
            [
                'setBalance' => 5000000, // Jumlah balance
                'plan_date' => 'custom', // Plan date
                'start_date' => Carbon::now()->startOfMonth(), // Awal bulan ini
                'end_date' => Carbon::now()->addDays(30), // 30 hari ke depan
                'user_id' => 1, // ID user
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // [
            //     'setBalance' => 5000000, // Jumlah balance
            //     'plan_date' => 'monthly', // Plan date
            //     'start_date' => Carbon::now()->startOfMonth(), // Awal bulan ini
            //     'end_date' => Carbon::now()->addDays(30), // 30 hari ke depan
            //     'user_id' => 4, // ID user
            //     'created_at' => now(),
            //     'updated_at' => now(),
            // ],
        ]);
    }
}
