<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\LoginController;

Auth::routes([
    'register' => true, // Ensure registration is enabled
    'login' => true,   // Ensure login is enabled
    'reset' => false,  // Disable password reset if not needed
]);

Route::get('/leaderboard', [LeaderboardController::class, 'index']);
Route::post('/leaderboard/save', [LeaderboardController::class, 'save']);
Route::get('/', [PageController::class, 'index'])->name('home');
Route::get('/collections', [PageController::class, 'collections'])->name('collections');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');
Route::get('/lookbook', [PageController::class, 'lookbook'])->name('lookbook');
Route::get('/return-policy', [PageController::class, 'return'])->name('return-policy');
Route::get('/refund-policy', [PageController::class, 'refund'])->name('refund-policy');
Route::get('/terms-of-service', [PageController::class, 'terms'])->name('terms-of-service');
Route::get('/privacy-policy', [PageController::class, 'privacy'])->name('privacy-policy');
Route::get('/pre-order-status', [PageController::class, 'preorder'])->name('pre-order-status');