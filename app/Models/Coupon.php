<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = ['coupon_code', 'discount_percentage', 'description'];

    // В модели Coupon
    public function freeItem()
    {
        return $this->belongsTo(Clothes::class, 'free_item_id');
    }

}

