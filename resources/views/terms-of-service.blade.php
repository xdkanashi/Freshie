@extends('layouts.app')

@section('title', 'Terms of Service')

@section('content')
    <!-- Main Container -->
    <div class="container mx-auto max-w-4xl">
        <!-- Terms of Service Section -->
        <section class="max-w-full mx-auto px-4 md:px-5 pt-0 pb-10 bg-black text-white">
            <!-- Terms of Service Content -->
            <div class="flex flex-col items-center">
                <!-- Terms of Service Title -->
                <h2 class="text-5xl uppercase font-extrabold tracking-wider mb-4 font-sans">Terms of Service</h2>

                <!-- Optional Description -->
                <p class="text-base uppercase tracking-wider mb-12">Rules and guidelines for using our website</p>

                <!-- Terms of Service Details -->
                <div class="w-full max-w-2xl text-left space-y-6">
                    <!-- Introduction -->
                    <p class="text-sm uppercase tracking-wider leading-relaxed">
                        Welcome to Freshie. By accessing or using our website, you agree to comply with the
                        following terms of service. Please read these terms carefully before making a purchase or using our
                        services.
                    </p>

                    <!-- Use of Website -->
                    <div>
                        <h3 class="text-lg uppercase font-bold tracking-wider mb-2">Use of Website</h3>
                        <ul class="text-sm uppercase tracking-wider space-y-2 list-disc list-outside ml-5">
                            <li>You must be at least 18 years old to use this website.</li>
                            <li>You agree not to use our website for any unlawful or prohibited activities.</li>
                            <li>We reserve the right to terminate your access to the website if you violate these terms.
                            </li>
                        </ul>
                    </div>

                    <!-- Orders and Payments -->
                    <div>
                        <h3 class="text-lg uppercase font-bold tracking-wider mb-2">Orders and Payments</h3>
                        <ul class="text-sm uppercase tracking-wider space-y-2 list-disc list-outside ml-5">
                            <li>All orders are subject to availability and confirmation.</li>
                            <li>We accept payments via credit/debit cards, PayPal, and other methods listed at checkout.
                            </li>
                            <li>You are responsible for providing accurate billing and shipping information.</li>
                            <li>Prices are subject to change without notice.</li>
                        </ul>
                    </div>

                    <!-- Shipping and Delivery -->
                    <div>
                        <h3 class="text-lg uppercase font-bold tracking-wider mb-2">Shipping and Delivery</h3>
                        <ul class="text-sm uppercase tracking-wider space-y-2 list-disc list-outside ml-5">
                            <li>We ship to addresses within all world.</li>
                            <li>Shipping times are estimates and may vary due to external factors.</li>
                            <li>You are responsible for any customs fees or import duties.</li>
                            <li>We are not liable for delays caused by shipping carriers.</li>
                        </ul>
                    </div>

                    <!-- Limitation of Liability -->
                    <div>
                        <h3 class="text-lg uppercase font-bold tracking-wider mb-2">Limitation of Liability</h3>
                        <ul class="text-sm uppercase tracking-wider space-y-2 list-disc list-outside ml-5">
                            <li>We are not liable for any damages resulting from the use of our website or products.</li>
                            <li>Our liability is limited to the amount paid for the product in question.</li>
                            <li>We do not guarantee that our website will be error-free or uninterrupted.</li>
                        </ul>
                    </div>

                    <!-- Contact Us -->
                    <div>
                        <h3 class="text-lg uppercase font-bold tracking-wider mb-2">Contact Us</h3>
                        <p class="text-sm uppercase tracking-wider leading-relaxed">
                            For questions about our terms of service, please contact us at support@freshie.com or call
                            +1 (123) 456-7890.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
@endsection