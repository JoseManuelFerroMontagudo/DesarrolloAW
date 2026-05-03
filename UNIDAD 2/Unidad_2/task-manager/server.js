const express = require("express");
const path = require("path");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = 3000;

// Permitir JSON en el body de las peticiones
app.use(express.json());

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Rutas de la API de tareas
app.use("/api/tasks", taskRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
