@extends('layouts.app')

@section('title', 'Games')
<link rel="stylesheet" href="{{ asset('css/games.css') }}">

@section('content')
    <!-- Main Container -->
    <div class="container mx-auto max-w-6xl py-8">
        <!-- Games Section -->
        <section class="px-4 md:px-6 bg-black text-white">
            <!-- Check if user is authenticated and the route is under /games -->
            @if (Auth::check() || !request()->is('games*'))
                <!-- Games Title (only for authenticated users or non-games routes) -->
                <div class="text-center mb-12">
                    <h1 class="text-5xl md:text-6xl uppercase font-extrabold tracking-widest mb-4 font-sans animate-fade-in">
                        Games</h1>
                    <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">Explore our collection of exciting games. Play
                        now!</p>
                </div>

                <!-- Shooting Games Category -->
                <div class="mb-12">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <a href="{{ url('/gogo-game') }}" class="game-item relative">
                            <img src="{{ asset('img/game-1.png') }}" alt="GoGo Game"
                                class="w-full h-auto rounded-lg game-image">
                            <video class="game-video w-full h-auto rounded-lg" muted loop preload="metadata">
                                <source src="{{ asset('video/game-1.mp4') }}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <p class="text-center text-white mt-2">GoGo Game</p>
                        </a>

                        <a href="{{ url('/blockstack-game') }}" class="game-item relative">
                            <img src="{{ asset('img/game-2.png') }}" alt="Coloron Game"
                                class="w-full h-auto rounded-lg game-image">
                            <video class="game-video w-full h-auto rounded-lg" muted loop preload="metadata">
                                <source src="{{ asset('video/game-2.mp4') }}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <p class="text-center text-white mt-2">BlockStack</p>
                        </a>
                    </div>
                </div>


                <div class="mb-12">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <a href="{{ url('/bendy-game') }}" class="game-item relative">
                            <img src="{{ asset('img/game-4.png') }}" alt="Bendy" class="w-full h-auto rounded-lg game-image">
                            <video class="game-video w-full h-auto rounded-lg" muted loop preload="metadata">
                                <source src="{{ asset('video/game-4.mp4') }}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <p class="text-center text-white mt-2">Bendy</p>
                        </a>

                        <a href="#" class="game-item relative">
                            <img src="{{ asset('img/meme.jpg') }}" alt="To be continued"
                                class="w-full h-auto rounded-lg game-image">
                            <video class="game-video w-full h-auto rounded-lg" muted loop preload="metadata">
                                <source src="{{ asset('video/old-bg.mp4') }}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <p class="text-center text-white mt-2">To be continued</p>
                        </a>
                    </div>
                </div>
            @else
                <!-- Message for unauthenticated users under /games -->
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
    <script>
        // Rain effect JavaScript
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

        // Start rain effect for unauthenticated users under /games
        @if (!Auth::check() && request()->is('games*'))
            setInterval(function () {
                rain();
            }, 20);
        @endif

        // Existing JavaScript
        document.addEventListener('DOMContentLoaded', function () {
            // Scroll Animation Logic
            const sections = document.querySelectorAll('.fade-in-section');

            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                        entry.target.classList.add('visible');
                        sectionObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            sections.forEach(section => {
                sectionObserver.observe(section);
            });

            // Video playback on hover (only for authenticated users)
            @if (Auth::check())
                const gameItems = document.querySelectorAll('.game-item');
                gameItems.forEach(item => {
                    const video = item.querySelector('.game-video');
                    item.addEventListener('mouseover', () => {
                        if (video.readyState >= 2) {
                            video.play().catch(error => {
                                console.error('Video playback failed:', error);
                            });
                        } else {
                            console.warn('Video not ready yet:', video.readyState);
                        }
                    });
                    item.addEventListener('mouseout', () => {
                        video.pause();
                        video.currentTime = 0;
                    });
                });
            @endif

                // Prevent clicks on game links if not authenticated
                @if (!Auth::check() && request()->is('games*'))
                    const gameLinks = document.querySelectorAll('.game-item');
                    gameLinks.forEach(link => {
                        link.addEventListener('click', (e) => {
                            e.preventDefault();
                            alert('Please log in or register to play this game.');
                        });
                    });
                @endif

                // Trigger profile dropdown for unauthenticated users under /games
                @if (!Auth::check() && request()->is('games*'))
                    const profileButton = document.getElementById('profile-toggle');
                    if (profileButton) {
                        setTimeout(() => profileButton.click(), 100); // Delay to ensure DOM is ready
                    }
                @endif

                // Trigger profile dropdown for authenticated users
                @if (Auth::check())
                    const profileButton = document.getElementById('profile-toggle');
                    if (profileButton) {
                        profileButton.click(); // Simulate a click to open the profile dropdown
                    }
                @endif
                                                                                                                });
    </script>
@endsection