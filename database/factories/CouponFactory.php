<?php

namespace Database\Factories;

use App\Models\Coupon;
use Illuminate\Database\Eloquent\Factories\Factory;

class CouponFactory extends Factory
{
    protected $model = Coupon::class;

    public function definition()
    {
        return [
            'coupon_code' => strtoupper($this->faker->bothify('????-#####')), // Генерация случайного кода купона
            'coupon_type' => $this->faker->randomElement(['percentage', 'fixed']), // Тип купона (percentage или fixed)
            'discount_percentage' => $this->faker->optional()->numberBetween(5, 50), // Скидка от 5 до 50%, может быть пустым
            'delivery_discount_amount' => $this->faker->optional()->randomFloat(2, 5, 50), // Скидка на доставку, может быть пустым
            'free_item_id' => $this->faker->optional()->numberBetween(1, 100), // ID бесплатного товара, может быть пустым
            'is_active' => $this->faker->boolean(), // Активность купона
            'valid_from' => $this->faker->date(), // Дата начала действия
            'valid_until' => $this->faker->date(), // Дата окончания действия
            'min_order_amount' => $this->faker->optional()->randomFloat(2, 10, 100), // Минимальная сумма заказа
            'usage_limit' => $this->faker->optional()->numberBetween(1, 100), // Лимит использования купона
            'description' => $this->faker->optional()->sentence(), // Описание купона
            'usage_count' => $this->faker->numberBetween(0, 10), // Счётчик использования купона
        ];
    }
}

