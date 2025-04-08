document.addEventListener('DOMContentLoaded', () => {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    // Toggle Complete
    document.querySelectorAll('.toggle-complete').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            fetch(`/tasks/${id}/toggle`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                button.classList.toggle('line-through');
                button.querySelector('svg').classList.toggle('text-green-500');
                button.querySelector('svg').classList.toggle('text-gray-400');
                location.reload(); // Optional: Remove if you update dynamically
            });
        });
    });

    // Toggle Favorite
    document.querySelectorAll('.toggle-favorite').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            fetch(`/tasks/${id}/favorite`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                button.classList.toggle('text-yellow-400');
                button.classList.toggle('text-gray-400');
            });
        });
    });

    // Delete Task
    document.querySelectorAll('.delete-task').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            if (confirm('Are you sure you want to delete this task?')) {
                fetch(`/tasks/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'X-CSRF-TOKEN': token,
                        'Accept': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    document.getElementById(`task-${id}`).remove();
                });
            }
        });
    });

    // Edit Task
    document.querySelectorAll('.edit-task').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            const taskItem = document.querySelector(`#task-${id}`);
            const titleSpan = taskItem.querySelector('.task-title');
            const input = taskItem.querySelector('.edit-input');

            titleSpan.classList.add('hidden');
            input.classList.remove('hidden');
            input.focus();
        });
    });

    // Handle Edit Input (Blur or Enter)
    document.querySelectorAll('.edit-input').forEach(input => {
        input.addEventListener('blur', () => updateTask(input));
        input.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                updateTask(input);
            }
        });
    });

    function updateTask(input) {
        const id = input.dataset.id;
        const newTitle = input.value;
        fetch(`/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token,
                'Accept': 'application/json'
            },
            body: JSON.stringify({ title: newTitle })
        })
        .then(res => res.json())
        .then(data => {
            const taskItem = document.querySelector(`#task-${id}`);
            const titleSpan = taskItem.querySelector('.task-title');
            titleSpan.textContent = newTitle;
            input.classList.add('hidden');
            titleSpan.classList.remove('hidden');
        });
    }

    // Add Task Form Submit
    document.getElementById('addTaskForm')?.addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value;

        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token,
                'Accept': 'application/json'
            },
            body: JSON.stringify({ title: title })
        })
        .then(res => res.json())
        .then(task => {
            location.reload(); // or dynamically add to DOM
        });
    });
});
