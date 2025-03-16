@extends('layouts.app')

<meta name="csrf-token" content="{{ csrf_token() }}">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
@section('title', 'Bendy Game')
<link rel="stylesheet" href="{{ asset('css/games.css') }}">
<link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Dosis&display=swap" rel="stylesheet">

@section('content')
    <div class="container mx-auto max-w-6xl py-8">
        <section class="px-4 md:px-6 bg-black text-white">
            @if (Auth::check())
                <!-- Game Title and Description -->
                <div class="text-center mb-12">
                    <h1 class="text-5xl md:text-6xl uppercase font-extrabold tracking-widest mb-4 text-white">
                        Bendy Game
                    </h1>
                    <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                        Control a flexible hero, pass levels, and collect points!
                    </p>
                </div>
                <div class="flex justify-center">
                    <div class="game-container">
                        <div class="heading">
                            <p id="message"></p>
                            <p id="saveCode"></p>
                        </div>
                        <canvas id="canvas" width="600" height="600"></canvas>
                    </div>
                </div>
            @else
                <div class="text-center pb-32">
                    <h2 class="text-3xl font-bold uppercase tracking-wide mb-4 text-red-400">Access Restricted</h2>
                    <p class="text-lg md:text-xl text-gray-300 mb-6">You must log in to play. Please register or log in to
                        continue.</p>
                    <div class="rain-container">
                        <div class="cloud">
                            <h2>Log in to Play</h2>
                        </div>
                    </div>
                </div>
            @endif
        </section>
    </div>
@endsection

@section('scripts')
    @if (Auth::check())
        <script src="https://cdn.jsdelivr.net/processing.js/1.4.8/processing.min.js"></script>
        <script src="{{ asset('js/bendy.js') }}"></script>
        <script>
            var canvas = document.getElementById("canvas");
            var processingInstance;

            // Function to resize canvas based on container size
            function resizeCanvas() {
                var container = document.querySelector('.game-container');
                var size = Math.min(container.offsetWidth, 600); // Cap at 600px
                canvas.width = size;
                canvas.height = size;

                // Restart Processing instance if it exists
                if (processingInstance) {
                    processingInstance.exit();
                    processingInstance = new Processing(canvas, sketchProc);
                }
            }

            // Initialize Processing sketch
            processingInstance = new Processing(canvas, sketchProc);

            // Resize canvas on load and when window resizes
            window.addEventListener('load', resizeCanvas);
            window.addEventListener('resize', resizeCanvas);

            // Add touch support for mobile
            canvas.addEventListener('touchstart', function (e) {
                e.preventDefault();
                // Simulate spacebar press or custom touch logic here
                if (processingInstance && processingInstance.keyPressed) {
                    processingInstance.key = ' '; // Simulate spacebar
                    processingInstance.keyPressed();
                }
            });
        </script>
    @endif

    <script>
        // Prevent page scrolling when pressing the spacebar
        document.addEventListener('keydown', function (event) {
            if (event.keyCode === 32) {
                event.preventDefault();
            }
        });

        // Rain effect for unauthenticated users
        function randomText() {
            var text = "!@#$%^*()";
            return text[Math.floor(Math.random() * text.length)];
        }

        function rain() {
            let cloud = document.querySelector('.cloud');
            if (cloud) {
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
                    if (cloud.contains(e)) {
                        cloud.removeChild(e);
                    }
                }, 2000);
            }
        }

        @if (!Auth::check())
            setInterval(function () {
                rain();
            }, 20);
        @endif

        // Open profile dropdown
        document.addEventListener('DOMContentLoaded', function () {
            const profileButton = document.getElementById('profile-toggle');
            if (profileButton) {
                setTimeout(() => profileButton.click(), 100);
            }
        });
    </script>
@endsection