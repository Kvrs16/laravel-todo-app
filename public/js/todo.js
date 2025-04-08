document.addEventListener('DOMContentLoaded', () => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    // Add Task
    document.getElementById('addTaskForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = document.getElementById('taskTitle');
        const title = input.value.trim();

        if (!title) return;

        const res = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({ title })
        });

        const task = await res.json();
        input.value = '';
        location.reload(); // Simple reload to refresh UI (can be improved)
    });

    // Toggle Completion / Favorite / Delete
    document.querySelectorAll('.toggle-complete').forEach(btn => {
        btn.addEventListener('click', async () => {
            const taskId = btn.dataset.id;
            const res = await fetch(`/tasks/${taskId}/toggle-complete`, {
                method: 'PUT',
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            const data = await res.json();
            btn.classList.toggle('line-through');
        });
    });

    document.querySelectorAll('.toggle-favorite').forEach(btn => {
        btn.addEventListener('click', async () => {
            const taskId = btn.dataset.id;
            const res = await fetch(`/tasks/${taskId}/toggle-favorite`, {
                method: 'PUT',
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            const data = await res.json();
            btn.classList.toggle('text-yellow-400');
        });
    });

    document.querySelectorAll('.delete-task').forEach(btn => {
        btn.addEventListener('click', async () => {
            const taskId = btn.dataset.id;
            const confirmed = confirm('Are you sure you want to delete this task?');
            if (!confirmed) return;

            await fetch(`/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            document.getElementById(`task-${taskId}`)?.remove();
        });
    });

    // Edit Task
    document.querySelectorAll('.edit-task').forEach(btn => {
        btn.addEventListener('click', () => {
            const taskId = btn.dataset.id;
            const titleSpan = document.querySelector(`#task-${taskId} .task-title`);
            const oldTitle = titleSpan.innerText;
            const newTitle = prompt('Edit Task Title:', oldTitle);

            if (newTitle && newTitle !== oldTitle) {
                fetch(`/tasks/${taskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    body: JSON.stringify({ title: newTitle })
                })
                .then(res => res.json())
                .then(data => {
                    titleSpan.innerText = newTitle;
                });
            }
        });
    });
});
