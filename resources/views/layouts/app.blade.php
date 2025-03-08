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
    <!-- Frozen Line -->
    <div
        class="frozen-line bg-black text-white text-center py-2 fixed top-0 w-full z-[101] overflow-hidden whitespace-nowrap animate-fade-in">
        <span class="inline-block text-xs sm:text-sm uppercase font-bold tracking-widest animate-marquee">
            FREE SHIPPING WORLDWIDE | WEBSITE BY RAMMENZ | USE HELLSTAR12 TO GET 15% OFF | FRESHIE PREMIUM THEME
        </span>
    </div>

<!-- Header -->
<header class="w-full bg-black/90 py-3 z-[100] min-h-[70px] pt-[40px] sm:pt-[48px]">
    <div class="max-w-6xl mx-auto px-4 sm:px-5 flex items-center justify-between animate-fade-in">
        <!-- Left: Burger Menu for Mobile -->
        <div class="md:hidden flex items-center space-x-4">
            <button id="burger-toggle" class="text-white text-2xl hover:text-gray-400">
                <i class="fas fa-bars"></i>
            </button>
        </div>

        <!-- Left: Navigation (Desktop) -->
        <div class="hidden md:block flex-shrink-0">
            <nav class="flex space-x-4">
                <a href="{{ url('/collections') }}"
                    class="text-white no-underline text-sm sm:text-lg uppercase font-extrabold tracking-wider hover:text-gray-400 {{ request()->is('collections') ? 'border-b-2 border-white' : '' }}">Store</a>
                <a href="{{ url('/contact') }}"
                    class="text-white no-underline text-sm sm:text-lg uppercase font-extrabold tracking-wider hover:text-gray-400 {{ request()->is('contact') ? 'border-b-2 border-white' : '' }}">Contact</a>
                <a href="{{ url('/lookbook') }}"
                    class="text-white no-underline text-sm sm:text-lg uppercase font-extrabold tracking-wider hover:text-gray-400 {{ request()->is('lookbook') ? 'border-b-2 border-white' : '' }}">Lookbook</a>
                <a href="{{ url('/return-policy') }}"
                    class="text-white no-underline text-sm sm:text-lg uppercase font-extrabold tracking-wider hover:text-gray-400 {{ request()->is('return-policy') ? 'border-b-2 border-white' : '' }}">Return
                    Policy</a>
                <a href="/pre-order-status"
                    class="text-white no-underline text-sm sm:text-lg uppercase font-extrabold tracking-wider hover:text-gray-400 {{ request()->is('pre-order-status') ? 'border-b-2 border-white' : '' }}">Pre-Order
                    Status</a>
            </nav>
        </div>

        <!-- Center: Logo Animation with Homepage Link -->
        <div class="flex-shrink-0 mx-auto md:mx-0">
            <a href="{{ url('/') }}">
                <img src="{{ asset('img/logo-removebg.png') }}" alt="Freshie Logo"
                    class="h-16 sm:h-20 md:h-24 object-contain animate-pulse-slow cursor-pointer">
            </a>
        </div>

        <!-- Right: Icons (Mobile & Desktop) -->
        <div class="flex items-center space-x-3 sm:space-x-4">
            <a href="#" class="text-white text-xl sm:text-2xl hover:text-gray-400 hover:scale-105">
                <i class="fas fa-user"></i> <!-- Заменили fa-search на fa-user -->
            </a>
            <a href="#" class="text-white text-xl sm:text-2xl hover:text-gray-400 hover:scale-105">
                <i class="fas fa-shopping-cart"></i>
            </a>
        </div>
    </div>

    <!-- Mobile Navigation (Slide-in Menu) -->
    <div id="mobile-nav"
        class="fixed top-0 left-0 w-3/4 h-full bg-black/90 flex flex-col space-y-6 p-4 z-[102] opacity-0 transform -translate-y-full transition-all duration-500 ease-in-out hidden md:hidden">
        <div class="flex items-center justify-between mb-6">
            <button id="close-menu" class="text-white text-2xl hover:text-gray-400">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <a href="{{ url('/collections') }}"
            class="text-white no-underline text-lg uppercase font-extrabold tracking-wider hover:text-gray-400 border-b border-gray-300 pb-2 opacity-0 {{ request()->is('collections') ? 'border-b-2 border-white' : '' }}"
            style="transition: opacity 0.5s ease-out 0.1s;">Store</a>
        <a href="{{ url('/contact') }}"
            class="text-white no-underline text-lg uppercase font-extrabold tracking-wider hover:text-gray-400 border-b border-gray-300 pb-2 opacity-0 {{ request()->is('contact') ? 'border-b-2 border-white' : '' }}"
            style="transition: opacity 0.5s ease-out 0.3s;">Contact</a>
        <a href="{{ url('/lookbook') }}"
            class="text-white no-underline text-lg uppercase font-extrabold tracking-wider hover:text-gray-400 border-b border-gray-300 pb-2 opacity-0 {{ request()->is('lookbook') ? 'border-b-2 border-white' : '' }}"
            style="transition: opacity 0.5s ease-out 0.5s;">Lookbook</a>
        <a href="{{ url('/return-policy') }}"
            class="text-white no-underline text-lg uppercase font-extrabold tracking-wider hover:text-gray-400 border-b border-gray-300 pb-2 opacity-0 {{ request()->is('return-policy') ? 'border-b-2 border-white' : '' }}"
            style="transition: opacity 0.5s ease-out 0.7s;">Return Policy</a>
        <a href="{{ url('/pre-order-status') }}"
            class="text-white no-underline text-lg uppercase font-extrabold tracking-wider hover:text-gray-400 border-b border-gray-300 pb-2 opacity-0 {{ request()->is('pre-order-status') ? 'border-b-2 border-white' : '' }}"
            style="transition: opacity 0.5s ease-out 0.9s;">Pre-Order Status</a>
    </div>
