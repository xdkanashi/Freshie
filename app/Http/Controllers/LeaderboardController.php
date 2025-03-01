<?php

namespace App\Http\Controllers;

use App\Models\Leaderboard;
use Illuminate\Http\Request;

class LeaderboardController extends Controller
{
    public function index()
    {
        $leaderboard = Leaderboard::orderBy('score', 'desc')
            ->take(10)
            ->get(['nickname', 'score']);
        return response()->json($leaderboard);
    }

    public function save(Request $request)
    {
        \Log::info("Получен запрос сохранения:", $request->all());

        try {
            $request->validate([
                'nickname' => 'required|string|max:20',
                'score' => 'required|integer|min:0',
            ]);

            $nickname = $request->input('nickname');
            $score = $request->input('score');

            $entry = Leaderboard::where('nickname', $nickname)->first();

            if ($entry) {
                if ($entry->score < $score) {
                    $entry->update([
                        'score' => $score,
                        'updated_at' => now(),
                    ]);
                    \Log::info("Обновлена запись:", ['nickname' => $nickname, 'score' => $score]);
                }
            } else {
                Leaderboard::create(['nickname' => $nickname, 'score' => $score]);
                \Log::info("Создана запись:", ['nickname' => $nickname, 'score' => $score]);
            }

            $leaderboard = Leaderboard::orderBy('score', 'desc')->take(10)->get(['nickname', 'score']);
            return response()->json($leaderboard);
        } catch (\Exception $e) {
            \Log::error("Ошибка в save:", ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}