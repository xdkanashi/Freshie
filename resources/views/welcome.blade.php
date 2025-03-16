@extends('layouts.app')

@section('title', 'Home')

<link rel="stylesheet" href="{{ asset('css/instagram.css') }}">

@section('content')
    <!-- CSRF Token for AJAX -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Hero Section -->
    <section class="relative w-full min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 z-0">
            <!-- Видео для старта (цикличное) -->
            <video id="hero-start-video" muted class="w-full h-full object-cover opacity-60" style="display: none;">
                <source src="{{ asset('video/Freshie-start.mp4') }}" type="video/mp4">
            </video>
            <!-- Основное видео -->
            <video id="hero-video" muted class="w-full h-full object-cover opacity-60" style="display: none;">
                <source src="{{ asset('video/Freshie.mp4') }}" type="video/mp4">
            </video>
        </div>
        <div id="hero-content" class="relative z-10 text-center px-4 sm:px-6" style="opacity: 0;">
            <h1
                class="text-5xl sm:text-7xl md:text-8xl uppercase font-extrabold tracking-widest mb-6 font-montserrat transition-all duration-1500 ease-in-out">
                Freshie
            </h1>
            <p
                class="text-lg sm:text-xl md:text-2xl uppercase tracking-wider mb-8 text-gray-300 transition-all duration-1500 ease-in-out">
                Streetwear Born in Chaos | Est. 2025
            </p>
            <a href="{{ url('/collections') }}" id="explore-now"
                class="inline-block bg-white text-black px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg uppercase rounded-xl font-bold tracking-wider hover:bg-gray-200 transition-all duration-300">
                Explore Now
            </a>
        </div>
    </section>

    <!-- About Brand Section -->
    <section class="w-full py-16 sm:py-20 bg-black text-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 class="text-4xl sm:text-5xl uppercase font-extrabold tracking-widest mb-12 text-center font-montserrat">
                Our Essence
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div class="flex flex-col justify-center">
                    <p class="text-base sm:text-lg uppercase tracking-wider text-gray-300 leading-relaxed">
                        Freshie is not just a brand; it's a way of life. Founded in 2025 at the heart of street culture,
                        we blend boldness, style, and a rebellious spirit. Every piece of our clothing is a challenge to the
                        ordinary.
                    </p>
                </div>
                <div class="relative">
                    <img src="{{ asset('img/birka.jpg') }}" alt="Freshie Story"
                        class="w-full h-[400px] object-cover rounded-sm animate-fade-in">
                </div>
            </div>
        </div>
    </section>

    <!-- Our Vision Section -->
    <section class="w-full py-16 sm:py-20 bg-black text-white border-t border-gray-700">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 class="text-4xl sm:text-5xl uppercase font-extrabold tracking-widest mb-12 text-center font-montserrat">
                Our Vision
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div class="relative">
                    <img src="{{ asset('img/magazine-removebg.png') }}" alt="Freshie Vision"
                        class="w-full h-[400px] object-cover rounded-sm animate-fade-in glow-effect">
                </div>
                <div class="flex flex-col justify-center">
                    <p class="text-base sm:text-lg uppercase tracking-wider text-gray-300 leading-relaxed ">
                        We see a world where streetwear isn’t just fashion—it’s a rebellion against the mundane. Freshie
                        is here to ignite chaos, inspire individuality, and redefine the streets, one bold design at a time.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Limited Edition Teaser -->
    <section class="w-full py-16 sm:py-20 bg-black text-white border-t border-gray-700">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h2 class="text-4xl sm:text-5xl uppercase font-extrabold tracking-widest mb-12 font-montserrat">
                Limited Edition
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div class="relative">
                    <img src="{{ asset('//premiumdemo.site/cdn/shop/files/93wi6o.gif?v=1726678774&width=1946') }}"
                        alt="Limited Edition Item"
                        class="w-full h-[460px] object-cover rounded-sm animate-fade-in group-hover:opacity-80 transition-opacity duration-300 glow-effect">
                </div>
                <div class="flex flex-col justify-center">
                    <p class="text-base sm:text-lg uppercase tracking-wider text-gray-300 leading-relaxed mb-6">
                        Exclusive drops that won’t last. Get your hands on the rarest pieces of Freshie chaos.
                    </p>
                    <a href="{{ url('/collections') }}"
                        class="inline-block bg-white text-black px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg uppercase rounded-xl font-bold tracking-wider hover:bg-gray-200 transition-all duration-300">
                        Grab Yours Now
                    </a>
                </div>
            </div>
        </div>
    </section>


    <!-- Featured Collection Teaser -->
    <section class="w-full py-16 sm:py-20 bg-black text-white border-t border-gray-700">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h2 class="text-4xl sm:text-5xl uppercase font-extrabold tracking-widest mb-12 font-montserrat">
                Drop 001
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div class="group">
                    <img src="{{ asset('//premiumdemo.site/cdn/shop/files/ZIPHOODIEFRONT.png?v=1726769463') }}"
                        alt="Drop 001 Item 1"
                        class="w-full h-[300px] object-cover mb-4 group-hover:opacity-80 transition-opacity duration-300 glow-effect">
                    <p class="text-sm sm:text-base uppercase tracking-wider text-gray-300">Chaos Hoodie</p>
                </div>
                <div class="group">
                    <img src="{{ asset('//premiumdemo.site/cdn/shop/files/PREMIUM_10.png') }}" alt=" Drop 001 Item 2"
                        class="w-full h-[300px] object-cover mb-4 group-hover:opacity-80 transition-opacity duration-300 glow-effect">
                    <p class="text-sm sm:text-base uppercase tracking-wider text-gray-300">T Bandana</p>
                </div>
                <div class="group">
                    <img src="{{ asset('//premiumdemo.site/cdn/shop/files/FRONTFLAREDSWEATPANTS.png') }}"
                        alt="Drop 001 Item 3"
                        class="w-full h-[300px] object-cover mb-4 group-hover:opacity-80 transition-opacity duration-30 glow-effect">
                    <p class="text-sm sm:text-base uppercase tracking-wider text-gray-300">Night Pants</p>
                </div>
            </div>
            <a href="{{ url('/collections') }}"
                class="inline-block mt-12 bg-white text-black px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg rounded-xl uppercase font-bold tracking-wider hover:bg-gray-200 transition-all duration-300">
                Shop Collection
            </a>
        </div>
    </section>

    <!-- Community Spotlight -->
    <section class="w-full py-16 sm:py-20 bg-black text-white border-t border-gray-700">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h2 class="text-4xl sm:text-5xl uppercase font-extrabold tracking-widest mb-12 font-montserrat">
                Community Spotlight
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div class="group">
                    <img src="{{ asset('img/merch-1.jpg') }}" alt="Community Member 1"
                        class="w-full h-[300px] object-cover mb-4 group-hover:opacity-80 transition-opacity duration-300">
                    <p class="text-sm sm:text-base uppercase tracking-wider text-gray-300">Gleb in Chaos T-shirt</p>
                </div>
                <div class="group">
                    <img src="{{ asset('img/merch-2.jpg') }}" alt="Community Member 2"
                        class="w-full h-[300px] object-cover mb-4 group-hover:opacity-80 transition-opacity duration-300">
                    <p class="text-sm sm:text-base uppercase tracking-wider text-gray-300">Nikita in Rebel T-shirt</p>
                </div>
                <div class="group">
                    <img src="{{ asset('img/merch-3.jpg') }}" alt="Community Member 3"
                        class="w-full h-[300px] object-cover mb-4 group-hover:opacity-80 transition-opacity duration-300">
                    <p class="text-sm sm:text-base uppercase tracking-wider text-gray-300">Vita in Night T-shirt</p>
                </div>
            </div>
            <p class="text-base sm:text-lg uppercase tracking-wider text-gray-300 mt-8">
                Tag us @freshie.exe to get featured!
            </p>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="w-full py-16 sm:py-20 bg-black text-white border-t border-gray-700">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h2 class="text-4xl sm:text-5xl uppercase font-extrabold tracking-widest mb-12 font-montserrat">
                Voices of Chaos
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="p-6 bg-black/80 border border-gray-700 rounded-xl">
                    <p class="text-sm sm:text-base uppercase tracking-wider text-gray-300 mb-4">
                        "Freshie’s gear is pure fire. It’s like wearing rebellion."
                    </p>
                    <p class="text-xs sm:text-sm font-bold text-white">- Andrej, Street Artist</p>
                </div>
                <div class="p-6 bg-black/80 border border-gray-700 rounded-xl">
                    <p class="text-sm sm:text-base uppercase tracking-wider text-gray-300 mb-4">
                        "The quality and vibe are unmatched. I’m hooked."
                    </p>
                    <p class="text-xs sm:text-sm font-bold text-white">- Elena, Skateboarder</p>
                </div>
                <div class="p-6 bg-black/80 border border-gray-700 rounded-xl">
                    <p class="text-sm sm:text-base uppercase tracking-wider text-gray-300 mb-4">
                        "This is streetwear with a soul. Chaos approved."
                    </p>
                    <p class="text-xs sm:text-sm font-bold text-white">- Michael, Musician</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Instagram Section -->
    <section class="w-full py-8 sm:py-20 bg-black text-white border-t border-gray-700">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h2 class="text-4xl sm:text-5xl uppercase font-extrabold tracking-widest mb-12 font-montserrat">
                Follow Us on Instagram
            </h2>
            <div class="instagram-feed flex justify-center w-full">
                <div class="block-cube block-cube-hover w-full mx-auto">
                    <!-- 3D Cube Effect -->
                    <div class="bg-top">
                        <div class="bg-inner"></div>
                    </div>
                    <div class="bg-right">
                        <div class="bg-inner"></div>
                    </div>
                    <div class="bg">
                        <div class="bg-inner"></div>
                    </div>
                    <!-- Instagram Profile Content -->
                    <div class="relative z-10 p-4 sm:p-8 bg-[#1a1a1a]">
                        <!-- Profile Header -->
                        <div class="flex flex-col sm:flex-row items-center sm:items-start mb-4 sm:mb-6">
                            <!-- Avatar (Clickable) -->
                            <a href="https://www.instagram.com/freshie.exe/" target="_blank" rel="noopener noreferrer">
                                <img src="{{ asset('img/ava.jpg') }}" alt="Freshie Instagram Avatar"
                                    class="w-16 h-16 sm:w-28 sm:h-28 rounded-full mr-0 sm:mr-6 mb-2 sm:mb-0 object-cover cursor-pointer transition-transform duration-300 hover:scale-105">
                            </a>
                            <div class="text-center sm:text-left">
                                <!-- Username and Verified Badge (Clickable) -->
                                <a href="https://www.instagram.com/freshie.exe/" target="_blank" rel="noopener noreferrer">
                                    <div
                                        class="flex items-center justify-center sm:justify-start mb-1 sm:mb-2 cursor-pointer">
                                        <p
                                            class="text-white text-base sm:text-xl font-bold uppercase tracking-wider mr-1 sm:mr-2">
                                            freshie.exe</p>
                                        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" fill="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0 15.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 10.5 12 10.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm4.72-6.72l-5 5a1 1 0 01-1.414 0l-2.5-2.5a1 1 0 011.414-1.414l1.793 1.793 4.293-4.293a1 1 0 011.414 1.414z" />
                                        </svg>
                                    </div>
                                </a>
                                <!-- Stats (Clickable) -->
                                <a href="https://www.instagram.com/freshie.exe/" target="_blank" rel="noopener noreferrer">
                                    <div
                                        class="flex justify-center sm:justify-start space-x-2 sm:space-x-6 mb-1 sm:mb-2 cursor-pointer text-xs sm:text-base">
                                        <p class="text-gray-300 uppercase tracking-wider"><span
                                                class="font-bold text-white">3</span> posts</p>
                                        <p class="text-gray-300 uppercase tracking-wider"><span
                                                class="font-bold text-white">10</span> followers</p>
                                        <p class="text-gray-300 uppercase tracking-wider"><span
                                                class="font-bold text-white">1</span> following</p>
                                    </div>
                                </a>
                                <!-- Description (Clickable) -->
                                <a href="https://www.instagram.com/freshie.exe/" target="_blank" rel="noopener noreferrer">
                                    <p class="text-gray-300 text-sm sm:text-base uppercase tracking-wider cursor-pointer">
                                        Loading…<br>
                                        its project for diploma in contemporary streetwear style.<br>
                                        Stay tuned
                                    </p>
                                </a>
                            </div>
                        </div>
                        <!-- Buttons Above Stories (Aligned Left, Clickable) -->
                        <div
                            class="flex flex-col sm:flex-row justify-start space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6 pl-2 sm:pl-8">
                            <a href="https://www.instagram.com/freshie.exe/" target="_blank" rel="noopener noreferrer">
                                <button
                                    class="bg-gray-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-gray-700 transition-transform duration-300 hover:scale-105 text-sm sm:text-base w-full sm:w-auto">
                                    Follow
                                </button>
                            </a>
                            <a href="https://www.instagram.com/freshie.exe/" target="_blank" rel="noopener noreferrer">
                                <button
                                    class="bg-blue-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-blue-700 transition-transform duration-300 hover:scale-105 text-sm sm:text-base w-full sm:w-auto">
                                    Message
                                </button>
                            </a>
                            <a href="https://www.instagram.com/freshie.exe/" target="_blank" rel="noopener noreferrer">
                                <button
                                    class="bg-green-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-green-700 transition-transform duration-300 hover:scale-105 text-sm sm:text-base w-full sm:w-auto">
                                    Share
                                </button>
                            </a>
                        </div>
                        <!-- Stories -->
                        <div class="flex space-x-2 sm:space-x-4 overflow-x-auto mb-4 sm:mb-6 py-1 sm:py-2">
                            <a href="https://www.instagram.com/freshie.exe/" target="_blank" rel="noopener noreferrer">
                                <div class="flex flex-col items-center story-item">
                                    <div
                                        class="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-red-500 p-0.5 sm:p-1 flex items-center justify-center transition-transform duration-300">
                                        <img src="{{ asset('img/logo.jpg') }}" alt="Story 1"
                                            class="w-full h-full rounded-full object-cover">
                                    </div>
                                    <p class="text-gray-300 text-xs sm:text-xs mt-1 sm:mt-2 uppercase tracking-wider">Drop
                                        001</p>
                                </div>
                            </a>
                            <a href="https://www.instagram.com/freshie.exe/" target="_blank" rel="noopener noreferrer">
                                <div class="flex flex-col items-center story-item">
                                    <div
                                        class="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-red-500 p-0.5 sm:p-1 flex items-center justify-center transition-transform duration-300">
                                        <img src="{{ asset('img/heart.png') }}" alt="Story 2"
                                            class="w-full h-full rounded-full object-cover">
                                    </div>
                                    <p class="text-gray-300 text-xs sm:text-xs mt-1 sm:mt-2 uppercase tracking-wider">Chaos
                                        Vibes</p>
                                </div>
                            </a>
                            <a href="https://www.instagram.com/freshie.exe/" target="_blank" rel="noopener noreferrer">
                                <div class="flex flex-col items-center story-item">
                                    <div
                                        class="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-red-500 p-0.5 sm:p-1 flex items-center justify-center transition-transform duration-300">
                                        <img src="{{ asset('img/cat.png') }}" alt="Story 3"
                                            class="w-full h-full rounded-full object-cover">
                                    </div>
                                    <p class="text-gray-300 text-xs sm:text-xs mt-1 sm:mt-2 uppercase tracking-wider">Street
                                        Life</p>
                                </div>
                            </a>
                        </div>
                        <!-- Posts Grid -->
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                            <a href="https://www.instagram.com/freshie.exe/" target="_blank" rel="noopener noreferrer">
                                <div class="relative post-item">
                                    <img src="{{ asset('img/magazine.jpg') }}" alt="Post 1"
                                        class="w-full h-24 sm:h-48 object-cover rounded-sm">
                                </div>
                            </a>
                            <a href="https://www.instagram.com/freshie.exe/" target="_blank" rel="noopener noreferrer">
                                <div class="relative post-item">
                                    <img src="{{ asset('img/magazine2.jpg') }}" alt="Post 2"
                                        class="w-full h-24 sm:h-48 object-cover rounded-sm">
                                </div>
                            </a>
                            <a href="https://www.instagram.com/freshie.exe/" target="_blank" rel="noopener noreferrer">
                                <div class="relative post-item">
                                    <img src="{{ asset('img/birka2.jpg') }}" alt="Post 3"
                                        class="w-full h-24 sm:h-48 object-cover rounded-sm">
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <p class="text-sm sm:text-lg uppercase tracking-wider text-gray-300 mt-4 sm:mt-8">
                Stay updated with our latest drops, events, and streetwear inspiration.
            </p>
            <div class="flex justify-center pt-4 sm:pt-8">
                <a href="https://www.instagram.com/freshie.exe/"
                    class="inline-block bg-white text-black px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg uppercase rounded-xl font-bold tracking-wider hover:bg-gray-200 transition-all duration-300">
                    Visit @freshie.exe
                </a>
            </div>
    </section>
