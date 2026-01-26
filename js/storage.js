/**
 * Retrieves all tasks from localStorage.
 * @returns {Array<Object>} An array of task objects, empty if none exist.
 */
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

/**
 * Saves a new task to localStorage.
 * @param {Object} task - The task object to save.
 *   Expected to include at least: { id: string|number, title: string, ... }
 * @returns {void}
 */
function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Updates an existing task in localStorage.
 * @param {Object} updatedTask - The task object with updated properties.
 *   Must include a valid 'id' to match the task in storage.
 * @returns {void}
 */
function updateTask(updatedTask) {
    const tasks = getTasks();
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
        tasks[index] = updatedTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

/**
 * Deletes a task from localStorage by ID.
 * @param {string|number} taskId - The ID of the task to remove.
 * @returns {void}
 */
function deleteTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Clears all tasks from localStorage.
 * Intended mainly for development or reset purposes.
 * @returns {void}
 */
function clearTasks() {
    localStorage.removeItem('tasks');
}
