@extends('layouts.app')

@section('title', 'Collections')

@section('content')
    <!-- Collections Section -->
    <section class="max-w-6xl mx-auto px-4 md:px-5">
        
        <!-- Hide Sold Out Toggle (Text above Toggle, Centered at the Top) -->
        <div class="flex flex-col items-center mb-6 md:mb-8">
            <span class="text-sm uppercase font-bold tracking-wider mb-2">Hide Sold Out Items</span>
            <form method="GET" action="{{ route('collections') }}">
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="hide_sold_out" value="true" class="sr-only peer"
                        {{ request('hide_sold_out') == 'true' ? 'checked' : '' }}
                        onchange="this.form.submit()">
                    <div class="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-gray-500 transition"></div>
                    <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                </label>
            </form>
        </div>

        <!-- Filters and Products -->
        <div class="flex flex-col md:flex-row">
            
            <!-- Sidebar (Filters) -->
            <aside class="w-full md:w-1/5 md:pr-4 mb-4 md:mb-0">
                <!-- Categories (Desktop) -->
                <div class="hidden md:block">
                    <ul class="space-y-2">
                        <li><a href="{{ route('collections') }}" class="text-white no-underline text-sm uppercase font-bold tracking-wider hover:text-gray-400">All</a></li>
                        @foreach($categories as $category)
                            <li>
                                <a href="{{ route('collections', ['category' => $category->category]) }}" 
                                   class="text-white no-underline text-sm uppercase font-bold tracking-wider hover:text-gray-400">
                                    {{ ucfirst($category->category) }}
                                </a>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </aside>

            <!-- Products Grid -->
            <div class="w-full md:w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                @foreach($clothes as $item)
                    <div class="relative group animate-fade-in">
                        <a href="{{ route('product', $item->id) }}">
                            @if($item->clothesImages->isNotEmpty())
                                <img src="{{ asset('storage/' . $item->clothesImages->first()->image) }}" alt="{{ $item->name }}"
                                     class="w-full h-[360px] object-cover grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-300 glow-effect">
                            @else
                                <img src="{{ asset('storage/default-image.jpg') }}" alt="{{ $item->name }}" 
                                     class="w-full h-[360px] object-cover grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-300 glow-effect">
                            @endif
                            <div class="absolute top-2 right-2 bg-black text-white text-xs font-bold px-3 py-2 rounded-full border-2 border-white font-montserrat uppercase">
                                {{ $item->is_sold_out ? 'Sold Out' : 'Available' }}
                            </div>
                            <div class="absolute bottom-4 left-4 text-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-5 transition-all duration-300">
                                <button class="bg-transparent border border-white text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded hover:bg-gray-200 hover:text-black transition mb-2 font-montserrat">
                                    Add to Cart
                                </button>
                                <h3 class="text-lg uppercase font-bold tracking-wider font-montserrat">{{ $item->name }}</h3>
                                <p class="text-sm font-bold text-gray-400">${{ number_format($item->price, 2) }} USD</p>
                            </div>
                        </a>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
@endsection
