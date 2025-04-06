<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckIfAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            // Если пользователь не авторизован, перенаправляем на главную страницу
            return redirect('/');
        }

        if (Auth::user()->is_admin !== 1) {
            // Если пользователь не администратор, возвращаем ошибку 403
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}