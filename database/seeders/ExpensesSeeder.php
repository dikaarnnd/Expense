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
                'price' => 12000,
                'buyDate' => '2024-10-11',
                'notes' => 'woii'
            ],
            [
                'user_id' => 1,
                'category_id' => 3,
                'price' => 25000,
                'buyDate' => '2024-09-10',
                'notes' => 'Pembelian buku'
            ],
            [
                'user_id' => 1,
                'category_id' => 1,
                'price' => 50000,
                'buyDate' => '2024-11-15',
                'notes' => 'Cemilan sore'
            ],
            [
                'user_id' => 1,
                'category_id' => 4,
                'price' => 30000,
                'buyDate' => '2024-10-21',
                'notes' => 'Transportasi'
            ],
            [
                'user_id' => 1,
                'category_id' => 2,
                'price' => 15000,
                'buyDate' => '2024-08-17',
                'notes' => 'Kopi pagi'
            ],
            [
                'user_id' => 1,
                'category_id' => 5,
                'price' => 60000,
                'buyDate' => '2024-12-20',
                'notes' => 'Hadiah ulang tahun'
            ],
            [
                'user_id' => 1,
                'category_id' => 3,
                'price' => 45000,
                'buyDate' => '2024-09-30',
                'notes' => 'Langganan aplikasi'
            ],
            [
                'user_id' => 1,
                'category_id' => 4,
                'price' => 10000,
                'buyDate' => '2024-11-07',
                'notes' => 'Parkir'
            ],
            [
                'user_id' => 1,
                'category_id' => 1,
                'price' => 75000,
                'buyDate' => '2024-12-02',
                'notes' => 'Belanja mingguan'
            ],
            [
                'user_id' => 1,
                'category_id' => 5,
                'price' => 120000,
                'buyDate' => '2024-10-01',
                'notes' => 'Perbaikan sepeda'
            ],
            [
                'user_id' => 1,
                'category_id' => 2,
                'price' => 20000,
                'buyDate' => '2024-08-25',
                'notes' => 'Jajan pasar'
            ],
        ]);
    }
}