</header>

    <!-- Main Content -->
    <main class="pt-[40px] sm:pt-[48px]">
        @yield('content')
    </main>

    <!-- Footer -->
    <footer class="bg-black text-white py-8 sm:py-10 mt-10 border-t border-gray-700 font-montserrat">
        <div class="max-w-6xl mx-auto px-4 sm:px-5">
            <!-- Top Section -->
            <div class="flex flex-col md:flex-row justify-between items-start mb-8 sm:mb-10">
                <!-- Subscribe Section -->
                <div class="w-full md:w-1/3 mb-5 md:mb-0">
                    <h4 class="text-base sm:text-lg uppercase font-bold tracking-wider mb-4">Subscribe to our emails
                    </h4>
                    <div class="flex items-center border-b border-white">
                        <input type="email" placeholder="Enter your email"
                            class="bg-transparent text-white text-xs sm:text-sm w-full outline-none py-2">
                        <button class="text-white text-base sm:text-lg"><i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>

                <!-- Social Media Icons -->
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

            <!-- Bottom Section -->
            <div class="flex flex-col md:flex-row justify-between items-center">
                <!-- Region Selector -->
                <div class="w-full md:w-1/3 mb-5 md:mb-0 relative">
                    <label for="region"
                        class="text-xs sm:text-sm uppercase font-bold tracking-wider mb-2 block">Country/Region</label>
                    <div class="relative">
                        <button id="region-toggle"
                            class="w-full bg-black border border-white rounded px-3 py-2 text-xs sm:text-sm flex justify-between items-center uppercase font-bold tracking-wider">
                            Latvia (USD $) <i class="fas fa-chevron-down"></i>
                        </button>
                        <div id="region-dropdown"
                            class="absolute top-full left-0 w-full min-w-[200px] bg-black border border-white rounded mt-1 hidden z-10">
                            <div class="px-3 py-2 text-xs sm:text-sm uppercase font-bold tracking-wider hover:bg-gray-800 cursor-pointer"
                                data-value="South Korea (USD $)">South Korea (USD $)</div>
                            <div class="px-3 py-2 text-xs sm:text-sm uppercase font-bold tracking-wider hover:bg-gray-800 cursor-pointer"
                                data-value="Spain (USD $)">Spain (USD $)</div>
                            <div class="px-3 py-2 text-xs sm:text-sm uppercase font-bold tracking-wider hover:bg-gray-800 cursor-pointer"
                                data-value="Sweden (EUR €)">Sweden (EUR €)</div>
                            <div class="px-3 py-2 text-xs sm:text-sm uppercase font-bold tracking-wider hover:bg-gray-800 cursor-pointer"
                                data-value="Latvia (EUR €)">Latvia (EUR €)</div>
                        </div>
                    </div>
                </div>

                <!-- Footer Links -->
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
                </div>

                <!-- Payment Methods -->
                <div class="flex space-x-2">
                    <img src="{{ asset('img/google-pay.png') }}" alt="Google Pay" class="h-5 sm:h-6">
                    <img src="{{ asset('img/apple-pay.png') }}" alt="Apple Pay" class="h-5 sm:h-6">
                    <img src="{{ asset('img/visa2.png') }}" alt="Mastercard" class="h-5 sm:h-6">
                    <img src="{{ asset('img/paypal.png') }}" alt="PayPal" class="h-5 sm:h-6">
                    <img src="{{ asset('img/visa.png') }}" alt="Visa" class="h-5 sm:h-6">
                </div>
            </div>

            <!-- Copyright -->
            <div class="text-center mt-5 text-xs sm:text-sm font-bold text-gray-400">
                © 2025, FRESHIE. All Rights Reserved.
            </div>
        </div>
    </footer>

    <!-- JavaScript для управления бургер-меню и выпадающим списком -->
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Бургер-меню
            const burgerToggle = document.getElementById('burger-toggle');
            const mobileNav = document.getElementById('mobile-nav');
            const closeMenu = document.getElementById('close-menu');
            const body = document.body;
            const navItems = mobileNav.querySelectorAll('a');

            burgerToggle.addEventListener('click', function () {
                mobileNav.classList.remove('hidden');
                mobileNav.classList.remove('-translate-y-full');
                mobileNav.classList.add('translate-y-0');
                mobileNav.classList.add('opacity-100');
                body.classList.add('overflow-hidden');

                // Плавное появление категорий с задержкой
                navItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('opacity-100');
                    }, index * 200); // Задержка 200ms между появлениями элементов
                });
            });

            closeMenu.addEventListener('click', function () {
                mobileNav.classList.remove('translate-y-0');
                mobileNav.classList.remove('opacity-100');
                mobileNav.classList.add('-translate-y-full');
                navItems.forEach(item => item.classList.remove('opacity-100'));
                mobileNav.classList.add('hidden');
                body.classList.remove('overflow-hidden');
            });

            document.addEventListener('click', function (e) {
                if (!burgerToggle.contains(e.target) && !mobileNav.contains(e.target)) {
                    mobileNav.classList.remove('translate-y-0');
                    mobileNav.classList.remove('opacity-100');
                    mobileNav.classList.add('-translate-y-full');
                    navItems.forEach(item => item.classList.remove('opacity-100'));
                    mobileNav.classList.add('hidden');
                    body.classList.remove('overflow-hidden');
                }
            });

            // Выпадающий список регионов
            const toggleButton = document.getElementById('region-toggle');
            const dropdown = document.getElementById('region-dropdown');
            const options = dropdown.querySelectorAll('div[data-value]');

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
        });
    </script>
</body>

</html>