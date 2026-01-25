const newTaskBtn = document.getElementById('new-task-btn')
const mainContent = document.getElementById('main-content')

function createTaskForm(editingCard = null) {
    mainContent.innerHTML = '';

    const form = document.createElement('form');

    // TITLE
    const inputTitle = document.createElement('input');
    inputTitle.type = 'text';
    inputTitle.placeholder = 'Task name';
    inputTitle.required = true;
    if (editingCard) inputTitle.value = editingCard.taskData.title;
    form.appendChild(inputTitle);

    // PRIORITY
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

    // DESCRIPTION / NOTES (optional)
    const textAreaDesc = document.createElement('textarea');
    textAreaDesc.placeholder = 'Description / notes (optional)';
    if (editingCard) textAreaDesc.value = editingCard.taskData.description;
    form.appendChild(textAreaDesc);

    // DUE DATE (optional)
    const inputDate = document.createElement('input');
    inputDate.type = 'date';
    if (editingCard) inputDate.value = editingCard.taskData.dueDate;
    form.appendChild(inputDate);

    // COMPLETED CHECKBOX (optional)
    const labelCompleted = document.createElement('label')
    labelCompleted.textContent = 'Completed ';
    const checkboxCompleted = document.createElement('input');
    checkboxCompleted.type = 'checkbox';
    if (editingCard) checkboxCompleted.checked = editingCard.taskData.completed;
    labelCompleted.appendChild(checkboxCompleted);
    form.appendChild(labelCompleted);

    // EMAIL (optional)
    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.placeholder = 'Contact email (optional)';
    if (editingCard) inputEmail.value = editingCard.taskData.email;
    form.appendChild(inputEmail);

    // PHONE (optional)
    const inputPhone = document.createElement('input');
    inputPhone.type = 'tel';
    inputPhone.placeholder = 'Phone number (optional)';
    if (editingCard) inputPhone.value = editingCard.taskData.phone;
    form.appendChild(inputPhone);

    // SAVE BTN
    const saveBtn = document.createElement('button');
    saveBtn.type = 'submit';
    saveBtn.textContent = 'Save';
    form.appendChild(saveBtn);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const phoneRegex = /^\+?351\s?\d{9}$/; 

        if (inputPhone.value && !phoneRegex.test(inputPhone.value)) {
            alert('Invalid phone number format. Example: +351 912345678');
            return;
        }

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
            editingCard.taskData = task;
            updateTask(task);

            // LEFT SIDE
            const leftDiv = editingCard.querySelector('.task-left');
            const titleSpan = leftDiv.querySelector('.task-title-row span');
            titleSpan.textContent = task.title;
            const completedBox = leftDiv.querySelector('.task-title-row input[type="checkbox"]');
            completedBox.checked = task.completed;

            const dueDateSpan = leftDiv.querySelector('.task-due-date span');
            dueDateSpan.textContent = task.dueDate ? `Due: ${task.dueDate}` : '';

            let targetColumn;
            if (task.priority === 'high') targetColumn = document.getElementById('high-priority');
            else if (task.priority === 'medium') targetColumn = document.getElementById('medium-priority');
            else targetColumn = document.getElementById('low-priority');

            targetColumn.appendChild(editingCard);

        } else {
            createTaskCard(task);
            saveTask(task);
            // Task created and saved in localstorage
            // console.log('Task created and saved:', task);
        }

        mainContent.innerHTML = '';
    });

    mainContent.appendChild(form);
}

function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.taskData = task;

    taskCard.addEventListener('click', (e) => {
        if (e.target.closest('.task-icons')) return;
        createTaskForm(taskCard);
    });

    // LEFT SIDE
    const leftDiv = document.createElement('div');
    leftDiv.classList.add('task-left');

    // TITLE ROW
    const titleRow = document.createElement('div');
    titleRow.classList.add('task-title-row'); // flex horizontal

    const titleSpan = document.createElement('span');
    titleSpan.textContent = task.title;
    titleRow.appendChild(titleSpan);

    const completedCheckbox = document.createElement('input');
    completedCheckbox.type = 'checkbox';
    completedCheckbox.checked = task.completed;
    titleRow.appendChild(completedCheckbox);

    leftDiv.appendChild(titleRow);

    // DUE DATE ROW
    const dueDateRow = document.createElement('div');
    dueDateRow.classList.add('task-due-date');

    const dueDateSpan = document.createElement('span');
    dueDateSpan.textContent = task.dueDate ? `Due: ${task.dueDate}` : '';
    dueDateRow.appendChild(dueDateSpan);

    leftDiv.appendChild(dueDateRow);

    taskCard.appendChild(leftDiv);

    // RIGHT SIDE
    const rightDiv = document.createElement('div');
    rightDiv.classList.add('task-icons');

    const deleteBtn = document.createElement('button');
    // deleteBtn.textContent = 'Del';
    deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    rightDiv.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => {
        taskCard.remove();
        deleteTask(task.id);
    });

    const upBtn = document.createElement('button');
    // upBtn.textContent = '↑';
    upBtn.innerHTML = '<i class="fa-regular fa-square-caret-up"></i>';
    rightDiv.appendChild(upBtn);

    upBtn.addEventListener('click', () => {
        const prev = taskCard.previousElementSibling;
        if (prev) {
            taskCard.parentNode.insertBefore(taskCard, prev);
        }
    });

    const downBtn = document.createElement('button');
    // downBtn.textContent = '↓';
    downBtn.innerHTML = '<i class="fa-regular fa-square-caret-down"></i>';
    rightDiv.appendChild(downBtn);

    downBtn.addEventListener('click', () => {
        const next = taskCard.nextElementSibling;
        if (next) {
            taskCard.parentNode.insertBefore(taskCard, next.nextSibling);
        }
    })

    taskCard.appendChild(rightDiv);

    let targetColumn;
    if (task.priority === 'high') targetColumn = document.getElementById('high-priority');
    else if (task.priority === 'medium') targetColumn = document.getElementById('medium-priority');
    else targetColumn = document.getElementById('low-priority');

    targetColumn.appendChild(taskCard);
}

newTaskBtn.addEventListener('click', () => {
    createTaskForm(null);
});

// DEV ONLY: listener for the Clear Storage hidden button
// test purposes
const clearStorageBtn = document.getElementById('clear-storage-btn');

clearStorageBtn.addEventListener('click', () => {
    // Clears tasks from localStorage
    clearTasks();
    // Reloads page to clear DOM
    location.reload();
})