@endsection

@section('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            console.log("Home script loaded"); // Для отладки

            // Логика для Hero Section
            const startVideo = document.getElementById('hero-start-video');
            const video = document.getElementById('hero-video');
            const exploreButton = document.getElementById('explore-now');
            const heroContent = document.getElementById('hero-content');
            const linkUrl = exploreButton.getAttribute('href');

            startVideo.currentTime = 0;
            video.currentTime = 0;
            startVideo.pause();
            video.pause();
            startVideo.style.display = 'block';
            let isButtonClicked = false;

            function playStartVideoLoop() {
                if (!isButtonClicked) {
                    startVideo.currentTime = 0;
                    startVideo.play();
                    startVideo.addEventListener('ended', function () {
                        setTimeout(() => {
                            if (!isButtonClicked) {
                                playStartVideoLoop();
                            }
                        }, 3000);
                    }, { once: true });
                }
            }

            startVideo.addEventListener('play', function () {
                heroContent.style.transition = 'opacity 1.5s ease-in-out';
                heroContent.style.opacity = '1';
            }, { once: true });

            playStartVideoLoop();

            exploreButton.addEventListener('click', function (e) {
                e.preventDefault();
                isButtonClicked = true;
                startVideo.pause();
                startVideo.style.display = 'none';
                video.style.display = 'block';
                video.style.opacity = '0.6'; // Явно задаём начальное значение

                // Запускаем видео
                video.play();

                // Даём небольшую задержку перед анимацией, чтобы стили применились
                setTimeout(() => {
                    video.style.transition = 'opacity 1.5s ease-in'; // Устанавливаем переход
                    video.style.opacity = '1'; // Плавно убираем затемнение
                }, 10); // 10 мс достаточно для рендеринга

                heroContent.style.transition = 'opacity 1.5s ease-in-out, filter 1.5s ease-in-out';
                heroContent.style.opacity = '0';
                heroContent.style.filter = 'blur(10px)';
                setTimeout(() => {
                    heroContent.style.display = 'none';
                    exploreButton.style.display = 'none';
                }, 1500);

                video.addEventListener('timeupdate', function () {
                    if (video.duration - video.currentTime <= 1.5) {
                        if (heroContent.style.opacity === '1') return;

                        heroContent.style.opacity = '0';
                        heroContent.style.filter = 'blur(10px)';
                        heroContent.style.display = 'block';

                        setTimeout(() => {
                            heroContent.style.transition = 'opacity 1.5s ease-in-out, filter 1.5s ease-in-out';
                            heroContent.style.opacity = '1';
                            heroContent.style.filter = 'blur(0px)';
                        }, 30);
                    }
                });

                video.addEventListener('ended', function () {
                    window.location.href = linkUrl;
                }, { once: true });
            });

            // Логика для анимации секций при скролле вниз
            const sections = document.querySelectorAll('.fade-in-section');
            const gridItems = document.querySelectorAll('.grid > div');
            let lastScrollTop = 0;

            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const sectionObserver = new IntersectionObserver((entries) => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const isScrollingDown = scrollTop > lastScrollTop;

                entries.forEach(entry => {
                    if (entry.isIntersecting && isScrollingDown && !entry.target.classList.contains('visible')) {
                        entry.target.classList.add('visible');
                        sectionObserver.unobserve(entry.target);
                    }
                });

                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            }, observerOptions);

            sections.forEach(section => {
                sectionObserver.observe(section);
            });

            const itemObserver = new IntersectionObserver((entries) => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const isScrollingDown = scrollTop > lastScrollTop;

                entries.forEach((entry, index) => {
                    if (entry.isIntersecting && isScrollingDown && !entry.target.classList.contains('visible')) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 150);
                        itemObserver.unobserve(entry.target);
                    }
                });

                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            }, observerOptions);

            gridItems.forEach(item => {
                itemObserver.observe(item);
            });
        });
    </script>
@endsection