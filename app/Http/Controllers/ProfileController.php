<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;

class ProfileController extends Controller
{
    public function show()
    {
        return view('profile.profile', ['user' => Auth::user()]);
    }

    public function edit()
    {
        return view('profile.edit', ['user' => Auth::user()]);
    }

    // Update only username and email
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $validatedData = $request->validate([
            'username' => 'required|string|max:50|unique:users,username,' . $user->id,
            'email' => 'required|string|email|max:50|unique:users,email,' . $user->id,
        ]);

        $user->update([
            'username' => $validatedData['username'],
            'email' => $validatedData['email'],
        ]);

        return redirect()->route('profile.show')->with('success', 'Profile updated successfully');
    }

    public function showChangePasswordForm()
    {
        return view('profile.password');
    }

    // Update only password
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    if (!Hash::check($value, Auth::user()->password)) {
                        $fail('The current password is incorrect.');
                    }
                }
            ],
            'password' => [
                'required',
                'string',
                'min:6',
                'confirmed',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
            ],
        ], [
            'password.regex' => 'The password must contain at least one uppercase letter and one number.',
        ]);

        $user = Auth::user();
        $user->password = Hash::make($request->password);
        $user->save();

        return redirect()->route('profile.show')->with('success', 'Password updated successfully');
    }

    public function orders()
    {
        $orders = Order::orderBy('created_at', 'desc')->take(5)->get();
        return view('profile.orders', compact('orders'));
    }
}