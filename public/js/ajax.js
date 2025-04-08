document.addEventListener('DOMContentLoaded', function () {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    // Add Task
    document.querySelector('#addTaskForm')?.addEventListener('submit', function (e) {
        e.preventDefault();
        const title = this.querySelector('input[name="title"]').value;

        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({ title })
        })
        .then(res => res.json())
        .then(task => {
            location.reload();
        });
    });

    // Edit Task (delegated)
    document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains('edit-btn')) {
            const taskId = e.target.dataset.id;
            const newTitle = prompt('Edit task title:');
            if (!newTitle) return;

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
                location.reload();
            });
        }
    });

    // Toggle Complete
    document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains('toggle-complete')) {
            const taskId = e.target.dataset.id;
            fetch(`/tasks/${taskId}/toggle`, {
                method: 'POST',
                headers: { 'X-CSRF-TOKEN': csrfToken }
            })
            .then(res => res.json())
            .then(data => {
                location.reload();
            });
        }
    });

    // Toggle Favorite
    document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains('toggle-favorite')) {
            const taskId = e.target.dataset.id;
            fetch(`/tasks/${taskId}/favorite`, {
                method: 'POST',
                headers: { 'X-CSRF-TOKEN': csrfToken }
            })
            .then(res => res.json())
            .then(data => {
                location.reload();
            });
        }
    });

    // Delete Task
    document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            const taskId = e.target.dataset.id;
            if (!confirm('Are you sure?')) return;

            fetch(`/tasks/${taskId}`, {
                method: 'DELETE',
                headers: { 'X-CSRF-TOKEN': csrfToken }
            })
            .then(res => res.json())
            .then(data => {
                location.reload();
            });
        }
    });
});