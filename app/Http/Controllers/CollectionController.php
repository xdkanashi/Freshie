<?php

namespace App\Http\Controllers;

use App\Models\Clothes;
use Illuminate\Http\Request;

class CollectionController extends Controller
{
    public function index(Request $request)
    {
        // Начальная подготовка запроса
        $query = Clothes::query();

        // Фильтрация по статусу "Sold Out"
        if ($request->has('hide_sold_out') && $request->input('hide_sold_out') == 'true') {
            $query->where('is_sold_out', false); // Показываем только те, у которых is_sold_out = false
        }

        // Фильтрация по категории
        if ($request->has('category') && $request->input('category') != 'all') {
            $query->where('category', $request->input('category'));
        }

        // Получаем товары с примененными фильтрами
        $clothes = $query->with('clothesImages')->get(); // Загружаем также изображения для каждого товара

        // Получаем список категорий для фильтрации
        $categories = Clothes::select('category')->distinct()->get();

        // Передаем данные в представление
        return view('collections', compact('clothes', 'categories'));
    }
}


