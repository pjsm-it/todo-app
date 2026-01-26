// ================================
// DOM elements
// ================================
const newTaskBtn = document.getElementById('new-task-btn');
const mainContent = document.getElementById('main-content');
const clearStorageBtn = document.getElementById('clear-storage-btn');

/**
 * Generates a form for creating or editing a task and injects it into the main panel.
 * @param {Object|null} editingCard - Optional. The task card element being edited. If null, creates a new task.
 * @returns {void}
 */
function createTaskForm(editingCard = null) {
    mainContent.innerHTML = '';

    const form = document.createElement('form');

    // Task title input
    const inputTitle = document.createElement('input');
    inputTitle.type = 'text';
    inputTitle.placeholder = 'Task name';
    inputTitle.required = true;
    if (editingCard) inputTitle.value = editingCard.taskData.title;
    form.appendChild(inputTitle);

    // Task priority select
    const selectPriority = document.createElement('select');
    const priorities = ['High', 'Medium', 'Low'];
    priorities.forEach(p => {
        const option = document.createElement('option');
        option.value = p.toLowerCase();
        option.textContent = p;
        if (editingCard && p.toLowerCase() === editingCard.taskData.priority) option.selected = true;
        selectPriority.appendChild(option);
    });
    form.appendChild(selectPriority);

    // Optional description textarea
    const textAreaDesc = document.createElement('textarea');
    textAreaDesc.placeholder = 'Description / notes (optional)';
    if (editingCard) textAreaDesc.value = editingCard.taskData.description;
    form.appendChild(textAreaDesc);

    // Due date input
    const inputDate = document.createElement('input');
    inputDate.type = 'date';
    if (editingCard) inputDate.value = editingCard.taskData.dueDate;
    form.appendChild(inputDate);

    // Completed checkbox
    const labelCompleted = document.createElement('label');
    labelCompleted.textContent = 'Completed ';
    const checkboxCompleted = document.createElement('input');
    checkboxCompleted.type = 'checkbox';
    if (editingCard) checkboxCompleted.checked = editingCard.taskData.completed;
    labelCompleted.appendChild(checkboxCompleted);
    form.appendChild(labelCompleted);

    // Optional email input
    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.placeholder = 'Contact email (optional)';
    if (editingCard) inputEmail.value = editingCard.taskData.email;
    form.appendChild(inputEmail);

    // Optional phone input
    const inputPhone = document.createElement('input');
    inputPhone.type = 'tel';
    inputPhone.placeholder = 'Phone number (optional)';
    if (editingCard) inputPhone.value = editingCard.taskData.phone;
    form.appendChild(inputPhone);

    // Save button
    const saveBtn = document.createElement('button');
    saveBtn.type = 'submit';
    saveBtn.textContent = 'Save';
    form.appendChild(saveBtn);

    // Form submission handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate phone number if provided
        const phoneRegex = /^\+?351\s?\d{9}$/; 
        if (inputPhone.value && !phoneRegex.test(inputPhone.value)) {
            alert('Invalid phone number format. Example: +351 912345678');
            return;
        }

        // Construct task object
        const task = {
            title: inputTitle.value,
            priority: selectPriority.value,
            description: textAreaDesc.value,
            dueDate: inputDate.value,
            completed: checkboxCompleted.checked,
            email: inputEmail.value,
            phone: inputPhone.value,
            id: editingCard ? editingCard.taskData.id : Date.now()
        };

        if (editingCard) {
            // Update existing task
            editingCard.taskData = task;
            updateTask(task);

            // Update task card in the UI
            const leftDiv = editingCard.querySelector('.task-left');
            const titleSpan = leftDiv.querySelector('.task-title-row span');
            titleSpan.textContent = task.title;

            const completedBox = leftDiv.querySelector('.task-title-row input[type="checkbox"]');
            completedBox.checked = task.completed;

            const dueDateSpan = leftDiv.querySelector('.task-due-date span');
            dueDateSpan.textContent = task.dueDate ? `Due: ${task.dueDate}` : '';

            // Move card to appropriate priority column if changed
            let targetColumn;
            if (task.priority === 'high') targetColumn = document.getElementById('high-priority');
            else if (task.priority === 'medium') targetColumn = document.getElementById('medium-priority');
            else targetColumn = document.getElementById('low-priority');

            targetColumn.appendChild(editingCard);

        } else {
            // Create new task card and save it
            createTaskCard(task);
            saveTask(task);
        }

        // Clear the form after submission
        mainContent.innerHTML = '';
    });

    mainContent.appendChild(form);
}

/**
 * Creates a visual task card and inserts it into the correct priority column.
 * @param {Object} task - Task object containing title, priority, description, dueDate, completed, email, phone, id
 * @returns {void}
 */
function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.taskData = task;

    // Clicking the card (excluding icon buttons) opens the edit form
    taskCard.addEventListener('click', (e) => {
        if (e.target.closest('.task-icons')) return;
        createTaskForm(taskCard);
    });

    // Left section: title and due date
    const leftDiv = document.createElement('div');
    leftDiv.classList.add('task-left');

    const titleRow = document.createElement('div');
    titleRow.classList.add('task-title-row'); 
    const titleSpan = document.createElement('span');
    titleSpan.textContent = task.title;
    titleRow.appendChild(titleSpan);

    const completedCheckbox = document.createElement('input');
    completedCheckbox.type = 'checkbox';
    completedCheckbox.checked = task.completed;
    titleRow.appendChild(completedCheckbox);

    leftDiv.appendChild(titleRow);

    const dueDateRow = document.createElement('div');
    dueDateRow.classList.add('task-due-date');
    const dueDateSpan = document.createElement('span');
    dueDateSpan.textContent = task.dueDate ? `Due: ${task.dueDate}` : '';
    dueDateRow.appendChild(dueDateSpan);
    leftDiv.appendChild(dueDateRow);

    taskCard.appendChild(leftDiv);

    // Right section: action buttons (delete, move up, move down)
    const rightDiv = document.createElement('div');
    rightDiv.classList.add('task-icons');

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    rightDiv.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
        taskCard.remove();
        deleteTask(task.id);
    });

    const upBtn = document.createElement('button');
    upBtn.innerHTML = '<i class="fa-regular fa-square-caret-up"></i>';
    rightDiv.appendChild(upBtn);
    upBtn.addEventListener('click', () => {
        const prev = taskCard.previousElementSibling;
        if (prev) taskCard.parentNode.insertBefore(taskCard, prev);
    });

    const downBtn = document.createElement('button');
    downBtn.innerHTML = '<i class="fa-regular fa-square-caret-down"></i>';
    rightDiv.appendChild(downBtn);
    downBtn.addEventListener('click', () => {
        const next = taskCard.nextElementSibling;
        if (next) taskCard.parentNode.insertBefore(taskCard, next.nextSibling);
    });

    taskCard.appendChild(rightDiv);

    // Append to appropriate priority column
    let targetColumn;
    if (task.priority === 'high') targetColumn = document.getElementById('high-priority');
    else if (task.priority === 'medium') targetColumn = document.getElementById('medium-priority');
    else targetColumn = document.getElementById('low-priority');

    targetColumn.appendChild(taskCard);
}

// Event listener to create a new task
newTaskBtn.addEventListener('click', () => {
    createTaskForm(null);
});

// Developer utility: clears all tasks and reloads page
clearStorageBtn.addEventListener('click', () => {
    clearTasks();
    location.reload();
});
