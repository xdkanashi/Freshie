<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Leaderboard;
use Illuminate\Support\Facades\Auth;

class LeaderboardController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'score' => 'required|integer',
        ]);

        $user = Auth::user(); // Получаем текущего аутентифицированного пользователя

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Проверяем текущую запись пользователя
        $existingEntry = Leaderboard::where('user_id', $user->id)->first();

        if ($existingEntry) {
            // Если запись существует и новый результат больше, обновляем
            if ($request->score > $existingEntry->score) {
                $existingEntry->update([
                    'score' => $request->score,
                    'updated_at' => now(),
                ]);
                return response()->json(['message' => 'Score updated successfully'], 200);
            }
            return response()->json(['message' => 'Score not updated (lower or equal to current)'], 200);
        }

        // Если записи нет, используем upsert для вставки
        Leaderboard::upsert(
            [
                [
                    'user_id' => $user->id,
                    'score' => $request->score,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ],
            ['user_id'], // Уникальный ключ
            ['score', 'updated_at'] // Поля для обновления
        );

        return response()->json(['message' => 'Score saved successfully'], 200);
    }

    public function leaderboard()
    {
        // Получаем все записи из таблицы лидеров с сортировкой по убыванию очков
        $leaderboard = Leaderboard::with('user')
            ->orderBy('score', 'desc')
            ->get();

        // Передаем данные в представление
        return view('games.leaderboard', compact('leaderboard'));
    }

}