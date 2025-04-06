<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function show()
    {
        // Предполагаем, что у вас есть модель Cart или сессия для хранения корзины
        $cartItems = Auth::user()->cartItems; // Замените на вашу логику получения корзины
        return view('checkout', compact('cartItems'));
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'full_name' => 'required|string|max:100',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
            'payment_method' => 'required|in:credit_card,paypal,cash_on_delivery',
        ]);

        // Логика сохранения заказа
        // Например, создание записи в таблице orders
        $order = Auth::user()->orders()->create([
            'full_name' => $validatedData['full_name'],
            'address' => $validatedData['address'],
            'city' => $validatedData['city'],
            'postal_code' => $validatedData['postal_code'],
            'payment_method' => $validatedData['payment_method'],
            'total' => $request->user()->cartItems->sum(fn($item) => $item->product->price * $item->quantity),
        ]);

        // Привяжите товары к заказу (если есть таблица order_items)
        foreach ($request->user()->cartItems as $item) {
            $order->items()->create([
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->product->price,
            ]);
        }

        // Очистите корзину после оформления заказа
        $request->user()->cartItems()->delete();

        return redirect()->route('profile.orders')->with('success', 'Order placed successfully!');
    }
}