const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

// GET /api/tasks - Obtener todas las tareas
router.get("/", tasksController.getTasks);

// POST /api/tasks - Agregar nueva tarea
router.post("/", tasksController.addTask);

// PUT /api/tasks/:id - Marcar tarea como completada
router.put("/:id", tasksController.toggleTask);

// DELETE /api/tasks/:id - Eliminar tarea
router.delete("/:id", tasksController.deleteTask);

module.exports = router;
