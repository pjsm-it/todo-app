// Return all saved tasks
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Add new task to localStorage
function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update existing task by id
function updateTask(updatedTask) {
    const tasks = getTasks();
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
        tasks[index] = updatedTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Remove task by id
function deleteTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove all tasks
function clearTasks() {
    localStorage.removeItem('tasks');
}
