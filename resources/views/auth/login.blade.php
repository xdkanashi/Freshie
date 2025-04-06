@extends('layouts.app')

@section('title', 'Login')
<link rel="stylesheet" href="{{ asset('css/contacts.css') }}">

@section('content')
    <div class="container mx-auto max-w-4xl">
        <section class="max-w-full mx-auto px-4 md:px-5 pt-0 pb-10 md:pb-16 bg-black text-white">
            <!-- Login Title -->
            <h1
                class="text-5xl md:text-6xl uppercase font-extrabold tracking-widest mb-8 font-sans animate-fade-in text-center">
                {{ __('Login') }}
            </h1>

            <!-- Login Form -->
            <div class="flex flex-col items-center">
                <!-- Show success or error messages -->
                @if(session('success'))
                    <div class="text-green-500 text-lg mb-4">
                        {{ session('success') }}
                    </div>
                @elseif(session('error'))
                    <div class="text-red-500 text-lg mb-4">
                        {{ session('error') }}
                    </div>
                @endif

                <form method="POST" action="{{ route('login') }}" class="form w-full max-w-lg space-y-6" autocomplete="off">
                    @csrf

                    <!-- Email Address -->
                    <div class="flex flex-col w-full mb-6">
                        <label for="email" class="text-white text-lg mb-2">{{ __('Email Address') }} *</label>
                        <div class="control block-cube block-input">
                            <input id="email" type="email"
                                class="w-full bg-transparent border-0 px-4 py-3 text-white text-base placeholder-gray-400 focus:outline-none @error('email') is-invalid @enderror"
                                name="email" value="{{ old('email') }}" required autocomplete="email" autofocus
                                placeholder="Enter your email">
                            <div class="bg-top">
                                <div class="bg-inner"></div>
                            </div>
                            <div class="bg-right">
                                <div class="bg-inner"></div>
                            </div>
                            <div class="bg">
                                <div class="bg-inner"></div>
                            </div>
                        </div>
                        @error('email')
                            <span class="text-red-500 text-sm mt-1">{{ $message }}</span>
                        @enderror
                    </div>

                    <!-- Password -->
                    <div class="flex flex-col w-full mb-6">
                        <label for="password" class="text-white text-lg mb-2">{{ __('Password') }} *</label>
                        <div class="control block-cube block-input">
                            <input id="password" type="password"
                                class="w-full bg-transparent border-0 px-4 py-3 text-white text-base placeholder-gray-400 focus:outline-none @error('password') is-invalid @enderror"
                                name="password" required autocomplete="current-password" placeholder="Enter your password">
                            <div class="bg-top">
                                <div class="bg-inner"></div>
                            </div>
                            <div class="bg-right">
                                <div class="bg-inner"></div>
                            </div>
                            <div class="bg">
                                <div class="bg-inner"></div>
                            </div>
                        </div>
                        @error('password')
                            <span class="text-red-500 text-sm mt-1">{{ $message }}</span>
                        @enderror
                    </div>

                    <!-- Remember Me -->
                    <div class="flex items-center mb-6">
                        <input class="form-check-input mr-2" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                        <label class="text-white text-base" for="remember">
                            {{ __('Remember Me') }}
                        </label>
                    </div>

                    <!-- Login Button and Forgot Password Link -->
                    <div class="flex flex-col items-center space-y-4">
                        <button type="submit"
                            class="btn block-cube block-cube-hover w-full max-w-xs flex items-center justify-center px-6 py-3 text-white text-lg font-bold uppercase tracking-wider bg-black">
                            <div class="bg-top">
                                <div class="bg-inner"></div>
                            </div>
                            <div class="bg-right">
                                <div class="bg-inner"></div>
                            </div>
                            <div class="bg">
                                <div class="bg-inner"></div>
                            </div>
                            <div class="text">
                                {{ __('Login') }}
                            </div>
                        </button>

                        @if (Route::has('password.request'))
                            <a class="text-white hover:text-gray-300 text-base underline"
                                href="{{ route('password.request') }}">
                                {{ __('Forgot Your Password?') }}
                            </a>
                        @endif
                    </div>
                </form>
            </div>
        </section>
    </div>
@endsection

@section('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Fade-in animation
            const fadeSections = document.querySelectorAll('.animate-fade-in');
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            fadeSections.forEach(section => {
                observer.observe(section);
            });
        });
    </script>
@endsection