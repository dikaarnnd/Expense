<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExpensesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('expenses')->insert([
            [
                'user_id' => 1,
                'category_id' => 2,
                'blc_id' => 1,
                'price' => 12000,
                'buyDate' => '2024-12-31',
                'notes' => 'woii'
            ],
            [
                'user_id' => 1,
                'category_id' => 3,
                'blc_id' => 1,
                'price' => 25000,
                'buyDate' => '2024-12-31',
                'notes' => 'Pembelian buku'
            ],
            [
                'user_id' => 1,
                'category_id' => 1,
                'blc_id' => 1,
                'price' => 50000,
                'buyDate' => '2024-12-31',
                'notes' => 'Cemilan sore'
            ],
            [
                'user_id' => 1,
                'category_id' => 4,
                'blc_id' => 1,
                'price' => 30000,
                'buyDate' => '2024-12-30',
                'notes' => 'Transportasi'
            ],
            [
                'user_id' => 1,
                'category_id' => 2,
                'blc_id' => 1,
                'price' => 15000,
                'buyDate' => '2024-12-30',
                'notes' => 'Kopi pagi'
            ],
            [
                'user_id' => 1,
                'category_id' => 5,
                'blc_id' => 1,
                'price' => 60000,
                'buyDate' => '2024-12-29',
                'notes' => 'Hadiah ulang tahun'
            ],
            [
                'user_id' => 1,
                'category_id' => 3,
                'blc_id' => 1,
                'price' => 45000,
                'buyDate' => '2024-12-24',
                'notes' => 'Langganan aplikasi'
            ],
            [
                'user_id' => 1,
                'category_id' => 4,
                'blc_id' => 1,
                'price' => 10000,
                'buyDate' => '2024-12-24',
                'notes' => 'Parkir'
            ],
            [
                'user_id' => 1,
                'category_id' => 1,
                'blc_id' => 1,
                'price' => 75000,
                'buyDate' => '2024-12-23',
                'notes' => 'Belanja mingguan'
            ],
            [
                'user_id' => 1,
                'category_id' => 5,
                'blc_id' => 1,
                'price' => 120000,
                'buyDate' => '2024-12-23',
                'notes' => 'Perbaikan sepeda'
            ],
            [
                'user_id' => 1,
                'category_id' => 2,
                'blc_id' => 1,
                'price' => 20000,
                'buyDate' => '2024-12-22',
                'notes' => 'Jajan pasar'
            ],
        ]);
    }
}
