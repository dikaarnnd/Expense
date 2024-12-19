<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'emoji' => '🏠',
                'name' => 'Housing',
            ],
            [
                'emoji' => '📚',
                'name' => 'Education',
            ],
            [
                'emoji' => '🧳',
                'name' => 'Travel',
            ],
            [
                'emoji' => '🚗',
                'name' => 'Transportation',
            ],
            [
                'emoji' => '📳',
                'name' => 'Transfer',
            ],
            [
                'emoji' => '🧃',
                'name' => 'Groceries',
            ],
            [
                'emoji' => '🍔',
                'name' => 'Food',
            ],
            [
                'emoji' => '🛠️',
                'name' => 'Repairs',
            ],
            [
                'emoji' => '🕹️',
                'name' => 'Gadgets',
            ],
            [
                'emoji' => '🎬',
                'name' => 'Entertainment',
            ],
            [
                'emoji' => '🛍️',
                'name' => 'Shopping',
            ],
            [
                'emoji' => '📑',
                'name' => 'Subscriptions',
            ],
            [
                'emoji' => '💪',
                'name' => 'Health & Fitness',
            ],
            [
                'emoji' => '📱',
                'name' => 'Phone & Internet',
            ],
            [
                'emoji' => '🛒',
                'name' => 'Online Shop',
            ],
        ]);
    }
}
