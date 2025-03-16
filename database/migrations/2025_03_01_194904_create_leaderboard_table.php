<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLeaderboardTable extends Migration
{
    public function up()
    {
        Schema::create('leaderboard', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->onDelete('cascade');
            $table->integer('score');
            $table->timestamps();
        });
    }
}