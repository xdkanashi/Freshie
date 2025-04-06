<?php

namespace App\Http\Controllers;

use App\Models\Clothes; // Модель для работы с товарами
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Отображение страницы товара.
     */
    public function show($id)
    {
        $item = Clothes::findOrFail($id);

        // Получение предыдущего и следующего товара
        $prevProduct = Clothes::where('id', '<', $id)->orderBy('id', 'desc')->first();
        $nextProduct = Clothes::where('id', '>', $id)->orderBy('id', 'asc')->first();

        // Получение связанных товаров (по категории)
        $relatedItems = Clothes::where('category', $item->category)
            ->where('id', '!=', $id)
            ->take(3)
            ->get();

        return view('product', compact('item', 'relatedItems', 'prevProduct', 'nextProduct'));
    }
}
