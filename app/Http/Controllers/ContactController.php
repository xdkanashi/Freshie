<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        // Валидация данных
        $request->validate([
            'name' => 'required|string|max:50',
            'phone' => 'nullable|string|max:15',
            'subject' => 'required|string|max:50',
            'email' => 'required|email|max:50',
            'comment' => 'nullable|string',
        ]);

        try {
            // Сохранение данных в базу
            Contact::create([
                'name' => $request->name,
                'phone' => $request->phone,
                'subject' => $request->subject,
                'email' => $request->email,
                'comment' => $request->comment,
            ]);

            // Уведомление об успешном отправлении
            session()->flash('success', 'Your message has been sent!');
        } catch (\Exception $e) {
            // Обработка ошибок
            session()->flash('error', 'There was an error while sending your message. Please try again later.');
        }

        // Перенаправление обратно на страницу контактов
        return redirect()->route('contact');
    }

    public function show()
    {
        return view('contact');  // Убедитесь, что у вас есть Blade-шаблон с именем contact.blade.php
    }

}
