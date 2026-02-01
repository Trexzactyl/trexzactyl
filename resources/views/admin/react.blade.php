<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>{{ config('app.name', 'Trexzactyl') }} - Admin Panel</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <meta name="_token" content="{{ csrf_token() }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="/favicons/manifest.json">
    <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#bc6e3c">
    <link rel="shortcut icon" href="/favicons/favicon.ico">
    <meta name="msapplication-config" content="/favicons/browserconfig.xml">
    <meta name="theme-color" content="#0e4688">

    <!-- User data for React app -->
    <script>
        window.TrexzactylUser = @json(Auth::user());
        window.TrexzactylConfig = {
            apiUrl: '{{ config('app.url') }}/api',
            csrfToken: '{{ csrf_token() }}',
            appName: '{{ config('app.name', 'Trexzactyl') }}',
            appUrl: '{{ config('app.url') }}',
        };
    </script>
</head>
<body>
    <div id="admin-app"></div>
    
    <!-- Fallback for users without JavaScript -->
    <noscript>
        <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
            <h1>JavaScript Required</h1>
            <p>This admin panel requires JavaScript to function properly. Please enable JavaScript in your browser and refresh the page.</p>
            <p><a href="{{ route('admin.index') }}">Return to legacy admin panel</a></p>
        </div>
    </noscript>

    @php
        $manifest = json_decode(file_get_contents(public_path('assets/manifest.json')), true);
        $adminAsset = $manifest['admin.js'] ?? '/assets/admin.js';
    @endphp
    <script src="{{ $adminAsset }}" defer></script>
</body>
</html>