@extends('layouts.app')

@section('title', 'My Orders')
<link rel="stylesheet" href="{{ asset('css/profile.css') }}">

@section('content')
    <!-- Main Container -->
    <div class="container mx-auto max-w-4xl flex flex-row p-6 bg-black text-white">
        <!-- Sidebar Navigation -->
        <aside class="w-1/4 pr-6">
            <div class="flex flex-col space-y-4">
                <!-- Avatar with White Circle and Gray Border -->
                <div class="mb-4 relative">
                    <div
                        class="w-24 h-24 rounded-full bg-white border-4 border-gray-500 flex items-center justify-center overflow-hidden">
                        <img src="{{ asset('img/cat.png') }}" alt="User Avatar" class="w-20 h-20 object-cover">
                    </div>
                </div>

                <a href="{{ route('profile.show') }}"
                    class="text-white-400 hover:text-gray-400 flex items-center space-x-2">
                    <span class="text-xl">👤</span>
                    <span>Account Details</span>
                </a>

                <a href="{{ route('profile.password') }}"
                    class="text-white-400 hover:text-gray-400 flex items-center space-x-2">
                    <span class="text-xl">🔑</span>
                    <span>Change Password</span>
                </a>

                <a href="{{ route('profile.orders') }}"
                    class="text-white-400 hover:text-gray-400 flex items-center space-x-2 bg-red-600 p-2 rounded">
                    <span class="text-xl">📦</span>
                    <span>My Orders</span>
                </a>

                <!-- Admin Panel Button (Visible Only to Admins) -->
                @if(Auth::user()->is_admin == 1)
                    <a href="/admin" class="text-white-400 hover:text-gray-400 flex items-center space-x-2">
                        <span class="text-xl">🛠️</span>
                        <span>Admin Panel</span>
                    </a>
                @endif

                <a href="{{ route('logout') }}" class="text-white-400 hover:text-gray-400 flex items-center space-x-2"
                    onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                    <span class="text-xl">🚪</span>
                    <span>Logout</span>
                </a>

                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                    @csrf
                </form>
            </div>
        </aside>

        <!-- Orders Section -->
        <section class="w-3/4 pl-6">
            <h1 class="text-4xl font-bold mb-6">My Orders</h1>

            <!-- Orders Table -->
            <div class="space-y-4">
                @if(session('success'))
                    <div class="text-green-500 text-lg mb-4">
                        {{ session('success') }}
                    </div>
                @elseif(session('error'))
                    <div class="text-red-500 text-lg mb-4">
                        {{ session('error') }}
                    </div>
                @endif

                @if($orders->isEmpty())
                    <p class="text-white text-lg">You have no orders yet.</p>
                @else
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-gray-800">
                                    <th class="py-3 px-4 text-white text-sm uppercase tracking-wide">Order Number</th>
                                    <th class="py-3 px-4 text-white text-sm uppercase tracking-wide">Status</th>
                                    <th class="py-3 px-4 text-white text-sm uppercase tracking-wide">Notes</th>
                                    <th class="py-3 px-4 text-white text-sm uppercase tracking-wide">Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($orders as $order)
                                    <tr class="border-b border-gray-700 hover:bg-gray-700">
                                        <td class="py-3 px-4 text-white">{{ $order->order_number }}</td>
                                        <td class="py-3 px-4 text-white">{{ ucfirst($order->status) }}</td>
                                        <td class="py-3 px-4 text-white">{{ $order->notes ?? 'N/A' }}</td>
                                        <td class="py-3 px-4 text-white">{{ $order->created_at->format('Y-m-d H:i:s') }}</td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @endif
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
        });
    </script>
@endsection