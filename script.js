
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const darkModeToggle = document.getElementById('darkModeToggle');

// Load tasks from local storage (if any)
loadTasks();

// Initialize Sortable.js for drag-and-drop reordering
Sortable.create(taskList, {
    animation: 150,
    onEnd: saveTasks // Save tasks after reordering
});

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
            <select class="form-control form-control-sm ml-2" id="prioritySelect">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
        `;

        // Add event listeners
        newTask.querySelector('.deleteBtn').addEventListener('click', deleteTask);
        newTask.querySelector('.completeCheckbox').addEventListener('change', toggleComplete);
        newTask.querySelector('#prioritySelect').addEventListener('change', updatePriority);

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
        const priority = taskItem.querySelector('#prioritySelect').value;
        tasks.push({ text, isCompleted, priority });
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
                <select class="form-control form-control-sm ml-2" id="prioritySelect">
                    <option value="Low" ${task.priority === 'Low' ? 'selected' : ''}>Low</option>
                    <option value="Medium" ${task.priority === 'Medium' ? 'selected' : ''}>Medium</option>
                    <option value="High" ${task.priority === 'High' ? 'selected' : ''}>High</option>
                </select>
            `;

            newTask.querySelector('.deleteBtn').addEventListener('click', deleteTask);
            newTask.querySelector('.completeCheckbox').addEventListener('change', toggleComplete);
            newTask.querySelector('#prioritySelect').addEventListener('change', updatePriority);

            if (task.isCompleted) {
                newTask.classList.add('completed');
            }

            taskList.appendChild(newTask);
        });
    }
}

function updatePriority(event) {
    const taskItem = event.target.parentNode;
    const priority = event.target.value;

    // You can add logic here to visually represent priority (e.g., change task color)
    // ...

    saveTasks();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.querySelector('h1').classList.toggle('dark-mode');
    document.querySelectorAll('#taskList li span').forEach(span => span.classList.toggle('dark-mode'));
    document.querySelectorAll('#taskList li button').forEach(button => button.classList.toggle('dark-mode'));
    document.querySelectorAll('#taskList li').forEach(li => li.classList.toggle('dark-mode'));
}
            