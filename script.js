document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault;
    const taskList = document.getElementById('ToDoList');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    let currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', currentTheme);
   
    addTaskButton.addEventListener('click', () => addTask(newTaskInput.value));
    
    function addTask(taskName) {
        if (taskName === '') return;

        const task = createTaskElement(taskName);
        taskList.appendChild(task);
        newTaskInput.value = '';
        saveTasks();
    }

    function createTaskElement(taskName) {
        // EL elemento que contendra las tareas 
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item', 'task');
        // EL elemento que contendra el texto de la tarea
        const taskLabel = document.createElement('span');
        taskLabel.textContent = taskName;
        // El elemento que las acciones
        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');
        // boton para mostrar las subtareas
        const showSubtaskButton = document.createElement('button');
        showSubtaskButton.classList.add('show-subtasks');
        showSubtaskButton.innerHTML = ` 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
        </svg>`; 
        showSubtaskButton.addEventListener('click', () => toggleSubtaskList(taskItem));
        // boton para agregar subtarea
        const addSubtaskButton = document.createElement('button');
        addSubtaskButton.classList.add('add-subtask');
        addSubtaskButton.innerHTML = `
         <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
        </svg>`;
        addSubtaskButton.addEventListener('click', () => addSubtask(taskItem));
        // boton para eliminar las tareas 
        const deleteTaskButton = document.createElement('button');
        deleteTaskButton.classList.add('delete-task');
        deleteTaskButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>`;
        deleteTaskButton.addEventListener('click', () => deleteTask(taskItem));

        // check para verificar si una tarea fue terminada
        const completeTaskCheckbox = document.createElement('input')
        completeTaskCheckbox.type = 'checkbox';
        completeTaskCheckbox.classList.add('checkbx');

        completeTaskCheckbox.addEventListener('change', () => completeTask(taskItem, completeTaskCheckbox.checked));

        const separation = document.createElement('hr');


        // Agregamos los elementos al elemento principal
        taskActions.appendChild(completeTaskCheckbox);
        taskActions.appendChild(showSubtaskButton);
        taskActions.appendChild(addSubtaskButton);
        taskActions.appendChild(deleteTaskButton);

        taskItem.appendChild(taskActions);
        taskItem.appendChild(taskLabel);
        
        const subtaskList = document.createElement('ul');
        subtaskList.classList.add('subtask-list');
        taskItem.appendChild(subtaskList);
        
        taskItem.appendChild(separation);
        return taskItem;
    }

    function toggleSubtaskList(taskItem) {
        const subtaskList = taskItem.querySelector('.subtask-list');
        subtaskList.style.display = subtaskList.style.display === 'none' ? 'block' : 'none';
    }

    function addSubtask(taskItem) {
        const subtaskName = prompt('Subtask:');
        if (subtaskName === null || subtaskName === '') return;

        const subtask = createSubtaskElement(subtaskName);
        taskItem.querySelector('.subtask-list').appendChild(subtask);
        saveTasks();
    }

    function createSubtaskElement(subtaskName) {
        const subtaskItem = document.createElement('li');
        subtaskItem.classList.add('subtask-item');

        const subtaskLabel = document.createElement('span');
        subtaskLabel.classList.add('subtask-label');
        subtaskLabel.textContent = subtaskName;

        const subtaskActions = document.createElement('div');
        subtaskActions.classList.add('subtask-actions');

        const deleteSubtaskButton = document.createElement('button');
        deleteSubtaskButton.classList.add('delete-SubTask');
        deleteSubtaskButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>`;
        deleteSubtaskButton.addEventListener('click', () => deleteSubtask(subtaskItem));


        const completeSubtaskCheckbox = document.createElement('input');
        completeSubtaskCheckbox.type = 'checkbox';
        completeSubtaskCheckbox.classList = 'subcheckbx ';
        completeSubtaskCheckbox.addEventListener('change', () => completeSubtask(subtaskItem, completeSubtaskCheckbox.checked));

        subtaskActions.appendChild(completeSubtaskCheckbox);
        subtaskActions.appendChild(deleteSubtaskButton);

        subtaskItem.appendChild(subtaskActions);
        subtaskItem.appendChild(subtaskLabel);

        return subtaskItem;
    }

    function deleteTask(taskItem) {
        taskItem.remove();
        saveTasks();
    }

    function deleteSubtask(subtaskItem) {
        subtaskItem.remove();
        saveTasks();
    }

    function completeTask(taskItem, completed) {
        taskItem.classList.toggle('completed', completed);
        taskItem.querySelector('input[type="checkbox"]').checked = completed;
        saveTasks();
    }

    function completeSubtask(subtaskItem, completed) {
        subtaskItem.classList.toggle('completed', completed);
        subtaskItem.querySelector('input[type="checkbox"]').checked = completed;
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            const taskName = taskItem.querySelector('span').textContent;
            const completed = taskItem.classList.contains('completed');
            const subtasks = [];
            taskItem.querySelectorAll('.subtask-item').forEach(subtaskItem => {
                subtasks.push({
                    name: subtaskItem.querySelector('span').textContent,
                    completed: subtaskItem.classList.contains('completed')
                });
            });
            tasks.push({ name: taskName, completed, subtasks });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = createTaskElement(task.name);
            if (task.completed) {
                taskItem.classList.add('completed');
                taskItem.querySelector('input[type="checkbox"]').checked = true;
            }
            task.subtasks.forEach(subtask => {
                const subtaskItem = createSubtaskElement(subtask.name);
                if (subtask.completed) {
                    subtaskItem.classList.add('completed');
                    subtaskItem.querySelector('input[type="checkbox"]').checked = true;
                }
                taskItem.querySelector('.subtask-list').appendChild(subtaskItem);
            });
            taskList.appendChild(taskItem);
        });
    }

    loadTasks();
});
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js')
      .then((registration) => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
      });
  }
  