document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    const addTaskForm = document.getElementById('add-task-form');

    // Array to store tasks
    const tasks = [];

    // Function to render tasks
    function renderTasks(){
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            taskItem.innerHTML = `
           <div class="task-wrapper">
           <span>${task}</span>
           <button class="btnRemove" onclick="removeTask(${index})">
           <i class="fa-solid fa-trash"></i>
           </button>
           </div>
            `;
            taskList.appendChild(taskItem);
        });
    }

    // Function to add a new task
    function addTask(e){
        e.preventDefault();
        const taskInput = document.getElementById('task');
        const newTask = taskInput.value;
        if(newTask.trim() !== ""){
            tasks.push(newTask);
            taskInput.value = '';
            renderTasks();
        }
    }

    // Function to remove/Delete a task
    window.removeTask = function(index){
        tasks.splice(index, 1);
        renderTasks();
    };

    // Event Listener for form submission
    addTaskForm.addEventListener('submit', addTask);

    // Initial rendering of tasks
    renderTasks();

})