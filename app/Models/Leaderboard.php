<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Leaderboard extends Model
{
    protected $table = 'leaderboard';
    protected $fillable = ['user_id', 'score'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}