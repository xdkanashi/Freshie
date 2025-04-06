<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clothes extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'description',
        'price',
        'is_sold_out',
        'size',
        'pre_order',
        'discount'
    ];

    public function clothesImages()
    {
        return $this->hasMany(ClothesImage::class);
    }
}
