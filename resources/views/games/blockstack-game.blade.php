@extends('layouts.app')

<meta name="csrf-token" content="{{ csrf_token() }}">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
@section('title', 'Block Stack Game')
<link rel="stylesheet" href="{{ asset('css/games.css') }}">
<link rel="stylesheet" href="{{ asset('css/block-stack.css') }}">

@section('content')
    <div class="container mx-auto max-w-6xl py-8">
        <section class="px-4 md:px-6 bg-black text-white">
            <!-- Check if user is authenticated -->
            @if (Auth::check())
                <!-- Game Title -->
                <div class="text-center mb-12">
                    <h1 class="text-5xl md:text-6xl uppercase font-extrabold tracking-widest mb-4">Block Stack Game</h1>
                    <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                        Stack blocks as high as you can! Click or press the spacebar to place the block.
                    </p>
                </div>

                <!-- Game Container -->
                <div class="flex justify-center">
                    <div class="game-container bg-black rounded-lg shadow-lg">
                        <div id="container">
                            <div id="game"></div>
                            <div id="score">0</div>
                            <div id="instructions">Click (or press the spacebar) to place the block</div>
                            <div class="game-over">
                                <h2>Game Over</h2>
                                <p>You did great, you're the best!</p>
                                <p>Click or press the spacebar to start again</p>
                            </div>
                            <div class="game-ready">
                                <div id="start-button">Start</div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            @else
                <!-- Message for unauthenticated users -->
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
    <!-- Include Scripts for Authenticated Users -->
    @if (Auth::check())
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r83/three.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/TweenLite.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/easing/EasePack.min.js"></script>
        <script src="{{ asset('js/block-stack-game.js') }}"></script>
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

        @if (!Auth::check())
            setInterval(function () {
                rain();
            }, 20);
        @endif

        // Open profile dropdown for unauthenticated users
        @if (!Auth::check())
            document.addEventListener('DOMContentLoaded', function () {
                const profileButton = document.getElementById('profile-toggle');
                if (profileButton) {
                    setTimeout(() => profileButton.click(), 100);
                }
            });
        @endif

        // Open profile dropdown for authenticated users
        @if (Auth::check())
            document.addEventListener('DOMContentLoaded', function () {
                const profileButton = document.getElementById('profile-toggle');
                if (profileButton) {
                    profileButton.click();
                }
            });
        @endif
    </script>
@endsection