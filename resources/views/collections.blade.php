@extends('layouts.app')

@section('title', 'Collections')

@section('content')
    <!-- Collections Section -->
    <section class="max-w-6xl mx-auto px-4 md:px-5">
        <!-- Hide Sold Out Toggle (Text above Toggle, Centered at the Top) -->
        <div class="flex flex-col items-center mb-6 md:mb-8">
            <span class="text-sm uppercase font-bold tracking-wider mb-2">Hide Sold Out Items</span>
            <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-gray-500 transition"></div>
                <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5">
                </div>
            </label>
        </div>

        <!-- Filters and Products -->
        <div class="flex flex-col md:flex-row">
            <!-- Sidebar (Filters) -->
            <aside class="w-full md:w-1/5 md:pr-4 mb-4 md:mb-0">
                <!-- Categories (Desktop) -->
                <div class="hidden md:block">
                    <ul class="space-y-2">
                        <li><a href="#"
                                class="text-white no-underline text-sm uppercase font-bold tracking-wider hover:text-gray-400">All</a>
                        </li>
                        <li><a href="#"
                                class="text-white no-underline text-sm uppercase font-bold tracking-wider hover:text-gray-400">Bandana</a>
                        </li>
                        <li><a href="#"
                                class="text-white no-underline text-sm uppercase font-bold tracking-wider hover:text-gray-400">Flared
                                Sweats</a></li>
                        <li><a href="#"
                                class="text-white no-underline text-sm uppercase font-bold tracking-wider hover:text-gray-400">Hoodies</a>
                        </li>
                        <li><a href="#"
                                class="text-white no-underline text-sm uppercase font-bold tracking-wider hover:text-gray-400">Sneakers</a>
                        </li>
                        <li><a href="#"
                                class="text-white no-underline text-sm uppercase font-bold tracking-wider hover:text-gray-400">Tees</a>
                        </li>
                    </ul>
                </div>

                <!-- Categories (Mobile - Button with Dropdown) -->
                <div class="md:hidden relative">
                    <button id="products-toggle"
                        class="w-full bg-transparent border border-white rounded px-3 py-2 text-sm flex justify-between items-center uppercase font-bold tracking-wider font-montserrat">
                        Products
                        <i class="fas fa-chevron-down" id="products-chevron"></i>
                    </button>
                    <div id="products-dropdown"
                        class="w-full bg-black border border-white rounded mt-1 hidden z-10 font-montserrat">
                        <div class="px-3 py-2 text-sm uppercase font-bold tracking-wider hover:bg-gray-800 cursor-pointer">
                            All</div>
                        <div class="px-3 py-2 text-sm uppercase font-bold tracking-wider hover:bg-gray-800 cursor-pointer">
                            Bandana</div>
                        <div class="px-3 py-2 text-sm uppercase font-bold tracking-wider hover:bg-gray-800 cursor-pointer">
                            Flared Sweats</div>
                        <div class="px-3 py-2 text-sm uppercase font-bold tracking-wider hover:bg-gray-800 cursor-pointer">
                            Hoodies</div>
                        <div class="px-3 py-2 text-sm uppercase font-bold tracking-wider hover:bg-gray-800 cursor-pointer">
                            Sneakers</div>
                        <div class="px-3 py-2 text-sm uppercase font-bold tracking-wider hover:bg-gray-800 cursor-pointer">
                            Tees</div>
                    </div>
                </div>
            </aside>

            <!-- Products Grid -->
            <div class="w-full md:w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Product Card 1 -->
                <div class="relative group animate-fade-in">
                    <img src="//premiumdemo.site/cdn/shop/files/BOXY_FIT_TEE_FRONT.png?v=1726773590&width=1946"
                        alt="T Shirt"
                        class="w-full h-[360px] object-cover grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-300 glow-effect">
                    <div
                        class="absolute top-2 right-2 bg-black text-white text-xs font-bold px-3 py-2 rounded-full border-2 border-white font-montserrat uppercase">
                        Pre-Order</div>
                    <div
                        class="absolute bottom-4 left-4 text-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-5 transition-all duration-300">
                        <button
                            class="bg-transparent border border-white text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded hover:bg-gray-200 hover:text-black transition mb-2 font-montserrat">Add
                            to Cart</button>
                        <h3 class="text-lg uppercase font-bold tracking-wider font-montserrat">T Shirt</h3>
                        <p class="text-sm font-bold text-gray-400">$35.00 USD</p>
                    </div>
                </div>

                <!-- Product Card 2 -->
                <div class="relative group animate-fade-in">
                    <img src="//premiumdemo.site/cdn/shop/files/PREMIUM_9.png" alt="T Jordan"
                        class="w-full h-[360px] object-cover grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-300 glow-effect">
                    <div
                        class="absolute top-2 right-2 bg-black text-white text-xs font-bold px-3 py-2 rounded-full border-2 border-white font-montserrat uppercase">
                        Sold Out</div>
                    <div
                        class="absolute bottom-4 left-4 text-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-5 transition-all duration-300">
                        <button
                            class="bg-transparent border border-white text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded hover:bg-gray-200 hover:text-black transition mb-2 font-montserrat">Add
                            to Cart</button>
                        <h3 class="text-lg uppercase font-bold tracking-wider font-montserrat">T Jordan</h3>
                        <p class="text-sm font-bold text-gray-400">$205.00 USD</p>
                    </div>
                </div>

                <!-- Product Card 3 -->
                <div class="relative group animate-fade-in">
                    <img src="//premiumdemo.site/cdn/shop/files/FRONTFLAREDSWEATPANTS.png" alt="T Flared Sweats"
                        class="w-full h-[360px] object-cover grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-300 glow-effect">
                    <div
                        class="absolute top-2 right-2 bg-black text-white text-xs font-bold px-3 py-2 rounded-full border-2 border-white font-montserrat uppercase">
                        -13% OFF</div>
                    <div
                        class="absolute bottom-4 left-4 text-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-5 transition-all duration-300">
                        <button
                            class="bg-transparent border border-white text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded hover:bg-gray-200 hover:text-black transition mb-2 font-montserrat">Add
                            to Cart</button>
                        <h3 class="text-lg uppercase font-bold tracking-wider font-montserrat">T Flared Sweats</h3>
                        <p class="text-sm font-bold text-gray-400">$75.00 USD</p>
                    </div>
                </div>

                <!-- Product Card 4 -->
                <div class="relative group animate-fade-in">
                    <img src="//premiumdemo.site/cdn/shop/files/PREMIUM_10.png" alt="T Bandana"
                        class="w-full h-[360px] object-cover grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-300 glow-effect">
                    <div
                        class="absolute bottom-4 left-4 text-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-5 transition-all duration-300">
                        <button
                            class="bg-transparent border border-white text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded hover:bg-gray-200 hover:text-black transition mb-2 font-montserrat">Add
                            to Cart</button>
                        <h3 class="text-lg uppercase font-bold tracking-wider font-montserrat">T Bandana</h3>
                        <p class="text-sm font-bold text-gray-400">$15.00 USD</p>
                    </div>
                </div>

                <!-- Product Card 5 -->
                <div class="relative group animate-fade-in">
                    <img src="//premiumdemo.site/cdn/shop/files/ZIPHOODIEFRONT.png?v=1726769463" alt="T Zip Up Hoodie"
                        class="w-full h-[360px] object-cover grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-300 glow-effect">
                    <div
                        class="absolute bottom-4 left-4 text-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-5 transition-all duration-300">
                        <button
                            class="bg-transparent border border-white text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded hover:bg-gray-200 hover:text-black transition mb-2 font-montserrat">Add
                            to Cart</button>
                        <h3 class="text-lg uppercase font-bold tracking-wider font-montserrat">T Zip Up Hoodie</h3>
                        <p class="text-sm font-bold text-gray-400">$55.00 USD</p>
                    </div>
                </div>

                <!-- Product Card 6 -->
                <div class="relative group animate-fade-in">
                    <img src="//premiumdemo.site/cdn/shop/files/93wi6o.gif?v=1726678774&width=1946" alt="Ski Mask"
                        class="w-full h-[360px] object-cover grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-300 glow-effect">
                    <div
                        class="absolute bottom-4 left-4 text-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-5 transition-all duration-300">
                        <button
                            class="bg-transparent border border-white text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded hover:bg-gray-200 hover:text-black transition mb-2 font-montserrat">Add
                            to Cart</button>
                        <h3 class="text-lg uppercase font-bold tracking-wider font-montserrat">Ski Mask</h3>
                        <p class="text-sm font-bold text-gray-400">$45.00 USD</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- JavaScript для "PRODUCTS" выпадающего списка -->
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const productsToggle = document.getElementById('products-toggle');
            const productsDropdown = document.getElementById('products-dropdown');
            const productsChevron = document.getElementById('products-chevron');

            productsToggle.addEventListener('click', function () {
                productsDropdown.classList.toggle('hidden');
                productsChevron.classList.toggle('fa-chevron-down');
                productsChevron.classList.toggle('fa-chevron-up');
            });

            document.addEventListener('click', function (e) {
                if (!productsToggle.contains(e.target) && !productsDropdown.contains(e.target)) {
                    productsDropdown.classList.add('hidden');
                    productsChevron.classList.remove('fa-chevron-up');
                    productsChevron.classList.add('fa-chevron-down');
                }
            });
        });
    </script>
@endsection