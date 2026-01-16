const newTaskBtn = document.getElementById('new-task-btn')
const mainContent = document.getElementById('main-content')

newTaskBtn.addEventListener('click', () => {
    mainContent.innerHTML = '';

    const form = document.createElement('form');

    // TITLE
    const inputTitle = document.createElement('input');
    inputTitle.type = 'text';
    inputTitle.placeholder = 'Task name';
    inputTitle.required = true;
    form.appendChild(inputTitle);

    // PRIORITY
    const selectPriority = document.createElement('select');
    const priorities = ['High', 'Medium', 'Low'];
    priorities.forEach(p => {
        const option = document.createElement('option');
        option.value = p.toLowerCase();
        option.textContent = p;
        selectPriority.appendChild(option);
    });
    form.appendChild(selectPriority);

    // DESCRIPTION / NOTES (optional)
    const textAreaDesc = document.createElement('textarea');
    textAreaDesc.placeholder = 'Description / notes (optional)';
    form.appendChild(textAreaDesc);

    // DUE DATE (optional)
    const inputDate = document.createElement('input');
    inputDate.type = 'date';
    inputDate.placeholder = 'Due date (optional)';
    form.appendChild(inputDate);

    // COMPLETED CHECKBOX (optional)
    const labelCompleted = document.createElement('label')
    labelCompleted.textContent = 'Completed ';
    const checkboxCompleted = document.createElement('input');
    checkboxCompleted.type = 'checkbox';
    labelCompleted.appendChild(checkboxCompleted);
    form.appendChild(labelCompleted);

    // EMAIL (optional)
    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.placeholder = 'Contact email (optional)';
    form.appendChild(inputEmail);

    // PHONE (optional)
    const inputPhone = document.createElement('input');
    inputPhone.type = 'tel';
    inputPhone.placeholder = 'Phone number (optional)';
    form.appendChild(inputPhone);

    // SAVE BTN)
    const saveBtn = document.createElement('button');
    saveBtn.type = 'submit';
    saveBtn.textContent = 'Save';
    form.appendChild(saveBtn);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

    const task = {
        title: inputTitle.value,
        priority: selectPriority.value,
        description: textAreaDesc.value,
        dueDate: inputDate.value,
        completed: checkboxCompleted.checked,
        email: inputEmail.value,
        phone: inputPhone.value,
        id: Date.now()
    };

    console.log('Task created:', task)  // Testing purposes

    // Card creation
    const taskCard = document.createElement('div');
    taskCard.textContent = task.title;
    taskCard.classList.add('task-card');

    let targetColumn;
    if (task.priority === 'high') {
        targetColumn = document.getElementById('high-priority');
    } else if (task.priority === 'medium') {
        targetColumn = document.getElementById('medium-priority');
    } else {
        targetColumn = document.getElementById('low-priority');
    }

    targetColumn.appendChild(taskCard);

    mainContent.innerHTML = '';
    });

    mainContent.appendChild(form);
});
