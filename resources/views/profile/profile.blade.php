@extends('layouts.app')

@section('title', 'Profile')
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

        <!-- Profile Section -->
        <section class="w-3/4 pl-6">
            <h1 class="text-4xl font-bold mb-6">Account Settings</h1>

            <!-- Profile Information -->
            <div class="space-y-4">
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
                    <input type="text" value="{{ Auth::user()->username }}"
                        class="w-full bg-transparent border-0 px-3 py-3 text-white text-base placeholder-white focus:outline-none"
                        readonly>
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

                <!-- Email -->
                <label class="text-white text-sm uppercase tracking-wide mb-2 block">Email address</label>
                <div class="control block-cube block-input">
                    <input type="email" value="{{ Auth::user()->email }}"
                        class="w-full bg-transparent border-0 px-3 py-3 text-white text-base placeholder-white focus:outline-none"
                        readonly>
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

                <!-- Last Game Played -->
                <label class="text-white text-sm uppercase tracking-wide mb-2 block">Last Game Played</label>
                <div class="control block-cube block-input">
                    <input type="text" value="{{ Auth::user()->last_game_played_at ?? 'Never' }}"
                        class="w-full bg-transparent border-0 px-3 py-3 text-white text-base placeholder-white focus:outline-none"
                        readonly>
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

                <!-- Next Game Time -->
                <label class="text-white text-sm uppercase tracking-wide mb-2 block">Next Game Time</label>
                <div class="control block-cube block-input">
                    <input type="text" value="{{ Auth::user()->next_game_time ?? 'Not set' }}"
                        class="w-full bg-transparent border-0 px-3 py-3 text-white text-base placeholder-white focus:outline-none"
                        readonly>
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

                <!-- Edit Profile Button -->
                <a href="{{ route('profile.edit') }}"
                    class="btn block-cube block-cube-hover w-32 mx-auto flex items-center justify-center px-4 py-2 text-white text-base font-bold uppercase tracking-wider mt-8">
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
                        Edit
                    </div>
                </a>
            </div>
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