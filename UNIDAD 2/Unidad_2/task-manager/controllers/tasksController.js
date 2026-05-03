const fs = require("fs").promises;
const path = require("path");

// Ruta al archivo tasks.json
const TASKS_FILE = path.join(__dirname, "../tasks.json");

// Función auxiliar asíncrona para leer las tareas del archivo JSON
async function readTasks() {
    const data = await fs.readFile(TASKS_FILE, "utf-8");
    return JSON.parse(data);
}

// Función auxiliar asíncrona para escribir las tareas en el archivo JSON
async function writeTasks(tasks) {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), "utf-8");
}

// GET /api/tasks - Obtener todas las tareas
const getTasks = async (req, res) => {
    try {
        const tasks = await readTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Error al leer las tareas" });
    }
};

// POST /api/tasks - Agregar nueva tarea
const addTask = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || text.trim() === "") {
            return res.status(400).json({ error: "El texto de la tarea es requerido" });
        }
        const tasks = await readTasks();
        const newTask = {
            id: Date.now(),
            text: text.trim(),
            completed: false
        };
        tasks.push(newTask);
        await writeTasks(tasks);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar la tarea" });
    }
};

// PUT /api/tasks/:id - Marcar/desmarcar tarea como completada
const toggleTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const tasks = await readTasks();
        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        await writeTasks(tasks);
        res.json(tasks[taskIndex]);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la tarea" });
    }
};

// DELETE /api/tasks/:id - Eliminar tarea
const deleteTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const tasks = await readTasks();
        const filteredTasks = tasks.filter(t => t.id !== id);
        if (filteredTasks.length === tasks.length) {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }
        await writeTasks(filteredTasks);
        res.json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la tarea" });
    }
};

module.exports = { getTasks, addTask, toggleTask, deleteTask };
