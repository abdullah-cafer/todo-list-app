
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const darkModeToggle = document.getElementById('darkModeToggle');

// Load tasks from local storage (if any)
loadTasks();

addTaskBtn.addEventListener('click', addTask);
clearCompletedBtn.addEventListener('click', clearCompletedTasks);
darkModeToggle.addEventListener('change', toggleDarkMode);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <span>${taskText}</span>
            <button class="deleteBtn">Delete</button>
            <input type="checkbox" class="completeCheckbox">
        `;

        // Add event listeners
        newTask.querySelector('.deleteBtn').addEventListener('click', deleteTask);
        newTask.querySelector('.completeCheckbox').addEventListener('change', toggleComplete);

        taskList.appendChild(newTask);
        taskInput.value = "";

        // Save the task to local storage
        saveTasks();
    }
}

function deleteTask(event) {
    const taskItem = event.target.parentNode;
    taskList.removeChild(taskItem);
    saveTasks();
}

function toggleComplete(event) {
    const taskItem = event.target.parentNode;
    taskItem.classList.toggle('completed');
    saveTasks();
}

function clearCompletedTasks() {
    const completedTasks = taskList.querySelectorAll('li.completed');
    completedTasks.forEach(task => taskList.removeChild(task));
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    const taskItems = taskList.querySelectorAll('li');
    taskItems.forEach(taskItem => {
        const text = taskItem.querySelector('span').textContent;
        const isCompleted = taskItem.classList.contains('completed');
        tasks.push({ text, isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
            const newTask = document.createElement('li');
            newTask.innerHTML = `
                <span>${task.text}</span>
                <button class="deleteBtn">Delete</button>
                <input type="checkbox" class="completeCheckbox" ${task.isCompleted ? 'checked' : ''}>
            `;

            newTask.querySelector('.deleteBtn').addEventListener('click', deleteTask);
            newTask.querySelector('.completeCheckbox').addEventListener('change', toggleComplete);

            if (task.isCompleted) {
                newTask.classList.add('completed');
            }

            taskList.appendChild(newTask);
        });
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.querySelector('h1').classList.toggle('dark-mode');
    document.querySelectorAll('#taskList li span').forEach(span => span.classList.toggle('dark-mode'));
    document.querySelectorAll('#taskList li button').forEach(button => button.classList.toggle('dark-mode'));
    document.querySelectorAll('#taskList li').forEach(li => li.classList.toggle('dark-mode'));
}
            