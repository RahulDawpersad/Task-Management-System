document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    const addTaskForm = document.getElementById('add-task-form');

    // Function to render tasks from the server
    function renderTasksFromServer() {
        fetch('/tasks')  // Assuming your server has an endpoint for fetching tasks
            .then(response => response.json())
            .then(tasks => {
                renderTasks(tasks);
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }

    // Function to render tasks
    function renderTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach((task) => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            taskItem.innerHTML = `
                <div class="task-wrapper">
                    <span>${task.task}</span>
                    <button class="btnRemove" onclick="removeTask(${task.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    }

    // Function to add a new task to the server
    function addTaskToServer(newTask) {
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task: newTask }),
        })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    renderTasksFromServer();
                } else {
                    console.error('Error adding task:', response.message);
                }
            })
            .catch(error => console.error('Error adding task:', error));
    }

    // Function to add a new task
    function addTask(e) {
        e.preventDefault();
        const taskInput = document.getElementById('task');
        const newTask = taskInput.value;
        if (newTask.trim() !== "") {
            addTaskToServer(newTask);
            taskInput.value = '';
        }
    }

    // Function to remove/Delete a task from the server
    window.removeTask = function (taskId) {
        fetch(`/tasks/${taskId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    renderTasksFromServer();
                } else {
                    console.error('Error removing task:', response.message);
                }
            })
            .catch(error => console.error('Error removing task:', error));
    };

    // Event Listener for form submission
    addTaskForm.addEventListener('submit', addTask);

    // Initial rendering of tasks from the server
    renderTasksFromServer();
});
