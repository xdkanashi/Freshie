<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Leaderboard;

class GameController extends Controller
{
    /**
     * Show the game page.
     */
    public function gogogame()
    {
        $user = Auth::user();

        // Skip all checks for unauthenticated users
        if (!$user) {
            return view('games.gogo-game'); // Return the view without restrictions or errors
        }

        // Check if the game limit is enabled for the user
        if ($user->game_limit_enabled) {
            $nextGameTime = $user->next_game_time;

            if ($nextGameTime && strtotime($nextGameTime) > time()) {
                // Calculate remaining time until the next game
                $remainingTime = $this->timeDiff($nextGameTime, now());
                return view('games.gogo-game')->with('error', "You've reached your play limit for today! Next game available in {$remainingTime}.");
            }
        }

        return $this->playGame(); // Allow to play the game
    }

    /**
     * Handle score submission and update game limit.
     */
    public function submitScore(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Authentication required to save scores.'], 401);
        }

        $score = $request->input('score', 0);

        // If score is 0, don't count as a game session
        if ($score <= 0) {
            return response()->json(['success' => false, 'message' => 'No points earned. This attempt wasn\'t counted - you can try again!']);
        }

        // Save points to the leaderboard
        Leaderboard::updateOrCreate(
            ['user_id' => $user->id],
            ['score' => $score]
        );

        // If limit is enabled, update last game time and next available game time
        if ($user->game_limit_enabled) {
            $user->last_game_played_at = now();
            $user->next_game_time = now()->addHours($user->game_interval_hours);
            $user->save();

            $remainingTime = $this->timeDiff($user->next_game_time, now());
            return response()->json([
                'success' => true,
                'message' => "Great job! You scored {$score} points. Your next game will be available in {$remainingTime}.",
                'next_game_time' => $user->next_game_time->format('Y-m-d H:i:s'),
                'limit_enabled' => true
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => "Congratulations! You scored {$score} points. Feel free to play again!",
            'limit_enabled' => false
        ]);
    }

    /**
     * Show the game view.
     */
    private function playGame()
    {
        return view('games.gogo-game');
    }

    /**
     * Admin function to enable/disable the game limit for users.
     */
    public function toggleGameLimit(Request $request, $userId)
    {
        $user = Auth::user();
        if (!$user->is_admin) {
            return redirect()->route('gogo-game')->with('error', 'Administrator privileges required for this action.');
        }

        $targetUser = User::find($userId);
        if (!$targetUser) {
            return redirect()->route('gogo-game')->with('error', 'User not found in the database.');
        }

        $gameLimitStatus = $request->input('game_limit_enabled', true);
        $targetUser->game_limit_enabled = $gameLimitStatus;

        if (!$gameLimitStatus) {
            $targetUser->next_game_time = null;
        }

        $gameInterval = $request->input('game_interval_hours', 24);
        $targetUser->game_interval_hours = $gameInterval;

        $targetUser->save();

        $statusText = $gameLimitStatus ? 'enabled' : 'disabled';
        return redirect()->route('gogo-game')->with('success', "Game limit {$statusText} successfully for user {$targetUser->name}.");
    }

    /**
     * Admin function to reset the user's game timer.
     */
    public function resetGameTimer(Request $request, $userId)
    {
        $user = Auth::user();
        if (!$user->is_admin) {
            return redirect()->route('gogo-game')->with('error', 'Administrator privileges required for this action.');
        }

        $targetUser = User::find($userId);
        if (!$targetUser) {
            return redirect()->route('gogo-game')->with('error', 'User not found in the database.');
        }

        $targetUser->next_game_time = null;
        $targetUser->save();

        return redirect()->route('gogo-game')->with('success', "Game timer for {$targetUser->name} has been reset. They can play immediately.");
    }

    /**
     * Admin function to update the game score and last played time.
     */
    public function updateScoreAndGameTime(Request $request, $userId, $score)
    {
        $user = Auth::user();
        if (!$user->is_admin) {
            return redirect()->route('gogo-game')->with('error', 'Administrator privileges required for this action.');
        }

        $targetUser = User::find($userId);
        if (!$targetUser) {
            return redirect()->route('gogo-game')->with('error', 'User not found in the database.');
        }

        Leaderboard::updateOrCreate(
            ['user_id' => $targetUser->id],
            ['score' => $score]
        );

        $targetUser->last_game_played_at = now();
        $targetUser->save();

        return redirect()->route('gogo-game')->with('success', "Score for {$targetUser->name} updated to {$score} points and play time recorded.");
    }

    /**
     * Calculate the remaining time difference.
     */
    private function timeDiff($time1, $time2)
    {
        $time1 = strtotime($time1);
        $time2 = strtotime($time2);

        $diff = $time1 - $time2;
        $hours = floor($diff / 3600);
        $minutes = floor(($diff % 3600) / 60);
        $seconds = $diff % 60;

        return "{$hours} hours, {$minutes} minutes, {$seconds} seconds";
    }
}