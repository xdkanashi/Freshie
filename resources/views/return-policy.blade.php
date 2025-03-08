@extends('layouts.app')

@section('title', 'Return Policy')

@section('content')
    <!-- Main Container -->
    <div class="container mx-auto max-w-4xl">
        <!-- Return Policy Section -->
        <section class="max-w-full mx-auto px-4 md:px-5 pt-0 pb-10 bg-black text-white">
            <!-- Return Policy Content -->
            <div class="flex flex-col items-center">
                <!-- Return Policy Title -->
                <h2 class="text-5xl uppercase font-extrabold tracking-wider mb-4 font-sans">Return Policy</h2>

                <!-- Optional Description -->
                <p class="text-base uppercase tracking-wider mb-12">We want you to love your purchase</p>

                <!-- Return Policy Details -->
                <div class="w-full max-w-2xl text-left space-y-6">
                    <!-- Introduction -->
                    <p class="text-sm uppercase tracking-wider leading-relaxed">
                        At Freshie, we strive to ensure that you are completely satisfied with your purchase. If
                        for any reason you are not happy with your order, we offer a hassle-free return policy. Please
                        review the details below to understand our return process.
                    </p>

                    <!-- Return Conditions -->
                    <div>
                        <h3 class="text-lg uppercase font-bold tracking-wider mb-2">Return Conditions</h3>
                        <ul class="text-sm uppercase tracking-wider space-y-2 list-disc list-outside ml-5">
                            <li>Items must be returned within 30 days of the delivery date.</li>
                            <li>Items must be unworn, unwashed, and in their original condition with tags attached.</li>
                            <li>Items must be returned in their original packaging.</li>
                            <li>Sale items or custom-made products are non-returnable unless defective.</li>
                        </ul>
                    </div>

                    <!-- How to Return -->
                    <div>
                        <h3 class="text-lg uppercase font-bold tracking-wider mb-2">How to Return</h3>
                        <ul class="text-sm uppercase tracking-wider space-y-2 list-disc list-outside ml-5">
                            <li>Contact our customer support team at support@fresihe.com to initiate a return.</li>
                            <li>Provide your order number and reason for the return.</li>
                            <li>We will send you a return shipping label via email.</li>
                            <li>Pack the item securely and drop it off at the nearest shipping point.</li>
                        </ul>
                    </div>

                    <!-- Refunds -->
                    <div>
                        <h3 class="text-lg uppercase font-bold tracking-wider mb-2">Refunds</h3>
                        <ul class="text-sm uppercase tracking-wider space-y-2 list-disc list-outside ml-5">
                            <li>Once your return is received and inspected, we will notify you via email.</li>
                            <li>Refunds will be processed to the original payment method within 5-7 business days.</li>
                            <li>Shipping costs are non-refundable unless the item is defective or incorrect.</li>
                            <li>If the item is defective, we will cover the return shipping cost.</li>
                        </ul>
                    </div>

                    <!-- Contact Us -->
                    <div>
                        <h3 class="text-lg uppercase font-bold tracking-wider mb-2">Need Help?</h3>
                        <p class="text-sm uppercase tracking-wider leading-relaxed">
                            If you have any questions about our return policy, feel free to reach out to us at
                            support@freshie.com or call us at +1 (123) 456-7890. We're here to help!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
@endsection