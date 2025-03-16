@extends('layouts.app')

@section('title', 'Contact Us')
<link rel="stylesheet" href="{{ asset('css/contacts.css') }}">

@section('content')
    <!-- Main Container -->
    <div class="container mx-auto max-w-4xl">
        <!-- Contact Section -->
        <section class="max-w-full mx-auto px-4 md:px-5 pt-0 pb-10 md:pb-16 bg-black text-white">
            <!-- Contact Title -->
            <h1
                class="text-5xl md:text-6xl uppercase font-extrabold tracking-widest mb-4 font-sans animate-fade-in text-center">
                Contact us</h1>

            <!-- Contact Form -->
            <div class="flex flex-col items-center">
                <form class="form w-full max-w-lg space-y-6" autocomplete="off">
                    <!-- Your Name -->
                    <div class="control block-cube block-input">
                        <input type="text"
                            class="w-full bg-transparent border-0 px-3 py-3 text-white text-base placeholder-white focus:outline-none"
                            placeholder="Your Name *" required>
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

                    <!-- Phone Number -->
                    <div class="control block-cube block-input">
                        <input type="tel"
                            class="w-full bg-transparent border-0 px-3 py-3 text-white text-base placeholder-white focus:outline-none"
                            placeholder="Phone number">
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

                    <!-- Subject -->
                    <div class="control block-cube block-input">
                        <input type="text"
                            class="w-full bg-transparent border-0 px-3 py-3 text-white text-base placeholder-white focus:outline-none"
                            placeholder="Subject *" required>
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

                    <!-- Email -->
                    <div class="control block-cube block-input">
                        <input type="email"
                            class="w-full bg-transparent border-0 px-3 py-3 text-white text-base placeholder-white focus:outline-none"
                            placeholder="Email *" required>
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

                    <!-- Comment -->
                    <div class="control block-cube block-input">
                        <textarea
                            class="w-full bg-transparent border-0 px-3 py-3 text-white text-base placeholder-white focus:outline-none h-40 resize-none"
                            placeholder="Comment"></textarea>
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

                    <!-- Send Button -->
                    <button type="submit"
                        class="btn block-cube block-cube-hover w-32 mx-auto flex items-center justify-center px-4 py-2 text-white text-base font-bold uppercase tracking-wider">
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
                            Send
                        </div>
                    </button>
                </form>
            </div>

            <!-- FAQ Section -->
            <div class="mt-16 w-full max-w-3xl mx-auto fade-in-section">
                <h2 class="text-3xl font-bold uppercase tracking-wide mb-8 text-center">Frequently Asked Questions</h2>
                <div class="space-y-4">
                    <div class="block-cube block-content p-4 rounded-lg bg-gray-900">
                        <button
                            class="faq-toggle w-full text-left text-lg font-semibold uppercase tracking-wide flex justify-between items-center">
                            What is the purpose of Freshie?
                            <span class="text-gray-400">+</span>
                        </button>
                        <div class="faq-content hidden mt-2 text-gray-300 text-base">
                            Freshie is a platform dedicated to providing innovative gaming experiences and community
                            engagement, aiming to connect players worldwide.
                        </div>
                    </div>

                    <div class="block-cube block-content p-4 rounded-lg bg-gray-900">
                        <button
                            class="faq-toggle w-full text-left text-lg font-semibold uppercase tracking-wide flex justify-between items-center">
                            How do I create an account?
                            <span class="text-gray-400">+</span>
                        </button>
                        <div class="faq-content hidden mt-2 text-gray-300 text-base">
                            To create an account, visit the registration page, fill in your details (username, email, and
                            password), and submit the form. You'll receive a confirmation email to activate your account.
                        </div>
                    </div>

                    <div class="block-cube block-content p-4 rounded-lg bg-gray-900">
                        <button
                            class="faq-toggle w-full text-left text-lg font-semibold uppercase tracking-wide flex justify-between items-center">
                            Are my personal details secure?
                            <span class="text-gray-400">+</span>
                        </button>
                        <div class="faq-content hidden mt-2 text-gray-300 text-base">
                            Yes, we use advanced encryption and security protocols to protect your personal information.
                            Please review our Privacy Policy for more details.
                        </div>
                    </div>

                    <div class="block-cube block-content p-4 rounded-lg bg-gray-900">
                        <button
                            class="faq-toggle w-full text-left text-lg font-semibold uppercase tracking-wide flex justify-between items-center">
                            How can I contact support?
                            <span class="text-gray-400">+</span>
                        </button>
                        <div class="faq-content hidden mt-2 text-gray-300 text-base">
                            You can reach our support team by filling out the contact form above or emailing us at
                            support@freshie.com.
                        </div>
                    </div>

                    <div class="block-cube block-content p-4 rounded-lg bg-gray-900">
                        <button
                            class="faq-toggle w-full text-left text-lg font-semibold uppercase tracking-wide flex justify-between items-center">
                            What payment methods do you accept?
                            <span class="text-gray-400">+</span>
                        </button>
                        <div class="faq-content hidden mt-2 text-gray-300 text-base">
                            We accept Visa, Mastercard, PayPal, Google Pay, and Apple Pay. Check our payment section for
                            more details.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
@endsection

@section('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Анимация появления
            const fadeSections = document.querySelectorAll('.fade-in-section');
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

            // Переключение FAQ
            const faqToggles = document.querySelectorAll('.faq-toggle');
            faqToggles.forEach(toggle => {
                toggle.addEventListener('click', function () {
                    const content = this.nextElementSibling;
                    const isOpen = content.classList.contains('visible');
                    content.style.display = isOpen ? 'none' : 'block';
                    this.querySelector('span').textContent = isOpen ? '+' : '−';
                    content.classList.toggle('visible');
                });
            });
        });
    </script>
@endsection