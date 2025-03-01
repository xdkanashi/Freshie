@extends('layouts.app')

@section('title', 'Contact Us')

@section('content')
    <!-- Main Container -->
    <div class="container mx-auto max-w-4xl">
        <!-- Contact Section -->
        <section class="max-w-full mx-auto px-4 md:px-5 pt-0 pb-10 md:pb-16 bg-black text-white">
            <!-- Contact Form -->
            <div class="flex flex-col items-center">
                <!-- Contact Title -->
                <h1 class="text-5xl uppercase font-extrabold tracking-wider mb-12 font-sans">Contact Us</h1>

                <!-- Form -->
                <form class="w-full max-w-lg space-y-4">
                    <!-- Your Name -->
                    <input type="text"
                        class="w-full bg-transparent border-2 border-white rounded-lg px-3 py-3 text-white text-base placeholder-white focus:outline-none focus:ring-0"
                        placeholder="Your Name *" required>

                    <!-- Phone Number -->
                    <input type="tel"
                        class="w-full bg-transparent border-2 border-white rounded-lg px-3 py-3 text-white text-base placeholder-white focus:outline-none focus:ring-0"
                        placeholder="Phone number">

                    <!-- Subject -->
                    <input type="text"
                        class="w-full bg-transparent border-2 border-white rounded-lg px-3 py-3 text-white text-base placeholder-white focus:outline-none focus:ring-0"
                        placeholder="Subject *" required>

                    <!-- Email -->
                    <input type="email"
                        class="w-full bg-transparent border-2 border-white rounded-lg px-3 py-3 text-white text-base placeholder-white focus:outline-none focus:ring-0"
                        placeholder="Email *" required>

                    <!-- Comment -->
                    <textarea
                        class="w-full bg-transparent border-2 border-white rounded-lg px-3 py-3 text-white text-base placeholder-white focus:outline-none focus:ring-0 h-40 resize-none"
                        placeholder="Comment"></textarea>

                    <!-- Send Button -->
                    <button type="submit"
                        class="w-32 mx-auto flex items-center justify-center bg-transparent border-2 border-white rounded-2xl px-4 py-2 text-white text-base font-bold uppercase tracking-wider hover:bg-gray-200 hover:text-black transition-colors duration-300">
                        Send
                    </button>
                </form>
            </div>
        </section>
    </div>
@endsection