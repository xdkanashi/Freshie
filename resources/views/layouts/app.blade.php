<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Freshie - @yield('title')</title>

    <!-- Tailwind CSS -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <!-- Font Awesome для иконок -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">

    <!-- Montserrat Font -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet">

    <!-- Favicon Links -->
    <link rel="apple-touch-icon" sizes="57x57" href="{{ asset('favicon/apple-icon-57x57.png') }}">
    <link rel="apple-touch-icon" sizes="60x60" href="{{ asset('favicon/apple-icon-60x60.png') }}">
    <link rel="apple-touch-icon" sizes="72x72" href="{{ asset('favicon/apple-icon-72x72.png') }}">
    <link rel="apple-touch-icon" sizes="76x76" href="{{ asset('favicon/apple-icon-76x76.png') }}">
    <link rel="apple-touch-icon" sizes="114x114" href="{{ asset('favicon/apple-icon-114x114.png') }}">
    <link rel="apple-touch-icon" sizes="120x120" href="{{ asset('favicon/apple-icon-120x120.png') }}">
    <link rel="apple-touch-icon" sizes="144x144" href="{{ asset('favicon/apple-icon-144x144.png') }}">
    <link rel="apple-touch-icon" sizes="152x152" href="{{ asset('favicon/apple-icon-152x152.png') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('favicon/apple-icon-180x180.png') }}">
    <link rel="icon" type="image/png" sizes="192x192" href="{{ asset('favicon/android-icon-192x192.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="96x96" href="{{ asset('favicon/favicon-96x96.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('favicon/favicon-16x16.png') }}">
    <link rel="manifest" href="{{ asset('favicon/manifest.json') }}">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="{{ asset('favicon/ms-icon-144x144.png') }}">
    <meta name="theme-color" content="#ffffff">
    <link rel="shortcut icon" href="{{ asset('favicon/favicon.ico') }}">
</head>

<body class="bg-black text-white font-sans">
    <!-- Header -->
    <header class="w-full bg-black/90 py-4 min-h-[94px] z-[900] overflow-visible relative">
        <div class="max-w-6xl mx-auto px-4 sm:px-5 flex items-center justify-between animate-fade-in">
            <!-- Mobile: Burger Menu on Left -->
            <div class="md:hidden flex items-center absolute top-16 md:static">
                <button id="burger-toggle" class="text-white text-2xl hover:text-gray-400">
                    <i class="fas fa-bars"></i>
                </button>
            </div>

            <!-- Logo: Centered on Mobile, Left on Desktop -->
            <div
                class="flex-shrink-0 md:order-1 order-2 absolute left-1/2 top-1 transform -translate-x-1/2 md:static md:transform-none">
                <a href="{{ url('/') }}">
                    <div id="logo-container"
                        class="h-28 sm:h-32 md:h-40 w-36 sm:w-40 md:w-48 min-h-[6.5rem] min-w-[9rem]"
                        style="cursor: grab; touch-action: manipulation;"></div>
                </a>
            </div>

            <!-- Right: Profile and Cart Icons (Always on Right) -->
            <div
                class="flex items-center space-x-3 sm:space-x-4 md:order-3 absolute top-16 right-4 md:static md:right-auto">
                <!-- Profile Icon -->
                <div class="relative">
                    <button id="profile-toggle"
                        class="text-white text-2xl sm:text-3xl hover:text-gray-400 hover:scale-105">
                        <i class="fas fa-user"></i>
                    </button>
                </div>
                <!-- Cart Icon with Count Badge -->
                <div class="relative">
                    <button id="cart-toggle"
                        class="text-white text-2xl sm:text-3xl hover:text-gray-400 hover:scale-105">
                        <i class="fas fa-shopping-cart"></i>
                        <div id="cart-count"
                            class="absolute -top-2 -right-2 w-5 h-5 bg-white text-black text-xs rounded-full flex items-center justify-center font-bold hidden">
                        </div>
                    </button>
                </div>
            </div>

            <!-- Center: Navigation (Desktop Only) -->
            <div class="hidden md:flex items-center justify-center flex-1 md:order-2">
                <nav class="flex flex-col space-y-4">
                    <div class="flex space-x-4 justify-center">
                        <a href="{{ url('/collections') }}"
                            class="text-white no-underline text-xl uppercase font-extrabold tracking-wider hover:text-gray-400 {{ request()->is('collections') ? 'border-b-2 border-white' : '' }}">Store</a>
                        <a href="{{ url('/contact') }}"
                            class="text-white no-underline text-xl uppercase font-extrabold tracking-wider hover:text-gray-400 {{ request()->is('contact') ? 'border-b-2 border-white' : '' }}">Contact</a>
                        <a href="{{ url('/shipping') }}"
                            class="text-white no-underline text-xl uppercase font-extrabold tracking-wider hover:text-gray-400 {{ request()->is('shipping') ? 'border-b-2 border-white' : '' }}">Shipping
                            & Delivery</a>
                    </div>
                    <div class="flex space-x-4 justify-center">
                        <a href="{{ url('/games') }}"
                            class="text-white no-underline text-xl uppercase font-extrabold tracking-wider hover:text-gray-400 {{ request()->is('games') ? 'border-b-2 border-white' : '' }}">Games</a>
                        <a href="{{ url('/leaderboard') }}"
                            class="text-white no-underline text-xl uppercase font-extrabold tracking-wider hover:text-gray-400 {{ request()->is('leaderboard') ? 'border-b-2 border-white' : '' }}">Leaderboard</a>
                    </div>
                </nav>
            </div>
        </div>
    </header>

    <!-- Mobile Navigation Menu -->
    <div id="mobile-nav"
        class="fixed top-0 left-0 w-full h-[42vh] bg-black/90 z-[950] hidden -translate-y-full transition-transform duration-500">
        <div class="flex flex-col h-full">
            <!-- Close Button (Moved to top) -->
            <div class="flex justify-end p-7">
                <button id="close-menu" class="text-white text-2xl hover:text-gray-400">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <!-- Navigation Links -->
            <nav class="flex flex-col items-center justify-start flex-grow space-y-6">
                <a href="{{ url('/collections') }}"
                    class="text-white text-2xl sm:text-3xl uppercase font-extrabold tracking-widest hover:text-gray-400 opacity-0 transition-opacity duration-300 {{ request()->is('collections') ? 'border-b-2 border-white' : '' }}">Store</a>
                <a href="{{ url('/contact') }}"
                    class="text-white text-2xl sm:text-3xl uppercase font-extrabold tracking-widest hover:text-gray-400 opacity-0 transition-opacity duration-300 {{ request()->is('contact') ? 'border-b-2 border-white' : '' }}">Contact</a>
                <a href="{{ url('/shipping') }}"
                    class="text-white text-2xl sm:text-3xl uppercase font-extrabold tracking-widest hover:text-gray-400 opacity-0 transition-opacity duration-300 {{ request()->is('shipping') ? 'border-b-2 border-white' : '' }}">Shipping
                    & Delivery</a>
                <a href="{{ url('/games') }}"
                    class="text-white text-2xl sm:text-3xl uppercase font-extrabold tracking-widest hover:text-gray-400 opacity-0 transition-opacity duration-300 {{ request()->is('games') ? 'border-b-2 border-white' : '' }}">Games</a>
                <a href="{{ url('/leaderboard') }}"
                    class="text-white text-2xl sm:text-3xl uppercase font-extrabold tracking-widest hover:text-gray-400 opacity-0 transition-opacity duration-300 {{ request()->is('leaderboard') ? 'border-b-2 border-white' : '' }}">Leaderboard</a>
            </nav>
        </div>
    </div>

    <!-- Main Content -->
    <main class="pt-[72px] sm:pt-[80px] md:pt-0 z-[100]">
        @yield('content')
    </main>

    <!-- Footer -->
    <footer class="bg-black text-white py-8 sm:py-10 mt-10 border-t border-gray-700 font-montserrat z-[50]">
        <div class="max-w-6xl mx-auto px-4 sm:px-5">
            <!-- Top Section -->
            <div class="flex flex-col md:flex-row justify-between items-start mb-8 sm:mb-10">
                <div class="w-full md:w-1/3 mb-5 md:mb-0">
                    <h4 class="text-base sm:text-lg uppercase font-bold tracking-wider mb-4">Subscribe to our emails
                    </h4>
                    <div class="relative">
                        <p id="error-message"
                            class="text-red-500 text-xs sm:text-sm uppercase font-bold tracking-wider mb-2 hidden">
                            Please enter a valid email address</p>
                        <div class="flex items-center border-b border-white" id="subscribe-container">
                            <input type="email" placeholder="Enter your email"
                                class="bg-transparent text-white text-xs sm:text-sm w-full outline-none py-2"
                                id="email-input">
                            <button class="text-white text-base sm:text-lg" id="subscribe-button"><i
                                    class="fas fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>

                <div class="flex space-x-3 sm:space-x-4">
                    <a href="https://www.instagram.com/freshie.exe/"
                        class="text-white text-base sm:text-lg hover:text-gray-400"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.youtube.com/" class="text-white text-base sm:text-lg hover:text-gray-400"><i
                            class="fab fa-youtube"></i></a>
                    <a href="https://www.tiktok.com/" class="text-white text-base sm:text-lg hover:text-gray-400"><i
                            class="fab fa-tiktok"></i></a>
                    <a href="https://open.spotify.com/" class="text-white text-base sm:text-lg hover:text-gray-400"><i
                            class="fab fa-spotify"></i></a>
                    <a href="https://discord.com/" class="text-white text-base sm:text-lg hover:text-gray-400"><i
                            class="fab fa-discord"></i></a>
                </div>
            </div>
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="w-full md:w-1/3 mb-5 md:mb-0 relative">
                    <label for="region"
                        class="text-xs sm:text-sm uppercase font-bold tracking-wider mb-2 block">Country/Region</label>
                    <div class="relative">
                        <button id="region-toggle"
                            class="w-full bg-black border border-white rounded px-3 py-2 text-xs sm:text-sm flex justify-between items-center uppercase font-bold tracking-wider">
                            Europe (EUR €) <i class="fas fa-chevron-down"></i>
                        </button>
                        <div id="region-dropdown"
                            class="absolute top-full left-0 w-full min-w-[200px] bg-black border border-white rounded mt-1 hidden z-10">
                            <div class="px-3 py-2 text-xs sm:text-sm uppercase font-bold tracking-wider hover:bg-gray-800 cursor-pointer"
                                data-value="Europe (EUR €)">Europe (EUR €)</div>
                            <div class="px-3 py-2 text-xs sm:text-sm uppercase font-bold tracking-wider hover:bg-gray-800 cursor-pointer"
                                data-value="North America (USD $)">North America (USD $)</div>
                            <div class="px-3 py-2 text-xs sm:text-sm uppercase font-bold tracking-wider hover:bg-gray-800 cursor-pointer"
                                data-value="Asia (USD $)">Asia (USD $)</div>
                            <div class="px-3 py-2 text-xs sm:text-sm uppercase font-bold tracking-wider hover:bg-gray-800 cursor-pointer"
                                data-value="South America (USD $)">South America (USD $)</div>
                            <div class="px-3 py-2 text-xs sm:text-sm uppercase font-bold tracking-wider hover:bg-gray-800 cursor-pointer"
                                data-value="Africa (USD $)">Africa (USD $)</div>
                            <div class="px-3 py-2 text-xs sm:text-sm uppercase font-bold tracking-wider hover:bg-gray-800 cursor-pointer"
                                data-value="Australia (AUD $)">Australia (AUD $)</div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap justify-center space-x-3 sm:space-x-4 mb-5 md:mb-0">
                    <a href="{{ url('/privacy-policy') }}"
                        class="text-white no-underline text-xs sm:text-sm uppercase font-bold tracking-wider hover:text-gray-400 {{ request()->is('privacy-policy') ? 'border-b-2 border-white' : '' }}">Privacy
                        Policy</a>
                    <a href="{{ url('/refund-policy') }}"
                        class="text-white no-underline text-xs sm:text-sm uppercase font-bold tracking-wider hover:text-gray-400 {{ request()->is('refund-policy') ? 'border-b-2 border-white' : '' }}">Refund
                        Policy</a>
                    <a href="{{ url('/terms-of-service') }}"
                        class="text-white no-underline text-xs sm:text-sm uppercase font-bold tracking-wider hover:text-gray-400 {{ request()->is('terms-of-service') ? 'border-b-2 border-white' : '' }}">Terms
                        of Service</a>
                    <a href="{{ url('/return-policy') }}"
                        class="text-white no-underline text-xs sm:text-sm uppercase font-bold tracking-wider hover:text-gray-400 {{ request()->is('return-policy') ? 'border-b-2 border-white' : '' }}">Return
                        Policy</a>
                </div>
                <div class="flex space-x-2">
                    <img src="{{ asset('img/google-pay.png') }}" alt="Google Pay" class="h-5 sm:h-6">
                    <img src="{{ asset('img/apple-pay.png') }}" alt="Apple Pay" class="h-5 sm:h-6">
                    <img src="{{ asset('img/visa2.png') }}" alt="Mastercard" class="h-5 sm:h-6">
                    <img src="{{ asset('img/paypal.png') }}" alt="PayPal" class="h-5 sm:h-6">
                    <img src="{{ asset('img/visa.png') }}" alt="Visa" class="h-5 sm:h-6">
                </div>
            </div>
            <div class="text-center mt-5 text-xs sm:text-sm font-bold text-gray-400">
                © 2025, FRESHIE. All Rights Reserved.
            </div>
        </div>
    </footer>

    <!-- Profile Dropdown -->
    <div id="profile-dropdown"
        class="profile-dropdown w-80 bg-black rounded-xl shadow-[20px_20px_40px_rgba(255,255,255,0.3),-20px_-20px_40px_rgba(0,0,0,0.5)] opacity-0 invisible transition-all duration-300 z-[10000] fixed top-[80px] right-[20px]">
        <div class="p-5">
            @if (Auth::check())
                <!-- Профиль для авторизованного пользователя -->
                <div>
                    <h3 class="text-2xl font-extrabold uppercase tracking-widest text-white mb-5">Welcome,
                        {{ Auth::user()->username ?? 'Guest' }}
                    </h3>

                    <!-- Кнопка-ссылка на профиль пользователя -->
                    <a href="{{ route('profile.show') }}"
                        class="block no-underline text-center w-full bg-black text-white text-sm font-bold uppercase tracking-wider py-2 rounded-lg border-2 border-white hover:bg-gray-800 transition-all duration-300">
                        My Profile
                    </a>

                    <!-- Кнопка выхода из аккаунта -->
                    <button
                        class="mt-3 w-full bg-black text-white text-sm font-bold uppercase tracking-wider py-2 rounded-lg border-2 border-white hover:bg-gray-800 transition-all duration-300"
                        onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                        Logout
                    </button>

                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                        @csrf
                    </form>
                </div>

            @else
                <!-- Форма входа для неавторизованного пользователя -->
                <h3 class="text-2xl font-extrabold uppercase tracking-widest text-white mb-5">Sign In</h3>
                <form method="POST" action="{{ route('login') }}">
                    @csrf
                    <input type="hidden" name="intended" value="{{ url()->current() }}">
                    <fieldset class="w-full">
                        <div class="mb-4">
                            <label for="login" class="block mb-2 text-white font-semibold text-sm sm:text-base">Username or
                                E-Mail</label>
                            <input type="text" name="login" id="login"
                                class="input w-full mb-2 sm:mb-3 p-2 sm:p-3 text-sm text-white bg-gray-700 rounded-lg shadow-inner focus:shadow-[0_0_15px_rgba(255,255,255,0.9)] focus:outline-none transition-all duration-300 glow-focus"
                                value="{{ old('login') }}" required autocomplete="username" maxlength="50">
                            @error('login')
                                <span class="text-red-500 text-sm block mb-2">{{ $message }}</span>
                            @enderror
                        </div>
                        <div class="mb-4 relative">
                            <label for="password"
                                class="block mb-2 text-white font-semibold text-sm sm:text-base">Password</label>
                            <input type="password" name="password" id="password"
                                class="input w-full mb-2 sm:mb-3 p-2 sm:p-3 text-sm text-white bg-gray-700 rounded-lg shadow-inner focus:shadow-[0_0_15px_rgba(255,255,255,0.9)] focus:outline-none transition-all duration-300 glow-focus"
                                required autocomplete="current-password" maxlength="50">
                            <span
                                class="absolute right-3 top-[60%] transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white toggle-password">
                                <i class="fas fa-eye" id="toggle-password-icon"></i>
                            </span>
                            @error('password')
                                <span class="text-red-500 text-sm block mb-2">{{ $message }}</span>
                            @enderror
                        </div>
                        <button type="submit"
                            class="w-full bg-black text-white text-sm font-bold uppercase tracking-wider py-2 rounded-lg border-2 border-white hover:bg-gray-800 transition-all duration-300">
                            Sign In
                        </button>
                    </fieldset>
                </form>
                <div class="mt-4 text-center">
                    <a href="#" class="text-xs text-gray-400 hover:text-white transition-colors duration-300">Forgot
                        Password?</a>
                </div>
                <div class="mt-2 text-center">
                    <p class="text-xs text-gray-400">New Here? <a href="{{ route('register') }}"
                            class="text-white hover:text-gray-300 transition-colors duration-300">Register</a></p>
                </div>
            @endif
        </div>
    </div>

    <!-- Cart Dropdown -->
    <div id="cart-dropdown"
        class="w-80 bg-black rounded-xl shadow-[20px_20px_40px_rgba(255,255,255,0.3),-20px_-20px_40px_rgba(0,0,0,0.5)] opacity-0 invisible transition-all duration-300 z-[10000] fixed top-[80px] right-[60px]">
        <div class="p-5">
            <h3 class="text-2xl font-extrabold uppercase tracking-widest text-white mb-5">Cart</h3>

            <!-- Loading spinner -->
            <div id="cart-loading" class="flex justify-center items-center py-4 hidden">
                <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>

            <div id="cart-items" class="space-y-4 max-h-96 overflow-y-auto mobile-scrollbar">
                <!-- Динамическое содержимое корзины -->
            </div>
            <div id="cart-total" class="mt-4 text-sm text-gray-300">
                <!-- Общая сумма -->
            </div>
            <a href="{{ url('/checkout') }}" id="checkout-button"
                class="mt-4 w-full bg-black text-white text-sm font-bold uppercase tracking-wider py-2 rounded-lg border-2 border-white hover:bg-gray-800 transition-all duration-300 text-center block hidden">
                Checkout
            </a>
        </div>
    </div>

    <!-- Кнопка "Scroll to Top" слева внизу -->
    <div class="fixed bottom-4 left-4 w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center opacity-0 invisible transition-opacity duration-300 z-[1000]"
        id="scroll-to-top">
        <i class="fas fa-chevron-up text-white text-2xl"></i>
    </div>

    <!-- JavaScript -->
    <script type="module">
        import * as THREE from "https://cdn.skypack.dev/three@0.134.0";
        import { GLTFLoader } from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/loaders/GLTFLoader.js";

        document.addEventListener('DOMContentLoaded', function () {
            // Инициализация 3D-логотипа
            const logoContainer = document.getElementById('logo-container');
            let scene, camera, renderer, model;
            let mouseX = 0;
            let isDragging = false;
            let isLogoVisible = false;

            function init3DLogo() {
                if (!logoContainer) {
                    console.error('Logo container not found');
                    return;
                }

                console.log('Initializing 3D logo...');

                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(75, logoContainer.clientWidth / logoContainer.clientHeight, 0.1, 1000);
                renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
                renderer.setSize(logoContainer.clientWidth, logoContainer.clientHeight);
                logoContainer.appendChild(renderer.domElement);

                // Освещение
                const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
                scene.add(ambientLight);
                const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
                directionalLight.position.set(0, 1, 1);
                scene.add(directionalLight);

                // Загрузка модели
                const loader = new GLTFLoader();
                loader.load('/models/freshlog4v.glb', function (gltf) {
                    console.log('Logo model loaded successfully');
                    model = gltf.scene;
                    const isMobile = window.innerWidth < 768;
                    model.scale.set(isMobile ? 4.0 : 5.4, isMobile ? 4.0 : 5.4, isMobile ? 4.0 : 5.4);
                    model.position.set(0, -2.3, 0);
                    scene.add(model);
                    isLogoVisible = true; // Модель загружена, можно рендерить
                }, (progress) => {
                    console.log(`Loading logo model: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
                }, (error) => {
                    console.error('Error loading logo model:', error);
                    isLogoVisible = false;
                });

                camera.position.z = 5;

                // Обработка событий мыши
                logoContainer.addEventListener('mousedown', (event) => {
                    if (event.button === 0) {
                        isDragging = true;
                        logoContainer.style.cursor = 'grabbing';
                    }
                });
                document.addEventListener('mouseup', (event) => {
                    if (event.button === 0) {
                        isDragging = false;
                        logoContainer.style.cursor = 'grab';
                    }
                });
                document.addEventListener('mousemove', (event) => {
                    if (isDragging && model) {
                        const deltaX = event.movementX * 0.005;
                        model.rotation.y += deltaX;
                    }
                });

                // Поддержка сенсорных устройств
                logoContainer.addEventListener('touchstart', (event) => {
                    isDragging = true;
                    mouseX = event.touches[0].clientX;
                    logoContainer.style.cursor = 'grabbing';
                });
                logoContainer.addEventListener('touchend', () => {
                    isDragging = false;
                    logoContainer.style.cursor = 'grab';
                });
                logoContainer.addEventListener('touchmove', (event) => {
                    if (isDragging && model) {
                        const newMouseX = event.touches[0].clientX;
                        const deltaX = (newMouseX - mouseX) * 0.005;
                        model.rotation.y += deltaX;
                        mouseX = newMouseX;
                    }
                });

                // Автовращение и рендеринг
                function animateLogo() {
                    requestAnimationFrame(animateLogo);
                    if (!isLogoVisible) return; // Не рендерим, если логотип не виден
                    if (model && !isDragging) {
                        model.rotation.y += 0.003;
                    }
                    renderer.render(scene, camera);
                }
                animateLogo();

                // Адаптация размера при изменении окна
                window.addEventListener('resize', () => {
                    if (logoContainer.clientWidth > 0 && logoContainer.clientHeight > 0) {
                        renderer.setSize(logoContainer.clientWidth, logoContainer.clientHeight);
                        camera.aspect = logoContainer.clientWidth / logoContainer.clientHeight;
                        camera.updateProjectionMatrix();
                    }
                });
            }
            init3DLogo();

            // Бургер-меню
            const burgerToggle = document.getElementById('burger-toggle');
            const mobileNav = document.getElementById('mobile-nav');
            const closeMenu = document.getElementById('close-menu');
            const body = document.body;
            const navItems = mobileNav ? mobileNav.querySelectorAll('a') : [];

            if (burgerToggle && mobileNav) {
                burgerToggle.addEventListener('click', function () {
                    mobileNav.classList.remove('hidden');
                    mobileNav.classList.remove('-translate-y-full');
                    mobileNav.classList.add('translate-y-0');
                    mobileNav.classList.add('opacity-100');
                    body.classList.add('overflow-hidden');

                    navItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('opacity-100');
                        }, index * 200);
                    });
                });
            }

            if (closeMenu && mobileNav) {
                closeMenu.addEventListener('click', function () {
                    mobileNav.classList.remove('translate-y-0');
                    mobileNav.classList.remove('opacity-100');
                    mobileNav.classList.add('-translate-y-full');
                    navItems.forEach(item => item.classList.remove('opacity-100'));
                    setTimeout(() => {
                        mobileNav.classList.add('hidden');
                    }, 500);
                    body.classList.remove('overflow-hidden');
                });
            }

            document.addEventListener('click', function (e) {
                if (mobileNav && !burgerToggle.contains(e.target) && !mobileNav.contains(e.target)) {
                    mobileNav.classList.remove('translate-y-0');
                    mobileNav.classList.remove('opacity-100');
                    mobileNav.classList.add('-translate-y-full');
                    navItems.forEach(item => item.classList.remove('opacity-100'));
                    setTimeout(() => {
                        mobileNav.classList.add('hidden');
                    }, 500);
                    body.classList.remove('overflow-hidden');
                }
            });

            // Управление выпадающим меню профиля
            const profileButton = document.getElementById('profile-toggle');
            const profileDropdown = document.getElementById('profile-dropdown');
            const passwordInput = document.getElementById('password');
            const hasErrors = @json($errors->has('login') || $errors->has('password'));
            const showLoginForm = @json(session('show_login_form'));

            if (profileButton && profileDropdown) {
                profileButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    profileDropdown.classList.toggle('opacity-100');
                    profileDropdown.classList.toggle('visible');
                    profileDropdown.classList.toggle('invisible');
                });

                document.addEventListener('click', function (e) {
                    if (!profileButton.contains(e.target) && !profileDropdown.contains(e.target)) {
                        if (!hasErrors && !showLoginForm && !document.activeElement.matches('#login, #password')) {
                            profileDropdown.classList.remove('opacity-100');
                            profileDropdown.classList.remove('visible');
                            profileDropdown.classList.add('invisible');
                        }
                    }
                });

                if (passwordInput) {
                    passwordInput.addEventListener('focus', function () {
                        profileDropdown.classList.add('opacity-100');
                        profileDropdown.classList.add('visible');
                        profileDropdown.classList.remove('invisible');
                    });
                }

                if (hasErrors || showLoginForm) {
                    profileDropdown.classList.add('opacity-100');
                    profileDropdown.classList.add('visible');
                    profileDropdown.classList.remove('invisible');
                }
            }

            // Выпадающий список регионов
            const toggleButton = document.getElementById('region-toggle');
            const dropdown = document.getElementById('region-dropdown');
            const options = dropdown ? dropdown.querySelectorAll('div[data-value]') : [];

            if (toggleButton && dropdown) {
                toggleButton.addEventListener('click', function () {
                    dropdown.classList.toggle('hidden');
                });

                options.forEach(option => {
                    option.addEventListener('click', function () {
                        toggleButton.childNodes[0].textContent = this.getAttribute('data-value');
                        dropdown.classList.add('hidden');
                    });
                });

                document.addEventListener('click', function (e) {
                    if (!toggleButton.contains(e.target) && !dropdown.contains(e.target)) {
                        dropdown.classList.add('hidden');
                    }
                });
            }

            // Управление выпадающим меню корзины
            const cartButton = document.getElementById('cart-toggle');
            const cartDropdown = document.getElementById('cart-dropdown');
            const cartItemsContainer = document.getElementById('cart-items');
            const cartTotalContainer = document.getElementById('cart-total');
            const checkoutButton = document.getElementById('checkout-button');
            const cartCountBadge = document.getElementById('cart-count');
            const cartLoading = document.getElementById('cart-loading');

            // Функция обновления бейджа
            function updateCartBadge() {
                fetch('/cart/get', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success && data.items) {
                            const itemCount = data.items.reduce((total, item) => total + item.quantity, 0);
                            cartCountBadge.textContent = itemCount;
                            if (itemCount > 0) {
                                cartCountBadge.classList.remove('hidden');
                            } else {
                                cartCountBadge.classList.add('hidden');
                            }
                        } else {
                            cartCountBadge.textContent = '0';
                            cartCountBadge.classList.add('hidden');
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching cart count:', error);
                        cartCountBadge.textContent = '0';
                        cartCountBadge.classList.add('hidden');
                    });
            }

            function showCartLoading() {
                cartLoading.classList.remove('hidden');
                cartItemsContainer.classList.add('hidden');
            }

            function hideCartLoading() {
                cartLoading.classList.add('hidden');
                cartItemsContainer.classList.remove('hidden');
            }

            // Функция полного обновления корзины (при клике)
            function updateCart() {
                showCartLoading();

                fetch('/cart/get', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        hideCartLoading();

                        if (data.success) {
                            cartItemsContainer.innerHTML = '';

                            // Update cart count badge
                            const itemCount = data.items.reduce((total, item) => total + item.quantity, 0);
                            cartCountBadge.textContent = itemCount;
                            if (itemCount > 0) {
                                cartCountBadge.classList.remove('hidden');
                            } else {
                                cartCountBadge.classList.add('hidden');
                            }

                            if (itemCount === 0) {
                                cartItemsContainer.innerHTML = '<p class="text-sm text-gray-300 mb-3">Your cart is empty</p>';
                                checkoutButton.classList.add('hidden');
                            } else {
                                data.items.forEach(item => {
                                    const price = typeof item.price === 'number' ? item.price : 0;
                                    const discount = typeof item.discount === 'number' ? item.discount : 0;
                                    const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;
                                    const formattedPrice = price.toFixed(2);
                                    const formattedDiscountedPrice = discountedPrice.toFixed(2);

                                    const itemElement = document.createElement('div');
                                    itemElement.classList.add('flex', 'items-center', 'gap-3', 'border-b', 'border-gray-700', 'pb-3');
                                    itemElement.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                        <div class="flex-1">
                            <p class="text-sm font-bold text-white">${item.name}</p>
                            <p class="text-xs text-gray-400">Size: ${item.size}</p>
                            <div class="flex items-center gap-1 mt-1">
                                ${discount > 0 ? `<span class="line-through text-gray-400 text-xs">$${formattedPrice}</span>` : ''}
                                <span class="text-sm font-bold">$${formattedDiscountedPrice}</span>
                            </div>
                            <div class="flex items-center gap-2 mt-1">
                                <button class="decrease-quantity text-gray-400 hover:text-white" data-cart-item-id="${item.id}">-</button>
                                <span class="text-sm">${item.quantity}</span>
                                <button class="increase-quantity text-gray-400 hover:text-white" data-cart-item-id="${item.id}">+</button>
                            </div>
                        </div>
                        <button class="remove-item text-gray-400 hover:text-red-500" data-cart-item-id="${item.id}">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                                    cartItemsContainer.appendChild(itemElement);
                                });
                                checkoutButton.classList.remove('hidden');
                            }

                            const total = typeof data.total === 'number' ? data.total.toFixed(2) : '0.00';
                            cartTotalContainer.innerHTML = `<p class="font-bold">Total: $${total}</p>`;
                        } else {
                            cartItemsContainer.innerHTML = '<p class="text-sm text-gray-300 mb-3">Your cart is empty</p>';
                            checkoutButton.classList.add('hidden');
                            cartCountBadge.textContent = '0';
                            cartCountBadge.classList.add('hidden');
                        }
                    })
                    .catch(error => {
                        hideCartLoading();
                        console.error('Error fetching cart:', error);
                        cartItemsContainer.innerHTML = '<p class="text-sm text-gray-300 mb-3">Error loading cart</p>';
                        cartCountBadge.textContent = '0';
                        cartCountBadge.classList.add('hidden');
                    });
            }

            // Инициализация при загрузке страницы
            updateCartBadge(); // Обновляем бейдж сразу при загрузке

            // Открытие корзины при клике
            if (cartButton && cartDropdown) {
                cartButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    cartDropdown.classList.toggle('opacity-100');
                    cartDropdown.classList.toggle('visible');
                    cartDropdown.classList.toggle('invisible');
                    updateCart(); // Полное обновление корзины при клике
                });

                document.addEventListener('click', function (e) {
                    if (!cartButton.contains(e.target) && !cartDropdown.contains(e.target)) {
                        cartDropdown.classList.remove('opacity-100');
                        cartDropdown.classList.remove('visible');
                        cartDropdown.classList.add('invisible');
                    }
                });
            }

            // Обработчики для кнопок изменения количества и удаления
            cartItemsContainer.addEventListener('click', function (e) {
                if (e.target.classList.contains('increase-quantity') || e.target.classList.contains('decrease-quantity')) {
                    showCartLoading();

                    const cartItemId = e.target.getAttribute('data-cart-item-id');
                    const isIncrease = e.target.classList.contains('increase-quantity');
                    const quantitySpan = e.target.parentElement.querySelector('span');
                    let quantity = parseInt(quantitySpan.textContent);

                    quantity = isIncrease ? quantity + 1 : quantity - 1;

                    fetch('/cart/update', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                        },
                        body: JSON.stringify({
                            cart_item_id: cartItemId,
                            quantity: quantity
                        })
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                updateCart(); // Обновляем корзину
                                updateCartBadge(); // Обновляем бейдж
                            } else {
                                hideCartLoading();
                            }
                        })
                        .catch(error => {
                            hideCartLoading();
                            console.error('Error updating quantity:', error);
                        });
                }

                if (e.target.classList.contains('remove-item') || e.target.parentElement.classList.contains('remove-item')) {
                    showCartLoading();

                    const cartItemId = e.target.getAttribute('data-cart-item-id') || e.target.parentElement.getAttribute('data-cart-item-id');

                    fetch('/cart/remove', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                        },
                        body: JSON.stringify({
                            cart_item_id: cartItemId
                        })
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                updateCart(); // Обновляем корзину
                                updateCartBadge(); // Обновляем бейдж
                            } else {
                                hideCartLoading();
                            }
                        })
                        .catch(error => {
                            hideCartLoading();
                            console.error('Error removing item:', error);
                        });
                }
            });

            // Переключение видимости пароля
            const passwordToggle = document.querySelector('.toggle-password');
            const toggleIcon = document.getElementById('toggle-password-icon');

            if (passwordToggle && passwordInput && toggleIcon) {
                passwordToggle.addEventListener('click', function () {
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
            }

            // Кнопка "Scroll to Top"
            const scrollToTopButton = document.getElementById('scroll-to-top');
            if (scrollToTopButton) {
                window.addEventListener('scroll', function () {
                    if (window.scrollY > 300) {
                        scrollToTopButton.classList.add('visible');
                        scrollToTopButton.classList.remove('invisible');
                        scrollToTopButton.classList.add('opacity-100');
                    } else {
                        scrollToTopButton.classList.remove('visible');
                        scrollToTopButton.classList.add('invisible');
                        scrollToTopButton.classList.remove('opacity-100');
                    }
                });

                scrollToTopButton.addEventListener('click', function () {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }

            // Плавное скрытие дропдауна при скролле вниз
            let lastScrollTop = 0;
            window.addEventListener('scroll', function () {
                let currentScrollTop = window.scrollY || document.documentElement.scrollTop;

                if (currentScrollTop > lastScrollTop) {
                    if (profileDropdown.classList.contains('visible') && !document.activeElement.matches('#login, #password')) {
                        profileDropdown.classList.remove('opacity-100');
                        profileDropdown.classList.remove('visible');
                        profileDropdown.classList.add('invisible');
                    }
                    if (cartDropdown.classList.contains('visible')) {
                        cartDropdown.classList.remove('opacity-100');
                        cartDropdown.classList.remove('visible');
                        cartDropdown.classList.add('invisible');
                    }
                }
                lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
            });

            // Делаем updateCartBadge доступной глобально, чтобы её можно было вызвать из других скриптов
            window.updateCartBadge = updateCartBadge;
        });

        document.addEventListener('DOMContentLoaded', function () {
            const subscribeButton = document.getElementById('subscribe-button');
            const emailInput = document.getElementById('email-input');
            const subscribeContainer = document.getElementById('subscribe-container');
            const errorMessage = document.getElementById('error-message');

            subscribeButton.addEventListener('click', function () {
                const email = emailInput.value.trim();
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (emailPattern.test(email)) {
                    // Если email валиден, показываем "Спасибо"
                    subscribeContainer.innerHTML = '<p class="text-white text-xs sm:text-sm w-full py-2">Thank you for subscribing!</p>';
                    errorMessage.classList.add('hidden'); // Скрываем сообщение об ошибке
                } else {
                    // Если email невалиден, показываем уведомление
                    errorMessage.classList.remove('hidden');
                }
            });
        });
    </script>

    @yield('scripts')
</body>

</html>