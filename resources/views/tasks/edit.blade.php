@extends('layout')

@section('content')
<div class="container mx-auto max-w-md p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
    <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">✏️ Edit Task</h2>

    <form action="{{ route('tasks.update', $task->id) }}" method="POST" class="space-y-4">
        @csrf
        @method('PUT')

        <div>
            <label for="title" class="block mb-1 font-semibold text-gray-700 dark:text-gray-300">Task Title</label>
            <input 
                type="text" 
                name="title" 
                id="title" 
                value="{{ old('title', $task->title) }}" 
                class="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required
            >
        </div>

        <div class="flex justify-between mt-4">
            <a href="{{ route('tasks.index') }}" class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">← Back</a>
            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                💾 Update
            </button>
        </div>
    </form>
</div>
@endsection
