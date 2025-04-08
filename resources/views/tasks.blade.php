<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .favorite { color: red; }
        .dark-mode { background-color: #121212; color: white; }
    </style>
</head>
<body class="p-5">
    <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>📝 Todo List</h2>
            <button id="darkModeToggle" class="btn btn-outline-secondary">🌙 Toggle Dark Mode</button>
        </div>

        <form id="addTaskForm">
            <div class="input-group mb-3">
                <input type="text" id="taskTitle" class="form-control" placeholder="New Task Title">
                <button class="btn btn-primary" type="submit">Add Task</button>
            </div>
        </form>

        <ul class="list-group" id="taskList">
            @foreach($tasks as $task)
            <li class="list-group-item d-flex justify-content-between align-items-center" data-id="{{ $task->id }}">
                <div>
                    <input type="checkbox" class="complete-checkbox me-2" {{ $task->completed ? 'checked' : '' }}>
                    <span class="task-title" contenteditable="true">{{ $task->title }}</span>
                    <span class="ms-2 favorite-toggle" style="cursor: pointer;">{{ $task->favorite ? '❤️' : '🤍' }}</span>
                </div>
                <button class="btn btn-danger btn-sm delete-btn">🗑️</button>
            </li>
            @endforeach
        </ul>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script>
        const csrf = $('meta[name="csrf-token"]').attr('content');

        // Dark mode toggle
        $('#darkModeToggle').on('click', function () {
            $('body').toggleClass('dark-mode');
        });

        // Add task
        $('#addTaskForm').on('submit', function (e) {
            e.preventDefault();
            $.ajax({
                url: '/tasks',
                method: 'POST',
                data: {
                    _token: csrf,
                    title: $('#taskTitle').val()
                },
                success: function () {
                    location.reload();
                }
            });
        });

        // Toggle complete
        $('.complete-checkbox').on('change', function () {
            const id = $(this).closest('li').data('id');
            $.post(`/tasks/${id}/toggle`, { _token: csrf }, () => location.reload());
        });

        // Toggle favorite
        $('.favorite-toggle').on('click', function () {
            const id = $(this).closest('li').data('id');
            $.post(`/tasks/${id}/favorite`, { _token: csrf }, () => location.reload());
        });

        // Edit task
        $('.task-title').on('blur', function () {
            const id = $(this).closest('li').data('id');
            const newTitle = $(this).text();
            $.ajax({
                url: `/tasks/${id}`,
                method: 'PUT',
                data: {
                    _token: csrf,
                    title: newTitle
                },
                success: function () {
                    // Optionally show feedback
                }
            });
        });

        // Delete task
        $('.delete-btn').on('click', function () {
            const id = $(this).closest('li').data('id');
            $.ajax({
                url: `/tasks/${id}`,
                method: 'DELETE',
                data: {
                    _token: csrf
                },
                success: function () {
                    location.reload();
                }
            });
        });
    </script>
</body>
</html>
