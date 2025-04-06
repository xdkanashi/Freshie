<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class OrdersTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 23) as $index) {
            DB::table('orders')->insert([
                'order_number' => 'ORD' . str_pad($index, 3, '0', STR_PAD_LEFT),
                'customer_name' => $faker->name,
                'status' => $faker->randomElement(['pending', 'processing', 'completed', 'canceled']),
                'notes' => $faker->sentence,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

