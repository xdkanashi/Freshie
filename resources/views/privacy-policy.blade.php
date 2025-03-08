@extends('layouts.app')

@section('title', 'Privacy Policy')

@section('content')
    <!-- Main Container -->
    <div class="container mx-auto max-w-4xl">
        <!-- Privacy Policy Section -->
        <section class="max-w-full mx-auto px-4 md:px-5 pt-0 pb-10 bg-black text-white">
            <!-- Privacy Policy Content -->
            <div class="flex flex-col items-center">
                <!-- Privacy Policy Title -->
                <h2 class="text-5xl uppercase font-extrabold tracking-wider mb-4 font-sans">Privacy Policy</h2>

                <!-- Optional Description -->
                <p class="text-base uppercase tracking-wider mb-12">Your privacy matters to us</p>

                <!-- Privacy Policy Details -->
                <div class="w-full max-w-2xl text-left space-y-6">
                    <!-- Introduction -->
                    <p class="text-sm uppercase tracking-wider leading-relaxed">
                        At Freshie, we are committed to protecting your privacy. This privacy policy explains how
                        we collect, use, and safeguard your personal information when you visit our website or make a
                        purchase.
                    </p>

                    <!-- Information We Collect -->
                    <div>
                        <h3 class="text-lg uppercase font-bold tracking-wider mb-2">Information We Collect</h3>
                        <ul class="text-sm uppercase tracking-wider space-y-2 list-disc list-outside ml-5">
                            <li>Personal details such as name, email, phone number, and shipping address when you place an
                                order.</li>
                            <li>Payment information (processed securely via third-party payment providers).</li>
                            <li>Browsing data, including IP address, browser type, and pages visited, through cookies.</li>
                        </ul>
                    </div>

                    <!-- How We Use Your Information -->
                    <div>
                        <h3 class="text-lg uppercase font-bold tracking-wider mb-2">How We Use Your Information</h3>
                        <ul class="text-sm uppercase tracking-wider space-y-2 list-disc list-outside ml-5">
                            <li>To process and fulfill your orders, including shipping and customer support.</li>
                            <li>To send promotional emails or newsletters (you can opt out at any time).</li>
                            <li>To improve our website and personalize your browsing experience.</li>
                            <li>To comply with legal obligations and prevent fraud.</li>
                        </ul>
                    </div>

                    <!-- Data Sharing -->
                    <div>
                        <h3 class="text-lg uppercase font-bold tracking-wider mb-2">Data Sharing</h3>
                        <ul class="text-sm uppercase tracking-wider space-y-2 list-disc list-outside ml-5">
                            <li>We share your information with third-party service providers (e.g., payment processors,
                                shipping companies) to fulfill orders.</li>
                            <li>We may share data to comply with legal requirements or protect our rights.</li>
                            <li>We do not sell your personal information to third parties.</li>
                        </ul>
                    </div>

                    <!-- Your Rights -->
                    <div>
                        <h3 class="text-lg uppercase font-bold tracking-wider mb-2">Your Rights</h3>
                        <ul class="text-sm uppercase tracking-wider space-y-2 list-disc list-outside ml-5">
                            <li>You can request access to the personal data we hold about you.</li>
                            <li>You can request correction or deletion of your data.</li>
                            <li>You can opt out of marketing communications at any time.</li>
                        </ul>
                    </div>

                    <!-- Contact Us -->
                    <div>
                        <h3 class="text-lg uppercase font-bold tracking-wider mb-2">Contact Us</h3>
                        <p class="text-sm uppercase tracking-wider leading-relaxed">
                            For questions about our privacy policy, please contact us at support@freshie.com or call +1
                            (123) 456-7890.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
@endsection