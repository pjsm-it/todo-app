const newTaskBtn = document.getElementById('new-task-btn')
const mainContent = document.getElementById('main-content')

newTaskBtn.addEventListener('click', () => {
    mainContent.innerHTML = '';

    const form = document.createElement('form');

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Task name';
    form.appendChild(input);

    const select = document.createElement('select');
    const priorities = ['High', 'Medium', 'Low'];
    priorities.forEach(p => {
        const option = document.createElement('option');
        option.value = p.toLowerCase();
        option.textContent = p;
        select.appendChild(option);
    });
    form.appendChild(select);

    const saveBtn = document.createElement('button');
    saveBtn.type = 'submit';
    saveBtn.textContent = 'Save';
    form.appendChild(saveBtn);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const taskName = input.value;
        const priority = select.value;

        const taskCard = document.createElement('div');
        taskCard.textContent = taskName;

        let targetColumn;

        if (priority === 'high') {
            targetColumn = document.getElementById('high-priority');
        } else if (priority === 'medium') {
            targetColumn = document.getElementById('medium-priority');
        } else {
            targetColumn = document.getElementById('low-priority');
        }

        targetColumn.appendChild(taskCard);

        mainContent.innerHTML = '';
    });

    mainContent.appendChild(form);
});

