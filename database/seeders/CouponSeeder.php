<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Coupon;

class CouponSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Проверяем, существует ли уже такой купон в базе
        $coupon = Coupon::where('coupon_code', 'SPRINGSALE-2025')->first();

        if (!$coupon) {
            Coupon::create([
                'coupon_code' => 'SPRINGSALE-2025',
                'discount_percentage' => 20,
                'description' => 'Spring sale - 20% off all items',
                'valid_from' => now()->startOfMonth(),
                'valid_until' => now()->endOfMonth(),
                'is_active' => true,
                'min_order_amount' => 50.00,
                'usage_limit' => 100,
            ]);
        }

        // Создаем случайные купоны
        Coupon::factory()->count(10)->create();
    }
}
