<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

#[Middleware(['guest:web', 'auth:web'], except: ['logout'])]
class LoginController extends Controller
{
    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/'; // Значение по умолчанию

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // Конструктор остается пустым
    }

    /**
     * Переопределяем поле, которое используется для логина.
     *
     * @return string
     */
    public function username()
    {
        return 'login';
    }

    /**
     * Переопределяем логику авторизации, чтобы поддерживать логин по username или email.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    protected function credentials(Request $request)
    {
        $login = $request->input('login');
        $field = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        return [
            $field => $login,
            'password' => $request->input('password'),
        ];
    }

    /**
     * Переопределяем валидацию, чтобы использовать поле "login".
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    protected function validateLogin(Request $request)
    {
        $request->validate([
            'login' => 'required|string|max:50',
            'password' => 'required|string|max:50',
        ]);
    }

    /**
     * Переопределяем метод отправки ответа при неудачной авторизации.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $errors
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function sendFailedLoginResponse(Request $request)
    {
        $request->session()->flash('show_login_form', true);

        return redirect()->back()
            ->withInput($request->only('login'))
            ->withErrors([
                'login' => $this->getFailedLoginMessage($request),
            ]);
    }

    /**
     * Получаем сообщение об ошибке авторизации.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    protected function getFailedLoginMessage(Request $request)
    {
        $login = $request->input('login');
        $field = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        $user = \App\Models\User::where($field, $login)->first();

        if (!$user) {
            return 'User not found with this username or email.';
        }

        return 'The password is incorrect.';
    }

    /**
     * Переопределяем редирект после успешного логина.
     *
     * @return string
     */
    protected function redirectTo()
    {
        // Используем request() для доступа к текущему запросу
        $intended = request()->input('intended') ?: session()->pull('url.intended', $this->redirectTo);
        return $intended;
    }

    /**
     * Переопределяем метод логаута, чтобы указать редирект на главную страницу.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logout(Request $request)
    {
        $this->guard()->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/'); // Редирект на главную страницу после выхода
    }

    /**
     * Переопределяем метод отображения формы логина.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function showLoginForm()
    {
        return redirect('/');
    }
}