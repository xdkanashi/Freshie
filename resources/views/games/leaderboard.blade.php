@extends('layouts.app')

@section('title', 'Leaderboard')
<link rel="stylesheet" href="{{ asset('css/leaderboard.css') }}">

@section('content')
    <!-- Main Container -->
    <div class="container mx-auto max-w-5xl px-4 py-10"> <!-- Увеличил max-w-4xl до max-w-5xl -->
        <!-- Leaderboard Section -->
        <section class="max-w-full mx-auto bg-black text-white">
            <!-- Leaderboard Title -->
            <h1 class="text-5xl uppercase font-extrabold tracking-wider mb-12 font-sans text-center animate-fade-in">
                Leaderboard
            </h1>

            <!-- Leaderboard Entries -->
            <div class="flex flex-col items-center space-y-6">
                <!-- Header Block -->
                <div class="control block-cube w-full max-w-2xl header-block"> <!-- Увеличил max-w-lg до max-w-2xl -->
                    <div class="text flex justify-between items-center px-4 py-3 text-base font-bold uppercase">
                        <span>Rank</span>
                        <span>Player</span>
                        <span>Score</span>
                    </div>
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

                <!-- Leaderboard Data -->
                @if ($leaderboard->isEmpty())
                    <div class="control block-cube w-full max-w-2xl"> <!-- Увеличил max-w-lg до max-w-2xl -->
                        <div class="text py-4 text-base font-bold uppercase text-center">
                            No scores yet!
                        </div>
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
                @else
                    @foreach ($leaderboard as $index => $entry)
                        <div class="control block-cube w-full max-w-2xl"> <!-- Увеличил max-w-lg до max-w-2xl -->
                            <div class="text flex justify-between items-center px-4 py-3 text-base font-bold uppercase">
                                <span>{{ $index + 1 }}</span>
                                <span>{{ $entry->user->username ?? 'Unknown' }}</span>
                                <div class="flex items-center">
                                    <span>{{ $entry->score }}</span>
                                    @if ($index == 0)
                                        <span class="ml-4 text-2xl">🥇</span> <!-- Золотая медаль -->
                                    @elseif ($index == 1)
                                        <span class="ml-4 text-2xl">🥈</span> <!-- Серебряная медаль -->
                                    @elseif ($index == 2)
                                        <span class="ml-4 text-2xl">🥉</span> <!-- Бронзовая медаль -->
                                    @endif
                                </div>
                            </div>
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
                    @endforeach
                @endif
            </div>
        </section>
    </div>
@endsection