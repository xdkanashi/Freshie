@extends('layouts.app')

@section('title', 'Lookbook')

@section('content')
    <!-- Main Container -->
    <div class="container mx-auto max-w-4xl">
        <!-- Lookbook Section -->
        <section class="max-w-full mx-auto px-4 md:px-5 pt-0 pb-10 bg-black text-white">
            <!-- Lookbook Content -->
            <div class="flex flex-col items-center">
                <!-- Lookbook Title -->
                <h2 class="text-5xl uppercase font-extrabold tracking-wider mb-4 font-sans">Lookbook</h2>

                <!-- Optional Description -->
                <p class="text-base uppercase tracking-wider mb-12">Optional description for this section</p>

                <!-- Lookbook Item with Interactive Dot -->
                <div class="relative w-full max-w-md">
                    <!-- Main Image (Model in Hoodie) -->
                    <img src="https://premiumdemo.site/cdn/shop/files/ZIP_HOODIE_WITH_MODEL_FRONT.png?v=1732459695&width=800"
                        alt="Model in Zip Up Hoodie" class="w-full h-[600px] object-contain">
                </div>
            </div>
        </section>
    </div>
@endsection