<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'is_admin',
        'game_limit_enabled',
        'game_interval_hours',
        'next_game_time',
        'last_game_played_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    // Проверка, может ли пользователь играть
    public function canPlayGame()
    {
        if (!$this->game_limit_enabled) {
            return true; // Если лимит не включен, можно играть всегда
        }

        if ($this->next_game_time && $this->next_game_time > now()) {
            return false; // Если время для игры ещё не наступило
        }

        return true; // Если лимит включен, а время наступило
    }

    // Метод для сброса таймера и установления нового времени игры
    public function resetGameTimer()
    {
        $this->next_game_time = now()->addHours($this->game_interval_hours); // Устанавливаем время по интервалу
        $this->save();
    }

    public function leaderboard()
    {
        return $this->hasMany(Leaderboard::class);
    }

    public function canAccessPanel(Panel $panel): bool
    {
        // Разрешаем доступ только пользователям с is_admin = 1
        return $this->is_admin === 1;
    }

}
