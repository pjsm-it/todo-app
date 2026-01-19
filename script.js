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

        const phoneRegex = /^\+?351\s?\d{9}$/; 

        // Phone input validation
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
            id: Date.now()
        };

        console.log('Task created:', task)  // Testing purposes

        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');

        taskCard.taskData = task;

        taskCard.addEventListener('click', (e) => {
            if (e.target.closest('.task-icons')) return;

            mainContent.innerHTML = '';

            const t = taskCard.taskData;

            const form = document.createElement('form');

            // TITLE
            const inputTitle = document.createElement('input');
            inputTitle.type = 'text';
            inputTitle.placeholder = 'Task name';
            inputTitle.required = true;
            inputTitle.value = t.title;
            form.appendChild(inputTitle);

            // PRIORITY
            const selectPriority = document.createElement('select');
            ['High', 'Medium', 'Low'].forEach(p => {
                const option = document.createElement('option');
                option.value = p.toLowerCase();
                option.textContent = p;
                if (p.toLowerCase() === t.priority) option.selected = true;
                selectPriority.appendChild(option);
            });
            form.appendChild(selectPriority);

            // DESCRIPTION
            const textAreaDesc = document.createElement('textarea');
            textAreaDesc.placeholder = 'Description / notes (optional)';
            textAreaDesc.value = t.description;
            form.appendChild(textAreaDesc);

            // DUE DATE
            const inputDate = document.createElement('input');
            inputDate.type = 'date';
            inputDate.value = t.dueDate;
            form.appendChild(inputDate);

            // COMPLETED
            const labelCompleted = document.createElement('label');
            labelCompleted.textContent = 'Completed ';
            const checkboxCompleted = document.createElement('input');
            checkboxCompleted.type = 'checkbox';
            checkboxCompleted.checked = t.completed;
            labelCompleted.appendChild(checkboxCompleted);
            form.appendChild(labelCompleted);

            // EMAIL
            const inputEmail = document.createElement('input');
            inputEmail.type = 'email';
            inputEmail.placeholder = 'Contact email (optional)';
            inputEmail.value = t.email;
            form.appendChild(inputEmail);

            // PHONE
            const inputPhone = document.createElement('input');
            inputPhone.type = 'tel';
            inputPhone.placeholder = 'Phone number (optional)';
            inputPhone.value = t.phone;
            form.appendChild(inputPhone);

            // SAVE BTN
            const saveBtn = document.createElement('button');
            saveBtn.type = 'submit';
            saveBtn.textContent = 'Save';
            form.appendChild(saveBtn);

            mainContent.appendChild(form);
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
        deleteBtn.textContent = 'Del';
        rightDiv.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', () => {
            taskCard.remove();
        });

        const upBtn = document.createElement('button');
        upBtn.textContent = '↑';
        rightDiv.appendChild(upBtn);

        const downBtn = document.createElement('button');
        downBtn.textContent = '↓';
        rightDiv.appendChild(downBtn);

        taskCard.appendChild(rightDiv);

        let targetColumn;
        if (task.priority === 'high') targetColumn = document.getElementById('high-priority');
        else if (task.priority === 'medium') targetColumn = document.getElementById('medium-priority');
        else targetColumn = document.getElementById('low-priority');

        targetColumn.appendChild(taskCard);

        mainContent.innerHTML = '';
    });

    mainContent.appendChild(form);
});
