@extends('layouts.app')

<meta name="csrf-token" content="{{ csrf_token() }}">
@section('title', 'Freshie Go Game')
<link rel="stylesheet" href="{{ asset('css/games.css') }}">
<link rel="stylesheet" href="{{ asset('css/gogo-game.css') }}">

@section('content')
    <div class="container mx-auto max-w-6xl py-8">
        <section class="px-4 md:px-6 bg-black text-white">
            <!-- Notification Container - Moved to bottom right -->
            <div id="notification-container" class="fixed bottom-4 right-4 z-50 w-80"></div>

            <!-- Check if user is authenticated -->
            @if (Auth::check())
                                @php
                                    $user = Auth::user();
                                    $nextGameTime = $user->next_game_time;
                                @endphp
                                <!-- Game Title -->
                                <div class="text-center mb-12">
                                    <h1 class="text-5xl md:text-6xl uppercase font-extrabold tracking-widest mb-4">Freshie Go Game</h1>
                                    <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                                        Dodge obstacles, collect coins, and survive as long as you can!
                                    </p>
                                </div>

                                <!-- Check if the user has played today -->
                                @if ($user->game_limit_enabled && ($nextGameTime && strtotime($nextGameTime) > time()))
                                    <!-- Message for users who have already played today -->
                                    <div class="text-center pb-32">
                                        <h2 class="text-3xl font-bold uppercase tracking-wide mb-4 text-red-400">You have already played today!</h2>
                                        <p class="text-lg md:text-xl text-gray-300 mb-6">Come back after:
                                            {{ \Carbon\Carbon::parse($nextGameTime)->format('Y-m-d H:i:s') }}
                                        </p>
                                    </div>
                                @else
                                    <!-- Game Canvas for users who can play -->
                                    <div class="flex justify-center">
                                        <div class="canvas-container" id="game-container">
                                            <canvas id="canvas"></canvas>
                                        </div>
                                    </div>
                                    <button id="submit-score-btn" class="hidden">Submit Score</button> <!-- Hidden submit score button -->
                                @endif

                                <!-- Show error message if the user has already played today -->
                                @if(session('error'))
                                    <script>
                                        document.addEventListener('DOMContentLoaded', function () {
                                            showNotification('{{ session('error') }}', 'error');
                                        });
                                    </script>
                                @endif

                                <!-- Show success messages -->
                                @if(session('success'))
                                    <script>
                                        document.addEventListener('DOMContentLoaded', function () {
                                            showNotification('{{ session('success') }}', 'success');
                                        });
                                    </script>
                                @endif
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
        // Function to create and show beautiful notifications
        function showNotification(message, type = 'info') {
            const container = document.getElementById('notification-container');
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;

            // Title based on notification type
            let title = type === 'success' ? 'Success!' : type === 'error' ? 'Oops!' : 'Information';

            notification.innerHTML = `
                        <div class="notification-title">${title}</div>
                        <div class="notification-message">${message}</div>
                        <span class="notification-close" onclick="this.parentElement.remove()">✕</span>
                    `;

            container.appendChild(notification);

            // Auto-remove notification after 5 seconds
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.addEventListener('animationend', function (e) {
                        if (e.animationName === 'fadeOut' && notification.parentElement) {
                            notification.remove();
                        }
                    });
                }
            }, 5000);
        }

        // Function to submit score and handle game limit
        function submitScore(score) {
            // If score is 0, don't send to server
            if (score <= 0) {
                showNotification('Score is 0, game not counted. You can play again.', 'info');
                return;
            }

            fetch('{{ route("submitScore") }}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': '{{ csrf_token() }}',
                },
                body: JSON.stringify({ score: score })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Show notification about saved score
                        showNotification(data.message, 'success');

                        // If limit is enabled, reload page after delay
                        if (data.limit_enabled) {
                            setTimeout(() => {
                                window.location.reload();
                            }, 3000);
                        }
                    } else {
                        // If score is 0, user can play again
                        showNotification(data.message, 'info');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    showNotification('Error submitting score. Please try again.', 'error');
                });
        }

        // Function to trigger when the game ends and score is ready to submit
        function onGameEnd(score) {
            submitScore(score); // Submit score when the game ends
        }
    </script>

    <!-- Rain effect JavaScript (for unauthenticated users) -->
    <script>
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
                    setTimeout(() => profileButton.click(), 100);
                }
            });
        @endif

        // Trigger profile dropdown for authenticated users
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