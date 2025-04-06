<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CheckoutController;


Auth::routes([
    'register' => true, // Ensure registration is enabled
    'login' => true,    // Ensure login is enabled
    'reset' => false,   // Disable password reset if not needed
]);

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile/update', [ProfileController::class, 'updateProfile'])->name('profile.update');
    Route::get('/profile/password', [ProfileController::class, 'showChangePasswordForm'])->name('profile.password');
    Route::patch('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password.update');
    Route::get('/profile/orders', [ProfileController::class, 'orders'])->name('profile.orders');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/checkout', [CheckoutController::class, 'show'])->name('checkout.show');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
    // Другие маршруты...
});

Route::post('/logout', [LogoutController::class, 'logout'])->name('logout')->middleware('auth');

Route::post('/leaderboard', [LeaderboardController::class, 'store']);
Route::get('/leaderboard', [LeaderboardController::class, 'leaderboard']);



// Маршрут для отображения страницы контактов
Route::get('/contact', [ContactController::class, 'show'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');


Route::get('/', [PageController::class, 'index'])->name('home');
Route::get('/collections', [CollectionController::class, 'index'])->name('collections');

Route::get('/product/{id}', [ProductController::class, 'show'])->name('product');
Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
Route::post('/cart/update', [CartController::class, 'update'])->name('cart.update');
Route::post('/cart/remove', [CartController::class, 'remove'])->name('cart.remove');
Route::get('/cart/get', [CartController::class, 'get'])->name('cart.get');

Route::get('/lookbook', [PageController::class, 'lookbook'])->name('lookbook');
Route::get('/return-policy', [PageController::class, 'return'])->name('return-policy');
Route::get('/refund-policy', [PageController::class, 'refund'])->name('refund-policy');
Route::get('/terms-of-service', [PageController::class, 'terms'])->name('terms-of-service');
Route::get('/privacy-policy', [PageController::class, 'privacy'])->name('privacy-policy');
Route::get('/pre-order-status', [PageController::class, 'preorder'])->name('pre-order-status');
Route::get('/shipping', [PageController::class, 'shipping'])->name('shipping');

Route::get('/games', [PageController::class, 'games'])->name('games');
Route::get('/games/gogo-game', [GameController::class, 'gogogame'])->name('gogo-game');
Route::post('/submit-score', [GameController::class, 'submitScore'])->name('submitScore');

Route::get('/blockstack-game', [PageController::class, 'blockstackgame'])->name('blockstack-game');
Route::get('/bendy-game', [PageController::class, 'bendygame'])->name('bendy-game');