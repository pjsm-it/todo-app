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

    mainContent.appendChild(form);
});