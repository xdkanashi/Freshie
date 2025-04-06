@extends('layouts.app')

@section('title', 'Change Password')
<link rel="stylesheet" href="{{ asset('css/profile.css') }}">

@section('content')
    <!-- Main Container -->
    <div class="container mx-auto max-w-4xl flex flex-row p-6 bg-black text-white">
        <!-- Sidebar Navigation -->
        <aside class="w-1/4 pr-6">
            <div class="flex flex-col space-y-4">
                <!-- Avatar with White Circle and Gray Border -->
                <div class="mb-4 relative">
                    <div
                        class="w-24 h-24 rounded-full bg-white border-4 border-gray-500 flex items-center justify-center overflow-hidden">
                        <img src="{{ asset('img/cat.png') }}" alt="User Avatar" class="w-20 h-20 object-cover">
                    </div>
                </div>

                <a href="{{ route('profile.show') }}"
                    class="text-white-400 hover:text-gray-400 flex items-center space-x-2">
                    <span class="text-xl">👤</span>
                    <span>Account Details</span>
                </a>

                <a href="{{ route('profile.password') }}"
                    class="text-white-400 hover:text-gray-400 flex items-center space-x-2 bg-red-600 p-2 rounded">
                    <span class="text-xl">🔑</span>
                    <span>Change Password</span>
                </a>

                <a href="{{ route('profile.orders') }}"
                    class="text-white-400 hover:text-gray-400 flex items-center space-x-2">
                    <span class="text-xl">📦</span>
                    <span>My Orders</span>
                </a>

                @if(Auth::user()->is_admin == 1)
                    <a href="/admin" class="text-white-400 hover:text-gray-400 flex items-center space-x-2">
                        <span class="text-xl">🛠️</span>
                        <span>Admin Panel</span>
                    </a>
                @endif

                <a href="{{ route('logout') }}" class="text-white-400 hover:text-gray-400 flex items-center space-x-2"
                    onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                    <span class="text-xl">🚪</span>
                    <span>Logout</span>
                </a>

                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                    @csrf
                </form>
            </div>
        </aside>

        <!-- Change Password Section -->
        <section class="w-3/4 pl-6">
            <h1 class="text-4xl font-bold mb-6">Change Password</h1>

            <!-- Password Change Form -->
            <form method="POST" action="{{ route('profile.password.update') }}" class="space-y-4">
                @csrf
                @method('PATCH')

                <!-- Success or Error Messages -->
                @if(session('success'))
                    <div class="text-green-500 text-lg mb-4">
                        {{ session('success') }}
                    </div>
                @elseif(session('error'))
                    <div class="text-red-500 text-lg mb-4">
                        {{ session('error') }}
                    </div>
                @endif

                <!-- Current Password -->
                <label class="text-white text-sm uppercase tracking-wide mb-2 block">Current Password</label>
                <div class="relative">
                    <div class="control block-cube block-input">
                        <input type="password" name="current_password" id="current_password"
                            class="w-full bg-transparent border-0 px-3 py-3 text-white text-base placeholder-white focus:outline-none"
                            placeholder="Enter your current password">
                        <div class="bg-top">
                            <div class="bg-inner"></div>
                        </div>
                        <div class="bg-right">
                            <div class="bg-inner"></div>
                        </div>
                        <div class="bg">
                            <div class="bg-inner"></div>
                        </div>
                    </div>
                    <span
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white toggle-password z-10"
                        data-target="current_password">
                        <i class="fas fa-eye" id="toggle-current-password-icon"></i>
                    </span>
                </div>
                @error('current_password')
                    <div class="text-red-500 text-sm mt-1">{{ $message }}</div>
                @enderror

                <!-- New Password -->
                <label class="text-white text-sm uppercase tracking-wide mb-2 block">New Password</label>
                <div class="relative">
                    <div class="control block-cube block-input">
                        <input type="password" name="password" id="new_password"
                            class="w-full bg-transparent border-0 px-3 py-3 text-white text-base placeholder-white focus:outline-none"
                            placeholder="Enter your new password">
                        <div class="bg-top">
                            <div class="bg-inner"></div>
                        </div>
                        <div class="bg-right">
                            <div class="bg-inner"></div>
                        </div>
                        <div class="bg">
                            <div class="bg-inner"></div>
                        </div>
                    </div>
                    <span
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white toggle-password z-10"
                        data-target="new_password">
                        <i class="fas fa-eye" id="toggle-new-password-icon"></i>
                    </span>
                </div>
                @error('password')
                    <div class="text-red-500 text-sm mt-1">{{ $message }}</div>
                @enderror

                <!-- Confirm New Password -->
                <label class="text-white text-sm uppercase tracking-wide mb-2 block">Confirm New Password</label>
                <div class="relative">
                    <div class="control block-cube block-input">
                        <input type="password" name="password_confirmation" id="confirm_password"
                            class="w-full bg-transparent border-0 px-3 py-3 text-white text-base placeholder-white focus:outline-none"
                            placeholder="Confirm your new password">
                        <div class="bg-top">
                            <div class="bg-inner"></div>
                        </div>
                        <div class="bg-right">
                            <div class="bg-inner"></div>
                        </div>
                        <div class="bg">
                            <div class="bg-inner"></div>
                        </div>
                    </div>
                    <span
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white toggle-password z-10"
                        data-target="confirm_password">
                        <i class="fas fa-eye" id="toggle-confirm-password-icon"></i>
                    </span>
                </div>
                @error('password_confirmation')
                    <div class="text-red-500 text-sm mt-1">{{ $message }}</div>
                @enderror

                <!-- Submit Button -->
                <div class="mt-8">
                    <button type="submit"
                        class="btn block-cube block-cube-hover w-32 mx-auto flex items-center justify-center px-4 py-2 text-white text-base font-bold uppercase tracking-wider">
                        <div class="bg-top">
                            <div class="bg-inner"></div>
                        </div>
                        <div class="bg-right">
                            <div class="bg-inner"></div>
                        </div>
                        <div class="bg">
                            <div class="bg-inner"></div>
                        </div>
                        <div class="text">
                            Save
                        </div>
                    </button>
                </div>
            </form>
        </section>
    </div>
@endsection

@section('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Анимация появления
            const fadeSections = document.querySelectorAll('.fade-in-section');
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            fadeSections.forEach(section => {
                observer.observe(section);
            });

            // Toggle password visibility for all password fields
            const toggleButtons = document.querySelectorAll('.toggle-password');
            toggleButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const targetId = this.getAttribute('data-target');
                    const passwordInput = document.getElementById(targetId);
                    const toggleIcon = this.querySelector('i');

                    if (passwordInput.type === 'password') {
                        passwordInput.type = 'text';
                        toggleIcon.classList.remove('fa-eye');
                        toggleIcon.classList.add('fa-eye-slash');
                    } else {
                        passwordInput.type = 'password';
                        toggleIcon.classList.remove('fa-eye-slash');
                        toggleIcon.classList.add('fa-eye');
                    }
                });
            });
        });
    </script>
@endsection