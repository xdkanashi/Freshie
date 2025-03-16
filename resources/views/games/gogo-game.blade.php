@extends('layouts.app')

<meta name="csrf-token" content="{{ csrf_token() }}">
@section('title', 'Go Go Game')
<link rel="stylesheet" href="{{ asset('css/games.css') }}">
<link rel="stylesheet" href="{{ asset('css/gogo-game.css') }}">

@section('content')
    <div class="container mx-auto max-w-6xl py-8">
        <section class="px-4 md:px-6 bg-black text-white">
            <!-- Check if user is authenticated -->
            @if (Auth::check())
                <!-- Game Title -->
                <div class="text-center mb-12">
                    <h1 class="text-5xl md:text-6xl uppercase font-extrabold tracking-widest mb-4">Go Go Game</h1>
                    <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                        Dodge obstacles, collect stars, and survive as long as you can!
                    </p>
                </div>

                <!-- Game Canvas -->
                <div class="flex justify-center">
                    <div class="canvas-container">
                        <canvas id="canvas"></canvas>
                    </div>
                </div>
            @else
                <!-- Message for unauthenticated users -->
                <div class="text-center pb-32">
                    <h2 class="text-3xl font-bold uppercase tracking-wide mb-4 text-red-400">Access Restricted</h2>
                    <p class="text-lg md:text-xl text-gray-300 mb-6">You must be logged in to play games. Please register or log
                        in to continue.</p>

                    <!-- Rain Effect -->
                    <div class="rain-container">
                        <div class="cloud">
                            <h2>Login to Play</h2>
                        </div>
                    </div>
                </div>
            @endif
        </section>
    </div>
@endsection

@section('scripts')
    <!-- Include Processing.js library (only for authenticated users) -->
    @if (Auth::check())
        <script src="https://cdn.jsdelivr.net/processing.js/1.4.8/processing.min.js"></script>
        <script src="{{ asset('js/gogo-game.js') }}"></script>
    @endif

    <script>
        // Rain effect JavaScript (copied from games.blade.php)
        function randomText() {
            var text = "!@#$%^*()";
            return text[Math.floor(Math.random() * text.length)];
        }

        function rain() {
            let cloud = document.querySelector('.cloud');
            let e = document.createElement('div');
            e.classList.add('drop');
            cloud.appendChild(e);

            let left = Math.floor(Math.random() * 300);
            let size = Math.random() * 1.5;
            let duration = Math.random() * 1;

            e.innerText = randomText();
            e.style.left = left + 'px';
            e.style.fontSize = 0.5 + size + 'em';
            e.style.animationDuration = 1 + duration + 's';

            setTimeout(function () {
                cloud.removeChild(e);
            }, 2000);
        }

        // Start rain effect for unauthenticated users
        @if (!Auth::check())
            setInterval(function () {
                rain();
            }, 20);
        @endif

        // Trigger profile dropdown for unauthenticated users
        @if (!Auth::check())
            document.addEventListener('DOMContentLoaded', function () {
                const profileButton = document.getElementById('profile-toggle');
                if (profileButton) {
                    setTimeout(() => profileButton.click(), 100); // Delay to ensure DOM is ready
                }
            });
        @endif

        // Trigger profile dropdown for authenticated users
        @if (Auth::check())
            document.addEventListener('DOMContentLoaded', function () {
                const profileButton = document.getElementById('profile-toggle');
                if (profileButton) {
                    profileButton.click(); // Simulate a click to open the profile dropdown
                }
            });
        @endif
    </script>
@endsection