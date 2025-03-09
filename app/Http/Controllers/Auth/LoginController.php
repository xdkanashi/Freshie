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
    protected $redirectTo = '/'; // Перенаправляем на главную страницу

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // Конструктор теперь пустой, так как middleware определены атрибутами
    }

    /**
     * Переопределяем поле, которое используется для логина.
     *
     * @return string
     */
    public function username()
    {
        return 'login'; // Указываем, что поле в форме называется "login"
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
        // Добавляем флаг в сессию, чтобы открыть форму после перезагрузки
        $request->session()->flash('show_login_form', true);

        // Возвращаем redirect с ошибками
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

        // Проверяем, существует ли пользователь
        $user = \App\Models\User::where($field, $login)->first();

        if (!$user) {
            return 'User not found with this username or email.';
        }

        return 'The password is incorrect.';
    }
}