<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Freshie - {{ $status ?? 'Error' }}</title>
    <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/errors.css') }}">
</head>

<body>
    <div class="room">
        <div class="cuboid">
            <div class="side"></div>
            <div class="side"></div>
            <div class="side"></div>
        </div>
        <div class="oops">
            <h2>{{ 'OOPS!' }}</h2>
            <p>
                @php
                    $message = match ($status ?? 0) {
                        400 => 'Bad Request - The server cannot process your request.',
                        401 => 'Unauthorized - You need to log in to access this page.',
                        403 => 'Forbidden - You don\'t have permission to access this.',
                        404 => 'Not Found - We can\'t find the page you\'re looking for :(',
                        405 => 'Method Not Allowed - The request method is not supported.',
                        408 => 'Request Timeout - The server timed out waiting for your request.',
                        429 => 'Too Many Requests - Slow down, you\'re asking too much!',
                        500 => 'Server Error - Something broke on our end, sorry!',
                        503 => 'Service Unavailable - We\'re temporarily down, try again later.',
                        default => 'Something went wrong! Please try again.',
                    };
                @endphp
                {{ $message }}
            </p>
        </div>
        <div class="center-line">
            <div class="hole">
                <div class="ladder-shadow"></div>
                <div class="ladder"></div>
            </div>
            <div class="four">{{ substr($status ?? '404', 0, 1) }}</div>
            <div class="four">{{ substr($status ?? '404', -1) }}</div>
            <div class="btn">
                <a href="{{ url('/') }}">BACK TO HOME</a>
            </div>
        </div>
    </div>
</body>

</html>