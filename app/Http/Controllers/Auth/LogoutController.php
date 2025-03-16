<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logout(Request $request)
    {
        Auth::logout();

        // Сохраняем текущий URL в сессии перед выходом
        $request->session()->put('url.intended', url()->previous());

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->intended(url()->previous());
    }
}