<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('coupon_code')->unique();
            $table->enum('coupon_type', ['percentage', 'fixed']); // Тип купона: процент или фиксированная сумма
            $table->decimal('discount_percentage', 5, 2)->nullable(); // Скидка в процентах
            $table->decimal('delivery_discount_amount', 10, 2)->nullable(); // Скидка на доставку
            $table->bigInteger('free_item_id')->nullable(); // ID товара для бесплатного товара (если есть)
            $table->boolean('is_active')->default(true); // Активен ли купон
            $table->date('valid_from')->nullable(); // Дата начала действия купона
            $table->date('valid_until')->nullable(); // Дата окончания действия купона
            $table->decimal('min_order_amount', 10, 2)->nullable(); // Добавление колонки min_order_amount
            $table->integer('usage_limit')->nullable(); // Лимит использования купона (если есть)
            $table->text('description')->nullable(); // Описание купона
            $table->integer('usage_count')->default(0); // Счётчик использования купона
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('coupons');
    }
};
