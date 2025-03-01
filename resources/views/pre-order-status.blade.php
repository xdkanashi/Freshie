@extends('layouts.app')

@section('title', 'Pre-Order Status')

@section('content')
    <!-- Main Container -->
    <div class="container mx-auto max-w-4xl">
        <!-- Pre-Order Status Section -->
        <section class="max-w-full mx-auto px-4 md:px-5 pt-0 pb-10 bg-black text-white">
            <!-- Pre-Order Status Content -->
            <div class="flex flex-col items-center">
                <!-- Pre-Order Status Title -->
                <h2 class="text-5xl uppercase font-extrabold tracking-wider mb-4 font-sans">Pre-Order Status</h2>

                <!-- Pre-Order Timeline -->
                <div class="flex flex-col items-center space-y-12 mt-12 w-full max-w-md">
                    <!-- Pre-Order Live Block -->
                    <div class="relative flex flex-col items-center">
                        <!-- Pre-Order Live Content -->
                        <div class="flex flex-col items-center z-10">
                            <h3 class="text-3xl uppercase font-extrabold tracking-wider mb-2">Pre-Order Live</h3>
                            <p class="text-lg uppercase tracking-wider mb-1">01.03.2025</p>
                            <p class="text-sm uppercase tracking-wider text-gray-400 mb-6">The pre-order will be live for 30
                                days</p>
                        </div>
                        <!-- Separate Line Container -->
                        <div class="flex justify-center w-full">
                            <div class="w-1 h-16 bg-transparent relative">
                                <div class="absolute w-full h-full bg-red-600 animate-line-move"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Pre-Order Closed Block -->
                    <div class="relative flex flex-col items-center">
                        <!-- Pre-Order Closed Content -->
                        <div class="flex flex-col items-center z-10">
                            <h3 class="text-3xl uppercase font-extrabold tracking-wider mb-2">Pre-Order Closed</h3>
                            <p class="text-lg uppercase tracking-wider mb-1">20.03.2025</p>
                            <p class="text-sm uppercase tracking-wider text-gray-400 mb-6">Pre-order closes after 8 days</p>
                        </div>
                        <!-- Separate Line Container -->
                        <div class="flex justify-center w-full">
                            <div class="w-1 h-16 bg-transparent relative">
                                <div class="absolute w-full h-full bg-red-600 animate-line-move"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <!-- CSS for Animated Red Line -->
    <style>
        .animate-line-move {
            animation: lineMove 3s infinite linear;
        }

        @keyframes lineMove {
            0% {
                transform: translateY(-100%);
            }

            100% {
                transform: translateY(100%);
            }
        }
    </style>
@endsection