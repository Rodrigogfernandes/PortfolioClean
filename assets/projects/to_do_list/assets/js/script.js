let tasks = [];
let currentFilter = 'all';

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const statsText = document.getElementById('statsText');
const filterBtns = document.querySelectorAll('.filter-btn');

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);
    taskInput.value = '';
    saveTasks();
    renderTasks();
    updateStats();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateStats();
    }
}

function limparInput() {
    document.getElementById("taskInput").value = "";
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
    updateStats();
}

function renderTasks() {
    let filteredTasks = tasks;

    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    }

    // Ordenar: tarefas ativas primeiro, concluídas depois
    filteredTasks.sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
    });

    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<div class="empty-state">nenhuma tarefa encontrada</div>';
        return;
    }

    taskList.innerHTML = filteredTasks.map(task => `
        <li class="task-item ${task.completed ? 'completed' : ''}">
           <div class="checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id})"></div>
            <span class="task-text">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Excluir</button>
        </li>
    `).join('');
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;

    statsText.textContent = `${total} ${total === 1 ? 'tarefa' : 'tarefas'} • ${active} ${active === 1 ? 'ativa' : 'ativas'} • ${completed} ${completed === 1 ? 'concluida' : 'concluidas'};`;
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});
loadTasks();
renderTasks();
updateStats();
