@extends('layouts.app')

@section('title', 'Home')

@section('content')
    <!-- CSRF Token for AJAX -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Hero Section -->
    <section class="relative w-full min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
        <!-- Background Video or Image -->
        <div class="absolute inset-0 z-0">
            <video id="hero-video" muted class="w-full h-full object-cover opacity-30 transition-opacity duration-500">
                <source src="{{ asset('video/Freshie.mp4') }}" type="video/mp4">
            </video>
        </div>

        <!-- Hero Content -->
        <div id="hero-content" class="relative z-10 text-center px-4 sm:px-6 animate-fade-in">
            <h1 class="text-5xl sm:text-7xl md:text-8xl uppercase font-extrabold tracking-widest mb-6 font-montserrat">
                Freshie
            </h1>
            <p class="text-lg sm:text-xl md:text-2xl uppercase tracking-wider mb-8 text-gray-300">
                Streetwear Born in Chaos | Est. 2025
            </p>
            <a href="{{ url('/collections') }}" id="explore-now"
                class="inline-block bg-white text-black px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg uppercase rounded-xl font-bold tracking-wider hover:bg-gray-200 transition-all duration-300">
                Explore Now
            </a>
        </div>
    </section>

    <!-- JavaScript для управления видео и анимацией -->
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const video = document.getElementById('hero-video');
            const exploreButton = document.getElementById('explore-now');
            const heroContent = document.getElementById('hero-content');
            const linkUrl = exploreButton.getAttribute('href');

            // Устанавливаем видео на первый кадр и приостанавливаем
            video.currentTime = 0;
            video.pause();

            // Обработка клика на кнопку
            exploreButton.addEventListener('click', function (e) {
                e.preventDefault(); // Предотвращаем немедленный переход

                // Более плавное исчезновение текста с увеличенной продолжительностью
                heroContent.classList.add('opacity-0', 'blur-sm');
                heroContent.style.transition = 'opacity 2s ease-out, blur 2s ease-out'; // Увеличили до 2s с мягким переходом

                // Увеличиваем видимость видео (убираем затемнение) одновременно
                video.classList.remove('opacity-30');
                video.classList.add('opacity-100');
                video.style.transition = 'opacity 2s ease-in'; // Синхронизируем с текстом

                // Запускаем видео сразу же
                video.play(); // Начинаем воспроизведение видео без задержки

                // Полностью убираем контент после завершения анимации текста
                setTimeout(() => {
                    heroContent.style.display = 'none';
                    // Убираем кнопку из контента перед повторным показом
                    exploreButton.style.display = 'none';
                }, 2000); // Синхронизируем с продолжительностью анимации (2s)

                // Плавное появление лого и описания перед концом видео
                video.addEventListener('timeupdate', function () {
                    // Проверяем, осталось ли 1 секунда до конца видео
                    if (video.duration - video.currentTime <= 1) {
                        heroContent.style.display = 'block'; // Показываем контент
                        heroContent.classList.remove('opacity-0', 'blur-sm'); // Убираем эффекты распыления
                        heroContent.classList.add('opacity-100'); // Плавное появление
                        heroContent.style.transition = 'opacity 2s ease-in'; // Плавное появление
                    }
                });

                // Переход по ссылке после окончания видео
                video.addEventListener('ended', function () {
                    window.location.href = linkUrl; // Переход на /collections
                }, { once: true }); // Слушатель срабатывает только один раз
            });
        });
    </script>

    <!-- About Brand Section -->
    <section class="w-full py-16 sm:py-20 bg-black text-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 class="text-4xl sm:text-5xl uppercase font-extrabold tracking-widest mb-12 text-center font-montserrat">
                Our Essence
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <!-- Left: Text -->
                <div class="flex flex-col justify-center">
                    <p class="text-base sm:text-lg uppercase tracking-wider text-gray-300 leading-relaxed">
                        Freshie is not just a brand; it's a way of life. Founded in 2023 at the heart of street culture,
                        we blend boldness, style, and a rebellious spirit. Every piece of our clothing is a challenge to the
                        ordinary.
                    </p>
                </div>
                <!-- Right: Image -->
                <div class="relative">
                    <img src="{{ asset('img/logo-removebg.png') }}" alt="Freshie Story"
                        class="w-full h-[400px] object-cover rounded-sm animate-fade-in">
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
                <!-- Product 1 -->
                <div class="group">
                    <img src="{{ asset('//premiumdemo.site/cdn/shop/files/ZIPHOODIEFRONT.png?v=1726769463') }}"
                        alt="Drop 001 Item 1"
                        class="w-full h-[300px] object-cover mb-4 group-hover:opacity-80 transition-opacity duration-300">
                    <p class="text-sm sm:text-base uppercase tracking-wider text-gray-300">Chaos Hoodie</p>
                </div>
                <!-- Product 2 -->
                <div class="group">
                    <img src="{{ asset('//premiumdemo.site/cdn/shop/files/93wi6o.gif?v=1726678774&width=1946') }}"
                        alt="Drop 001 Item 2"
                        class="w-full h-[300px] object-cover mb-4 group-hover:opacity-80 transition-opacity duration-300">
                    <p class="text-sm sm:text-base uppercase tracking-wider text-gray-300">Rebel Tee</p>
                </div>
                <!-- Product 3 -->
                <div class="group">
                    <img src="{{ asset('//premiumdemo.site/cdn/shop/files/FRONTFLAREDSWEATPANTS.png') }}"
                        alt="Drop 001 Item 3"
                        class="w-full h-[300px] object-cover mb-4 group-hover:opacity-80 transition-opacity duration-300">
                    <p class="text-sm sm:text-base uppercase tracking-wider text-gray-300">Night Pants</p>
                </div>
            </div>
            <a href="{{ url('/collections') }}"
                class="inline-block mt-12 bg-white text-black px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg rounded-xl uppercase font-bold tracking-wider hover:bg-gray-200 transition-all duration-300">
                Shop Collection
            </a>
        </div>
    </section>

    <!-- Game Section -->
    <section class="w-full py-8 sm:py-10 bg-black text-white border-t border-gray-700">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h2 class="text-4xl sm:text-5xl uppercase font-extrabold tracking-widest mb-12 font-montserrat">
                Play Our Exclusive Game!
            </h2>
            <!-- Game Container -->
            <div id="game-container" class="game-container flex justify-center items-center w-full">
                <div class="game-wrapper flex justify-center items-center">
                    <!-- p5.js will inject the canvas here -->
                </div>
            </div>
            <!-- Leaderboard -->
            <div id="leaderboard"
                class="mt-5 bg-black/80 backdrop-blur-md border-2 border-white/10 rounded-xl shadow-lg w-full max-w-[750px] min-w-[320px] mx-auto p-4 sm:p-5">
                <h3
                    class="text-xl sm:text-2xl lg:text-[26px] font-extrabold uppercase tracking-wider text-white mb-3 sm:mb-4 text-center">
                    Leaderboard - Top 10
                </h3>
                <table id="leaderboard-table" class="w-full font-sans text-white uppercase">
                    <thead>
                        <tr class="bg-white/5 border-b border-white/10">
                            <th
                                class="py-1 px-2 sm:py-1.5 sm:px-3 lg:py-2 lg:px-4 text-center font-extrabold text-xs sm:text-sm lg:text-base">
                                Rank</th>
                            <th
                                class="py-1 px-2 sm:py-1.5 sm:px-3 lg:py-2 lg:px-4 text-center font-extrabold text-xs sm:text-sm lg:text-base">
                                Player</th>
                            <th
                                class="py-1 px-2 sm:py-1.5 sm:px-3 lg:py-2 lg:px-4 text-center font-extrabold text-xs sm:text-sm lg:text-base">
                                Score</th>
                        </tr>
                    </thead>
                    <tbody id="leaderboard-body">
                        <tr class="pt-1 sm:pt-1.5 lg:pt-2">
                            <td colspan="3"
                                class="py-1.5 sm:py-2 text-center font-extrabold text-xs sm:text-sm lg:text-base">No scores
                                yet!</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- Instagram Section -->
    <section class="w-full py-8 sm:py-20 bg-black text-white border-t border-gray-700">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h2 class="text-4xl sm:text-5xl uppercase font-extrabold tracking-widest mb-12 font-montserrat">
                Follow Us on Instagram
            </h2>
            <div class="flex justify-center mb-8">
                <a href="https://www.instagram.com/freshie.exe/"
                    class="inline-block bg-white text-black px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg uppercase rounded-xl font-bold tracking-wider hover:bg-gray-200 transition-all duration-300">
                    Visit @freshie.exe
                </a>
            </div>
            <!-- Instagram Feed Embed (Centered) -->
            <div class="instagram-feed flex justify-center w-full">
                <blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/freshie.exe/"
                    data-instgrm-version="14"
                    style="background: #FFF; border: 0; border-radius: 3px; box-shadow: 0 0 1px rgba(0,0,0,0.5),0 1px 10px rgba(0,0,0,0.15); margin: 1px; max-width: 540px; min-width: 326px; padding: 0; width: calc(100% - 2px);">
                    <div style="padding: 16px;">
                        <!-- Instagram Embed Content -->
                    </div>
                </blockquote>
                <script async src="//www.instagram.com/embed.js"></script>
            </div>
            <p class="text-base sm:text-lg uppercase tracking-wider text-gray-300 mt-8">
                Stay updated with our latest drops, events, and streetwear inspiration.
            </p>
        </div>
    </section>

    <!-- Include Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/p5@1.4.2/lib/p5.js"></script>
    <!-- <script src="https://cdn.jsdelivr.net/npm/p5@1.4.2/lib/addons/p5.sound.min.js"></script> -->
    <script>
        // Set the asset base URL for the game
        window.ASSET_BASE_URL = "{{ asset('') }}"; // Используем window для явной глобальной переменной
    </script>
    <script src="{{ asset('js/game.js') }}"></script>
@endsection