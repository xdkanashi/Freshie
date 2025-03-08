<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PageController;
use App\Http\Controllers\LeaderboardController;




// Переопределяем маршруты для логина и регистрации, чтобы они вели на /auth
Route::get('/login', function () {
    return redirect()->route('auth');
})->name('login');

Route::get('/register', function () {
    return redirect()->route('auth');
})->name('register');

// Маршрут для страницы /auth
Route::get('/auth', function () {
    return view('auth');
})->name('auth');

Auth::routes();

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

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
