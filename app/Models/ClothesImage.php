<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ClothesImage extends Model
{
    use HasFactory;

    protected $fillable = ['clothes_id', 'image'];

    public function clothes()
    {
        return $this->belongsTo(Clothes::class);
    }

    public static function deleteImage($imageId)
    {
        $image = self::find($imageId);
        if ($image && Storage::exists('public/' . $image->image)) {
            Storage::delete('public/' . $image->image); // Удаляем файл с диска
            $image->delete(); // Удаляем запись из базы данных
        }
    }
}
