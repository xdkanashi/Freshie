<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'cart';
    protected $fillable = ['user_id', 'clothe_id', 'size', 'quantity'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function clothe()
    {
        return $this->belongsTo(Clothes::class, 'clothe_id');
    }
}