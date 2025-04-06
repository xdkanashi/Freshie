@extends('layouts.app')

@section('title', 'Edit Profile')
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
                    class="text-white-400 hover:text-gray-400 flex items-center space-x-2 bg-red-600 p-2 rounded">
                    <span class="text-xl">👤</span>
                    <span>Account Details</span>
                </a>

                <a href="{{ route('profile.password') }}"
                    class="text-white-400 hover:text-gray-400 flex items-center space-x-2">
                    <span class="text-xl">🔑</span>
                    <span>Change Password</span>
                </a>

                <a href="{{ route('profile.orders') }}"
                    class="text-white-400 hover:text-gray-400 flex items-center space-x-2">
                    <span class="text-xl">📦</span>
                    <span>My Orders</span>
                </a>
                <!-- Admin Panel Button (Visible Only to Admins) --> @if(Auth::user()->is_admin == 1) <a href="/admin"
                    class="text-white-400 hover:text-gray-400 flex items-center space-x-2">
                <span class="text-xl">🛠️</span> <span>Admin Panel</span> </a> @endif

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

        <!-- Edit Profile Section -->
        <section class="w-3/4 pl-6">
            <h1 class="text-4xl font-bold mb-6">Edit Profile</h1>

            <!-- Edit Profile Form -->
            <form method="POST" action="{{ route('profile.update') }}" class="space-y-4">
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

                <!-- Username -->
                <label class="text-white text-sm uppercase tracking-wide mb-2 block">Username</label>
                <div class="control block-cube block-input">
                    <input type="text" name="username" value="{{ old('username', Auth::user()->username) }}"
                        class="w-full bg-transparent border-0 px-3 py-3 text-white text-base placeholder-white focus:outline-none"
                        placeholder="Enter your username">
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
                @error('username')
                    <div class="text-red-500 text-sm mt-1">{{ $message }}</div>
                @enderror

                <!-- Email -->
                <label class="text-white text-sm uppercase tracking-wide mb-2 block">Email Address</label>
                <div class="control block-cube block-input">
                    <input type="email" name="email" value="{{ old('email', Auth::user()->email) }}"
                        class="w-full bg-transparent border-0 px-3 py-3 text-white text-base placeholder-white focus:outline-none"
                        placeholder="Enter your email">
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
                @error('email')
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
        });
    </script>
@endsection