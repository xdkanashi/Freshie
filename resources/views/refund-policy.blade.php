@extends('layouts.app')

@section('title', 'Refund Policy')

@section('content')
    <!-- Main Container -->
    <div class="container mx-auto max-w-4xl">
        <!-- Refund Policy Section -->
        <section class="max-w-full mx-auto px-4 md:px-5 pt-0 pb-10 bg-black text-white">
            <!-- Refund Policy Content -->
            <div class="flex flex-col items-center">
                <!-- Refund Policy Title -->
                <h2 class="text-5xl uppercase font-extrabold tracking-wider mb-4 font-sans">Refund Policy</h2>

                <!-- Optional Description -->
                <p class="text-base uppercase tracking-wider mb-12">Ensuring your satisfaction with every purchase</p>

                <!-- Refund Policy Details -->
                <div class="w-full max-w-2xl text-left space-y-6">
                    <!-- Introduction -->
                    <p class="text-sm uppercase tracking-wider leading-relaxed">
                        At Freshie, we aim to make your shopping experience as seamless as possible. Our refund
                        policy outlines how we process refunds for returned items. Please read the details below to
                        understand the process.
                    </p>

                    <!-- Eligibility for Refunds -->
                    <div>
                        <h3 class="text-lg uppercase font-bold tracking-wider mb-2">Eligibility for Refunds</h3>
                        <ul class="text-sm uppercase tracking-wider space-y-2 list-disc list-outside ml-5">
                            <li>Refunds are available for items returned within 30 days of delivery.</li>
                            <li>Items must be in their original condition: unworn, unwashed, and with tags attached.</li>
                            <li>Custom-made or sale items are eligible for refunds only if defective.</li>
                            <li>Original shipping costs are non-refundable unless the item is faulty.</li>
                        </ul>
                    </div>

                    <!-- Refund Process -->
                    <div>
                        <h3 class="text-lg uppercase font-bold tracking-wider mb-2">Refund Process</h3>
                        <ul class="text-sm uppercase tracking-wider space-y-2 list-disc list-outside ml-5">
                            <li>Once your return is received, we will inspect the item within 3 business days.</li>
                            <li>We will notify you via email about the approval or rejection of your refund.</li>
                            <li>Approved refunds will be processed to the original payment method within 5-7 business days.
                            </li>
                            <li>If rejected, we will contact you with the reason and return the item at your expense.</li>
                        </ul>
                    </div>

                    <!-- Exceptions -->
                    <div>
                        <h3 class="text-lg uppercase font-bold tracking-wider mb-2">Exceptions</h3>
                        <ul class="text-sm uppercase tracking-wider space-y-2 list-disc list-outside ml-5">
                            <li>Gift cards and digital products are non-refundable.</li>
                            <li>Items marked as "final sale" cannot be refunded.</li>
                            <li>We reserve the right to refuse refunds for items that do not meet our return conditions.
                            </li>
                        </ul>
                    </div>

                    <!-- Contact Us -->
                    <div>
                        <h3 class="text-lg uppercase font-bold tracking-wider mb-2">Questions?</h3>
                        <p class="text-sm uppercase tracking-wider leading-relaxed">
                            If you have any questions regarding our refund policy, please reach out to our team at
                            support@freshie.com or call us at +1 (123) 456-7890.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
@endsection