document.addEventListener("DOMContentLoaded", () => {
    // Add Task
    document.getElementById("addTaskForm")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const titleInput = e.target.elements.title;

        const response = await fetch("/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
            },
            body: JSON.stringify({ title: titleInput.value }),
        });

        if (response.ok) {
            location.reload();
        }
    });

    // Toggle Complete
    document.querySelectorAll(".toggle-complete").forEach(button => {
        button.addEventListener("click", async () => {
            const taskId = button.dataset.id;

            const response = await fetch(`/tasks/${taskId}/toggle`, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                },
            });

            if (response.ok) {
                location.reload();
            }
        });
    });

    // Toggle Favorite
    document.querySelectorAll(".toggle-favorite").forEach(button => {
        button.addEventListener("click", async () => {
            const taskId = button.dataset.id;

            const response = await fetch(`/tasks/${taskId}/favorite`, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                },
            });

            if (response.ok) {
                location.reload();
            }
        });
    });

    // Delete Task
    document.querySelectorAll(".delete-task").forEach(button => {
        button.addEventListener("click", async () => {
            const taskId = button.dataset.id;

            const response = await fetch(`/tasks/${taskId}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                },
            });

            if (response.ok) {
                location.reload();
            }
        });
    });
});
