<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\Auth\LogoutController;

Auth::routes([
    'register' => true, // Ensure registration is enabled
    'login' => true,    // Ensure login is enabled
    'reset' => false,   // Disable password reset if not needed
]);

Route::post('/logout', [LogoutController::class, 'logout'])->name('logout')->middleware('auth');

Route::post('/leaderboard', [LeaderboardController::class, 'store']);
Route::get('/leaderboard', [LeaderboardController::class, 'leaderboard']);

Route::get('/', [PageController::class, 'index'])->name('home');
Route::get('/collections', [PageController::class, 'collections'])->name('collections');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');
Route::get('/lookbook', [PageController::class, 'lookbook'])->name('lookbook');
Route::get('/return-policy', [PageController::class, 'return'])->name('return-policy');
Route::get('/refund-policy', [PageController::class, 'refund'])->name('refund-policy');
Route::get('/terms-of-service', [PageController::class, 'terms'])->name('terms-of-service');
Route::get('/privacy-policy', [PageController::class, 'privacy'])->name('privacy-policy');
Route::get('/pre-order-status', [PageController::class, 'preorder'])->name('pre-order-status');
Route::get('/shipping', [PageController::class, 'shipping'])->name('shipping');

Route::get('/games', [PageController::class, 'games'])->name('games');
Route::get('/gogo-game', [PageController::class, 'gogogame'])->name('gogo-game');
Route::get('/blockstack-game', [PageController::class, 'blockstackgame'])->name('blockstack-game');
Route::get('/bendy-game', [PageController::class, 'bendygame'])->name('bendy-game');