<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Leaderboard;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

class UserSeeder extends Seeder
{
    public function run(Faker $faker)
    {
        // Список зумерских слов и трендов для никнеймов
        $zoomerWords = [
            'skibidi',
            'ohio',
            'rizzler',
            'sigma',
            'alpha',
            'beta',
            'goat',
            'lit',
            'vibe',
            'flex',
            'drip',
            'slay',
            'yeet',
            'noob',
            'pro',
            'sus',
            'fam',
            'savage',
            'bussin',
            'cap',
            'nocap',
            'stan',
            'tea',
            'shade',
            'glow',
            'chill',
            'popoff',
            'woke',
            'pog',
            'poggers',
            'cringe',
            'based',
            'ratio',
            'L',
            'W',
            'mew',
            'gyatt',
            'fanum',
            'tax',
            'rizz',
            'ohmy',
            'griddy',
            'fortnite',
            'tiktok',
            'snap',
            'insta',
            'giga',
            'chad',
            'npc',
            'main',
            'side',
            'fyp',
            '4u',
            'bruh',
            'sheesh',
            'yolo',
            'swag'
        ];

        // Генерируем 101 нового пользователя, не трогая существующих
        for ($i = 0; $i < 101; $i++) {
            // Генерируем зумерский никнейм
            $randomWord1 = $zoomerWords[array_rand($zoomerWords)];
            $randomWord2 = $zoomerWords[array_rand($zoomerWords)];
            $randomNumber = rand(1, 999);
            $username = strtolower("{$randomWord1}_{$randomWord2}{$randomNumber}");

            // Проверяем уникальность никнейма
            while (User::where('username', $username)->exists()) {
                $randomNumber = rand(1, 999);
                $username = strtolower("{$randomWord1}_{$randomWord2}{$randomNumber}");
            }

            // Генерируем email
            $email = "{$username}@example.com";
            while (User::where('email', $email)->exists()) {
                $email = "{$username}" . rand(1, 999) . "@example.com";
            }

            // Создаём пользователя
            $user = User::create([
                'username' => $username,
                'email' => $email,
                'password' => Hash::make('password123'), // Пароль по умолчанию
                'is_admin' => 0, // Новые пользователи не админы
                'game_limit_enabled' => rand(0, 1),
                'last_game_played_at' => $faker->optional()->dateTimeThisYear(),
                'next_game_time' => $faker->optional()->dateTimeThisYear(),
                'game_interval_hours' => rand(12, 48),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Добавляем пользователя в leaderboard с случайным количеством очков (5-90)
            Leaderboard::create([
                'user_id' => $user->id,
                'score' => rand(5, 90),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}