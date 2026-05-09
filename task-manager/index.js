let tasks = [];
let editingId = null;

const form = document.getElementById('task-form');
const errorDiv = document.getElementById('error-message');
const btnSubmit = document.getElementById('btn-submit');
const btnCancel = document.getElementById('btn-cancel');
const countElement = document.getElementById('count-total');

function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const taskData = Object.fromEntries(formData);

    if (!validate(taskData)) return;

    if (editingId) {
        //  Guardar cambios de edición
        tasks = tasks.map(t => t.id === editingId ? { ...t, title: taskData.title, description: taskData.description } : t);
        editingId = null;
    } else {
        // REQUERIMIENTO: Crear nueva tarea (sin duplicados)
        const newTask = {
            id: Date.now(),
            title: taskData.title,
            description: taskData.description
        };
        tasks.push(newTask);
    }

    resetForm();
    renderTasks();
}

function validate(data) {
    errorDiv.textContent = "";
    errorDiv.className = "error-hide";

    //  Título no vacío y mínimo caracteres
    if (data.title.trim().length < 3) {
        showError("El título debe tener al menos 3 caracteres.");
        return false;
    }
    //  No permitir duplicados
    const isDuplicate = tasks.some(t => t.title.toLowerCase() === data.title.toLowerCase() && t.id !== editingId);
    if (isDuplicate) {
        showError("Ya existe una tarea con ese título.");
        return false;
    }
    //  Límite de descripción
    if (data.description.length > 200) {
        showError("La descripción no puede exceder los 200 caracteres.");
        return false;
    }
    return true;
}

function showError(msg) {
    errorDiv.textContent = msg;
    errorDiv.className = "error-show";
}

function renderTasks() {
    const container = document.getElementById("task-list-container");
    container.innerHTML = "";
    countElement.textContent = tasks.length;

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";
        li.innerHTML = `
            <div class="task-content">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
            </div>
            <div class="task-actions">
                <button class="btn-edit" onclick="prepareEdit(${task.id})">Editar</button>
                <button class="btn-delete" onclick="deleteTask(${task.id})">Eliminar</button>
            </div>
        `;
        container.appendChild(li);
    });
}

//  edición (Cargar datos al formulario)
function prepareEdit(id) {
    const task = tasks.find(t => t.id === id);
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-desc').value = task.description;
    
    editingId = id;
    btnSubmit.textContent = "Guardar Cambios";
    btnCancel.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

function resetForm() {
    form.reset();
    editingId = null;
    btnSubmit.textContent = "Agregar Tarea";
    btnCancel.classList.add('hidden');
    errorDiv.className = "error-hide";
}