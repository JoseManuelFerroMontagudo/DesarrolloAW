// URL base de la API
const API_URL = "/api/tasks";

// Obtener referencia a los elementos del DOM
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// ─── Cargar tareas al iniciar la página ───────────────────────────────────────
async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error("Error al cargar las tareas:", error);
    }
}

// ─── Agregar nueva tarea ──────────────────────────────────────────────────────
async function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });
        const newTask = await response.json();
        taskInput.value = "";
        loadTasks(); // Recargar lista actualizada
    } catch (error) {
        console.error("Error al agregar la tarea:", error);
    }
}

// ─── Marcar/desmarcar tarea como completada ───────────────────────────────────
async function toggleTask(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: "PUT" });
        loadTasks();
    } catch (error) {
        console.error("Error al actualizar la tarea:", error);
    }
}

// ─── Eliminar tarea ───────────────────────────────────────────────────────────
async function deleteTask(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        loadTasks();
    } catch (error) {
        console.error("Error al eliminar la tarea:", error);
    }
}

// ─── Renderizar lista de tareas en el DOM ─────────────────────────────────────
function renderTasks(tasks) {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        const span = document.createElement("span");
        span.classList.add("task-text");
        span.textContent = task.text;
        span.addEventListener("click", () => toggleTask(task.id));

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "x";
        deleteBtn.addEventListener("click", () => deleteTask(task.id));

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// ─── Eventos ──────────────────────────────────────────────────────────────────
addBtn.addEventListener("click", addTask);

// Agregar tarea presionando Enter
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});

// Cargar tareas al iniciar
loadTasks();
