<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Freshie - Registration</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/register.css') }}">
</head>

<body class="bg-black text-white font-sans">
    <!-- Background Video -->
    <video autoplay muted loop class="background-video">
        <source src="{{ asset('video/old-bg.mp4') }}" type="video/mp4">
        Your browser does not support the video tag.
    </video>

    <!-- Auth Section -->
    <section
        class="w-full min-h-screen bg-black bg-opacity-50 text-white flex items-center justify-center relative overflow-hidden">
        <div class="flex items-center justify-center w-full max-w-7xl mx-auto">
            <!-- Registration Form -->
            <div
                class="center flex-shrink-0 w-full max-w-[800px] md:max-w-[900px] h-[500px] md:h-[600px] flex items-center justify-center z-10">
                <div
                    class="rotate w-full max-w-[55vw] md:max-w-[55vw] h-auto bg-black rounded-xl shadow-[20px_20px_40px_rgba(255,255,255,0.3),-20px_-20px_40px_rgba(0,0,0,0.5)] transition-all duration-300">
                    <!-- Logo inside form -->
                    <div class="row p-4 sm:p-5 my-4 sm:my-5 flex justify-center logo-container">
                        <a href="{{ url('/') }}">
                            <img src="{{ asset('img/logo-removebg.png') }}" alt="Freshie Logo"
                                class="h-16 sm:h-20 md:h-24 object-contain animate-pulse-slow">
                        </a>
                    </div>
                    <div class="row p-4 sm:p-5 my-4 sm:my-5">
                        <div class="flex justify-between items-center">
                            <h1
                                class="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-widest font-montserrat text-white">
                                Registration</h1>
                        </div>
                    </div>
                    <div class="row p-4 sm:p-5 my-4 sm:my-5 flex flex-col md:flex-row items-start">
                        <form method="POST" action="{{ route('register') }}" id="register-form" class="flex-1 w-full">
                            @csrf
                            <fieldset class="w-full">
                                <label class="block mb-2 text-white font-semibold text-sm sm:text-base">User
                                    Name:</label>
                                <input
                                    class="input w-full mb-2 sm:mb-3 md:mb-4 p-2 sm:p-3 text-sm text-white bg-gray-700 rounded-lg shadow-inner focus:shadow-[0_0_15px_rgba(255,255,255,0.9)] focus:outline-none transition-all duration-300 glow-focus"
                                    type="text" name="username" value="{{ old('username') }}" autocomplete="username"
                                    required maxlength="50">
                                @error('username')
                                    <span class="text-red-500 text-sm block mb-2">{{ $message }}</span>
                                @enderror

                                <label class="block mb-2 text-white font-semibold text-sm sm:text-base">Email:</label>
                                <input
                                    class="input w-full mb-2 sm:mb-3 md:mb-4 p-2 sm:p-3 text-sm text-white bg-gray-700 rounded-lg shadow-inner focus:shadow-[0_0_15px_rgba(255,255,255,0.9)] focus:outline-none transition-all duration-300 glow-focus"
                                    type="email" name="email" placeholder="someone@example.com"
                                    value="{{ old('email') }}" required autocomplete="email" maxlength="50">
                                @error('email')
                                    <span class="text-red-500 text-sm block mb-2">{{ $message }}</span>
                                @enderror

                                <label
                                    class="block mb-2 text-white font-semibold text-sm sm:text-base">Password:</label>
                                <div class="input-wrapper w-full relative">
                                    <input
                                        class="input w-full mb-2 sm:mb-3 md:mb-4 p-2 sm:p-3 text-sm text-white bg-gray-700 rounded-lg shadow-inner focus:shadow-[0_0_15px_rgba(255,255,255,0.9)] focus:outline-none transition-all duration-300 glow-focus"
                                        type="password" name="password" id="password" required
                                        autocomplete="new-password" maxlength="50">
                                    <button type="button" id="eyeball" class="eyeball">
                                        <div class="eye"></div>
                                    </button>
                                    <div id="beam" class="beam"></div>
                                </div>
                                @error('password')
                                    <span class="text-red-500 text-sm block mb-2">{{ $message }}</span>
                                @enderror

                                <label class="block mb-2 text-white font-semibold text-sm sm:text-base">Repeat
                                    Password:</label>
                                <div class="input-wrapper w-full relative">
                                    <input
                                        class="input w-full mb-2 sm:mb-3 md:mb-4 p-2 sm:p-3 text-sm text-white bg-gray-700 rounded-lg shadow-inner focus:shadow-[0_0_15px_rgba(255,255,255,0.9)] focus:outline-none transition-all duration-300 glow-focus"
                                        type="password" name="password_confirmation" id="password_confirmation" required
                                        autocomplete="new-password" maxlength="50">
                                    <button type="button" id="eyeball_confirm" class="eyeball">
                                        <div class="eye"></div>
                                    </button>
                                    <div id="beam_confirm" class="beam"></div>
                                </div>
                                @error('password_confirmation')
                                    <span class="text-red-500 text-sm block mb-2">{{ $message }}</span>
                                @enderror
                            </fieldset>
                        </form>

                        <!-- Password Requirements -->
                        <div
                            class="password-requirements mt-4 md:mt-0 p-4 bg-black bg-opacity-50 rounded-lg border border-gray-600 w-full md:w-[250px] md:ml-4">
                            <h3 class="text-lg font-bold text-white mb-2">Password Requirements:</h3>
                            <ul class="text-sm text-white space-y-2">
                                <li id="capital" class="flex items-center password-requirement-item">
                                    <span class="check mr-2 text-red-500"><i class="fas fa-times"></i></span> 1
                                    capital letter
                                </li>
                                <li id="length" class="flex items-center password-requirement-item">
                                    <span class="check mr-2 text-red-500"><i class="fas fa-times"></i></span> 6+
                                    characters
                                </li>
                                <li id="number" class="flex items-center password-requirement-item">
                                    <span class="check mr-2 text-red-500"><i class="fas fa-times"></i></span> 1 number
                                </li>
                                <li id="match" class="flex items-center password-requirement-item">
                                    <span class="check mr-2 text-red-500"><i class="fas fa-times"></i></span>
                                    Passwords match
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row p-4 sm:p-5 my-4 sm:my-5">
                        <div class="flex items-center justify-between w-full">
                            <button type="button" id="back"
                                class="button w-[70px] sm:w-[80px] md:w-[100px] h-7 sm:h-8 md:h-10 bg-gray-900 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.9)] transition-all duration-300 glow-always">Back</button>
                            <!-- Кнопки Reset и Perspective скрыты на мобильных устройствах -->
                            <div class="hidden md:flex space-x-3">
                                <button type="button" id="toggle"
                                    class="button w-[70px] sm:w-[80px] md:w-[100px] h-7 sm:h-8 md:h-10 bg-gray-700 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.9)] transition-all duration-300 glow-always">Reset</button>
                                <button type="button" id="toggle-view"
                                    class="button w-[100px] sm:w-[110px] md:w-[140px] h-7 sm:h-8 md:h-10 bg-gray-700 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.9)] transition-all duration-300 glow-always">Perspective</button>
                            </div>
                            <button type="submit" form="register-form"
                                class="button success w-[90px] sm:w-[100px] md:w-[120px] h-7 sm:h-8 md:h-10 bg-green-900 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.9)] transition-all duration-300 glow-always">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer (оставлен без изменений) -->
    <footer class="bg-black bg-opacity-50 text-white py-8 sm:py-10 border-t border-gray-700 font-montserrat">
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

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function () {
            let isPerspective = false;
            let isDragging = false;
            let previousX = 0;
            let previousY = 0;
            let rotationX = 0;
            let rotationY = 0;
            let rotationZ = 0;

            // Активация полей при загрузке
            $('.rotate input').prop('disabled', false).css({
                'pointer-events': 'auto',
                'z-index': 20
            });

            // Сброс вращения (только для десктопов)
            $('#toggle').click(function () {
                rotationX = 0;
                rotationY = 0;
                rotationZ = 0;
                $('.rotate').css({
                    'transform': `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`,
                    'pointer-events': 'auto'
                });
                $('.rotate input').prop('disabled', false).css({
                    'pointer-events': 'auto',
                    'z-index': 20
                });
                $('.rotate').removeClass('rotated');
            });

            // Переключение перспективы (только для десктопов)
            $('#toggle-view').click(function () {
                isPerspective = !isPerspective;
                $('.center').toggleClass('view', isPerspective);
                if (!isPerspective) {
                    rotationX = 0;
                    rotationY = 0;
                    rotationZ = 0;
                    $('.rotate').css({
                        'transform': `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`,
                        'pointer-events': 'auto'
                    });
                    $('.rotate input').prop('disabled', false).css({
                        'pointer-events': 'auto',
                        'z-index': 20
                    });
                    $('.rotate').removeClass('rotated');
                } else {
                    rotationX = 40;
                    rotationY = -28;
                    rotationZ = 40;
                    $('.rotate').css({
                        'transform': `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`,
                        'pointer-events': 'auto'
                    });
                    $('.rotate input').prop('disabled', false).css({
                        'pointer-events': 'auto',
                        'z-index': 20
                    });
                    $('.rotate').addClass('rotated');
                }
            });

            // Вращение формы (отключаем на мобильных)
            if ($(window).width() > 768) {
                $('.rotate').on('mousedown touchstart', function (e) {
                    if (!$(e.target).is('input')) {
                        isDragging = true;
                        e.preventDefault();
                        if (e.type === 'touchstart') {
                            previousX = e.originalEvent.touches[0].clientX;
                            previousY = e.originalEvent.touches[0].clientY;
                        } else {
                            previousX = e.clientX;
                            previousY = e.clientY;
                        }
                    }
                });

                $(document).on('mousemove touchmove', function (e) {
                    if (isDragging) {
                        let currentX, currentY;
                        if (e.type === 'touchmove') {
                            currentX = e.originalEvent.touches[0].clientX;
                            currentY = e.originalEvent.touches[0].clientY;
                        } else {
                            currentX = e.clientX;
                            currentY = e.clientY;
                        }

                        let deltaX = currentX - previousX;
                        let deltaY = currentY - previousY;

                        rotationY += deltaX * 0.3;
                        rotationX -= deltaY * 0.3;

                        rotationX = Math.max(-90, Math.min(90, rotationX));
                        rotationY = Math.max(-180, Math.min(180, rotationY));

                        $('.rotate').css({
                            'transform': `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`,
                            'pointer-events': 'auto',
                            'opacity': 1
                        });

                        if (!isPerspective) {
                            isPerspective = true;
                            $('.center').addClass('view');
                        }

                        $('.rotate input').prop('disabled', false).css({
                            'pointer-events': 'auto',
                            'z-index': 20
                        });
                        previousX = currentX;
                        previousY = currentY;
                    }
                });

                $(document).on('mouseup touchend', function () {
                    isDragging = false;
                    $('.rotate input').prop('disabled', false).css({
                        'pointer-events': 'auto',
                        'z-index': 20
                    });
                });

                $('.rotate').on('touchmove', function (e) {
                    if (!$(e.target).is('input')) {
                        e.stopPropagation();
                    }
                });
            }

            // Возвращение на предыдущую страницу
            $('#back').click(function () {
                window.history.back();
            });

            // Обработка региона в футере
            const toggleButton = $('#region-toggle');
            const dropdown = $('#region-dropdown');
            const options = dropdown.find('div[data-value]');

            toggleButton.on('click', function () {
                dropdown.toggleClass('hidden');
            });

            options.on('click', function () {
                toggleButton.children().first().text($(this).attr('data-value'));
                dropdown.addClass('hidden');
            });

            $(document).on('click', function (e) {
                if (!toggleButton.is(e.target) && !dropdown.is(e.target) && dropdown.has(e.target).length === 0) {
                    dropdown.addClass('hidden');
                }
            });

            // Password visibility toggle and beam effect
            const root = document.documentElement;
            const eye = document.getElementById('eyeball');
            const beam = document.getElementById('beam');
            const passwordInput = document.getElementById('password');
            const eyeConfirm = document.getElementById('eyeball_confirm');
            const beamConfirm = document.getElementById('beam_confirm');
            const passwordConfirmInput = document.getElementById('password_confirmation');

            function updateBeam(e) {
                let clientX, clientY;
                if (e.type === 'touchmove') {
                    clientX = e.originalEvent.touches[0].clientX;
                    clientY = e.originalEvent.touches[0].clientY;
                } else {
                    clientX = e.clientX;
                    clientY = e.clientY;
                }

                let rect = beam.getBoundingClientRect();
                let mouseX = rect.right + (rect.width / 2);
                let mouseY = rect.top + (rect.height / 2);
                let rad = Math.atan2(mouseX - clientX, mouseY - clientY);
                let degrees = (rad * (20 / Math.PI) * -1) - 350;
                root.style.setProperty('--beamDegrees', `${degrees}deg`);

                let rectConfirm = beamConfirm.getBoundingClientRect();
                let mouseXConfirm = rectConfirm.right + (rectConfirm.width / 2);
                let mouseYConfirm = rectConfirm.top + (rectConfirm.height / 2);
                let radConfirm = Math.atan2(mouseXConfirm - clientX, mouseYConfirm - clientY);
                let degreesConfirm = (radConfirm * (20 / Math.PI) * -1) - 350;
                root.style.setProperty('--beamDegreesConfirm', `${degreesConfirm}deg`);
            }

            $(document).on('mousemove touchmove', updateBeam);

            $(eye).on('click touchend', function (e) {
                e.preventDefault();
                $(passwordInput).closest('.input-wrapper').toggleClass('show-password');
                passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
                passwordInput.focus();
            });

            $(eyeConfirm).on('click touchend', function (e) {
                e.preventDefault();
                $(passwordConfirmInput).closest('.input-wrapper').toggleClass('show-password');
                passwordConfirmInput.type = passwordConfirmInput.type === 'password' ? 'text' : 'password';
                passwordConfirmInput.focus();
            });

            // Password requirements validation
            function checkPassword() {
                const password = passwordInput.value;
                const confirmPassword = passwordConfirmInput.value;

                if (/[A-Z]/.test(password)) {
                    $('#capital .check').html('<i class="fas fa-check"></i>').removeClass('text-red-500').addClass(
                        'text-green-500');
                    $('.password-requirement-item#capital').addClass('fulfilled').removeClass('unfulfilled');
                } else {
                    $('#capital .check').html('<i class="fas fa-times"></i>').removeClass('text-green-500').addClass(
                        'text-red-500');
                    $('.password-requirement-item#capital').removeClass('fulfilled').addClass('unfulfilled');
                }

                if (password.length >= 6) {
                    $('#length .check').html('<i class="fas fa-check"></i>').removeClass('text-red-500').addClass(
                        'text-green-500');
                    $('.password-requirement-item#length').addClass('fulfilled').removeClass('unfulfilled');
                } else {
                    $('#length .check').html('<i class="fas fa-times"></i>').removeClass('text-green-500').addClass(
                        'text-red-500');
                    $('.password-requirement-item#length').removeClass('fulfilled').addClass('unfulfilled');
                }

                if (/[0-9]/.test(password)) {
                    $('#number .check').html('<i class="fas fa-check"></i>').removeClass('text-red-500').addClass(
                        'text-green-500');
                    $('.password-requirement-item#number').addClass('fulfilled').removeClass('unfulfilled');
                } else {
                    $('#number .check').html('<i class="fas fa-times"></i>').removeClass('text-green-500').addClass(
                        'text-red-500');
                    $('.password-requirement-item#number').removeClass('fulfilled').addClass('unfulfilled');
                }

                if (password === confirmPassword && password.length > 0 && confirmPassword.length > 0) {
                    $('#match .check').html('<i class="fas fa-check"></i>').removeClass('text-red-500').addClass(
                        'text-green-500');
                    $('.password-requirement-item#match').addClass('fulfilled').removeClass('unfulfilled');
                } else {
                    $('#match .check').html('<i class="fas fa-times"></i>').removeClass('text-green-500').addClass(
                        'text-red-500');
                    $('.password-requirement-item#match').removeClass('fulfilled').addClass('unfulfilled');
                }
            }

            $('#password, #password_confirmation').on('input', checkPassword);
        });
    </script>
</body>

</html>