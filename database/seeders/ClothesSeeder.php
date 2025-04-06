<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Clothes;
use App\Models\ClothesImage;

class ClothesSeeder extends Seeder
{
    public function run(): void
    {
        $clothes = [
            [
                'name' => 'T Shirt',
                'category' => 'Tees',
                'description' => 'A classic oversized T-shirt with a comfortable fit, perfect for everyday wear.',
                'price' => 35.00,
                'is_sold_out' => false,
                'size' => 'M',
                'pre_order' => false,
                'discount' => 0.00,
                'images' => ['BOXY_FIT_TEE_FRONT.webp']
            ],
            [
                'name' => 'T Jordan',
                'category' => 'Sneakers',
                'description' => 'Limited edition Jordan sneakers with premium materials and outstanding comfort.',
                'price' => 205.00,
                'is_sold_out' => true,
                'size' => '42',
                'pre_order' => true,
                'discount' => 10.00,
                'images' => ['PREMIUM_9.webp']
            ],
            [
                'name' => 'T Flared Sweats',
                'category' => 'Flared Sweats',
                'description' => 'Stylish and comfortable flared sweatpants, ideal for casual and sporty looks.',
                'price' => 75.00,
                'is_sold_out' => false,
                'size' => 'L',
                'pre_order' => false,
                'discount' => 0.00,
                'images' => ['FRONTFLAREDSWEATPANTS.webp']
            ],
            [
                'name' => 'T Bandana',
                'category' => 'Bandana',
                'description' => 'A stylish and lightweight bandana, a perfect accessory for any outfit.',
                'price' => 15.00,
                'is_sold_out' => false,
                'size' => 'One Size',
                'pre_order' => false,
                'discount' => 5.00,
                'images' => ['PREMIUM_10.webp']
            ],
            [
                'name' => 'T Zip Up Hoodie',
                'category' => 'Hoodies',
                'description' => 'Cozy and stylish zip-up hoodie with a modern design, ideal for layering.',
                'price' => 55.00,
                'is_sold_out' => false,
                'size' => 'M',
                'pre_order' => true,
                'discount' => 15.00,
                'images' => ['ZIPHOODIEFRONT.webp']
            ],
            [
                'name' => 'Ski Mask',
                'category' => 'Accessories',
                'description' => 'A warm and protective ski mask, perfect for cold weather or streetwear styling.',
                'price' => 45.00,
                'is_sold_out' => false,
                'size' => 'One Size',
                'pre_order' => false,
                'discount' => 0.00,
                'images' => ['93wi6o.webp']
            ],
        ];

        foreach ($clothes as $item) {
            $clothesItem = Clothes::create([
                'name' => $item['name'],
                'category' => $item['category'],
                'description' => $item['description'],
                'price' => $item['price'],
                'is_sold_out' => $item['is_sold_out'],
                'size' => $item['size'],
                'pre_order' => $item['pre_order'],
                'discount' => $item['discount'],
            ]);

            foreach ($item['images'] as $image) {
                ClothesImage::create([
                    'clothes_id' => $clothesItem->id,
                    'image' => 'clothes-images/' . $image,
                ]);
            }
        }
    }
}
