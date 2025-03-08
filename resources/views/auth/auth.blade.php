@extends('layouts.app')

@section('title', 'Sign In / Sign Up')

@section('content')
    <!-- Auth Section -->
    <section class="w-full h-[90vh] bg-black text-white flex items-center justify-center">
        <div class="center w-full max-w-[800px] md:max-w-[900px] h-[500px] md:h-[600px] flex items-center justify-center">
            <div
                class="rotate w-full max-w-[55vw] md:max-w-[55vw] h-auto bg-black rounded-xl shadow-[20px_20px_40px_rgba(255,255,255,0.3),-20px_-20px_40px_rgba(0,0,0,0.5)] transition-all duration-300">
                <div class="row p-4 sm:p-5 my-4 sm:my-5">
                    <div class="flex justify-between items-center">
                        <h1
                            class="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-widest font-montserrat text-white">
                            Login</h1>
                        <span
                            class="close text-3xl sm:text-4xl cursor-pointer text-white hover:text-gray-300 transition-colors duration-300">×</span>
                    </div>
                </div>
                <div class="row p-4 sm:p-5 my-4 sm:my-5">
                    <fieldset class="w-full">
                        <legend
                            class="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 font-montserrat text-white">
                            Form</legend>
                        <label class="block mb-2 text-white font-semibold text-sm sm:text-base">User Name: </label>
                        <input
                            class="input w-full max-w-[300px] sm:max-w-[350px] mb-2 sm:mb-3 md:mb-4 p-2 sm:p-3 text-sm text-white bg-gray-700 rounded-lg shadow-inner focus:shadow-[0_0_15px_rgba(255,255,255,0.9)] focus:outline-none transition-all duration-300 glow-focus"
                            type="text">
                        <label class="block mb-2 text-white font-semibold text-sm sm:text-base">Email: </label>
                        <input
                            class="input w-full max-w-[300px] sm:max-w-[350px] mb-2 sm:mb-3 md:mb-4 p-2 sm:p-3 text-sm text-white bg-gray-700 rounded-lg shadow-inner focus:shadow-[0_0_15px_rgba(255,255,255,0.9)] focus:outline-none transition-all duration-300 glow-focus"
                            type="text" placeholder="someone@example.com">
                        <label class="block mb-2 text-white font-semibold text-sm sm:text-base">Password: </label>
                        <input
                            class="input w-full max-w-[300px] sm:max-w-[350px] mb-2 sm:mb-3 md:mb-4 p-2 sm:p-3 text-sm text-white bg-gray-700 rounded-lg shadow-inner focus:shadow-[0_0_15px_rgba(255,255,255,0.9)] focus:outline-none transition-all duration-300 glow-focus"
                            type="password">
                        <label class="block mb-2 text-white font-semibold text-sm sm:text-base">Repeat Password: </label>
                        <input
                            class="input w-full max-w-[300px] sm:max-w-[350px] mb-2 sm:mb-3 md:mb-4 p-2 sm:p-3 text-sm text-white bg-gray-700 rounded-lg shadow-inner focus:shadow-[0_0_15px_rgba(255,255,255,0.9)] focus:outline-none transition-all duration-300 glow-focus"
                            type="password">
                    </fieldset>
                </div>
                <div class="row p-4 sm:p-5 my-4 sm:my-5">
                    <div
                        class="flex flex-col sm:flex-row items-center justify-between w-full space-y-3 sm:space-y-0 sm:space-x-5">
                        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                            <button id="back"
                                class="button w-[70px] sm:w-[80px] md:w-[100px] h-7 sm:h-8 md:h-10 bg-gray-900 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.9)] transition-all duration-300 glow-always">Back</button>
                            <button id="toggle"
                                class="button w-[70px] sm:w-[80px] md:w-[100px] h-7 sm:h-8 md:h-10 bg-gray-900 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.9)] transition-all duration-300 glow-always">View</button>
                            <button id="toggle-view"
                                class="button w-[100px] sm:w-[110px] md:w-[140px] h-7 sm:h-8 md:h-10 bg-gray-900 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.9)] transition-all duration-300 glow-always">Perspective</button>
                        </div>
                        <button
                            class="button success w-[90px] sm:w-[100px] md:w-[120px] h-7 sm:h-8 md:h-10 bg-green-900 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.9)] transition-all duration-300 glow-always">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function () {
            let isRotated = false;
            let isPerspective = false;

            $('#toggle').click(function () {
                isRotated = !isRotated;
                $('.rotate').toggleClass('rotated', isRotated);
            });

            $('#toggle-view').click(function () {
                isPerspective = !isPerspective;
                $('.center').toggleClass('view', isPerspective);
                if (isPerspective) {
                    $('.rotate').addClass('rotated'); // Переворачиваем форму в 3D при включении перспективы
                    isRotated = true;
                } else {
                    $('.rotate').removeClass('rotated'); // Возвращаем форму в исходное положение при выключении перспективы
                    isRotated = false;
                }
            });

            // Закрытие формы (удаление или скрытие)
            $('.close').click(function () {
                $('.rotate').remove(); // или $('.rotate').hide() для скрытия
            });

            // Добавление возможности крутить форму с помощью мыши
            let isDragging = false;
            let previousX = 0;
            let previousY = 0;
            let rotationX = 40; // Начальное значение для X (как в rotated)
            let rotationY = -28; // Начальное значение для Y (как в rotated)

            console.log('Initializing drag events...'); // Отладка

            $('.rotate').on('mousedown touchstart', function (e) {
                console.log('Drag started...'); // Отладка
                isDragging = true;
                if (e.type === 'touchstart') {
                    previousX = e.originalEvent.touches[0].clientX;
                    previousY = e.originalEvent.touches[0].clientY;
                } else {
                    previousX = e.clientX;
                    previousY = e.clientY;
                }
            });

            $(document).on('mousemove touchmove', function (e) {
                if (isDragging && isPerspective) {
                    console.log('Dragging...'); // Отладка
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

                    rotationY += deltaX * 0.1; // Скорость вращения по Y
                    rotationX += deltaY * 0.1; // Скорость вращения по X

                    $('.rotate').css('transform', `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(40deg)`);

                    previousX = currentX;
                    previousY = currentY;
                }
            });

            $(document).on('mouseup touchend', function () {
                console.log('Drag ended...'); // Отладка
                isDragging = false;
            });
        });
    </script>

    <!-- CSS для анимации и стилей -->
    <style>
        .text-silver-400 {
            color: #c0c0c0;
            animation: silverShimmer 3s infinite;
        }

        @keyframes silverShimmer {
            0% {
                color: #c0c0c0;
            }

            50% {
                color: #d3d3d3;
            }

            100% {
                color: #c0c0c0;
            }
        }

        .glow {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3);
            animation: glowPulse 2s infinite alternate;
        }

        .glow-focus:focus,
        .glow-hover:hover,
        .glow-always {
            animation: glowPulse 1.5s infinite alternate;
        }

        @keyframes glowPulse {
            0% {
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3);
            }

            100% {
                box-shadow: 0 0 20px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.7);
            }
        }

        .center {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            transition: all 0.2s;
            perspective: 1500px;
        }

        .center.view {
            perspective: 1500px;
        }

        .rotate {
            transform-style: preserve-3d;
            transition: all 0.3s;
            margin: 0 auto;
        }

        .rotate.rotated {
            transform: rotateZ(40deg) rotateX(40deg) rotateY(-28deg);
        }

        .row {
            padding: 1rem;
            background: #000;
            /* Полностью чёрный фон */
            transition: all 0.3s;
            border-radius: 0.5rem;
            margin: 1rem 0;
            /* Отступы между строками */
        }

        .rotate.rotated .row {
            box-shadow: 20px 30px 20px rgba(255, 255, 255, 0.4);
        }

        .button {
            transform-style: preserve-3d;
            transition: all 0.3s;
        }

        .rotated .button {
            transform: translateZ(15px);
        }

        .rotated .button::before {
            content: '';
            position: absolute;
            background: #000;
            width: calc(100% + 4px);
            height: 15px;
            bottom: -2px;
            left: -2px;
            transform-origin: center bottom;
            transform: rotateX(90deg);
            transition: all 0.3s;
        }

        .rotated .button::after {
            content: '';
            position: absolute;
            background: #000;
            width: 15px;
            height: calc(100% + 4px);
            top: -2px;
            right: -2px;
            transform-origin: right center;
            transform: rotateY(-90deg);
            transition: all 0.3s;
        }

        .rotated .button:hover {
            transform: translateZ(10px);
        }

        .rotated .button:hover::before {
            height: 10px;
        }

        .rotated .button:hover::after {
            width: 10px;
        }

        .button,
        .button::before,
        .button::after {
            background: #000;
        }

        .button:hover,
        .button:hover::before,
        .button:hover::after {
            background: #1a202c;
        }

        .button.success,
        .button.success::before,
        .button.success::after {
            background: #000;
        }

        .button.success:hover,
        .button.success:hover::before,
        .button.success:hover::after {
            background: #1a202c;
        }

        .text {
            transform: translateZ(0px);
            transition: all 0.3s;
        }

        .rotated .text {
            transform: translateZ(15px);
            text-shadow: 10px 16px 2px rgba(0, 0, 0, 0.5);
        }

        .close {
            transform: translateZ(0px);
            transition: all 0.3s;
            position: absolute;
            right: 1rem;
            top: 1rem;
            cursor: pointer;
        }

        .rotated .close {
            transform: translateZ(15px);
            text-shadow: 8px 12px 2px rgba(0, 0, 0, 0.5);
        }

        .rotated .close:hover {
            transform: translateZ(5px);
            text-shadow: 3.5px 5px 1px rgba(0, 0, 0, 0.5);
        }

        .rotate:not(.rotated) .close:hover {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }

        /* Адаптивность для всех разрешений */
        @media (max-width: 1024px) {
            .center {
                padding: 0;
            }

            .rotate {
                max-width: 85%;
            }

            .row {
                padding: 0.8rem;
                margin: 0.8rem 0;
            }

            h1 {
                font-size: 2xl;
            }

            .text-2xl,
            .text-3xl,
            .text-4xl {
                font-size: 1.5rem !important;
            }

            .input {
                max-width: 90%;
                padding: 0.6rem 1rem;
            }

            .button {
                width: 80px;
                height: 7;
                font-size: 0.9rem;
                padding: 0.4rem 0.7rem;
            }

            .close {
                font-size: 2rem;
                right: 0.8rem;
                top: 0.8rem;
            }
        }

        @media (max-width: 768px) {
            .rotate {
                max-width: 80%;
            }

            .text-2xl,
            .text-3xl,
            .text-4xl {
                font-size: 1.2rem !important;
            }

            .input {
                max-width: 100%;
                padding: 0.5rem 0.8rem;
            }

            .button {
                width: 70px;
                height: 6;
                font-size: 0.8rem;
                padding: 0.3rem 0.6rem;
            }

            .close {
                font-size: 1.8rem;
                right: 0.6rem;
                top: 0.6rem;
            }
        }

        @media (max-width: 480px) {
            .rotate {
                max-width: 75%;
            }

            .text-2xl,
            .text-3xl,
            .text-4xl {
                font-size: 1rem !important;
            }

            .input {
                padding: 0.4rem 0.6rem;
                font-size: 0.7rem;
            }

            .button {
                width: 60px;
                height: 5;
                font-size: 0.7rem;
                padding: 0.2rem 0.5rem;
            }

            .close {
                font-size: 1.5rem;
                right: 0.4rem;
                top: 0.4rem;
            }
        }
    </style>
@endsection