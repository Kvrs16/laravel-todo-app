<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do App</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- CSRF Token for AJAX -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Main JS File (Handles AJAX) -->
    <script src="{{ asset('js/ajax.js') }}" defer></script>
</head>
<body class="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">

    <div class="min-h-screen flex flex-col">
        <header class="bg-white dark:bg-gray-800 shadow p-4">
            <h1 class="text-xl font-bold">✅ To-Do App</h1>
        </header>

        <main class="flex-grow p-4">
            @yield('content')
        </main>

        <footer class="bg-white dark:bg-gray-800 p-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Made with ❤️ by Vijaya Rani
        </footer>
    </div>

</body>
</html>
