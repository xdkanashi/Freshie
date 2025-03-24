<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
    <header class="w-full bg-black/90 py-4 min-h-[140px] z-[900] overflow-visible relative">
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
                        class="h-40 sm:h-44 md:h-60 w-36 sm:w-40 md:w-48 min-h-[10rem] min-w-[9rem]"
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
                <!-- Cart Icon -->
                <div class="relative">
                    <button id="cart-toggle"
                        class="text-white text-2xl sm:text-3xl hover:text-gray-400 hover:scale-105">
                        <i class="fas fa-shopping-cart"></i>
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
                    <div class="flex items-center border-b border-white">
                        <input type="email" placeholder="Enter your email"
                            class="bg-transparent text-white text-xs sm:text-sm w-full outline-none py-2">
                        <button class="text-white text-base sm:text-lg"><i class="fas fa-arrow-right"></i></button>
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
                            South Korea (USD $) <i class="fas fa-chevron-down"></i>
                        </button>
                        <div id="region-dropdown"
                            class="absolute top-full left-0 w-full min-w-[200px] bg-black border border-white rounded mt-1 hidden z-10">
                            <div class="px-3 py-2 text-xs sm:text-sm uppercase font-bold tracking-wider hover:bg-gray-800 cursor-pointer"
                                data-value="South Korea (USD $)">South Korea (USD $)</div>
                            <div class="px-3 py-2 text-xs sm:text-sm uppercase font-bold tracking-wider hover:bg-gray-800 cursor-pointer"
                                data-value="Spain (USD $)">Spain (USD $)</div>
                            <div class="px-3 py-2 text-xs sm:text-sm uppercase font-bold tracking-wider hover:bg-gray-800 cursor-pointer"
                                data-value="Sweden (EUR €)">Sweden (EUR €)</div>
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
                    <h3 class="text-2xl font-extrabold uppercase tracking-widest text-white mb-5">Profile</h3>
                    <p class="text-sm text-gray-300 mb-3">Welcome, {{ Auth::user()->username ?? 'Guest' }}</p>
                    <button
                        class="w-full bg-black text-white text-sm font-bold uppercase tracking-wider py-2 rounded-lg border-2 border-white hover:bg-gray-800 transition-all duration-300"
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
            <p class="text-sm text-gray-300 mb-3">Your cart is empty</p>
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

            // Управление выпадающим меню корзины
            const cartButton = document.getElementById('cart-toggle');
            const cartDropdown = document.getElementById('cart-dropdown');

            if (cartButton && cartDropdown) {
                cartButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    cartDropdown.classList.toggle('opacity-100');
                    cartDropdown.classList.toggle('visible');
                    cartDropdown.classList.toggle('invisible');
                });

                document.addEventListener('click', function (e) {
                    if (!cartButton.contains(e.target) && !cartDropdown.contains(e.target)) {
                        cartDropdown.classList.remove('opacity-100');
                        cartDropdown.classList.remove('visible');
                        cartDropdown.classList.add('invisible');
                    }
                });
            }

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
        });
    </script>

    @yield('scripts')
</body>

</html>