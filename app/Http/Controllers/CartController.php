<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Clothe;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    public function add(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Please login to add items to cart']);
        }

        $clotheId = $request->input('clothe_id');
        $size = $request->input('size');
        $quantity = $request->input('quantity', 1);

        $cartItem = Cart::where('user_id', $user->id)
            ->where('clothe_id', $clotheId)
            ->where('size', $size)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $quantity;
            $cartItem->save();
        } else {
            Cart::create([
                'user_id' => $user->id,
                'clothe_id' => $clotheId,
                'size' => $size,
                'quantity' => $quantity,
            ]);
        }

        return response()->json(['success' => true, 'message' => 'Item added to cart']);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Please login to update cart']);
        }

        $cartItemId = $request->input('cart_item_id');
        $quantity = $request->input('quantity');

        $cartItem = Cart::where('id', $cartItemId)
            ->where('user_id', $user->id)
            ->first();

        if (!$cartItem) {
            return response()->json(['success' => false, 'message' => 'Item not found in cart']);
        }

        if ($quantity <= 0) {
            $cartItem->delete();
        } else {
            $cartItem->quantity = $quantity;
            $cartItem->save();
        }

        return response()->json(['success' => true, 'message' => 'Cart updated']);
    }

    public function remove(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Please login to remove items from cart']);
        }

        $cartItemId = $request->input('cart_item_id');

        $cartItem = Cart::where('id', $cartItemId)
            ->where('user_id', $user->id)
            ->first();

        if ($cartItem) {
            $cartItem->delete();
            return response()->json(['success' => true, 'message' => 'Item removed from cart']);
        }

        return response()->json(['success' => false, 'message' => 'Item not found in cart']);
    }

    public function get()
    {
        try {
            $user = Auth::user();
            if (!$user) {
                Log::info('User not authenticated');
                return response()->json(['success' => false, 'items' => [], 'total' => 0]);
            }

            Log::info('Fetching cart for user ID: ' . $user->id);
            $cartItems = Cart::where('user_id', $user->id)
                ->with('clothe.clothesImages')
                ->get();
            Log::info('Cart items fetched: ' . $cartItems->count());

            $items = $cartItems->map(function ($item) {
                $clothe = $item->clothe;
                if (!$clothe) {
                    Log::warning('Clothe not found for cart item ID: ' . $item->id);
                    return null;
                }

                // Приводим price и discount к числу
                $price = (float) ($clothe->price ?? 0);
                $discount = (float) ($clothe->discount ?? 0);

                // Вычисляем цену с учётом скидки напрямую
                $discountedPrice = $discount > 0 ? $price * (1 - $discount / 100) : $price;

                return [
                    'id' => $item->id,
                    'clothe_id' => $clothe->id,
                    'name' => $clothe->name,
                    'price' => $price,
                    'discount' => $discount,
                    'image' => $clothe->clothesImages->first() ? asset('storage/' . $clothe->clothesImages->first()->image) : '',
                    'size' => $item->size,
                    'quantity' => $item->quantity,
                    'subtotal' => $discountedPrice * $item->quantity,
                ];
            })->filter();

            $total = $items->sum('subtotal');

            return response()->json([
                'success' => true,
                'items' => $items,
                'total' => $total,
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching cart: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Error loading cart'], 500);
        }
    }
}