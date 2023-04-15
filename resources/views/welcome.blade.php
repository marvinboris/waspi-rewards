<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <title>{{ config('app.name') }}</title>
    <meta name="description" content="{{ config('app.description') }}" />
    <Link rel="canonical" href="{{ config('app.url') }}" />

    <meta property='og:title' content={{ config('app.name') }} />
    <meta property="og:description" content="{{ config('app.description') }}" />
    <meta property="og:url" content="{{ config('app.url') }}" />

    <meta property='twitter:title' content={{ config('app.name') }} />
    <meta property="twitter:description" content="{{ config('app.description') }}" />

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    <!-- Styles -->
    <link rel="icon" href="{{ asset('images/favicon.svg') }}">
    
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="apple-mobile-web-app-title" content="{{ config('app.name', 'Laravel') }}" />
    <meta name="application-name" content="{{ config('app.name', 'Laravel') }}" />
    
    <meta name="msapplication-TileColor" content={tailwindConfig.theme.extend.colors.primary} />
    
    <base href="/" />
    
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="{{ config('app.name', 'Laravel') }}" />
    
    <meta name="twitter:card" content="summary" />

    @viteReactRefresh
    @vite('resources/ts/app.tsx')
</head>

<body>
    <div id="app">
    </div>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/plus-jakarta-display.min.css" />
</body>

</html>
