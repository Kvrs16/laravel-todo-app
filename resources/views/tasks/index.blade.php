@extends('layout')

@section('content')
    <div class="max-w-2xl mx-auto">
        <!-- Add Task Form -->
        <form id="addTaskForm" class="flex mb-6">
            <input type="text" id="taskTitle" name="title" placeholder="Enter a new task"
                class="flex-grow px-4 py-2 rounded-l-md border border-gray-300 dark:bg-gray-800 dark:text-white focus:outline-none">
            <button type="submit"
                class="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">Add</button>
        </form>

        <!-- Task List -->
        <ul>
            @foreach ($tasks as $task)
                <li id="task-{{ $task->id }}"
                    class="flex items-center justify-between p-3 mb-3 bg-white dark:bg-gray-800 rounded shadow">
                    
                    <!-- Left Side: Task Title -->
                    <div class="flex items-center gap-2">
                        <button class="toggle-complete {{ $task->completed ? 'line-through text-gray-500' : '' }}"
                            data-id="{{ $task->id }}">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 {{ $task->completed ? 'text-green-500' : 'text-gray-400' }}"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                        </button>
                        <span class="task-title {{ $task->completed ? 'line-through text-gray-500' : '' }}">
                            {{ $task->title }}
                        </span>
                    </div>

                    <!-- Right Side: Actions -->
                    <div class="flex items-center gap-3">
                        <!-- Favorite Button -->
                        <button class="toggle-favorite {{ $task->favorite ? 'text-yellow-400' : 'text-gray-400' }}"
                            data-id="{{ $task->id }}" title="Favorite">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-current"
                                viewBox="0 0 24 24">
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                                    4.42 3 7.5 3c1.74 0 3.41 0.81 
                                    4.5 2.09C13.09 3.81 14.76 3 
                                    16.5 3 19.58 3 22 5.42 22 
                                    8.5c0 3.78-3.4 6.86-8.55 
                                    11.54L12 21.35z" />
                            </svg>
                        </button>

                        <!-- Edit Button -->
                        <button class="edit-task text-blue-500 hover:text-blue-700" data-id="{{ $task->id }}"
                            title="Edit">
                            ✏️
                        </button>

                        <!-- Delete Button -->
                        <button class="delete-task text-red-500 hover:text-red-700" data-id="{{ $task->id }}"
                            title="Delete">
                            🗑️
                        </button>
                    </div>
                </li>
            @endforeach
        </ul>

        @if ($tasks->isEmpty())
            <p class="text-center text-gray-500 dark:text-gray-400">No tasks yet. Add your first one!</p>
        @endif
    </div>
@endsection
